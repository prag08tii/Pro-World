import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import whoWeAreImg from "@/assets/who-we-are.jpg";
import { Award, Cpu, GraduationCap, Shield, Briefcase, Users, BookOpen, UserCheck } from "lucide-react";

const heroImages = [hero1, hero2, hero3, hero4];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % heroImages.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {heroImages.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: current === i ? 1 : 0 }}
        >
          <img
            src={img}
            alt={`Hero ${i + 1}`}
            className="w-full h-full object-cover"
            style={{ animation: current === i ? "heroZoom 8s ease-out forwards" : "none" }}
            width={1920}
            height={1080}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-up">
            Empowering Innovation<br />
            <span className="text-accent">Through Technology</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8" style={{ animationDelay: "0.2s" }}>
            Leading IT services and training company delivering cutting-edge solutions and empowering future tech professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: "0.4s" }}>
            <Link to="/services">
              <Button size="lg" className="gradient-primary text-primary-foreground px-8 py-6 text-base rounded-xl shadow-hero hover:opacity-90 transition-opacity">
                Our Services <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 backdrop-blur-sm px-8 py-6 text-base rounded-xl hover:bg-primary-foreground/20">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${current === i ? "bg-primary-foreground w-8" : "bg-primary-foreground/40"}`}
          />
        ))}
      </div>
    </section>
  );
}

function WhoWeAre() {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Who We Are</h2>
            <div className="h-1 w-16 rounded-full gradient-primary mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              ProWorld Technology is a leading IT services and training company based in Pune, India. We specialize in providing cutting-edge technology solutions to businesses while simultaneously empowering the next generation of tech professionals through our comprehensive training and internship programs.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our team of experienced professionals is dedicated to bridging the gap between academic learning and industry requirements, ensuring that both our clients and students achieve their goals.
            </p>
            <Link to="/about">
              <Button className="gradient-primary text-primary-foreground rounded-xl px-6">
                Learn More About Us <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <img src={whoWeAreImg} alt="Who We Are" className="rounded-2xl shadow-glass w-full" loading="lazy" width={1280} height={720} />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 gradient-primary rounded-2xl opacity-20" />
            <div className="absolute -top-4 -right-4 w-32 h-32 gradient-primary rounded-full opacity-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

const whyCards = [
  { icon: Award, title: "Industry Expertise", desc: "Years of experience delivering enterprise-grade solutions across multiple industries." },
  { icon: Cpu, title: "Cutting-Edge Tech", desc: "We leverage the latest technologies to build future-proof solutions." },
  { icon: GraduationCap, title: "Student Empowerment", desc: "Comprehensive training programs that bridge academia and industry." },
  { icon: Shield, title: "Quality Assurance", desc: "Rigorous testing and quality control at every stage of development." },
];

function WhyProWorld() {
  return (
    <section className="section-padding bg-section-alt">
      <div className="container mx-auto">
        <SectionHeading title="Why ProWorld" subtitle="What sets us apart from the rest" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyCards.map((card, i) => (
            <div key={i} className="glass-card p-6 hover-lift text-center group">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <card.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">{card.title}</h3>
              <p className="text-muted-foreground text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const stats = [
  { icon: Briefcase, value: "150+", label: "Projects Completed" },
  { icon: Users, value: "80+", label: "Happy Clients" },
  { icon: BookOpen, value: "500+", label: "Students Trained" },
  { icon: UserCheck, value: "25+", label: "Team Members" },
];

function Stats() {
  return (
    <section className="py-16 gradient-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center text-primary-foreground">
              <s.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl md:text-5xl font-bold mb-1">{s.value}</div>
              <div className="text-sm opacity-80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <>
      <HeroCarousel />
      <WhoWeAre />
      <WhyProWorld />
      <Stats />
    </>
  );
}
