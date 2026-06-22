import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Clock, Play, Square } from "lucide-react";
import type { Screen, UserData } from "../App";

interface HistoryProps {
  navigate: (screen: Screen) => void;
  userData: UserData;
}

export function History({ navigate, userData }: HistoryProps) {
  const apps = ["Instagram", "WhatsApp", "Settings", "Camera", "Messages", "Chrome"];
  
  const sampleHistory = userData.history.length > 0 ? userData.history : [
    { id: "1", date: "Today", app: "Instagram", duration: "5 min" },
    { id: "2", date: "Today", app: "Settings", duration: "2 min" },
    { id: "3", date: "Yesterday", app: "WhatsApp", duration: "10 min" },
    { id: "4", date: "Yesterday", app: "Camera", duration: "1 min" },
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
          <h1 className="text-white font-semibold text-lg">Activity History</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Play className="w-5 h-5 text-amber-400" />
              Screen Recording
            </CardTitle>
            <CardDescription className="text-slate-400">
              View recorded activities by intruders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8 bg-slate-700/50 rounded-lg">
              <div className="text-center">
                <Square className="w-12 h-12 text-red-400 mx-auto mb-3" />
                <p className="text-white font-medium">No recordings available</p>
                <p className="text-slate-400 text-sm">Screen recording will start on unauthorized access</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">App Usage History</CardTitle>
            <CardDescription className="text-slate-400">
              Applications accessed during unauthorized sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {sampleHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-slate-700/50"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {item.app.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{item.app}</h3>
                  <p className="text-slate-400 text-sm">{item.date}</p>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{item.duration}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}