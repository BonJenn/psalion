'use client';

import { motion } from 'framer-motion';
import { Linkedin, Mail, Users, Award, Briefcase, GraduationCap } from 'lucide-react';

export default function TeamPage() {
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

  const teamMembers = [
    {
      name: 'Sarah Mitchell',
      title: 'Chief Executive Officer',
      bio: 'Former Goldman Sachs Managing Director with 20+ years in alternative investments.',
      image: '/api/placeholder/300/300',
      linkedin: 'https://linkedin.com/in/sarah-mitchell',
      email: 'sarah.mitchell@psalion.com',
      education: 'MBA, Wharton School',
      experience: '20+ years'
    },
    {
      name: 'David Chen',
      title: 'Chief Investment Officer',
      bio: 'Former Blackstone Principal with expertise in credit strategies and risk management.',
      image: '/api/placeholder/300/300',
      linkedin: 'https://linkedin.com/in/david-chen',
      email: 'david.chen@psalion.com',
      education: 'CFA, Harvard Business School',
      experience: '18+ years'
    },
    {
      name: 'Emily Rodriguez',
      title: 'Head of Venture Capital',
      bio: 'Former Andreessen Horowitz Partner with deep tech investment experience.',
      image: '/api/placeholder/300/300',
      linkedin: 'https://linkedin.com/in/emily-rodriguez',
      email: 'emily.rodriguez@psalion.com',
      education: 'MS Computer Science, Stanford',
      experience: '15+ years'
    },
    {
      name: 'Michael Thompson',
      title: 'Chief Risk Officer',
      bio: 'Former JP Morgan Risk Management Director with expertise in portfolio risk.',
      image: '/api/placeholder/300/300',
      linkedin: 'https://linkedin.com/in/michael-thompson',
      email: 'michael.thompson@psalion.com',
      education: 'PhD Finance, MIT',
      experience: '16+ years'
    },
    {
      name: 'Lisa Wang',
      title: 'Head of Client Relations',
      bio: 'Former Morgan Stanley Managing Director with extensive institutional client experience.',
      image: '/api/placeholder/300/300',
      linkedin: 'https://linkedin.com/in/lisa-wang',
      email: 'lisa.wang@psalion.com',
      education: 'MBA, Columbia Business School',
      experience: '14+ years'
    },
    {
      name: 'James Wilson',
      title: 'Head of Operations',
      bio: 'Former Bridgewater Associates COO with expertise in operational excellence.',
      image: '/api/placeholder/300/300',
      linkedin: 'https://linkedin.com/in/james-wilson',
      email: 'james.wilson@psalion.com',
      education: 'MS Operations Research, MIT',
      experience: '12+ years'
    }
  ];

  const stats = [
    { icon: Users, value: '50+', label: 'Team Members' },
    { icon: Award, value: '15+', label: 'Years Average Experience' },
    { icon: Briefcase, value: '200+', label: 'Combined Deals' },
    { icon: GraduationCap, value: '95%', label: 'Advanced Degrees' }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-6">
              Our <span className="text-blue-600">Team</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experienced professionals with deep expertise in alternative investments and institutional client service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  variants={fadeInUp}
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
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
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our leadership team brings together decades of experience from top-tier investment firms and financial institutions.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                {/* Profile Image */}
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>

                {/* Name and Title */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.title}</p>
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 text-center">
                  {member.bio}
                </p>

                {/* Education and Experience */}
                <div className="space-y-2 mb-6 text-sm text-gray-500">
                  <div className="flex items-center justify-center">
                    <GraduationCap size={14} className="mr-2" />
                    {member.education}
                  </div>
                  <div className="flex items-center justify-center">
                    <Briefcase size={14} className="mr-2" />
                    {member.experience}
                  </div>
                </div>

                {/* Contact Links */}
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
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
              Our Culture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We foster a culture of excellence, collaboration, and continuous learning.
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
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaborative</h3>
              <p className="text-gray-600">
                We believe in the power of teamwork and cross-functional collaboration to deliver exceptional results.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-gray-50 rounded-xl"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We maintain the highest standards of performance and integrity in everything we do.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-gray-50 rounded-xl"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={32} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Learning</h3>
              <p className="text-gray-600">
                We encourage continuous learning and professional development to stay ahead of market trends.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
