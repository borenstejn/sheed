export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chatrooms: {
        Row: {
          created_at: string | null
          id: string
          last_message_at: string | null
          participant_a_id: string
          participant_b_id: string
          sheed_id: string
          type: Database["public"]["Enums"]["chatroom_type"]
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          participant_a_id: string
          participant_b_id: string
          sheed_id: string
          type: Database["public"]["Enums"]["chatroom_type"]
        }
        Update: {
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          participant_a_id?: string
          participant_b_id?: string
          sheed_id?: string
          type?: Database["public"]["Enums"]["chatroom_type"]
        }
        Relationships: []
      }
      contacts: {
        Row: {
          contact_user_id: string | null
          email: string | null
          id: string
          imported_at: string | null
          name: string
          owner_id: string
          phone: string | null
        }
        Insert: {
          contact_user_id?: string | null
          email?: string | null
          id?: string
          imported_at?: string | null
          name: string
          owner_id: string
          phone?: string | null
        }
        Update: {
          contact_user_id?: string | null
          email?: string | null
          id?: string
          imported_at?: string | null
          name?: string
          owner_id?: string
          phone?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          chatroom_id: string
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          read_at: string | null
          sender_id: string
          type: Database["public"]["Enums"]["message_type"] | null
        }
        Insert: {
          chatroom_id: string
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          read_at?: string | null
          sender_id: string
          type?: Database["public"]["Enums"]["message_type"] | null
        }
        Update: {
          chatroom_id?: string
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          read_at?: string | null
          sender_id?: string
          type?: Database["public"]["Enums"]["message_type"] | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string | null
          data: Json | null
          id: string
          read_at: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          read_at?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          read_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: []
      }
      sheeds: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          intro_message: string
          message_count: number | null
          sheede_1_accepted: boolean | null
          sheede_1_id: string
          sheede_2_accepted: boolean | null
          sheede_2_id: string
          sheeder_id: string
          status: Database["public"]["Enums"]["sheed_status"] | null
          success_at: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          intro_message: string
          message_count?: number | null
          sheede_1_accepted?: boolean | null
          sheede_1_id: string
          sheede_2_accepted?: boolean | null
          sheede_2_id: string
          sheeder_id: string
          status?: Database["public"]["Enums"]["sheed_status"] | null
          success_at?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          intro_message?: string
          message_count?: number | null
          sheede_1_accepted?: boolean | null
          sheede_1_id?: string
          sheede_2_accepted?: boolean | null
          sheede_2_id?: string
          sheeder_id?: string
          status?: Database["public"]["Enums"]["sheed_status"] | null
          success_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_id: string
          avatar_url: string | null
          bio: string | null
          birth_date: string | null
          created_at: string | null
          display_name: string
          email: string | null
          id: string
          last_active_at: string | null
          notifications_enabled: boolean | null
          phone: string | null
          points: number | null
          push_token: string | null
          successful_sheeds: number | null
          total_sheeds_created: number | null
          total_sheeds_received: number | null
          updated_at: string | null
        }
        Insert: {
          auth_id: string
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          created_at?: string | null
          display_name: string
          email?: string | null
          id?: string
          last_active_at?: string | null
          notifications_enabled?: boolean | null
          phone?: string | null
          points?: number | null
          push_token?: string | null
          successful_sheeds?: number | null
          total_sheeds_created?: number | null
          total_sheeds_received?: number | null
          updated_at?: string | null
        }
        Update: {
          auth_id?: string
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          created_at?: string | null
          display_name?: string
          email?: string | null
          id?: string
          last_active_at?: string | null
          notifications_enabled?: boolean | null
          phone?: string | null
          points?: number | null
          push_token?: string | null
          successful_sheeds?: number | null
          total_sheeds_created?: number | null
          total_sheeds_received?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      show_limit: { Args: Record<string, never>; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      chatroom_type: "sheeder_sheede_1" | "sheeder_sheede_2" | "sheede_sheede"
      message_type: "text" | "image" | "system"
      notification_type:
        | "new_sheed"
        | "sheed_accepted"
        | "sheed_declined"
        | "new_message"
        | "sheed_success"
        | "sheed_expiring"
        | "sheed_expired"
      sheed_status: "pending" | "active" | "success" | "expired" | "declined"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Convenience type aliases
export type User = Tables<'users'>
export type Contact = Tables<'contacts'>
export type Sheed = Tables<'sheeds'>
export type Chatroom = Tables<'chatrooms'>
export type Message = Tables<'messages'>
export type Notification = Tables<'notifications'>

export type SheedStatus = Enums<'sheed_status'>
export type ChatroomType = Enums<'chatroom_type'>
export type MessageType = Enums<'message_type'>
export type NotificationType = Enums<'notification_type'>
