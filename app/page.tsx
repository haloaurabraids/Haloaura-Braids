import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/features/home/Hero";
import { TrustStrip } from "@/components/features/home/TrustStrip";
import { About } from "@/components/features/home/About";
import { Services } from "@/components/features/home/Services";
import { FeaturedStyle } from "@/components/features/home/FeaturedStyle";
import { Gallery } from "@/components/features/home/Gallery";
import { WhyChooseUs } from "@/components/features/home/WhyChooseUs";
import { Process } from "@/components/features/home/Process";
import { Testimonials } from "@/components/features/home/Testimonials";
import { InstagramStrip } from "@/components/features/home/InstagramStrip";
import { BookingCTA } from "@/components/features/home/BookingCTA";
import { Faq } from "@/components/features/home/Faq";
import { Footer } from "@/components/features/home/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground scroll-smooth">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <About />
        <Services />
        <FeaturedStyle />
        <Gallery />
        <WhyChooseUs />
        <Process />
        <Testimonials />
        <InstagramStrip />
        <Faq />
        <BookingCTA />
      </main>
      <Footer />
    </div>
  );
}
