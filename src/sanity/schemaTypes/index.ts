import { type SchemaTypeDefinition } from 'sanity'
import mentionContent from './mentionContent'
import interviewee from './interviewee'
import publisher from './publisher'
import newsletterSignup from './newsletterSignup'
import contactForm from './contactForm'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    mentionContent,
    interviewee,
    publisher,
    newsletterSignup,
    contactForm,
  ],
}
