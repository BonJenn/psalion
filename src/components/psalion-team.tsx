'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PsalionTeam() {
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
      name: 'Adam Kovacs',
      role: 'Investment Director',
      image: '/psalion_team/1.adam_kovaks_investment_director.png'
    },
    {
      name: 'Mike Torelli',
      role: 'Finance Director',
      image: '/psalion_team/2.mike_torelli_finance_director.png'
    },
    {
      name: 'Todd Enneking',
      role: 'AMLRO',
      image: '/psalion_team/3.todd_enneking_amrlo.png'
    },
    {
      name: 'Brenden Tacon',
      role: 'Deputy AMLRO',
      image: '/psalion_team/4.brenden_tacon_deputy_amrlo.png'
    },
    {
      name: 'Paul Piquemal',
      role: 'Operations Manager',
      image: '/psalion_team/5.paul_piquemal_operations_manager.png'
    },
    {
      name: 'Alec Beckman',
      role: 'VP of Growth',
      image: '/psalion_team/6.alec_beckman_vp_of_growth.jpg'
    },
    {
      name: 'Alex Jacobs',
      role: 'VP of Sales',
      image: '/psalion_team/7.alex_jacobs_vp_of_sales.png'
    },
    {
      name: 'Max Bailey',
      role: 'Strategic Advisor - Asia',
      image: '/psalion_team/8.max_bailey_strategic_advisor_asia.png'
    },
    {
      name: 'Nada Abu-Qaoud',
      role: 'Head of Regulatory Compliance',
      image: '/psalion_team/9.nada_abu_qaoud_head_of_regulatory_compliance.png'
    },
    {
      name: 'Imane Bonnet',
      role: 'Blockchain Project Manager',
      image: '/psalion_team/10.imane_bonnet_blockchain_project_mananger.png'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-wide">
              Psalion Team
            </h2>
            <div className="flex-1 ml-4 border-t border-dashed border-gray-300"></div>
          </div>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="text-center"
              variants={fadeInUp}
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 rounded-lg overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                {member.role}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
