"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/sign-in");
      } else {
        setUser(data.session.user);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border border-blue-100 bg-white">
        <CardHeader className="flex flex-col items-center gap-2 pt-8 pb-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </div>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Welcome to your dashboard!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-center text-gray-700 text-lg">
            Signed in as <span className="font-semibold text-blue-700">{user.email}</span>
          </div>
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow transition"
            onClick={() => router.push("/delete-account")}
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 