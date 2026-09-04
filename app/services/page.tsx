"use client";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/features/home/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { DollarSign, Sparkles, CheckCircle2, ArrowRight, Compass } from "lucide-react";

// Localized master list of exactly the 20 main services requested by client with expanded descriptions
const MAIN_SERVICES = [
  {
    id: "knotless-braids",
    name: "Knotless Braids",
    price: 150,
    image: "/gallary/knotless-braids.jpeg", // Add image path here (e.g. "/images/knotless.jpg")
    description: "Experience premium, tension-free box braids that start seamlessly at your natural hair roots for a flat, lightweight finish. Excellent for safeguarding your edges, preserving hair health, and preventing scalp tension for sensitive clients.",
    features: ["Pain-free installation", "Protects natural edges", "Lasts 6 to 8 weeks", "Flexible styling options"],
    bookingId: "knotless-braids"
  },
  {
    id: "boho-knotless-braids",
    name: "Boho Knotless Braids",
    price: 190,
    image: "/gallary/boho.jpeg", // Add image path here (e.g. "/images/boho_knotless.jpg")
    description: "Stunning knotless box braids layered with cascading, voluminous human hair curly strands throughout the length. This design delivers a highly textured, romantic bohemian aesthetic that flows naturally with volume and bounce.",
    features: ["Premium curly extensions", "Romantic textured finish", "Lasts 6 to 8 weeks", "Voluminous appearance"],
    bookingId: "boho-knotless-braids"
  },
  {
    id: "stitch-braids-attachments",
    name: "Stitch Braids — With Attachment",
    price: 70,
    image: "/gallary/freestyle-stitch-braid.jpeg", // Add image path here
    description: "Precision stitch-line feed-in cornrows crafted with premium attachment extensions for added length, density, and longevity. Perfect for achieving clean, defined parting lines and a high-end, structured signature styling pattern.",
    features: ["Clean stitch partings", "Feed-in extension hair", "Lasts 4 to 6 weeks", "Sleek protective layout"],
    bookingId: "stitch-braids-attachments"
  },
  {
    id: "stitch-braids-natural",
    name: "Stitch Braids — Natural Hair Only",
    price: 45,
    image: "/gallary/stitch.jpeg", // Add image path here
    description: "Immaculate stitch-line cornrows braided using only your natural hair. A low-maintenance, breathable styling option designed to showcase your natural curl pattern while keeping the scalp healthy and clean.",
    features: ["No extensions added", "Quick installation", "Scalp breathing focus", "Ideal protective design"],
    bookingId: "stitch-braids-natural"
  },
  {
    id: "lemonade-braids",
    name: "Lemonade Braids",
    price: 140,
    image: "", // Add image path here
    description: "Graceful, side-swept feeding cornrows designed to flow beautifully to one side. This classic layout offers an elegant, striking framing effect that highlights your features and suits any formal or casual look.",
    features: ["Side-swept feeding style", "Intricate crown layout", "Lasts 5 to 7 weeks", "Elegant facial framing"],
    bookingId: "lemonade-braids"
  },
  {
    id: "fulani-braids",
    name: "Fulani Braids",
    price: 160,
    image: "/gallary/fulani-boho-braids.jpeg", // Add image path here
    description: "Traditional Fulani-inspired layouts featuring a signature feed-in cornrow pattern down the center, side braids with beads options, and single box braids styled transitionally in the back portion.",
    features: ["Intricate tribal patterns", "Box braids in the back", "Lasts 6 to 8 weeks", "Accessorize-ready design"],
    bookingId: "fulani-braids"
  },
  {
    id: "tribal-braids",
    name: "Tribal Braids",
    price: 170,
    image: "", // Add image path here
    description: "A gorgeous, multi-layered braiding layout featuring intricate feeding cornrow patterns in the front layer and classic, uniform box braids flowing down the back layer for maximum volume and protective styling longevity.",
    features: ["Multi-layered grid look", "Front cornrows, back box", "Lasts 6 to 8 weeks", "Thick voluminous texture"],
    bookingId: "tribal-braids"
  },
  {
    id: "boho-goddess-braids",
    name: "Boho / Goddess Braids",
    price: 180,
    image: "/gallary/boho.jpeg", // Add image path here
    description: "Elegant single braids styled with soft, cascading wavy curls woven throughout. Gives you a highly textured, feminine, and lightweight appearance that is perfect for any special event or everyday wear.",
    features: ["Loose curly strands", "Soft feminine texture", "Lasts 6 to 8 weeks", "Lightweight box braids"],
    bookingId: "boho-goddess-braids"
  },
  {
    id: "french-curl-braids",
    name: "French Curl Braids",
    price: 180,
    image: "/gallary/french_curl.jpeg", // Add image path here
    description: "Knotless box braids utilizing premium pre-curled French curl extension hair, creating voluminous, bouncy spiral curl texture starting from the braid ends for a striking, high-fashion editorial look.",
    features: ["Bouncy spiral ends", "Pre-curled extensions", "Lasts 6 to 8 weeks", "High-end editorial look"],
    bookingId: "french-curl-braids"
  },
  {
    id: "cornrows",
    name: "Cornrows",
    price: 60,
    image: "/gallary/cornrows.jpeg", // Add image path here
    description: "Sleek, traditional scalp cornrow braids styled in straight backs or custom parting patterns. Built specifically as a low-tension protective foundation or an everyday low-maintenance styling alternative.",
    features: ["Classic straight back grid", "Low-tension installation", "Lasts 3 to 4 weeks", "Ideal protective base"],
    bookingId: "cornrows-standard"
  },
  {
    id: "twists",
    name: "Twists",
    price: 180,
    image: "/gallary/twist.jpeg", // Add image path here
    description: "Soft, coily two-strand twists using premium Passion, Senegalese, Spring, Marley, or Havana textured hair extensions. Offers a natural, voluminous protective layout with minimal scalp weight and stress.",
    features: ["Soft two-strand twists", "Textured natural look", "Lasts 6 to 8 weeks", "Lightweight scalp weight"],
    bookingId: "passion-twists"
  },
  {
    id: "loc-services",
    name: "Loc Services",
    price: 80,
    image: "/gallary/loc.jpeg", // Add image path here
    description: "Professional dreadlock cultivation and maintenance covering Starter Locs with integrated follow-ups, palm-rolled root retwists, specialized styling, and gentle care packages for kids' loc structures.",
    features: ["Starter coils & twists", "Palm-rolled root retwists", "Custom style upkeep", "Includes kids loc care"],
    bookingId: "loc-retwist"
  },
  {
    id: "sisterlocks",
    name: "Sisterlocks",
    price: 150,
    image: "/gallary/sister_lock.jpeg", // Add image path here
    description: "Official micro-interlocking natural hair locking system. Covers mandatory pre-installation grid consultations, symmetric micro-grid starter installations, and regular root retightening maintenance.",
    features: ["Micro-interlocking grid", "Installation & retightening", "Scalp health preservation", "Requires consultation"],
    bookingId: "sisterlocks-installation"
  },
  {
    id: "ponytails",
    name: "Ponytails",
    price: 80,
    image: "/gallary/ponytail.jpeg", // Add image path here
    description: "Sleek, gel-pressed ponytails combined with extended braids, stitch lines, Fulani cornrows, or bouncy goddess curls. Designed to stay fully secured, polished, and sleek for weeks with hair protection focus.",
    features: ["Sleek gel-pressed press", "Extended braid wrap", "Lasts 1 to 2 weeks", "Optional goddess curls"],
    bookingId: "sleek-ponytail"
  },
  {
    id: "sew-ins",
    name: "Sew-Ins",
    price: 150,
    image: "", // Add image path here
    description: "Flawless full-head track weave installations featuring basic natural leave-outs, protective closures, ear-to-ear frontals, or dynamic 360-degree lace wraps for complete styling flexibility.",
    features: ["Flat braid foundation", "Seamless closures/frontals", "Secure track sewing", "Natural-looking partings"],
    bookingId: "traditional-sewin"
  },
  {
    id: "braided-wigs",
    name: "Braided Wigs",
    price: 230,
    image: "", // Add image path here
    description: "Custom ordered, high-density fully braided wigs including cornrows, stitch lines, knotless, or tribal patterns. Offers the look of fresh salon braids with the convenience of a removable wig unit.",
    features: ["Custom ordered designs", "Lace frontal melting", "Protective grid base", "Re-wearable convenience"],
    bookingId: "cornrow-wig"
  },
  {
    id: "mens-braids",
    name: "Men's Braids",
    price: 65,
    image: "", // Add image path here
    description: "Tailored braiding designs styled specifically for men. Includes classic straight back cornrows, stitch braids, or geometric custom design parts constructed for long-lasting edge protection.",
    features: ["Tailored masculine styles", "Symmetric partings", "Stitch & design cornrows", "Edge-protective care"],
    bookingId: "mens-braids"
  },
  {
    id: "kids-braids",
    name: "Kids Braids",
    price: 75,
    image: "/gallary/kids_braids.jpeg", // Add image path here
    description: "Gentle natural hair designs, feed-in stitch cornrows, or lightweight knotless braids styled for children aged 4 to 10. Focuses on edge comfort, low-tension parts, and fun children designs.",
    features: ["Ages 4 to 10 focus", "Gentle no-tension grid", "Natural & stitch braids", "Edge-friendly styling"],
    bookingId: "kids-braids"
  },
  {
    id: "relaxer-services",
    name: "Relaxer Services",
    price: 60,
    image: "", // Add image path here
    description: "Premium chemical relaxer treatments covering root touch-ups, full head relaxers, split end trims, silk presses, and wrapping styles to achieve smooth, healthy, and high-shine hair results.",
    features: ["Chemical root touch-up", "Full relaxer styling", "Trim & Silk press bundles", "Healthy moisture wrap"],
    bookingId: "relaxer-services"
  },
  {
    id: "wig-installation",
    name: "Wig Installation",
    price: 100,
    image: "", // Add image path here
    description: "Flawless wig installations including custom lace bleaching, plucking, ear-to-ear frontal melting, closure installs, glueless attachments, deep washes, and custom hot-tool styling packages.",
    features: ["Frontal/Closure customization", "Lace melting & styling", "Glueless attachments", "Wash & restyle services"],
    bookingId: "wig-installation"
  }
];

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground scroll-smooth">
      <Navbar />

      <main className="flex-grow">
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
            <div className="space-y-20">
              {MAIN_SERVICES.map((srv, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <motion.div
                    key={srv.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 border-b border-border/40 pb-20 last:border-b-0 ${isEven ? "" : "lg:flex-row-reverse"
                      }`}
                  >
                    {/* Braid Image Container */}
                    <div className="w-full lg:w-1/2 relative flex justify-center">
                      <div className="absolute top-6 left-4 w-[90%] h-full bg-accent rounded-[2.5rem] -z-10"></div>

                      {srv.image ? (
                        <div className="relative w-full max-w-[440px] h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-[2.5rem] shadow-xl border-4 border-white dark:border-zinc-900 bg-background-alt">
                          <Image
                            src={srv.image}
                            alt={srv.name}
                            fill
                            className="object-cover"
                            sizes="(max-w-1024px) 100vw, 500px"
                          />
                        </div>
                      ) : (
                        <div className="relative w-full max-w-[440px] h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-[2.5rem] shadow-sm border-4 border-white dark:border-zinc-900 bg-accent/25 dark:bg-muted/10 flex flex-col items-center justify-center border-dashed border-2 border-border/60">
                          {/* Placeholder style icon and text */}
                          <div className="text-center p-6 space-y-2">
                            <Compass className="w-8 h-8 text-primary/30 mx-auto animate-pulse" />
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Style Preview</p>
                            <p className="text-[10px] text-muted-foreground/60">Portfolio update coming soon</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Braid Description details */}
                    <div className="w-full lg:w-1/2 text-left space-y-6">
                      <div className="space-y-3">
                        <h2 className="text-3xl font-serif font-bold text-foreground">{srv.name}</h2>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-4 items-center pt-1 text-sm font-semibold">
                          <span className="flex items-center gap-1 text-primary bg-primary/10 px-3 py-1 rounded-full">
                            Starts at ${srv.price}
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
                          <Link href={`/book?service=${srv.bookingId}`} className="flex items-center gap-2">
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
                    Arrive with your hair detangled thoroughly. An extra fee may apply if hair requires extensive comb-out detangling before we can begin braiding.
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

              <div className="pt-6 flex justify-center w-full">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-full px-8 py-5.5 font-bold shadow-md hover:shadow-lg transition-all cursor-pointer">
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
