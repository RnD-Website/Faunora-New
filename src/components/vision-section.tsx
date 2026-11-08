import { home } from "@/content/site";
import { Chew, Sphere } from "./props-3d";
import { ScrollProgress } from "./scroll-progress";

const v = home.vision;

function Label() {
  return (
    <div className="flex items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.12em] md:gap-16">
      <span className="flex items-center gap-2.5">
        <span className="size-2 bg-[#f4ede6]" />
        {v.index}
      </span>
      <span className="flex items-center gap-2.5">
        <span className="size-2 bg-[#f4ede6]" />
        {v.label}
      </span>
    </div>
  );
}

function Readout({ rows, className = "" }: { rows: string[][]; className?: string }) {
  return (
    <dl className={`grid grid-cols-[auto_auto] gap-x-8 gap-y-1 text-[10px] font-medium uppercase tracking-[0.1em] text-[#f4ede6]/80 ${className}`}>
      {rows.map(([k, val]) => (
        <div key={k} className="contents">
          <dt>{k}</dt>
          <dd className="text-[#f4ede6]">{val}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Full-bleed "mission" scene: giant word, a floating chew, scroll parallax, then the statement. */
export function VisionSection() {
  return (
    <ScrollProgress className="vision relative isolate overflow-hidden bg-forest-900 text-[#f4ede6]">
      {/* sky → soil */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#9aa86f_0%,#7c914c_22%,#596a33_42%,#2c3713_62%,#1f2509_78%)]" />

      {/* Scene */}
      <div className="relative h-[100svh] min-h-[620px]">
        <div className="container-x flex justify-between pt-[calc(var(--header-h)+28px)]">
          <Label />
          <div className="hidden md:block">
            <Label />
          </div>
        </div>

        <Readout rows={v.readoutsRight} className="absolute right-[var(--gutter)] top-[56%] hidden md:grid" />
        <Readout rows={v.readoutsLeft} className="absolute left-[var(--gutter)] top-[56%] hidden md:grid" />

        <p
          aria-hidden="true"
          className="vision-word font-display pointer-events-none absolute inset-x-0 top-[22%] text-center text-[clamp(2.4rem,13vw,13rem)] uppercase leading-none text-[#c9d3a8]"
        >
          {v.word}
        </p>

        <div className="vision-chew absolute left-1/2 top-[50%] w-[min(42vw,300px)]">
          <div className="float">
            <Chew id="vision-chew" rotate={-10} className="w-full drop-shadow-2xl" />
          </div>
        </div>

        {/* foreground "rocks" */}
        <div className="vision-rock-a pointer-events-none absolute -left-[6%] bottom-[-24%] w-[28vw] min-w-[200px] blur-[1.5px]">
          <Sphere id="vision-rock-a" className="w-full" />
        </div>
        <div className="vision-rock-b pointer-events-none absolute right-[30%] top-[74%] w-[4vw] min-w-[34px]">
          <Sphere id="vision-rock-b" tone="cream" className="w-full" />
        </div>
      </div>

      {/* Statement */}
      <div className="container-x relative grid gap-8 pb-24 pt-6 md:pb-32 lg:grid-cols-2 lg:items-end lg:gap-16">
        <p className="max-w-[22ch] text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.02em]">{v.statement}</p>
        <div className="max-w-lg space-y-4 text-sm leading-relaxed text-[#f4ede6]/75 lg:justify-self-end">
          {v.body.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </div>
    </ScrollProgress>
  );
}
