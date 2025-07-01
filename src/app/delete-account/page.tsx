"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Activity, AlertTriangle, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

export default function DeleteAccountPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/sign-in");
      } else {
        setUser(data.user);
      }
    });
  }, [router, supabase.auth]);

  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE") return;
    setIsDeleting(true);
    setError(null);
    setSuccess(null);
    try {
      const session = (await supabase.auth.getSession()).data.session;
      if (!session) throw new Error("No session found");
      const res = await fetch(
        "https://zsmslciskgzvzqvwceos.supabase.co/functions/v1/delete-account",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to delete account");
      }
      setSuccess("Your account and all associated data have been deleted.");
      setTimeout(() => {
        supabase.auth.signOut();
        router.replace("/sign-in");
      }, 2000);
    } catch (e: any) {
      setError(e.message || "An error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

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
              <Button variant="outline">
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
            <strong>Warning:</strong> This action cannot be undone. All your health data, progress, and account information will be permanently deleted.
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
                <li className="flex items-center"><div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>All your health tracking data and metrics</li>
                <li className="flex items-center"><div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>Personal profile information and preferences</li>
                <li className="flex items-center"><div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>Goals, achievements, and progress history</li>
                <li className="flex items-center"><div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>Subscription and billing information</li>
                <li className="flex items-center"><div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>All app-generated reports and insights</li>
              </ul>
            </div>

            {/* Confirmation */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="confirm-text">Type <strong>DELETE</strong> to confirm:</Label>
                <Input
                  id="confirm-text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Type DELETE here"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Link href="/dashboard" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">Cancel</Button>
              </Link>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleDeleteAccount}
                disabled={confirmText !== "DELETE" || isDeleting}
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
            {error && <div className="mt-4 text-red-600 text-center font-medium">{error}</div>}
            {success && <div className="mt-4 text-green-600 text-center font-medium">{success}</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 