require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const isProd = process.env.NODE_ENV === 'production'

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID
const SANITY_DATASET = process.env.SANITY_DATASET

module.exports = {
  siteMetadata: {
    title: `The Feather Girl Blog`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    'gatsby-plugin-react-helmet',

    'gatsby-plugin-typescript',

    'gatsby-plugin-force-trailing-slashes',

    `gatsby-plugin-styled-components`,

    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: SANITY_PROJECT_ID,
        dataset: SANITY_DATASET,
        overlayDrafts: !isProd,
        watchMode: !isProd,
        token: process.env.SANITY_TOKEN,
        graphqlTag: 'default',
      },
    },
  ],
}
