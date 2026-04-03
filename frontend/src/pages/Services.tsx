import SectionHeading from "@/components/SectionHeading";
import {
  Search, Code, Palette, Layout, Smartphone, Megaphone,
  Rocket, Monitor, Settings, Headphones, HardDrive, PenTool
} from "lucide-react";

const services = [
  { icon: Search, title: "SEO", desc: "Boost your online visibility with data-driven search engine optimization strategies." },
  { icon: Code, title: "Web Development", desc: "Custom web applications built with modern frameworks and best practices." },
  { icon: Palette, title: "Graphic Design", desc: "Stunning visual designs that communicate your brand's message effectively." },
  { icon: Layout, title: "UI/UX Design", desc: "User-centered design that creates intuitive and engaging digital experiences." },
  { icon: Smartphone, title: "App Development", desc: "Native and cross-platform mobile apps for iOS and Android." },
  { icon: Megaphone, title: "Digital Marketing", desc: "Comprehensive digital marketing strategies to grow your online presence." },
  { icon: Rocket, title: "Build & Launch", desc: "End-to-end product development from ideation to successful market launch." },
  { icon: Monitor, title: "Responsive Design", desc: "Websites that look and perform perfectly across all devices and screen sizes." },
  { icon: Settings, title: "Customized Solutions", desc: "Tailored technology solutions designed to meet your unique business needs." },
  { icon: Headphones, title: "IT Support", desc: "24/7 technical support and maintenance to keep your systems running smoothly." },
  { icon: HardDrive, title: "Hardware Solutions", desc: "Comprehensive hardware consulting, procurement, and setup services." },
  { icon: PenTool, title: "Content Designing", desc: "Engaging content creation that tells your story and connects with your audience." },
];

export default function Services() {
  return (
    <>
      <section className="gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Services</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">Comprehensive IT solutions tailored to your business needs.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading title="What We Offer" subtitle="End-to-end technology services for modern businesses" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i} className="glass-card p-6 hover-lift group cursor-default">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <s.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
