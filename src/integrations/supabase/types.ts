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
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      color_options: {
        Row: {
          color_id: string
          id: string
          image_url: string | null
          name: string
          price_modifier: number | null
          product_id: string
          value: string
        }
        Insert: {
          color_id: string
          id?: string
          image_url?: string | null
          name: string
          price_modifier?: number | null
          product_id: string
          value: string
        }
        Update: {
          color_id?: string
          id?: string
          image_url?: string | null
          name?: string
          price_modifier?: number | null
          product_id?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "color_options_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      device_types: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          id: string
          national_id_path: string | null
          order_id: string
          salary_certificate_path: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          national_id_path?: string | null
          order_id: string
          salary_certificate_path?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          national_id_path?: string | null
          order_id?: string
          salary_certificate_path?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      lease_terms: {
        Row: {
          description: string
          duration_months: number
          id: string
          name: string
        }
        Insert: {
          description: string
          duration_months: number
          id: string
          name: string
        }
        Update: {
          description?: string
          duration_months?: number
          id?: string
          name?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          business_name: string | null
          created_at: string
          has_protection_plan: boolean
          id: string
          is_business_order: boolean
          monthly_price: number
          national_id_path: string | null
          product_id: string
          product_name: string
          protection_plan_price: number | null
          salary_certificate_path: string | null
          selected_color: Json
          selected_condition: string
          selected_lease_term: Json
          selected_storage: Json
          status: string | null
          total_monthly_price: number
          user_email: string
          user_name: string
          user_phone: string
        }
        Insert: {
          business_name?: string | null
          created_at?: string
          has_protection_plan?: boolean
          id?: string
          is_business_order?: boolean
          monthly_price: number
          national_id_path?: string | null
          product_id: string
          product_name: string
          protection_plan_price?: number | null
          salary_certificate_path?: string | null
          selected_color: Json
          selected_condition: string
          selected_lease_term: Json
          selected_storage: Json
          status?: string | null
          total_monthly_price: number
          user_email: string
          user_name: string
          user_phone: string
        }
        Update: {
          business_name?: string | null
          created_at?: string
          has_protection_plan?: boolean
          id?: string
          is_business_order?: boolean
          monthly_price?: number
          national_id_path?: string | null
          product_id?: string
          product_name?: string
          protection_plan_price?: number | null
          salary_certificate_path?: string | null
          selected_color?: Json
          selected_condition?: string
          selected_lease_term?: Json
          selected_storage?: Json
          status?: string | null
          total_monthly_price?: number
          user_email?: string
          user_name?: string
          user_phone?: string
        }
        Relationships: []
      }
      product_conditions: {
        Row: {
          condition: string
          id: string
          is_available: boolean
          product_id: string
        }
        Insert: {
          condition: string
          id?: string
          is_available?: boolean
          product_id: string
        }
        Update: {
          condition?: string
          id?: string
          is_available?: boolean
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_conditions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_features: {
        Row: {
          feature: string
          id: string
          product_id: string
        }
        Insert: {
          feature: string
          id?: string
          product_id: string
        }
        Update: {
          feature?: string
          id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_features_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_pricing: {
        Row: {
          color_id: string
          condition: string
          id: string
          lease_term_id: string
          price: number
          product_id: string
          storage_id: string
        }
        Insert: {
          color_id: string
          condition: string
          id?: string
          lease_term_id: string
          price: number
          product_id: string
          storage_id: string
        }
        Update: {
          color_id?: string
          condition?: string
          id?: string
          lease_term_id?: string
          price?: number
          product_id?: string
          storage_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_pricing_lease_term_id_fkey"
            columns: ["lease_term_id"]
            isOneToOne: false
            referencedRelation: "lease_terms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_pricing_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          base_price: number
          brand: string
          created_at: string
          description: string
          description_ar: string | null
          id: string
          image_url: string
          name: string
          name_ar: string | null
          slug: string
          type_id: string
          updated_at: string
        }
        Insert: {
          base_price: number
          brand: string
          created_at?: string
          description: string
          description_ar?: string | null
          id: string
          image_url: string
          name: string
          name_ar?: string | null
          slug: string
          type_id: string
          updated_at?: string
        }
        Update: {
          base_price?: number
          brand?: string
          created_at?: string
          description?: string
          description_ar?: string | null
          id?: string
          image_url?: string
          name?: string
          name_ar?: string | null
          slug?: string
          type_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "device_types"
            referencedColumns: ["id"]
          },
        ]
      }
      storage_options: {
        Row: {
          capacity: string
          id: string
          price_modifier: number | null
          product_id: string
          storage_id: string
        }
        Insert: {
          capacity: string
          id?: string
          price_modifier?: number | null
          product_id: string
          storage_id: string
        }
        Update: {
          capacity?: string
          id?: string
          price_modifier?: number | null
          product_id?: string
          storage_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "storage_options_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      user_funnel_events: {
        Row: {
          created_at: string
          device_type: string
          funnel_step: string
          id: string
          ip_address: string | null
          referrer: string | null
          session_id: string
          time_spent_seconds: number | null
          traffic_source: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          device_type: string
          funnel_step: string
          id?: string
          ip_address?: string | null
          referrer?: string | null
          session_id: string
          time_spent_seconds?: number | null
          traffic_source: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          device_type?: string
          funnel_step?: string
          id?: string
          ip_address?: string | null
          referrer?: string | null
          session_id?: string
          time_spent_seconds?: number | null
          traffic_source?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_funnel_data: {
        Args: {
          from_date?: string
          to_date?: string
          device_filter?: string
          source_filter?: string
        }
        Returns: {
          funnel_step: string
          user_count: number
        }[]
      }
      get_referral_data: {
        Args: { from_date?: string; to_date?: string; device_filter?: string }
        Returns: {
          traffic_source: string
          user_count: number
        }[]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
