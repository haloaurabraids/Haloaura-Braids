"use client";

import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ServiceItem, ServiceOption, LengthOption, AddonOption } from "../servicesData";

interface MobileSummaryBarProps {
  selectedService: ServiceItem | null;
  selectedOption: ServiceOption | null;
  selectedLength: LengthOption;
  selectedAddons: AddonOption[];
  selectedDate: Date | undefined;
  selectedTime: string | null;
  calculatedTotal: { price: number; isStartingAt: boolean };
}

export function MobileSummaryBar({
  selectedService,
  selectedOption,
  selectedLength,
  selectedAddons,
  selectedDate,
  selectedTime,
  calculatedTotal
}: MobileSummaryBarProps) {
  return (
    <div className="lg:hidden w-full bg-card border border-border/80 rounded-3xl p-5 mb-6 shadow-sm">
      <details className="group">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Estimated Total</span>
            <span className="font-sans font-bold text-base sm:text-lg text-primary mt-0.5 leading-none">
              {calculatedTotal.isStartingAt ? "Starting at " : ""}${calculatedTotal.price}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-secondary">
            <span className="group-open:hidden flex items-center gap-1">
              View Details <ChevronDown className="w-3.5 h-3.5" />
            </span>
            <span className="hidden group-open:flex items-center gap-1">
              Hide Details <ChevronUp className="w-3.5 h-3.5" />
            </span>
          </div>
        </summary>
        
        <div className="border-t border-border/40 mt-3 pt-3 text-xs space-y-3.5 text-left">
          {selectedService ? (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Style Selection:</span>
                <span className="font-bold text-foreground">{selectedService.name}</span>
              </div>
              {selectedOption && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{selectedService.optionsTitle || "Option"}:</span>
                  <span className="font-semibold text-foreground">{selectedOption.name}</span>
                </div>
              )}
              <div className="flex justify-between pt-1 border-t border-border/10">
                <span className="text-muted-foreground">Base Price:</span>
                <span className="font-semibold text-primary">
                  {selectedOption 
                    ? `${selectedOption.priceType === 'starting_at' ? 'Starting ' : ''}$${selectedOption.price}`
                    : selectedService.basePrice !== undefined 
                      ? `${selectedService.priceType === 'starting_at' ? 'Starting ' : ''}$${selectedService.basePrice}`
                      : ''}
                </span>
              </div>
              {selectedService.lengthsAllowed && selectedLength.price > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Length Modifier:</span>
                  <span className="font-semibold text-primary">+{selectedLength.name} (+${selectedLength.price})</span>
                </div>
              )}
              {selectedAddons.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-muted-foreground block">Add-ons:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedAddons.map(a => (
                      <span key={a.name} className="bg-primary/10 text-primary text-[9px] font-semibold px-2 py-0.5 rounded-full">
                        {a.name} (+${a.priceRange || a.price})
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedDate && selectedTime && (
                <div className="flex justify-between pt-1.5 border-t border-border/20">
                  <span className="text-muted-foreground">Schedule:</span>
                  <span className="font-semibold text-foreground">
                    {format(selectedDate, "MMM d, yyyy")} at {(() => {
                      const [h, m] = selectedTime.split(':');
                      const hour = parseInt(h);
                      const ampm = hour >= 12 ? 'PM' : 'AM';
                      const displayHour = hour % 12 || 12;
                      return `${displayHour}:${m} ${ampm}`;
                    })()}
                  </span>
                </div>
              )}
            </>
          ) : (
            <p className="text-muted-foreground text-center">No style selected yet. Select a style to view details.</p>
          )}
        </div>
      </details>
    </div>
  );
}
