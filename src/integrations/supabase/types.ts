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
      blog_posts: {
        Row: {
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          is_published: boolean
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_published?: boolean
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_published?: boolean
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          question: string
          sort_order: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          answer: string
          category?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          question: string
          sort_order?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          answer?: string
          category?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          question?: string
          sort_order?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          created_at: string
          file_size: number
          file_type: string
          filename: string
          folder: string | null
          id: string
          mime_type: string
          original_name: string
          tags: string[] | null
          uploaded_by: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          file_size: number
          file_type: string
          filename: string
          folder?: string | null
          id?: string
          mime_type: string
          original_name: string
          tags?: string[] | null
          uploaded_by?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          file_size?: number
          file_type?: string
          filename?: string
          folder?: string | null
          id?: string
          mime_type?: string
          original_name?: string
          tags?: string[] | null
          uploaded_by?: string | null
          url?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          admin_reply: string | null
          created_at: string
          id: string
          message: string
          message_type: string | null
          replied_at: string | null
          sender_email: string
          sender_name: string
          sender_phone: string | null
          status: string | null
          subject: string | null
        }
        Insert: {
          admin_reply?: string | null
          created_at?: string
          id?: string
          message: string
          message_type?: string | null
          replied_at?: string | null
          sender_email: string
          sender_name: string
          sender_phone?: string | null
          status?: string | null
          subject?: string | null
        }
        Update: {
          admin_reply?: string | null
          created_at?: string
          id?: string
          message?: string
          message_type?: string | null
          replied_at?: string | null
          sender_email?: string
          sender_name?: string
          sender_phone?: string | null
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      multilingual_content: {
        Row: {
          content_id: string
          content_type: string
          created_at: string
          field_name: string
          id: string
          language_code: string
          translated_value: string
          updated_at: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string
          field_name: string
          id?: string
          language_code: string
          translated_value: string
          updated_at?: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string
          field_name?: string
          id?: string
          language_code?: string
          translated_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      pages: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          is_published: boolean | null
          meta_description: string | null
          meta_title: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          company_name: string | null
          contact_person: string | null
          created_at: string
          description: string | null
          email: string
          id: string
          investment_amount: number | null
          is_active: boolean | null
          is_featured: boolean | null
          logo_url: string | null
          name: string
          partner_type: string
          phone: string | null
          tier: string | null
          updated_at: string
        }
        Insert: {
          company_name?: string | null
          contact_person?: string | null
          created_at?: string
          description?: string | null
          email: string
          id?: string
          investment_amount?: number | null
          is_active?: boolean | null
          is_featured?: boolean | null
          logo_url?: string | null
          name: string
          partner_type: string
          phone?: string | null
          tier?: string | null
          updated_at?: string
        }
        Update: {
          company_name?: string | null
          contact_person?: string | null
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          investment_amount?: number | null
          is_active?: boolean | null
          is_featured?: boolean | null
          logo_url?: string | null
          name?: string
          partner_type?: string
          phone?: string | null
          tier?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      players: {
        Row: {
          appearances: number | null
          assists: number | null
          bio: string | null
          created_at: string
          cv_url: string | null
          date_of_birth: string | null
          goals: number | null
          height_cm: number | null
          highlight_video_url: string | null
          id: string
          is_featured: boolean | null
          is_visible_homepage: boolean | null
          name: string
          nationality: string | null
          photo_url: string | null
          position: string | null
          saves: number | null
          season: string | null
          squad: string | null
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          appearances?: number | null
          assists?: number | null
          bio?: string | null
          created_at?: string
          cv_url?: string | null
          date_of_birth?: string | null
          goals?: number | null
          height_cm?: number | null
          highlight_video_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_visible_homepage?: boolean | null
          name: string
          nationality?: string | null
          photo_url?: string | null
          position?: string | null
          saves?: number | null
          season?: string | null
          squad?: string | null
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          appearances?: number | null
          assists?: number | null
          bio?: string | null
          created_at?: string
          cv_url?: string | null
          date_of_birth?: string | null
          goals?: number | null
          height_cm?: number | null
          highlight_video_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_visible_homepage?: boolean | null
          name?: string
          nationality?: string | null
          photo_url?: string | null
          position?: string | null
          saves?: number | null
          season?: string | null
          squad?: string | null
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sections: {
        Row: {
          content: string | null
          created_at: string
          id: string
          is_active: boolean
          name: string
          section_type: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          section_type?: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          section_type?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_statistics: {
        Row: {
          created_at: string
          id: string
          metric_date: string
          metric_name: string
          metric_value: number
        }
        Insert: {
          created_at?: string
          id?: string
          metric_date?: string
          metric_name: string
          metric_value?: number
        }
        Update: {
          created_at?: string
          id?: string
          metric_date?: string
          metric_name?: string
          metric_value?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_admin_role_to_first_user: {
        Args: { user_id: string }
        Returns: undefined
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "investor" | "player" | "partner"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "investor", "player", "partner"],
    },
  },
} as const
