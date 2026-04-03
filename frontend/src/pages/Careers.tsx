import SectionHeading from "@/components/SectionHeading";
import careersCultureImg from "@/assets/careers-culture.jpg";
import { Heart, Zap, Users, Coffee } from "lucide-react";

const whyJoin = [
  { icon: Zap, title: "Learning & Growth", desc: "Continuous learning opportunities with access to latest technologies." },
  { icon: Users, title: "Collaborative Team", desc: "Work with passionate professionals in a supportive environment." },
  { icon: Heart, title: "Work-Life Balance", desc: "Flexible schedules and a culture that values your well-being." },
  { icon: Coffee, title: "Great Perks", desc: "Competitive compensation, benefits, and a vibrant workplace." },
];

export default function Careers() {
  return (
    <>
      <section className="gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Careers at ProWorld</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">Join our team and be part of something extraordinary.</p>
        </div>
      </section>

      {/* Career at ProWorld */}
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl text-center">
          <SectionHeading title="Career at ProWorld" subtitle="Build your future with us" />
          <p className="text-muted-foreground leading-relaxed">
            At ProWorld Technology, we believe our people are our greatest asset. We foster a culture of innovation, collaboration, and continuous learning where every team member can thrive and make a meaningful impact.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="section-padding bg-section-alt">
        <div className="container mx-auto">
          <SectionHeading title="Why Join Us" subtitle="Benefits of being part of ProWorld" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyJoin.map((item, i) => (
              <div key={i} className="glass-card p-6 text-center hover-lift group">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Culture */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Work Culture</h2>
              <div className="h-1 w-16 rounded-full gradient-primary mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                We cultivate an environment where creativity meets expertise. Our open-door policy encourages communication at all levels, ensuring everyone's voice is heard and valued.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From team outings to hackathons, from mentorship programs to skill-sharing sessions — life at ProWorld is about growing together while having fun along the way.
              </p>
            </div>
            <img src={careersCultureImg} alt="Work Culture" className="rounded-2xl shadow-glass w-full" loading="lazy" width={1280} height={720} />
          </div>
        </div>
      </section>
    </>
  );
}
