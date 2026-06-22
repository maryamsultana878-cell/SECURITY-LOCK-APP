import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Mail, ArrowLeft, Send } from "lucide-react";
import type { Screen } from "../App";

interface ForgotPasswordProps {
  navigate: (screen: Screen) => void;
  setResetEmail: React.Dispatch<React.SetStateAction<string>>;
}

export function ForgotPassword({ navigate, setResetEmail }: ForgotPasswordProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleSendOtp = () => {
    if (!email || !username) {
      setError("Please enter both username and email");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    setResetEmail(email);
    setOtpSent(true);
    setError("");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }
    // Simulate OTP verification (accept "123456" as valid)
    if (enteredOtp === "123456") {
      navigate("reset-password");
    } else {
      setError("Invalid OTP. Try 123456 for demo");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <button
            onClick={() => navigate("create-account")}
            className="absolute top-4 left-4 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="mx-auto w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Forgot Password</CardTitle>
          <CardDescription className="text-slate-400">
            {!otpSent ? "Enter your details to receive OTP" : "Enter the OTP sent to your email"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!otpSent ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="fp-username" className="text-slate-300">Username</Label>
                <Input
                  id="fp-username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-amber-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fp-email" className="text-slate-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <Input
                    id="fp-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-amber-400"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-slate-400 text-sm">
                OTP sent to {email}
              </p>
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-xl bg-slate-700 border-slate-600 text-white focus:border-amber-400"
                  />
                ))}
              </div>
              <p className="text-center text-xs text-slate-500">
                Demo: Use OTP "123456"
              </p>
            </div>
          )}

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
        </CardContent>
        <CardFooter>
          {!otpSent ? (
            <Button
              onClick={handleSendOtp}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-6"
            >
              <Send className="w-5 h-5 mr-2" />
              Send OTP
            </Button>
          ) : (
            <Button
              onClick={handleVerifyOtp}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-6"
            >
              Verify OTP
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}