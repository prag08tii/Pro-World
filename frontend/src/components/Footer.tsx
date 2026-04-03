import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/proworld-logo.png";

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <img src={logo} alt="ProWorld Technology" className="h-12 w-auto brightness-0 invert" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Leading IT services and training company based in Pune, India.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "About", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Internship", path: "/internship" },
                { label: "Careers", path: "/careers" },
              ].map((l) => (
                <Link key={l.path} to={l.path} className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">More</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Features", path: "/features" },
                { label: "Works", path: "/works" },
                { label: "Contact", path: "/contact" },
              ].map((l) => (
                <Link key={l.path} to={l.path} className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>T-S, SKR Open Mall, B.Y. College Road, Pune</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 9561702030</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>info@proworldtech.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} ProWorld Technology. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
