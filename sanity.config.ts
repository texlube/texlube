import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemaTypes' // Check this path!

export default defineConfig({
  name: 'default',
  title: 'TexLube V3',

  projectId: 'k48ikdq5', // Paste your real ID here
  dataset: 'production',

  basePath: '/studio', // This must match your folder name

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})