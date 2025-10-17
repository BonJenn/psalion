'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Fallback component for when WebGL fails
function SplineFallback() {
  return (
    <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">3D Model</h3>
        <p className="text-sm text-gray-500">Interactive 3D visualization</p>
      </div>
    </div>
  );
}

export default function PsalionYieldPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-16 pb-8 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              className="space-y-6 lg:col-span-2"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Psalion Yield is a unique, fully liquid strategy that offers attractive returns for investment, cash management or white-label distribution.
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                The strategy can be accessed either via Separately Managed Accounts (SMAs) or via Psalion's Yield Funds.
              </p>
            </motion.div>

            {/* Right Column - 3D Cube */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
                  <div className="w-full max-w-4xl h-[600px] lg:h-[700px] overflow-hidden">
                <SplineFallback />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: High yields */}
            <motion.div
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-4">
                <Image
                  src="/psalion_yield/high_yields.png"
                  alt="High yields icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">High yields</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Consistent performance</li>
                <li>• 4-year track record</li>
              </ul>
            </motion.div>

            {/* Feature 2: Strict risk-management strategy */}
            <motion.div
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-4">
                <Image
                  src="/psalion_yield/strict_risk_management_strategy.png"
                  alt="Risk management icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Strict risk-management strategy</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Structural</li>
                <li>• Operational</li>
                <li>• Managerial</li>
              </ul>
            </motion.div>

            {/* Feature 3: Fully liquid */}
            <motion.div
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-4">
                <img
                  src="/psalion_yield/fully_liquid.png"
                  alt="Fully liquid icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Fully liquid</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• SMAs:</li>
                <li>• 6-hour liquidity</li>
                <li>• Yield Funds:</li>
                <li>• 24-hour liquidity</li>
              </ul>
            </motion.div>

            {/* Feature 4: Top-tier custodians */}
            <motion.div
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-4">
                <img
                  src="/psalion_yield/top_tier_custodians.png"
                  alt="Top-tier custodians icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Top-tier custodians</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 100% Custodial</li>
                <li>• SMAs:</li>
                <li>• Investor can retain ownership and possession of assets</li>
              </ul>
            </motion.div>

            {/* Feature 5: Limited fees */}
            <motion.div
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-4">
                <img
                  src="/psalion_yield/limited_fees.png"
                  alt="Limited fees icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Limited fees</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• SMAs:</li>
                <li>• No deposit, withdrawal, entry, exit or management fees</li>
                <li>• Only a performance fee</li>
                <li>• Yield Funds:</li>
                <li>• 1.5% / 20% Fee structure</li>
                <li>• No deposit, withdrawal, entry or exit fees</li>
              </ul>
            </motion.div>

            {/* Feature 6: Several native currencies */}
            <motion.div
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-4">
                <Image
                  src="/psalion_yield/several_native_currencies.png"
                  alt="Native currencies icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Several native currencies</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• SMAs:</li>
                <li>• Earn more dollars by opening a USDC or USDT account</li>
                <li>• Earn more euros by opening a EURC account</li>
                <li>• Earn more cryptocurrency by opening a BTC, ETH or SOL account</li>
                <li>• Other currencies on demand</li>
                <li>• Yield Funds:</li>
                <li>• Only available for dollar yield at this stage</li>
              </ul>
            </motion.div>

            {/* Feature 7: Earn yield regardless of market trends */}
            <motion.div
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-4">
                <Image
                  src="/psalion_yield/earn_yield_regardless_of_market_trends.png"
                  alt="Market trends icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Earn yield regardless of market trends</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Zero market exposure (only exposure is to the chosen native currency of the SMA)</li>
                <li>• No Impermanent loss</li>
              </ul>
            </motion.div>

            {/* Feature 8: Account transparency & frequent reporting */}
            <motion.div
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-4">
                <Image
                  src="/psalion_yield/account_transparency_&_frequent_reporting.png"
                  alt="Transparency icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Account transparency & frequent reporting</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• SMAs:</li>
                <li>• Personal dashboard</li>
                <li>• On-chain transparency</li>
                <li>• Daily performance email</li>
                <li>• Monthly statement</li>
                <li>• Live third-party valuation</li>
                <li>• Yield Funds:</li>
                <li>• Third-party administration and reporting</li>
              </ul>
            </motion.div>

            {/* Feature 9: Regulatory & Licensing */}
            <motion.div
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-4">
                <Image
                  src="/psalion_yield/regulatory_&_licensing.png"
                  alt="Regulatory icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Regulatory & Licensing</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Bitcoin Service Provider (El Salvador)</li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom text */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-600">
              References from institutions, family offices and private investors available upon request.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}