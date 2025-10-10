'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">
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

          {/* Image */}
          <motion.div
            className="flex justify-center lg:justify-end order-last lg:order-last"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-2xl sm:max-w-3xl lg:max-w-2xl">
              <Image
                src="/psalion_cubes.png"
                alt="Psalion Cubes"
                width={800}
                height={800}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* VC Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mt-16"
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

          {/* VC Cube Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            variants={fadeInUp}
          >
            <div className="relative w-full max-w-md lg:max-w-lg">
              <Image
                src="/psalion_vc_cube.png"
                alt="Psalion VC Cube"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}