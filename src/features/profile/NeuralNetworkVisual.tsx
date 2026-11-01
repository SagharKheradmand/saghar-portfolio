import { useState } from "react";
import type { Profile } from "../../../shared/content.ts";

interface NeuralNetworkVisualProps {
  focusAreas: Profile["focusAreas"];
  portrait: Profile["portrait"];
}

const focusNodes = [
  { x: 178, y: 150 },
  { x: 428, y: 250 },
  { x: 224, y: 418 },
] as const;

const routes = [
  "M84 290 178 150 300 110 428 250 492 376",
  "M84 290 178 150 306 288 428 250 492 376",
  "M84 290 178 150 306 288 224 418 492 376",
] as const;

export function NeuralNetworkVisual({ focusAreas, portrait }: NeuralNetworkVisualProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeArea = focusAreas[activeIndex];

  return (
    <div
      className="hero-network relative mx-auto h-[30rem] w-full max-w-[34rem] min-[700px]:h-[31rem] min-[1100px]:h-[36rem]"
      aria-label="Interactive research focus network"
    >
      <div className="relative aspect-[580/560] w-full">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 580 560"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="network-glow">
              <stop stopColor="var(--network-glow)" stopOpacity=".38" />
              <stop offset="1" stopColor="var(--network-glow)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="288" cy="278" r="260" fill="url(#network-glow)" />
          <circle cx="288" cy="278" r="208" stroke="var(--network-ring)" strokeDasharray="2 8" />
          <circle
            cx="288"
            cy="278"
            r="130"
            stroke="var(--network-ring-strong)"
            strokeOpacity=".7"
          />
          <path
            d="M84 290 178 150 300 110 428 250 492 376 376 450 224 418 84 290M178 150 306 288 428 250M306 288 224 418M300 110 376 450M84 290 428 250"
            stroke="var(--network-line)"
            strokeWidth="1.2"
          />
          <path
            key={activeIndex}
            d={routes[activeIndex]}
            className="hero-network-route"
            stroke="var(--hero-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {[
            [84, 290],
            [300, 110],
            [306, 288],
            [492, 376],
            [376, 450],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="var(--network-point)" />
          ))}
          {focusNodes.map(({ x, y }, index) => (
            <g key={`${x}-${y}`}>
              <circle
                cx={x}
                cy={y}
                r={activeIndex === index ? 31 : 23}
                fill="var(--network-node)"
                stroke={activeIndex === index ? "var(--hero-accent)" : "var(--network-node-border)"}
                strokeWidth="1.5"
              />
              <circle
                cx={x}
                cy={y}
                r={activeIndex === index ? 7 : 5}
                fill={activeIndex === index ? "var(--hero-cyan)" : "var(--network-node-dot)"}
              />
            </g>
          ))}
        </svg>
        {portrait && (
          <figure className="pointer-events-none absolute top-[49.6%] left-[49.6%] z-[5] w-[7.5rem] -translate-x-1/2 -translate-y-1/2 rounded-[1.4rem] border border-[var(--hero-ring)]/75 bg-[var(--hero-caption)] p-1.5 shadow-[0_0_0_8px_rgba(121,216,246,.07),0_20px_55px_rgba(0,0,0,.32)] min-[700px]:w-[8.5rem] min-[1100px]:w-[9.25rem]">
            <img
              src={portrait}
              alt="Portrait of Saghar Kheradmand"
              width={460}
              height={460}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="block aspect-square w-full rounded-[1rem] border border-[var(--hero-divider)] object-cover"
            />
          </figure>
        )}
        {focusAreas.slice(0, focusNodes.length).map((area, index) => (
          <button
            key={area.label}
            type="button"
            aria-label={`Explore ${area.label}`}
            aria-pressed={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            style={{
              left: `${(focusNodes[index].x / 580) * 100}%`,
              top: `${(focusNodes[index].y / 560) * 100}%`,
            }}
            className="hero-node absolute z-10 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-transparent bg-transparent outline-offset-4 focus-visible:border-blue"
          />
        ))}
      </div>
      {activeArea && (
        <div className="hero-network-caption absolute right-1 bottom-1 left-1 border-l-2 border-[var(--hero-accent)] bg-[var(--hero-caption)] px-4 py-3 min-[700px]:right-8 min-[700px]:bottom-5 min-[700px]:left-auto min-[700px]:w-72">
          <p className="text-[0.62rem] font-semibold tracking-[0.2em] text-[var(--hero-accent)] uppercase">
            Research focus / 0{activeIndex + 1}
          </p>
          <p className="mt-1 font-display text-xl leading-none text-ink">{activeArea.label}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-ink">{activeArea.description}</p>
        </div>
      )}
    </div>
  );
}
