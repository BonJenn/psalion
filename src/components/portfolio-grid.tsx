'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, TrendingUp, Users, MapPin } from 'lucide-react';

interface PortfolioCompany {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  stage: string;
  sector: string;
  location: string;
  employees: string;
  founded: number;
  status: 'active' | 'exited';
}

export default function PortfolioGrid() {
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

  // Sample portfolio data - in production, this would come from CMS
  const portfolioCompanies: PortfolioCompany[] = [
    {
      id: '1',
      name: 'TechFlow Solutions',
      description: 'AI-powered workflow automation platform for enterprise clients.',
      logo: '/api/placeholder/80/80',
      website: 'https://techflow.com',
      stage: 'Series B',
      sector: 'Enterprise Software',
      location: 'San Francisco, CA',
      employees: '150-200',
      founded: 2018,
      status: 'active'
    },
    {
      id: '2',
      name: 'GreenEnergy Corp',
      description: 'Renewable energy infrastructure and smart grid technology.',
      logo: '/api/placeholder/80/80',
      website: 'https://greenenergy.com',
      stage: 'Series A',
      sector: 'Clean Technology',
      location: 'Austin, TX',
      employees: '80-120',
      founded: 2020,
      status: 'active'
    },
    {
      id: '3',
      name: 'DataVault Systems',
      description: 'Cybersecurity and data protection solutions for financial institutions.',
      logo: '/api/placeholder/80/80',
      website: 'https://datavault.com',
      stage: 'Growth',
      sector: 'Cybersecurity',
      location: 'New York, NY',
      employees: '200-300',
      founded: 2016,
      status: 'active'
    },
    {
      id: '4',
      name: 'HealthTech Innovations',
      description: 'Digital health platform connecting patients with specialized care providers.',
      logo: '/api/placeholder/80/80',
      website: 'https://healthtech.com',
      stage: 'Series C',
      sector: 'Healthcare Technology',
      location: 'Boston, MA',
      employees: '300-500',
      founded: 2015,
      status: 'active'
    },
    {
      id: '5',
      name: 'FinTech Dynamics',
      description: 'Blockchain-based payment processing and financial services platform.',
      logo: '/api/placeholder/80/80',
      website: 'https://fintechdynamics.com',
      stage: 'Series A',
      sector: 'Financial Technology',
      location: 'London, UK',
      employees: '100-150',
      founded: 2019,
      status: 'active'
    },
    {
      id: '6',
      name: 'CloudScale Networks',
      description: 'Edge computing infrastructure for IoT and real-time applications.',
      logo: '/api/placeholder/80/80',
      website: 'https://cloudscale.com',
      stage: 'Series B',
      sector: 'Infrastructure',
      location: 'Seattle, WA',
      employees: '120-180',
      founded: 2017,
      status: 'active'
    }
  ];

  const getStageColor = (stage: string) => {
    const colors = {
      'Seed': 'bg-green-100 text-green-800',
      'Series A': 'bg-blue-100 text-blue-800',
      'Series B': 'bg-purple-100 text-purple-800',
      'Series C': 'bg-orange-100 text-orange-800',
      'Growth': 'bg-red-100 text-red-800',
      'Exit': 'bg-gray-100 text-gray-800'
    };
    return colors[stage as keyof typeof colors] || colors.Seed;
  };

  return (
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
            Portfolio Companies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our carefully selected portfolio of high-growth technology companies across various sectors and stages.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {portfolioCompanies.map((company) => (
            <motion.div
              key={company.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              {/* Company Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {company.name}
                    </h3>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStageColor(company.stage)}`}>
                      {company.stage}
                    </span>
                  </div>
                </div>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {company.description}
              </p>

              {/* Company Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-xs text-gray-500">
                  <TrendingUp size={12} className="mr-2" />
                  <span className="font-medium">{company.sector}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin size={12} className="mr-2" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Users size={12} className="mr-2" />
                  <span>{company.employees} employees</span>
                </div>
              </div>

              {/* Founded Year */}
              <div className="text-xs text-gray-400">
                Founded {company.founded}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Portfolio Stats */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Portfolio Companies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">$2.5B</div>
            <div className="text-gray-600">Total Value Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
            <div className="text-gray-600">Successful Exits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">35%</div>
            <div className="text-gray-600">Average IRR</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
