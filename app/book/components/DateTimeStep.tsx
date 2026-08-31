"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ServiceItem } from "../servicesData";

interface DateTimeStepProps {
  selectedService: ServiceItem;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  loadingSlots: boolean;
  availableSlots: string[];
  handleBack: () => void;
  handleNext: () => void;
  tabContentVariants: Variants;
}

export function DateTimeStep({
  selectedService,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  loadingSlots,
  availableSlots,
  handleBack,
  handleNext,
  tabContentVariants
}: DateTimeStepProps) {
  return (
    <motion.div
      key="step-datetime"
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
          <h2 className="text-2xl font-serif font-bold text-foreground">Choose Date & Time</h2>
          <p className="text-xs text-muted-foreground">Select your appointment date and choose an available morning or afternoon time slot.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-stretch flex-grow pr-1">
        
        {/* Calendar Widget */}
        <div className="flex-1 flex justify-center w-full">
          <div className="border border-border rounded-2xl p-4 bg-accent/50 dark:bg-muted/30 shadow-inner h-fit w-full max-w-sm flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => { if(date) setSelectedDate(date) }}
              disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
              className="rounded-md w-full bg-transparent"
              style={{ "--cell-size": "42px" } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Time Slots Grid */}
        <div className="flex-1 flex flex-col text-left">
          <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-muted-foreground border-b border-border/45 pb-2 mb-3">Available Times</h3>
          {loadingSlots ? (
            <div className="flex-grow flex items-center justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : availableSlots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {availableSlots.map(time => {
                const isSelected = selectedTime === time;
                const [h, m] = time.split(':');
                const hour = parseInt(h);
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const displayHour = hour % 12 || 12;
                const displayTime = `${displayHour}:${m} ${ampm}`;

                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`cursor-pointer py-3 rounded-xl text-xs font-semibold transition-all transform active:scale-95 ${
                      isSelected 
                        ? "bg-primary text-white shadow-md ring-1 ring-primary ring-offset-2 dark:ring-offset-zinc-950" 
                        : "bg-background border border-border text-foreground hover:border-primary/40 hover:shadow-sm"
                    }`}
                  >
                    {displayTime}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border rounded-2xl bg-background-alt">
              <AlertCircle className="w-6 h-6 text-muted-foreground mb-2" />
              <p className="text-xs text-foreground font-semibold">No available slots for this date.</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Please try select another date.</p>
            </div>
          )}
        </div>

      </div>

      {/* Footer Controls */}
      <div className="pt-6 border-t border-border/60 flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!selectedTime}
          className="cursor-pointer rounded-full px-8 py-5.5 bg-primary text-primary-foreground hover:bg-primary-dark font-bold shadow-md hover:shadow-lg transition-all"
        >
          Enter Contact Details <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </motion.div>
  );
}
