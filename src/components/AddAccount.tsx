import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Plus, Trash2, User } from "lucide-react";
import type { Screen, UserData } from "../App";

interface AddAccountProps {
  navigate: (screen: Screen) => void;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export function AddAccount({ navigate, userData, setUserData }: AddAccountProps) {
  const [showForm, setShowForm] = useState(false);
  const [newAccount, setNewAccount] = useState({
    username: "",
    password: "",
    name: "",
    website: "",
  });

  const addAccount = () => {
    if (!newAccount.username || !newAccount.password) return;
    const account = {
      id: Date.now().toString(),
      ...newAccount,
    };
    setUserData({ ...userData, accounts: [...userData.accounts, account] });
    setNewAccount({ username: "", password: "", name: "", website: "" });
    setShowForm(false);
  };

  const deleteAccount = (id: string) => {
    setUserData({ ...userData, accounts: userData.accounts.filter((a) => a.id !== id) });
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
          <h1 className="text-white font-semibold text-lg">Add Account</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Saved Accounts</CardTitle>
            <CardDescription className="text-slate-400">
              Store your account credentials securely
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userData.accounts.length === 0 && !showForm && (
              <div className="text-center py-8">
                <User className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <p className="text-slate-400">No accounts saved yet</p>
                <p className="text-slate-500 text-sm">Add your first account to get started</p>
              </div>
            )}

            {userData.accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-700/50"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {account.name.charAt(0) || account.username.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{account.name || account.username}</h3>
                  <p className="text-slate-400 text-sm">{account.website || "No website"}</p>
                </div>
                <Button
                  onClick={() => deleteAccount(account.id)}
                  variant="ghost"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}

            {showForm && (
              <div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Name</Label>
                    <Input
                      placeholder="Account name"
                      value={newAccount.name}
                      onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                      className="bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Website</Label>
                    <Input
                      placeholder="Website URL"
                      value={newAccount.website}
                      onChange={(e) => setNewAccount({ ...newAccount, website: e.target.value })}
                      className="bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Username</Label>
                  <Input
                    placeholder="Username"
                    value={newAccount.username}
                    onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
                    className="bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Password</Label>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={newAccount.password}
                    onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
                    className="bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={addAccount} className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                    Save Account
                  </Button>
                  <Button onClick={() => setShowForm(false)} variant="ghost" className="text-slate-400">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Account
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}