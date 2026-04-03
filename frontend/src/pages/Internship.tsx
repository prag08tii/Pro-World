import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getColleges, getCourses } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";
import {
  GraduationCap, Code, Palette, Smartphone, BarChart3, Database,
  CheckCircle, BookOpen, Award, Briefcase, Users, FileCheck
} from "lucide-react";

const domains = [
  { title: "Web Development", icon: Code },
  { title: "App Development", icon: Smartphone },
  { title: "UI/UX Design", icon: Palette },
  { title: "Digital Marketing", icon: BarChart3 },
  { title: "Data Science", icon: Database },
  { title: "Graphic Design", icon: Palette },
];

const technologies = ["React", "Node.js", "Python", "Java", "Flutter", "Angular", "MongoDB", "MySQL", "AWS", "Docker", "Figma", "WordPress"];

const benefits = [
  { icon: FileCheck, text: "Internship Completion Certificate" },
  { icon: BookOpen, text: "Real-Time Project Experience" },
  { icon: Award, text: "Letter of Recommendation" },
  { icon: Briefcase, text: "Placement Assistance" },
  { icon: Users, text: "Expert Mentorship" },
  { icon: GraduationCap, text: "Industry-Ready Skills" },
];

function ApplyForm({ domain, onClose }: { domain: string; onClose: () => void }) {
  const { toast } = useToast();
  const colleges = getColleges();
  const courses = getCourses();
  const [form, setForm] = useState({
    applyingFor: domain,
    name: "", mobile: "", address: "", email: "", confirmEmail: "",
    college: "", course: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email !== form.confirmEmail) {
      toast({ title: "Error", description: "Emails do not match", variant: "destructive" });
      return;
    }
    toast({ title: "Application Submitted!", description: `Thank you for applying for ${domain}. We'll contact you soon.` });
    onClose();
  };

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background rounded-2xl shadow-hero w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Apply for {domain}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Applying For</Label>
            <Input value={form.applyingFor} readOnly className="bg-muted" />
          </div>
          <div>
            <Label>Full Name *</Label>
            <Input value={form.name} onChange={(e) => update("name", e.target.value)} required />
          </div>
          <div>
            <Label>Mobile Number *</Label>
            <Input type="tel" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} required />
          </div>
          <div>
            <Label>Address *</Label>
            <Input value={form.address} onChange={(e) => update("address", e.target.value)} required />
          </div>
          <div>
            <Label>Email *</Label>
            <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
          </div>
          <div>
            <Label>Confirm Email *</Label>
            <Input type="email" value={form.confirmEmail} onChange={(e) => update("confirmEmail", e.target.value)} required />
          </div>
          <div>
            <Label>College Name *</Label>
            <select
              value={form.college}
              onChange={(e) => update("college", e.target.value)}
              required
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select College</option>
              {colleges.length > 0 ? colleges.map((c) => (
                <option key={c} value={c}>{c}</option>
              )) : (
                <option disabled>No colleges available</option>
              )}
            </select>
          </div>
          <div>
            <Label>Course Name *</Label>
            <select
              value={form.course}
              onChange={(e) => update("course", e.target.value)}
              required
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select Course</option>
              {courses.length > 0 ? courses.map((c) => (
                <option key={c} value={c}>{c}</option>
              )) : (
                <option disabled>No courses available</option>
              )}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1 gradient-primary text-primary-foreground">Submit Application</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Internship() {
  const [applyDomain, setApplyDomain] = useState<string | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Internship Program</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Kickstart your career with hands-on experience at ProWorld Technology. Learn from industry experts and work on real-time projects.
          </p>
        </div>
      </section>

      {/* Who Can Apply */}
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl text-center">
          <SectionHeading title="Who Can Apply" subtitle="Our internship program is open to" />
          <div className="grid sm:grid-cols-3 gap-4">
            {["Students pursuing B.Tech / B.E. / BCA / MCA", "Students from any engineering or CS background", "Freshers looking for industry experience"].map((text, i) => (
              <div key={i} className="glass-card p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-foreground">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="section-padding bg-section-alt">
        <div className="container mx-auto">
          <SectionHeading title="Internship Domains" subtitle="Choose your area of interest and apply" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((d, i) => (
              <div key={i} className="glass-card p-6 hover-lift group">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <d.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-3">{d.title}</h3>
                <Button
                  onClick={() => setApplyDomain(d.title)}
                  size="sm"
                  className="gradient-primary text-primary-foreground rounded-lg"
                >
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading title="Technologies You'll Learn" subtitle="Get hands-on experience with industry-standard tools" />
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((t) => (
              <span key={t} className="px-5 py-2.5 glass-card text-sm font-medium text-foreground hover-lift cursor-default">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* What You Will Get */}
      <section className="section-padding bg-section-alt">
        <div className="container mx-auto">
          <SectionHeading title="What You Will Get" subtitle="Benefits of our internship program" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="glass-card p-5 flex items-center gap-4 hover-lift">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-medium text-foreground">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {applyDomain && <ApplyForm domain={applyDomain} onClose={() => setApplyDomain(null)} />}
    </>
  );
}
