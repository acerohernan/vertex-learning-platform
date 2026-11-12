import { type SchemaTypeDefinition } from 'sanity'
import { category } from './category'
import { instructor } from './instructor'
import { lesson } from './lesson'
import { courseModule } from './courseModule'
import { course } from './course'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, instructor, lesson, courseModule, course],
}
