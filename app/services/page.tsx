"use client";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/features/home/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, DollarSign, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

const DETAILED_SERVICES = [
  {
    id: "knotless-braids",
    name: "Knotless Braids",
    price: "220",
    duration: "5 hrs",
    image: "/images/knotless_braids.jpg",
    description: "Lightweight, pain-free protective style that starts smoothly at the roots for a natural growth look. Perfect for active lifestyles and sensitive scalps.",
    features: ["Pain-free installation", "Protects natural edges", "Lasts 6 to 8 weeks", "Flexible styling options"]
  },
  {
    id: "box-braids",
    name: "Box Braids",
    price: "180",
    duration: "4 hrs",
    image: "/images/box_braids.jpg",
    description: "Immaculate block partings with uniform braids. A timeless classic designed to protect your natural hair while giving you a striking, customizable look.",
    features: ["Symmetric block parts", "Highly durable", "Lasts 8 to 10 weeks", "Various length options"]
  },
  {
    id: "boho-braids",
    name: "Boho Braids",
    price: "250",
    duration: "4 hrs",
    image: "/images/boho_braids.jpg",
    description: "Beautiful braids layered with cascading, voluminous curly curls for a gorgeous bohemian texture. Delivers a soft, romantic, and textured aesthetic.",
    features: ["Premium curly extensions", "Romantic textured finish", "Lasts 6 to 8 weeks", "Voluminous appearance"]
  },
  {
    id: "cornrows",
    name: "Cornrows",
    price: "80",
    duration: "1.5 hrs",
    image: "/images/cornrows.jpg",
    description: "Sleek, geometric parting layouts and intricate scalp braiding styled into your signature bun, ponytail, or left to flow back.",
    features: ["Intricate geometric parts", "Quick installation", "Lasts 3 to 4 weeks", "Ideal low-maintenance style"]
  },
  {
    id: "feed-in-braids",
    name: "Feed-In Braids",
    price: "120",
    duration: "2.5 hrs",
    image: "/images/signature_style.jpg",
    description: "Hair extensions are added gradually to the natural hair braid to create a seamless transition that looks flat and extremely natural.",
    features: ["Extremely flat roots", "Very natural transition", "Lasts 4 to 6 weeks", "Clean stitch parting"]
  },
  {
    id: "protective-styles",
    name: "Protective Styles",
    price: "100",
    duration: "2 hrs",
    image: "/images/hero_braids.jpg",
    description: "Scalp protection focus. Twist combinations, flat twists, and natural hair designs built to nurture under-hair growth.",
    features: ["Scalp treatment focus", "No tension install", "Lasts 3 to 5 weeks", "Perfect between-install care"]
  },
  {
    id: "custom-braiding",
    name: "Custom Braiding",
    price: "150",
    duration: "3 hrs",
    image: "/images/about_braids.jpg",
    description: "Have a specific creative braid pattern in mind? Work with our artists to design stitch designs, accent braids, or hair accessories.",
    features: ["Bespoke pattern design", "Add accessory options", "Custom pricing options", "Collaborative styling"]
  }
];

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground scroll-smooth">
      <Navbar />
      
      <main className="flex-1">
        {/* Services Page Header */}
        <section className="relative py-20 bg-background-alt border-b border-border/60 overflow-hidden">
          <div className="absolute right-0 top-1/4 w-80 h-80 bg-primary/10 rounded-full filter blur-[100px] pointer-events-none"></div>
          <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-secondary/10 rounded-full filter blur-[100px] pointer-events-none"></div>

          <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Haloaura Menu
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight leading-none">
              Our Signature <br />
              <span className="text-primary italic font-serif">Braiding Services</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Explore our comprehensive braiding menu. Designed with clean parting grids, edge protective tension, and professional hair extensions to elevate your everyday confidence.
            </p>
          </div>
        </section>

        {/* Detailed Menu Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="space-y-16">
              {DETAILED_SERVICES.map((srv, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={srv.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 border-b border-border/40 pb-16 last:border-b-0 ${
                      isEven ? "" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Braid Image Container */}
                    <div className="w-full lg:w-1/2 relative flex justify-center">
                      <div className="absolute top-6 left-4 w-[90%] h-full bg-accent rounded-[2.5rem] -z-10"></div>
                      <div className="relative w-full max-w-[440px] aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-xl border-4 border-white dark:border-zinc-900 bg-background-alt">
                        <Image
                          src={srv.image}
                          alt={srv.name}
                          fill
                          className="object-cover"
                          sizes="(max-w-1024px) 100vw, 500px"
                        />
                      </div>
                    </div>

                    {/* Braid Description details */}
                    <div className="w-full lg:w-1/2 text-left space-y-6">
                      <div className="space-y-3">
                        <h2 className="text-3xl font-serif font-bold text-foreground">{srv.name}</h2>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-4 items-center pt-1 text-sm font-semibold">
                          <span className="flex items-center gap-1 text-primary bg-primary/10 px-3 py-1 rounded-full">
                            <DollarSign className="w-4 h-4" />
                            Starts at ${srv.price}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            <Clock className="w-4 h-4" />
                            {srv.duration}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-base leading-relaxed">
                        {srv.description}
                      </p>

                      {/* Feature checklist */}
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-foreground">
                        {srv.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Booking Link */}
                      <div className="pt-4">
                        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-full px-8 py-6 text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
                          <Link href={`/book?service=${srv.id}`} className="flex items-center gap-2">
                            Book Style Now <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Appointment Preparation Checklist Banner */}
        <section className="py-20 bg-background-alt border-y border-border/60">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-left">
            <div className="bg-card border border-border rounded-[2.5rem] p-8 sm:p-12 shadow-sm space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Preparation Guide
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                  How to Prepare for Your Braiding Visit
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  To ensure a flawless installation and healthy hair results, we ask all clients to complete this preparation checklist prior to arriving:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/40">
                <div className="space-y-3">
                  <h4 className="font-bold text-base text-foreground">1. Cleanse & Dry</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Arrive with your scalp thoroughly shampooed, completely free of styling gels or thick conditioners, and blown out straight from roots to ends.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-base text-foreground">2. Detangling</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Detangle your hair thoroughly. An extra fee may apply if hair requires extensive comb-out detangling before we can begin braiding.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-base text-foreground">3. Scalp Care Oils</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Avoid adding heavy oils or greases to your roots. We will use premium, lightweight growth oils during your session to nourish your edges.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-base text-foreground">4. Extension Hair</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Unless otherwise arranged, please bring your preferred extension hair to match your desired colors. Check your email confirmation for quantity details.
                  </p>
                </div>
              </div>

              <div className="pt-4 text-center sm:text-left">
                <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-6 cursor-pointer">
                  <Link href="/book">
                    Go to Booking Portal
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
