export const operation = {
  name: 'operation',
  title: 'Operations & Solutions',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', title: 'Brief Description', type: 'text' },
    { name: 'image', title: 'Cinematic Image', type: 'image', options: { hotspot: true } },
    { name: 'content', title: 'Full Content', type: 'array', of: [{ type: 'block' }] },
  ],
}