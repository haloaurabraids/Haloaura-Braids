"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function BookingCTA() {
  return (
    <section className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Pink gradient background frame - Animates with subtle slide and scale */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-dark rounded-[2.5rem] p-8 md:p-16 text-center text-white overflow-hidden shadow-2xl"
        >
          {/* Subtle gold decoration behind */}
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-secondary/15 rounded-full filter blur-[50px] pointer-events-none -rotate-12 translate-x-20 translate-y-20"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-white/10 px-4 py-1.5 rounded-full">
              <Sparkles className="w-4 h-4 text-secondary fill-secondary" />
              <span className="text-xs uppercase tracking-widest font-semibold">Reserve Your Spot</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight">
              Ready for Your Next Look?
            </h2>
            
            <p className="text-white/85 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
              Book your professional braiding appointment today. Reserve your style, select your slots, and let us elevate your beauty with confidence.
            </p>

            <div className="pt-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-background-alt font-bold rounded-full px-8 py-7 text-base shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
                <Link href="/book">
                  Book Your Appointment Now
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
