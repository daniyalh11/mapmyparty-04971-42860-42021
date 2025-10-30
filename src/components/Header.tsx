import { Button } from "@/components/ui/button";
import { Calendar, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface HeaderProps {
  isAuthenticated?: boolean;
  userRole?: "user" | "organizer" | "promoter" | null;
  onLogout?: () => void;
}

const Header = ({ isAuthenticated = false, userRole = null, onLogout }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate("/auth");
  };

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('isAuthenticated');
    
    // Call parent onLogout if provided
    onLogout?.();
    
    // Redirect to home
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary-foreground" />
          </div>
          <span>Map MyParty</span>
        </Link>

        {/* Desktop Navigation */}
        {userRole !== "organizer" && userRole !== "promoter" && (
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/events" className="text-sm font-medium hover:text-primary transition-colors">
              Browse Events
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        )}

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate(
                  userRole === "organizer" ? "/organizer/dashboard" : 
                  userRole === "promoter" ? "/promoter/dashboard" : 
                  "/dashboard"
                )}
              >
                Dashboard
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={handleAuthClick}>
                Login
              </Button>
              <Button variant="default" onClick={handleAuthClick}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container py-4 flex flex-col gap-4">
            {userRole !== "organizer" && userRole !== "promoter" && (
              <>
                <Link
                  to="/events"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Events
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </>
            )}
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate(
                      userRole === "organizer" ? "/organizer/dashboard" : 
                      userRole === "promoter" ? "/promoter/dashboard" : 
                      "/dashboard"
                    );
                    setMobileMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleAuthClick();
                    setMobileMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    handleAuthClick();
                    setMobileMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  Sign Up
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
