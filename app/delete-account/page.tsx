"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Activity, AlertTriangle, ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"
import { supabase } from "../../lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function DeleteAccountPage() {
  const [confirmText, setConfirmText] = useState("")
  const [confirmChecked, setConfirmChecked] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/")
      } else {
        setIsLoggedIn(true)
      }
    }
    checkAuth()
  }, [router])

  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE" || !confirmChecked) return
    setIsDeleting(true)
    setError(null)
    // Get the current session and JWT
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      setError("Could not get user session. Please log in again.")
      setIsDeleting(false)
      return
    }
    try {
      const res = await fetch("https://zsmslciskgzvzqvwceos.supabase.co/functions/v1/delete-account", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session.access_token}`,
          "Content-Type": "application/json"
        }
      })
      if (!res.ok) {
        const errText = await res.text()
        throw new Error(errText || "Failed to delete account.")
      }
      // Sign out and redirect
      await supabase.auth.signOut()
      router.push("/")
    } catch (err: any) {
      setError(err.message || "Failed to delete account.")
    } finally {
      setIsDeleting(false)
    }
  }

  const canDelete = confirmText === "DELETE" && confirmChecked

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
              <h1 className="text-xl font-semibold text-gray-900">grainZ</h1>
            </div>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Trash2 className="h-6 w-6 mr-2 text-red-500" />
            Delete Account
          </h2>
          <p className="text-gray-600 mt-2">
            Permanently delete your grainZ account and <strong>all associated data</strong>.
            <br />
            <span className="text-red-700 font-semibold">All your data (profile, activity logs, nutrition, etc.) will be erased <u>immediately</u>. <br />No backups or copies are retained by grainZ.</span>
          </p>
        </div>

        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Warning:</strong> This action cannot be undone. <br />
            <span>All your health data, progress, and account information will be <u>permanently deleted immediately</u>. <br />grainZ does <strong>not</strong> retain any backups or copies after deletion.</span>
          </AlertDescription>
        </Alert>

        {isLoggedIn && (
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Account Deletion</CardTitle>
              <CardDescription>Please read the following information carefully before proceeding.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* What will be deleted */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">What will be deleted:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    All your health tracking data and metrics
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Personal profile information and preferences
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Goals, achievements, and progress history
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Subscription and billing information
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    All app-generated reports and insights
                  </li>
                </ul>
                <div className="mt-2 text-xs text-red-700 font-semibold">
                  <span>All of the above will be deleted <u>immediately</u> and <strong>no backups</strong> are kept by grainZ.</span>
                </div>
              </div>

              {/* Confirmation */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="confirm-text">
                    Type <strong>DELETE</strong> to confirm:
                  </Label>
                  <Input
                    id="confirm-text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="Type DELETE here"
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="confirm-checkbox"
                    checked={confirmChecked}
                    onCheckedChange={(checked) => setConfirmChecked(checked as boolean)}
                  />
                  <Label htmlFor="confirm-checkbox" className="text-sm">
                    I understand that this action cannot be undone and all my data will be permanently deleted.
                  </Label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Link href="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleDeleteAccount}
                  disabled={!canDelete || isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </>
                  )}
                </Button>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Alternative Options */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Need help instead?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              If you're having issues with the app, consider these alternatives:
            </p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                Contact Support
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                Temporarily Deactivate Account
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                Export Your Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
