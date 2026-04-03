import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/proworld-logo.png";

export default function Login() {
  const { toast } = useToast();
  const [form, setForm] = useState({ email: "", password: "", remember: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email === "admin@proworld.com" && form.password === "admin123") {
      localStorage.setItem("proworld_auth", "admin");
      toast({ title: "Welcome Admin!", description: "Redirecting to admin panel..." });
      window.location.href = "/admin";
      return;
    }
    toast({ title: "Login Successful", description: "Welcome back!" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-primary p-4">
      <div className="bg-background rounded-2xl shadow-hero w-full max-w-md p-8">
        <div className="text-center mb-8">
          <img src={logo} alt="ProWorld" className="h-16 w-auto mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} className="rounded" />
              Remember Me
            </label>
            <button type="button" className="text-sm text-primary hover:underline">Forgot Password?</button>
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground rounded-xl py-3">
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
