'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Technology {
  name: string;
  description: string;
  category: string;
  region: string;
  fund: 'Fund I' | 'Fund II';
  logo?: string;
}

const technologies: Technology[] = [
  {
    name: 'Aave',
    description: 'A decentralized liquidity protocol that facilitates lending, borrowing, and earning interest on digital assets.',
    category: 'Decentralized Finance',
    region: 'Europe',
    fund: 'Fund I',
    logo: '/psalion_vc/aave_logo.png'
  },
  {
    name: 'Aioz',
    description: 'A decentralized infrastructure platform designed to transform Web3 storage, AI computation, and streaming services.',
    category: 'Other',
    region: 'Asia',
    fund: 'Fund I',
    logo: '/psalion_vc/aioz_logo.png'
  },
  {
    name: 'Arcadia',
    description: 'A decentralized finance platform providing innovative lending and borrowing solutions.',
    category: 'Decentralized Finance',
    region: 'Europe',
    fund: 'Fund I',
    logo: '/psalion_vc/arcadia_logo.png'
  },
  {
    name: 'Archimedes',
    description: 'A decentralized leverage protocol enabling users to amplify their yield farming returns.',
    category: 'Decentralized Finance',
    region: 'North America',
    fund: 'Fund II',
    logo: '/psalion_vc/archimedes_logo.png'
  },
  {
    name: 'Arkis',
    description: 'A decentralized asset management platform providing institutional-grade DeFi strategies.',
    category: 'Decentralized Finance',
    region: 'Europe',
    fund: 'Fund I',
    logo: '/psalion_vc/arkis_logo.png'
  },
  {
    name: 'Avnu',
    description: 'A decentralized exchange aggregator providing the best prices across multiple DEXs.',
    category: 'Decentralized Finance',
    region: 'Europe',
    fund: 'Fund II',
    logo: '/psalion_vc/avnu_logo.png'
  },
  {
    name: 'Beans',
    description: 'A decentralized stablecoin protocol maintaining price stability through algorithmic mechanisms.',
    category: 'Decentralized Finance',
    region: 'North America',
    fund: 'Fund I',
    logo: '/psalion_vc/beans_logo.jpg'
  },
  {
    name: 'Binance',
    description: 'Binance is the leading global digital asset exchange, empowering millions to trade, invest, and innovate in the Web3 space.',
    category: 'Infrastructure',
    region: 'Europe',
    fund: 'Fund I',
    logo: '/psalion_vc/binance_logo.png'
  },
  {
    name: 'Bitbond',
    description: 'Bitbond enables financial institutions to issue tokenized bonds and assets on blockchain networks.',
    category: 'RWA',
    region: 'Europe',
    fund: 'Fund I',
    logo: '/psalion_vc/bitbond_logo.png'
  },
  {
    name: 'Celo',
    description: 'Celo integrates blockchain technology with a commitment to financial inclusion and environmental sustainability.',
    category: 'Infrastructure',
    region: 'North America',
    fund: 'Fund I',
    logo: '/psalion_vc/celo_logo.png'
  },
  {
    name: 'Chainlink',
    description: 'Chainlink provides secure and reliable data feeds, ensuring interoperability across global blockchain ecosystems.',
    category: 'Infrastructure',
    region: 'North America',
    fund: 'Fund I',
    logo: '/psalion_vc/chainlink_logo.png'
  },
  {
    name: 'Curve',
    description: 'Curve is a decentralized exchange optimized for trading low-slippage stablecoins and pegged assets.',
    category: 'Decentralized Finance',
    region: 'N/A',
    fund: 'Fund I',
    logo: '/psalion_vc/curve_logo.png'
  },
  {
    name: 'Flow',
    description: 'Flow is a blockchain designed for mainstream adoption, featuring high throughput and developer-friendly tools for applications like NBA Top Shot.',
    category: 'Infrastructure',
    region: 'North America',
    fund: 'Fund I',
    logo: '/psalion_vc/flow_logo.png'
  },
  {
    name: 'Opium',
    description: 'Opium Network is a decentralized derivatives platform for the creation, trading, and settlement of on-chain financial products.',
    category: 'Decentralized Finance',
    region: 'N/A',
    fund: 'Fund I',
    logo: '/psalion_vc/opium_logo.png'
  },
  {
    name: 'Origin',
    description: 'Origin develops decentralized products such as Origin Dollar, a yield-generating stablecoin, and Origin Story, a platform for NFT marketplaces and tokenized assets.',
    category: 'Decentralized Finance',
    region: 'N/A',
    fund: 'Fund I',
    logo: '/psalion_vc/origin_logo.png'
  },
  {
    name: 'Polkadot',
    description: 'Polkadot is designed to connect multiple specialized blockchains (parachains) into a cohesive, scalable network.',
    category: 'Infrastructure',
    region: 'Europe',
    fund: 'Fund I',
    logo: '/psalion_vc/polkadot_logo.png'
  },
  {
    name: 'Quantfury',
    description: 'Quantfury is a global trading platform that allows users to trade stocks, digital assets, forex, and commodities at real market prices.',
    category: 'Infrastructure',
    region: 'North America',
    fund: 'Fund I',
    logo: '/psalion_vc/quantfury_logo.png'
  },
  {
    name: 'Radicle',
    description: 'Radicle is a decentralized code collaboration network that serves as a peer-to-peer, censorship-resistant alternative to GitHub.',
    category: 'Infrastructure',
    region: 'N/A',
    fund: 'Fund I',
    logo: '/psalion_vc/radicle_logo.png'
  },
  {
    name: 'Radix',
    description: 'Radix is a Layer-1 smart contract platform tailored for decentralized finance, emphasizing scalability, security, and developer accessibility.',
    category: 'Infrastructure',
    region: 'Europe',
    fund: 'Fund I',
    logo: '/psalion_vc/radix_logo.png'
  },
  {
    name: 'Render',
    description: 'Render is a decentralized GPU platform that connects creators with distributed computing power for 3D graphics, virtual worlds, and digital media.',
    category: 'Other',
    region: 'North America',
    fund: 'Fund I',
    logo: '/psalion_vc/render_logo.png'
  },
  {
    name: 'Serum',
    description: 'Serum is a decentralized exchange that offers fully on-chain, high-speed order book trading within the decentralized finance ecosystem.',
    category: 'Decentralized Finance',
    region: 'N/A',
    fund: 'Fund I',
    logo: '/psalion_vc/serum_logo.png'
  },
  {
    name: 'Solana',
    description: 'Solana is a high-performance Layer-1 blockchain recognized for its speed, low transaction costs, and scalability, supporting various applications in finance, gaming, and consumer services.',
    category: 'Infrastructure',
    region: 'Europe',
    fund: 'Fund I',
    logo: '/psalion_vc/solana_logo.png'
  },
  {
    name: 'Sushi',
    description: 'Sushi is a decentralized exchange that enables users to swap, earn, and lend digital assets without intermediaries.',
    category: 'Decentralized Finance',
    region: 'N/A',
    fund: 'Fund I',
    logo: '/psalion_vc/sushi_logo.png'
  },
  {
    name: 'Uniswap',
    description: 'Uniswap was one of the first decentralized finance (or DeFi) applications to gain significant traction on Ethereum.',
    category: 'Decentralized Finance',
    region: 'N/A',
    fund: 'Fund I',
    logo: '/psalion_vc/uniswap_logo.png'
  },
  {
    name: 'VeChain',
    description: 'VeChain is a Layer-1 blockchain platform dedicated to real-world enterprise adoption.',
    category: 'Infrastructure',
    region: 'Asia',
    fund: 'Fund I',
    logo: '/psalion_vc/vechain_logo.png'
  },
  {
    name: 'Wootrade',
    description: 'WOO aggregates liquidity from various exchanges to provide low-cost trading solutions for both institutional and retail users.',
    category: 'Infrastructure',
    region: 'Asia',
    fund: 'Fund I',
    logo: '/psalion_vc/wootrade_logo.png'
  },
  {
    name: 'Brickken',
    description: 'A platform for tokenizing real-world assets and enabling fractional ownership of traditional investments.',
    category: 'RWA',
    region: 'Europe',
    fund: 'Fund II',
    logo: '/psalion_vc/brickken_logo.png'
  },
  {
    name: 'Deltaprime',
    description: 'A decentralized lending protocol providing capital efficiency and yield optimization for DeFi users.',
    category: 'Decentralized Finance',
    region: 'Europe',
    fund: 'Fund I',
    logo: '/psalion_vc/deltaprime_logo.png'
  },
  {
    name: 'Focus Tree',
    description: 'A blockchain-based platform for sustainable investment and environmental impact tracking.',
    category: 'Other',
    region: 'North America',
    fund: 'Fund II',
    logo: '/psalion_vc/focus_tree_logo.png'
  },
  {
    name: 'Genius',
    description: 'A decentralized AI platform enabling creators to monetize their content and intellectual property.',
    category: 'Other',
    region: 'North America',
    fund: 'Fund I',
    logo: '/psalion_vc/genius_logo.svg'
  },
  {
    name: 'Hinkal',
    description: 'A privacy-focused DeFi protocol enabling confidential transactions and private liquidity provision.',
    category: 'Decentralized Finance',
    region: 'North America',
    fund: 'Fund II',
    logo: '/psalion_vc/hinkal_logo.png'
  },
  {
    name: 'Hyperion',
    description: 'A decentralized oracle network providing secure and reliable data feeds for blockchain applications.',
    category: 'Infrastructure',
    region: 'Asia',
    fund: 'Fund I',
    logo: '/psalion_vc/hyperion_logo.png'
  },
  {
    name: 'Levelfield',
    description: 'A decentralized trading platform offering institutional-grade infrastructure for digital asset markets.',
    category: 'Infrastructure',
    region: 'North America',
    fund: 'Fund II',
    logo: '/psalion_vc/levelfield_logo.png'
  },
  {
    name: 'Mintify',
    description: 'A platform for creating and managing NFT collections with advanced customization and analytics tools.',
    category: 'Other',
    region: 'Europe',
    fund: 'Fund I',
    logo: '/psalion_vc/mintifiy_logo.png'
  },
  {
    name: 'Omega',
    description: 'A decentralized derivatives platform enabling complex financial instruments and risk management.',
    category: 'Decentralized Finance',
    region: 'Europe',
    fund: 'Fund II',
    logo: '/psalion_vc/omega_logo.png'
  },
  {
    name: 'Orbital',
    description: 'A cross-chain infrastructure platform enabling seamless asset transfers and interoperability.',
    category: 'Infrastructure',
    region: 'North America',
    fund: 'Fund I',
    logo: '/psalion_vc/orbital_logo.png'
  },
  {
    name: 'Presearch',
    description: 'A decentralized search engine that rewards users for searching and provides privacy-focused results.',
    category: 'Other',
    region: 'North America',
    fund: 'Fund II',
    logo: '/psalion_vc/presearch_logo.png'
  },
  {
    name: 'STS Digital',
    description: 'A digital asset management firm providing institutional-grade custody and trading solutions.',
    category: 'Infrastructure',
    region: 'Europe',
    fund: 'Fund I',
    logo: '/psalion_vc/sts_digital_logo.png'
  },
  {
    name: 'Stix',
    description: 'A decentralized payment platform enabling fast and low-cost cross-border transactions.',
    category: 'Infrastructure',
    region: 'Asia',
    fund: 'Fund II',
    logo: '/psalion_vc/stix_logo.png'
  },
  {
    name: 'Top Tier Authentics',
    description: 'A platform for authenticating and trading luxury goods using blockchain technology.',
    category: 'RWA',
    region: 'North America',
    fund: 'Fund I',
    logo: '/psalion_vc/top_tier_authentics_logo.png'
  },
  {
    name: 'Umoja',
    description: 'A decentralized identity platform providing secure and privacy-preserving digital identity solutions.',
    category: 'Infrastructure',
    region: 'Africa',
    fund: 'Fund II',
    logo: '/psalion_vc/umoja_logo.png'
  },
  {
    name: 'Usual',
    description: 'A decentralized stablecoin protocol maintaining price stability through algorithmic mechanisms.',
    category: 'Decentralized Finance',
    region: 'Europe',
    fund: 'Fund I',
    logo: '/psalion_vc/usual_logo.png'
  },
  {
    name: 'Utila',
    description: 'A utility token platform enabling seamless payments and rewards across multiple blockchain networks.',
    category: 'Infrastructure',
    region: 'Asia',
    fund: 'Fund II',
    logo: '/psalion_vc/utila_logo.png'
  },
  {
    name: 'Vektor',
    description: 'A decentralized vector database platform providing AI and machine learning infrastructure.',
    category: 'Other',
    region: 'North America',
    fund: 'Fund I',
    logo: '/psalion_vc/vektor_logo.png'
  },
  {
    name: 'Zkex',
    description: 'A zero-knowledge exchange enabling private and scalable trading of digital assets.',
    category: 'Decentralized Finance',
    region: 'Europe',
    fund: 'Fund II',
    logo: '/psalion_vc/zkex_logo.png'
  }
];

