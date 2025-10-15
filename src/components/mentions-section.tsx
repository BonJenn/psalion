'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MentionContent, getMentionContent, urlFor } from '@/lib/sanity';
import { useEffect, useState } from 'react';

export default function MentionsSection() {
  const [mentions, setMentions] = useState<MentionContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentions = async () => {
      try {
        const data = await getMentionContent();
        setMentions(data);
      } catch (error) {
        console.error('Error fetching mentions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentions();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-12"></div>
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (mentions.length === 0) {
    return null; // Don't render section if no mentions
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-400 uppercase tracking-wide">
            Mentions and Featured Content
          </h2>
          <div className="mt-4 border-b border-dotted border-gray-300 w-32"></div>
        </motion.div>

        {/* Mentions List */}
        <motion.div
          className="space-y-6"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {mentions.map((mention, index) => (
            <motion.a
              key={mention._id}
              href={mention.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-6">
                {/* Publisher Logo and Name */}
                <div className="flex items-center space-x-3 min-w-0 flex-shrink-0">
                  {mention.publisherLogo && (
                    <div className="w-8 h-8 relative flex-shrink-0">
                      <Image
                        src={urlFor(mention.publisherLogo).width(32).height(32).url()}
                        alt={`${mention.publisherName} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                    {mention.publisherName}
                  </span>
                </div>

                {/* Interview Info (if applicable) */}
                {mention.isInterview && mention.intervieweeName && (
                  <div className="flex items-center space-x-3 min-w-0 flex-shrink-0">
                    {mention.intervieweeHeadshot && (
                      <div className="w-8 h-8 relative flex-shrink-0">
                        <Image
                          src={urlFor(mention.intervieweeHeadshot).width(32).height(32).url()}
                          alt={`${mention.intervieweeName} headshot`}
                          fill
                          className="object-cover rounded-full grayscale"
                        />
                      </div>
                    )}
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      Interview with {mention.intervieweeName}
                    </span>
                  </div>
                )}

                {/* Article Title */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {mention.articleTitle}
                  </h3>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
