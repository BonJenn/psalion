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
  { cat: "NFT",                   row: "Fund II", r: 30, value: 3, muted: true },
  { cat: "RWA",                   row: "Fund II", r: 24, value: 2, muted: true },
  { cat: "Other",                 row: "Fund II", r: 24, value: 2, muted: true },

  // Fund I row (bottom)
  { cat: "Decentralized Finance", row: "Fund I", r: 36, value: 7, muted: true },
  { cat: "Infrastructure",        row: "Fund I", r: 44, value: 11, muted: true },
  { cat: "NFT",                   row: "Fund I", r: 0 }, // none in mock
  { cat: "RWA",                   row: "Fund I", r: 16, value: 1, muted: true },
  { cat: "Other",                 row: "Fund I", r: 24, value: 2, muted: true },
];

// Mobile-optimized bubble sizes
const getMobileDots = (): Dot[] => [
  // Fund II row (top) - much smaller bubbles for mobile
  { cat: "Decentralized Finance", row: "Fund II", r: 12, value: 5, muted: true },
  { cat: "Infrastructure",        row: "Fund II", r: 18, value: 12, muted: true },
  { cat: "NFT",                   row: "Fund II", r: 11, value: 3, muted: true },
  { cat: "RWA",                   row: "Fund II", r: 9, value: 2, muted: true },
  { cat: "Other",                 row: "Fund II", r: 9, value: 2, muted: true },

  // Fund I row (bottom) - much smaller bubbles for mobile
  { cat: "Decentralized Finance", row: "Fund I", r: 14, value: 7, muted: true },
  { cat: "Infrastructure",        row: "Fund I", r: 16, value: 11, muted: true },
  { cat: "NFT",                   row: "Fund I", r: 0 }, // none in mock
  { cat: "RWA",                   row: "Fund I", r: 6, value: 1, muted: true },
  { cat: "Other",                 row: "Fund I", r: 9, value: 2, muted: true },
];

