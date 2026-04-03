import SectionHeading from "@/components/SectionHeading";
import { BookOpen, Rocket, Users, Award } from "lucide-react";

const features = [
  { icon: BookOpen, title: "Industry Training", desc: "Comprehensive training programs designed by industry experts covering the latest technologies and best practices." },
  { icon: Rocket, title: "Real-Time Projects", desc: "Work on live projects that give you practical experience and a portfolio to showcase to future employers." },
  { icon: Users, title: "Expert Mentorship", desc: "One-on-one guidance from experienced professionals who help you navigate your career path." },
  { icon: Award, title: "Placement Support", desc: "Dedicated placement assistance with resume building, interview preparation, and company referrals." },
];

export default function Features() {
  return (
    <>
      <section className="gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Features</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">What makes ProWorld Technology the right choice for your career and business.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <div key={i} className="glass-card p-8 hover-lift group">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
