'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Newspaper } from 'lucide-react';

interface PressMention {
  id: string;
  title: string;
  publication: string;
  url: string;
  date: string;
  excerpt: string;
  category: 'news' | 'analysis' | 'interview' | 'award';
}

export default function PressMentions() {
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

  // Sample press data - in production, this would come from CMS
  const pressMentions: PressMention[] = [
    {
      id: '1',
      title: 'Psalion Launches New Credit Strategy Fund with $500M Initial Capital',
      publication: 'Financial Times',
      url: 'https://ft.com/content/example',
      date: '2024-01-15',
      excerpt: 'Psalion Capital has launched a new credit strategy fund targeting institutional investors, with initial commitments of $500 million from pension funds and insurance companies.',
      category: 'news'
    },
    {
      id: '2',
      title: 'Investment Outlook 2024: Alternative Strategies in Focus',
      publication: 'Bloomberg',
      url: 'https://bloomberg.com/news/example',
      date: '2024-01-10',
      excerpt: 'Industry experts discuss the growing importance of alternative investment strategies, with Psalion\'s CIO highlighting opportunities in private credit markets.',
      category: 'analysis'
    },
    {
      id: '3',
      title: 'Psalion VC Portfolio Company Achieves $1B Valuation',
      publication: 'TechCrunch',
      url: 'https://techcrunch.com/example',
      date: '2024-01-08',
      excerpt: 'DataVault Systems, a cybersecurity company in Psalion\'s venture portfolio, has reached unicorn status following its Series C funding round.',
      category: 'news'
    },
    {
      id: '4',
      title: 'Exclusive Interview: Psalion\'s Approach to Risk Management',
      publication: 'Institutional Investor',
      url: 'https://institutionalinvestor.com/example',
      date: '2024-01-05',
      excerpt: 'In an exclusive interview, Psalion\'s Chief Risk Officer discusses the firm\'s comprehensive approach to risk management across all investment strategies.',
      category: 'interview'
    },
    {
      id: '5',
      title: 'Best Alternative Investment Manager 2024',
      publication: 'Private Equity International',
      url: 'https://peimedia.com/example',
      date: '2024-01-03',
      excerpt: 'Psalion Capital has been recognized as the Best Alternative Investment Manager for 2024 by Private Equity International, highlighting the firm\'s exceptional performance and client service.',
      category: 'award'
    },
    {
      id: '6',
      title: 'Market Analysis: Credit Opportunities in Current Environment',
      publication: 'Pensions & Investments',
      url: 'https://pionline.com/example',
      date: '2023-12-28',
      excerpt: 'Psalion\'s credit team provides insights into current market conditions and identifies attractive opportunities in corporate and structured credit markets.',
      category: 'analysis'
    },
    {
      id: '7',
      title: 'Psalion Expands European Operations with London Office',
      publication: 'Financial News',
      url: 'https://fnlondon.com/example',
      date: '2023-12-20',
      excerpt: 'The firm has opened a new London office to better serve its growing European client base and expand its presence in the European alternative investment market.',
      category: 'news'
    },
    {
      id: '8',
      title: 'Sustainable Investing: Psalion\'s ESG Integration Strategy',
      publication: 'Responsible Investor',
      url: 'https://responsible-investor.com/example',
      date: '2023-12-15',
      excerpt: 'Psalion discusses its comprehensive approach to integrating environmental, social, and governance factors into investment decision-making processes.',
      category: 'analysis'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      news: 'bg-blue-100 text-blue-800',
      analysis: 'bg-green-100 text-green-800',
      interview: 'bg-purple-100 text-purple-800',
      award: 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || colors.news;
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      news: '📰',
      analysis: '📊',
      interview: '🎤',
      award: '🏆'
    };
    return icons[category as keyof typeof icons] || '📰';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
            Press & Media
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, analysis, and insights about Psalion and the alternative investment industry.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {pressMentions.map((mention) => (
            <motion.article
              key={mention.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              variants={fadeInUp}
              whileHover={{ y: -2 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getCategoryIcon(mention.category)}</span>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(mention.category)}`}>
                    {mention.category.charAt(0).toUpperCase() + mention.category.slice(1)}
                  </span>
                </div>
                <a
                  href={mention.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>

              {/* Publication */}
              <div className="flex items-center space-x-2 mb-3">
                <Newspaper size={14} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-600">{mention.publication}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {mention.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                {mention.excerpt}
              </p>

              {/* Date */}
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Calendar size={12} />
                <span>{formatDate(mention.date)}</span>
              </div>

              {/* Read More Link */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a
                  href={mention.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Read Full Article
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
            Load More Articles
          </button>
        </motion.div>
      </div>
    </section>
  );
}
