'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/contact-form';

export default function ContactPage() {
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

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Headquarters',
      details: [
        '123 Financial District',
        'New York, NY 10004',
        'United States'
      ]
    },
    {
      icon: Phone,
      title: 'Phone',
      details: [
        '+1 (555) 123-4567',
        '+1 (555) 123-4568'
      ]
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        'info@psalion.com',
        'investors@psalion.com'
      ]
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM EST',
        'Saturday - Sunday: Closed'
      ]
    }
  ];

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
              Contact <span className="text-blue-600">Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ready to explore our investment solutions? We&apos;d love to hear from you and discuss how we can help achieve your investment objectives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our team of investment professionals is ready to discuss your specific needs and how our solutions can help you achieve your investment objectives.
                  </p>
                </div>

                <motion.div
                  className="space-y-6"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {contactInfo.map((info) => {
                    const Icon = info.icon;
                    return (
                      <motion.div
                        key={info.title}
                        className="flex items-start space-x-4"
                        variants={fadeInUp}
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon size={24} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-gray-600 text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Additional Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Response Time</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our main number directly.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Professional Investors</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Our investment products are available exclusively to qualified professional investors. We'll verify your status during our initial consultation.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Located in the heart of New York's Financial District, our office is easily accessible by public transportation and offers convenient parking options.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Interactive Map Coming Soon</p>
                <p className="text-sm text-gray-500 mt-2">123 Financial District, New York, NY 10004</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
