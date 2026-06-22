import { useState } from "react";
import { CreateAccount } from "./components/CreateAccount";
import { Registration } from "./components/Registration";
import { ForgotPassword } from "./components/ForgotPassword";
import { ResetPassword } from "./components/ResetPassword";
import { Dashboard } from "./components/Dashboard";
import { Settings } from "./components/Settings";
import { FaceRecognition } from "./components/FaceRecognition";
import { Attempts } from "./components/Attempts";
import { History } from "./components/History";
import { AddAccount } from "./components/AddAccount";
import { SecuritySettings } from "./components/SecuritySettings";

export type Screen =
  | "create-account"
  | "registration"
  | "forgot-password"
  | "reset-password"
  | "dashboard"
  | "settings"
  | "face-recognition"
  | "attempts"
  | "history"
  | "add-account"
  | "security-settings";

export interface UserData {
  username: string;
  password: string;
  email: string;
  profileImage: string | null;
  faces: { id: string; name: string; image: string }[];
  attempts: AttemptRecord[];
  history: HistoryRecord[];
  accounts: AccountRecord[];
}

export interface AttemptRecord {
  id: string;
  date: string;
  time: string;
  image: string | null;
  successful: boolean;
}

export interface HistoryRecord {
  id: string;
  date: string;
  app: string;
  duration: string;
}

export interface AccountRecord {
  id: string;
  username: string;
  password: string;
  name: string;
  website: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("create-account");
  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
    email: "",
    profileImage: null,
    faces: [],
    attempts: [],
    history: [],
    accounts: [],
  });
  const [resetEmail, setResetEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "create-account":
        return (
          <CreateAccount
            navigate={navigate}
            userData={userData}
            setUserData={setUserData}
            setIsAuthenticated={setIsAuthenticated}
          />
        );
      case "registration":
        return (
          <Registration
            navigate={navigate}
            userData={userData}
            setUserData={setUserData}
          />
        );
      case "forgot-password":
        return (
          <ForgotPassword
            navigate={navigate}
            setResetEmail={setResetEmail}
          />
        );
      case "reset-password":
        return (
          <ResetPassword
            navigate={navigate}
            resetEmail={resetEmail}
            userData={userData}
            setUserData={setUserData}
          />
        );
      case "dashboard":
        return (
          <Dashboard
            navigate={navigate}
            userData={userData}
            setUserData={setUserData}
            setIsAuthenticated={setIsAuthenticated}
          />
        );
      case "settings":
        return <Settings navigate={navigate} userData={userData} />;
      case "face-recognition":
        return (
          <FaceRecognition
            navigate={navigate}
            userData={userData}
            setUserData={setUserData}
          />
        );
      case "attempts":
        return (
          <Attempts
            navigate={navigate}
            userData={userData}
            setUserData={setUserData}
          />
        );
      case "history":
        return <History navigate={navigate} userData={userData} />;
      case "add-account":
        return (
          <AddAccount
            navigate={navigate}
            userData={userData}
            setUserData={setUserData}
          />
        );
      case "security-settings":
        return <SecuritySettings navigate={navigate} userData={userData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {renderScreen()}
    </div>
  );
}