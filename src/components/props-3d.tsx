/**
 * Standalone 3D-style props that match the hero scene, for reuse
 * (footer wordmark, etc.). Each instance needs a unique `id`.
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

/** Cream soft-chew with the embossed Faunora mark */
export function Chew({ id, className, rotate = -12 }: { id: string; className?: string; rotate?: number }) {
  return (
    <svg viewBox="-150 -150 300 320" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbf3e3" />
          <stop offset="0.45" stopColor="#e2cca6" />
          <stop offset="1" stopColor="#b99a6c" />
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8d7049" />
          <stop offset="1" stopColor="#5b462b" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={`${id}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <ellipse cx="6" cy="150" rx="100" ry="12" fill="#1f2509" opacity="0.28" filter={`url(#${id}-shadow)`} />
      <g transform={`rotate(${rotate})`}>
        <rect x="-112" y="-96" width="224" height="224" rx="60" fill={`url(#${id}-side)`} />
        <rect x="-112" y="-112" width="224" height="224" rx="60" fill={`url(#${id}-face)`} />
        <rect x="-110.5" y="-110.5" width="221" height="221" rx="59" fill="none" stroke={`url(#${id}-rim)`} strokeWidth="3" />
        <ellipse cx="-38" cy="-64" rx="72" ry="34" fill="#ffffff" opacity="0.34" filter={`url(#${id}-blur)`} />
        <Mark fill="#6b5333" dx={2.5} dy={3.5} opacity={0.75} />
        <Mark fill="#fff9ec" dx={-1.5} dy={-1.5} />
        <Mark fill="#d4bc93" />
      </g>
    </svg>
  );
}

/** Glossy sage sphere */
export function Sphere({ id, className, tone = "sage" }: { id: string; className?: string; tone?: "sage" | "cream" }) {
  const stops =
    tone === "sage"
      ? ["#eef2dc", "#7c914c", "#2c3713"]
      : ["#ffffff", "#e9dfcb", "#a58c64"];
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-g`} cx="34%" cy="28%" r="74%">
          <stop offset="0" stopColor={stops[0]} />
          <stop offset="0.55" stopColor={stops[1]} />
          <stop offset="1" stopColor={stops[2]} />
        </radialGradient>
        <filter id={`${id}-b`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <circle cx="100" cy="100" r="96" fill={`url(#${id}-g)`} />
      <ellipse cx="72" cy="58" rx="26" ry="16" fill="#ffffff" opacity="0.55" filter={`url(#${id}-b)`} />
    </svg>
  );
}
