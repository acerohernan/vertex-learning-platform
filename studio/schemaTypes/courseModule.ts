import { defineArrayMember, defineField, defineType } from 'sanity'

export const courseModule = defineType({
  name: 'courseModule',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'lessons',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'lesson' }] })],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
