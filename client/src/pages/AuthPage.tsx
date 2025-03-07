import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignInForm } from "@/components/SignInForm"
import { SignUpForm } from "@/components/SignUpForm"

export const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 bg-pink-200 opacity-20 rounded-full w-96 h-96 -mt-24 -mr-24 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 bg-indigo-200 opacity-20 rounded-full w-96 h-96 -mb-24 -ml-24 blur-3xl"></div>
      </div>

      {/* Logo or Branding */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">SI</span>
        </div>
      </div>

      {/* Authentication Card */}
      <Card className="w-full max-w-md relative z-10 border border-slate-200/50 shadow-xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              SkinIntel
            </span>
          </CardTitle>
          <CardDescription className="text-center text-slate-500">
            Start your AI-powered skin health journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 bg-slate-100">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <SignInForm />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-2 border-t border-slate-100">
          <p className="text-xs text-center text-slate-500 px-4">
            By continuing, you agree to our{" "}
            <a href="" className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="" className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2">
              Privacy Policy
            </a>
          </p>
        </CardFooter>
      </Card>

      {/* Footer */}
      <div className="absolute bottom-4 text-center text-xs text-slate-500 w-full z-10">
        © {new Date().getFullYear()} SkinIntel. All rights reserved.
      </div>
    </div>
  )
}
