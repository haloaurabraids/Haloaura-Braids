"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function FeaturedStyle() {
  return (
    <section className="py-12 md:py-16 bg-background relative overflow-hidden">
      {/* Subtle champagne gold backing accent */}
      <div className="absolute right-0 top-1/4 w-72 h-72 bg-secondary/10 rounded-full filter blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Editorial Image grid layout - Animates with subtle scale and fade-in */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[3/2] overflow-hidden rounded-[2.5rem] shadow-2xl bg-muted border-4 border-white dark:border-zinc-900">
              <Image 
                src="/images/signature_style.jpg"
                alt="Premium artistic custom signature braids updo"
                fill
                className="object-cover"
                sizes="(max-w-768px) 100vw, 600px"
              />
            </div>
          </motion.div>

          {/* Text showcase - Animates up and fades in */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Signature Highlight
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground leading-[1.2]">
                Your Style. <br />
                Your <span className="text-primary italic font-serif">Energy.</span>
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Our Signature Highlight represents the absolute peak of modern protective hair design. Every single parting grid is meticulously mapped to respect your natural hair growth patterns, while premium, pre-stretched extensions are seamlessly blended using advanced feed-in techniques. We sculpt a custom crown that complements your facial features and personal style, ensuring a tension-free installation that protects your edges, retains scalp health, and maintains its flawless, frizz-free luster for weeks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-full px-6 py-5 cursor-pointer">
                <Link href="#gallery">
                  View Our Gallery
                </Link>
              </Button>
              <Button asChild variant="ghost" className="text-primary hover:text-primary-dark hover:bg-transparent rounded-full px-6 py-5 font-bold cursor-pointer">
                <Link href="/book" className="flex items-center gap-2">
                  Reserve Style <ArrowRight className="w-4.5 h-4.5" />
                </Link>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
