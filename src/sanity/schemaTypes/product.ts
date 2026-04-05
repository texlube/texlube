import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Which tab should this appear in?',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'specifications',
      title: 'Technical Specifications',
      type: 'array',
      of: [{ 
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Label (e.g. Viscosity)' },
          { name: 'value', type: 'string', title: 'Value (e.g. 5W-30)' }
        ]
      }],
    }),
    defineField({
      name: 'tdsFile',
      title: 'TDS (Technical Data Sheet)',
      type: 'file',
      description: 'Upload the PDF for customer download.',
    }),
    defineField({
      name: 'description',
      title: 'Product Description',
      type: 'blockContent', // Ensure you have blockContent defined or use 'text'
    }),
  ],
})