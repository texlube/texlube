import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Product Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      description: 'e.g., Passenger Car, Industrial, or Coolant',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      description: 'Used for the URL and Tab filtering. Click "Generate".',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Leave empty for main categories. Select "Specialty Oil" for Coolants/Brake Fluids.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
})