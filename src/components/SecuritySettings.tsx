import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Shield, Smartphone, MessageSquare, Mail, Key } from "lucide-react";
import type { Screen, UserData } from "../App";

interface SecuritySettingsProps {
  navigate: (screen: Screen) => void;
  userData: UserData;
}

export function SecuritySettings({ navigate, userData }: SecuritySettingsProps) {
  const [twoFactorMethod, setTwoFactorMethod] = useState<"app" | "sms" | "email" | null>(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const authMethods = [
    {
      id: "app",
      icon: Key,
      title: "Authenticator App",
      description: "Get codes from Google Authenticator or similar apps",
      color: "bg-blue-500",
    },
    {
      id: "sms",
      icon: MessageSquare,
      title: "SMS Authentication",
      description: "Receive codes via text message",
      color: "bg-emerald-500",
    },
    {
      id: "email",
      icon: Mail,
      title: "Email Authentication",
      description: "Receive codes via email",
      color: "bg-purple-500",
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
          <h1 className="text-white font-semibold text-lg">Security Settings</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-violet-400" />
              Contact Info
            </CardTitle>
            <CardDescription className="text-slate-400">
              Your security contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
              <div>
                <p className="text-white font-medium">Email</p>
                <p className="text-slate-400 text-sm">{userData.email || "Not set"}</p>
              </div>
              <Button variant="ghost" className="text-violet-400">Edit</Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
              <div>
                <p className="text-white font-medium">Password</p>
                <p className="text-slate-400 text-sm">Last changed: Never</p>
              </div>
              <Button variant="ghost" className="text-violet-400">Change</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Where You're Logged In</CardTitle>
            <CardDescription className="text-slate-400">
              Devices that have access to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">This Device</h3>
                <p className="text-slate-400 text-sm">Active now • Location: Unknown</p>
              </div>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                Current
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Two-Factor Authentication</CardTitle>
            <CardDescription className="text-slate-400">
              Add an extra layer of security to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Enable 2FA</p>
                <p className="text-slate-400 text-sm">
                  {twoFactorEnabled ? "Enabled via " + twoFactorMethod : "Not enabled"}
                </p>
              </div>
              <Button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={twoFactorEnabled ? "bg-red-500 hover:bg-red-600" : "bg-violet-500 hover:bg-violet-600"}
              >
                {twoFactorEnabled ? "Disable" : "Enable"}
              </Button>
            </div>

            {twoFactorEnabled && (
              <div className="space-y-3 pt-4 border-t border-slate-700">
                <p className="text-slate-300 font-medium">Choose authentication method:</p>
                {authMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setTwoFactorMethod(method.id as "app" | "sms" | "email")}
                    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
                      twoFactorMethod === method.id
                        ? "bg-violet-500/20 border border-violet-500/40"
                        : "bg-slate-700/50 hover:bg-slate-700"
                    }`}
                  >
                    <div className={`w-10 h-10 ${method.color} rounded-full flex items-center justify-center`}>
                      <method.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{method.title}</h3>
                      <p className="text-slate-400 text-sm">{method.description}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        twoFactorMethod === method.id
                          ? "border-violet-400 bg-violet-400"
                          : "border-slate-500"
                      }`}
                    >
                      {twoFactorMethod === method.id && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}