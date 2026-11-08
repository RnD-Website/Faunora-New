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
        <linearGradient id="sc-floor" gradientUnits="userSpaceOnUse" x1="0" y1="640" x2="0" y2="900">
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
        <radialGradient id="sc-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffe9a8" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffe9a8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sc-vignette" cx="50%" cy="45%" r="75%">
          <stop offset="0.55" stopColor="#10150a" stopOpacity="0" />
          <stop offset="1" stopColor="#10150a" stopOpacity="0.5" />
        </radialGradient>
        <linearGradient id="sc-niche-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9d3a8" stopOpacity="0.45" />
          <stop offset="0.75" stopColor="#c9d3a8" stopOpacity="0.15" />
          <stop offset="1" stopColor="#c9d3a8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sc-niche-fade-g" gradientUnits="userSpaceOnUse" x1="0" y1="560" x2="0" y2="662">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <mask id="sc-niche-fade" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="900">
          <rect width="1440" height="900" fill="url(#sc-niche-fade-g)" />
        </mask>
        <linearGradient id="sc-prop-base" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6c7650" />
          <stop offset="0.35" stopColor="#a4ad86" />
          <stop offset="1" stopColor="#5f6946" />
        </linearGradient>
        <radialGradient id="sc-pearl" cx="34%" cy="28%" r="74%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#e9e4d2" />
          <stop offset="1" stopColor="#9c9576" />
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

      {/* Studio backdrop (static) */}
      <rect width="1440" height="900" fill="url(#sc-wall)" />

      {/* Everything below moves with the camera (push-in on reveal) */}
      <g className="intro-camera">
        {/* Floor — oversized so it never shows an edge when the camera scales */}
        <path d="M-900 646 Q720 616 2340 646 V1600 H-900Z" fill="url(#sc-floor)" />
        {/* Soft light pool where the spotlight lands */}
        <ellipse cx="720" cy="706" rx="460" ry="78" fill="#e6edcc" opacity="0.16" filter="url(#sc-haze)" />

        {/* Back niche (cyclorama), fading into the floor */}
        <g mask="url(#sc-niche-fade)">
          <path d="M410 660 V330 A310 310 0 0 1 1030 330 V660Z" fill="url(#sc-niche)" />
          <path d="M410 660 V330 A310 310 0 0 1 1030 330 V660Z" fill="url(#sc-niche-edge)" />
          <path d="M410 660 V330 A310 310 0 0 1 1030 330 V660" fill="none" stroke="url(#sc-niche-stroke)" strokeWidth="2" />
        </g>
        {/* Ambient occlusion where the niche meets the floor */}
        <ellipse cx="720" cy="650" rx="340" ry="16" fill="#10150a" opacity="0.22" filter="url(#sc-soft)" />
        {/* Horizon haze softens the wall/floor seam */}
        <ellipse cx="720" cy="644" rx="980" ry="30" fill="#b7c493" opacity="0.2" filter="url(#sc-haze)" />

        {/* Overhead spotlight */}
        <path d="M660 -20 H780 L1000 650 H440Z" fill="url(#sc-beam)" filter="url(#sc-haze)" opacity="0.9" />
        <circle cx="720" cy="440" r="270" fill="url(#sc-halo)" />

        {/* Side props, softly out of focus */}
        <g filter="url(#sc-depth)">
          {/* left: sphere on a low plinth */}
          <ellipse cx="376" cy="726" rx="96" ry="15" fill="#10150a" opacity="0.32" filter="url(#sc-soft)" />
          <ellipse cx="372" cy="720" rx="64" ry="13" fill="url(#sc-prop-base)" />
          <rect x="308" y="648" width="128" height="72" fill="url(#sc-prop)" />
          <ellipse cx="372" cy="648" rx="64" ry="13" fill="url(#sc-top)" />
          <ellipse cx="372" cy="647" rx="32" ry="6" fill="#10150a" opacity="0.28" filter="url(#sc-soft)" />
          <circle cx="372" cy="608" r="38" fill="url(#sc-sphere)" />
          <ellipse cx="360" cy="592" rx="12" ry="8" fill="#ffffff" opacity="0.55" filter="url(#sc-soft)" />

          {/* right: smaller plinth with a cream pearl */}
          <ellipse cx="1092" cy="742" rx="78" ry="12" fill="#10150a" opacity="0.3" filter="url(#sc-soft)" />
          <ellipse cx="1088" cy="736" rx="52" ry="11" fill="url(#sc-prop-base)" />
          <rect x="1036" y="694" width="104" height="42" fill="url(#sc-prop)" />
          <ellipse cx="1088" cy="694" rx="52" ry="11" fill="url(#sc-top)" />
          <ellipse cx="1088" cy="693" rx="22" ry="5" fill="#10150a" opacity="0.28" filter="url(#sc-soft)" />
          <circle cx="1088" cy="668" r="26" fill="url(#sc-pearl)" />
          <ellipse cx="1080" cy="658" rx="8" ry="5" fill="#ffffff" opacity="0.6" filter="url(#sc-soft)" />
        </g>

        {/* Base tier */}
        <ellipse cx="720" cy="806" rx="400" ry="50" fill="#10150a" opacity="0.42" filter="url(#sc-blur)" />
        <ellipse cx="720" cy="796" rx="430" ry="42" fill="url(#sc-glow)" opacity="0.45" className="intro-bulb-glow" style={{ transitionDelay: "0.6s" }} />
        <ellipse cx="720" cy="772" rx="338" ry="58" fill="url(#sc-prop-base)" />
        <rect x="382" y="736" width="676" height="36" fill="url(#sc-cyl)" />
        <ellipse cx="720" cy="736" rx="338" ry="58" fill="url(#sc-top)" />
        <ellipse cx="720" cy="736" rx="338" ry="58" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.85" />
        <path d="M384 744 A338 58 0 0 0 1056 744" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.35" />
        <ellipse cx="720" cy="738" rx="262" ry="42" fill="none" stroke="#c4caa8" strokeWidth="1.5" opacity="0.8" />
        {bulbs.map((b, i) => (
          <g key={i} className="intro-bulb" style={{ transitionDelay: `${0.25 + i * 0.045}s` }}>
            <circle cx={b.x} cy={b.y} r="17" fill="url(#sc-glow)" className="intro-bulb-glow" />
            <circle cx={b.x} cy={b.y} r="4.5" className="intro-bulb-core" />
          </g>
        ))}

        {/* Pedestal cylinder */}
        <ellipse cx="720" cy="704" rx="232" ry="40" fill="#10150a" opacity="0.38" filter="url(#sc-soft)" />
        <ellipse cx="720" cy="696" rx="208" ry="40" fill="url(#sc-prop-base)" />
        <rect x="512" y="602" width="416" height="94" fill="url(#sc-cyl)" />
        <path d="M512 616 A208 40 0 0 0 928 616" fill="none" stroke="url(#sc-trim)" strokeWidth="6" />
        <ellipse cx="720" cy="602" rx="208" ry="40" fill="url(#sc-top)" />
        <ellipse cx="720" cy="602" rx="208" ry="40" fill="none" stroke="#ffffff" strokeWidth="2.5" />
        <path d="M514 610 A208 40 0 0 0 926 610" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.4" />
        <ellipse cx="720" cy="604" rx="156" ry="28" fill="none" stroke="#c8cdb0" strokeWidth="1.5" opacity="0.8" />

        {/* Orange light bounce + contact shadow (breathes with the float) */}
        <ellipse cx="720" cy="600" rx="140" ry="22" fill="#e2cca6" opacity="0.18" filter="url(#sc-soft)" />
        <ellipse cx="720" cy="604" rx="104" ry="14" fill="#10150a" opacity="0.35" filter="url(#sc-soft)" className="intro-shadow" />

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
