import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'publisher',
  title: 'Publisher',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Publisher Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Publisher Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload the publisher logo. This can be added later.',
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
      description: 'Optional: The publisher\'s main website',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional: Brief description of the publisher',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'website',
      media: 'logo',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title || 'Untitled',
        subtitle: subtitle || 'No website',
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
    {
      title: 'Recently Added',
      name: 'dateDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
})
