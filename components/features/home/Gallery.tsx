"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, X } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const GALLERY = [
  { src: "/gallary/knotless-braids.jpeg", title: "Knotless Braid Excellence" },
  { src: "/gallary/boho.jpeg", title: "Signature Boho Texture" },
  { src: "/gallary/butterfly.jpeg", title: "Butterfly Twists Craft" },
  { src: "/gallary/crochet.jpeg", title: "Premium Crochet Installation" },
  { src: "/gallary/freestyle-stitch-braid.jpeg", title: "Freestyle Stitch Braids" },
  { src: "/gallary/fulani-boho-braids.jpeg", title: "Fulani Boho Braids" },
  { src: "/gallary/sister_lock.jpeg", title: "Sister Lock Style" },
  { src: "/gallary/regular-braids.jpeg", title: "Traditional Symmetrical Braids" }
];

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Stagger variants for the image grid
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  // Single grid item fade & zoom entry
  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="gallery" className="py-12 md:py-16 bg-background-alt border-y border-border/60">
      <div className="container mx-auto px-4 md:px-6 text-center">
        
        {/* Header - Fades and slides up */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mx-auto space-y-3 mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            The Haloaura Lookbook
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Explore our portfolio of detailed braid patterns, close-up scalp partings, and client showcases. Click on any image to open in full screen.
          </p>
        </motion.div>

        {/* Masonry / Grid - Staggered scroll entrance */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {GALLERY.map((img, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              onClick={() => setLightboxIndex(idx)}
              className="relative aspect-[3/4] md:aspect-square overflow-hidden rounded-2xl cursor-pointer group shadow-sm border border-border/40"
            >
              <Image 
                src={img.src}
                alt={img.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-w-768px) 50vw, 250px"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                <span className="bg-white/95 text-foreground font-bold text-xs py-2 px-4 rounded-full shadow-md flex items-center gap-1 hover:scale-105 transition-transform">
                  <Sparkles className="w-3.5 h-3.5 text-primary" /> View Details
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* GALLERY LIGHTBOX DRAWER */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
          >
            {/* Close trigger backdrop */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setLightboxIndex(null)}></div>
            
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur transition-all cursor-pointer focus:outline-none"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <Image 
                src={GALLERY[lightboxIndex].src}
                alt={GALLERY[lightboxIndex].title}
                fill
                className="object-cover"
                sizes="(max-w-1024px) 100vw, 800px"
              />
              {/* Image title caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white text-left">
                <h4 className="font-serif font-bold text-lg">{GALLERY[lightboxIndex].title}</h4>
                <p className="text-xs text-zinc-300 mt-1">Haloaura Signature Lookbook Portfolio</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
