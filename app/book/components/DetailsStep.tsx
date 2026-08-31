"use client";

import { motion, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DetailsStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes: string;
    instagram: string;
  };
  setFormData: (data: any) => void;
  handleBack: () => void;
  handleNext: () => void;
  tabContentVariants: Variants;
}

export function DetailsStep({
  formData,
  setFormData,
  handleBack,
  handleNext,
  tabContentVariants
}: DetailsStepProps) {
  return (
    <motion.div
      key="step-details"
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
          <h2 className="text-2xl font-serif font-bold text-foreground">Tell Us About You</h2>
          <p className="text-xs text-muted-foreground">Please fill out your contact details to help us arrange your slot booking.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow pr-1 pb-4 text-left">
        <div className="space-y-1.5">
          <Label htmlFor="firstName" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">First Name *</Label>
          <Input 
            id="firstName" 
            required 
            value={formData.firstName} 
            onChange={e => setFormData({...formData, firstName: e.target.value})} 
            className="bg-background border-border rounded-xl focus-visible:ring-primary py-5 text-sm" 
            placeholder="Aaliyah"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Last Name *</Label>
          <Input 
            id="lastName" 
            required 
            value={formData.lastName} 
            onChange={e => setFormData({...formData, lastName: e.target.value})} 
            className="bg-background border-border rounded-xl focus-visible:ring-primary py-5 text-sm" 
            placeholder="Jackson"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Email Address *</Label>
          <Input 
            id="email" 
            type="email" 
            required 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            className="bg-background border-border rounded-xl focus-visible:ring-primary py-5 text-sm" 
            placeholder="aaliyah@example.com"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Phone Number *</Label>
          <Input 
            id="phone" 
            type="tel" 
            required 
            value={formData.phone} 
            onChange={e => setFormData({...formData, phone: e.target.value})} 
            className="bg-background border-border rounded-xl focus-visible:ring-primary py-5 text-sm" 
            placeholder="(954) 555-0199"
          />
        </div>
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="instagram" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Instagram Handle (Optional)</Label>
          <Input 
            id="instagram" 
            value={formData.instagram} 
            onChange={e => setFormData({...formData, instagram: e.target.value})} 
            className="bg-background border-border rounded-xl focus-visible:ring-primary py-5 text-sm" 
            placeholder="@aaliyah_hair"
          />
        </div>
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="notes" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Special Requests / Notes (Optional)</Label>
          <Textarea 
            id="notes" 
            value={formData.notes} 
            onChange={e => setFormData({...formData, notes: e.target.value})} 
            className="bg-background border-border rounded-xl resize-none focus-visible:ring-primary text-sm" 
            rows={2} 
            placeholder="Specify if you are bringing extensions, request a specific color, or have scheduling issues..."
          />
        </div>
      </div>

      {/* Footer Controls */}
      <div className="pt-6 border-t border-border/60 flex justify-end">
        <Button
          onClick={handleNext}
          className="cursor-pointer rounded-full px-8 py-5.5 bg-primary text-primary-foreground hover:bg-primary-dark font-bold shadow-md hover:shadow-lg transition-all"
        >
          Confirm Summary Card <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </motion.div>
  );
}
