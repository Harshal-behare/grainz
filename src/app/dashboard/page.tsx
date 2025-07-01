"use client";
import * as React from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Heart, User, Shield, Settings, Trash2, Activity, Goal, Calendar } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <div className="bg-primary rounded-full p-2">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#22c55e" />
              <path d="M8 12h2l1-4 3 8 1-4h2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-900">Grainz</span>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-[#f1f5f9] text-gray-900 px-3 py-1 rounded-full font-semibold">Premium</Badge>
          <Button variant="outline" className="border-none text-gray-700 font-semibold">Logout</Button>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Welcome back, John Doe!</h1>
          <p className="text-gray-600 text-lg">Manage your Grainz account and data</p>
        </div>
        {/* Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Account Information */}
          <Card className="p-6 rounded-xl shadow bg-white">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-6 w-6 text-gray-700" />
              <span className="text-xl font-semibold">Account Information</span>
            </div>
            <div className="space-y-1 text-gray-700">
              <div><span className="font-medium">Name</span><br />John Doe</div>
              <div><span className="font-medium">Email</span><br />john@example.com</div>
              <div><span className="font-medium">Plan</span><br /><Badge className="bg-[#f1f5f9] text-gray-900 px-2 py-0.5 rounded-full">Premium</Badge></div>
              <div><span className="font-medium">Member since</span><br />1/15/2024</div>
            </div>
          </Card>
          {/* Health Data */}
          <Card className="p-6 rounded-xl shadow bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-pink-600" />
              <span className="text-xl font-semibold">Health Data</span>
            </div>
            <div className="text-gray-700 mb-4">Manage your health tracking data</div>
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 mb-2">
              <Trash2 className="h-5 w-5" /> Delete Health Pages
            </Button>
            <div className="text-xs text-gray-500">This will remove all your health tracking pages and data</div>
          </Card>
          {/* Account Settings */}
          <Card className="p-6 rounded-xl shadow bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-6 w-6 text-gray-700" />
              <span className="text-xl font-semibold">Account Settings</span>
            </div>
            <div className="text-gray-700 mb-4">Manage your account preferences</div>
            <div className="space-y-2 mb-2">
              <Button variant="outline" className="w-full flex items-center gap-2 border-gray-300 font-semibold"> <Settings className="h-4 w-4" /> Edit Profile</Button>
              <Button variant="outline" className="w-full flex items-center gap-2 border-gray-300 font-semibold"> <Shield className="h-4 w-4" /> Privacy Settings</Button>
            </div>
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2">
              <Trash2 className="h-5 w-5" /> Delete Account
            </Button>
          </Card>
        </div>
        {/* Quick Overview */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="p-6 rounded-xl shadow bg-white flex flex-col items-start">
              <div className="flex items-center gap-2 mb-2"><Heart className="h-6 w-6 text-pink-600" /><span className="text-gray-600 font-medium">Health Score</span></div>
              <div className="text-3xl font-extrabold text-gray-900">85</div>
            </Card>
            <Card className="p-6 rounded-xl shadow bg-white flex flex-col items-start">
              <div className="flex items-center gap-2 mb-2"><Activity className="h-6 w-6 text-green-600" /><span className="text-gray-600 font-medium">Active Days</span></div>
              <div className="text-3xl font-extrabold text-gray-900">23</div>
            </Card>
            <Card className="p-6 rounded-xl shadow bg-white flex flex-col items-start">
              <div className="flex items-center gap-2 mb-2"><Goal className="h-6 w-6 text-blue-600" /><span className="text-gray-600 font-medium">Goals Met</span></div>
              <div className="text-3xl font-extrabold text-gray-900">12</div>
            </Card>
            <Card className="p-6 rounded-xl shadow bg-white flex flex-col items-start">
              <div className="flex items-center gap-2 mb-2"><Calendar className="h-6 w-6 text-purple-600" /><span className="text-gray-600 font-medium">Streak</span></div>
              <div className="text-3xl font-extrabold text-gray-900">7 days</div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 