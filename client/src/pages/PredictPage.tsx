import { useState } from "react";
import axios from "axios";

export const PredictPage = () => {
  const [image, setImage] = useState(null);
  interface PredictionResult {
    class: string;
    confidence: number;
  }

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
    setResult(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data);
    } catch (err) {
      setError("Failed to get prediction. Try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Skin Disease Detector</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Upload & Predict
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <h3>Prediction Result:</h3>
          <p><strong>Class:</strong> {result.class}</p>
          <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};