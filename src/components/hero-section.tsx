'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TrendingUp, Users, Shield } from 'lucide-react';

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
            <div className="relative w-full max-w-md lg:max-w-lg">
              <Image
                src="/psalion_cubes.png"
                alt="Psalion Cubes"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100"
            variants={fadeInUp}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">$2.5B+</h3>
            <p className="text-gray-600">Assets Under Management</p>
          </motion.div>

          <motion.div
            className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100"
            variants={fadeInUp}
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600">Institutional Clients</p>
          </motion.div>

          <motion.div
            className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100"
            variants={fadeInUp}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">15+</h3>
            <p className="text-gray-600">Years of Excellence</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}