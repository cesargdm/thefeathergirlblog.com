import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import BlockContent from "@sanity/block-content-to-react";
import { Twitter, Facebook, File } from "react-feather";

import DefaultLayout from "../layouts";

const GATSBY_SANITY_PROJECT_ID = process.env.GATSBY_SANITY_PROJECT_ID;
const GATSBY_SANITY_DATASET = process.env.GATSBY_SANITY_DATASET;

function PostTemplate(props: any) {
  const post = props.data.sanityPost;
  const postFileUrl = post.file?.asset.url;

  return (
    <DefaultLayout title={post.title}>
      <header>
        {Boolean(post.mainImage?.asset.gatsbyImageData) && (
          <GatsbyImage
            style={{ minWidth: 160, maxWidth: "100%" }}
            alt=""
            image={post.mainImage.asset.gatsbyImageData}
          />
        )}
        <h1>{post.title}</h1>
        <p>{new Date(post._createdAt).toLocaleDateString()}</p>
      </header>
      <main
        style={{ display: "grid", gridTemplateColumns: "1fr 250px", gap: 20 }}
      >
        <div style={{ maxWidth: 800 }}>
          <BlockContent
            projectId={GATSBY_SANITY_PROJECT_ID}
            dataset={GATSBY_SANITY_DATASET}
            blocks={post._rawBody}
          />
        </div>
        <aside style={{ postion: "sticky", top: 0 }}>
          {postFileUrl && (
            <a href={postFileUrl} download>
              Descarga versión PDF
              <File />
            </a>
          )}
          <hr />
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
        </aside>
      </main>
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
