"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/features/home/Footer";
import { MapPin, Phone, Mail, Clock, Sparkles, Compass } from "lucide-react";
import { Instagram, Facebook } from "@/components/ui/social-icons";
import { motion, Variants } from "framer-motion";

export default function ContactPage() {
  // Framer Motion Animation Variants with explicit Types to resolve IDE validation errors
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
    hover: {
      y: -8,
      scale: 1.015,
      boxShadow: "0 20px 40px rgba(217, 70, 122, 0.08)",
      borderColor: "rgba(217, 70, 122, 0.4)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background-alt text-foreground scroll-smooth">
      <Navbar />
      
      <main className="flex-1 overflow-x-hidden">
        {/* Contact Page Header */}
        <section className="relative pt-10 pb-4 bg-background-alt overflow-hidden">
          <div className="absolute right-0 top-1/4 w-80 h-80 bg-primary/10 rounded-full filter blur-[100px] pointer-events-none"></div>
          <div className="absolute left-0 bottom-0 w-60 h-60 bg-secondary/10 rounded-full filter blur-[80px] pointer-events-none"></div>
          
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl space-y-3 relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Get In Touch
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight leading-none"
            >
              Contact <span className="text-primary italic font-serif">Haloaura</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
            >
              Have questions about our premium styles, custom braiding options, or scheduling private boutique sessions? Visit our Florida studio.
            </motion.p>
          </div>
        </section>

        {/* Contact Cards Section */}
        <section className="pt-8 pb-12 bg-background-alt relative">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Email Card */}
              <motion.a 
                href="mailto:hello@haloaura.com"
                variants={cardVariants}
                whileHover="hover"
                className="group bg-accent/40 dark:bg-muted/20 border border-border/80 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm relative overflow-hidden transition-colors duration-300 w-full"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl translate-x-4 -translate-y-4"></div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-xl mb-2 text-foreground">Email Us</h3>
                <p className="text-sm font-semibold text-primary mb-1">hello@haloaura.com</p>
                <p className="text-xs text-muted-foreground max-w-[320px] mt-2 leading-relaxed">
                  Drop us a line anytime. We respond within 24 business hours.
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-secondary hover:text-primary transition-colors">
                  Send Email <Mail className="w-3 h-3" />
                </span>
              </motion.a>

              {/* Phone Card */}
              <motion.a 
                href="tel:+19545550199"
                variants={cardVariants}
                whileHover="hover"
                className="group bg-accent/40 dark:bg-muted/20 border border-border/80 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm relative overflow-hidden transition-colors duration-300 w-full"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl translate-x-4 -translate-y-4"></div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-xl mb-2 text-foreground">Call Us</h3>
                <p className="text-sm font-semibold text-primary mb-1">+1 (954) 555-0199</p>
                <p className="text-xs text-muted-foreground max-w-[320px] mt-2 leading-relaxed">
                  Mon – Sat: 9:00 AM – 5:00 PM EST. Sunday Closed.
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-secondary hover:text-primary transition-colors">
                  Call Now <Phone className="w-3 h-3" />
                </span>
              </motion.a>

              {/* Location Card */}
              <motion.a 
                href="https://maps.google.com/?q=100+E+Las+Olas+Blvd,+Fort+Lauderdale,+FL+33301"
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                whileHover="hover"
                className="group bg-accent/40 dark:bg-muted/20 border border-border/80 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm relative overflow-hidden transition-colors duration-300 w-full"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl translate-x-4 -translate-y-4"></div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-xl mb-2 text-foreground">Visit Studio</h3>
                <p className="text-sm font-semibold text-primary mb-1">Las Olas District</p>
                <p className="text-xs text-muted-foreground max-w-[320px] mt-2 leading-relaxed">
                  100 E Las Olas Blvd, Suite 1400<br />
                  Fort Lauderdale, FL 33301
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-secondary hover:text-primary transition-colors">
                  Get Directions <Compass className="w-3 h-3" />
                </span>
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Live Location Full Width Section */}
        <section className="py-12 bg-background-alt border-t border-border/40 relative">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="space-y-6 mb-8 text-center md:text-left">
              <h2 className="text-3xl font-serif font-bold text-foreground">Our Location</h2>
              <p className="text-sm text-muted-foreground max-w-lg">
                Find us inside the signature Las Olas Business Tower. Centrally located with secure parking validation provided for clients.
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative w-full h-[350px] md:h-[550px] rounded-3xl overflow-hidden border border-border/80 shadow-md bg-card"
            >
              {/* Map Iframe */}
              <iframe 
                title="Haloaura Florida Boutique Location Map"
                src="https://maps.google.com/maps?q=100%20E%20Las%20Olas%20Blvd,%20Fort%20Lauderdale,%20FL%2033301&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
