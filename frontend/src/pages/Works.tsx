import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Settings, BarChart3, Building2, ShoppingCart, GraduationCap, Heart, Truck } from "lucide-react";

const expertise = [
  "Custom Software Development", "Cloud Solutions", "Mobile Applications",
  "AI & Machine Learning", "Data Analytics", "Cybersecurity",
];

const approach = [
  { step: "01", title: "Discovery", desc: "Understanding your needs, goals, and challenges through in-depth consultation." },
  { step: "02", title: "Strategy", desc: "Crafting a tailored roadmap with clear milestones and deliverables." },
  { step: "03", title: "Development", desc: "Building your solution using agile methodologies and best practices." },
  { step: "04", title: "Delivery", desc: "Thorough testing, deployment, and ongoing support for long-term success." },
];

const industries = [
  { icon: Building2, name: "Real Estate" },
  { icon: ShoppingCart, name: "E-Commerce" },
  { icon: GraduationCap, name: "Education" },
  { icon: Heart, name: "Healthcare" },
  { icon: Truck, name: "Logistics" },
  { icon: BarChart3, name: "Finance" },
];

export default function Works() {
  return (
    <>
      <section className="gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Works</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">How we deliver exceptional results for our clients.</p>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl text-center">
          <SectionHeading title="What We Do" subtitle="Delivering end-to-end technology solutions" />
          <p className="text-muted-foreground leading-relaxed">
            We partner with businesses of all sizes to build, scale, and transform their digital presence. From startups to enterprises, our solutions are designed to drive growth and efficiency.
          </p>
        </div>
      </section>

      {/* Expertise */}
      <section className="section-padding bg-section-alt">
        <div className="container mx-auto">
          <SectionHeading title="Our Expertise" subtitle="Technologies and domains we excel in" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {expertise.map((e, i) => (
              <div key={i} className="glass-card p-5 flex items-center gap-3 hover-lift">
                <Code className="w-5 h-5 text-primary shrink-0" />
                <span className="font-medium text-foreground">{e}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading title="Our Approach" subtitle="A proven process for delivering results" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.map((a, i) => (
              <div key={i} className="glass-card p-6 text-center hover-lift">
                <div className="text-4xl font-bold gradient-text mb-3">{a.step}</div>
                <h3 className="font-semibold text-foreground mb-2">{a.title}</h3>
                <p className="text-muted-foreground text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding bg-section-alt">
        <div className="container mx-auto">
          <SectionHeading title="Industries We Serve" subtitle="Trusted across diverse sectors" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind, i) => (
              <div key={i} className="glass-card p-6 text-center hover-lift group">
                <ind.icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Start Your Project?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Let's discuss how ProWorld Technology can help transform your business.</p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary-foreground text-primary rounded-xl px-8 hover:bg-primary-foreground/90">
              Contact Us <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
