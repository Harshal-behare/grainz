"use client";
import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DeleteAccountPage() {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Fetch user on mount
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    await supabase.auth.signInWithOAuth({ provider: "google" });
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
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
      setMessage("Your account and all associated data have been deleted.");
      setTimeout(() => {
        supabase.auth.signOut();
        router.push("/");
      }, 2000);
    } catch (e: any) {
      setError(e.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border border-blue-100 bg-white">
        <CardHeader className="flex flex-col items-center gap-2 pt-8 pb-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </div>
          <CardTitle>Delete Your Account</CardTitle>
          <CardDescription>Sign in to request deletion of your account and all associated data. This action is <span className="font-semibold text-red-500">irreversible</span>.</CardDescription>
        </CardHeader>
        <CardContent>
          {!user ? (
            <Button
              variant="outline"
              onClick={handleSignIn}
              className="w-full flex items-center justify-center gap-2 border-gray-200 hover:bg-blue-50 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm transition disabled:opacity-50"
              disabled={loading}
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.2l6.4-6.4C33.5 5.1 28.1 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-8.1 20-21 0-1.3-.1-2.7-.5-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c2.6 0 5 .8 7 2.2l6.4-6.4C33.5 5.1 28.1 3 24 3 15.6 3 8.1 8.5 6.3 14.7z"/><path fill="#FBBC05" d="M24 44c6.1 0 11.2-2 14.9-5.4l-7-5.7C30.1 36 24 36 24 36c-6.1 0-11.2-2-14.9-5.4l7-5.7C17.9 30.9 21.9 34 24 34z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.2l6.4-6.4C33.5 5.1 28.1 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-8.1 20-21 0-1.3-.1-2.7-.5-4z"/></g></svg>
              Sign in with Google
            </Button>
          ) : (
            <div className="space-y-6">
              <div className="text-center text-gray-700 text-lg">Signed in as <span className="font-semibold text-blue-700">{user.email}</span></div>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow transition"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete My Account"}
              </Button>
            </div>
          )}
          {message && <div className="mt-6 text-green-600 text-center font-semibold">{message}</div>}
          {error && <div className="mt-6 text-red-600 text-center font-semibold">{error}</div>}
        </CardContent>
      </Card>
    </div>
  );
} 