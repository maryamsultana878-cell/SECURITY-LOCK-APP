import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Shield, Mail, Camera, Plus } from "lucide-react";
import type { Screen, UserData } from "../App";

interface AttemptsProps {
  navigate: (screen: Screen) => void;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export function Attempts({ navigate, userData, setUserData }: AttemptsProps) {
  const [alertEmail, setAlertEmail] = useState("");
  const [showAddEmail, setShowAddEmail] = useState(false);

  const addAttempt = () => {
    const newAttempt = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      image: null,
      successful: false,
    };
    setUserData({ ...userData, attempts: [...userData.attempts, newAttempt] });
  };

  const addAlertEmail = () => {
    if (!alertEmail.includes("@")) return;
    setShowAddEmail(false);
    setAlertEmail("");
  };

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
          <h1 className="text-white font-semibold text-lg">Unlock Attempts</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-400" />
              Security Alerts
            </CardTitle>
            <CardDescription className="text-slate-400">
              Get notified when someone tries to unlock your phone
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {showAddEmail ? (
              <div className="space-y-3">
                <Input
                  placeholder="Enter email for alerts"
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
                <div className="flex gap-2">
                  <Button onClick={addAlertEmail} className="flex-1 bg-red-500 hover:bg-red-600">
                    Add Email
                  </Button>
                  <Button onClick={() => setShowAddEmail(false)} variant="ghost" className="text-slate-400">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setShowAddEmail(true)}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                <Mail className="w-5 h-5 mr-2" />
                Add Alert Email
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Attempt History</CardTitle>
                <CardDescription className="text-slate-400">
                  {userData.attempts.length} attempts recorded
                </CardDescription>
              </div>
              <Button onClick={addAttempt} size="sm" className="bg-red-500 hover:bg-red-600">
                <Plus className="w-4 h-4 mr-1" />
                Simulate
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {userData.attempts.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <p className="text-white font-medium">No unauthorized attempts</p>
                <p className="text-slate-400 text-sm">Your phone is secure</p>
              </div>
            ) : (
              <div className="space-y-3">
                {userData.attempts.map((attempt) => (
                  <div
                    key={attempt.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-slate-700/50"
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-600 flex items-center justify-center overflow-hidden">
                      {attempt.image ? (
                        <img src={attempt.image} alt="Attempt" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">
                        {attempt.successful ? "Successful" : "Failed"} Attempt
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {attempt.date} at {attempt.time}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        attempt.successful
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {attempt.successful ? "Success" : "Failed"}
                    </span>
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