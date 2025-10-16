'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MentionContent, getMentionContent, urlFor } from '@/lib/sanity';
import { useEffect, useState } from 'react';

export default function MentionsPage() {
  const [mentions, setMentions] = useState<MentionContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchMentions = async () => {
      try {
        const data = await getMentionContent();
        console.log('Fetched mentions:', data.length, 'items');
        console.log('First 3 mentions:', data.slice(0, 3));
        console.log('Articles 2-6 (should be visible):', data.slice(1, 6));
        setMentions(data);
      } catch (error) {
        console.error('Error fetching mentions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-12"></div>
            <div className="space-y-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-16 py-20">
        {/* Page Title */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          
          <div className="mt-4 border-b border-dotted border-gray-300 w-32"></div>
        </motion.div>

        {/* Featured Article */}
        {mentions.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              {/* Left Column - Section Title */}
              <div className="lg:pr-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 uppercase tracking-wide leading-tight">
                  Mentions and<br />Featured Content
                </h2>
              </div>
              
              {/* Right Column - Featured Article */}
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-4">FEATURED</div>
                <a
                  href={mentions[0].articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    {/* Publisher Logo */}
                    {mentions[0].publisherData?.publisherLogo ? (
                      <div className="w-8 h-8 relative flex-shrink-0">
                        <Image
                          src={urlFor(mentions[0].publisherData.publisherLogo).width(32).height(32).url()}
                          alt={`${mentions[0].publisherData.publisherName} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-500">
                          {mentions[0].publisherData?.publisherName?.charAt(0) || '?'}
                        </span>
                      </div>
                    )}
                    
                    {/* Interview Info */}
                    {mentions[0].isInterview && mentions[0].intervieweeData?.intervieweeName && (
                      <div className="flex items-center space-x-2">
                        {mentions[0].intervieweeData.intervieweeHeadshot && (
                          <div className="w-6 h-6 relative flex-shrink-0">
                            <Image
                              src={urlFor(mentions[0].intervieweeData.intervieweeHeadshot).width(24).height(24).url()}
                              alt={`${mentions[0].intervieweeData.intervieweeName} headshot`}
                              fill
                              className="object-cover rounded-full grayscale"
                            />
                          </div>
                        )}
                        <span className="text-sm text-gray-600">
                          Interview with {mentions[0].intervieweeData.intervieweeName}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Featured Article Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                    {mentions[0].articleTitle}
                  </h3>
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* All Mentions List (excluding featured) */}
        {mentions.length > 1 ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-sm text-gray-500 uppercase tracking-wide mb-6">ALL MENTIONS</div>
            <div className="text-xs text-gray-400 mb-4">
              Showing {mentions.slice(1, 1 + visibleCount).length} of {mentions.length - 1} articles (visibleCount: {visibleCount})
            </div>
            <div className="divide-y divide-gray-200">
              {mentions.slice(1, 1 + visibleCount).map((mention, index) => {
                console.log(`Rendering mention ${index + 1}:`, mention.articleTitle);
                return (
                <motion.a
                  key={mention._id}
                  href={mention.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="py-12 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-28 items-center">
                    {/* Publisher Logo and Name */}
                    <div className="flex items-center space-x-5 min-w-0 flex-shrink-0 md:col-span-3">
                      {mention.publisherData?.publisherLogo ? (
                        <div className="w-14 h-14 relative flex-shrink-0">
                          <Image
                            src={urlFor(mention.publisherData.publisherLogo).width(56).height(56).url()}
                            alt={`${mention.publisherData.publisherName} logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
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
                      <div className="flex items-center space-x-4 min-w-0 flex-shrink-0 mt-3 md:mt-0 md:col-span-3">
                        {mention.intervieweeData.intervieweeHeadshot && (
                          <div className="w-14 h-14 relative flex-shrink-0">
                            <Image
                              src={urlFor(mention.intervieweeData.intervieweeHeadshot).width(56).height(56).url()}
                              alt={`${mention.intervieweeData.intervieweeName} headshot`}
                              fill
                              className="object-cover rounded-full grayscale"
                            />
                          </div>
                        )}
                        <span className="text-sm text-gray-600 whitespace-nowrap">
                          Interview with {mention.intervieweeData.intervieweeName}
                        </span>
                      </div>
                    )}

                    {/* Article Title */}
                    <div className="flex-1 min-w-0 mt-3 md:mt-0 md:col-span-6 md:pl-16">
                      <h3 className="text-base md:text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {mention.articleTitle}
                      </h3>
                    </div>
                  </div>
                </motion.a>
                );
              })}
            </div>

            {/* Show More Button */}
            {visibleCount < Math.max(0, mentions.length - 1) && (
              <div className="text-center">
                <motion.button
                  onClick={() => setVisibleCount((v) => v + 5)}
                  className="mt-6 text-blue-600 hover:text-blue-800 font-medium text-sm uppercase tracking-wide inline-flex items-center space-x-2 group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span>
                    Show {Math.min(5, Math.max(0, (mentions.length - 1) - visibleCount))} More
                  </span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No additional mentions found.</p>
          </div>
        )}


      </div>
    </div>
  );
}
