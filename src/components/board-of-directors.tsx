'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function BoardOfDirectors() {
  const [selectedDirector, setSelectedDirector] = useState(0);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const directors = [
    {
      name: 'Timothy Enneking',
      image: '/board_of_directors/timothy-enneking.png',
      title: 'Managing Partner',
      description: 'Timothy Enneking is a highly successful senior executive with a consistent record of achievement in completing transactions in finance and asset management, mergers and acquisitions and operations (including turnarounds and startups).\n\nTimothy has over 35 years of experience throughout Europe, the US and in Asia, including over 15 years of fund and asset management experience, and extensive capital markets expertise in over 30 countries totaling over US$12 billion. Over his career, Timothy has managed both the then all-time best performing fund, Bitcoin Fund, (5,556.39% in its first full year) and the then all-time best performing fund of funds (both fiat and crypto – 356.68% in 2014). Timothy was previously the founder and chairman of the asset management company responsible for managing Tera Capital Fund, one of the world\'s first crypto currency trading funds.\n\nTimothy also manages Crypto Asset Fund, one of the first US crypto currency trading funds, and successfully launched Crypto30, the first professional index in the crypto space.',
      isTimothy: true
    },
    {
      name: 'Julien Jost',
      image: '/board_of_directors/julien-jost.png',
      title: 'Chief Commercial Officer',
      description: 'Since completing his master\'s degree in business administration from ESADE Business School (Barcelona, Spain) in 2009, Julien has specialized in securing investment funding and business internationalization at regional, national and continental levels.\n\nDuring the 15+ years he has relied on those skills, Julien has worked in eight countries on three different continents.\n\nImmediately prior to the creation of Psalion, Julien worked closely with institutions and the European Commission on funding and investment management.\n\nGiven his traditional background, combined with his understanding of blockchain and crypto asset sectors, Julien is well-positioned to advise high net worth individuals, family offices and institutions on their investments in them.'
    },
    {
      name: 'Loan Venkatapen',
      image: '/board_of_directors/loan-venkatapen.png',
      title: 'Chief Technical Officer',
      description: 'Loan Venkatapen brings over 15 years of experience in the engineering sector, with extensive expertise in blockchain infrastructure. He has collaborated with global technical teams to design and implement advanced blockchain solutions across various regions, including Africa, Southeast Asia, Europe, South America, and Africa.\n\nLoan holds a certification in Blockchain Strategy from Oxford University, complemented by a Master of Science and a Bachelor\'s degree in Mathematics. This educational background, combined with his certification, provides him with a profound understanding of blockchain technology and the digital asset ecosystem. His technical proficiency enables him to contribute effectively to the development and optimization of blockchain infrastructure.\n\nLoan is recognized as a leading technical specialist in decentralized finance, acknowledged by his peers for his deep technical knowledge and innovative contributions to the field.'
    }
  ];

  return (
    <section id="team" className="pt-16 pb-16 md:py-20 bg-white">
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-wide">
              Psalion Board of Directors
            </h2>
            <div className="flex-1 ml-4 border-t border-dashed border-gray-300"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start min-h-[520px] md:min-h-[560px] lg:min-h-[600px]">
          {/* Directors List */}
          <motion.div
            className="space-y-4"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {directors.map((director, index) => (
              <motion.div
                key={director.name}
                className={`cursor-pointer transition-all duration-300 p-4 rounded-lg ${
                  selectedDirector === index 
                    ? 'bg-gray-100 shadow-sm' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedDirector(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={director.image}
                      alt={director.name}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                  <h3 className={`text-lg font-semibold ${
                    selectedDirector === index ? 'text-gray-900' : 'text-gray-700'
                  }`}>
                    {director.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Director Description */}
          <motion.div
            className="lg:pl-8 mt-8 lg:mt-0 h-[360px] sm:h-[380px] md:h-[420px] lg:h-[460px] pr-2 relative overflow-hidden"
            key={selectedDirector}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 overflow-y-auto pb-16 pr-2">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {directors[selectedDirector].title}
                </h3>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  {directors[selectedDirector].description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Always-visible regular commentator row for Timothy Enneking */}
            {directors[selectedDirector].isTimothy && (
              <div className="absolute bottom-0 left-0 right-0 bg-white pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 pl-0.5">
                  <span className="text-sm text-gray-600">Regular commentator for</span>
                  <div className="relative w-20 h-8">
                    <Image
                      src="/forbes_logo.png"
                      alt="Forbes"
                      width={80}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-gray-400 text-sm">and</span>
                  <div className="relative w-24 h-8">
                    <Image
                      src="/business_insider_logo.png"
                      alt="Business Insider"
                      width={96}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
