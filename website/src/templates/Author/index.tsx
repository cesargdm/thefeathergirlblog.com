import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '@sanity/block-content-to-react'

import DefaultLayout from '../../layouts'

import { BlockContainer, Header, Main } from '../Post/styled'

const GATSBY_SANITY_PROJECT_ID = process.env.GATSBY_SANITY_PROJECT_ID
const GATSBY_SANITY_DATASET = process.env.GATSBY_SANITY_DATASET

function AuthorTemplate(props: any) {
  const author = props.data?.sanityAuthor

  return (
    <DefaultLayout title={author.title}>
      <Header>
        <h1>{author.name}</h1>
      </Header>
      <Main>
        <BlockContainer>
          <BlockContent
            projectId={GATSBY_SANITY_PROJECT_ID}
            dataset={GATSBY_SANITY_DATASET}
            blocks={author._rawBio}
          />
        </BlockContainer>
      </Main>
    </DefaultLayout>
  )
}

export default AuthorTemplate

export const query = graphql`
  query ($id: String) {
    sanityAuthor(id: { eq: $id }) {
      _rawBio
      name
    }
  }
`
