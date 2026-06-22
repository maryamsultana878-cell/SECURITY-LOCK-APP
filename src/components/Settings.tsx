import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Lock, Mail, MapPin, Shield, Laptop, Key, Smartphone } from "lucide-react";
import type { Screen, UserData } from "../App";

interface SettingsProps {
  navigate: (screen: Screen) => void;
  userData: UserData;
}

export function Settings({ navigate, userData }: SettingsProps) {
  const settingsItems = [
    {
      icon: Lock,
      title: "Change Password",
      description: "Update your account password",
      color: "text-blue-400",
    },
    {
      icon: Mail,
      title: "Email Address",
      description: userData.email || "Not set",
      color: "text-emerald-400",
    },
    {
      icon: MapPin,
      title: "Location",
      description: "Manage location settings",
      color: "text-amber-400",
    },
    {
      icon: Shield,
      title: "Security Checkup",
      description: "Review your security settings",
      color: "text-red-400",
    },
    {
      icon: Key,
      title: "Saved Login Info",
      description: "Manage saved credentials",
      color: "text-purple-400",
    },
    {
      icon: Laptop,
      title: "Where You're Logged In",
      description: "This device - Current session",
      color: "text-cyan-400",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("dashboard")}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white font-semibold text-lg">Settings</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Account Settings</CardTitle>
            <CardDescription className="text-slate-400">
              Manage your account preferences and security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {settingsItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 cursor-pointer transition-colors"
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <div className="flex-1">
                  <h3 className="text-white font-medium">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-400" />
              Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">This Device</h3>
                <p className="text-slate-400 text-sm">Active now</p>
              </div>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                Current
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}