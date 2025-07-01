"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
// shadcn/ui imports
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/dashboard");
      }
    });
  }, []);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border border-blue-100 bg-white">
        <CardHeader className="flex flex-col items-center gap-2 pt-8 pb-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </div>
          <CardTitle className="text-3xl font-extrabold text-blue-700">Welcome Back</CardTitle>
          <CardDescription className="text-gray-500 text-center">Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="pt-0 pb-8">
          <form onSubmit={handleEmailSignIn} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium mb-1">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium mb-1">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="my-6 flex items-center justify-center">
            <Separator className="flex-1" />
            <span className="mx-3 text-gray-400 font-medium">or</span>
            <Separator className="flex-1" />
          </div>
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 border-gray-200 hover:bg-blue-50 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm transition disabled:opacity-50"
            disabled={loading}
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.2l6.4-6.4C33.5 5.1 28.1 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-8.1 20-21 0-1.3-.1-2.7-.5-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c2.6 0 5 .8 7 2.2l6.4-6.4C33.5 5.1 28.1 3 24 3 15.6 3 8.1 8.5 6.3 14.7z"/><path fill="#FBBC05" d="M24 44c6.1 0 11.2-2 14.9-5.4l-7-5.7C30.1 36 24 36 24 36c-6.1 0-11.2-2-14.9-5.4l7-5.7C17.9 30.9 21.9 34 24 34z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.2l6.4-6.4C33.5 5.1 28.1 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-8.1 20-21 0-1.3-.1-2.7-.5-4z"/></g></svg>
            Sign in with Google
          </Button>
          {error && <div className="mt-4 text-red-600 text-center font-medium">{error}</div>}
          <div className="mt-8 text-xs text-gray-400 text-center">
            Google Sign-In is securely configured for this app.
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 