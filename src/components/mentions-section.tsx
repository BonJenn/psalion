'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MentionContent, getMentionContent, urlFor } from '@/lib/sanity';
import { useEffect, useState } from 'react';

export default function MentionsSection() {
  const [mentions, setMentions] = useState<MentionContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);

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

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-12"></div>
            <div className="space-y-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (mentions.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                Mentions and Featured Content
              </h2>
              <div className="flex-1 ml-4 border-t border-dashed border-gray-300"></div>
            </div>
          </motion.div>
          
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No mentions available at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">Check back soon for the latest press coverage.</p>
          </div>
        </div>
      </section>
    );
  }

  const visibleMentions = mentions.slice(0, visibleCount);

  return (
    <section className="py-16 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
              Mentions and Featured Content
            </h2>
            <div className="flex-1 ml-4 border-t border-dashed border-gray-300"></div>
          </div>
        </motion.div>

        {/* Mentions List */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          
          {/* Mentions List */}
          <div className="divide-y divide-gray-200">
            {visibleMentions.map((mention, index) => (
              <motion.a
                key={mention._id}
                href={mention.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-y-4 sm:gap-y-6 md:gap-x-16 items-center">
                  {/* Publisher Logo and Name */}
                  <div className="flex items-center space-x-3 sm:space-x-5 min-w-0 flex-shrink-0 md:col-span-3">
                    {mention.publisherData?.publisherLogo ? (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 relative flex-shrink-0 rounded-md overflow-hidden bg-white">
                        <Image
                          src={urlFor(mention.publisherData.publisherLogo).width(64).fit('max').url()}
                          alt={`${mention.publisherData.publisherName} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-base font-medium text-gray-500">
                          {mention.publisherData?.publisherName?.charAt(0) || '?'}
                        </span>
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                      {mention.publisherData?.publisherName}
                    </span>
                  </div>

                  {/* Interview Info (if applicable) */}
                  {mention.isInterview && mention.intervieweeData?.intervieweeName && (
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-shrink-0 mt-3 md:mt-0 md:col-span-3">
                      {mention.intervieweeData.intervieweeHeadshot && (
                        <div className="w-12 h-12 sm:w-14 sm:h-14 relative flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={urlFor(mention.intervieweeData.intervieweeHeadshot).width(56).height(56).url()}
                            alt={`${mention.intervieweeData.intervieweeName} headshot`}
                            fill
                            className="object-cover grayscale"
                          />
                        </div>
                      )}
                      <span className="text-sm text-gray-600 leading-tight">
                        Interview with {mention.intervieweeData.intervieweeName}
                      </span>
                    </div>
                  )}

                  {/* Article Title */}
                  <div className="flex-1 min-w-0 mt-3 md:mt-0 md:col-span-6 md:pl-8">
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                      {mention.articleTitle}
                    </h3>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          

          {/* View All Button */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <Link 
              href="/mentions"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm uppercase tracking-wide group"
            >
              <span>VIEW ALL</span>
              <svg 
                className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}