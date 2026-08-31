"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, Sparkles, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "border-b border-border/80 bg-background/90 backdrop-blur-md shadow-sm py-3" 
          : "border-b border-transparent bg-background/50 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
            Haloaura <span className="text-primary">Braids</span>
            <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-muted-foreground hover:text-primary transition-colors duration-200 relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-full px-6 py-5 text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
            <Link href="/book">
              Book Now
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-full px-4 text-xs font-bold shadow-sm cursor-pointer">
            <Link href="/book">
              Book
            </Link>
          </Button>

          {/* shadcn UI Sheet for Mobile Drawer */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full text-foreground hover:bg-muted/80 cursor-pointer flex items-center justify-center"
                aria-label="Toggle Menu"
              >
                <Menu className="w-5.5 h-5.5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-6 bg-background border-l border-border/80 flex flex-col h-full z-50">
              <SheetHeader className="text-left border-b border-border/10 pb-5 shrink-0">
                <SheetTitle className="flex items-center gap-2 text-foreground">
                  <span className="font-serif font-bold text-lg sm:text-xl">
                    Haloaura <span className="text-primary">Braids</span>
                  </span>
                  <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
                </SheetTitle>
                <SheetDescription className="text-xs pt-1.5 text-muted-foreground">
                  Premium modern protective braiding styles.
                </SheetDescription>
              </SheetHeader>

              {/* Drawer Links */}
              <div className="flex-1 flex flex-col gap-2.5 py-6 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between text-base font-bold px-2.5 py-2 rounded-lg transition-all cursor-pointer text-foreground/90 hover:bg-muted hover:text-primary"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </Link>
                ))}
              </div>

              {/* Drawer Book Button */}
              <div className="flex flex-col gap-4 pt-4 border-t border-border/10 shrink-0 mt-auto">
                <Link href="/book" onClick={() => setIsOpen(false)}>
                  <Button
                    className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-bold py-5 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
