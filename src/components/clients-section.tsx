'use client';

import { motion } from 'framer-motion';
import { Globe, Building2, TrendingUp, Users } from 'lucide-react';

export default function ClientsSection() {
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

  const regions = [
    {
      name: 'North America',
      countries: ['United States', 'Canada'],
      clients: 180,
      aum: '$1.2B',
      color: 'blue'
    },
    {
      name: 'Europe',
      countries: ['United Kingdom', 'Germany', 'France', 'Switzerland', 'Netherlands'],
      clients: 120,
      aum: '$800M',
      color: 'green'
    },
    {
      name: 'Asia Pacific',
      countries: ['Japan', 'Singapore', 'Australia', 'Hong Kong'],
      clients: 95,
      aum: '$400M',
      color: 'purple'
    },
    {
      name: 'Middle East & Africa',
      countries: ['UAE', 'Saudi Arabia', 'South Africa'],
      clients: 45,
      aum: '$200M',
      color: 'orange'
    }
  ];

  const clientTypes = [
    {
      type: 'Pension Funds',
      count: 85,
      percentage: 25,
      description: 'Institutional retirement funds seeking diversified growth strategies'
    },
    {
      type: 'Insurance Companies',
      count: 65,
      percentage: 19,
      description: 'Life and property insurers managing long-term investment portfolios'
    },
    {
      type: 'Endowments & Foundations',
      count: 120,
      percentage: 35,
      description: 'Educational and charitable institutions with perpetual investment horizons'
    },
    {
      type: 'Family Offices',
      count: 70,
      percentage: 21,
      description: 'Private wealth management for ultra-high-net-worth families'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Global Client Base
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by institutional investors worldwide across diverse sectors and regions.
          </p>
        </motion.div>

        {/* Global Overview Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center p-6 bg-gray-50 rounded-xl"
            variants={fadeInUp}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">4</div>
            <div className="text-gray-600">Continents</div>
          </motion.div>

          <motion.div
            className="text-center p-6 bg-gray-50 rounded-xl"
            variants={fadeInUp}
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">340+</div>
            <div className="text-gray-600">Institutional Clients</div>
          </motion.div>

          <motion.div
            className="text-center p-6 bg-gray-50 rounded-xl"
            variants={fadeInUp}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">$2.6B</div>
            <div className="text-gray-600">Assets Under Management</div>
          </motion.div>

          <motion.div
            className="text-center p-6 bg-gray-50 rounded-xl"
            variants={fadeInUp}
          >
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
            <div className="text-gray-600">Countries</div>
          </motion.div>
        </motion.div>

        {/* Regional Distribution */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Regional Distribution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((region, index) => (
              <motion.div
                key={region.name}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">{region.name}</h4>
                  <div className={`w-3 h-3 rounded-full ${getColorClasses(region.color)}`}></div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="text-2xl font-bold text-gray-900">{region.clients}</div>
                  <div className="text-sm text-gray-600">Clients</div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="text-lg font-semibold text-gray-900">{region.aum}</div>
                  <div className="text-sm text-gray-600">AUM</div>
                </div>
                <div className="text-xs text-gray-500">
                  {region.countries.join(', ')}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Client Types */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Client Types
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clientTypes.map((clientType, index) => (
              <motion.div
                key={clientType.type}
                className="bg-gray-50 rounded-xl p-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{clientType.type}</h4>
                  <div className="text-2xl font-bold text-blue-600">{clientType.count}</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${clientType.percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{clientType.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
