import { useState, useRef, useCallback } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Camera, Trash2, User, Video, VideoOff, RefreshCw } from "lucide-react";
import type { Screen, UserData } from "../App";

interface FaceRecognitionProps {
  navigate: (screen: Screen) => void;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export function FaceRecognition({ navigate, userData, setUserData }: FaceRecognitionProps) {
  const [newFaceName, setNewFaceName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    setStreamError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (err) {
      console.error("Camera error:", err);
      setStreamError("Unable to access camera. Please grant camera permission.");
      setIsStreaming(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Convert to data URL
        const imageData = canvas.toDataURL("image/png");
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  }, [stopCamera]);

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const saveFace = () => {
    if (!newFaceName.trim()) return;
    const newFace = {
      id: Date.now().toString(),
      name: newFaceName,
      image: capturedImage,
    };
    setUserData({ ...userData, faces: [...userData.faces, newFace] });
    setNewFaceName("");
    setCapturedImage(null);
    setShowAddForm(false);
  };

  const cancelAddFace = () => {
    stopCamera();
    setCapturedImage(null);
    setNewFaceName("");
    setShowAddForm(false);
    setStreamError(null);
  };

  const deleteFace = (id: string) => {
    setUserData({ ...userData, faces: userData.faces.filter((f) => f.id !== id) });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => {
              stopCamera();
              navigate("dashboard");
            }}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white font-semibold text-lg">Face Recognition</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Trusted Faces</CardTitle>
            <CardDescription className="text-slate-400">
              Manage faces that can unlock your phone. Only authorized faces will be allowed access.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Existing Faces List */}
            {userData.faces.length > 0 && (
              <div className="space-y-3 mb-4">
                {userData.faces.map((face, index) => (
                  <div
                    key={face.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-slate-700/50"
                  >
                    <div className="w-14 h-14 rounded-full bg-purple-500 flex items-center justify-center overflow-hidden border-2 border-purple-400">
                      {face.image ? (
                        <img src={face.image} alt={face.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-7 h-7 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{face.name}</h3>
                      <p className="text-slate-400 text-sm">Face ID: {face.id.slice(-6)}</p>
                    </div>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                      Active
                    </span>
                    <Button
                      onClick={() => deleteFace(face.id)}
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Face Form */}
            {showAddForm ? (
              <div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600 space-y-4">
                <div className="text-center">
                  <h3 className="text-white font-medium mb-2">Capture Face</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Position your face within the frame and capture
                  </p>
                </div>

                {/* Camera View */}
                <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden">
                  {!capturedImage ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      {/* Face Guide Overlay */}
                      {isStreaming && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-48 h-48 border-4 border-dashed border-purple-400 rounded-full opacity-60" />
                        </div>
                      )}
                    </>
                  ) : (
                    <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                  )}
                  <canvas ref={canvasRef} className="hidden" />
                </div>

                {/* Error Message */}
                {streamError && (
                  <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-lg">
                    <p className="text-red-400 text-sm text-center">{streamError}</p>
                  </div>
                )}

                {/* Camera Controls */}
                <div className="flex justify-center gap-3">
                  {!capturedImage ? (
                    <>
                      {!isStreaming ? (
                        <Button onClick={startCamera} className="bg-purple-500 hover:bg-purple-600">
                          <Video className="w-5 h-5 mr-2" />
                          Start Camera
                        </Button>
                      ) : (
                        <>
                          <Button onClick={capturePhoto} className="bg-emerald-500 hover:bg-emerald-600">
                            <Camera className="w-5 h-5 mr-2" />
                            Capture Face
                          </Button>
                          <Button onClick={stopCamera} variant="ghost" className="text-slate-400">
                            <VideoOff className="w-5 h-5 mr-2" />
                            Stop
                          </Button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Button onClick={retakePhoto} variant="ghost" className="text-slate-300">
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Retake
                      </Button>
                    </>
                  )}
                </div>

                {/* Name Input and Save */}
                {capturedImage && (
                  <div className="space-y-3 pt-4 border-t border-slate-600">
                    <div className="space-y-2">
                      <label className="text-slate-300 text-sm font-medium">Face Name</label>
                      <Input
                        placeholder="Enter a name for this face (e.g., Face 1)"
                        value={newFaceName}
                        onChange={(e) => setNewFaceName(e.target.value)}
                        className="bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={saveFace}
                        disabled={!newFaceName.trim()}
                        className="flex-1 bg-purple-500 hover:bg-purple-600 disabled:opacity-50"
                      >
                        Save Face
                      </Button>
                      <Button onClick={cancelAddFace} variant="ghost" className="text-slate-400">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={() => setShowAddForm(true)}
                className="w-full bg-purple-500 hover:bg-purple-600"
              >
                <Camera className="w-5 h-5 mr-2" />
                Add New Face
              </Button>
            )}

            {/* Empty State */}
            {userData.faces.length === 0 && !showAddForm && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-10 h-10 text-slate-500" />
                </div>
                <p className="text-white font-medium mb-1">No faces added yet</p>
                <p className="text-slate-400 text-sm">Add a trusted face to enable face unlock</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">How Face Recognition Works</h4>
                <p className="text-slate-400 text-sm">
                  Your phone will capture and analyze facial features to create a secure biometric profile. 
                  Only registered faces will be able to unlock your device. You can add multiple faces for 
                  trusted family members.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}