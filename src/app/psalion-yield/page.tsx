'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect, Component, useRef } from 'react';

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
    const program = (gl as WebGLRenderingContext).createProgram();
    if (!program) {
      console.log('WebGL: Cannot create program');
      return false;
    }
    
    (gl as WebGLRenderingContext).deleteProgram(program);
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

export default function PsalionYieldPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileYieldSrc, setMobileYieldSrc] = useState<string>('/psalion_yield/hero.png');
  const [capturedSrc, setCapturedSrc] = useState<string | null>(null);
  const offscreenRef = useRef<HTMLDivElement | null>(null);
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-16 section-y pb-0 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              className="space-y-2 md:space-y-3 lg:col-span-2"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-800 leading-tight tracking-tight">
                Psalion Yield is a unique,
                <br />
                fully liquid strategy that
                <br />
                offers attractive returns
                <br />
                for investment, cash
                <br />
                management or white-
                <br />
                label distribution.
              </h1>

              <p className="text-sm md:text-base text-gray-600 leading-snug max-w-3xl">
                The strategy can be accessed either via Separately Managed
                <br />
                Accounts (SMAs) or via Psalion's Yield Funds.
              </p>
            </motion.div>

            {/* Right Column - 3D Cube */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden mx-auto lg:mx-0 lg:-translate-x-24 xl:-translate-x-32 2xl:-translate-x-40">
                {isMobile ? (
                  <>
                    <Image
                      src={capturedSrc ?? mobileYieldSrc}
                      alt="Psalion Yield visualization"
                      fill
                      className="object-contain"
                      priority
                      style={{ touchAction: 'pan-y' }}
                      onError={() => setMobileYieldSrc(prev => prev === '/psalion_yield/hero.png' ? '/psalion_yield_hero.png' : '/psalion_cubes.png')}
                    />
                    {!capturedSrc && (
                      <div ref={offscreenRef} style={{ position: 'fixed', top: -9999, left: -9999, width: 600, height: 600, opacity: 0, pointerEvents: 'none' }}>
                        <SplineComponent
                          scene="https://prod.spline.design/x7emdz5Mo6GlTTWV/scene.splinecode"
                          onLoad={() => {
                            setTimeout(() => {
                              const canvas = offscreenRef.current?.querySelector('canvas') as HTMLCanvasElement | undefined;
                              try {
                                if (canvas) {
                                  const data = canvas.toDataURL('image/png');
                                  setCapturedSrc(data);
                                }
                              } catch (e) {
                                // Ignore capture errors; fallback image remains
                              }
                            }, 300);
                          }}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <DirectSpline
                    scene="https://prod.spline.design/x7emdz5Mo6GlTTWV/scene.splinecode"
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      transform: 'scale(1.5)',
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

            {/* Features Grid Section */}
      <section className="pt-0 -mt-2 md:mt-0 section-y bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4">
            {/* Feature 1: High yields */}
            <motion.div
              className="border border-gray-200 rounded-lg p-4 md:p-5 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              viewport={{ once: true, amount: 0.15 }}
            >
              <div className="w-16 h-16 mb-3">
                <Image
                  src="/psalion_yield/high_yields.png"
                  alt="High yields icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">High yields</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                <li>Consistent performance</li>
                <li>5-year track record</li>
              </ul>
            </motion.div>

            {/* Feature 2: Strict risk-management strategy */}
            <motion.div
              className="border border-gray-200 rounded-lg p-4 md:p-5 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              viewport={{ once: true, amount: 0.15 }}
            >
              <div className="w-16 h-16 mb-3">
                <Image
                  src="/psalion_yield/strict_risk_management_strategy.png"
                  alt="Risk management icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Strict risk-management strategy</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                <li>Structural</li>
                <li>Operational</li>
                <li>Managerial</li>
              </ul>
            </motion.div>

            {/* Feature 3: Fully liquid */}
            <motion.div
              className="border border-gray-200 rounded-lg p-4 md:p-5 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              viewport={{ once: true, amount: 0.15 }}
            >
              <div className="w-16 h-16 mb-3">
                <Image
                  src="/psalion_yield/fully_liquid.png"
                  alt="Fully liquid icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Fully liquid</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                <li>SMAs:</li>
                <li>6-hour liquidity</li>
                <li>Yield Funds:</li>
                <li>24-hour liquidity</li>
              </ul>
            </motion.div>

            {/* Feature 4: Top-tier custodians */}
            <motion.div
              className="border border-gray-200 rounded-lg p-4 md:p-5 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-3">
                <img
                  src="/psalion_yield/top_tier_custodians.png"
                  alt="Top-tier custodians icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Top-tier custodians</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                <li>100% Custodial</li>
                <li>SMAs:</li>
                <li>Investor can retain ownership and possession of assets</li>
              </ul>
            </motion.div>

            {/* Feature 5: Limited fees */}
            <motion.div
              className="border border-gray-200 rounded-lg p-4 md:p-5 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-3">
                <img
                  src="/psalion_yield/limited_fees.png"
                  alt="Limited fees icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Limited fees</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                <li>SMAs:</li>
                <li>No deposit, withdrawal, entry, exit or management fees</li>
                <li>Only a performance fee</li>
                <li>Yield Funds:</li>
                <li>1.5% / 20% Fee structure</li>
                <li>No deposit, withdrawal, entry or exit fees</li>
              </ul>
            </motion.div>

            {/* Feature 6: Several native currencies */}
            <motion.div
              className="border border-gray-200 rounded-lg p-4 md:p-5 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-3">
                <Image
                  src="/psalion_yield/several_native_currencies.png"
                  alt="Native currencies icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Several native currencies</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                <li>SMAs:</li>
                <li>Earn more dollars by opening a USDC or USDT account</li>
                <li>Earn more euros by opening a EURC account</li>
                <li>Earn more cryptocurrency by opening a BTC, ETH or SOL account</li>
                <li>Other currencies on demand</li>
                <li>Yield Funds:</li>
                <li>Only available for dollar yield at this stage</li>
              </ul>
            </motion.div>

            {/* Feature 7: Earn yield regardless of market trends */}
            <motion.div
              className="border border-gray-200 rounded-lg p-4 md:p-5 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-3">
                <Image
                  src="/psalion_yield/earn_yield_regardless_of_market_trends.png"
                  alt="Market trends icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Earn yield regardless of market trends</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                <li>Zero market exposure (only exposure is to the chosen native currency of the SMA)</li>
                <li>No Impermanent loss</li>
              </ul>
            </motion.div>

            {/* Feature 8: Account transparency & frequent reporting */}
            <motion.div
              className="border border-gray-200 rounded-lg p-4 md:p-5 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-3">
                <Image
                  src="/psalion_yield/account_transparency_&_frequent_reporting.png"
                  alt="Transparency icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Account transparency & frequent reporting</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                <li>SMAs:</li>
                <li>Personal dashboard</li>
                <li>On-chain transparency</li>
                <li>Daily performance email</li>
                <li>Monthly statement</li>
                <li>Live third-party valuation</li>
                <li>Yield Funds:</li>
                <li>Third-party administration and reporting</li>
              </ul>
            </motion.div>

            {/* Feature 9: Regulatory & Licensing */}
            <motion.div
              className="border border-gray-200 rounded-lg p-4 md:p-5 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-3">
                <Image
                  src="/psalion_yield/regulatory_&_licensing.png"
                  alt="Regulatory icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Regulatory & Licensing</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                <li>Bitcoin Service Provider (El Salvador)</li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom text */}
          <motion.div
            className="text-center mt-4 md:mt-8"
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