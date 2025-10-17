'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, Component } from 'react';
import { Compass } from 'lucide-react';

// Custom Spline loader with proper error handling
const loadSpline = async () => {
  try {
    const module = await import('@splinetool/react-spline');
    return module.Spline || module.default || module;
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

// WebGL detection function
function hasWorkingWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (!gl) return false;
    
    // Test basic WebGL functionality
    const program = (gl as WebGLRenderingContext).createProgram();
    if (!program) return false;
    
    (gl as WebGLRenderingContext).deleteProgram(program);
    return true;
  } catch {
    return false;
  }
}

// Browser detection function
function isChrome(): boolean {
  return navigator.userAgent.includes('Chrome') && !navigator.userAgent.includes('Edg');
}

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

// Spline Fallback Component
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
          <Compass className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive 3D Model</h3>
        <p className="text-gray-600 text-sm">3D visualization requires WebGL support</p>
      </div>
    </div>
  );
}

// Spline Error Boundary
class SplineErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
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
    console.log('Spline Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <SplineFallback />;
    }
    return this.props.children;
  }
}

// Direct Spline Component
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

  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args) => {
      const message = args.join(' ');
      if (message.includes('WebGL') || message.includes('THREE.WebGLRenderer')) {
        return;
      }
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      const message = args.join(' ');
      if (message.includes('WebGL') || message.includes('THREE.WebGLRenderer')) {
        return;
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
          display: isLoading ? 'none' : 'block'
        }}
        onLoad={() => {
          console.log('DirectSpline: Spline loaded successfully');
          setSplineLoaded(true);
          setIsLoading(false);
        }}
        onError={(error) => {
          console.log('DirectSpline: Spline onError triggered:', error);
          setShowFallback(true);
        }}
      />
    </SplineErrorBoundary>
  );
}

export default function BespokeServicesPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content - Text */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start gap-4">
              
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                    Your vision, our craft:<br />
                    <span className="text-gray-900">Bespoke services</span>
                  </h1>
                  <p className="text-base sm:text-lg text-gray-600 mt-6 leading-relaxed">
                    There are many ways to enter the digital assets realm. We help you find yours.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Spline 3D Model */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
                <DirectSpline
                  scene="https://cdn.jsdelivr.net/gh/Altalogy/spline-runtime@v1.0.3/psalion/bespoke.splinecode"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    transform: 'scale(1.2)',
                    transformOrigin: 'center'
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
