const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const {
    data: {
      allSanityPost: { nodes: posts },
      allSanityAuthor: { nodes: authors },
    },
  } = await graphql(`
    query {
      allSanityAuthor {
        nodes {
          id
          slug {
            current
          }
        }
      }
      allSanityPost {
        nodes {
          id
          slug {
            current
          }
        }
      }
    }
  `)

  const postTemplate = path.resolve(`src/templates/Post/index.tsx`)
  const authorTemplate = path.resolve(`src/templates/Author/index.tsx`)

  for (const author of authors) {
    if (author.slug?.current) {
      createPage({
        path: author.slug.current,
        component: authorTemplate,
        context: { id: author.id },
      })
    }
  }

  for (const post of posts) {
    if (post.slug?.current)
      createPage({
        path: post.slug.current,
        component: postTemplate,
        context: { id: post.id },
      })
  }
}
