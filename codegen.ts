import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    {
      'http://localhost:5000/graphql': {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5hc0ZvbmdzZGRkIiwicGFzc3dvcmQiOiJpcm9uMDA3MTEiLCJpYXQiOjE2OTYzMjUxMDR9.5YFF4OrWQ8UUUwjwvU8xfz456ef444G_Viqecrmu6hE',
        },
      },
    },
  ],
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        skipTypename: true
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;