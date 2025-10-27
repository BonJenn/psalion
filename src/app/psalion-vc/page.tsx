'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect, Component } from 'react';
import BubbleMatrix from './BubbleMatrix';
import TechnologiesChart from './TechnologiesChart';

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
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-200 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-200 rounded-full blur-lg"></div>
      </div>
      
      {/* Content */}
      <div className="text-center z-10">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive 3D Model</h3>
        <p className="text-gray-600 text-sm">3D visualization requires WebGL support</p>
      </div>
    </div>
  );
}

// Error boundary component to catch WebGL errors
class SplineErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Check if it's a WebGL-related error
    if (error.message && (
      error.message.includes('WebGL') || 
      error.message.includes('THREE.WebGLRenderer') ||
      error.message.includes('Error creating WebGL context')
    )) {
      return { hasError: true };
    }
    return null;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error but don't crash the app
    console.log('Spline Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <SplineFallback />;
    }

    return this.props.children;
  }
}

// Check if WebGL is supported and working
function hasWorkingWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.log('WebGL: No context available');
      return false;
    }
    
    // Just test basic WebGL functionality, don't be too strict
    const webglContext = gl as WebGLRenderingContext;
    const program = webglContext.createProgram();
    if (!program) {
      console.log('WebGL: Cannot create program');
      return false;
    }
    
    webglContext.deleteProgram(program);
    console.log('WebGL: Working correctly');
    return true;
  } catch (e) {
    console.log('WebGL: Error during test:', e);
    return false;
  }
}

// Check if we're in Chrome
function isChrome(): boolean {
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  console.log('Browser detection - Chrome:', isChrome);
  return isChrome;
}

// Direct Spline component - prevent loading in problematic Chrome environments
function DirectSpline({ scene, style }: { scene: string; style: React.CSSProperties }) {
  const [showFallback, setShowFallback] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    console.log('DirectSpline: Starting WebGL check...');
    const webglWorks = hasWorkingWebGL();
    const isChromeBrowser = isChrome();
    
    console.log('DirectSpline: WebGL works:', webglWorks, 'Chrome:', isChromeBrowser);
    
    // Let Spline attempt to load regardless of WebGL detection
    // The Error Boundary will catch any runtime errors
    console.log('DirectSpline: Allowing Spline to attempt loading');
    
    // Set a timeout to show fallback if Spline doesn't load within 15 seconds
    const timeout = setTimeout(() => {
      if (!splineLoaded) {
        console.log('DirectSpline: Timeout reached, showing fallback');
        setShowFallback(true);
        setIsLoading(false);
      }
    }, 15000);

    return () => clearTimeout(timeout);
  }, [splineLoaded]);

  // Suppress WebGL errors in console without affecting functionality
  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args) => {
      const message = args.join(' ');
      if (message.includes('WebGL') || message.includes('THREE.WebGLRenderer')) {
        return; // Just suppress, don't change behavior
      }
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      const message = args.join(' ');
      if (message.includes('WebGL') || message.includes('THREE.WebGLRenderer')) {
        return; // Just suppress, don't change behavior
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  if (!mounted) {
    return <SplineLoading />;
  }

  if (showFallback) {
    return <SplineFallback />;
  }

  return (
    <SplineErrorBoundary>
      {isLoading && <SplineLoading />}
      <SplineComponent
        scene={scene}
        style={{
          ...style,
          opacity: isLoading ? 0 : 1,
          pointerEvents: isLoading ? 'none' : 'auto',
          transition: 'opacity 150ms ease'
        }}
        onLoad={() => {
          console.log('DirectSpline: Spline loaded successfully');
          setSplineLoaded(true);
          setTimeout(() => setIsLoading(false), 200);
        }}
        onError={(error: any) => {
          console.log('DirectSpline: Spline onError triggered:', error);
          setShowFallback(true);
        }}
      />
    </SplineErrorBoundary>
  );
}

export default function PsalionVCPage() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(pointer: coarse), (max-width: 640px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      const matches = 'matches' in e ? (e as MediaQueryListEvent).matches : (e as MediaQueryList).matches;
      setIsMobile(matches);
    };
    setIsMobile(mql.matches);
    if (mql.addEventListener) mql.addEventListener('change', handler as (ev: Event) => void);
    else (mql as any).addListener(handler);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', handler as (ev: Event) => void);
      else (mql as any).removeListener(handler);
    };
  }, []);
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Khteka, var(--font-inter), ui-sans-serif, system-ui' }}>
      {/* Hero Section */}
      <section className="pt-16 pb-4 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              className="space-y-6 -mt-2 md:-mt-3"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-4 leading-tight tracking-tight">
                Driving innovation
                <br />
                in digital assets.
              </h1>
              
              <p className="text-sm md:text-base text-gray-600 mb-4 leading-snug">
                Psalion VC is committed to empowering the next generation
                <br />
                of blockchain and digital asset innovators.
              </p>
              
              <p className="text-sm md:text-base text-gray-600 mb-4 leading-snug">
                By investing in cutting-edge startups, we drive the
                <br />
                development of technologies that enhance transparency,
                <br />
                security, and efficiency across various industries.
              </p>
            </motion.div>

            {/* Right Column - 3D Cube */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
                {isMobile ? (
                  <Image src="/psalion_cubes.png" alt="Psalion visualization" fill className="object-contain" priority />
                ) : (
                  <DirectSpline
                    scene="https://cdn.jsdelivr.net/gh/Altalogy/spline-runtime@v1.0.3/psalion/funds.splinecode"
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      transform: 'scale(1.2)',
                      transformOrigin: 'center',
                      touchAction: 'pan-y',
                      opacity: 0,
                      transition: 'opacity 200ms ease'
                    }}
                  />
                )}
                {/* Bottom fade gradient */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28 md:h-32 bg-gradient-to-b from-transparent to-white" />
                {/* Side fade gradients */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-10 sm:w-12 md:w-16 bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-10 sm:w-12 md:w-16 bg-gradient-to-l from-white to-transparent" />
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

            {/* Sushi */}
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
                  alt="Sushi logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Sushi</span>
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

      {/* Technologies Chart Component */}
      <TechnologiesChart />
    </div>
  );
}
