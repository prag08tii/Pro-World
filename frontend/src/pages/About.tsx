import SectionHeading from "@/components/SectionHeading";
import aboutTeamImg from "@/assets/about-team.jpg";
import { Lightbulb, Heart, Star, TrendingUp } from "lucide-react";

const values = [
  { icon: Lightbulb, title: "Innovation", desc: "Continuously exploring new technologies and creative solutions." },
  { icon: Heart, title: "Integrity", desc: "Maintaining the highest ethical standards in all our endeavors." },
  { icon: Star, title: "Excellence", desc: "Striving for excellence in every project and interaction." },
  { icon: TrendingUp, title: "Growth", desc: "Fostering growth for our team, clients, and community." },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">About ProWorld Technology</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">Discover our story, mission, and the values that drive everything we do.</p>
        </div>
      </section>

      {/* Our Team */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img src={aboutTeamImg} alt="Our Team" className="rounded-2xl shadow-glass w-full" loading="lazy" width={1280} height={720} />
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Team</h2>
              <div className="h-1 w-16 rounded-full gradient-primary mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our team comprises seasoned professionals with diverse expertise in software development, IT consulting, and education. Each member brings unique skills and perspectives that enrich our collaborative environment.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Together, we work towards delivering exceptional results for our clients while nurturing the next generation of tech talent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-section-alt">
        <div className="container mx-auto">
          <SectionHeading title="Our Story" subtitle="How ProWorld Technology began its journey" />
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded with a vision to bridge the gap between technology and talent, ProWorld Technology started as a small IT training center in Pune. Over the years, we've grown into a full-service IT company offering both enterprise solutions and comprehensive training programs.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we're proud to have trained over 500 students, completed 150+ projects, and built lasting relationships with 80+ clients across various industries.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver innovative technology solutions that drive business growth while empowering aspiring professionals with industry-relevant skills and real-world experience.
              </p>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the most trusted IT services and training partner, creating a world where technology talent meets opportunity, and businesses thrive through digital transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-section-alt">
        <div className="container mx-auto">
          <SectionHeading title="Core Values" subtitle="The principles that guide everything we do" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="glass-card p-6 text-center hover-lift group">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <v.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
