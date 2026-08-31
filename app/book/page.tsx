"use client";

import { useState, useEffect, Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Footer } from "@/components/features/home/Footer";

// Modular Imports
import { SERVICES, LENGTH_OPTIONS, ADDON_OPTIONS, ServiceItem, ServiceOption, LengthOption, AddonOption } from "./servicesData";
import { ServiceStep } from "./components/ServiceStep";
import { OptionsStep } from "./components/OptionsStep";
import { DateTimeStep } from "./components/DateTimeStep";
import { DetailsStep } from "./components/DetailsStep";
import { ConfirmStep } from "./components/ConfirmStep";
import { SummaryCard } from "./components/SummaryCard";
import { MobileSummaryBar } from "./components/MobileSummaryBar";

function BookingWizard() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedOption, setSelectedOption] = useState<ServiceOption | null>(null);
  const [selectedLength, setSelectedLength] = useState<LengthOption>(LENGTH_OPTIONS[0]);
  const [selectedAddons, setSelectedAddons] = useState<AddonOption[]>([]);
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Category selection for Step 1
  const [activeCategory, setActiveCategory] = useState<string>("braids");
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");

  // Pre-select service from URL parameter
  useEffect(() => {
    if (serviceParam) {
      const match = SERVICES.find(s => s.id === serviceParam);
      if (match) {
        setSelectedService(match);
        setSelectedOption(match.options && match.options.length > 0 ? match.options[0] : null);
        setActiveCategory(match.category);
        setStep(2); // Auto-jump to options
      }
    }
  }, [serviceParam]);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
    instagram: ""
  });

  useEffect(() => {
    if (step === 3 && selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [step, selectedDate]);

  const fetchAvailableSlots = async (date: Date) => {
    setLoadingSlots(true);
    setSelectedTime(null);
    try {
      const dateStr = format(date, "yyyy-MM-dd");
      const res = await fetch(`/api/public/availability?date=${dateStr}`);
      const json = await res.json();
      if (json.success) {
        setAvailableSlots(json.availableSlots);
      }
    } catch (error) {
      toast.error("Failed to fetch available times.");
    } finally {
      setLoadingSlots(false);
    }
  };

  const calculateTotal = () => {
    let price = 0;
    let isStartingAt = false;

    if (!selectedService) return { price, isStartingAt };

    // 1. Base / Size price
    if (selectedService.options && selectedOption) {
      price += selectedOption.price;
      if (selectedOption.priceType === "starting_at" || selectedService.priceType === "starting_at") {
        isStartingAt = true;
      }
    } else if (selectedService.basePrice !== undefined) {
      price += selectedService.basePrice;
      if (selectedService.priceType === "starting_at") {
        isStartingAt = true;
      }
    }

    // 2. Length modifier
    if (selectedService.lengthsAllowed && selectedLength) {
      price += selectedLength.price;
    }

    // 3. Add-ons
    selectedAddons.forEach(addon => {
      price += addon.price;
      if (addon.priceRange) {
        isStartingAt = true;
      }
    });

    return { price, isStartingAt };
  };

  const handleNext = () => {
    if (step === 1) {
      if (!selectedService) {
        toast.error("Please select a service before continuing.");
        return;
      }
      if (selectedService.options && !selectedOption) {
        setSelectedOption(selectedService.options[0]);
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!selectedDate) {
        toast.error("Please select an appointment date.");
        return;
      }
      if (!selectedTime) {
        toast.error("Please select an available time.");
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (!formData.firstName || !formData.lastName) {
        toast.error("Please enter your full name.");
        return;
      }
      if (!formData.email || !formData.email.includes("@")) {
        toast.error("Please enter a valid email address.");
        return;
      }
      if (!formData.phone) {
        toast.error("Please enter your phone number.");
        return;
      }
      setStep(5);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const calculated = calculateTotal();
      const finalPrice = calculated.price;

      const serviceNameLabel = `${selectedService.name}${selectedOption ? ` - ${selectedOption.name}` : ''}${selectedLength && selectedLength.price > 0 ? ` (${selectedLength.name})` : ''}`;

      const res = await fetch("/api/public/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: {
            id: selectedService.id,
            name: serviceNameLabel,
            price: finalPrice,
          },
          date: dateStr,
          startTime: selectedTime,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          notes: `${formData.notes}${formData.instagram ? ` | IG: ${formData.instagram}` : ''}${selectedAddons.length > 0 ? ` | Addons: ${selectedAddons.map(a => a.name).join(', ')}` : ''}`
        })
      });

      const json = await res.json();
      if (json.success && json.clientSecret) {
        router.push(`/book/payment/${json.data.id}?clientSecret=${json.clientSecret}`);
      } else {
        throw new Error(json.error || "Failed to confirm booking.");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to confirm booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAddon = (addon: AddonOption) => {
    if (selectedAddons.find(a => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter(a => a.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const stepsList = [
    { id: 1, name: "Service" },
    { id: 2, name: "Options" },
    { id: 3, name: "Date & Time" },
    { id: 4, name: "Details" },
    { id: 5, name: "Confirm" }
  ];

  const filteredServices = SERVICES.filter(s => {
    const matchesCategory = s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const calculatedTotal = calculateTotal();

  const tabContentVariants: Variants = {
    hidden: { opacity: 0, x: 15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -15, transition: { duration: 0.2 } }
  };

  return (
    <div className="w-full max-w-7xl px-4 md:px-6">
      
      {/* Page Title & Description Header */}
      <div className="w-full max-w-3xl mx-auto text-center mb-10 mt-2 space-y-2">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
          Book Your Appointment
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Select your premium braiding or hair styling service, customize styling options, and secure your session date.
        </p>
      </div>

      {/* Step Progress Indicators */}
      <div className="w-full max-w-5xl mx-auto mb-10">
        {/* Desktop Stepper */}
        <div className="hidden md:flex items-center justify-between relative px-4">
          {/* Stepper progress track wrapper (runs center-to-center of first & last circles) */}
          <div className="absolute left-[34px] right-[34px] top-[18px] h-[2px] -z-10">
            <div className="w-full h-full bg-border/80 relative">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-primary transition-all duration-500 ease-in-out"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              ></motion.div>
            </div>
          </div>
          {stepsList.map(s => (
            <div key={s.id} className="flex flex-col items-center gap-2 relative z-10">
              <button
                disabled={s.id > step}
                onClick={() => {
                  if (selectedService) setStep(s.id);
                }}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  step === s.id 
                    ? "bg-primary text-white scale-110 shadow-md ring-2 ring-primary ring-offset-2 dark:ring-offset-zinc-950" 
                    : step > s.id 
                      ? "bg-card text-primary border-2 border-primary/60 cursor-pointer shadow-sm" 
                      : "bg-card text-muted-foreground border border-border cursor-not-allowed"
                }`}
              >
                {step > s.id ? <Check className="w-4 h-4" /> : `0${s.id}`}
              </button>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${step === s.id ? "text-primary" : "text-muted-foreground"}`}>{s.name}</span>
            </div>
          ))}
        </div>

        {/* Mobile Stepper Progress Bar */}
        <div className="block md:hidden space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <span>Step {step} of 5</span>
            <span className="text-primary">{stepsList[step-1].name}</span>
          </div>
          <div className="w-full h-1.5 bg-border/60 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out rounded-full" 
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Collapsible Summary Bar */}
      <MobileSummaryBar
        selectedService={selectedService}
        selectedOption={selectedOption}
        selectedLength={selectedLength}
        selectedAddons={selectedAddons}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        calculatedTotal={calculatedTotal}
      />

      {/* Main Grid: Forms Left, Summary Card Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Steps wrapper */}
        <div className="lg:col-span-8 bg-card border border-border/80 rounded-3xl shadow-sm p-6 sm:p-10 min-h-[520px] flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <ServiceStep
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                filteredServices={filteredServices}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                setSelectedOption={setSelectedOption}
                handleNext={handleNext}
                tabContentVariants={tabContentVariants}
              />
            )}

            {step === 2 && selectedService && (
              <OptionsStep
                selectedService={selectedService}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                selectedLength={selectedLength}
                setSelectedLength={setSelectedLength}
                selectedAddons={selectedAddons}
                toggleAddon={toggleAddon}
                handleBack={handleBack}
                handleNext={handleNext}
                tabContentVariants={tabContentVariants}
              />
            )}

            {step === 3 && selectedService && (
              <DateTimeStep
                selectedService={selectedService}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                loadingSlots={loadingSlots}
                availableSlots={availableSlots}
                handleBack={handleBack}
                handleNext={handleNext}
                tabContentVariants={tabContentVariants}
              />
            )}

            {step === 4 && selectedService && (
              <DetailsStep
                formData={formData}
                setFormData={setFormData}
                handleBack={handleBack}
                handleNext={handleNext}
                tabContentVariants={tabContentVariants}
              />
            )}

            {step === 5 && selectedService && (
              <ConfirmStep
                selectedService={selectedService}
                selectedOption={selectedOption}
                selectedLength={selectedLength}
                selectedAddons={selectedAddons}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                formData={formData}
                setStep={setStep}
                handleBack={handleBack}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                tabContentVariants={tabContentVariants}
              />
            )}

          </AnimatePresence>
        </div>

        {/* Right Column: Sticky Summary Card (Desktop only) */}
        <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <SummaryCard
            selectedService={selectedService}
            selectedOption={selectedOption}
            selectedLength={selectedLength}
            selectedAddons={selectedAddons}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            calculatedTotal={calculatedTotal}
            setStep={setStep}
          />
        </div>

      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow py-8 flex items-center justify-center">
        <Suspense fallback={
          <div className="flex items-center justify-center p-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        }>
          <BookingWizard />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
