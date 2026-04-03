import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/proworld-logo.png";

export default function Signup() {
  const { toast } = useToast();
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }
    toast({ title: "Account Created!", description: "You can now sign in." });
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-primary p-4">
      <div className="bg-background rounded-2xl shadow-hero w-full max-w-md p-8">
        <div className="text-center mb-8">
          <img src={logo} alt="ProWorld" className="h-16 w-auto mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground text-sm">Join ProWorld Technology</p>
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
          <div>
            <Label>Confirm Password</Label>
            <Input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground rounded-xl py-3">
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
