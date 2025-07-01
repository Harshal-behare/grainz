import { supabase } from "./supabase"

export const getAdminStats = async () => {
  try {
    // Get total users
    const { count: totalUsers } = await supabase.from("users").select("*", { count: "exact", head: true })

    // Get users created in last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { count: newUsers } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .gte("created_at", thirtyDaysAgo.toISOString())

    // Get active users (users with activity in last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { count: activeUsers } = await supabase
      .from("daily_activity")
      .select("user_id", { count: "exact", head: true })
      .gte("created_at", sevenDaysAgo.toISOString())

    // Get total daily activities
    const { count: totalActivities } = await supabase.from("daily_activity").select("*", { count: "exact", head: true })

    // Get total notifications
    const { count: totalNotifications } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })

    return {
      totalUsers: totalUsers || 0,
      newUsers: newUsers || 0,
      activeUsers: activeUsers || 0,
      totalActivities: totalActivities || 0,
      totalNotifications: totalNotifications || 0,
    }
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return {
      totalUsers: 0,
      newUsers: 0,
      activeUsers: 0,
      totalActivities: 0,
      totalNotifications: 0,
    }
  }
}

export const getUserDashboardData = async (userId: string) => {
  try {
    // Get user profile
    const { data: user } = await supabase.from("users").select("*").eq("id", userId).single()

    // Get recent activity
    const { data: recentActivity } = await supabase
      .from("daily_activity")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false })
      .limit(7)

    // Get notifications
    const { data: notifications } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .eq("read", false)
      .order("created_at", { ascending: false })
      .limit(5)

    return {
      user,
      recentActivity: recentActivity || [],
      notifications: notifications || [],
    }
  } catch (error) {
    console.error("Error fetching user dashboard data:", error)
    return {
      user: null,
      recentActivity: [],
      notifications: [],
    }
  }
}

export const deleteUserAccount = async (userId: string) => {
  try {
    // Call the edge function to delete account
    const { data, error } = await supabase.functions.invoke("delete-account", {
      body: { userId },
    })

    return { data, error }
  } catch (error) {
    console.error("Error deleting account:", error)
    return { data: null, error }
  }
}
