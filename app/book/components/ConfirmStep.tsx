"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ServiceItem, ServiceOption, LengthOption, AddonOption } from "../servicesData";

interface ConfirmStepProps {
  selectedService: ServiceItem;
  selectedOption: ServiceOption | null;
  selectedLength: LengthOption;
  selectedAddons: AddonOption[];
  selectedDate: Date | undefined;
  selectedTime: string | null;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes: string;
    instagram: string;
  };
  setStep: (step: number) => void;
  handleBack: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  tabContentVariants: Variants;
}

export function ConfirmStep({
  selectedService,
  selectedOption,
  selectedLength,
  selectedAddons,
  selectedDate,
  selectedTime,
  formData,
  setStep,
  handleBack,
  handleSubmit,
  isSubmitting,
  tabContentVariants
}: ConfirmStepProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <motion.div
      key="step-confirm"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col h-full space-y-6 text-left"
    >
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full hover:bg-background border border-border/60 w-9 h-9 flex items-center justify-center cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground">Verify Your Appointment</h2>
          <p className="text-xs text-muted-foreground">Review your booking selections and confirm to complete payment checkout.</p>
        </div>
      </div>

      {/* Confirmation Summary Card */}
      <div className="flex-grow pr-1 space-y-4">

        {/* Style Details */}
        <div className="border border-border/80 rounded-2xl p-5 bg-background/50 space-y-3">
          <div className="flex justify-between items-center border-b border-border/40 pb-2">
            <h4 className="font-serif font-bold text-sm text-primary uppercase tracking-wider">Style Selection</h4>
            <button onClick={() => setStep(1)} className="text-[10px] font-bold text-secondary hover:text-primary transition-colors">Edit</button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
            <div>
              <span className="text-muted-foreground">Service Name:</span>
              <p className="font-bold text-foreground mt-0.5">{selectedService.name}</p>
            </div>
            {selectedOption && (
              <div>
                <span className="text-muted-foreground">{selectedService.optionsTitle || "Option"}:</span>
                <p className="font-bold text-foreground mt-0.5">{selectedOption.name}</p>
              </div>
            )}
            {selectedService.lengthsAllowed && (
              <div>
                <span className="text-muted-foreground">Braid Length:</span>
                <p className="font-bold text-foreground mt-0.5">{selectedLength.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Addons summary */}
        {selectedAddons.length > 0 && (
          <div className="border border-border/80 rounded-2xl p-5 bg-background/50 space-y-2">
            <div className="flex justify-between items-center border-b border-border/40 pb-2">
              <h4 className="font-serif font-bold text-sm text-primary uppercase tracking-wider">Add-ons</h4>
              <button onClick={() => setStep(2)} className="text-[10px] font-bold text-secondary hover:text-primary transition-colors">Edit</button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedAddons.map(addon => (
                <span key={addon.name} className="bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  {addon.name} (+${addon.priceRange || addon.price})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Appointment timing summary */}
        <div className="border border-border/80 rounded-2xl p-5 bg-background/50 space-y-3">
          <div className="flex justify-between items-center border-b border-border/40 pb-2">
            <h4 className="font-serif font-bold text-sm text-primary uppercase tracking-wider">Schedule</h4>
            <button onClick={() => setStep(3)} className="text-[10px] font-bold text-secondary hover:text-primary transition-colors">Edit</button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
            <div>
              <span className="text-muted-foreground">Date:</span>
              <p className="font-bold text-foreground mt-0.5">{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "-"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Time Slot:</span>
              <p className="font-bold text-foreground mt-0.5">
                {selectedTime ? (() => {
                  const [h, m] = selectedTime.split(':');
                  const hour = parseInt(h);
                  const ampm = hour >= 12 ? 'PM' : 'AM';
                  const displayHour = hour % 12 || 12;
                  return `${displayHour}:${m} ${ampm}`;
                })() : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="border border-border/80 rounded-2xl p-5 bg-background/50 space-y-3">
          <div className="flex justify-between items-center border-b border-border/40 pb-2">
            <h4 className="font-serif font-bold text-sm text-primary uppercase tracking-wider">Contact Info</h4>
            <button onClick={() => setStep(4)} className="text-[10px] font-bold text-secondary hover:text-primary transition-colors">Edit</button>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <span className="text-muted-foreground">Full Name:</span>
              <p className="font-bold text-foreground mt-0.5">{formData.firstName} {formData.lastName}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Phone:</span>
              <p className="font-bold text-foreground mt-0.5">{formData.phone}</p>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Email Address:</span>
              <p className="font-bold text-foreground mt-0.5 break-all">{formData.email}</p>
            </div>
            {formData.instagram && (
              <div className="col-span-2">
                <span className="text-muted-foreground">Instagram:</span>
                <p className="font-bold text-foreground mt-0.5">{formData.instagram}</p>
              </div>
            )}
            {formData.notes && (
              <div className="col-span-2">
                <span className="text-muted-foreground">Notes / Special Requests:</span>
                <p className="font-medium text-foreground/90 text-xs leading-relaxed mt-1 whitespace-pre-line bg-background/30 p-3 rounded-lg border border-border/40">{formData.notes}</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Booking and Deposit Policy Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4.5 space-y-3 text-xs leading-relaxed text-left mt-4">
        <h4 className="font-serif font-bold text-sm text-primary uppercase tracking-wider border-b border-primary/10 pb-1.5">Booking & Deposit Policies</h4>

        <div className="space-y-2 text-muted-foreground">
          <p>
            <strong className="text-foreground">1. </strong> To secure and lock in your scheduled appointment slot, all clients are required to make a <strong className="text-primary font-semibold">$30 non-refundable deposit</strong> online today. This deposit will be credited toward your total service cost.
          </p>
          <p>
            <strong className="text-foreground">2. </strong> The final service price may be adjusted (higher or lower) based on hair length, density, style customization, and overall complexity. Your stylist will discuss and finalize this after analyzing your hair upon salon arrival.
          </p>
          <p>
            <strong className="text-foreground">3. </strong> The remaining service balance (total price minus the $30 deposit) is due and payable in person at the salon at the time of your appointment.
          </p>
        </div>
      </div>

      {/* Agreement Checkbox */}
      <div className="flex items-start gap-3 text-left mt-4 bg-background/50 border border-border/60 rounded-xl p-3.5">
        <input
          id="policy-agree"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="w-4 h-4 rounded border-border text-primary focus:ring-primary mt-0.5 cursor-pointer accent-primary shrink-0"
        />
        <label htmlFor="policy-agree" className="text-xs text-muted-foreground select-none cursor-pointer leading-normal">
          I agree to the <span className="text-foreground font-semibold">booking, deposit validation, and cancellation policies</span>
        </label>
      </div>

      {/* Submit Button & Policies */}
      <div className="pt-6 border-t border-border/60 space-y-4 w-full">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !agreed}
          className="w-full cursor-pointer rounded-full py-6 bg-primary text-primary-foreground hover:bg-primary-dark font-bold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span>Creating Stripe Checkout Session...</span>
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          ) : (
            <>
              <span>Pay $30 Deposit & Secure Booking</span>
              <CheckCircle2 className="w-4 h-4" />
            </>
          )}
        </Button>
        <p className="text-[10px] text-muted-foreground text-center max-w-sm mx-auto leading-normal">
          By confirming, you agree to Haloaura Braids' booking, deposit validation, and cancellation policies.
        </p>
      </div>
    </motion.div>
  );
}
