/**
 * @file create-sheed Edge Function
 * @description Creates a new sheed with 3 chatrooms and notifications
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// CORS headers for preflight requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Request body interface
interface CreateSheedRequest {
  sheede_1_id: string;
  sheede_2_id: string;
  intro_message: string;
}

// Response interface
interface CreateSheedResponse {
  success: boolean;
  sheed_id?: string;
  error?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client with auth header from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ success: false, error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const body: CreateSheedRequest = await req.json();
    const { sheede_1_id, sheede_2_id, intro_message } = body;

    // Validate required inputs
    if (!sheede_1_id || !sheede_2_id || !intro_message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields: sheede_1_id, sheede_2_id, intro_message',
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate intro_message length
    if (intro_message.trim().length === 0 || intro_message.length > 200) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'intro_message must be between 1 and 200 characters',
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get sheeder's user ID from users table (matching auth_id)
    const { data: sheederUser, error: sheederError } = await supabaseClient
      .from('users')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (sheederError || !sheederUser) {
      return new Response(
        JSON.stringify({ success: false, error: 'Sheeder user not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const sheederId = sheederUser.id;

    // Calculate expiry date (7 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Create the sheed record
    const { data: sheed, error: sheedError } = await supabaseClient
      .from('sheeds')
      .insert({
        sheeder_id: sheederId,
        sheede_1_id,
        sheede_2_id,
        intro_message: intro_message.trim(),
        status: 'pending',
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (sheedError || !sheed) {
      console.error('Error creating sheed:', sheedError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to create sheed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create 3 chatrooms for the sheed
    const chatrooms = [
      {
        sheed_id: sheed.id,
        type: 'sheeder_sheede_1' as const,
        participant_a_id: sheederId,
        participant_b_id: sheede_1_id,
      },
      {
        sheed_id: sheed.id,
        type: 'sheeder_sheede_2' as const,
        participant_a_id: sheederId,
        participant_b_id: sheede_2_id,
      },
      {
        sheed_id: sheed.id,
        type: 'sheede_sheede' as const,
        participant_a_id: sheede_1_id,
        participant_b_id: sheede_2_id,
      },
    ];

    const { error: chatroomsError } = await supabaseClient
      .from('chatrooms')
      .insert(chatrooms);

    if (chatroomsError) {
      console.error('Error creating chatrooms:', chatroomsError);
      // Note: In production, we'd want to rollback the sheed creation here
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to create chatrooms' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get sheeder's display name for notifications
    const { data: sheederProfile } = await supabaseClient
      .from('users')
      .select('display_name')
      .eq('id', sheederId)
      .single();

    const sheederName = sheederProfile?.display_name || 'Quelqu\'un';

    // Create notifications for both sheedés
    const notifications = [
      {
        user_id: sheede_1_id,
        type: 'new_sheed' as const,
        title: 'Nouveau Sheed ! 💘',
        body: `${sheederName} veut te présenter quelqu'un...`,
        data: { sheed_id: sheed.id },
      },
      {
        user_id: sheede_2_id,
        type: 'new_sheed' as const,
        title: 'Nouveau Sheed ! 💘',
        body: `${sheederName} veut te présenter quelqu'un...`,
        data: { sheed_id: sheed.id },
      },
    ];

    const { error: notificationsError } = await supabaseClient
      .from('notifications')
      .insert(notifications);

    if (notificationsError) {
      console.error('Error creating notifications:', notificationsError);
      // Non-critical error, continue anyway
    }

    // Increment sheeder's total_sheeds_created
    await supabaseClient
      .from('users')
      .update({
        total_sheeds_created: (sheederProfile as any)?.total_sheeds_created + 1 || 1
      })
      .eq('id', sheederId);

    // Increment sheedés' total_sheeds_received
    await supabaseClient
      .from('users')
      .update({ total_sheeds_received: 1 })
      .in('id', [sheede_1_id, sheede_2_id]);

    // Return success response
    const response: CreateSheedResponse = {
      success: true,
      sheed_id: sheed.id,
    };

    return new Response(JSON.stringify(response), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
