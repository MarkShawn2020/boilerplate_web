export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      keys: {
        Row: {
          id: string
          name: string
          value: string
          description: string | null
          tags: string[]
          revoked: boolean
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          value: string
          description?: string | null
          tags?: string[]
          revoked?: boolean
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          value?: string
          description?: string | null
          tags?: string[]
          revoked?: boolean
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      solutions: {
        Row: {
          id: string
          name: string
          description: string | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      solution_keys: {
        Row: {
          solution_id: string
          key_id: string
        }
        Insert: {
          solution_id: string
          key_id: string
        }
        Update: {
          solution_id?: string
          key_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
