import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const SignUpForm = () => {
  // State variables for form inputs
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  // Function to handle form submissions
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/signup", {
        email,
        password,
      });
  
      localStorage.setItem("token", response.data.token);
      alert("Signed in successfully!");
      navigate('/detect')
    } catch (error: any) {
      alert(`Error: ${error.response?.data?.message || "Invalid credentials!"}`);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="pl-10 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-sm font-medium">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            id="signup-email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-10 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-200 mt-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          <>
            Create Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
