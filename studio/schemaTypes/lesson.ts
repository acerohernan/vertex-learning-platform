import { defineArrayMember, defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const lesson = defineType({
  name: 'lesson',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      type: 'url',
    }),
    defineField({
      name: 'poster',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'duration',
      type: 'number',
      description: 'Duration in seconds',
    }),
    defineField({
      name: 'freePreview',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      type: 'number',
    }),
    defineField({
      name: 'notes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                type: 'object',
                fields: [
                  defineField({ name: 'href', type: 'url' }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({ type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'keyPoints',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'text', type: 'string', validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'proTip',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'resources',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              type: 'string',
              options: {
                list: [
                  { title: 'Article', value: 'article' },
                  { title: 'Video', value: 'video' },
                  { title: 'Repository', value: 'repo' },
                  { title: 'Tool', value: 'tool' },
                ],
                layout: 'radio',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'description', type: 'text', rows: 2 }),
            defineField({ name: 'url', type: 'url', validation: (rule) => rule.required() }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'type' },
          },
        }),
      ],
    }),
  ],
})
