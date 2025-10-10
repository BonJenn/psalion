'use client';

import { motion } from 'framer-motion';
import { Target, Users, BarChart3, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BespokeServicesPage() {
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

  const services = [
    {
      icon: Target,
      title: 'Portfolio Construction',
      description: 'Custom portfolio design tailored to your specific risk tolerance, return objectives, and investment constraints.',
      features: [
        'Asset allocation optimization',
        'Risk budgeting and management',
        'Liquidity planning',
        'Tax-efficient structuring'
      ]
    },
    {
      icon: BarChart3,
      title: 'Investment Advisory',
      description: 'Strategic investment guidance and ongoing portfolio management support for institutional clients.',
      features: [
        'Market outlook and strategy',
        'Manager selection and due diligence',
        'Performance monitoring',
        'Rebalancing recommendations'
      ]
    },
    {
      icon: Shield,
      title: 'Risk Consulting',
      description: 'Comprehensive risk assessment and management solutions to protect and optimize your investment portfolio.',
      features: [
        'Risk framework development',
        'Stress testing and scenario analysis',
        'Compliance and regulatory support',
        'Risk reporting and monitoring'
      ]
    },
    {
      icon: Users,
      title: 'Family Office Services',
      description: 'Comprehensive wealth management solutions for ultra-high-net-worth families and family offices.',
      features: [
        'Multi-generational planning',
        'Alternative investment access',
        'Tax and estate planning coordination',
        'Family governance support'
      ]
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Analysis',
      description: 'Comprehensive assessment of your investment objectives, constraints, and current portfolio structure.'
    },
    {
      step: '02',
      title: 'Strategy Development',
      description: 'Custom investment strategy design incorporating your specific requirements and market opportunities.'
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Execution of the investment strategy with careful attention to timing, costs, and risk management.'
    },
    {
      step: '04',
      title: 'Ongoing Management',
      description: 'Continuous monitoring, reporting, and optimization to ensure alignment with your objectives.'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Bespoke <span className="text-purple-600">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Customized investment solutions tailored to meet the specific needs and objectives of institutional clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                <Link href="/contact" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Download Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
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
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive investment solutions designed to address the unique challenges and opportunities of institutional investors.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={32} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Our Process */}
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
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to developing and implementing customized investment solutions.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {processSteps.map((step) => (
              <motion.div
                key={step.step}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              Why Choose Psalion
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deep expertise, institutional focus, and commitment to client success.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center p-8 bg-gray-50 rounded-xl"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Institutional Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                Dedicated exclusively to serving institutional investors with sophisticated needs and complex requirements.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-gray-50 rounded-xl"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Expertise</h3>
              <p className="text-gray-600 leading-relaxed">
                Over 15 years of experience managing institutional portfolios across diverse market conditions.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-gray-50 rounded-xl"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Risk Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive risk management framework ensuring capital preservation and consistent returns.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Client Testimonials */}
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
              Client Testimonials
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What our institutional clients say about working with Psalion.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
              variants={fadeInUp}
            >
              <div className="mb-4">
                <div className="flex text-yellow-400 mb-2">
                  {'★'.repeat(5)}
                </div>
                <p className="text-gray-600 italic leading-relaxed">
                  &ldquo;Psalion&apos;s bespoke approach has been instrumental in helping us achieve our investment objectives. Their deep understanding of institutional needs and customized solutions have exceeded our expectations.&rdquo;
                </p>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold text-gray-900">Sarah Johnson</div>
                <div className="text-sm text-gray-600">Chief Investment Officer, State Pension Fund</div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
              variants={fadeInUp}
            >
              <div className="mb-4">
                <div className="flex text-yellow-400 mb-2">
                  {'★'.repeat(5)}
                </div>
                <p className="text-gray-600 italic leading-relaxed">
                  &ldquo;The team&apos;s expertise in alternative investments and risk management has been invaluable. They&apos;ve helped us navigate complex market conditions while maintaining our risk parameters.&rdquo;
                </p>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold text-gray-900">Michael Chen</div>
                <div className="text-sm text-gray-600">Portfolio Manager, Insurance Company</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how our bespoke services can help you achieve your investment objectives.
            </p>
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
              <Link href="/contact" className="flex items-center gap-2">
                Contact Us Today
                <ArrowRight size={20} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
