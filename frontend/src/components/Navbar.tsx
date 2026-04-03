import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/proworld-logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Internship", path: "/internship" },
  { label: "Careers", path: "/careers" },
];

const drawerLinks = [
  { label: "Features", path: "/features" },
  { label: "Works", path: "/works" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="ProWorld Technology" className="h-10 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="ml-2 px-4 py-2 rounded-lg text-sm font-medium border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Login
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Drawer trigger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-background border-b border-border animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium border border-primary text-primary text-center"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Right side drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-background shadow-hero animate-slide-right border-l border-border">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <img src={logo} alt="ProWorld" className="h-8 w-auto" />
              <button onClick={() => setDrawerOpen(false)} className="p-2 rounded-lg hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-1">
              {drawerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setDrawerOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
