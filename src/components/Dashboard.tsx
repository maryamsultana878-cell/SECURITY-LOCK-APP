import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Settings, Shield, Clock, Users, LogOut, Trash2, UserPlus, History, Lock, Camera } from "lucide-react";
import type { Screen, UserData } from "../App";

interface DashboardProps {
  navigate: (screen: Screen) => void;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Dashboard({ navigate, userData, setUserData, setIsAuthenticated }: DashboardProps) {
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("create-account");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      setUserData({
        username: "",
        password: "",
        email: "",
        profileImage: null,
        faces: [],
        attempts: [],
        history: [],
        accounts: [],
      });
      setIsAuthenticated(false);
      navigate("create-account");
    }
  };

  const menuItems = [
    {
      icon: Settings,
      title: "Settings",
      description: "Manage your account settings",
      color: "bg-blue-500",
      action: () => navigate("settings"),
    },
    {
      icon: Camera,
      title: "Face Recognition",
      description: "Manage trusted faces",
      color: "bg-purple-500",
      action: () => navigate("face-recognition"),
    },
    {
      icon: Shield,
      title: "Attempts",
      description: `${userData.attempts.length} unlock attempts recorded`,
      color: "bg-red-500",
      action: () => navigate("attempts"),
    },
    {
      icon: History,
      title: "History",
      description: "View activity history",
      color: "bg-amber-500",
      action: () => navigate("history"),
    },
    {
      icon: UserPlus,
      title: "Add Account",
      description: `${userData.accounts.length} accounts saved`,
      color: "bg-emerald-500",
      action: () => navigate("add-account"),
    },
    {
      icon: Lock,
      title: "Security",
      description: "Two-factor authentication",
      color: "bg-violet-500",
      action: () => navigate("security-settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center overflow-hidden">
              {userData.profileImage ? (
                <img src={userData.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold text-lg">
                  {userData.username.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-white font-semibold">Welcome back</h1>
              <p className="text-slate-400 text-sm">{userData.username || "User"}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{userData.attempts.length}</p>
              <p className="text-slate-400 text-sm">Attempts</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{userData.faces.length}</p>
              <p className="text-slate-400 text-sm">Faces</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{userData.accounts.length}</p>
              <p className="text-slate-400 text-sm">Accounts</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{userData.history.length}</p>
              <p className="text-slate-400 text-sm">Activities</p>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="grid gap-3">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="bg-slate-800 border-slate-700 hover:bg-slate-750 cursor-pointer transition-colors"
              onClick={item.action}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
                <div className="text-slate-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Danger Zone */}
        <Card className="bg-red-900/20 border-red-800">
          <CardHeader>
            <CardTitle className="text-red-400 text-lg">Danger Zone</CardTitle>
            <CardDescription className="text-red-300/70">
              Irreversible actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleDeleteAccount}
              variant="destructive"
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}