import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, User, Building2, UserCog } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"user" | "organizer" | "promoter" | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent, type: "user" | "organizer" | "promoter") => {
    e.preventDefault();
    
    // Mock authentication - store user type in sessionStorage
    sessionStorage.setItem('userType', type);
    sessionStorage.setItem('isAuthenticated', 'true');
    
    toast.success(isLogin ? "Logged in successfully!" : "Account created successfully!");
    
    // Redirect based on user type
    if (type === "organizer") {
      navigate("/organizer/dashboard");
    } else if (type === "promoter") {
      navigate("/promoter/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const handlePromoterLogin = () => {
    setUserType("promoter");
  };

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-glow p-4">
        <div className="w-full max-w-4xl">
          <div className="absolute top-4 right-4">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handlePromoterLogin}
              className="gap-2"
            >
              <UserCog className="w-4 h-4" />
              Login as Promoter
            </Button>
          </div>
          
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-primary-foreground mb-2">Welcome to EventHub</h1>
            <p className="text-primary-foreground/80 text-lg">Choose how you'd like to continue</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              className="cursor-pointer hover:shadow-elegant transition-all hover:-translate-y-1 border-2 hover:border-primary"
              onClick={() => setUserType("user")}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">I'm an Attendee</h2>
                <p className="text-muted-foreground mb-4">
                  Discover and book tickets to amazing events
                </p>
                <ul className="text-sm text-left space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Browse thousands of events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Secure ticket booking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Manage your tickets</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-elegant transition-all hover:-translate-y-1 border-2 hover:border-accent"
              onClick={() => setUserType("organizer")}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-2xl font-bold mb-2">I'm an Organizer</h2>
                <p className="text-muted-foreground mb-4">
                  Create and manage your own events
                </p>
                <ul className="text-sm text-left space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>Create unlimited events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>Track sales and analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>Manage your team</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-6">
            <Button variant="ghost" className="text-primary-foreground" onClick={() => navigate("/")}>
              ← Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-glow p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Calendar className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">
            {userType === "organizer" ? "Organizer" : userType === "promoter" ? "Promoter" : "Attendee"} Account
          </CardTitle>
          <CardDescription>
            {isLogin ? "Welcome back! Sign in to your account" : "Create your account to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={isLogin ? "login" : "signup"} onValueChange={(v) => setIsLogin(v === "login")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={(e) => handleSubmit(e, userType)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" required />
                </div>
                <Button type="submit" className="w-full" variant="accent">
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={(e) => handleSubmit(e, userType)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" placeholder="Create a password" required />
                </div>
                <Button type="submit" className="w-full" variant="accent">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center">
            <Button 
              variant="ghost" 
              onClick={() => setUserType(null)}
              className="text-sm"
            >
              ← Choose different account type
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
