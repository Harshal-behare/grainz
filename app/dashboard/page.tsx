"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Heart, Settings, Trash2, User, LogOut, Shield } from "lucide-react"
import Link from "next/link"
import { supabase } from "../../lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [dailyActivity, setDailyActivity] = useState<any>(null)
  const [nutrition, setNutrition] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/")
        return
      }
      setUser(user)
      // Fetch profile
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single()
      setProfile(profile)
      // Fetch today's activity
      const today = new Date().toISOString().slice(0, 10)
      const { data: activity } = await supabase
        .from("daily_activity")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .single()
      setDailyActivity(activity)
      // Fetch today's nutrition
      const { data: nutrition } = await supabase
        .from("daily_nutrition")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .single()
      setNutrition(nutrition)
      setLoading(false)
    }
    fetchData()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="rounded-xl overflow-hidden mr-3 w-10 h-10 shadow-md">
                <Image
                  src="/grainz_logo.jpg"
                  alt="grainZ Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">grainZ</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">{profile?.plan || "User"}</Badge>
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
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {profile?.username || user?.email}!</h2>
          <p className="text-gray-600">Manage your grainZ account and data</p>
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
                <p className="text-sm">{profile?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Username</p>
                <p className="text-sm">{profile?.username || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Plan</p>
                <Badge variant="outline">{profile?.plan || "-"}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Member since</p>
                <p className="text-sm">{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Streak Days</p>
                <p className="text-sm">{profile?.streakdays ?? 0}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Current Weight</p>
                <p className="text-sm">{profile?.currentweight ?? "-"} kg</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Goal Weight</p>
                <p className="text-sm">{profile?.goalweight ?? "-"} kg</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Height</p>
                <p className="text-sm">{profile?.height ?? "-"} cm</p>
              </div>
            </CardContent>
          </Card>
          {/* Daily Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Today's Activity
              </CardTitle>
              <CardDescription>Track your daily health metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Weight</p>
                <p className="text-sm">{dailyActivity?.weight ?? "-"} kg</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Water Glasses</p>
                <p className="text-sm">{dailyActivity?.water_glasses ?? 0}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Calories Intake</p>
                <p className="text-sm">{dailyActivity?.calories_intake ?? 0}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Sleep Hours</p>
                <p className="text-sm">{dailyActivity?.sleep_hours ?? 0}</p>
              </div>
            </CardContent>
          </Card>
          {/* Daily Nutrition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Today's Nutrition
              </CardTitle>
              <CardDescription>Overview of your nutrition today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Calories</p>
                <p className="text-sm">{nutrition?.total_calories ?? 0}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Protein</p>
                <p className="text-sm">{nutrition?.total_protein ?? 0} g</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Carbs</p>
                <p className="text-sm">{nutrition?.total_carbs ?? 0} g</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Fat</p>
                <p className="text-sm">{nutrition?.total_fat ?? 0} g</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Fiber</p>
                <p className="text-sm">{nutrition?.total_fiber ?? 0} g</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Sugar</p>
                <p className="text-sm">{nutrition?.total_sugar ?? 0} g</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Sodium</p>
                <p className="text-sm">{nutrition?.total_sodium ?? 0} mg</p>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <Link href="/delete-account">
                <Button variant="destructive" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
