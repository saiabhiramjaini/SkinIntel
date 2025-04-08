import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  X,
  AlertCircle,
  CheckCircle2,
  Camera,
  FileUp,
  RefreshCw,
  Info,
  Video,
  VideoOff,
} from "lucide-react";
import { diseaseInfo } from "@/utils/diseaseInfo";

export const DetectionPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<null | {
    disease: string;
    confidence: number;
    severity: "mild" | "moderate" | "severe";
  }>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Handle camera activation/deactivation
  useEffect(() => {
    if (isCameraActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isCameraActive, facingMode]);

  const startCamera = async () => {
    try {
      const constraints = {
        video: { 
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please check permissions.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !streamRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `capture-${Date.now()}.jpg`, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });
          
          handleCapturedImage(file);
        }
      }, 'image/jpeg', 0.9);
    }
  };

  const handleCapturedImage = (file: File) => {
    setFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Turn off camera after capture
    setIsCameraActive(false);
  };

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
    setError(null);
  };

  const switchCamera = () => {
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // Check if file is an image
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please upload an image file (JPEG, PNG, etc.)");
      return;
    }

    // Check file size (limit to 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit");
      return;
    }

    setFile(selectedFile);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setError(null);
    const droppedFile = e.dataTransfer.files?.[0];

    if (!droppedFile) return;

    // Check if file is an image
    if (!droppedFile.type.startsWith("image/")) {
      setError("Please upload an image file (JPEG, PNG, etc.)");
      return;
    }

    // Check file size (limit to 5MB)
    if (droppedFile.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit");
      return;
    }

    setFile(droppedFile);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(droppedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please upload an image first");
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setError(null);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 500);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("http://127.0.0.1:5000/api/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = response.data;

      // Mock severity for demonstration purposes
      const severity = ["mild", "moderate", "severe"][Math.floor(Math.random() * 3)] as "mild" | "moderate" | "severe";

      setResult({
        disease: data.prediction,
        confidence: data.confidence * 100,
        severity,
      });

      console.log(result)
      setProgress(100);
    } catch (err) {
      setError("An error occurred during detection. Please try again.");
      console.error(err);
    } finally {
      clearInterval(progressInterval);
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setProgress(0);
    setIsCameraActive(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "severe":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-200";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-600";
    if (confidence >= 85) return "text-indigo-600";
    if (confidence >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-md mr-2">
                <span className="text-white font-bold text-sm">SI</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SkinIntel
              </span>
            </a>
            <div className="ml-4 pl-4 border-l border-slate-200">
              <h1 className="text-2xl font-bold text-slate-900">
                Skin Disease Detection
              </h1>
            </div>
          </div>
          <a href="/auth">
            <Button
              variant="outline"
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
            >
              Sign In
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="border border-slate-200 bg-white/95 backdrop-blur-sm shadow-md">
              <CardHeader>
                <CardTitle>Upload Skin Image</CardTitle>
                <CardDescription>
                  Upload a clear dermatoscopic image or capture one using your camera
                </CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                  id="image-upload"
                />

                {isCameraActive ? (
                  <div className="space-y-4">
                    <div className="relative w-full h-64 mx-auto overflow-hidden rounded-lg bg-black">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                        <Button
                          onClick={capturePhoto}
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
                          size="lg"
                        >
                          <Camera className="h-5 w-5 mr-2" />
                          Capture Photo
                        </Button>
                        <Button
                          onClick={switchCamera}
                          variant="outline"
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30"
                          size="icon"
                        >
                          <RefreshCw className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      onClick={toggleCamera}
                      variant="outline"
                      className="w-full"
                    >
                      <VideoOff className="h-4 w-4 mr-2" />
                      Turn Off Camera
                    </Button>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center ${
                      preview
                        ? "border-indigo-300 bg-indigo-50"
                        : "border-slate-300 hover:border-indigo-300 hover:bg-slate-50"
                    } transition-colors cursor-pointer`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {preview ? (
                      <div className="space-y-4">
                        <div className="relative w-full h-64 mx-auto overflow-hidden rounded-lg">
                          <img
                            src={preview || "/placeholder.svg"}
                            alt="Image preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              resetForm();
                            }}
                            className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white"
                          >
                            <X className="h-5 w-5 text-slate-700" />
                          </button>
                        </div>
                        <div className="text-sm text-slate-500">
                          {file?.name} (
                          {file ? (file.size / 1024 / 1024).toFixed(2) : "0.00"}{" "}
                          MB)
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                          <Upload className="h-8 w-8 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-slate-700">
                            Drag and drop your image here
                          </p>
                          <p className="text-sm text-slate-500 mt-1">
                            or click to browse files (JPEG, PNG, etc.)
                          </p>
                        </div>
                        <div className="flex justify-center gap-4 pt-2">
                          <div className="flex items-center text-xs text-slate-500">
                            <FileUp className="h-3 w-3 mr-1" />
                            <span>Upload file</span>
                          </div>
                          <div className="flex items-center text-xs text-slate-500">
                            <Camera className="h-3 w-3 mr-1" />
                            <span>Take photo</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {!isCameraActive && !preview && (
                  <Button
                    onClick={toggleCamera}
                    variant="outline"
                    className="w-full mt-4"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    {isCameraActive ? "Turn Off Camera" : "Use Camera"}
                  </Button>
                )}

                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={resetForm}
                  disabled={!file || isLoading}
                >
                  Reset
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!file || isLoading}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>Detect Disease</>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* Rest of your existing code remains the same */}
            {isLoading && (
              <Card className="border border-slate-200 bg-white/95 backdrop-blur-sm shadow-md">
                <CardHeader>
                  <CardTitle>Analyzing Image</CardTitle>
                  <CardDescription>
                    Our AI is processing your image to detect skin conditions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <div className="text-sm text-slate-500 text-right">
                      {progress}% Complete
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-500">
                    <div className="flex flex-col items-center p-2 rounded bg-slate-50">
                      <div className="font-medium">Image Processing</div>
                      <div className={progress >= 30 ? "text-green-600" : ""}>
                        {progress >= 30 ? "Complete" : "In Progress"}
                      </div>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded bg-slate-50">
                      <div className="font-medium">Feature Extraction</div>
                      <div className={progress >= 60 ? "text-green-600" : ""}>
                        {progress >= 60
                          ? "Complete"
                          : progress >= 30
                          ? "In Progress"
                          : "Pending"}
                      </div>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded bg-slate-50">
                      <div className="font-medium">Classification</div>
                      <div className={progress >= 90 ? "text-green-600" : ""}>
                        {progress >= 90
                          ? "Complete"
                          : progress >= 60
                          ? "In Progress"
                          : "Pending"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Guidelines */}
            <Card className="border border-slate-200 bg-white/95 backdrop-blur-sm shadow-md">
              <CardHeader>
                <CardTitle>Image Guidelines</CardTitle>
                <CardDescription>
                  For best results, please follow these guidelines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Use a dermatoscopic image if available</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Ensure good lighting with no shadows</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Focus directly on the affected area</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      Include some surrounding healthy skin for context
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Remove any hair, jewelry, or other obstructions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Results Section (remains the same) */}
          <div className="space-y-6">
            {result ? (
              <>
                <Card className="border border-slate-200 bg-white/95 backdrop-blur-sm shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2"></div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Detection Results</CardTitle>
                        <CardDescription>
                          Analysis completed successfully
                        </CardDescription>
                      </div>
                      <Badge className={getSeverityColor(result.severity)}>
                        {result.severity.charAt(0).toUpperCase() +
                          result.severity.slice(1)}{" "}
                        Severity
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center p-6 bg-slate-50 rounded-lg">
                      <div className="text-sm text-slate-500 mb-1">
                        Detected Condition
                      </div>
                      <div className="text-2xl font-bold text-slate-900 mb-2">
                        {result.disease}
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm mr-2">Confidence:</div>
                        <div
                          className={`text-lg font-semibold ${getConfidenceColor(
                            result.confidence
                          )}`}
                        >
                          {result.confidence.toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    <Tabs defaultValue="info" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 mb-4 bg-slate-100">
                        <TabsTrigger value="info" className="text-xs">
                          Information
                        </TabsTrigger>
                        <TabsTrigger value="symptoms" className="text-xs">
                          Symptoms
                        </TabsTrigger>
                        <TabsTrigger value="risk" className="text-xs">
                          Risk Factors
                        </TabsTrigger>
                        <TabsTrigger value="next" className="text-xs">
                          Next Steps
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent
                        value="info"
                        className="p-4 bg-white border border-slate-200 rounded-md"
                      >
                        <h3 className="text-lg font-semibold mb-2">
                          About {result.disease}
                        </h3>
                        <p className="text-slate-700">
                          {diseaseInfo[
                            result.disease as keyof typeof diseaseInfo
                          ]?.description ||
                            "Information about this condition is currently being updated."}
                        </p>
                      </TabsContent>

                      <TabsContent
                        value="symptoms"
                        className="p-4 bg-white border border-slate-200 rounded-md"
                      >
                        <h3 className="text-lg font-semibold mb-2">
                          Common Symptoms
                        </h3>
                        <ul className="space-y-1">
                          {diseaseInfo[
                            result.disease as keyof typeof diseaseInfo
                          ]?.symptoms.map((symptom, index) => (
                            <li key={index} className="flex items-start">
                              <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-indigo-600">
                                  {index + 1}
                                </span>
                              </div>
                              <span className="text-slate-700">{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>

                      <TabsContent
                        value="risk"
                        className="p-4 bg-white border border-slate-200 rounded-md"
                      >
                        <h3 className="text-lg font-semibold mb-2">
                          Risk Factors
                        </h3>
                        <ul className="space-y-1">
                          {diseaseInfo[
                            result.disease as keyof typeof diseaseInfo
                          ]?.riskFactors.map((factor, index) => (
                            <li key={index} className="flex items-start">
                              <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-indigo-600">
                                  {index + 1}
                                </span>
                              </div>
                              <span className="text-slate-700">{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>

                      <TabsContent
                        value="next"
                        className="p-4 bg-white border border-slate-200 rounded-md"
                      >
                        <h3 className="text-lg font-semibold mb-2">
                          Recommended Next Steps
                        </h3>
                        <ul className="space-y-1">
                          {diseaseInfo[
                            result.disease as keyof typeof diseaseInfo
                          ]?.nextSteps.map((step, index) => (
                            <li key={index} className="flex items-start">
                              <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-indigo-600">
                                  {index + 1}
                                </span>
                              </div>
                              <span className="text-slate-700">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-slate-100 pt-6">
                    <Button
                      variant="outline"
                      onClick={resetForm}
                      className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                    >
                      Analyze Another Image
                    </Button>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                      Save Results
                    </Button>
                  </CardFooter>
                </Card>

                <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
                  <Info className="h-4 w-4 text-yellow-800" />
                  <AlertTitle>Important Disclaimer</AlertTitle>
                  <AlertDescription className="text-sm">
                    This AI analysis is intended to assist healthcare
                    professionals and should not replace professional medical
                    advice, diagnosis, or treatment. Always consult with a
                    qualified healthcare provider for proper diagnosis and
                    treatment options.
                  </AlertDescription>
                </Alert>
              </>
            ) : (
              <Card className="border border-slate-200 bg-white/95 backdrop-blur-sm shadow-md h-full flex flex-col justify-center items-center p-8">
                <div className="text-center space-y-4 max-w-md">
                  <div className="mx-auto w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    No Results Yet
                  </h3>
                  <p className="text-slate-600">
                    Upload a dermatoscopic image or capture one using your camera, then click "Detect Disease" to analyze for skin conditions.
                  </p>
                  <div className="pt-4 flex gap-2 justify-center">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                    >
                      Upload Image
                    </Button>
                    <Button
                      onClick={toggleCamera}
                      variant="outline"
                      className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Use Camera
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};