import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you shortly." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <section className="gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Contact Us</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">We'd love to hear from you. Get in touch with us today.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Address</h3>
                    <p className="text-muted-foreground text-sm">T-S, SKR Open Mall, B.Y. College Road, Pune</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-muted-foreground text-sm">+91 9561702030</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground text-sm">info@proworldtech.com</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 rounded-2xl overflow-hidden shadow-soft">
                <iframe
                  title="ProWorld Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2!2d73.85!3d18.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzEyLjAiTiA3M8KwNTEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div>
                  <Label>Subject *</Label>
                  <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                </div>
                <div>
                  <Label>Message *</Label>
                  <Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                </div>
                <Button type="submit" className="w-full gradient-primary text-primary-foreground rounded-xl py-3">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
