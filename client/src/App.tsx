import { AuthPage } from "./pages/AuthPage";
import { DetectionPage } from "./pages/DetectionPage";
import { HomePage } from "./pages/HomePage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PredictPage } from "./pages/PredictPage";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/detect" element={<DetectionPage />} />
          <Route path="/predict" element={<PredictPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
