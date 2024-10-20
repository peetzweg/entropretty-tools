import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AppState {
  supabase: SupabaseClient
}

export const useApp = create<AppState>()(
  persist(
    (set, get) => {
      const supabaseUrl = "https://wsgteflykxoabinjrflu.supabase.co"
      const supabaseKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzZ3RlZmx5a3hvYWJpbmpyZmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzMTQyOTgsImV4cCI6MjA0NDg5MDI5OH0.gx0MYyMXX238qW9P69AM5meRR1Kv1jW9vbOzwSN8I1c"
      const supabase = createClient(supabaseUrl, supabaseKey)

      return {
        supabase,
      }
    },
    {
      name: "entropretty-gallery-state",
      partialize: (state) => ({}),
    },
  ),
)
