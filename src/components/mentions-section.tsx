'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MentionContent, getMentionContent, urlFor } from '@/lib/sanity';
import { useEffect, useState } from 'react';

function resolveIntervieweeImage(name?: string | null): string | null {
  if (!name) return null;
  const n = name.trim().toLowerCase();
  // Known mappings to higher-quality public assets
  if (n.includes('timothy') && n.includes('enneking')) return '/board_of_directors/timothy-enneking.png';
  if (n.includes('alec') && n.includes('beckman')) return '/psalion_team/6.alec_beckman_vp_of_growth.jpg';
  return null;
}

function LogoBox({ src, alt, isForbes = false }: { src: string; alt: string; isForbes?: boolean }) {
  return (
    <div
      className={`relative w-8 h-8 flex-shrink-0 overflow-hidden ${
        isForbes ? '' : 'rounded-md bg-white border border-gray-200'
      }`}
    >
      <Image src={src} alt={alt} fill className={isForbes ? "object-cover" : "object-contain"} />
    </div>
  );
}

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
      <section className="py-12 bg-white">
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
      <section className="py-12 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="flex items-center">
              <h2
                className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wide"
                style={{ fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
              >
                Mentions and Featured Content
              </h2>
              <div className="flex-1 ml-4 border-t border-dashed border-gray-200"></div>
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

  // De-duplicate by articleUrl or _id to avoid repeated top items
  const uniqueMentions = Array.from(
    new Map(
      mentions.map((m) => [m.articleUrl || (m as any)._id, m])
    ).values()
  );
  const visibleMentions = uniqueMentions.slice(0, visibleCount);

  return (
    <section className="py-12 bg-white">
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
            <h2
              className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wide"
              style={{ fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
            >
              Mentions and Featured Content
            </h2>
            <div className="flex-1 ml-4 border-t border-dashed border-gray-200"></div>
          </div>
        </motion.div>

        {/* Mentions List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true, amount: 0.15 }}
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
                transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.35) }}
                viewport={{ once: true }}
              >
                <div className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-y-4 sm:gap-y-6 md:gap-x-16 items-center">
                  {/* Publisher Logo and Name */}
                  <div className="flex items-center space-x-3 sm:space-x-5 min-w-0 flex-shrink-0 md:col-span-3">
                    {mention.publisherData?.publisherLogo ? (
                      <LogoBox
                        src={urlFor(mention.publisherData.publisherLogo).height(32).fit('max').url()}
                        alt={`${mention.publisherData.publisherName} logo`}
                        isForbes={(mention.publisherData?.publisherName || '').toLowerCase().includes('forbes')}
                      />
                    ) : (
                      <div className="w-8 h-8 flex-shrink-0 bg-white border border-gray-200 rounded-md flex items-center justify-center">
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
                      {(() => {
                        const override = resolveIntervieweeImage(mention.intervieweeData?.intervieweeName);
                        const src = override || (mention.intervieweeData?.intervieweeHeadshot ? urlFor(mention.intervieweeData.intervieweeHeadshot).width(32).height(32).url() : '');
                        return src ? (
                          <div className="w-8 h-8 relative flex-shrink-0 rounded-md overflow-hidden">
                            <Image src={src} alt={`${mention.intervieweeData?.intervieweeName || 'Interviewee'} headshot`} fill className="object-cover grayscale" />
                          </div>
                        ) : null;
                      })()}
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
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <Link 
              href="/mentions"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-[10px] sm:text-xs md:text-sm uppercase tracking-wide group"
              style={{ fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
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