"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Activity, AlertTriangle, ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"

export default function DeleteAccountPage() {
  const [confirmText, setConfirmText] = useState("")
  const [confirmChecked, setConfirmChecked] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE" || !confirmChecked) return

    setIsDeleting(true)
    // Simulate API call
    setTimeout(() => {
      console.log("Account deleted")
      setIsDeleting(false)
      // Redirect to sign-in page
    }, 2000)
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
              <h1 className="text-xl font-semibold text-gray-900">Grainz</h1>
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
          <p className="text-gray-600 mt-2">Permanently delete your Grainz account and all associated data</p>
        </div>

        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Warning:</strong> This action cannot be undone. All your health data, progress, and account
            information will be permanently deleted.
          </AlertDescription>
        </Alert>

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
          </CardContent>
        </Card>

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
