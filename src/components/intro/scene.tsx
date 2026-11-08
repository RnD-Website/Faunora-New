/**
 * Studio scene: a Faunora soft-chew floating above a lit pedestal.
 * Pure SVG so it stays crisp when the camera zooms in on scroll.
 * The chew sits at viewBox (720, 450) = the exact centre, so with
 * `xMidYMid slice` it is always in the centre of the viewport.
 */

const LOGO_L =
  "M61.375 70.329C64.872 66.832 66.832 64.872 70.329 61.375V23.876C61.005 14.552 55.777 9.324 46.453 0H3.73102C2.27402 1.457 1.457 2.274 0 3.731V53.914C6.41 60.325 10.005 63.919 16.415 70.329H34.765C36.513 72.077 37.494 73.058 39.242 74.806V80.139C37.494 81.887 36.513 82.868 34.765 84.616H16.415C10.005 91.027 6.411 94.621 0 101.031V151.214C1.457 152.671 2.27402 153.488 3.73102 154.945H46.453C55.777 145.621 61.005 140.393 70.329 131.069V93.57C66.832 90.073 64.872 88.113 61.375 84.616C59.627 82.868 58.646 81.887 56.898 80.139V74.806C58.646 73.057 59.627 72.077 61.375 70.329Z";
const LOGO_R =
  "M89.7431 70.329C86.2461 66.832 84.2861 64.872 80.7891 61.375V23.876C90.1131 14.552 95.3411 9.324 104.665 0H147.387C148.844 1.457 149.661 2.274 151.118 3.731V53.914C144.708 60.325 141.113 63.919 134.703 70.329H116.353C114.605 72.077 113.624 73.058 111.876 74.806V80.139C113.624 81.887 114.605 82.868 116.353 84.616H134.703C141.113 91.027 144.707 94.621 151.118 101.031V151.214C149.661 152.671 148.844 153.488 147.387 154.945H104.665C95.3411 145.621 90.1131 140.393 80.7891 131.069V93.57C84.2861 90.073 86.2461 88.113 89.7431 84.616C91.4911 82.868 92.4721 81.887 94.2201 80.139V74.806C92.4711 73.057 91.4911 72.077 89.7431 70.329Z";

function Mark({ fill, dx = 0, dy = 0 }: { fill: string; dx?: number; dy?: number }) {
  return (
    <g transform={`translate(${-62 + dx} ${-63.5 + dy}) scale(0.82)`} fill={fill}>
      <path d={LOGO_L} />
      <path d={LOGO_R} />
    </g>
  );
}

// Bulbs along the front arc of the base tier
const bulbs = Array.from({ length: 15 }, (_, i) => {
  const a = (Math.PI * (12 + (i * 156) / 14)) / 180;
  return { x: 720 + 300 * Math.cos(a), y: 742 + 50 * Math.sin(a) };
});

// Micro-capsules drifting around the chew (NutriCore™ nod)
const capsules = [
  { x: 560, y: 330, r: 9, d: 0 },
  { x: 900, y: 300, r: 6, d: 1.2 },
  { x: 930, y: 520, r: 11, d: 0.6 },
  { x: 520, y: 520, r: 7, d: 1.8 },
  { x: 640, y: 250, r: 5, d: 2.4 },
  { x: 820, y: 610, r: 6, d: 0.9 },
];

