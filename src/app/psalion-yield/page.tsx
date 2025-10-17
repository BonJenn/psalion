'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Loading 3D model...</div>
    </div>
  ),
});

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
                  <div className="w-full max-w-4xl h-[600px] lg:h-[700px]">
                <Spline
                  scene="https://prod.spline.design/x7emdz5Mo6GlTTWV/scene.splinecode"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    transform: 'scale(1.5)',
                    transformOrigin: 'center'
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional content sections can be added here */}
    </div>
  );
}