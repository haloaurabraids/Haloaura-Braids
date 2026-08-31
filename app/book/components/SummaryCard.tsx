"use client";

import { format } from "date-fns";
import { ServiceItem, ServiceOption, LengthOption, AddonOption } from "../servicesData";

interface SummaryCardProps {
  selectedService: ServiceItem | null;
  selectedOption: ServiceOption | null;
  selectedLength: LengthOption;
  selectedAddons: AddonOption[];
  selectedDate: Date | undefined;
  selectedTime: string | null;
  calculatedTotal: { price: number; isStartingAt: boolean };
  setStep: (step: number) => void;
}

export function SummaryCard({
  selectedService,
  selectedOption,
  selectedLength,
  selectedAddons,
  selectedDate,
  selectedTime,
  calculatedTotal,
  setStep
}: SummaryCardProps) {
  return (
    <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-sm space-y-5 text-left">
      <h3 className="font-serif font-bold text-lg text-foreground border-b border-border/50 pb-3">Booking Summary</h3>
      
      {selectedService ? (
        <div className="space-y-4 text-xs sm:text-sm">
          
          {/* Selected service item details */}
          <div className="space-y-1">
            <div className="flex justify-between items-center border-b border-border/40 pb-1.5 mb-1.5">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Style Selection</span>
              <button onClick={() => setStep(1)} className="text-[10px] font-bold text-secondary hover:text-primary shrink-0 transition-colors">Edit</button>
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="font-bold text-foreground">{selectedService.name}</p>
                {selectedOption && (
                  <p className="text-xs text-muted-foreground font-semibold mt-0.5">{selectedService.optionsTitle || "Option"}: {selectedOption.name}</p>
                )}
              </div>
              <span className="text-xs font-semibold text-primary shrink-0">
                {selectedOption 
                  ? `${selectedOption.priceType === 'starting_at' ? 'Starting ' : ''}$${selectedOption.price}`
                  : selectedService.basePrice !== undefined 
                    ? `${selectedService.priceType === 'starting_at' ? 'Starting ' : ''}$${selectedService.basePrice}`
                    : ''}
              </span>
            </div>
          </div>

          {/* Selected length details */}
          {selectedService.lengthsAllowed && selectedLength.price > 0 && (
            <div className="space-y-1 border-t border-border/40 pt-3">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Length Modifier</span>
              <div className="flex justify-between items-center">
                <p className="font-semibold text-foreground">{selectedLength.name}</p>
                <span className="text-xs font-semibold text-primary">+${selectedLength.price}</span>
              </div>
            </div>
          )}

          {/* Selected addons details */}
          {selectedAddons.length > 0 && (
            <div className="space-y-1 border-t border-border/40 pt-3">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Add-ons Selected</span>
              <div className="space-y-1.5 mt-1">
                {selectedAddons.map(addon => (
                  <div key={addon.name} className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">{addon.name}</span>
                    <span className="font-semibold text-primary">
                      +{addon.priceRange ? `$${addon.priceRange}` : `$${addon.price}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schedule details */}
          {selectedDate && selectedTime && (
            <div className="space-y-1 border-t border-border/40 pt-3">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Schedule Time</span>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-foreground">{format(selectedDate, "MMM d, yyyy")}</p>
                  <p className="text-xs text-muted-foreground">
                    At {(() => {
                      const [h, m] = selectedTime.split(':');
                      const hour = parseInt(h);
                      const ampm = hour >= 12 ? 'PM' : 'AM';
                      const displayHour = hour % 12 || 12;
                      return `${displayHour}:${m} ${ampm}`;
                    })()}
                  </p>
                </div>
                <button onClick={() => setStep(3)} className="text-[10px] font-bold text-secondary hover:text-primary transition-colors">Edit</button>
              </div>
            </div>
          )}

          {/* Estimated total card section */}
          <div className="border-t border-border/80 pt-4 mt-2">
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-bold text-foreground">Estimated Total:</span>
              <span className="font-sans font-bold text-xl text-primary">
                {calculatedTotal.isStartingAt ? "Starting at " : ""}${calculatedTotal.price}
              </span>
            </div>
            {calculatedTotal.isStartingAt && (
              <p className="text-[9px] text-muted-foreground leading-normal mt-1">
                Final price may vary depending on length, density, customization, style complexity, and other requirements.
              </p>
            )}
          </div>

        </div>
      ) : (
        <div className="text-center py-10 text-xs text-muted-foreground">
          No style selected yet. Please select a braiding style to build summary.
        </div>
      )}
    </div>
  );
}