export function Scene() {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="sc-wall" cx="50%" cy="38%" r="75%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#eef6ff" />
          <stop offset="1" stopColor="#c6dcf2" />
        </radialGradient>
        <linearGradient id="sc-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3f8fd" />
          <stop offset="1" stopColor="#d3e3f3" />
        </linearGradient>
        <linearGradient id="sc-cyl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9dbee" />
          <stop offset="0.35" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#e6eff9" />
          <stop offset="1" stopColor="#b7cde4" />
        </linearGradient>
        <linearGradient id="sc-column" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d9e7f5" />
          <stop offset="0.4" stopColor="#ffffff" />
          <stop offset="1" stopColor="#bcd2e8" />
        </linearGradient>
        <linearGradient id="sc-chew" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffb061" />
          <stop offset="0.5" stopColor="#ff7f00" />
          <stop offset="1" stopColor="#d96200" />
        </linearGradient>
        <radialGradient id="sc-capsule" cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#9fdcd8" />
          <stop offset="1" stopColor="#3fa9a3" />
        </radialGradient>
        <radialGradient id="sc-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffb347" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
        </radialGradient>
        <filter id="sc-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="sc-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* Studio */}
      <rect width="1440" height="900" fill="url(#sc-wall)" />
      <path d="M0 640 Q720 600 1440 640 V900 H0Z" fill="url(#sc-floor)" />
      <ellipse cx="720" cy="640" rx="760" ry="34" fill="#ffffff" opacity="0.6" filter="url(#sc-soft)" />

      {/* Everything below moves with the camera (push-in on reveal) */}
      <g className="intro-camera">
      {/* Side architecture, like a product studio */}
      <g opacity="0.9">
        <ellipse cx="250" cy="700" rx="92" ry="20" fill="#b7cde4" />
        <rect x="158" y="320" width="184" height="380" fill="url(#sc-column)" />
        <ellipse cx="250" cy="320" rx="92" ry="20" fill="#f7fbff" />
        <path d="M1130 700 V250 A80 80 0 0 1 1290 250 V700Z" fill="url(#sc-column)" opacity="0.85" />
      </g>

      {/* Base tier with bulbs */}
      <ellipse cx="720" cy="760" rx="320" ry="56" fill="#b9cfe6" />
      <rect x="400" y="728" width="640" height="32" fill="url(#sc-cyl)" />
      <ellipse cx="720" cy="728" rx="320" ry="56" fill="#f9fcff" stroke="#dfe9f4" strokeWidth="2" />
      {bulbs.map((b, i) => (
        <g key={i} className="intro-bulb" style={{ transitionDelay: `${0.25 + i * 0.05}s` }}>
          <circle cx={b.x} cy={b.y} r="16" fill="url(#sc-glow)" className="intro-bulb-glow" />
          <circle cx={b.x} cy={b.y} r="4.5" className="intro-bulb-core" />
        </g>
      ))}

      {/* Pedestal cylinder */}
      <ellipse cx="720" cy="700" rx="205" ry="40" fill="#b3c9e1" />
      <rect x="515" y="600" width="410" height="100" fill="url(#sc-cyl)" />
      <ellipse cx="720" cy="600" rx="205" ry="40" fill="#ffffff" stroke="#e2ecf6" strokeWidth="2" />
      <ellipse cx="720" cy="600" rx="150" ry="26" fill="none" stroke="#e8f0f8" strokeWidth="2" />

      {/* Contact shadow (breathes with the float) */}
      <ellipse cx="720" cy="602" rx="105" ry="15" fill="#161345" opacity="0.18" filter="url(#sc-soft)" className="intro-shadow" />

      {/* Micro-capsules */}
      {capsules.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={c.r} fill="url(#sc-capsule)" className="intro-capsule" style={{ animationDelay: `${c.d}s` }} />
      ))}

      {/* The chew */}
      <g transform="translate(720 450)">
        <g className="intro-chew">
          <g transform="rotate(-12)">
            <rect x="-112" y="-98" width="224" height="224" rx="60" fill="#a94d00" />
            <rect x="-112" y="-112" width="224" height="224" rx="60" fill="url(#sc-chew)" />
            <ellipse cx="-40" cy="-62" rx="70" ry="34" fill="#ffffff" opacity="0.32" filter="url(#sc-blur)" />
            <Mark fill="#a94d00" dx={2.5} dy={3.5} />
            <Mark fill="#ff9a33" dx={-1.5} dy={-1.5} />
            <Mark fill="#f07500" />
          </g>
        </g>
      </g>
      </g>
    </svg>
  );
}
