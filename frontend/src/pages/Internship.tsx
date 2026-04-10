import { useState, useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import API from "@/api/api";

import {
  GraduationCap, Code, Palette, Smartphone, BarChart3, Database,
  CheckCircle, BookOpen, Award, Briefcase, Users, FileCheck
} from "lucide-react";

// ICON fallback
const iconList = [Code, Smartphone, Palette, BarChart3, Database, GraduationCap];

const technologies = ["React", "Node.js", "Python", "Java", "Flutter", "Angular", "MongoDB", "MySQL", "AWS", "Docker", "Figma", "WordPress"];

const benefits = [
  { icon: FileCheck, text: "Internship Completion Certificate" },
  { icon: BookOpen, text: "Real-Time Project Experience" },
  { icon: Award, text: "Letter of Recommendation" },
  { icon: Briefcase, text: "Placement Assistance" },
  { icon: Users, text: "Expert Mentorship" },
  { icon: GraduationCap, text: "Industry-Ready Skills" },
];

// ================= APPLY FORM =================
function ApplyForm({ domain, domainId, onClose }: any) {
  const { toast } = useToast();

  const [colleges, setColleges] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);

  const [form, setForm] = useState({
    applyingFor: domain,
    name: "",
    mobile: "",
    email: "",
    confirmEmail: "",
    college: "",
    course: "",
    roll_no: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [colRes, courseRes] = await Promise.all([
        API.get("/colleges/"),
        API.get("/courses/")
      ]);
      setColleges(colRes.data);
      setCourses(courseRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const update = (field: string, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  // ✅ FILTER COLLEGES BASED ON COURSE
const selectedCourse = courses.find(
  (c) => c.id === parseInt(form.course)
);

const filteredColleges = selectedCourse
  ? colleges.filter((col) =>
      selectedCourse.colleges.includes(col.id)
    )
  : [];

  // ✅ SUBMIT TO DB
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.email !== form.confirmEmail) {
      toast({ title: "Error", description: "Emails do not match", variant: "destructive" });
      return;
    }

    try {
      await API.post("/applications/", {
        name: form.name,
        email: form.email,
        roll_no: form.roll_no,
        mobile_no: form.mobile,
        college: form.college,
        course: form.course,
        domain: domainId, // 🔥 IMPORTANT
      });

      toast({
        title: "Application Submitted!",
        description: `Applied for ${domain}`
      });

      onClose();

    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Submission failed",
        variant: "destructive"
      });
    }
  };

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
            <Label>Roll No *</Label>
            <Input value={form.roll_no} onChange={(e) => update("roll_no", e.target.value)} required />
          </div>

          <div>
            <Label>Email *</Label>
            <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
          </div>

          <div>
            <Label>Confirm Email *</Label>
            <Input type="email" value={form.confirmEmail} onChange={(e) => update("confirmEmail", e.target.value)} required />
          </div>

          {/* COURSE FIRST */}
          <div>
            <Label>Course Name *</Label>
            <select
              value={form.course}
              onChange={(e) => update("course", e.target.value)}
              required
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* COLLEGE DEPENDENT */}
          <div>
            <Label>College Name *</Label>
            <select
              value={form.college}
              onChange={(e) => update("college", e.target.value)}
              required
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select College</option>
              {filteredColleges.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
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

// ================= MAIN =================
export default function Internship() {
  const [applyDomain, setApplyDomain] = useState<any>(null);
  const [domains, setDomains] = useState<any[]>([]);

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      const res = await API.get("/domains/");
      const formatted = res.data.map((d: any, index: number) => ({
        id: d.id,
        title: d.name,
        description: d.description,
        icon: iconList[index % iconList.length],
      }));
      setDomains(formatted);
    } catch (err) {
      console.error("Error fetching domains", err);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Internship Program</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Kickstart your career with hands-on experience at ProWorld Technology.
          </p>
        </div>
      </section>

      {/* Domains */}
      <section className="section-padding bg-section-alt">
        <div className="container mx-auto">
          <SectionHeading title="Internship Domains" subtitle="Choose your area of interest and apply" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((d) => (
              <div key={d.id} className="glass-card p-6 hover-lift group">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <d.icon className="w-6 h-6 text-primary-foreground" />
                </div>

                <h3 className="font-semibold text-foreground">{d.title}</h3>

                <p className="text-sm text-muted-foreground mb-3">
                  {d.description}
                </p>

                <Button
                  onClick={() => setApplyDomain(d)}
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

      {applyDomain && (
        <ApplyForm
          domain={applyDomain.title}
          domainId={applyDomain.id}
          onClose={() => setApplyDomain(null)}
        />
      )}
    </>
  );
}