import { type SchemaTypeDefinition } from 'sanity'

// 1. Import your new schemas
import category from './category'
import product from './product'

// 2. Define blockContent for the editor
const blockContent = {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [{title: 'Bullet', value: 'bullet'}],
    },
  ],
}

// 3. THIS IS THE FIX: Export the array as 'schemaTypes'
export const schemaTypes = [category, product, blockContent]

// 4. Also keep the 'schema' object export just in case
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, product, blockContent],
}