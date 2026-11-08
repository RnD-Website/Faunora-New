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
  accent: "beige" | "teal" | "sage";
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
    image: "/images/labrador-tulip.jpg",
    imageAlt: "Golden Labrador sitting with a tulip in its mouth",
    accent: "beige",
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
    accent: "sage",
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
    figures: {
      heading: ["NutriCore™", "in numbers"],
      center: { value: 3, suffix: "×", label: "Higher absorption" },
      items: [
        { title: "Capsule size", badge: "NutriCore™", prefix: "<", value: 200, unit: "µm", label: "Smaller than a grain of salt", note: "Blends into chews, premix or water" },
        { title: "Shelf stability", badge: "Stable", value: 24, unit: "MONTHS", label: "Full potency on the shelf", note: "Heat and moisture protected" },
        { title: "Daily dose", badge: "−30%", value: 30, unit: "% LESS", label: "More absorbed, less needed", note: "Compared with uncoated actives" },
        { title: "Artificial fillers", badge: "Clean", value: 0, unit: "ADDED", label: "Only what the animal needs", note: "No colours, no binders" },
        { title: "Plant-based shell", badge: "Digestible", value: 100, unit: "%", label: "Food-grade plant fibres", note: "No synthetic polymers" },
      ],
      footnote: "Placeholder figures pending Faunora lab data.",
    },
  },
  stats: {
    title: "Field-Tested. Vet-Approved.",
    items: [
      { value: "8", label: "countries in active trials" },
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
    next: "January 2027 — full-season milk yield and FCR data.",
    why: "Real data beats marketing claims. Follow the results as they come in.",
    sites: [
      { country: "Bangladesh", species: "Dairy cattle", status: "In progress", lon: 90.4, lat: 23.7 },
      { country: "India", species: "Broilers", status: "In progress", lon: 78.9, lat: 21.5 },
      { country: "Kenya", species: "Goats", status: "In progress", lon: 37.9, lat: 0.2 },
      { country: "Netherlands", species: "Dairy cattle", status: "Complete", lon: 5.3, lat: 52.1 },
      { country: "United Kingdom", species: "Dogs & cats", status: "Complete", lon: -2.0, lat: 53.0 },
      { country: "Vietnam", species: "Layers", status: "In progress", lon: 106.3, lat: 16.0 },
      { country: "Brazil", species: "Beef cattle", status: "In progress", lon: -51.9, lat: -12.0 },
      { country: "United States", species: "Dogs & cats", status: "In progress", lon: -98.5, lat: 39.5 },
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
  {
    slug: "what-pasture-misses",
    title: "What grazing cattle still miss on pasture",
    excerpt: "Lush grass can still run short on selenium, copper and cobalt. How to spot the gaps before milk yield drops.",
    image: "/images/pasture-cows.jpg",
    imageAlt: "Cows grazing on a green pasture",
    date: "2026-08-14",
    readTime: "5 min read",
    body: [
      "Fresh pasture looks like the perfect diet, but soil type and season shape what is actually in the grass.",
      "Many regions are naturally low in selenium and cobalt, and high-sulphur forage can lock up copper. The first signs are subtle: dull coats, slower growth and lower fertility.",
      "A protected mineral premix such as Faunora Herd™ tops up what pasture cannot supply, without changing how the herd is fed.",
    ],
  },
  {
    slug: "gut-health-in-aquaculture",
    title: "Gut health is the new frontier in fish farming",
    excerpt: "Why feed conversion in ponds and cages starts in the gut — and what micro-encapsulation changes.",
    image: "/images/fish-cages.jpg",
    imageAlt: "Fish farm cages on a calm lake",
    date: "2026-07-22",
    readTime: "6 min read",
    body: [
      "In water, nutrients leach out of feed within minutes. Much of what is paid for never reaches the fish.",
      "Encapsulated actives stay intact in water and release in the gut, supporting a healthier microbiome and better feed conversion.",
      "Faunora Aqua™ is in limited release for fish and shrimp farms — get in touch to join a trial.",
    ],
  },
  {
    slug: "cats-and-supplements",
    title: "Do indoor cats need supplements?",
    excerpt: "Indoor life changes what cats need. A vet's view on joints, hairballs and skin health.",
    image: "/images/cat.jpg",
    imageAlt: "Orange and white cat resting",
    date: "2026-06-30",
    readTime: "4 min read",
    body: [
      "Indoor cats move less, groom more and often eat the same food every day.",
      "Omega-3s support skin and coat, while targeted fibre and probiotics help with hairballs and digestion.",
      "Always start with your vet — then choose a supplement your cat will actually eat.",
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
