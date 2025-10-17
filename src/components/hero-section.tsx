'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import React, { useState, useEffect, Component } from 'react';

// Dynamically import Spline with better error handling
const Spline = dynamic(() => 
  import('@splinetool/react-spline').then(mod => ({ default: mod.default })).catch(() => {
    // Fallback if import fails
    return { default: () => <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">3D model unavailable</div>
    </div> };
  }), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Loading 3D model...</div>
    </div>
  ),
});

// Loading animation component
function SplineLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 relative">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}

// Fallback component for when WebGL fails
function SplineFallback() {
  return (
    <div className="w-full h-[600px] lg:h-[700px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center relative overflow-hidden">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">3D Model</h3>
        <p className="text-gray-500">Interactive visualization</p>
      </div>
    </div>
  );
}

// WebGL detection function
function hasWorkingWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!(gl && gl instanceof WebGLRenderingContext);
  } catch (e) {
    return false;
  }
}

// Browser detection
function isChrome(): boolean {
  if (typeof window === 'undefined') return false;
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}

// Error boundary for Spline
class SplineErrorBoundary extends Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): {hasError: boolean} {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Spline Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <SplineFallback />;
    }

    return this.props.children;
  }
}

// Direct Spline component with loading animation and timeout fallback
function DirectSpline() {
  const [showFallback, setShowFallback] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to show fallback if Spline doesn't load
    const timeout = setTimeout(() => {
      if (!splineLoaded) {
        setShowFallback(true);
        setIsLoading(false);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [splineLoaded]);

  if (showFallback) {
    return <SplineFallback />;
  }

  return (
    <SplineErrorBoundary>
      {isLoading && <SplineLoading />}
      <Spline
        scene="https://cdn.jsdelivr.net/gh/Altalogy/spline-runtime@v1.0.3/psalion/home.splinecode"
        onLoad={() => {
          setSplineLoaded(true);
          setIsLoading(false);
        }}
        style={{
          width: '100%',
          height: '100%',
          transform: 'scale(1.2)',
          transformOrigin: 'center',
          display: isLoading ? 'none' : 'block'
        }}
      />
    </SplineErrorBoundary>
  );
}

export default function HeroSection() {
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

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="text-left"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Main Heading */}
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-4 leading-tight"
              variants={fadeInUp}
            >
              Capital multipliers
              <br />
              across the
              <br />
              <span className="text-black">blockchain</span>
              <br />
              asset class.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-6 max-w-3xl leading-snug"
              variants={fadeInUp}
            >
              Psalion provides unique institutional-level investment products tailored to private clients, family offices and professional investors.
            </motion.p>

          </motion.div>

          {/* Spline 3D Model with Interactive Labels */}
          <motion.div
            className="flex justify-center lg:justify-end order-last lg:order-last"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
              <DirectSpline />
              
              {/* Interactive Labels positioned around the 3D model */}
              <div className="absolute inset-0 pointer-events-none">
                {/* PSALION VC Label - Upper Left */}
                <motion.a
                  href="/psalion-vc"
                  className="absolute top-8 left-4 pointer-events-auto group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-800 transition-colors duration-200">PSALION VC</span>
                </motion.a>

                {/* PSALION YIELD Label - Upper Right */}
                <motion.a
                  href="/psalion-yield"
                  className="absolute top-16 right-4 pointer-events-auto group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-800 transition-colors duration-200">PSALION YIELD</span>
                </motion.a>

                {/* BESPOKE SERVICES Label - Lower Center */}
                <motion.a
                  href="/bespoke-services"
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-800 transition-colors duration-200">BESPOKE SERVICES</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Psalion VC Section Header */}
        <motion.div
          className="max-w-6xl mx-auto mt-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div
            className="text-left"
            variants={fadeInUp}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-400 uppercase tracking-wide">
              Psalion VC
            </h2>
          </motion.div>
        </motion.div>

        {/* VC Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mt-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Text Content */}
          <motion.div
            className="text-left"
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Driving innovation
              <br />
              in digital assets.
            </h2>
            
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Psalion VC is committed to empowering the next generation of blockchain and digital asset innovators.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              By investing in cutting-edge startups, we drive the development of technologies that enhance transparency, security, and efficiency across various industries.
            </p>
          </motion.div>

          {/* VC Spline 3D Model */}
          <motion.div
            className="flex justify-center lg:justify-end"
            variants={fadeInUp}
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
              <SplineErrorBoundary>
                <Spline
                  scene="https://cdn.jsdelivr.net/gh/Altalogy/spline-runtime@v1.0.3/psalion/funds.splinecode"
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: 'scale(1.2)',
                    transformOrigin: 'center'
                  }}
                />
              </SplineErrorBoundary>
            </div>
          </motion.div>
        </motion.div>

        {/* Portfolio Logos Section */}
        <motion.div
          className="max-w-6xl mx-auto mt-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6"
            variants={fadeInUp}
          >
            {/* Solana */}
            <a
              href="https://solana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-3">
                <Image
                  src="/asset_logos/1.solana_logo.png"
                  alt="Solana"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Solana</span>
            </a>

            {/* AAVE */}
            <a
              href="https://aave.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-3">
                <Image
                  src="/asset_logos/2.aave_logo.png"
                  alt="AAVE"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">AAVE</span>
            </a>

            {/* SushiSwap */}
            <a
              href="https://sushi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-3">
                <Image
                  src="/asset_logos/3.sushiswap_logo.png"
                  alt="SushiSwap"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">SushiSwap</span>
            </a>

            {/* Polkadot */}
            <a
              href="https://polkadot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-3">
                <Image
                  src="/asset_logos/4.polkadot_logo.png"
                  alt="Polkadot"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Polkadot</span>
            </a>

            {/* Mintify */}
            <a
              href="https://app.mintify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-3">
                <Image
                  src="/asset_logos/5.mintify_logo.png"
                  alt="Mintify"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Mintify</span>
            </a>

            {/* Arkis */}
            <a
              href="https://arkis.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-3">
                <Image
                  src="/asset_logos/6.arkis_logo.png"
                  alt="Arkis"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Arkis</span>
            </a>

            {/* Hinkal */}
            <a
              href="https://hinkal.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-3">
                <Image
                  src="/asset_logos/7.hinkal_logo.png"
                  alt="Hinkal"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Hinkal</span>
            </a>

            {/* Usual */}
            <a
              href="https://usual.money"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-3">
                <Image
                  src="/asset_logos/8.usual_logo.png"
                  alt="Usual"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Usual</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Learn More Button */}
        <motion.div
          className="flex justify-center mt-12"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <a
            href="/psalion-vc"
            className="inline-flex items-center px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}