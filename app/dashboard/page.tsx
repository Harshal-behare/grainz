"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Heart, Settings, Trash2, User, LogOut, Shield, Bell } from "lucide-react"
import Link from "next/link"
import { getCurrentUser, signOut } from "@/lib/auth"
import { getUserDashboardData } from "@/lib/queries"

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadDashboard = async () => {
      const { user: authUser } = await getCurrentUser()

      if (!authUser) {
        router.push("/")
        return
      }

      // Check if admin
      if (authUser.email === "admin@grainz.com") {
        router.push("/admin")
        return
      }

      const data = await getUserDashboardData(authUser.id)
      setUser(authUser)
      setDashboardData(data)
      setLoading(false)
    }

    loadDashboard()
  }, [router])

  const handleDeletePages = async () => {
    if (confirm("Are you sure you want to delete all your health pages? This action cannot be undone.")) {
      // Implement delete pages logic
      console.log("Delete pages requested")
    }
  }

  const handleLogout = async () => {
    await signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  const userProfile = dashboardData?.user
  const recentActivity = dashboardData?.recentActivity || []
  const notifications = dashboardData?.notifications || []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-primary rounded-full p-2 mr-3">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Grainz</h1>
            </div>
            <div className="flex items-center space-x-4">
              {notifications.length > 0 && (
                <div className="relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notifications.length}
                  </span>
                </div>
              )}
              <Badge variant="secondary">{userProfile?.dietary_preference || "User"}</Badge>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {userProfile?.username || user?.email?.split("@")[0] || "User"}!
          </h2>
          <p className="text-gray-600">Manage your Grainz account and health data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-sm">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Username</p>
                <p className="text-sm">{userProfile?.username || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Current Weight</p>
                <p className="text-sm">{userProfile?.currentweight ? `${userProfile.currentweight} kg` : "Not set"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Goal Weight</p>
                <p className="text-sm">{userProfile?.goalweight ? `${userProfile.goalweight} kg` : "Not set"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Streak Days</p>
                <Badge variant="outline">{userProfile?.streakdays || 0} days</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Health Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Health Data
              </CardTitle>
              <CardDescription>Manage your health tracking data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <p>Recent Activities: {recentActivity.length}</p>
                  <p>Calorie Goal: {userProfile?.calorie_goal || 2000} kcal</p>
                </div>
                <Button variant="destructive" className="w-full" onClick={handleDeletePages}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Health Pages
                </Button>
                <p className="text-xs text-gray-500">This will remove all your health tracking pages and data</p>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Account Settings
              </CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Shield className="h-4 w-4 mr-2" />
                Privacy Settings
              </Button>
              <Link href="/delete-account" className="block">
                <Button variant="destructive" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Heart className="h-8 w-8 text-red-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Current Weight</p>
                    <p className="text-2xl font-bold">{userProfile?.currentweight || "--"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Activities</p>
                    <p className="text-2xl font-bold">{recentActivity.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">G</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Goal Weight</p>
                    <p className="text-2xl font-bold">{userProfile?.goalweight || "--"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Streak</p>
                    <p className="text-2xl font-bold">{userProfile?.streakdays || 0} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Notifications */}
        {notifications.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
            <div className="space-y-2">
              {notifications.slice(0, 3).map((notification: any) => (
                <Card key={notification.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
