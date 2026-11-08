/**
 * Olive product studio (Farm Minerals palette): a Faunora soft-chew floating above a lit pedestal.
 * Pure SVG so it stays crisp when the camera zooms in on scroll.
 * The chew sits at viewBox (720, 450) = the exact centre, so with
 * `xMidYMid slice` it is always in the centre of the viewport.
 */

const LOGO_L =
  "M61.375 70.329C64.872 66.832 66.832 64.872 70.329 61.375V23.876C61.005 14.552 55.777 9.324 46.453 0H3.73102C2.27402 1.457 1.457 2.274 0 3.731V53.914C6.41 60.325 10.005 63.919 16.415 70.329H34.765C36.513 72.077 37.494 73.058 39.242 74.806V80.139C37.494 81.887 36.513 82.868 34.765 84.616H16.415C10.005 91.027 6.411 94.621 0 101.031V151.214C1.457 152.671 2.27402 153.488 3.73102 154.945H46.453C55.777 145.621 61.005 140.393 70.329 131.069V93.57C66.832 90.073 64.872 88.113 61.375 84.616C59.627 82.868 58.646 81.887 56.898 80.139V74.806C58.646 73.057 59.627 72.077 61.375 70.329Z";
const LOGO_R =
  "M89.7431 70.329C86.2461 66.832 84.2861 64.872 80.7891 61.375V23.876C90.1131 14.552 95.3411 9.324 104.665 0H147.387C148.844 1.457 149.661 2.274 151.118 3.731V53.914C144.708 60.325 141.113 63.919 134.703 70.329H116.353C114.605 72.077 113.624 73.058 111.876 74.806V80.139C113.624 81.887 114.605 82.868 116.353 84.616H134.703C141.113 91.027 144.707 94.621 151.118 101.031V151.214C149.661 152.671 148.844 153.488 147.387 154.945H104.665C95.3411 145.621 90.1131 140.393 80.7891 131.069V93.57C84.2861 90.073 86.2461 88.113 89.7431 84.616C91.4911 82.868 92.4721 81.887 94.2201 80.139V74.806C92.4711 73.057 91.4911 72.077 89.7431 70.329Z";

function Mark({ fill, dx = 0, dy = 0, opacity = 1 }: { fill: string; dx?: number; dy?: number; opacity?: number }) {
  return (
    <g transform={`translate(${-62 + dx} ${-63.5 + dy}) scale(0.82)`} fill={fill} opacity={opacity}>
      <path d={LOGO_L} />
      <path d={LOGO_R} />
    </g>
  );
}

// Bulbs along the front arc of the base tier
const bulbs = Array.from({ length: 17 }, (_, i) => {
  const a = (Math.PI * (10 + (i * 160) / 16)) / 180;
  return { x: 720 + 318 * Math.cos(a), y: 752 + 52 * Math.sin(a) };
});

// Micro-capsules drifting around the chew (NutriCore™ nod)
const capsules = [
  { x: 548, y: 318, r: 10, d: 0 },
  { x: 905, y: 292, r: 6, d: 1.2 },
  { x: 945, y: 505, r: 12, d: 0.6 },
  { x: 506, y: 520, r: 7, d: 1.8 },
  { x: 632, y: 238, r: 5, d: 2.4 },
  { x: 838, y: 612, r: 5, d: 0.9 },
  { x: 990, y: 380, r: 4, d: 3 },
];

