"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

function AnimatedCounter({ end, duration = 1500, decimals = 0, suffix = "" }: { end: number; duration?: number; decimals?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(progress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative pt-12 pb-16 md:pt-16 md:pb-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col text-left space-y-6"
          >
            <div className="inline-flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Braids • Beauty • Confidence
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground leading-[1.1] tracking-tight">
              Braids That Make <br />
              You Feel <span className="text-primary italic font-serif">Beautiful.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Experience premium braiding tailored to highlight your natural energy. At Haloaura Braids, we weave craftsmanship, comfort, and style into every single braid, giving you an Instagram-worthy look that radiates confidence.
            </p>

            <div className="flex flex-row items-center gap-3 pt-2 w-full">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-full px-4 sm:px-8 py-5 sm:py-7 text-xs sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex-1 sm:flex-none text-center">
                <Link href="/book">
                  Book Appointment
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-border hover:bg-accent text-foreground rounded-full px-4 sm:px-8 py-5 sm:py-7 text-xs sm:text-base font-bold transition-all duration-300 cursor-pointer flex-1 sm:flex-none text-center">
                <Link href="/services">
                  Explore Styles
                </Link>
              </Button>
            </div>

            {/* Stats Section with animated counters and luxury colors */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/60 grid grid-cols-3 gap-4 sm:gap-8 max-w-md">
              <div className="flex flex-col text-left">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                  <AnimatedCounter end={100} suffix="+" />
                </span>
                <span className="mt-1 text-xs sm:text-sm font-semibold text-muted-foreground leading-tight">Happy Clients</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
                  <AnimatedCounter end={99.9} decimals={1} suffix="%" />
                </span>
                <span className="mt-1 text-xs sm:text-sm font-semibold text-muted-foreground leading-tight">Satisfaction Rate</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-primary-dark tracking-tight">
                  <AnimatedCounter end={12} suffix="+" />
                </span>
                <span className="mt-1 text-xs sm:text-sm font-semibold text-muted-foreground leading-tight">Experience</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Floating Images Collage (Exact format from your reference project) */}
          <div className="relative flex items-center justify-center h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px] w-full mt-8 lg:mt-0">
            {/* Background glowing circle for images - Optimized with blur-2xl and transform-gpu */}
            <div className="hidden sm:block absolute inset-0 m-auto -z-10 size-[80%] rounded-full bg-gradient-to-tr from-primary/10 to-secondary/15 blur-2xl transform-gpu will-change-[filter]" />

            {/* Sparkle animations floating around */}
            <motion.div
              className="absolute top-[10%] left-[5%] text-secondary/40 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Sparkles className="size-6 sm:size-8" />
            </motion.div>

            <motion.div
              className="absolute bottom-[10%] right-[5%] text-primary/40 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Sparkles className="size-5 sm:size-6" />
            </motion.div>

            {/* Image 1: Larger Left/Back image */}
            <div className="absolute left-4 top-4 w-[62%] h-[82%] animate-float-y">
              <motion.div
                className="relative w-full h-full rounded-[2rem] overflow-hidden border-4 border-background dark:border-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transform-gpu"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
              >
                <Image
                  src="/images/hero_braids.jpg"
                  alt="Premium braids styling portrait"
                  fill
                  sizes="(max-w-640px) 60vw, (max-w-1024px) 40vw, 30vw"
                  className="object-cover object-top"
                  priority
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>

            {/* Image 2: Smaller Overlapping Right/Front image */}
            <div className="absolute right-4 bottom-4 w-[52%] h-[72%] animate-float-x">
              <motion.div
                className="relative w-full h-full rounded-[1.75rem] overflow-hidden border-4 border-background dark:border-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu"
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 25 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.15,
                }}
              >
                <Image
                  src="/images/knotless_braids.jpg"
                  alt="Intricate braid details"
                  fill
                  sizes="(max-w-640px) 50vw, (max-w-1024px) 35vw, 25vw"
                  className="object-cover object-top"
                  loading="lazy"
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
