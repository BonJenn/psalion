import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity configuration
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Only needed for write operations
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => builder.image(source);

// Type definitions for CMS content
export interface PressMention {
  _id: string;
  title: string;
  publication: string;
  url: string;
  date: string;
  excerpt: string;
  category: 'news' | 'analysis' | 'interview' | 'award';
  featured: boolean;
}

export interface MentionContent {
  _id: string;
  publisherName: string;
  publisherLogo: {
    asset: {
      _ref: string;
    };
  };
  articleTitle: string;
  articleUrl: string;
  isInterview: boolean;
  intervieweeName?: string;
  intervieweeHeadshot?: {
    asset: {
      _ref: string;
    };
  };
  publishDate: string;
  featured: boolean;
  order: number;
}

export interface PortfolioCompany {
  _id: string;
  name: string;
  description: string;
  logo: {
    asset: {
      _ref: string;
    };
  };
  website: string;
  stage: string;
  sector: string;
  location: string;
  employees: string;
  founded: number;
  status: 'active' | 'exited';
  featured: boolean;
}

export interface PageSection {
  _id: string;
  title: string;
  content: unknown; // Portable Text
  sectionType: 'hero' | 'text' | 'stats' | 'features' | 'testimonials';
  order: number;
  page: string;
}

export interface HomepageContent {
  _id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  stats: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  productCards: Array<{
    title: string;
    description: string;
    href: string;
    features: string[];
  }>;
}

// Query functions
export async function getPressMentions(): Promise<PressMention[]> {
  try {
    const query = `*[_type == "pressMention"] | order(date desc) {
      _id,
      title,
      publication,
      url,
      date,
      excerpt,
      category,
      featured
    }`;
    
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('Error fetching press mentions:', error);
    return [];
  }
}

export async function getMentionContent(): Promise<MentionContent[]> {
  try {
    const query = `*[_type == "mentionContent" && featured == true] | order(order asc, publishDate desc) {
      _id,
      publisherName,
      publisherLogo,
      articleTitle,
      articleUrl,
      isInterview,
      intervieweeName,
      intervieweeHeadshot,
      publishDate,
      featured,
      order
    }`;
    
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('Error fetching mention content:', error);
    return [];
  }
}

export async function getPortfolioCompanies(): Promise<PortfolioCompany[]> {
  try {
    const query = `*[_type == "portfolioCompany"] | order(founded desc) {
      _id,
      name,
      description,
      logo,
      website,
      stage,
      sector,
      location,
      employees,
      founded,
      status,
      featured
    }`;
    
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('Error fetching portfolio companies:', error);
    return [];
  }
}

export async function getPageSections(page: string): Promise<PageSection[]> {
  try {
    const query = `*[_type == "pageSection" && page == $page] | order(order asc) {
      _id,
      title,
      content,
      sectionType,
      order,
      page
    }`;
    
    return await sanityClient.fetch(query, { page });
  } catch (error) {
    console.error('Error fetching page sections:', error);
    return [];
  }
}

export async function getHomepageContent(): Promise<HomepageContent | null> {
  try {
    const query = `*[_type == "homepageContent"][0] {
      _id,
      heroTitle,
      heroSubtitle,
      heroDescription,
      stats,
      productCards
    }`;
    
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return null;
  }
}

// Schema definitions (for reference - these would be defined in Sanity Studio)
export const schemas = {
  pressMention: {
    name: 'pressMention',
    title: 'Press Mention',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'publication', title: 'Publication', type: 'string' },
      { name: 'url', title: 'URL', type: 'url' },
      { name: 'date', title: 'Date', type: 'date' },
      { name: 'excerpt', title: 'Excerpt', type: 'text' },
      { 
        name: 'category', 
        title: 'Category', 
        type: 'string',
        options: {
          list: [
            { title: 'News', value: 'news' },
            { title: 'Analysis', value: 'analysis' },
            { title: 'Interview', value: 'interview' },
            { title: 'Award', value: 'award' }
          ]
        }
      },
      { name: 'featured', title: 'Featured', type: 'boolean' }
    ]
  },

  mentionContent: {
    name: 'mentionContent',
    title: 'Mention & Featured Content',
    type: 'document',
    fields: [
      { name: 'publisherName', title: 'Publisher Name', type: 'string' },
      { name: 'publisherLogo', title: 'Publisher Logo', type: 'image' },
      { name: 'articleTitle', title: 'Article Title', type: 'string' },
      { name: 'articleUrl', title: 'Article URL', type: 'url' },
      { name: 'isInterview', title: 'Is Interview?', type: 'boolean' },
      { 
        name: 'intervieweeName', 
        title: 'Interviewee Name', 
        type: 'string',
        hidden: ({ parent }: { parent: any }) => !parent?.isInterview
      },
      { 
        name: 'intervieweeHeadshot', 
        title: 'Interviewee Headshot', 
        type: 'image',
        hidden: ({ parent }: { parent: any }) => !parent?.isInterview
      },
      { name: 'publishDate', title: 'Publish Date', type: 'date' },
      { name: 'featured', title: 'Featured', type: 'boolean' },
      { name: 'order', title: 'Display Order', type: 'number' }
    ],
    preview: {
      select: {
        title: 'articleTitle',
        subtitle: 'publisherName',
        media: 'publisherLogo'
      }
    }
  },
  
  portfolioCompany: {
    name: 'portfolioCompany',
    title: 'Portfolio Company',
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'logo', title: 'Logo', type: 'image' },
      { name: 'website', title: 'Website', type: 'url' },
      { name: 'stage', title: 'Stage', type: 'string' },
      { name: 'sector', title: 'Sector', type: 'string' },
      { name: 'location', title: 'Location', type: 'string' },
      { name: 'employees', title: 'Employees', type: 'string' },
      { name: 'founded', title: 'Founded', type: 'number' },
      { 
        name: 'status', 
        title: 'Status', 
        type: 'string',
        options: {
          list: [
            { title: 'Active', value: 'active' },
            { title: 'Exited', value: 'exited' }
          ]
        }
      },
      { name: 'featured', title: 'Featured', type: 'boolean' }
    ]
  },
  
  pageSection: {
    name: 'pageSection',
    title: 'Page Section',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
      { 
        name: 'sectionType', 
        title: 'Section Type', 
        type: 'string',
        options: {
          list: [
            { title: 'Hero', value: 'hero' },
            { title: 'Text', value: 'text' },
            { title: 'Stats', value: 'stats' },
            { title: 'Features', value: 'features' },
            { title: 'Testimonials', value: 'testimonials' }
          ]
        }
      },
      { name: 'order', title: 'Order', type: 'number' },
      { name: 'page', title: 'Page', type: 'string' }
    ]
  },
  
  homepageContent: {
    name: 'homepageContent',
    title: 'Homepage Content',
    type: 'document',
    fields: [
      { name: 'heroTitle', title: 'Hero Title', type: 'string' },
      { name: 'heroSubtitle', title: 'Hero Subtitle', type: 'string' },
      { name: 'heroDescription', title: 'Hero Description', type: 'text' },
      { 
        name: 'stats', 
        title: 'Stats', 
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' }
          ]
        }]
      },
      { 
        name: 'productCards', 
        title: 'Product Cards', 
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'href', title: 'Link', type: 'string' },
            { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }
          ]
        }]
      }
    ]
  }
};