const funds = ['All Funds', 'Fund I', 'Fund II'];
const locations = ['All Locations', 'Africa', 'Asia', 'Europe', 'Middle East', 'N/A', 'North America'];
const categories = ['All Categories', 'Decentralized Finance', 'Infrastructure', 'RWA', 'NFT', 'Other'];

export default function TechnologiesChart() {
  const [selectedFund, setSelectedFund] = useState('All Funds');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isFundDropdownOpen, setIsFundDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const filteredTechnologies = useMemo(() => {
    return technologies.filter(tech => {
      const fundMatch = selectedFund === 'All Funds' || tech.fund === selectedFund;
      const locationMatch = selectedLocation === 'All Locations' || tech.region === selectedLocation;
      const categoryMatch = selectedCategory === 'All Categories' || tech.category === selectedCategory;
      
      return fundMatch && locationMatch && categoryMatch;
    });
  }, [selectedFund, selectedLocation, selectedCategory]);


  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" style={{ fontFamily: 'Khteka, var(--font-inter), ui-sans-serif, system-ui' }}>
      {/* Header */}
      <div className="text-left mb-12">
        <p className="text-sm md:text-base text-gray-600 max-w-3xl">
          Our experienced team leverages deep industry knowledge and strategic insights to deliver unparalleled growth opportunities. Our portfolio companies benefit from our extensive network, expertise, and strategic resources, ensuring they achieve their full potential.
        </p>
        <p className="text-sm md:text-base text-gray-600 mt-4">
          Invest with us and be part of the digital revolution that is shaping the world of tomorrow.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 sm:mb-8 justify-center">
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-sm sm:text-base text-gray-700 font-medium">See companies from</span>
          <div className="relative">
            <button
              onClick={() => setIsFundDropdownOpen(!isFundDropdownOpen)}
              className="px-3 sm:px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2 min-w-[100px] sm:min-w-[120px] justify-between text-sm sm:text-base"
            >
              {selectedFund}
              <svg 
                className={`w-4 h-4 transition-transform ${isFundDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isFundDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {funds.map((fund) => (
                  <button
                    key={fund}
                    onClick={() => {
                      setSelectedFund(fund);
                      setIsFundDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      selectedFund === fund ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {fund}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-sm sm:text-base text-gray-700 font-medium">based in</span>
          <div className="relative">
            <button
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="px-3 sm:px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2 min-w-[120px] sm:min-w-[140px] justify-between text-sm sm:text-base"
            >
              {selectedLocation}
              <svg 
                className={`w-4 h-4 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isLocationDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      setSelectedLocation(location);
                      setIsLocationDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      selectedLocation === location ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-sm sm:text-base text-gray-700 font-medium">in</span>
          <div className="relative">
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="px-3 sm:px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2 min-w-[140px] sm:min-w-[160px] justify-between text-sm sm:text-base"
            >
              {selectedCategory}
              <svg 
                className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      selectedCategory === category ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Technologies Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Company Name</th>
                <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900 hidden sm:table-cell">Description</th>
                <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Category</th>
                <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Region</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTechnologies.map((tech, index) => (
                <motion.tr
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 sm:px-6 py-4">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        {/* Logo - visible on all screen sizes */}
                        {tech.logo && (
                          <div className="flex-shrink-0">
                            <Image
                              src={tech.logo}
                              alt={`${tech.name} logo`}
                              width={24}
                              height={24}
                              className="object-contain sm:w-8 sm:h-8"
                            />
                          </div>
                        )}
                        <span className="text-sm sm:text-lg font-semibold text-gray-900">{tech.name}</span>
                      </div>
                      {/* Fund badge - underneath on mobile, inline on desktop */}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${
                        tech.fund === 'Fund I' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {tech.fund}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 hidden sm:table-cell">
                    <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                      {tech.description}
                    </p>
                  </td>
                  <td className="px-3 sm:px-6 py-4">
                    <span className="text-xs sm:text-sm text-gray-700 font-medium">
                      {tech.category}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4">
                    <span className="text-xs sm:text-sm text-gray-700 font-medium">
                      {tech.region}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Results Count */}
      <div className="text-center mt-8">
        <p className="text-gray-600">
          Showing {filteredTechnologies.length} of {technologies.length} technologies
        </p>
      </div>
    </div>
  );
}
