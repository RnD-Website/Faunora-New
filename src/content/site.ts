/**
 * All site copy lives here so it can be edited in one place.
 * NOTE: every statistic and trial figure below is a PLACEHOLDER.
 * Replace with verified Faunora data and real sources before launch.
 */

export const site = {
  name: "Faunora",
  tagline: "Nutrition, reimagined for every animal",
  description:
    "Faunora makes vet-formulated, micro-encapsulated nutrition supplements for pets, livestock and poultry — so more of every dose reaches the animal.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@faunora.com",
  phone: "+880 1700-000000",
  linkedin: "https://www.linkedin.com/",
  instagram: "https://www.instagram.com/",
  footerTagline: "nourish the wild in every animal",
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  short: string;
  image: string;
  imageAlt: string;
  accent: "peach" | "teal" | "orange";
  intro: string;
  benefits: { title: string; body: string }[];
  forAnimals: string[];
  format: string;
};

export const products: Product[] = [
  {
    slug: "companion",
    name: "Faunora Companion™",
    category: "Pet supplements",
    short: "Daily soft chews for dogs and cats — joints, gut, skin and coat in one bite.",
    image: "/images/puppy.jpg",
    imageAlt: "Brown and white puppy looking up",
    accent: "peach",
    intro:
      "A vet-formulated daily chew that delivers omega-3s, probiotics and joint-support actives inside our NutriCore™ micro-capsules, so they survive the stomach and absorb where they should.",
    benefits: [
      { title: "Joint & mobility", body: "Glucosamine, MSM and green-lipped mussel for active and senior pets." },
      { title: "Gut balance", body: "Shelf-stable probiotic strains protected until they reach the intestine." },
      { title: "Skin & coat", body: "Marine omega-3s and biotin for a softer coat and less itching." },
      { title: "Tastes like a treat", body: "Real chicken flavour — no artificial colours or fillers." },
    ],
    forAnimals: ["Dogs", "Cats"],
    format: "Soft chews · 60 per pouch",
  },
  {
    slug: "herd",
    name: "Faunora Herd™",
    category: "Livestock premix",
    short: "Micro-mineral and vitamin premix for dairy and beef cattle, goats and sheep.",
    image: "/images/dairy-herd.jpg",
    imageAlt: "Herd of dairy cattle in a field",
    accent: "teal",
    intro:
      "A precision premix that mixes straight into existing rations. Encapsulated trace minerals resist rumen breakdown, lifting milk yield and fertility without raising feed cost.",
    benefits: [
      { title: "Higher milk yield", body: "Bioavailable zinc, selenium and cobalt support udder health and output." },
      { title: "Better fertility", body: "Balanced vitamin A, D3 and E for stronger conception rates." },
      { title: "Drops into any ration", body: "Works with TMR, pellets or top-dressing — no new equipment." },
      { title: "Less waste out", body: "More absorbed means fewer minerals lost to manure and runoff." },
    ],
    forAnimals: ["Dairy cattle", "Beef cattle", "Goats", "Sheep"],
    format: "Powder premix · 25 kg bags",
  },
  {
    slug: "flock",
    name: "Faunora Flock™",
    category: "Poultry nutrition",
    short: "Water-soluble vitamins, electrolytes and amino acids for layers and broilers.",
    image: "/images/hen.jpg",
    imageAlt: "Brown hen standing on grass",
    accent: "orange",
    intro:
      "Dissolves instantly in drinking lines to keep flocks performing through heat stress, vaccination and transport — with no clogging and no extra handling.",
    benefits: [
      { title: "Heat-stress defence", body: "Electrolytes and vitamin C keep birds drinking and eating in hot weather." },
      { title: "Stronger shells", body: "Highly available calcium and D3 for layers in peak production." },
      { title: "Faster growth", body: "Essential amino acids support even weight gain in broilers." },
      { title: "Clean lines", body: "Fully soluble formula — no residue in nipples or tanks." },
    ],
    forAnimals: ["Layers", "Broilers", "Ducks"],
    format: "Soluble powder · 1 kg tubs",
  },
];

