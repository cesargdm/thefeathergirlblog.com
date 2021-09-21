import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import BlockContent from "@sanity/block-content-to-react";
import { Twitter, Facebook, File } from "react-feather";

import DefaultLayout from "../../layouts";
import { Aside, BlockContainer, Header, Main } from "./styled";

const GATSBY_SANITY_PROJECT_ID = process.env.GATSBY_SANITY_PROJECT_ID;
const GATSBY_SANITY_DATASET = process.env.GATSBY_SANITY_DATASET;

function PostTemplate(props: any) {
  const post = props.data.sanityPost;
  const postFileUrl = post.file?.asset.url;

  return (
    <DefaultLayout title={post.title}>
      <Header>
        {Boolean(post.mainImage?.asset.gatsbyImageData) && (
          <GatsbyImage
            style={{ minWidth: 160, width: "100%" }}
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
            <a href={postFileUrl} download>
              Descarga versión PDF
              <File />
            </a>
          )}
          <ul>
            <li>
              <a href="https://twitter.com">
                Compartir a Twitter
                <Twitter />
              </a>
            </li>
            <li>
              <a href="https://facebook.com">
                Compartir a Facebook
                <Facebook />
              </a>
            </li>

            {/* {typeof window !== undefined &&
              typeof window?.navigator !== undefined && (
                <li>
                  <button
                    onClick={() => {
                      window.navigator
                        .share({
                          title: post.title,
                          text: post.title,
                          url: `https://thefeathergirlblog.com/${post.slug}`,
                        })
                        .catch(() => undefined);
                    }}
                  >
                    Compartir
                    <Share />
                  </button>
                </li>
              )} */}
          </ul>
        </Aside>
      </Main>
    </DefaultLayout>
  );
}

export default PostTemplate;

export const query = graphql`
  query ($id: String) {
    sanityPost(id: { eq: $id }) {
      _createdAt

      title
      _rawBody

      mainImage {
        asset {
          gatsbyImageData
        }
      }

      file {
        asset {
          url
        }
      }
    }
  }
`;