export function Scene() {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="sc-wall" cx="50%" cy="36%" r="78%">
          <stop offset="0" stopColor="#879a55" />
          <stop offset="0.42" stopColor="#5a6a2f" />
          <stop offset="0.8" stopColor="#36431b" />
          <stop offset="1" stopColor="#1f2509" />
        </radialGradient>
        <linearGradient id="sc-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#55652b" />
          <stop offset="1" stopColor="#283210" />
        </linearGradient>
        <linearGradient id="sc-niche" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b4719" />
          <stop offset="0.7" stopColor="#56662c" />
          <stop offset="1" stopColor="#617236" />
        </linearGradient>
        <linearGradient id="sc-niche-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1f2509" stopOpacity="0.6" />
          <stop offset="0.12" stopColor="#1f2509" stopOpacity="0" />
          <stop offset="0.88" stopColor="#1f2509" stopOpacity="0" />
          <stop offset="1" stopColor="#1f2509" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="sc-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f7e4" stopOpacity="0.5" />
          <stop offset="1" stopColor="#f4f7e4" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="sc-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#eef3d6" stopOpacity="0.55" />
          <stop offset="0.55" stopColor="#c9d3a8" stopOpacity="0.22" />
          <stop offset="1" stopColor="#c9d3a8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sc-cyl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#87926a" />
          <stop offset="0.28" stopColor="#f1f2e3" />
          <stop offset="0.62" stopColor="#d4d9bc" />
          <stop offset="1" stopColor="#7a8458" />
        </linearGradient>
        <radialGradient id="sc-top" cx="45%" cy="40%" r="65%">
          <stop offset="0" stopColor="#fafaf0" />
          <stop offset="1" stopColor="#d8dcc3" />
        </radialGradient>
        <linearGradient id="sc-trim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4c5a28" />
          <stop offset="0.3" stopColor="#c9d3a8" />
          <stop offset="0.65" stopColor="#7c914c" />
          <stop offset="1" stopColor="#404f1d" />
        </linearGradient>
        <linearGradient id="sc-prop" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#76815a" />
          <stop offset="0.4" stopColor="#dde2c8" />
          <stop offset="1" stopColor="#66704a" />
        </linearGradient>
        <radialGradient id="sc-sphere" cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#eef2dc" />
          <stop offset="0.55" stopColor="#7c914c" />
          <stop offset="1" stopColor="#36431b" />
        </radialGradient>
        <linearGradient id="sc-chew" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbf3e3" />
          <stop offset="0.45" stopColor="#e2cca6" />
          <stop offset="1" stopColor="#b99a6c" />
        </linearGradient>
        <linearGradient id="sc-chew-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8d7049" />
          <stop offset="1" stopColor="#5b462b" />
        </linearGradient>
        <linearGradient id="sc-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="sc-capsule" cx="32%" cy="28%" r="72%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#e3e9cc" />
          <stop offset="1" stopColor="#94a668" />
        </radialGradient>
        <radialGradient id="sc-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffe9a8" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffe9a8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sc-vignette" cx="50%" cy="45%" r="75%">
          <stop offset="0.55" stopColor="#10150a" stopOpacity="0" />
          <stop offset="1" stopColor="#10150a" stopOpacity="0.5" />
        </radialGradient>
        <filter id="sc-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="sc-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="sc-haze" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
        <filter id="sc-depth" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>

      {/* Studio */}
      <rect width="1440" height="900" fill="url(#sc-wall)" />
      <path d="M0 646 Q720 612 1440 646 V900 H0Z" fill="url(#sc-floor)" />
      <ellipse cx="720" cy="640" rx="780" ry="30" fill="#c9d3a8" opacity="0.25" filter="url(#sc-soft)" />

      {/* Everything below moves with the camera (push-in on reveal) */}
      <g className="intro-camera">
        {/* Back niche (cyclorama) */}
        <path d="M410 646 V330 A310 310 0 0 1 1030 330 V646Z" fill="url(#sc-niche)" />
        <path d="M410 646 V330 A310 310 0 0 1 1030 330 V646Z" fill="url(#sc-niche-edge)" />
        <path d="M410 646 V330 A310 310 0 0 1 1030 330 V646" fill="none" stroke="#c9d3a8" strokeWidth="2" opacity="0.35" />

        {/* Overhead spotlight */}
        <path d="M660 -20 H780 L1000 650 H440Z" fill="url(#sc-beam)" filter="url(#sc-haze)" opacity="0.9" />
        <circle cx="720" cy="440" r="270" fill="url(#sc-halo)" />

        {/* Side props, softly out of focus */}
        <g filter="url(#sc-depth)">
          {/* left: tall column + sphere on a low plinth */}
          <ellipse cx="236" cy="712" rx="120" ry="22" fill="#10150a" opacity="0.28" filter="url(#sc-soft)" />
          <ellipse cx="230" cy="700" rx="86" ry="18" fill="#6d7750" />
          <rect x="144" y="300" width="172" height="400" fill="url(#sc-prop)" />
          <ellipse cx="230" cy="300" rx="86" ry="18" fill="#eef0de" />
          <ellipse cx="372" cy="720" rx="64" ry="13" fill="#6d7750" />
          <rect x="308" y="648" width="128" height="72" fill="url(#sc-prop)" />
          <ellipse cx="372" cy="648" rx="64" ry="13" fill="#eef0de" />
          <ellipse cx="372" cy="646" rx="30" ry="6" fill="#10150a" opacity="0.25" filter="url(#sc-soft)" />
          <circle cx="372" cy="608" r="38" fill="url(#sc-sphere)" />
          <ellipse cx="360" cy="592" rx="12" ry="8" fill="#ffffff" opacity="0.55" filter="url(#sc-soft)" />

          {/* right: arch panel + small cube */}
          <ellipse cx="1218" cy="708" rx="110" ry="18" fill="#10150a" opacity="0.25" filter="url(#sc-soft)" />
          <path d="M1130 702 V250 A88 88 0 0 1 1306 250 V702Z" fill="url(#sc-prop)" />
          <path d="M1150 702 V262 A68 68 0 0 1 1286 262 V702Z" fill="#c9d3a8" opacity="0.35" />
          <path d="M1050 724 l40 -14 l40 14 l-40 14Z" fill="#eef0de" />
          <path d="M1050 724 v-0 l40 14 v52 l-40 -14Z" fill="#c3c9a6" />
          <path d="M1130 724 l-40 14 v52 l40 -14Z" fill="#7f8a5e" />
        </g>

        {/* Base tier */}
        <ellipse cx="720" cy="800" rx="380" ry="48" fill="#10150a" opacity="0.45" filter="url(#sc-blur)" />
        <ellipse cx="720" cy="790" rx="420" ry="40" fill="url(#sc-glow)" opacity="0.5" className="intro-bulb-glow" style={{ transitionDelay: "0.6s" }} />
        <ellipse cx="720" cy="772" rx="338" ry="58" fill="#8a9470" />
        <rect x="382" y="736" width="676" height="36" fill="url(#sc-cyl)" />
        <ellipse cx="720" cy="736" rx="338" ry="58" fill="url(#sc-top)" />
        <ellipse cx="720" cy="736" rx="338" ry="58" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.9" />
        <ellipse cx="720" cy="738" rx="262" ry="42" fill="none" stroke="#c4caa8" strokeWidth="2" />
        {bulbs.map((b, i) => (
          <g key={i} className="intro-bulb" style={{ transitionDelay: `${0.25 + i * 0.045}s` }}>
            <circle cx={b.x} cy={b.y} r="17" fill="url(#sc-glow)" className="intro-bulb-glow" />
            <circle cx={b.x} cy={b.y} r="4.5" className="intro-bulb-core" />
          </g>
        ))}

        {/* Pedestal cylinder */}
        <ellipse cx="720" cy="702" rx="226" ry="40" fill="#10150a" opacity="0.4" filter="url(#sc-soft)" />
        <ellipse cx="720" cy="696" rx="208" ry="40" fill="#878f6a" />
        <rect x="512" y="602" width="416" height="94" fill="url(#sc-cyl)" />
        <path d="M512 616 A208 40 0 0 0 928 616" fill="none" stroke="url(#sc-trim)" strokeWidth="7" />
        <ellipse cx="720" cy="602" rx="208" ry="40" fill="url(#sc-top)" />
        <ellipse cx="720" cy="602" rx="208" ry="40" fill="none" stroke="#ffffff" strokeWidth="3" />
        <ellipse cx="720" cy="604" rx="156" ry="28" fill="none" stroke="#c8cdb0" strokeWidth="2" />

        {/* Orange light bounce + contact shadow (breathes with the float) */}
        <ellipse cx="720" cy="600" rx="140" ry="22" fill="#e2cca6" opacity="0.18" filter="url(#sc-soft)" />
        <ellipse cx="720" cy="604" rx="104" ry="14" fill="#10150a" opacity="0.35" filter="url(#sc-soft)" className="intro-shadow" />

        {/* Micro-capsules */}
        {capsules.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={c.r} fill="url(#sc-capsule)" className="intro-capsule" style={{ animationDelay: `${c.d}s` }} />
        ))}

        {/* The chew */}
        <g transform="translate(720 450)">
          <g className="intro-chew">
            <g transform="rotate(-12)">
              <rect x="-112" y="-96" width="224" height="224" rx="60" fill="url(#sc-chew-side)" />
              <rect x="-112" y="-112" width="224" height="224" rx="60" fill="url(#sc-chew)" />
              <rect x="-110.5" y="-110.5" width="221" height="221" rx="59" fill="none" stroke="url(#sc-rim)" strokeWidth="3" />
              <ellipse cx="-38" cy="-64" rx="72" ry="34" fill="#ffffff" opacity="0.34" filter="url(#sc-blur)" />
              <Mark fill="#6b5333" dx={2.5} dy={3.5} opacity={0.75} />
              <Mark fill="#fff9ec" dx={-1.5} dy={-1.5} />
              <Mark fill="#d4bc93" />
            </g>
          </g>
        </g>
      </g>

      {/* Lens vignette */}
      <rect width="1440" height="900" fill="url(#sc-vignette)" />
    </svg>
  );
}
