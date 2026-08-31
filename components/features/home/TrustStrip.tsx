import { Scissors, ShieldCheck, Heart, Award } from "lucide-react";

export function TrustStrip() {
  const items = [
    { icon: Scissors, title: "Professional Braiding", desc: "Artisanal techniques" },
    { icon: ShieldCheck, title: "Quality Hair Care", desc: "Healthy edges & scalp" },
    { icon: Heart, title: "Personalized Styles", desc: "Customized options" },
    { icon: Award, title: "Client-Focused", desc: "Premium luxury service" }
  ];

  return (
    <section className="border-y border-border/80 bg-background-alt py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1 text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
