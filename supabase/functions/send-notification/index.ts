/**
 * @file send-notification Edge Function
 * @description Send push notification via Expo Push API and store in database
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// CORS headers for cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Expo Push API endpoint
const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

/**
 * Notification type enum matching database
 */
type NotificationType =
  | "new_sheed"
  | "sheed_accepted"
  | "sheed_declined"
  | "new_message"
  | "sheed_expired"
  | "sheed_success";

/**
 * Request body interface
 */
interface SendNotificationRequest {
  user_id: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

/**
 * Expo push message format
 */
interface ExpoPushMessage {
  to: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  sound?: "default" | null;
  badge?: number;
  channelId?: string;
}

/**
 * Send notification via Expo Push API
 */
async function sendExpoPushNotification(
  pushToken: string,
  title: string,
  body: string,
  data?: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  const message: ExpoPushMessage = {
    to: pushToken,
    title,
    body,
    data,
    sound: "default",
    channelId: "default",
  };

  try {
    const response = await fetch(EXPO_PUSH_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const result = await response.json();

    if (result.data?.status === "error") {
      return { success: false, error: result.data.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Expo Push API error:", error);
    return { success: false, error: String(error) };
  }
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Only allow POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Create Supabase client with auth context
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Get auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing Authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create client with service role for database operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify the JWT token
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid authentication" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse request body
    const body: SendNotificationRequest = await req.json();
    const { user_id, type, title, body: notificationBody, data } = body;

    // Validate required fields
    if (!user_id || !type || !title || !notificationBody) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: user_id, type, title, body"
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Fetch user push token from database
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("push_token")
      .eq("id", user_id)
      .single();

    if (userError) {
      console.error("Error fetching user:", userError);
      return new Response(
        JSON.stringify({ error: "User not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Build notification data payload
    const notificationData = {
      type,
      ...data,
    };

    // Send push notification if user has push token
    let pushSent = false;
    let pushError: string | undefined;

    if (userData?.push_token) {
      const pushResult = await sendExpoPushNotification(
        userData.push_token,
        title,
        notificationBody,
        notificationData
      );
      pushSent = pushResult.success;
      pushError = pushResult.error;
    }

    // Insert notification record into database
    const { data: notification, error: insertError } = await supabase
      .from("notifications")
      .insert({
        user_id,
        type,
        title,
        body: notificationBody,
        data: notificationData,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Error inserting notification:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to create notification record" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        notification_id: notification.id,
        push_sent: pushSent,
        push_error: pushError,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
