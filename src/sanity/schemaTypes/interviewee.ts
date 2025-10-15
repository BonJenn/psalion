import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'interviewee',
  title: 'Interviewee',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      description: 'e.g., CEO, Founder, Director',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'headshot',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title || 'Untitled',
        subtitle: subtitle || 'No title',
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Name (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
