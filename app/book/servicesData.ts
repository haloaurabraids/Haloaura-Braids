export interface ServiceOption {
  name: string;
  price: number;
  priceType?: "fixed" | "starting_at";
  infoNote?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  category: "braids" | "twists" | "locs" | "sisterlocks" | "ponytails" | "sewins" | "wigs" | "other";
  priceType: "fixed" | "starting_at";
  basePrice?: number;
  optionsTitle?: string;
  options?: ServiceOption[];
  lengthsAllowed?: boolean;
  consultationRequired?: boolean;
  infoNote?: string;
}

export interface LengthOption {
  name: string;
  price: number;
}

export interface AddonOption {
  name: string;
  price: number;
  priceRange?: string;
  onlyForWigs?: boolean;
}

// ------------------------------------------
// SERVICES CATALOG CONFIGURATION
// ------------------------------------------
export const SERVICES: ServiceItem[] = [
  // --- KNOTLESS BRAIDS ---
  {
    id: "knotless-braids",
    name: "Knotless Braids",
    description: "Premium tension-free box braids beginning with natural hair for a flat, lightweight finish.",
    category: "braids",
    priceType: "fixed",
    optionsTitle: "Select Size & Pricing",
    options: [
      { name: "Large Size", price: 150 },
      { name: "Medium Size", price: 180 },
      { name: "Small Size", price: 230 },
      { name: "Extra Small Size", price: 280 }
    ],
    lengthsAllowed: true
  },
  {
    id: "boho-knotless-braids",
    name: "Boho Knotless Braids",
    description: "Knotless braiding styled with wavy human hair curls throughout the length for a bohemian aesthetic.",
    category: "braids",
    priceType: "fixed",
    optionsTitle: "Select Size & Pricing",
    options: [
      { name: "Large Size", price: 190 },
      { name: "Medium Size", price: 230 },
      { name: "Small Size", price: 270 },
      { name: "Extra Small Size", price: 300 }
    ],
    lengthsAllowed: true
  },
  {
    id: "boho-goddess-braids",
    name: "Boho / Goddess Braids",
    description: "Elegant goddess braiding patterns featuring single braids combined with curly strands.",
    category: "braids",
    priceType: "fixed",
    optionsTitle: "Select Size & Pricing",
    options: [
      { name: "Large Size", price: 180 },
      { name: "Medium Size", price: 220 },
      { name: "Small Size", price: 260 },
      { name: "Extra Small Size", price: 300 }
    ],
    lengthsAllowed: true
  },
  {
    id: "french-curl-braids",
    name: "French Curl Braids",
    description: "Breathtaking knotless braids utilizing pre-curled French curl braiding hair extensions.",
    category: "braids",
    priceType: "fixed",
    optionsTitle: "Select Size & Pricing",
    options: [
      { name: "Large Size", price: 180 },
      { name: "Medium Size", price: 220 },
      { name: "Small Size", price: 260 },
      { name: "Extra Small Size", price: 300 }
    ],
    lengthsAllowed: true
  },

  // --- STITCH BRAIDS ---
  {
    id: "stitch-braids-attachments",
    name: "Stitch Braids (With Attachment)",
    description: "Sleek stitch-line feed-in cornrows braided with hair extensions for added length and thickness.",
    category: "braids",
    priceType: "fixed",
    optionsTitle: "Select Braid Count",
    options: [
      { name: "2 Stitch Braids", price: 70 },
      { name: "4 Stitch Braids", price: 90 },
      { name: "6 Stitch Braids", price: 120 },
      { name: "8 Stitch Braids", price: 140 },
      { name: "10 Stitch Braids", price: 150 },
      { name: "Freestyle Stitch Braids", price: 180, priceType: "starting_at" }
    ]
  },
  {
    id: "stitch-braids-natural",
    name: "Stitch Braids (Natural Hair)",
    description: "Clean stitch-line cornrow braids using only your natural hair. No attachments.",
    category: "braids",
    priceType: "fixed",
    optionsTitle: "Select Braid Count",
    options: [
      { name: "2 Stitch Braids", price: 45 },
      { name: "4 Stitch Braids", price: 60 },
      { name: "6 Stitch Braids", price: 75 },
      { name: "8 Stitch Braids", price: 90 },
      { name: "10 Stitch Braids", price: 100 },
      { name: "Freestyle Stitch Braids", price: 120, priceType: "starting_at" }
    ]
  },

  // --- LEMONADE & TRIBAL ---
  {
    id: "lemonade-braids",
    name: "Lemonade Braids",
    description: "Side-swept feeding cornrows with flat layout roots styled beautifully to one side.",
    category: "braids",
    priceType: "fixed",
    optionsTitle: "Select Size & Pricing",
    options: [
      { name: "Large Size", price: 140 },
      { name: "Medium Size", price: 180 },
      { name: "Small Size", price: 210 },
      { name: "Extra Small Size", price: 260 }
    ],
    lengthsAllowed: true
  },
  {
    id: "fulani-braids",
    name: "Fulani Braids",
    description: "Traditional styling featuring center part cornrows with box braids in the back.",
    category: "braids",
    priceType: "fixed",
    optionsTitle: "Select Size & Pricing",
    options: [
      { name: "Large Size", price: 160 },
      { name: "Medium Size", price: 200 },
      { name: "Small Size", price: 240 },
      { name: "Extra Small Size", price: 280 }
    ],
    lengthsAllowed: true
  },
  {
    id: "tribal-braids",
    name: "Tribal Braids",
    description: "Multi-layered styling featuring cornrows in the front and classic box braids in the back.",
    category: "braids",
    priceType: "fixed",
    optionsTitle: "Select Size & Pricing",
    options: [
      { name: "Large Size", price: 170 },
      { name: "Medium Size", price: 210 },
      { name: "Small Size", price: 250 },
      { name: "Extra Small Size", price: 290 }
    ],
    lengthsAllowed: true
  },
  {
    id: "cornrows-standard",
    name: "Standard Cornrows",
    description: "Sleek straight back scalp protective cornrows styled in various layouts.",
    category: "braids",
    priceType: "fixed",
    optionsTitle: "Select Braid Count",
    options: [
      { name: "2 Braids", price: 60 },
      { name: "4 Braids", price: 75 },
      { name: "6–8 Braids", price: 90 },
      { name: "10–12 Braids", price: 100 },
      { name: "Freestyle Cornrows", price: 130, priceType: "starting_at" }
    ]
  },

  // --- TWISTS ---
  {
    id: "passion-twists",
    name: "Passion Twists",
    description: "Fluffy, bohemian-style two-strand twists using water wave extension hair for texture.",
    category: "twists",
    priceType: "starting_at",
    basePrice: 190,
    lengthsAllowed: true
  },
  {
    id: "senegalese-twists",
    name: "Senegalese Twists",
    description: "Clean rope twists using high-quality synthetic braiding extensions for a sleek finish.",
    category: "twists",
    priceType: "starting_at",
    basePrice: 180,
    lengthsAllowed: true
  },
  {
    id: "spring-twists",
    name: "Spring Twists",
    description: "Lightweight, springy coily twists using pre-separated bouncy curl extensions.",
    category: "twists",
    priceType: "starting_at",
    basePrice: 190
  },
  {
    id: "marley-twists",
    name: "Marley Twists",
    description: "Classic textured twists utilizing puffy Marley extension hair.",
    category: "twists",
    priceType: "starting_at",
    basePrice: 200,
    lengthsAllowed: true
  },
  {
    id: "havana-twists",
    name: "Havana Twists",
    description: "Voluminous, thick, double-strand twists styling using Havana extension hair.",
    category: "twists",
    priceType: "starting_at",
    basePrice: 200,
    lengthsAllowed: true
  },

  // --- LOCS SERVICES ---
  {
    id: "starter-locs",
    name: "Starter Locs",
    description: "Initial locks installment styled via comb coils or two-strand twists. Includes 2 follow-up appointments.",
    category: "locs",
    priceType: "starting_at",
    basePrice: 250
  },
  {
    id: "loc-retwist",
    name: "Loc Retwist",
    description: "Root palm-rolling, tightening, and moisturizing maintenance upkeep for existing locs.",
    category: "locs",
    priceType: "starting_at",
    basePrice: 80
  },
  {
    id: "loc-retwist-style",
    name: "Loc Retwist + Style",
    description: "Root retightening palm-rolling combined with custom styling (barrels, two-strands, braids).",
    category: "locs",
    priceType: "starting_at",
    basePrice: 100
  },
  {
    id: "kids-starter-locs",
    name: "Kids Starter Locs",
    description: "Gentle dreadlock starter coils or twists layout for kids.",
    category: "locs",
    priceType: "starting_at",
    basePrice: 150
  },
  {
    id: "kids-loc-retwist",
    name: "Kids Loc Retwist",
    description: "Gentle palm-rolling root maintenance retwist styling for kids.",
    category: "locs",
    priceType: "starting_at",
    basePrice: 60
  },
  {
    id: "faux-locs",
    name: "Faux Locs",
    description: "Temporary dreadlock styling extensions wrapped over braided roots for a realistic texture.",
    category: "locs",
    priceType: "starting_at",
    basePrice: 190,
    lengthsAllowed: true
  },
  {
    id: "soft-locs",
    name: "Soft Locs",
    description: "Super soft, flexible crochet dreadlock extensions wrapped individually for a natural feel.",
    category: "locs",
    priceType: "starting_at",
    basePrice: 180,
    lengthsAllowed: true
  },
  {
    id: "butterfly-locs",
    name: "Butterfly Locs",
    description: "Distressed dreadlock styling wrapped loosely to create characteristic curly loops.",
    category: "locs",
    priceType: "starting_at",
    basePrice: 200,
    lengthsAllowed: true
  },

  // --- SISTERLOCKS ---
  {
    id: "sisterlocks-consultation",
    name: "Sisterlocks Consultation",
    description: "Mandatory scalp and hair analysis prior to installation.",
    category: "sisterlocks",
    priceType: "fixed",
    basePrice: 50,
    consultationRequired: true
  },
  {
    id: "sisterlocks-installation",
    name: "Sisterlocks Starter Installation",
    description: "Complete Sisterlocks loc grid locking session using the official interlocking tool.",
    category: "sisterlocks",
    priceType: "starting_at",
    basePrice: 350,
    infoNote: "Official Sisterlocks Installation requires a completed Consultation first. The initial base price of $350 covers starter installation. Final pricing depends on length, grid layout, and hair texture."
  },
  {
    id: "sisterlocks-retightening",
    name: "Sisterlocks Retightening",
    description: "Regular interlocking root maintenance session.",
    category: "sisterlocks",
    priceType: "starting_at",
    basePrice: 150
  },

  // --- PONYTAILS ---
  {
    id: "sleek-ponytail",
    name: "Sleek Ponytail",
    description: "Gel-pressed slick ponytail styling.",
    category: "ponytails",
    priceType: "fixed",
    basePrice: 80
  },
  {
    id: "braided-ponytail",
    name: "Braided Ponytail",
    description: "Sleek slicked base styled into an extended braided extension wrap.",
    category: "ponytails",
    priceType: "fixed",
    basePrice: 90
  },
  {
    id: "stitch-braided-ponytail",
    name: "Stitch Braided Ponytail",
    description: "Sleek stitch braided lines drawn up to an extension ponytail wrap.",
    category: "ponytails",
    priceType: "fixed",
    basePrice: 100
  },
  {
    id: "fulani-ponytail",
    name: "Fulani Ponytail",
    description: "Intricate Fulani cornrow braids styled up to a high ponytail wrap.",
    category: "ponytails",
    priceType: "fixed",
    basePrice: 120
  },
  {
    id: "goddess-ponytail",
    name: "Goddess Ponytail",
    description: "Sleek wrap combined with beautiful wavy goddess curls throughout.",
    category: "ponytails",
    priceType: "fixed",
    basePrice: 130
  },

  // --- SEW-INS ---
  {
    id: "traditional-sewin",
    name: "Basic Sew-In (Leave Out)",
    description: "Full track weave sew-in installation leaving a portion of natural hair exposed at the top.",
    category: "sewins",
    priceType: "fixed",
    basePrice: 150
  },
  {
    id: "closure-sewin",
    name: "Closure Sew-In",
    description: "Full protection sew-in utilizing a lace closure block to seal the top.",
    category: "sewins",
    priceType: "fixed",
    basePrice: 175
  },
  {
    id: "frontal-sewin",
    name: "Frontal Sew-In",
    description: "Lace frontal sew-in extending ear-to-ear for a seamless, natural hairline.",
    category: "sewins",
    priceType: "fixed",
    basePrice: 210
  },
  {
    id: "360-frontal-sewin",
    name: "360 Frontal Sew-In",
    description: "360-degree lace frontal installation allowing styling into high buns and ponytails.",
    category: "sewins",
    priceType: "fixed",
    basePrice: 240
  },

  // --- WIGS ---
  {
    id: "cornrow-wig",
    name: "Cornrow Wig",
    description: "Custom ordered fully braided scalp cornrows wig.",
    category: "wigs",
    priceType: "starting_at",
    basePrice: 230
  },
  {
    id: "stitch-braids-wig",
    name: "Stitch Braids Wig",
    description: "Clean stitch patterns braided wig.",
    category: "wigs",
    priceType: "starting_at",
    basePrice: 280
  },
  {
    id: "knotless-wig",
    name: "Knotless Wig",
    description: "Custom lightweight knotless braided styling wig.",
    category: "wigs",
    priceType: "starting_at",
    basePrice: 280
  },
  {
    id: "boho-knotless-wig",
    name: "Boho Knotless Wig",
    description: "Voluminous curly strands mixed with knotless braids wig.",
    category: "wigs",
    priceType: "starting_at",
    basePrice: 330
  },
  {
    id: "fulani-wig",
    name: "Fulani Wig",
    description: "Cornrow pattern front with braids back styling wig.",
    category: "wigs",
    priceType: "starting_at",
    basePrice: 300
  },
  {
    id: "tribal-wig",
    name: "Tribal Wig",
    description: "Multi-layered tribal patterns custom wig.",
    category: "wigs",
    priceType: "starting_at",
    basePrice: 310
  },

  // --- OTHER / DYNAMIC ---
  {
    id: "mens-braids",
    name: "Men's Braids",
    description: "Cornrows, stitch braids, or custom design parts for men.",
    category: "other",
    priceType: "starting_at",
    optionsTitle: "Select Braiding Type",
    options: [
      { name: "Straight Back Cornrows", price: 65, priceType: "starting_at" },
      { name: "Stitch Braids", price: 75, priceType: "starting_at" },
      { name: "Design Braids", price: 90, priceType: "starting_at" }
    ]
  },
  {
    id: "kids-braids",
    name: "Kids Braids",
    description: "Braiding protective styles tailored for kids aged 4 to 10.",
    category: "other",
    priceType: "starting_at",
    optionsTitle: "Select Braiding Type",
    options: [
      { name: "Natural Braids", price: 75, priceType: "starting_at" },
      { name: "Stitch Braids", price: 85, priceType: "starting_at" },
      { name: "Knotless Braids", price: 130, priceType: "starting_at" }
    ]
  },
  {
    id: "relaxer-services",
    name: "Relaxer Services",
    description: "Premium chemical relaxer and style treatment options.",
    category: "other",
    priceType: "fixed",
    optionsTitle: "Select Treatment Type",
    options: [
      { name: "Relaxer Touch-Up", price: 60 },
      { name: "Full Relaxer", price: 75 },
      { name: "Relaxer + Trim", price: 90 },
      { name: "Relaxer + Silk Press", price: 110 },
      { name: "Relaxer + Style", price: 120, priceType: "starting_at" }
    ]
  },
  {
    id: "wig-installation",
    name: "Wig Installation",
    description: "Professional lace melting, customization, installs, and styling services.",
    category: "other",
    priceType: "starting_at",
    optionsTitle: "Select Installation Type",
    options: [
      { name: "Basic Wig Install", price: 100 },
      { name: "Wig Install + Leave-Out", price: 110 },
      { name: "Closure Wig Install", price: 120 },
      { name: "Frontal Wig Install", price: 150, priceType: "starting_at", infoNote: "Frontal installations start at $150. Final pricing may vary depending on customization, density, melting, styling, repairs, and overall complexity." },
      { name: "Glueless Wig Install", price: 100 },
      { name: "Wig Install + Styling", price: 130, priceType: "starting_at" },
      { name: "Wig Wash & Restyle", price: 60, priceType: "starting_at" }
    ]
  }
];

export const LENGTH_OPTIONS: LengthOption[] = [
  { name: "Standard Length", price: 0 },
  { name: "Waist Length", price: 20 },
  { name: "Hip Length", price: 40 },
  { name: "Thigh Length", price: 60 }
];

export const ADDON_OPTIONS: AddonOption[] = [
  { name: "Shampoo", price: 20 },
  { name: "Blow-Dry", price: 20 },
  { name: "Shampoo + Blow-Dry", price: 35 },
  { name: "Beads", price: 10 },
  { name: "Curled Ends", price: 15 },
  { name: "Extra Small Parts", price: 30, priceRange: "30–50" },
  { name: "Deep Conditioning Treatment", price: 20 },
  { name: "Trim", price: 15 },
  { name: "Wig Customization", price: 30, priceRange: "30–50", onlyForWigs: true }
];
