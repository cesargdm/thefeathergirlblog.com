import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import BlockContent from '@sanity/block-content-to-react'
import { Twitter, File, Share } from 'react-feather'

import DefaultLayout from '../../layouts'
import { Aside, BlockContainer, Header, Main } from './styled'

const GATSBY_SANITY_PROJECT_ID = process.env.GATSBY_SANITY_PROJECT_ID
const GATSBY_SANITY_DATASET = process.env.GATSBY_SANITY_DATASET

function PostTemplate(props: any) {
  const post = props.data.sanityPost
  const postFileUrl = post.file?.asset.url

  return (
    <DefaultLayout
      location={props.location}
      image={post.mainImage.asset.url}
      title={post.title}
    >
      <Header>
        {Boolean(post.mainImage?.asset.gatsbyImageData) && (
          <GatsbyImage
            style={{ minWidth: 160, width: '100%' }}
            alt=""
            image={post.mainImage.asset.gatsbyImageData}
          />
        )}
        <h1>{post.title}</h1>
        <p>{new Date(post._createdAt).toLocaleDateString()}</p>
      </Header>
      <Main>
        <BlockContainer>
          <BlockContent
            projectId={GATSBY_SANITY_PROJECT_ID}
            dataset={GATSBY_SANITY_DATASET}
            blocks={post._rawBody}
          />
        </BlockContainer>
        <Aside>
          {postFileUrl && (
            <a title="Descargar" href={postFileUrl} download>
              Descarga versión PDF
              <File />
            </a>
          )}
          <ul>
            <li>
              <a
                href={`https://twitter.com/intent/tweet?text=${props.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Compartir a Twitter
                <Twitter />
              </a>
            </li>
            {typeof global.window !== undefined &&
              typeof global.window?.navigator?.share === 'function' && (
                <li>
                  <button
                    onClick={() => {
                      window.navigator
                        .share({
                          title: post.title,
                          text: post.title,
                          url: `https://thefeathergirlblog.com/${post.slug}`,
                        })
                        .catch(() => undefined)
                    }}
                  >
                    Compartir
                    <Share />
                  </button>
                </li>
              )}
          </ul>
        </Aside>
      </Main>
    </DefaultLayout>
  )
}

export default PostTemplate

export const query = graphql`
  query ($id: String) {
    sanityPost(id: { eq: $id }) {
      _createdAt
      _updatedAt

      title
      _rawBody

      mainImage {
        asset {
          gatsbyImageData
          url
        }
      }

      file {
        asset {
          url
        }
      }
    }
  }
`
