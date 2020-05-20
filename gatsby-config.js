const path = require('path')

const config = require('./src/utils/siteConfig')
const generateRSSFeed = require('./src/utils/rss/generate-feed')

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env' })
}

const { GHOST_CONTENT_API_KEY, GHOST_API_URL, GOOGLE_TRACKING_ID } = process.env

module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'src', 'pages'),
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'src', 'images'),
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: GOOGLE_TRACKING_ID,
      },
    },
    {
      resolve: 'gatsby-source-ghost',
      options: {
        apiUrl: GHOST_API_URL,
        contentApiKey: GHOST_CONTENT_API_KEY,
        version: 'v2',
      },
    },

    {
      resolve: 'gatsby-plugin-ghost-manifest',
      options: {
        short_name: config.shortTitle,
        start_url: '/',
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        icon: `static/${config.siteIcon}`,
        legacy: true,
        query: `
          {
            allGhostSettings {
              edges {
                node {
                  title
                  description
                }
              }
            }
          }
        `,
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            allGhostSettings {
              edges {
                node {
                  title
                  description
                }
              }
            }
          }
        `,
        feeds: [generateRSSFeed(config)],
      },
    },
    {
      resolve: 'gatsby-plugin-advanced-sitemap',
      options: {
        query: `
          {
            allGhostPost {
              edges {
                node {
                  id
                  slug
                  updated_at
                  created_at
                  feature_image
                }
              }
            }
            allGhostPage {
              edges {
                node {
                  id
                  slug
                  updated_at
                  created_at
                  feature_image
                }
              }
            }
            allGhostTag {
              edges {
                node {
                  id
                  slug
                  feature_image
                }
              }
            }
            allGhostAuthor {
              edges {
                node {
                  id
                  slug
                  profile_image
                }
              }
            }
          }`,
        mapping: {
          allGhostPost: { sitemap: 'posts' },
          allGhostTag: { sitemap: 'tags' },
          allGhostAuthor: { sitemap: 'authors' },
          allGhostPage: { sitemap: 'pages' },
        },
        exclude: [
          '/dev-404-page',
          '/404',
          '/404.html',
          '/offline-plugin-app-shell-fallback',
        ],
        createLinkInHead: true,
        addUncaughtPages: true,
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-force-trailing-slashes',
  ],
}
