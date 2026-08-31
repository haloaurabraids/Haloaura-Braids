"use client";

import { motion, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, AlertCircle, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ServiceItem, ServiceOption, LengthOption, AddonOption, LENGTH_OPTIONS, ADDON_OPTIONS } from "../servicesData";

interface OptionsStepProps {
  selectedService: ServiceItem;
  selectedOption: ServiceOption | null;
  setSelectedOption: (opt: ServiceOption) => void;
  selectedLength: LengthOption;
  setSelectedLength: (len: LengthOption) => void;
  selectedAddons: AddonOption[];
  toggleAddon: (addon: AddonOption) => void;
  handleBack: () => void;
  handleNext: () => void;
  tabContentVariants: Variants;
}

export function OptionsStep({
  selectedService,
  selectedOption,
  setSelectedOption,
  selectedLength,
  setSelectedLength,
  selectedAddons,
  toggleAddon,
  handleBack,
  handleNext,
  tabContentVariants
}: OptionsStepProps) {
  return (
    <motion.div
      key="step-options"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col h-full space-y-6"
    >
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full hover:bg-background border border-border/60 w-9 h-9 flex items-center justify-center cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="text-left">
          <h2 className="text-2xl font-serif font-bold text-foreground">Customize Style Options</h2>
          <p className="text-xs text-muted-foreground">Configure the pricing options, size, and add-ons for {selectedService.name}.</p>
        </div>
      </div>

      <div className="space-y-6 flex-grow pr-1">
        
        {/* Informational Consultation Notice */}
        {selectedService.consultationRequired && (
          <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex gap-3 text-left">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-amber-800 uppercase tracking-wider">Required consultation</h4>
              <p className="text-xs text-amber-700/90 mt-1 leading-relaxed">
                Sisterlocks Consultation is required prior to booking installation. We will analyze your scalp during this session.
              </p>
            </div>
          </div>
        )}

        {/* Informational note for locs/frontal installs */}
        {selectedService.infoNote && (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex gap-3 text-left">
            <Sparkle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              {selectedService.infoNote}
            </p>
          </div>
        )}

        {/* Options Selector (Sizes/Braid Count) */}
        {selectedService.options && (
          <div className="space-y-2.5 text-left">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {selectedService.optionsTitle || "Select Option"}
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedService.options.map(opt => {
                const isSelected = selectedOption?.name === opt.name;
                return (
                  <div
                    key={opt.name}
                    onClick={() => setSelectedOption(opt)}
                    className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex items-center justify-between ${
                      isSelected 
                        ? "border-primary bg-accent/40 shadow-sm" 
                        : "border-border bg-background hover:border-primary/20"
                    }`}
                  >
                    <span className="text-xs font-bold text-foreground">{opt.name}</span>
                    <span className="text-xs font-bold text-primary">
                      {opt.price === 0 
                        ? "Free" 
                        : `${opt.priceType === 'starting_at' ? 'Starting ' : ''}$${opt.price}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Length Add-on */}
        {selectedService.lengthsAllowed && (
          <div className="space-y-2.5 text-left">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Braiding Length</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {LENGTH_OPTIONS.map(len => {
                const isSelected = selectedLength.name === len.name;
                return (
                  <div
                    key={len.name}
                    onClick={() => setSelectedLength(len)}
                    className={`cursor-pointer rounded-xl p-3 border-2 transition-all text-center flex flex-col gap-1.5 ${
                      isSelected 
                        ? "border-primary bg-accent/40 shadow-sm" 
                        : "border-border bg-background hover:border-primary/20"
                    }`}
                  >
                    <span className="text-[10px] font-bold text-foreground uppercase tracking-wide leading-none">{len.name.replace(" Length", "")}</span>
                    <span className="text-xs font-bold text-primary">
                      {len.price === 0 ? "Standard" : `+$${len.price}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* General Add-Ons */}
        <div className="space-y-3 text-left">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Available Styling Add-ons</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ADDON_OPTIONS.filter(addon => {
              // Filter out Wig Customization unless booking wigs
              if (addon.onlyForWigs) {
                return selectedService.category === "wigs" || selectedService.id === "wig-installation";
              }
              return true;
            }).map(addon => {
              const isChecked = !!selectedAddons.find(a => a.name === addon.name);
              return (
                <div
                  key={addon.name}
                  onClick={() => toggleAddon(addon)}
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex items-center justify-between ${
                    isChecked 
                      ? "border-primary bg-accent/40 shadow-sm" 
                      : "border-border bg-background hover:border-primary/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center ${isChecked ? "bg-primary border-primary text-white" : "border-border"}`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                    </div>
                    <span className="text-xs font-semibold text-foreground">{addon.name}</span>
                  </div>
                  <span className="text-xs font-bold text-primary">
                    {addon.priceRange ? `+$${addon.priceRange}` : `+$${addon.price}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Footer Controls */}
      <div className="pt-6 border-t border-border/60 flex justify-end">
        <Button
          onClick={handleNext}
          className="cursor-pointer rounded-full px-8 py-5.5 bg-primary text-primary-foreground hover:bg-primary-dark font-bold shadow-md hover:shadow-lg transition-all"
        >
          Select Appointment Date <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </motion.div>
  );
}
