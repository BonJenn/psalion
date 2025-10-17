'use client';

import React, { useState } from 'react';

type Cat = "Decentralized Finance" | "Infrastructure" | "NFT" | "RWA" | "Other";
type Row = "Fund I" | "Fund II";

type Dot = {
  cat: Cat;
  row: Row;
  r: number;        // radius in px for exact sizing control
  value?: number;   // for the label (e.g., 12 FOUNDERS)
  selected?: boolean;
  muted?: boolean;  // light/striped fill like your mock
};

const categories: Cat[] = [
  "Decentralized Finance",
  "Infrastructure",
  "NFT",
  "RWA",
  "Other",
];

const rows: Row[] = ["Fund II", "Fund I"];

// Data matching the screenshots - Fund II (top), Fund I (bottom)
const dots: Dot[] = [
  // Fund II row (top)
  { cat: "Decentralized Finance", row: "Fund II", r: 32, value: 5, muted: true },
  { cat: "Infrastructure",        row: "Fund II", r: 48, value: 12, muted: true },
  { cat: "NFT",                   row: "Fund II", r: 20, value: 3, muted: true },
  { cat: "RWA",                   row: "Fund II", r: 24, value: 2, muted: true },
  { cat: "Other",                 row: "Fund II", r: 28, value: 2, muted: true },

  // Fund I row (bottom)
  { cat: "Decentralized Finance", row: "Fund I", r: 36, value: 7, muted: true },
  { cat: "Infrastructure",        row: "Fund I", r: 44, value: 11, muted: true },
  { cat: "NFT",                   row: "Fund I", r: 0 }, // none in mock
  { cat: "RWA",                   row: "Fund I", r: 16, value: 1, muted: true },
  { cat: "Other",                 row: "Fund I", r: 24, value: 2, muted: true },
];

export default function BubbleMatrix() {
  const [hoveredBubble, setHoveredBubble] = useState<{ cat: Cat; row: Row } | null>(null);

  // Canvas + plot geometry
  const W = 1120;
  const H = 460;
  const M = { top: 60, right: 140, bottom: 120, left: 100 }; // Increased top and bottom margins
  const plotW = W - M.left - M.right;
  const plotH = H - M.top - M.bottom;

  const x = (cat: Cat) =>
    M.left + (categories.indexOf(cat) * plotW) / (categories.length - 1);

  const y = (row: Row) => {
    // Custom positioning to bring Fund II down and Fund I up
    if (row === "Fund II") {
      return M.top + (plotH * 0.3); // Move Fund II down (was 0)
    } else {
      return M.top + (plotH * 0.7); // Move Fund I up (was 1)
    }
  };

  const selected = dots.find((d) => d.selected);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
        <div className="w-full flex justify-center">
          <div
            className="relative"
            style={{ width: W, height: H, fontFamily: "ui-sans-serif, system-ui" }}
          >
            <svg width={W} height={H} aria-label="Founders by Category and Fund">
              {/* defs for striped "muted" fill */}
              <defs>
                <pattern id="diag-stripes" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(20)">
                  <rect width="8" height="8" fill="#EDF2FF" />
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#DCE6FF" strokeWidth="4" />
                </pattern>
              </defs>

              {/* light dotted outer grid */}
              <g opacity={0.35}>
                {/* horizontal grid (2 rows) as dotted lines spanning full width */}
                {rows.map((r, i) => (
                  <line
                    key={`h-${i}`}
                    x1={M.left}
                    x2={W - M.right}
                    y1={y(r)}
                    y2={y(r)}
                    stroke="#97A3B6"
                    strokeDasharray="2 6"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}

                {/* vertical grid lines */}
                {categories.map((c, i) => (
                  <line
                    key={`v-${i}`}
                    x1={x(c)}
                    x2={x(c)}
                    y1={M.top}
                    y2={H - M.bottom}
                    stroke="#E6EAF2"
                    strokeDasharray="1 10"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </g>

              {/* Dynamic connecting lines - only show on hover */}
              {hoveredBubble && (
                <g>
                  {/* Horizontal connecting line from right edge (fund label) to bubble center */}
                  <line
                    x1={x(hoveredBubble.cat)}
                    x2={W - M.right}
                    y1={y(hoveredBubble.row)}
                    y2={y(hoveredBubble.row)}
                    stroke="#2F54EB"
                    strokeDasharray="2 6"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                  
                  {/* Vertical connecting line from bubble center down to technology label */}
                  <line
                    x1={x(hoveredBubble.cat)}
                    x2={x(hoveredBubble.cat)}
                    y1={y(hoveredBubble.row)}
                    y2={H - M.bottom + 10}
                    stroke="#2F54EB"
                    strokeDasharray="2 6"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              )}

              {/* Bubbles */}
              <g>
                {dots.map((d, i) => {
                  if (!d.r) return null;
                  const cx = x(d.cat);
                  const cy = y(d.row);
                  const isHovered = hoveredBubble && hoveredBubble.cat === d.cat && hoveredBubble.row === d.row;
                  const isSel = !!d.selected;

                  const fill = isHovered ? "#2F54EB" : isSel ? "#2F54EB" : d.muted ? "url(#diag-stripes)" : "#E9F0FF";
                  const stroke = isHovered ? "#2F54EB" : isSel ? "#2F54EB" : "#D8E1FF";

                  return (
                    <g key={i}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={d.r}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={3}
                        vectorEffect="non-scaling-stroke"
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredBubble({ cat: d.cat, row: d.row })}
                        onMouseLeave={() => setHoveredBubble(null)}
                      />
                    </g>
                  );
                })}
              </g>

              {/* Axis labels */}
              <g>
                {/* bottom category labels */}
                {categories.map((c, i) => (
                  <text
                    key={i}
                    x={x(c)}
                    y={H - M.bottom + 48}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#6B7280"
                    fontFamily="ui-sans-serif, system-ui"
                  >
                    {c}
                  </text>
                ))}

                {/* right-side row labels */}
                {rows.map((r, i) => (
                  <text
                    key={i}
                    x={W - M.right + 54}
                    y={y(r) + 4}
                    textAnchor="start"
                    fontSize="12"
                    fill="#6B7280"
                    fontFamily="ui-sans-serif, system-ui"
                  >
                    {r}
                  </text>
                ))}
              </g>
            </svg>

            {/* Tooltip pill for the hovered bubble (HTML overlay so it's crisp) */}
            {hoveredBubble && (() => {
              const dot = dots.find(d => d.cat === hoveredBubble.cat && d.row === hoveredBubble.row);
              if (!dot || !dot.value) return null;
              
              return (
                <div
                  className="absolute text-[11px] font-semibold text-white bg-[#2F54EB] rounded-[10px] px-2 py-1"
                  style={{
                    left: `${x(hoveredBubble.cat) + dot.r + 4}px`,
                    top: `${y(hoveredBubble.row) - 6}px`,
                    pointerEvents: "none",
                  }}
                >
                  {dot.value} FOUNDERS
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}