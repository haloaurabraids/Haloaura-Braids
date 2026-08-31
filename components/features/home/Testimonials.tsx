"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Aaliyah Jackson",
    role: "Regular Client",
    text: "Haloaura is the only salon I trust with my hair. The knotless braids are incredibly neat, and my scalp never hurts after. Truly a premium experience!",
    rating: 5,
    date: "2 weeks ago"
  },
  {
    name: "Elena Rostova",
    role: "First-time Client",
    text: "The details on my Boho braids are flawless! I received so many compliments on Instagram. The environment is extremely clean, warm, and professional.",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Kiara Vance",
    role: "Regular Client",
    text: "Beautiful results and amazing hair care. The stylists are fast, highly skilled, and they actually care about the health of your edges.",
    rating: 5,
    date: "3 days ago"
  },
  {
    name: "Maya Thornton",
    role: "Regular Client",
    text: "I've been coming to Haloaura for stitch braids. The parting is razor-sharp and the tension is perfect. Scalp hydration treatment is a game-changer!",
    rating: 5,
    date: "3 weeks ago"
  },
  {
    name: "Sarah Jenkins",
    role: "First-time Client",
    text: "Booked Boho Knotless braids and they are gorgeous. Very lightweight, clean studio, and parking was validated. 10/10 service!",
    rating: 5,
    date: "2 months ago"
  },
  {
    name: "Amara Okafor",
    role: "Loyal Client",
    text: "They are the absolute queens of protective styling. My natural hair has grown so much since I started coming here. Edge protection is real.",
    rating: 5,
    date: "5 days ago"
  },
  {
    name: "Jessica Miller",
    role: "Regular Client",
    text: "Fulani braids are stunning! The transition from scalp braids to box braids in the back is flawless. Best salon in Atlanta.",
    rating: 5,
    date: "4 weeks ago"
  },
  {
    name: "Nadia Belov",
    role: "First-time Client",
    text: "The booking process through Stripe was seamless, and the styling menu is so detailed. Arrived, sat down, got coffee, and left glowing.",
    rating: 5,
    date: "1 week ago"
  },
  {
    name: "Zuri Williams",
    role: "Loyal Client",
    text: "I travel 45 minutes just to get braided by Haloaura. The precision of the grid lines is unmatched. Highly professional and warm team.",
    rating: 5,
    date: "6 days ago"
  },
  {
    name: "Tasha Smith",
    role: "Regular Client",
    text: "Excellent customer service and very punctual styling. The box braids are super clean and painless. My go-to hair salon in ATL!",
    rating: 5,
    date: "4 days ago"
  }
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  // Handle responsive visible card counts
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2); // Tablet
      } else {
        setVisibleCount(4); // Desktop - 4 cards at a time!
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper to chunk testimonials list into slides
  const chunkTestimonials = (list: typeof TESTIMONIALS, size: number) => {
    const chunks = [];
    for (let i = 0; i < list.length; i += size) {
      const chunk = list.slice(i, i + size);
      // Loop back to fill the last slide if it has fewer cards than the required size
      if (chunk.length < size) {
        const remainder = size - chunk.length;
        chunk.push(...list.slice(0, remainder));
      }
      chunks.push(chunk);
    }
    return chunks;
  };

  const pages = chunkTestimonials(TESTIMONIALS, visibleCount);

  // Auto-swipe timer: transitions every 8 seconds (8000ms)
  useEffect(() => {
    setActiveIndex(0); // Reset position when screen layout changes
  }, [visibleCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % pages.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [pages.length]);

  return (
    <section id="reviews" className="py-12 md:py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 text-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mx-auto space-y-3 mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Loved By Our Clients
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Hear from the beautiful women who choose Haloaura Braids for their protective styling and confidence boost.
          </p>
        </motion.div>

        {/* Carousel Outer Wrapper */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="relative w-full mx-auto"
        >
          {/* Inner Slide Track Window */}
          <div className="overflow-hidden w-full py-4">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${activeIndex * (100 / pages.length)}%)`,
                width: `${pages.length * 100}%` 
              }}
            >
              {pages.map((page, pageIdx) => (
                <div 
                  key={pageIdx}
                  style={{ width: `${100 / pages.length}%` }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-1 flex-shrink-0"
                >
                  {page.map((t, idx) => (
                    <div 
                      key={idx}
                      className="bg-card border border-border/80 p-6 rounded-3xl text-left space-y-4 shadow-sm hover:shadow-md hover:bg-primary/5 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    >
                      <div className="space-y-3">
                        {/* Stars */}
                        <div className="flex gap-1">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary group-hover:scale-110 transition-transform duration-300" />
                          ))}
                        </div>
                        <p className="text-xs text-foreground leading-relaxed italic">
                          "{t.text}"
                        </p>
                      </div>
                      
                      {/* User profile row */}
                      <div className="flex justify-between items-center pt-4 border-t border-border/40 mt-4">
                        <div>
                          <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">{t.name}</h4>
                          <p className="text-[10px] text-muted-foreground">{t.role}</p>
                        </div>
                        <span className="text-[9px] text-muted-foreground uppercase">{t.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Navigation Controls (Dots Only) */}
        <div className="flex justify-center items-center mt-6">
          <div className="flex gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i ? "bg-primary w-6" : "bg-border hover:bg-muted-foreground/30 w-2.5"
                }`}
                aria-label={`Go to testimonial page ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
