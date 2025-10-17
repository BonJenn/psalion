import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactForm',
  title: 'Contact Form Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().email()
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    }),
    defineField({
      name: 'userType',
      title: 'User Type',
      type: 'string',
      options: {
        list: [
          { title: 'Investor', value: 'investor' },
          { title: 'Founder', value: 'founder' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    })
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'email',
      userType: 'userType'
    },
    prepare(selection) {
      const { title, subtitle, userType } = selection
      return {
        title: title,
        subtitle: `${subtitle} (${userType})`
      }
    }
  }
})
