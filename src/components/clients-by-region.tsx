'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
// react-simple-maps types may be missing in this project
// @ts-expect-error - no type defs available
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

export default function ClientsByRegion() {
  const [activeRegion, setActiveRegion] = useState(0);
  const [hoveredRegion, setHoveredRegion] = useState<number | null>(null);

  // Hard blocklist for South America features to avoid any accidental highlighting when Europe is active
  const SOUTH_AMERICA_BLOCKLIST = new Set<string>([
    'French Guiana', 'Fr. Guiana', 'Guyane',
    'Guyana', 'Suriname', 'Venezuela', 'Colombia', 'Ecuador', 'Peru', 'Brazil', 'Bolivia', 'Paraguay', 'Uruguay', 'Argentina', 'Chile',
    'Falkland Is.', 'Falkland Islands', 'South Georgia and the South Sandwich Islands', 'S. Geo. and S. Sandw. Is.'
  ]);

  // No continent gating helper; rely on blocklist + explicit country list

  const regions = [
    {
      name: 'NORTH AMERICA',
      clients: '12 CLIENTS',
      color: '#3B82F6',
      countries: ['United States of America', 'Canada', 'Mexico', 'Greenland', 'Cuba', 'Jamaica', 'Haiti', 'Dominican Rep.', 'Puerto Rico', 'Trinidad and Tobago', 'Barbados', 'Grenada', 'St. Lucia', 'St. Vincent and the Grenadines', 'Antigua and Barb.', 'St. Kitts and Nevis', 'Dominica', 'Bahamas', 'Belize', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'Costa Rica', 'Panama'],
      exclude: [] // No exclusions needed
    },
    {
      name: 'EUROPE',
      clients: '50 CLIENTS',
      color: '#3B82F6',
      countries: ['United Kingdom', 'France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Poland', 'Czechia', 'Hungary', 'Romania', 'Bulgaria', 'Croatia', 'Slovenia', 'Slovakia', 'Lithuania', 'Latvia', 'Estonia', 'Ireland', 'Portugal', 'Greece', 'Cyprus', 'Malta', 'Luxembourg', 'Liechtenstein', 'Monaco', 'Andorra', 'San Marino', 'Vatican', 'Moldova', 'Ukraine', 'Belarus', 'Serbia', 'Montenegro', 'Bosnia and Herz.', 'North Macedonia', 'Albania', 'Kosovo'],
      exclude: [
        // South America and South Atlantic overseas territories
        'French Guiana', 'Fr. Guiana', 'Guyane',
        'Falkland Is.', 'Falkland Islands',
        'South Georgia and the South Sandwich Islands', 'S. Geo. and S. Sandw. Is.',
        // Caribbean/other overseas territories
        'Guadeloupe', 'Martinique', 'Réunion', 'Mayotte', 'New Caledonia', 'French Polynesia', 'Wallis and Futuna', 'Saint Pierre and Miquelon', 'Saint Barthélemy', 'Saint Martin', 'Clipperton I.',
        // Non-European special cases we want to ensure never highlight for Europe
        'Greenland', 'Bermuda', 'Cayman Is.', 'Anguilla', 'Montserrat', 'Aruba', 'Curaçao', 'Bonaire, Sint Eustatius and Saba',
        // Keep Iceland in include (so remove from excludes)
      ] // Aggressive excludes for Europe
    },
    {
      name: 'ASIA-PACIFIC',
      clients: '13 CLIENTS',
      color: '#3B82F6',
      countries: ['China', 'Japan', 'South Korea', 'India', 'Australia', 'New Zealand', 'Singapore', 'Taiwan', 'Thailand', 'Malaysia', 'Indonesia', 'Philippines', 'Vietnam', 'Bangladesh', 'Pakistan', 'Sri Lanka', 'Myanmar', 'Cambodia', 'Laos', 'Brunei', 'Mongolia', 'Nepal', 'Bhutan', 'Maldives', 'Fiji', 'Papua New Guinea', 'Solomon Is.', 'Vanuatu', 'Samoa', 'Tonga', 'Russia', 'Kazakhstan', 'Uzbekistan', 'Turkmenistan', 'Tajikistan', 'Kyrgyzstan', 'Afghanistan', 'North Korea'],
      exclude: ['Alaska', 'Hawaii', 'Guam', 'American Samoa', 'Northern Mariana Is.', 'Puerto Rico', 'US Virgin Islands', 'Greenland'] // Exclude US territories and Greenland
    },
    {
      name: 'MIDDLE EAST',
      clients: '4 CLIENTS',
      color: '#3B82F6',
      countries: ['Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Yemen', 'Iran', 'Iraq', 'Syria', 'Jordan', 'Lebanon', 'Israel', 'Palestine', 'Turkey'],
      exclude: [] // No exclusions needed
    },
    {
      name: 'AFRICA',
      clients: '3 CLIENTS',
      color: '#3B82F6',
      countries: ['South Africa', 'Nigeria', 'Egypt', 'Kenya', 'Ghana', 'Morocco', 'Tunisia', 'Algeria', 'Libya', 'Sudan', 'Ethiopia', 'Uganda', 'Tanzania', 'Rwanda', 'Burundi', 'Malawi', 'Zambia', 'Zimbabwe', 'Botswana', 'Namibia', 'Eswatini', 'Lesotho', 'Madagascar', 'Mauritius', 'Seychelles', 'Comoros', 'Mayotte', 'Réunion', 'Mozambique', 'Angola', 'Dem. Rep. Congo', 'Congo', 'Central African Rep.', 'Chad', 'Niger', 'S. Sudan', 'Eritrea', 'Djibouti', 'Somalia', 'Burkina Faso', 'Côte d\'Ivoire', 'Liberia', 'Sierra Leone', 'Guinea', 'Guinea-Bissau', 'Gambia', 'Senegal', 'Mali', 'Mauritania', 'Cape Verde', 'São Tomé and Principe', 'Eq. Guinea', 'Gabon', 'Cameroon', 'Benin', 'Togo', 'W. Sahara'],
      exclude: [] // No exclusions needed
    }
  ];

  // Remove auto-rotation - now only highlight on hover
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveRegion((prev) => (prev + 1) % regions.length);
  //   }, 4000);

  //   return () => clearInterval(interval);
  // }, [regions.length]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

      // Function to determine if a country should be highlighted
      const getCountryFill = (geo: any) => {
        if (!geo.properties) {
          return '#f8fafc';
        }
        const featureName = geo.properties.NAME || geo.properties.name || geo.properties.NAME_EN;
        const adminName = geo.properties.ADMIN;
        const continent = geo.properties.CONTINENT;
        const resolvedName = featureName || adminName;
        if (!resolvedName) {
          return '#f8fafc';
        }
        if (hoveredRegion !== null) {
          const currentRegion = regions[hoveredRegion];
          // For Europe: gate by continent; allow Cyprus explicitly (often tagged Asia)
          if (currentRegion.name === 'EUROPE') {
            if (featureName && SOUTH_AMERICA_BLOCKLIST.has(featureName)) {
              return '#f8fafc';
            }
            // fall through; rely on explicit includes/excludes
          }
          // Exclude if either the feature name or admin name matches an excluded territory
          const isExcluded = currentRegion.exclude.some((ex: string) => ex === featureName || ex === adminName);
          if (isExcluded) {
            return '#f8fafc';
          }
          // Only include when the FEATURE name is listed (prevents overseas territories matching by ADMIN)
          const isMatch = currentRegion.countries.includes(featureName);
          if (isMatch) {
            return '#3B82F6';
          }
        }
        return '#f8fafc';
      };

  return (
    <section className="py-20 bg-white hidden lg:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center">
            <h2
              className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wide"
              style={{ fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
            >
              Clients by Region
            </h2>
            <div className="flex-1 ml-4 border-t border-dashed border-gray-200"></div>
          </div>
        </motion.div>

        {/* World Map Container */}
        <motion.div
          className="relative mt-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* World Map */}
          <div className="relative w-full max-w-5xl mx-auto">
            <ComposableMap
              projection="geoNaturalEarth1"
              projectionConfig={{
                scale: 180,
                center: [0, 0]
              }}
              width={1000}
              height={500}
              style={{
                width: '100%',
                height: 'auto',
                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
              }}
            >
              <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo: any) => {
                    const featureName = geo.properties.NAME || geo.properties.name || geo.properties.NAME_EN;
                    const adminName = geo.properties.ADMIN;
                    const continent = geo.properties.CONTINENT;
                    
                        // Find which region this country belongs to
                        const belongsToRegion = regions.findIndex(region => {
                          // Exclude if name or admin matches excluded territories
                          const isExcluded = region.exclude.some(excludedCountry => 
                            excludedCountry === featureName || excludedCountry === adminName
                          );
                          
                          if (isExcluded) {
                            return false; // Don't belong to this region if excluded
                          }
                          
                          // For Europe: gate by continent; allow Cyprus explicitly
                          if (region.name === 'EUROPE') {
                            if (featureName && SOUTH_AMERICA_BLOCKLIST.has(featureName)) {
                              return false;
                            }
                          }

                          // Check if country is included in this region
                          return region.countries.includes(featureName);
                        });
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: {
                            fill: getCountryFill(geo),
                            stroke: '#e5e7eb',
                            strokeWidth: 0.5,
                            outline: 'none',
                            cursor: belongsToRegion >= 0 ? 'pointer' : 'default',
                          },
                          hover: {
                            fill: getCountryFill(geo),
                            stroke: '#e5e7eb',
                            strokeWidth: 0.5,
                            outline: 'none',
                            cursor: belongsToRegion >= 0 ? 'pointer' : 'default',
                          },
                          pressed: {
                            fill: getCountryFill(geo),
                            stroke: '#e5e7eb',
                            strokeWidth: 0.5,
                            outline: 'none',
                            cursor: belongsToRegion >= 0 ? 'pointer' : 'default',
                          },
                        }}
                        onMouseEnter={() => {
                          if (belongsToRegion >= 0) {
                            setHoveredRegion(belongsToRegion);
                          }
                        }}
                        onMouseLeave={() => {
                          setHoveredRegion(null);
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>

            {/* Europe overlay removed; rely on explicit includes/excludes */}

            {/* Region Label - Only show when hovering */}
            {hoveredRegion !== null && (
              <motion.div
                key={hoveredRegion}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute bg-white px-6 py-4 rounded-lg shadow-lg border border-gray-200 pointer-events-none"
                style={{
                  left: hoveredRegion === 0 ? '20%' : hoveredRegion === 1 ? '50%' : hoveredRegion === 2 ? '75%' : hoveredRegion === 3 ? '60%' : '50%',
                  top: hoveredRegion === 0 ? '25%' : hoveredRegion === 1 ? '20%' : hoveredRegion === 2 ? '15%' : hoveredRegion === 3 ? '30%' : '55%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                    {regions[hoveredRegion].name}
                  </h3>
                  <p className="text-base font-semibold text-gray-700 uppercase tracking-wide">
                    {regions[hoveredRegion].clients}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
