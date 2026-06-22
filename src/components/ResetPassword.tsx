import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Lock, ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react";
import type { Screen, UserData } from "../App";

interface ResetPasswordProps {
  navigate: (screen: Screen) => void;
  resetEmail: string;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export function ResetPassword({ navigate, resetEmail, userData, setUserData }: ResetPasswordProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setUserData({ ...userData, password: newPassword });
    setSuccess(true);
    setTimeout(() => {
      navigate("create-account");
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700 text-center p-8">
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Password Updated!</h2>
          <p className="text-slate-400">Redirecting to login...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <button
            onClick={() => navigate("forgot-password")}
            className="absolute top-4 left-4 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="mx-auto w-16 h-16 bg-violet-500 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Reset Password</CardTitle>
          <CardDescription className="text-slate-400">
            Create a new password for {resetEmail}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-slate-300">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input
                id="new-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-violet-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-new-password" className="text-slate-300">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input
                id="confirm-new-password"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-violet-400"
              />
            </div>
          </div>

          {/* Password strength indicator */}
          <div className="space-y-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded ${
                    newPassword.length >= level * 2
                      ? level <= 1
                        ? "bg-red-500"
                        : level <= 2
                        ? "bg-amber-500"
                        : level <= 3
                        ? "bg-emerald-500"
                        : "bg-emerald-400"
                      : "bg-slate-600"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-slate-400">
              {newPassword.length === 0
                ? "Enter a password"
                : newPassword.length < 6
                ? "Weak password"
                : newPassword.length < 8
                ? "Fair password"
                : newPassword.length < 10
                ? "Good password"
                : "Strong password"}
            </p>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleResetPassword}
            className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold py-6"
          >
            Update Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}