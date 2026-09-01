"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const SERVICES = [
  {
    id: "knotless-braids",
    name: "Knotless Braids",
    price: "150",
    duration: "5 hrs",
    description: "Lightweight, pain-free protective style that starts smoothly at the roots for a natural growth look."
  },
  {
    id: "boho-knotless-braids",
    name: "Boho Knotless Braids",
    price: "190",
    duration: "4.5 hrs",
    description: "Knotless braids layered with curly curls for a voluminous bohemian look."
  },
  {
    id: "stitch-braids-attachment",
    name: "Stitch Braids — With Attachment",
    price: "70",
    duration: "3 hrs",
    description: "Clean feed-in stitches using hair extensions for extra length and volume."
  },
  {
    id: "stitch-braids-natural",
    name: "Stitch Braids — Natural Hair Only",
    price: "45",
    duration: "2 hrs",
    description: "Precision scalp stitch braid styles crafted using only your natural hair."
  },
  {
    id: "lemonade-braids",
    name: "Lemonade Braids",
    price: "140",
    duration: "3.5 hrs",
    description: "Side-swept, neat protective feed-in braids styled into elegant side cascades."
  },
  {
    id: "fulani-braids",
    name: "Fulani Braids",
    price: "160",
    duration: "4 hrs",
    description: "Intricate cornrows in the front combined with box braids or twists in the back."
  },
  {
    id: "tribal-braids",
    name: "Tribal Braids",
    price: "170",
    duration: "4 hrs",
    description: "Two-layer cornrow patterns inspired by traditional African heritage designs."
  },
  {
    id: "boho-goddess-braids",
    name: "Boho / Goddess Braids",
    price: "180",
    duration: "5 hrs",
    description: "Sleek box braids with loose, wavy extensions for a soft goddess-like finish."
  }
];

// Stagger variants for grid layout
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

// Transition variants for single card
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export function Services() {
  return (
    <section id="services" className="py-12 md:py-16 bg-background-alt border-y border-border/60">
      <div className="container mx-auto px-4 md:px-6 text-center">
        
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Signature Braiding Menu
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Select a style to schedule your session. We use clean partings, organic edge protection formulas, and extensions.
          </p>
        </div>

        {/* 4 Cards per Row (Total 8 cards) with Staggered Framer Motion */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((srv) => (
            <motion.div 
              key={srv.id}
              variants={cardVariants}
              className="bg-card border border-border/80 rounded-3xl py-8 px-6 min-h-[160px] shadow-sm hover:shadow-lg hover:bg-primary/5 hover:border-primary/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-center text-left group cursor-pointer"
            >
              <div className="space-y-3">
                {/* Name & Price */}
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {srv.name}
                  </h3>
                  <div className="text-sm font-semibold text-primary">
                    Starts at ${srv.price}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {srv.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Centered button linking to the services page */}
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-full px-8 py-6 text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
            <Link href="/services" className="flex items-center gap-2">
              View All Braiding Services <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
