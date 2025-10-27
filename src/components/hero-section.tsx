'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect, Component } from 'react';

// Custom Spline loader with proper error handling
const loadSpline = async () => {
  try {
    const { default: Spline } = (await import('@splinetool/react-spline')) as any;
    return Spline;
  } catch (error) {
    console.warn('Failed to load Spline:', error);
    return null;
  }
};

// Spline component with loading state
const SplineComponent = ({ scene, ...props }: any) => {
  const [Spline, setSpline] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadSpline().then((SplineComponent) => {
      if (SplineComponent) {
        setSpline(() => SplineComponent);
      } else {
        setHasError(true);
      }
      setIsLoading(false);
    });
  }, []);

  // Don't render anything during SSR
  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (hasError || !Spline) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">3D model unavailable</div>
      </div>
    );
  }

  return <Spline scene={scene} {...props} />;
};

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
      <SplineComponent
        scene="https://cdn.jsdelivr.net/gh/Altalogy/spline-runtime@v1.0.3/psalion/home.splinecode"
        onLoad={() => {
          // Brief delay to avoid skinny -> normal snap, then enable immediately
          setSplineLoaded(true);
          setTimeout(() => setIsLoading(false), 200);
        }}
        style={{
          width: '100%',
          height: '100%',
          transform: 'scale(1.05)',
          transformOrigin: 'center',
          opacity: isLoading ? 0 : 1,
          pointerEvents: isLoading ? 'none' : 'auto',
          touchAction: 'pan-y',
          transition: 'opacity 200ms ease'
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

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(pointer: coarse), (max-width: 640px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      // MediaQueryListEvent for modern, MediaQueryList for initial set
      const matches = 'matches' in e ? (e as MediaQueryListEvent).matches : (e as MediaQueryList).matches;
      setIsMobile(matches);
    };
    setIsMobile(mql.matches);
    // add/remove listeners compatibly
    if (mql.addEventListener) mql.addEventListener('change', handler as (ev: Event) => void);
    else (mql as any).addListener(handler);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', handler as (ev: Event) => void);
      else (mql as any).removeListener(handler);
    };
  }, []);

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <motion.div
            className="text-left"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Main Heading */}
            <motion.h1
              className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-4 leading-tight tracking-tight"
              variants={fadeInUp}
            >
              Capital multipliers
              <br />
              across the <span className="text-gray-800">blockchain</span>
              <br />
              asset class.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-sm md:text-base text-gray-600 mb-4 max-w-3xl leading-snug"
              variants={fadeInUp}
            >
              Psalion provides unique institutional-level investment
              <br />
              products tailored to private clients, family offices and
              <br />
              professional investors.
            </motion.p>

          </motion.div>

          {/* Spline 3D Model with Interactive Labels */}
          <motion.div
            className="flex justify-center lg:justify-center order-last lg:order-last"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-visible mx-auto lg:-translate-x-4 xl:-translate-x-6">
              {isMobile ? (
                <Image src="/psalion_cubes.png" alt="Psalion visualization" fill className="object-contain" priority />
              ) : (
                <DirectSpline />
              )}
              
              {/* Interactive Labels positioned around the 3D model */}
              <div className="absolute inset-0 pointer-events-none">
                {/* PSALION VC Label - Upper Left */}
                <motion.a
                  href="/psalion-vc"
                  className="absolute top-[6%] left-[14%] pointer-events-auto group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="relative inline-block px-1 rounded text-blue-700 font-normal text-base group-hover:text-blue-900 bg-gradient-to-r from-blue-100 to-blue-100 bg-left bg-no-repeat bg-[length:0%_100%] group-hover:bg-[length:100%_100%] transition-[background-size] duration-300" style={{ fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>PSALION VC</span>
                </motion.a>

                {/* PSALION YIELD Label - Upper Right */}
                <motion.a
                  href="/psalion-yield"
                  className="absolute top-[22%] sm:top-[44%] left-[58%] sm:left-[76%] md:left-[82%] lg:left-[84%] xl:left-[86%] 2xl:left-[88%] -translate-y-1/2 transform pointer-events-auto group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="relative inline-block px-1 rounded text-blue-700 font-normal text-base whitespace-nowrap group-hover:text-blue-900 bg-gradient-to-r from-blue-100 to-blue-100 bg-left bg-no-repeat bg-[length:0%_100%] group-hover:bg-[length:100%_100%] transition-[background-size] duration-300" style={{ fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>PSALION YIELD</span>
                </motion.a>

                {/* BESPOKE SERVICES Label - Lower Center */}
                <motion.a
                  href="/bespoke-services"
                  className="absolute bottom-[8%] sm:bottom-[12%] left-[6%] pointer-events-auto group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="relative inline-block px-1 rounded text-blue-700 font-normal text-base group-hover:text-blue-900 bg-gradient-to-r from-blue-100 to-blue-100 bg-left bg-no-repeat bg-[length:0%_100%] group-hover:bg-[length:100%_100%] transition-[background-size] duration-300" style={{ fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>BESPOKE SERVICES</span>
                </motion.a>
              </div>
              {/* Bottom fade gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28 md:h-32 bg-gradient-to-b from-transparent to-white" />
              {/* Side fade gradients (left gradient removed as requested) */}
            </div>
          </motion.div>
        </div>

        {/* Psalion VC Section Header */}
        <motion.div
          className="max-w-6xl mx-auto mt-6 md:mt-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div
            className="text-left"
            variants={fadeInUp}
          >
            <div className="flex items-center">
              <h2
                className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wide mb-0"
                style={{ fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
              >
                Psalion VC
              </h2>
              <div className="flex-1 ml-4 border-t border-dashed border-gray-200"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* VC Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center max-w-6xl mx-auto mt-2 md:-mt-12"
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-6 leading-tight">
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
              {isMobile ? (
                <Image
                  src="/psalion_vc_cube.png"
                  alt="Psalion VC visualization"
                  fill
                  priority
                  className="object-contain"
                  style={{ touchAction: 'pan-y' }}
                />
              ) : (
                <SplineErrorBoundary>
                  <SplineComponent
                    scene="https://cdn.jsdelivr.net/gh/Altalogy/spline-runtime@v1.0.3/psalion/funds.splinecode"
                    style={{
                      width: '100%',
                      height: '100%',
                      transform: 'scale(1.2)',
                      transformOrigin: 'center'
                    }}
                  />
                </SplineErrorBoundary>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Portfolio Logos Section */}
        <motion.div
          className="max-w-6xl mx-auto mt-10 md:mt-20"
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

            {/* Sushi */}
            <a
              href="https://sushi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-3">
                <Image
                  src="/asset_logos/3.sushiswap_logo.png"
                  alt="Sushi"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Sushi</span>
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

        {/* Learn More button removed */}
      </div>
    </section>
  );
}