import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const LandingNavbar = () => {
  const navigate = useNavigate()
  
  return (
    <>
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-md mr-2 ">
                <span className="text-white font-bold text-sm">SI</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SkinIntel
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-slate-600 hover:text-indigo-600 font-medium text-sm"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-slate-600 hover:text-indigo-600 font-medium text-sm"
              >
                How It Works
              </a>
              
              
            </nav>
            <div className="flex items-center space-x-4">
            <a
                href="/detect"
                className="text-slate-600 hover:text-indigo-600 font-medium text-sm"
              >
                Start Detection
              </a>
              <Button onClick={()=>{navigate("/auth")}} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white cursor-pointer">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
