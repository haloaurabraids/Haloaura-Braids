"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Instagram, Facebook } from "@/components/ui/social-icons";

// Custom TikTok icon outline matching Lucide style
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SOCIAL_CHANNELS = [
  {
    name: "Instagram",
    handle: "@HaloauraBraids",
    desc: "Browse our daily styling lookbook, check client video transformations, and stay tuned for weekly edge-care tips.",
    url: "https://www.instagram.com/haloaura237/",
    icon: Instagram,
    cta: "Follow Instagram"
  },
  {
    name: "TikTok",
    handle: "@Haloaura.Braids",
    desc: "Watch our satisfying stitch braid transitions, hair prep tutorials, and quick protective style guides.",
    url: "https://www.tiktok.com/@haloaurabraids",
    icon: TikTokIcon,
    cta: "Follow TikTok"
  },
  {
    name: "Facebook",
    handle: "Haloaura Braids",
    desc: "Join our styling community, read reviews, and stay updated on holiday season slot availability.",
    url: "https://facebook.com",
    icon: Facebook,
    cta: "Join Page"
  }
];

// Stagger variants for the social grid
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Card slide variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export function InstagramStrip() {
  return (
    <section className="py-12 md:py-16 bg-background-alt border-y border-border/60">
      <div className="container mx-auto px-4 md:px-6 text-center">
        
        {/* Header - Animates in */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mx-auto space-y-2 mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Connect With Us
          </span>
          <h2 className="text-3xl font-serif font-bold text-foreground">
            Follow Our Journey
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Stay inspired and join our growing community of protective styling lovers across our social platforms.
          </p>
        </motion.div>

        {/* 3-Column Social Cards Grid - Staggered scroll entrance */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {SOCIAL_CHANNELS.map((ch, idx) => {
            const Icon = ch.icon;
            return (
              <motion.a 
                key={idx}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                className="bg-card border border-border/80 p-8 rounded-3xl text-left space-y-5 shadow-sm hover:shadow-lg hover:bg-primary/5 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Top row: Platform & Icon */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                      {ch.name}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Handle & Desc */}
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                      {ch.handle}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {ch.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Link Action */}
                <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs font-bold text-primary group-hover:text-primary-dark transition-colors">
                  <span>{ch.cta}</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.a>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
