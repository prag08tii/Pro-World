interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({ title, subtitle, center = true }: Props) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h2>
      {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
      <div className={`mt-4 h-1 w-16 rounded-full gradient-primary ${center ? "mx-auto" : ""}`} />
    </div>
  );
}
