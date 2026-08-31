"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-12 md:py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Studio Portrait Frame - Animates in from the left */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-4 relative flex justify-start"
          >
            <div className="relative w-full max-w-[380px] aspect-[4/3] sm:aspect-[3/4]">
              {/* Backing Card */}
              <div className="absolute top-8 left-4 w-full h-full bg-accent rounded-[2rem] -z-10"></div>
              
              {/* Image Frame */}
              <div className="w-full h-full overflow-hidden rounded-[2rem] shadow-xl border-4 border-white dark:border-zinc-900 bg-background-alt relative">
                <Image 
                  src="/images/about_braids.jpeg"
                  alt="Stylist working on beautiful hair braids"
                  fill
                  className="object-cover"
                  sizes="(max-w-768px) 100vw, 380px"
                />
              </div>
            </div>
          </motion.div>

          {/* Editorial Text - Animates up and fades in */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-8 space-y-6 text-left"
          >
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                About Haloaura Braids
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                More Than Braids. <br />
                It's Your <span className="text-primary italic font-serif">Signature.</span>
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
              <p>
                At Haloaura Braids, we believe that your hair is the ultimate canvas of self-expression. Led by expert stylists who specialize in protective hair design, we deliver clean grid partings, uniform braids, and specialized treatment that protects your natural edges.
              </p>
              <p>
                Every appointment is designed around your unique features and lifestyle. We combine high-end editorial aesthetics with a warm, welcoming studio vibe to ensure you leave not just with gorgeous braids, but feeling restored, polished, and confident.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/80">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-semibold text-foreground">Precision Craftsmanship</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-semibold text-foreground">Healthy Scalp Focus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-semibold text-foreground">Luxury Studio Vibe</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-semibold text-foreground">Instagram-Ready Finishes</span>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-full px-6 py-5 cursor-pointer">
                <Link href="/book" className="flex items-center gap-2">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
