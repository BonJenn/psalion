'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Target, Users, ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PortfolioGrid from '@/components/portfolio-grid';
import InvestorGateModal from '@/components/investor-gate-modal';

export default function PsalionVCPage() {
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

  const investmentFocus = [
    {
      sector: 'Enterprise Software',
      description: 'B2B software solutions addressing critical business needs',
      percentage: 35,
      companies: 18
    },
    {
      sector: 'Financial Technology',
      description: 'Innovative fintech solutions for modern financial services',
      percentage: 25,
      companies: 12
    },
    {
      sector: 'Healthcare Technology',
      description: 'Digital health and medical technology innovations',
      percentage: 20,
      companies: 10
    },
    {
      sector: 'Cybersecurity',
      description: 'Advanced security solutions for enterprise and consumer markets',
      percentage: 20,
      companies: 10
    }
  ];

  const stageFocus = [
    {
      stage: 'Series A',
      description: 'Early growth companies with proven product-market fit',
      range: '$5M - $15M',
      companies: 15
    },
    {
      stage: 'Series B',
      description: 'Scaling companies with strong revenue growth',
      range: '$15M - $50M',
      companies: 20
    },
    {
      stage: 'Growth',
      description: 'Late-stage companies preparing for exit or IPO',
      range: '$50M - $200M',
      companies: 15
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
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Psalion <span className="text-green-600">VC</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Venture capital investments in high-growth technology companies with proven track records and strong fundamentals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleRequestAccess}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
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
              Strong returns through disciplined investment selection and active portfolio management.
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
              <div className="text-3xl font-bold text-green-600 mb-2">35%</div>
              <div className="text-gray-600">Net IRR</div>
              <div className="text-sm text-gray-500 mt-1">Since Inception</div>
            </motion.div>
            <motion.div
              className="text-center p-6 bg-gray-50 rounded-xl"
              variants={fadeInUp}
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">2.8x</div>
              <div className="text-gray-600">TVPI</div>
              <div className="text-sm text-gray-500 mt-1">Total Value</div>
            </motion.div>
            <motion.div
              className="text-center p-6 bg-gray-50 rounded-xl"
              variants={fadeInUp}
            >
              <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
              <div className="text-gray-600">Successful Exits</div>
              <div className="text-sm text-gray-500 mt-1">IPOs & Acquisitions</div>
            </motion.div>
            <motion.div
              className="text-center p-6 bg-gray-50 rounded-xl"
              variants={fadeInUp}
            >
              <div className="text-3xl font-bold text-orange-600 mb-2">$500M</div>
              <div className="text-gray-600">Assets Under Management</div>
              <div className="text-sm text-gray-500 mt-1">As of Q4 2023</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Investment Focus */}
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
              Investment Focus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Concentrated portfolio approach targeting high-growth technology sectors with significant market opportunities.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {investmentFocus.map((focus, index) => (
              <motion.div
                key={focus.sector}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
                variants={fadeInUp}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{focus.sector}</h3>
                  <div className="text-2xl font-bold text-green-600">{focus.percentage}%</div>
                </div>
                <p className="text-gray-600 mb-4">{focus.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${focus.percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-2">{focus.companies} portfolio companies</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stage Focus */}
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
              Investment Stages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multi-stage approach targeting companies from Series A through growth stage.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stageFocus.map((stage, index) => (
              <motion.div
                key={stage.stage}
                className="bg-gray-50 rounded-xl p-8 text-center"
                variants={fadeInUp}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{stage.stage}</h3>
                <p className="text-gray-600 mb-4">{stage.description}</p>
                <div className="text-lg font-semibold text-green-600 mb-2">{stage.range}</div>
                <div className="text-sm text-gray-500">{stage.companies} companies</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Companies */}
      <PortfolioGrid />

      {/* Investment Process */}
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
              Investment Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rigorous due diligence and selection process to identify the most promising investment opportunities.
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
              className="text-center"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Sourcing</h3>
              <p className="text-gray-600 text-sm">Proactive identification of high-potential companies through our extensive network</p>
            </motion.div>

            <motion.div
              className="text-center"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 size={32} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Due Diligence</h3>
              <p className="text-gray-600 text-sm">Comprehensive analysis of business model, market opportunity, and team</p>
            </motion.div>

            <motion.div
              className="text-center"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Investment</h3>
              <p className="text-gray-600 text-sm">Strategic capital deployment with active portfolio management</p>
            </motion.div>

            <motion.div
              className="text-center"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Value Creation</h3>
              <p className="text-gray-600 text-sm">Active support and guidance to maximize company growth and value</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Restricted Content */}
      {!hasAccess && (
        <section className="py-20 bg-white">
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
                Detailed portfolio information, investment documents, and performance data are available exclusively to qualified professional investors.
              </p>
              <Button
                onClick={handleRequestAccess}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
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
