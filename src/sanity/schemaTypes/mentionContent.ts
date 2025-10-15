import { defineField, defineType } from 'sanity'
import { UrlAutoPopulate } from '../components/UrlAutoPopulate'
import { IntervieweeSelector } from '../components/IntervieweeSelector'
import { IntervieweeWithHeadshot } from '../components/IntervieweeWithHeadshot'
import { PublisherLogoInput } from '../components/PublisherLogoInput'
import { PublisherSelector } from '../components/PublisherSelector'

export default defineType({
  name: 'mentionContent',
  title: 'Mention & Featured Content',
  type: 'document',
  fields: [
    defineField({
      name: 'articleUrl',
      title: 'Article URL',
      type: 'url',
      description: 'Paste the article URL here and click "Extract Data" to auto-populate fields',
      validation: (Rule) => Rule.required().uri({
        scheme: ['http', 'https'],
      }),
      components: {
        input: UrlAutoPopulate,
      },
    }),
    // Legacy fields for backward compatibility
    defineField({
      name: 'publisherName',
      title: 'Publisher Name (Legacy)',
      type: 'string',
      description: 'This field is deprecated. Use Publisher Information below.',
      hidden: true,
    }),
    defineField({
      name: 'publisherLogo',
      title: 'Publisher Logo (Legacy)',
      type: 'image',
      description: 'This field is deprecated. Use Publisher Information below.',
      hidden: true,
    }),
    defineField({
      name: 'intervieweeName',
      title: 'Interviewee Name (Legacy)',
      type: 'string',
      description: 'This field is deprecated. Use Interviewee Information below.',
      hidden: true,
    }),
    defineField({
      name: 'intervieweeHeadshot',
      title: 'Interviewee Headshot (Legacy)',
      type: 'image',
      description: 'This field is deprecated. Use Interviewee Information below.',
      hidden: true,
    }),
    defineField({
      name: 'publisherData',
      title: 'Publisher Information',
      type: 'object',
      description: 'Select from existing publishers or add a new one',
      components: {
        input: PublisherSelector,
      },
      fields: [
        {
          name: 'publisherName',
          title: 'Publisher Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'publisherLogo',
          title: 'Publisher Logo',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Upload the publisher logo. This can be added later.',
          components: {
            input: PublisherLogoInput,
          },
        },
      ],
    }),
    defineField({
      name: 'articleTitle',
      title: 'Article Title',
      type: 'string',
      description: 'Auto-populated from URL, but can be edited',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isInterview',
      title: 'Is Interview?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'intervieweeData',
      title: 'Interviewee Information',
      type: 'object',
      description: 'Select from existing interviewees or add a new one',
      hidden: ({ parent }) => !parent?.isInterview,
      components: {
        input: IntervieweeWithHeadshot,
      },
      fields: [
        {
          name: 'intervieweeName',
          title: 'Interviewee Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'intervieweeHeadshot',
          title: 'Interviewee Headshot',
          type: 'image',
          description: 'Auto-populated when interviewee is selected',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
      description: 'Auto-populated from URL, but can be edited',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: true,
      description: 'Only featured items will appear on the website',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'articleTitle',
      newSubtitle: 'publisherData.publisherName',
      legacySubtitle: 'publisherName',
      newMedia: 'publisherData.publisherLogo',
      legacyMedia: 'publisherLogo',
    },
    prepare(selection) {
      const { title, newSubtitle, legacySubtitle, newMedia, legacyMedia } = selection
      return {
        title: title || 'Untitled',
        subtitle: newSubtitle || legacySubtitle || 'No publisher',
        media: newMedia || legacyMedia,
      }
    },
  },
      orderings: [
        {
          title: 'Order (Low to High)',
          name: 'orderAsc',
          by: [{ field: 'order', direction: 'asc' }],
        },
        {
          title: 'Publish Date (Newest)',
          name: 'publishDateDesc',
          by: [{ field: 'publishDate', direction: 'desc' }],
        },
      ],
})