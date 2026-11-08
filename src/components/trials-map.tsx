import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-110m.json";
import { LogoMark } from "./logo";

type Site = { country: string; species: string; status: string; lon: number; lat: number };

const W = 1000;
const H = 520;

// Country outlines (Natural Earth, public domain) — projected once on the server
const topo = world as unknown as Topology<{ countries: GeometryCollection }>;
const countries = feature(topo, topo.objects.countries) as FeatureCollection<Geometry>;
const land = { ...countries, features: countries.features.filter((f) => f.id !== "010") }; // drop Antarctica
const projection = geoNaturalEarth1().fitExtent(
  [
    [0, 6],
    [W, H - 6],
  ],
  land,
);
const d = geoPath(projection)(land) ?? "";

export function TrialsMap({ sites }: { sites: Site[] }) {
  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden="true">
        <path d={d} fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinejoin="round" opacity="0.38" />
      </svg>

      <ul className="absolute inset-0" aria-label="Trial locations">
        {sites.map((s) => {
          const [x, y] = projection([s.lon, s.lat]) ?? [0, 0];
          return (
            <li key={s.country} className="trial-pin absolute" style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}>
              <button type="button" className="group relative -translate-x-1/2 -translate-y-1/2 p-1.5 outline-none" aria-label={`${s.country}: ${s.species}, ${s.status}`}>
                <LogoMark className="trial-pin-mark h-[18px] w-auto text-sage transition duration-300 group-hover:scale-125 group-hover:text-forest group-focus-visible:scale-125 group-focus-visible:text-forest" />
                <span className="trial-tip pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 w-40 bg-sage/85 p-3 text-left text-[#f4ede6] backdrop-blur-sm">
                  <span className="block text-[15px] font-semibold normal-case tracking-[-0.01em]">{s.country}</span>
                  <span className="mt-1 block text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#f4ede6]/85">{s.species}</span>
                  <span className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em]">
                    <span className={`keep-round size-1.5 ${s.status === "Complete" ? "bg-[#f4ede6]" : "animate-pulse bg-[#e3e296]"}`} />
                    {s.status}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
