"use client";

import { motion, Variants } from "framer-motion";
import { Search, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceItem, ServiceOption } from "../servicesData";

interface ServiceStepProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  filteredServices: ServiceItem[];
  selectedService: ServiceItem | null;
  setSelectedService: (service: ServiceItem) => void;
  setSelectedOption: (option: ServiceOption | null) => void;
  handleNext: () => void;
  tabContentVariants: Variants;
}

export function ServiceStep({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  filteredServices,
  selectedService,
  setSelectedService,
  setSelectedOption,
  handleNext,
  tabContentVariants
}: ServiceStepProps) {
  const categories = [
    { id: "braids", name: "Braids" },
    { id: "twists", name: "Twists" },
    { id: "locs", name: "Locs" },
    { id: "sisterlocks", name: "Sisterlocks" },
    { id: "ponytails", name: "Ponytails" },
    { id: "sewins", name: "Sew-Ins" },
    { id: "wigs", name: "Wigs" },
    { id: "other", name: "Other" }
  ];

  return (
    <motion.div
      key="step-service"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col h-full space-y-6"
    >
      <div className="space-y-1.5 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">What service are you booking?</h2>
        <p className="text-xs text-muted-foreground">Select one of our premium beauty & braiding styling services below.</p>
      </div>

      {/* Search box & Dropdown Category Tabs */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search braiding styles, locs, installs..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground/50 transition-all"
          />
        </div>

        {/* Horizontal Scrollable Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-border/60">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSearchQuery("");
              }}
              className={`cursor-pointer whitespace-nowrap px-4.5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat.id 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "bg-background border border-border text-muted-foreground hover:border-primary/20 hover:text-primary"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow pr-1">
          {filteredServices.map(service => {
            const isSelected = selectedService?.id === service.id;
            return (
              <div
                key={service.id}
                onClick={() => {
                  setSelectedService(service);
                  setSelectedOption(service.options ? service.options[0] : null);
                }}
                className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between group hover:shadow-md ${
                  isSelected 
                    ? "border-primary bg-accent/40 shadow-sm" 
                    : "border-border bg-background hover:border-primary/30 shadow-sm"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-serif font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    {service.consultationRequired && (
                      <span className="bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                        Consultation Req.
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/40 flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">
                    {service.options 
                      ? `From $${Math.min(...service.options.map(o => o.price))}` 
                      : service.basePrice === 0 
                        ? "Free" 
                        : `${service.priceType === 'starting_at' ? 'Starting at ' : ''}$${service.basePrice}`
                    }
                  </span>
                  {isSelected && (
                    <span className="text-primary font-bold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border rounded-2xl text-center space-y-2 bg-background/30">
          <p className="text-foreground font-semibold">No services found</p>
          <p className="text-xs text-muted-foreground">Try adjusting your category filter or search queries.</p>
        </div>
      )}

      {/* Footer Controls */}
      <div className="pt-6 border-t border-border/60 flex items-center justify-between">
        <a href="/services" className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Browse Services Catalog
        </a>
        <Button
          onClick={handleNext}
          disabled={!selectedService}
          className="cursor-pointer rounded-full px-8 py-5.5 bg-primary text-primary-foreground hover:bg-primary-dark font-bold shadow-md hover:shadow-lg transition-all"
        >
          Continue <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </motion.div>
  );
}