export const nav = [
  {
    label: "Products",
    items: products.map((p) => ({ label: p.name, href: `/products/${p.slug}`, note: p.category })),
  },
  {
    label: "Science",
    items: [
      { label: "NutriCore™ technology", href: "/science", note: "How micro-encapsulation works" },
      { label: "Field trials", href: "/#trials", note: "Live results by country" },
      { label: "Safety & quality", href: "/science#safety", note: "Testing and certification" },
    ],
  },
  {
    label: "About",
    items: [
      { label: "About us", href: "/about", note: "Our team and story" },
      { label: "Sustainability", href: "/sustainability", note: "Less waste, lower footprint" },
    ],
  },
  { label: "Blog", href: "/blog" },
] as const;

export const home = {
  hero: {
    title: "Nutrition, Reimagined.",
    subtitle: "For every paw, hoof and feather.",
    body: "Vet-formulated supplements with NutriCore™ micro-capsules that protect every nutrient until it reaches the animal — not the floor, not the manure.",
  },
  marquee: [
    "Vet-formulated",
    "NutriCore™ micro-encapsulation",
    "Traceable ingredients",
    "No artificial fillers",
    "Pets · Livestock · Poultry",
    "Field-tested on 3 continents",
  ],
  problem: {
    title: "Most supplements never reach the animal.",
    body: "Heat, moisture and stomach acid break down vitamins and minerals long before they can be absorbed. Pet owners and farmers pay for nutrition that ends up wasted.",
    stat: "Up to 60%",
    statLabel: "of the vitamins in standard feed can degrade before absorption.",
    source: "Placeholder figure — replace with a cited study",
  },
  solution: {
    kicker: "How healthy could they be — if nothing was wasted?",
    title: "We built a better carrier.",
    body: "NutriCore™ wraps each active ingredient in a plant-based micro-capsule. It survives processing, storage and digestion, then releases exactly where the gut can absorb it.",
    tech: [
      { title: "Smaller than a grain of salt", body: "Micro-capsules blend evenly into chews, premix or water." },
      { title: "Effortlessly integrative", body: "No change to feeding routines or equipment." },
      { title: "Plant-based shell", body: "Made from food-grade fibres, fully digestible." },
    ],
    benefits: [
      { title: "Just add it", body: "Mix, sprinkle or dissolve — done." },
      { title: "Lower dose", body: "More absorbed means less needed." },
      { title: "Stable for 24 months", body: "Potency that lasts on the shelf." },
      { title: "0 artificial fillers", body: "Only what the animal needs." },
    ],
  },
  stats: {
    title: "Field-Tested. Vet-Approved.",
    items: [
      { value: "6", label: "countries in active trials" },
      { value: "3×", label: "higher nutrient absorption" },
      { value: "18%", label: "less feed wasted per animal" },
      { value: "≥4×", label: "return on supplement spend" },
    ],
    footnote: "Placeholder figures pending publication of Faunora trial data.",
  },
  sustainability: {
    title: "Healthier animals, lighter footprint.",
    body: "When more of every nutrient is absorbed, less is excreted into soil and water. Our capsules are plant-based, our packaging is recyclable, and our premixes ship concentrated — cutting freight emissions per dose.",
  },
  products: {
    title: "For Happier Pets. For Healthier Herds.",
    body: "One technology, tuned for every species we care for.",
  },
  trials: {
    title: "Field Trials in Progress",
    body: "We publish results as they come in — the good and the inconclusive. Here is where Faunora is being tested right now.",
    next: "Next update: January 2027 — full-season milk yield and FCR data.",
    why: "Why we share this: farmers and vets deserve evidence, not marketing claims.",
    sites: [
      { country: "Bangladesh", species: "Dairy cattle", status: "In progress" },
      { country: "India", species: "Broilers", status: "In progress" },
      { country: "Kenya", species: "Goats", status: "In progress" },
      { country: "Netherlands", species: "Dairy cattle", status: "Complete" },
      { country: "United Kingdom", species: "Dogs & cats", status: "Complete" },
      { country: "Vietnam", species: "Layers", status: "In progress" },
    ],
  },
  onRequest: {
    title: "Faunora Aqua™ is available on request.",
    body: "Our gut-health formula for fish and shrimp farms is in limited release. Tell us about your ponds or cages and we will send a trial batch.",
  },
  closing: {
    title: "See the difference for yourself.",
    body: "Request a sample for your clinic, farm or store — or talk to our nutrition team.",
  },
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  date: string;
  readTime: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "why-pets-need-more-than-food",
    title: "Why a complete diet still leaves gaps",
    excerpt: "Even premium kibble loses nutrients in the bag. Here is what fades first — and how to fill the gap.",
    image: "/images/corgi.jpg",
    imageAlt: "Happy corgi sitting among yellow flowers",
    date: "2026-10-21",
    readTime: "5 min read",
    body: [
      "Commercial pet food is formulated to be complete on the day it is made. But heat during extrusion, oxygen in an opened bag and months on a shelf all chip away at fragile vitamins and fatty acids.",
      "Omega-3s oxidise, vitamin E is consumed protecting them, and probiotic counts fall sharply at room temperature. The result is a diet that looks complete on the label but delivers less in the bowl.",
      "Targeted supplements with protected delivery — like NutriCore™ micro-capsules — can close that gap without changing what your pet already loves to eat.",
    ],
  },
  {
    slug: "heat-stress-in-poultry",
    title: "Keeping flocks productive through heat stress",
    excerpt: "Hot weather cuts feed intake and egg quality. Five practical steps for layer and broiler farms.",
    image: "/images/chickens-field.jpg",
    imageAlt: "Chickens grazing in a grassy field",
    date: "2026-09-30",
    readTime: "6 min read",
    body: [
      "Birds have no sweat glands. Above 30°C they pant to cool down, losing carbon dioxide and electrolytes and eating less.",
      "Start with the basics: shade, airflow and cool, clean water. Then support the birds from the inside with electrolytes, vitamin C and highly available calcium for shell quality.",
      "Water-soluble products such as Faunora Flock™ are easiest to deliver during a heatwave because birds keep drinking even when they stop eating.",
    ],
  },
  {
    slug: "active-dogs-joint-health",
    title: "Joint care for active dogs, at every age",
    excerpt: "Mobility support should not wait for the first limp. What the research says about starting early.",
    image: "/images/dog-beach.jpg",
    imageAlt: "Dog running on a beach",
    date: "2026-09-02",
    readTime: "4 min read",
    body: [
      "Large and athletic breeds put serious load on their joints long before they show signs of stiffness.",
      "Glucosamine, chondroitin and omega-3s work best as long-term support rather than a rescue once pain appears.",
      "Ask your vet about a daily routine — and choose a supplement your dog actually enjoys, so it becomes a habit.",
    ],
  },
];

export const requestForm = {
  animals: ["Dogs", "Cats", "Dairy cattle", "Beef cattle", "Goats / sheep", "Poultry", "Fish / shrimp", "Other"],
  businessTypes: ["Pet owner", "Veterinary clinic", "Pet store / retailer", "Livestock farm", "Poultry farm", "Aquaculture farm", "Distributor", "Other"],
  timing: ["As soon as possible", "Within 1 month", "Within 3 months", "Just researching"],
  countries: [
    "Bangladesh", "India", "Pakistan", "Nepal", "Sri Lanka", "Vietnam", "Indonesia", "Malaysia", "Thailand",
    "Kenya", "Nigeria", "South Africa", "United Arab Emirates", "Saudi Arabia", "United Kingdom",
    "Netherlands", "Germany", "United States", "Canada", "Australia", "Other",
  ],
};
