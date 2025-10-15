import { type SchemaTypeDefinition } from 'sanity'
import mentionContent from './mentionContent'
import interviewee from './interviewee'
import publisher from './publisher'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    mentionContent,
    interviewee,
    publisher,
  ],
}
