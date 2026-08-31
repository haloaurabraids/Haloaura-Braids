"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { Award, Heart, Gem, Sparkles } from "lucide-react";

export function WhyChooseUs() {
  const benefits = [
    { 
      title: "Masterful Artistry", 
      desc: "Immaculate parting grids, balanced weight distribution, and protective braiding techniques that look gorgeous and last longer.",
      icon: Award
    },
    { 
      title: "Bespoke Styling", 
      desc: "Every grid pattern, length, and volume is customized around your natural face shape, scalp health, and hair texture.",
      icon: Heart
    },
    { 
      title: "Luxury Studio Vibe", 
      desc: "Sit back and relax in a private, clean, and luxurious suite with premium client amenities, drinks, and edge care.",
      icon: Gem
    },
    { 
      title: "Empowered Confidence", 
      desc: "Our ultimate goal is making you feel like your most beautiful self. You leave polished, glowing, and confident.",
      icon: Sparkles
    }
  ];

  // Stagger variants for the benefits grid
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Card slide up variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Headers - Animates in from left */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Why Haloaura
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground leading-[1.2]">
                Beautiful Results. <br />
                Thoughtful <span className="text-primary italic font-serif">Service.</span>
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              We have built a premium reputation around detail, client comfort, and consistent excellence. Here is what makes the Haloaura experience stand out:
            </p>
            <div className="pt-2">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-full px-6 py-5 cursor-pointer">
                <Link href="/book">
                  Book Your Visit
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Column Benefit Cards - Staggered entrance */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {benefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={idx} 
                  variants={cardVariants}
                  className="bg-background-alt border border-border/80 p-6 rounded-3xl text-left space-y-4 shadow-sm hover:shadow-md hover:bg-primary/5 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
