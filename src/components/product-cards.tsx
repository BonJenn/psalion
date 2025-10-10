'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Building2, Briefcase } from 'lucide-react';

export default function ProductCards() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const products = [
    {
      title: 'Psalion Yield',
      description: 'Institutional-grade fixed income and credit strategies designed for sophisticated investors seeking stable, risk-adjusted returns.',
      icon: BarChart3,
      href: '/psalion-yield',
      features: ['Credit Strategies', 'Fixed Income', 'Risk Management', 'Institutional Focus'],
      color: 'blue'
    },
    {
      title: 'Psalion VC',
      description: 'Venture capital investments in high-growth technology companies with proven track records and strong fundamentals.',
      icon: Building2,
      href: '/psalion-vc',
      features: ['Early Stage', 'Growth Capital', 'Technology Focus', 'Portfolio Management'],
      color: 'green'
    },
    {
      title: 'Bespoke Services',
      description: 'Customized investment solutions tailored to meet the specific needs and objectives of institutional clients.',
      icon: Briefcase,
      href: '/bespoke-services',
      features: ['Custom Solutions', 'Advisory Services', 'Portfolio Construction', 'Risk Consulting'],
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'bg-blue-100 text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        bg: 'bg-green-50',
        icon: 'bg-green-100 text-green-600',
        button: 'bg-green-600 hover:bg-green-700'
      },
      purple: {
        bg: 'bg-purple-50',
        icon: 'bg-purple-100 text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
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
            Our Investment Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive investment products and services designed for institutional and high-net-worth clients.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {products.map((product, index) => {
            const Icon = product.icon;
            const colorClasses = getColorClasses(product.color);
            
            return (
              <motion.div
                key={product.title}
                className={`${colorClasses.bg} rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 group`}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 ${colorClasses.icon} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon size={32} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  asChild
                  className={`w-full ${colorClasses.button} text-white group-hover:shadow-md transition-all duration-300`}
                >
                  <Link href={product.href} className="flex items-center justify-center gap-2">
                    Learn More
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
