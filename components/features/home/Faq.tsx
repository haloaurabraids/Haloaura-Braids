"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const FAQS = [
  {
    question: "How do I book an appointment?",
    answer: "You can book easily online by clicking any 'Book Now' button on this site. Select your preferred style, date, and time, input your contact details, and complete your reservation via our secure Stripe integration."
  },
  {
    question: "How should I prepare for my braiding appointment?",
    answer: "Please arrive with your hair freshly washed, completely detangled, and blown dry from roots to ends. Avoid adding any heavy oils, greases, or heavy leave-in conditioners, as our stylists will use premium, lightweight formulas tailored to your scalp."
  },
  {
    question: "Do you provide the braiding hair?",
    answer: "By default, we ask clients to bring their own preferred braiding hair to match their desired color and length, or you can purchase high-quality hair directly at our studio. If you have custom extensions or color requests, please leave a note in your booking."
  },
  {
    question: "How long does a braiding appointment take?",
    answer: "Appointment durations vary widely depending on the chosen style. Basic cornrows take about 1.5 to 2 hours, while mid-back knotless braids or box braids typically take between 4 to 5 hours. Check each service card for estimated times."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We require a 24-hour notice for all cancellations or rescheduling requests. Cancellations made less than 24 hours before the appointment slot will forfeit their booking deposit."
  },
  {
    question: "Can I request a custom style not listed?",
    answer: "Yes, absolutely! Select the 'Custom Braiding' service when booking, and describe your desired look in the details section. You can also bring inspiration photos to your appointment."
  }
];

export function Faq() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Stagger variants for the accordion items
  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  // Single accordion item entry
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="faq" className="py-12 md:py-16 bg-background-alt border-y border-border/60">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        
        {/* Header - Fades and slides up */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-3 mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* Staggered Accordion List */}
        <motion.div 
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          {FAQS.map((faq, idx) => {
            const isSelected = activeFaq === idx;
            return (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="border border-border rounded-2xl bg-card overflow-hidden transition-shadow shadow-sm hover:shadow-md"
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-serif font-bold text-foreground text-base sm:text-lg cursor-pointer hover:text-primary transition-colors focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isSelected ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-muted-foreground"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
