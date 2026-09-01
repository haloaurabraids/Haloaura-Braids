"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Sabrina Chery",
    role: "Braids & Twist Braids",
    text: "Abee has been doing my hair since I moved to Worcester almost three years ago, and I have never been disappointed!",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Victoria",
    role: "Local Guide",
    text: "Amazing experience! Abigail was so patient with my 2 year old. He had such a struggle since it was his first time. If you or your child has white fine hair, I recommend Halo Aura—she is able to do any texture or ethnicity of hair. My son’s braids came out so nice!",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Jackson Penn",
    role: "Locs Client",
    text: "Best experience, best customer service, best service! She has been doing my locs since 2023 and I can tell you she is by far the best at what she does. Go girl! 💈🙌",
    rating: 5,
    date: "2 months ago"
  },
  {
    name: "Arnoldcho Fon",
    role: "Locs Client",
    text: "I am extremely satisfied with my locs. She took her time, paid attention to every detail, and made sure I was happy throughout the process. The results were beautiful and exceeded my expectations. Great customer service and excellent workmanship.",
    rating: 5,
    date: "2 months ago"
  },
  {
    name: "Queenette Asia",
    role: "Verified Client",
    text: "My hair came out very perfect !!!!! And she was friendly and welcoming. I’ll be returning back.",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Davine Kimondo",
    role: "Kids Hair Styling",
    text: "Thank you for being patient with my 5 year old. Your hands are gentle on kids' heads—she never complained of pain. She loved the breaks you kept giving her!",
    rating: 5,
    date: "2 months ago"
  },
  {
    name: "Abigail's Client",
    role: "Box Braids Client",
    text: "The service was fantastic and detailed. Abigail was very kind and attentive to my requests. I will definitely go back again and again. And the hair is so beautiful and top-notch!",
    rating: 5,
    date: "2 months ago"
  },
  {
    name: "Verified Client",
    role: "Hair Care Client",
    text: "I look soo good! Her customer service is top notch, she really pampered my hair. Loved the entire experience! 🤌🏽",
    rating: 5,
    date: "2 months ago"
  },
  {
    name: "Verified Client",
    role: "Family & Couples",
    text: "Went with my wife and her reception is amazing and she was fast, and my wife’s hair is soo amazing!",
    rating: 5,
    date: "2 months ago"
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
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === i ? "bg-primary w-6" : "bg-border hover:bg-muted-foreground/30 w-2.5"
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
