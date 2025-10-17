'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import BubbleMatrix from './BubbleMatrix';

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

export default function PsalionVCPage() {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-16 pb-4 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Driving innovation in digital assets.
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Psalion VC is committed to empowering the next generation of blockchain and digital asset innovators.
              </p>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                By investing in cutting-edge startups, we drive the development of technologies that enhance transparency, security, and efficiency across various industries.
              </p>
            </motion.div>

            {/* Right Column - 3D Cube */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-full max-w-2xl h-[600px] lg:h-[700px] overflow-hidden">
                <SplineFallback />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Logos Section */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Solana */}
            <motion.a
              href="https://solana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 relative">
                <Image
                  src="/asset_logos/1.solana_logo.png"
                  alt="Solana logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Solana</span>
            </motion.a>

            {/* AAVE */}
            <motion.a
              href="https://aave.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 relative">
                <Image
                  src="/asset_logos/2.aave_logo.png"
                  alt="AAVE logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">AAVE</span>
            </motion.a>

            {/* SushiSwap */}
            <motion.a
              href="https://sushi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 relative">
                <Image
                  src="/asset_logos/3.sushiswap_logo.png"
                  alt="SushiSwap logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">SushiSwap</span>
            </motion.a>

            {/* Polkadot */}
            <motion.a
              href="https://polkadot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 relative">
                <Image
                  src="/asset_logos/4.polkadot_logo.png"
                  alt="Polkadot logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Polkadot</span>
            </motion.a>

            {/* Mintify */}
            <motion.a
              href="https://app.mintify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 relative">
                <Image
                  src="/asset_logos/5.mintify_logo.png"
                  alt="Mintify logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Mintify</span>
            </motion.a>

            {/* Arkis */}
            <motion.a
              href="https://arkis.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 relative">
                <Image
                  src="/asset_logos/6.arkis_logo.png"
                  alt="Arkis logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Arkis</span>
            </motion.a>

            {/* Hinkal */}
            <motion.a
              href="https://hinkal.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 relative">
                <Image
                  src="/asset_logos/7.hinkal_logo.png"
                  alt="Hinkal logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Hinkal</span>
            </motion.a>

            {/* Usual */}
            <motion.a
              href="https://usual.money"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 relative">
                <Image
                  src="/asset_logos/8.usual_logo.png"
                  alt="Usual logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Usual</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* BubbleMatrix Component */}
      <BubbleMatrix />
    </div>
  );
}
