"use client";

import { useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { Navbar } from "@/components/layout/Navbar";
import { ShieldCheck } from "lucide-react";
import { use } from "react";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("clientSecret");

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#D9467A',
      colorBackground: '#ffffff',
      colorText: '#241D20',
      colorDanger: '#ef4444',
      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '12px',
    },
  };

  if (!clientSecret) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto flex items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">Invalid Payment Session</h2>
            <p className="text-muted-foreground mt-2">Please go back and try booking again.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 flex flex-col items-center justify-center">
        
        <div className="w-full max-w-xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif font-bold tracking-tight text-foreground">Complete Your Payment</h1>
            <p className="text-muted-foreground mt-2">Secure checkout powered by Stripe</p>
          </div>

          <div className="bg-card rounded-[2.5rem] shadow-xl border border-border p-6 md:p-10 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary-dark"></div>
            
            <div className="flex items-center justify-center mb-8 text-primary">
              <ShieldCheck className="w-12 h-12" />
            </div>

            {clientSecret && (
              <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
                <PaymentForm bookingId={resolvedParams.bookingId} clientSecret={clientSecret} />
              </Elements>
            )}
            
            <div className="mt-8 text-center text-xs text-zinc-400 flex flex-col items-center gap-2">
               <p>We accept all major credit cards, Apple Pay, and Google Pay.</p>
               <div className="flex gap-2 opacity-50 grayscale">
                  {/* Just some visual indicators */}
                  <div className="w-10 h-6 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                  <div className="w-10 h-6 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                  <div className="w-10 h-6 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
