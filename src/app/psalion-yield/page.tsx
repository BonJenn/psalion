'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Shield, Target, ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InvestorGateModal from '@/components/investor-gate-modal';

export default function PsalionYieldPage() {
  const [showInvestorGate, setShowInvestorGate] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

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

  const strategies = [
    {
      name: 'Corporate Credit',
      description: 'Investment-grade and high-yield corporate bonds with active management.',
      return: '6.5%',
      risk: 'Medium',
      minInvestment: '$1M'
    },
    {
      name: 'Structured Credit',
      description: 'Asset-backed securities and collateralized loan obligations.',
      return: '8.2%',
      risk: 'Medium-High',
      minInvestment: '$2M'
    },
    {
      name: 'Private Credit',
      description: 'Direct lending and private debt investments in middle-market companies.',
      return: '9.8%',
      risk: 'High',
      minInvestment: '$5M'
    }
  ];

  const features = [
    {
      icon: BarChart3,
      title: 'Proven Track Record',
      description: '15+ years of consistent performance across market cycles'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Comprehensive risk controls and portfolio diversification'
    },
    {
      icon: Target,
      title: 'Custom Solutions',
      description: 'Tailored strategies to meet specific client objectives'
    },
    {
      icon: TrendingUp,
      title: 'Active Management',
      description: 'Dynamic allocation based on market conditions and opportunities'
    }
  ];

  const handleRequestAccess = () => {
    setShowInvestorGate(true);
  };

  const handleAccessGranted = () => {
    setHasAccess(true);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Psalion <span className="text-blue-600">Yield</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Institutional-grade fixed income and credit strategies designed for sophisticated investors seeking stable, risk-adjusted returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleRequestAccess}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Request Access
                <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3"
              >
                Download Fact Sheet
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Performance Overview */}
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
              Performance Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Consistent returns with disciplined risk management across all market environments.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center p-6 bg-gray-50 rounded-xl"
              variants={fadeInUp}
            >
              <div className="text-3xl font-bold text-green-600 mb-2">8.2%</div>
              <div className="text-gray-600">Annualized Return</div>
              <div className="text-sm text-gray-500 mt-1">Since Inception</div>
            </motion.div>
            <motion.div
              className="text-center p-6 bg-gray-50 rounded-xl"
              variants={fadeInUp}
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">4.1%</div>
              <div className="text-gray-600">Volatility</div>
              <div className="text-sm text-gray-500 mt-1">Annualized</div>
            </motion.div>
            <motion.div
              className="text-center p-6 bg-gray-50 rounded-xl"
              variants={fadeInUp}
            >
              <div className="text-3xl font-bold text-purple-600 mb-2">2.0</div>
              <div className="text-gray-600">Sharpe Ratio</div>
              <div className="text-sm text-gray-500 mt-1">Risk-Adjusted</div>
            </motion.div>
            <motion.div
              className="text-center p-6 bg-gray-50 rounded-xl"
              variants={fadeInUp}
            >
              <div className="text-3xl font-bold text-orange-600 mb-2">$2.1B</div>
              <div className="text-gray-600">Assets Under Management</div>
              <div className="text-sm text-gray-500 mt-1">As of Q4 2023</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Investment Strategies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Investment Strategies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diversified credit strategies targeting different risk-return profiles and market segments.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {strategies.map((strategy, index) => (
              <motion.div
                key={strategy.name}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{strategy.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{strategy.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Expected Return</span>
                    <span className="font-semibold text-green-600">{strategy.return}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Risk Level</span>
                    <span className="font-semibold text-gray-900">{strategy.risk}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Minimum Investment</span>
                    <span className="font-semibold text-gray-900">{strategy.minInvestment}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
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
              Why Choose Psalion Yield
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Institutional-grade investment management with a focus on risk-adjusted returns and client service.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="text-center"
                  variants={fadeInUp}
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Restricted Content */}
      {!hasAccess && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={40} className="text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Professional Investor Access Required
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Detailed performance data, investment documents, and portfolio insights are available exclusively to qualified professional investors.
              </p>
              <Button
                onClick={handleRequestAccess}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Request Access
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Investor Gate Modal */}
      <InvestorGateModal
        isOpen={showInvestorGate}
        onClose={() => setShowInvestorGate(false)}
        onAccessGranted={handleAccessGranted}
      />
    </div>
  );
}