export default function BubbleMatrix() {
  const [hoveredBubble, setHoveredBubble] = useState<{ cat: Cat; row: Row } | null>(null);

  // Canvas + plot geometry - responsive sizing
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;
  
  // Use mobile-optimized dots on mobile
  const currentDots = isMobile ? getMobileDots() : dots;
  
  // Mobile-only vertical redesign: 2 columns (Fund I, Fund II)
  if (isMobile) {
    const getDot = (cat: Cat, row: Row) => currentDots.find(d => d.cat === cat && d.row === row);

    return (
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="w-full" style={{ fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
            {/* Category rows with vertical dotted column guides */}
            <div className="relative space-y-3">
              {/* vertical dotted lines through each column center */}
              <div className="pointer-events-none absolute inset-y-0 left-[25%] border-l border-dotted border-gray-300/80" />
              <div className="pointer-events-none absolute inset-y-0 left-[75%] border-l border-dotted border-gray-300/80" />
              {categories.map((cat) => {
                const dFundI = getDot(cat, 'Fund I');
                const dFundII = getDot(cat, 'Fund II');
                return (
                  <div key={cat} className="relative grid grid-cols-2 gap-0 items-center py-3 border-t border-dashed border-gray-200 first:border-t-0">
                    {/* Fund I cell */}
                    <div className="relative flex items-center justify-center h-16 px-3">
                      {dFundI && dFundI.r > 0 && (
                        <button
                          aria-label={`${cat} – ${dFundI.value ?? 0} founders in Fund I`}
                          className="relative"
                          onMouseEnter={() => setHoveredBubble({ cat, row: 'Fund I' })}
                          onMouseLeave={() => setHoveredBubble(null)}
                          onTouchStart={() => setHoveredBubble({ cat, row: 'Fund I' })}
                        >
                          <span
                            className="block rounded-full border"
                            style={{
                              width: Math.round(dFundI.r * 2 * 1.45),
                              height: Math.round(dFundI.r * 2 * 1.45),
                              background: hoveredBubble && hoveredBubble.cat === cat && hoveredBubble.row === 'Fund I' ? '#2F54EB' : '#E9F0FF',
                              borderColor: hoveredBubble && hoveredBubble.cat === cat && hoveredBubble.row === 'Fund I' ? '#2F54EB' : '#D8E1FF'
                            }}
                          />
                        </button>
                      )}

                      {/* Hover label */}
                      {hoveredBubble && hoveredBubble.cat === cat && hoveredBubble.row === 'Fund I' && dFundI?.value ? (
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#2F54EB] text-white rounded-md px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap shadow-sm">
                          <div>{cat.toUpperCase()}</div>
                          <div>{dFundI.value} FOUNDERS</div>
                        </div>
                      ) : null}
                    </div>

                    {/* Fund II cell */}
                    <div className="relative flex items-center justify-center h-16 px-3">
                      {dFundII && dFundII.r > 0 && (
                        <button
                          aria-label={`${cat} – ${dFundII.value ?? 0} founders in Fund II`}
                          className="relative"
                          onMouseEnter={() => setHoveredBubble({ cat, row: 'Fund II' })}
                          onMouseLeave={() => setHoveredBubble(null)}
                          onTouchStart={() => setHoveredBubble({ cat, row: 'Fund II' })}
                        >
                          <span
                            className="block rounded-full border"
                            style={{
                              width: Math.round(dFundII.r * 2 * 1.45),
                              height: Math.round(dFundII.r * 2 * 1.45),
                              background: hoveredBubble && hoveredBubble.cat === cat && hoveredBubble.row === 'Fund II' ? '#2F54EB' : '#E9F0FF',
                              borderColor: hoveredBubble && hoveredBubble.cat === cat && hoveredBubble.row === 'Fund II' ? '#2F54EB' : '#D8E1FF'
                            }}
                          />
                        </button>
                      )}

                      {/* Hover label */}
                      {hoveredBubble && hoveredBubble.cat === cat && hoveredBubble.row === 'Fund II' && dFundII?.value ? (
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#2F54EB] text-white rounded-md px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap shadow-sm">
                          <div>{cat.toUpperCase()}</div>
                          <div>{dFundII.value} FOUNDERS</div>
                        </div>
                      ) : null}
                    </div>

                    {/* Mobile row category label centered between bubbles */}
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span className="text-[10px] font-medium text-gray-600 uppercase tracking-wide bg-white px-1 rounded-sm text-center leading-tight whitespace-normal break-words max-w-[70px]">
                        {cat}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Bottom column labels */}
              <div className="grid grid-cols-2 gap-6 mt-2">
                <div className="text-center text-[11px] text-gray-600">Fund I</div>
                <div className="text-center text-[11px] text-gray-600">Fund II</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  const W = isMobile ? 300 : isTablet ? 600 : 1120;
  const H = isMobile ? 380 : isTablet ? 350 : 460;
  const M = { 
    top: isMobile ? 20 : 60, 
    right: isMobile ? 50 : isTablet ? 80 : 140, 
    bottom: isMobile ? 60 : 120, 
    left: isMobile ? 20 : 100 
  };
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

  const selected = currentDots.find((d) => d.selected);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
        <div className="w-full flex justify-center overflow-x-auto">
            <div
            className="relative"
            style={{ 
              width: W, 
              height: H, 
              fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              minWidth: '100%'
            }}
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
                {currentDots.map((d, i) => {
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
                    y={H - M.bottom + (isMobile ? 30 : 48)}
                    textAnchor="middle"
                    fontSize={isMobile ? "7" : "12"}
                    fill="#6B7280"
                    fontFamily="IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
                  >
                    {isMobile ? c.split(' ')[0] : c}
                  </text>
                ))}

                {/* right-side row labels */}
                {rows.map((r, i) => (
                  <text
                    key={i}
                    x={W - M.right + (isMobile ? 25 : 54)}
                    y={y(r) + 4}
                    textAnchor="start"
                    fontSize={isMobile ? "8" : "12"}
                    fill="#6B7280"
                    fontFamily="IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
                  >
                    {r}
                  </text>
                ))}
              </g>
            </svg>

            {/* Tooltip pill for the hovered bubble (HTML overlay so it's crisp) */}
            {hoveredBubble && (() => {
              const dot = currentDots.find(d => d.cat === hoveredBubble.cat && d.row === hoveredBubble.row);
              if (!dot || !dot.value) return null;
              
              return (
                <div
                  className={`absolute font-semibold text-white bg-[#2F54EB] rounded-[10px] px-2 py-1 ${isMobile ? 'text-[9px]' : 'text-[11px]'}`}
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