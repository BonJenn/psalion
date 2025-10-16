import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'newsletterSignup',
  title: 'Newsletter Signup',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'sourcePage',
      title: 'Source Page',
      type: 'string',
      description: 'Optional: where this signup happened (e.g., /mentions)',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'sourcePage',
    },
  },
})


