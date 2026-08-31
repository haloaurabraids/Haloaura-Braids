"use client";

import { motion, Variants } from "framer-motion";
import { Search, CalendarCheck2, Sparkles } from "lucide-react";

export function Process() {
  const steps = [
    { 
      step: "01", 
      title: "Explore & Select", 
      desc: "Browse our catalog of signature protective braiding styles and choose the parting design that fits your energy.",
      icon: Search
    },
    { 
      step: "02", 
      title: "Reserve Securely", 
      desc: "Select your preferred date, submit hair parameters, and secure your session through safe card processing.",
      icon: CalendarCheck2
    },
    { 
      step: "03", 
      title: "Restore & Empower", 
      desc: "Arrive at our Midtown studio, enjoy refreshments, and leave with pristine, high-fashion braids.",
      icon: Sparkles
    }
  ];

  // Stagger variants for steps layout
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Step entry variants
  const stepVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 14 }
    }
  };

  return (
    <section className="py-12 md:py-16 bg-background-alt border-y border-border/60">
      <div className="container mx-auto px-4 md:px-6 text-center">
        
        {/* Header - Animates up */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mx-auto space-y-3 mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Your Seamless Experience
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Getting premium braids has never been easier. We guide you smoothly from selection to completion.
          </p>
        </motion.div>

        {/* Steps Grid - Staggered scroll entrance */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative z-10"
        >
          {/* Connector Line Desktop - Fades in */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
            className="hidden md:block absolute top-[44px] left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-primary/20 -z-10 origin-left"
          ></motion.div>
          
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={idx} 
                variants={stepVariants}
                className="flex flex-col items-center text-center space-y-4 group cursor-pointer"
              >
                {/* Circle Icon Container with absolute badge */}
                <div className="relative">
                  {/* Absolute Badge */}
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-background-alt shadow-sm">
                    {item.step}
                  </span>
                  
                  {/* Main Circle holding Icon */}
                  <div className="w-20 h-20 rounded-full bg-white dark:bg-zinc-900 border border-border/80 text-muted-foreground group-hover:text-primary group-hover:border-primary/45 group-hover:shadow-md flex items-center justify-center transition-all duration-300 transform group-hover:scale-105">
                    <Icon className="w-8 h-8" />
                  </div>
                </div>

                <h3 className="font-serif font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground max-w-[260px] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
