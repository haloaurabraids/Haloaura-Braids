import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-900 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-12">
          
          {/* Col 1 Brand - Expanded Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold flex items-center gap-1.5">
              Haloaura <span className="text-primary">Braids</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
              Premium modern braiding salon specializing in protective styling, clean parting grids, and lightweight extensions. Experience high-end hair design and leave looking beautiful, feeling confident, and glowing with your own signature crown.
            </p>
          </div>

          {/* Col 2 Quick Links - Home, Services, Contact, Gallery */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary">Quick Links</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><Link href="/#home" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/#gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Col 3 Services - Exactly 4 Styles */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary">Services</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><Link href="/book?service=knotless-braids" className="hover:text-primary transition-colors">Knotless Braids</Link></li>
              <li><Link href="/book?service=box-braids" className="hover:text-primary transition-colors">Box Braids</Link></li>
              <li><Link href="/book?service=cornrows" className="hover:text-primary transition-colors">Cornrows</Link></li>
              <li><Link href="/book?service=boho-braids" className="hover:text-primary transition-colors">Boho Braids</Link></li>
            </ul>
          </div>

          {/* Col 4 Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary">Contact</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-primary" /> 12 R winter street Worcester MA 01604</li>
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-primary" /> +1 (508) 665-3209</li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-primary" /> contact@haloaurabraids.com</li>
            </ul>
          </div>

        </div>

        {/* Copyright - Centered, Privacy/Terms Removed */}
        <div className="border-t border-zinc-900 pt-8 text-center text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Haloaura Braids. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
