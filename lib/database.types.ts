export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string | null
          age: number | null
          gender: string | null
          activitylevel: string | null
          goalweight: number | null
          currentweight: number | null
          weightlost: number | null
          streakdays: number | null
          avatar: string | null
          medicalconditions: string[] | null
          created_at: string | null
          onboarding_completed: boolean | null
          purpose: string | null
          height: number | null
          provider: string | null
          dietary_preference: string | null
          notifications_enabled: boolean
          calorie_goal: number | null
        }
        Insert: {
          id: string
          email: string
          username?: string | null
          age?: number | null
          gender?: string | null
          activitylevel?: string | null
          goalweight?: number | null
          currentweight?: number | null
          weightlost?: number | null
          streakdays?: number | null
          avatar?: string | null
          medicalconditions?: string[] | null
          created_at?: string | null
          onboarding_completed?: boolean | null
          purpose?: string | null
          height?: number | null
          provider?: string | null
          dietary_preference?: string | null
          notifications_enabled?: boolean
          calorie_goal?: number | null
        }
        Update: {
          id?: string
          email?: string
          username?: string | null
          age?: number | null
          gender?: string | null
          activitylevel?: string | null
          goalweight?: number | null
          currentweight?: number | null
          weightlost?: number | null
          streakdays?: number | null
          avatar?: string | null
          medicalconditions?: string[] | null
          created_at?: string | null
          onboarding_completed?: boolean | null
          purpose?: string | null
          height?: number | null
          provider?: string | null
          dietary_preference?: string | null
          notifications_enabled?: boolean
          calorie_goal?: number | null
        }
      }
      daily_activity: {
        Row: {
          id: number
          user_id: string
          weight: number | null
          water_glasses: number | null
          calories_intake: number | null
          sleep_hours: number | null
          date: string
          created_at: string
        }
        Insert: {
          user_id: string
          weight?: number | null
          water_glasses?: number | null
          calories_intake?: number | null
          sleep_hours?: number | null
          date?: string
          created_at?: string
        }
        Update: {
          user_id?: string
          weight?: number | null
          water_glasses?: number | null
          calories_intake?: number | null
          sleep_hours?: number | null
          date?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          message: string
          icon: string | null
          created_at: string
          read: boolean
          action_url: string | null
          actionable: boolean
        }
        Insert: {
          user_id: string
          type: string
          title: string
          message: string
          icon?: string | null
          created_at?: string
          read?: boolean
          action_url?: string | null
          actionable?: boolean
        }
        Update: {
          user_id?: string
          type?: string
          title?: string
          message?: string
          icon?: string | null
          created_at?: string
          read?: boolean
          action_url?: string | null
          actionable?: boolean
        }
      }
    }
  }
}
