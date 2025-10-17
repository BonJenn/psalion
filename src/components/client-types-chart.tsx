'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ClientTypesChart() {
  const [activeSegment, setActiveSegment] = useState(0);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const clientTypes = [
    {
      name: 'PRIVATE INVESTOR',
      clients: '58 CLIENTS',
      percentage: 70,
      color: '#3B82F6' // Blue
    },
    {
      name: 'INSTITUTION',
      clients: '11 CLIENTS',
      percentage: 14,
      color: '#3B82F6' // Blue
    },
    {
      name: 'FAMILY OFFICE',
      clients: '8 CLIENTS',
      percentage: 10,
      color: '#3B82F6' // Blue
    },
    {
      name: 'CORPORATE',
      clients: '5 CLIENTS',
      percentage: 6,
      color: '#3B82F6' // Blue
    }
  ];

  // Auto-rotate through segments every 3 seconds (on mobile and tablet, not desktop)
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024; // lg breakpoint
    if (isDesktop) {
      // On desktop, start with no segment highlighted
      setActiveSegment(-1);
      return;
    }

    // On mobile and tablet, auto-rotate segments
    const interval = setInterval(() => {
      setActiveSegment((prev) => (prev + 1) % clientTypes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [clientTypes.length]);

  // Calculate cumulative percentages for pie chart using radians like the original
  const calculatePath = (startPercent: number, endPercent: number) => {
    // Convert percentages to radians, starting from -π/2 (top of circle)
    const startAngle = (startPercent / 100) * 2 * Math.PI - Math.PI / 2;
    const endAngle = (endPercent / 100) * 2 * Math.PI - Math.PI / 2;
    
    const radius = 240;
    const centerX = 300;
    const centerY = 300;
    
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);
    
    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
    
    return `M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Determine which segment to show (hover takes priority on desktop)
  const currentSegment = hoveredSegment !== null ? hoveredSegment : activeSegment;
  
  // On desktop, don't show any segment info if nothing is hovered and no segment is active
  const shouldShowSegmentInfo = currentSegment >= 0;

  return (
    <section id="clients" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="text-left"
            variants={staggerContainer}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-xl text-gray-500 mb-6"
              variants={fadeInUp}
            >
              With offices strategically located in North America, Asia, and Europe
            </motion.p>
            
            <motion.p
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-12"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              Psalion has a global reach with diversified client base composed of private investors, financial institutions, family offices and corporations.
            </motion.p>

            {/* Client Info - Hidden on desktop when hovering or when no segment is active */}
            {shouldShowSegmentInfo && (
              <motion.div
                key={currentSegment}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`space-y-1 lg:space-y-4 ${hoveredSegment !== null ? 'lg:hidden' : ''}`}
              >
                <h3 className="text-xl lg:text-lg font-semibold text-gray-400 uppercase tracking-wide">
                  {clientTypes[currentSegment].name}
                </h3>
                <p className="text-xl lg:text-lg font-semibold text-gray-700 uppercase tracking-wide">
                  {clientTypes[currentSegment].clients}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Pie Chart Container */}
          <motion.div
            className="flex flex-col items-center lg:items-center lg:ml-8"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Pie Chart */}
            <div
              className="relative"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePosition({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top
                });
              }}
            >
              {/* Floating Tooltip for Desktop */}
              {hoveredSegment !== null && (
                <div
                  className="hidden lg:block absolute pointer-events-none z-10 bg-gray-100 px-4 py-2 rounded shadow-lg"
                  style={{
                    left: mousePosition.x + 10,
                    top: mousePosition.y - 30,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    {clientTypes[hoveredSegment].name}
                  </div>
                  <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    {clientTypes[hoveredSegment].clients}
                  </div>
                </div>
              )}

              <svg width="600" height="600" viewBox="0 0 600 600" className="transform rotate-0 w-full max-w-[400px] h-[400px] sm:max-w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px]">
                {/* Background circle - plain white */}
                <circle
                  cx="300"
                  cy="300"
                  r="240"
                  fill="white"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                />
                
                {/* Dividing lines - always visible from center to edge */}
                {clientTypes.map((client, index) => {
                  const startPercent = clientTypes.slice(0, index).reduce((sum, c) => sum + c.percentage, 0);
                  const angle = (startPercent / 100) * 2 * Math.PI - Math.PI / 2;
                  const x1 = 300; // Center
                  const y1 = 300; // Center
                  const x2 = 300 + 240 * Math.cos(angle);
                  const y2 = 300 + 240 * Math.sin(angle);
                  
                  return (
                    <line
                      key={`line-${index}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#D1D5DB"
                      strokeWidth="2"
                    />
                  );
                })}
                
                {/* Add the final line to complete the circle (at -π/2 radians) */}
                <line
                  x1={300}
                  y1={300}
                  x2={300 + 240 * Math.cos(-Math.PI / 2)}
                  y2={300 + 240 * Math.sin(-Math.PI / 2)}
                  stroke="#D1D5DB"
                  strokeWidth="2"
                />
                
                {/* Segments */}
                {clientTypes.map((client, index) => {
                  const startPercent = clientTypes.slice(0, index).reduce((sum, c) => sum + c.percentage, 0);
                  const endPercent = startPercent + client.percentage;
                  const isActive = currentSegment === index;
                  
                  return (
                    <motion.path
                      key={client.name}
                      d={calculatePath(startPercent, endPercent)}
                      fill={isActive ? client.color : 'transparent'}
                      stroke="#E5E7EB"
                      strokeWidth="2"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0,
                        fill: isActive ? client.color : 'transparent'
                      }}
                      transition={{ duration: 0.5 }}
                      onMouseEnter={() => setHoveredSegment(index)}
                      onMouseLeave={() => setHoveredSegment(null)}
                      className="cursor-pointer"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Client Types Title - Underneath chart */}
            <motion.h2
              className="text-lg font-bold text-gray-700 uppercase tracking-wide mt-6 text-center lg:mr-4"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              Client Types by AUM
            </motion.h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}