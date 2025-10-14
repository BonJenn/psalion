'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AwardsSection() {
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

  const awards = [
    {
      logo: '/awards/preqin.png',
      award: '#1 Top Performing Hedge Fund in 2021',
      organization: 'Preqin'
    },
    {
      logo: '/awards/preqin.png',
      award: '#1 Top Performing Crypto Fund in 2021',
      organization: 'Preqin'
    },
    {
      logo: '/awards/crypto_research_fund.png',
      award: '#1 Top Performing Crypto Fund in 2021',
      organization: 'Crypto Fund Research'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-400 uppercase tracking-wide">
              Awards
            </h2>
            <div className="flex-1 ml-4 border-t border-dashed border-gray-300"></div>
          </div>
        </motion.div>

        {/* Awards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {awards.map((award, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={fadeInUp}
            >
              {/* Desktop: Hover to reveal award */}
              <div className="hidden md:block">
                <div className="relative h-40 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
                  <div className="relative w-32 h-20">
                    <Image
                      src={award.logo}
                      alt={award.organization}
                      fill
                      className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  
                  {/* Hover overlay with award text */}
                  <div className="absolute inset-0 bg-white bg-opacity-95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col items-center justify-center p-6">
                    <div className="relative w-28 h-16 mb-4">
                      <Image
                        src={award.logo}
                        alt={award.organization}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-base font-semibold text-gray-900 text-center leading-tight">
                      {award.award}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile: Always show award text */}
              <div className="md:hidden">
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-28 h-16 mb-6">
                      <Image
                        src={award.logo}
                        alt={award.organization}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-base font-semibold text-gray-900 leading-tight">
                      {award.award}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
