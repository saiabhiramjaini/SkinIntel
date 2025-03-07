import { Badge} from "lucide-react";
import { Button } from "./ui/button";
import hero from "@/assets/hero-section.png";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate()
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] bg-[length:20px_20px]"></div>
        <div className="absolute top-0 right-0 -mt-24 -mr-24 bg-pink-200 opacity-20 rounded-full w-96 h-96 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-24 -ml-24 bg-indigo-200 opacity-20 rounded-full w-96 h-96 blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 px-3 py-1 text-sm">
                AI-Powered Dermatology
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
                Advanced AI for{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Skin Disease Detection
                </span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl">
                SkinIntel uses hybrid convolutional neural networks to
                accurately identify and classify skin conditions, helping
                healthcare professionals make faster, more accurate diagnoses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                onClick={()=>{navigate("/auth")}}
                  variant="outline"
                  className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 px-8 py-6 text-lg cursor-pointer"
                >
                  Get Started
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl transform rotate-3 scale-105"></div>
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
                <div className="w-full flex justify-center items-center">
                  <img
                    src={hero}
                    alt="SkinIntel AI analysis of dermatoscopic image"
                    className="w-2/3 h-2/3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
