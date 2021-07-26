import * as React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { File } from "react-feather";

import isotype from '../assets/isotype.svg'

import DefaultLayout from "../layouts"
import { Article, Header, HeaderLinks, PostsContainer } from "../styled";

function IndexPage({ data }) {
  const {
    allSanityPost: { nodes: posts },
  } = data;

  return (
    <DefaultLayout title="Home">
      <Header>
        <div style={{display: 'flex', alignItems: 'center'}}>
        <h1 style={{ fontWeight: 800 }}>The Feather Girl Blog</h1>
        <img style={{marginLeft: 10,height: 80, width: 80}} src={isotype} />
        </div>
        <HeaderLinks>
          <li>
            <Link to="/atl">Author</Link>
          </li>
        </HeaderLinks>
      </Header>
      <PostsContainer>
        {posts
          .filter(({ slug }) => slug?.current)
          .map((post) => {
            const hasLargeTitle = post.title?.length > 30 ? 1 : 0;
            const hasExtract = post.extract ? 1 : 0;
            const fileExtension = post.file?.asset.extension;
            // const hasLargeExtract = post.extract?.length > 120 ? 1 : 0;

            return (
              <Link
                style={{
                  display: "block",
                  borderRight: "1px solid darkgray",
                  // gridRow: `span ${hasLargeExtract + 1}`,
                  gridColumn: `span ${1}`,
                }}
                to={`/${post.slug.current}`}
                key={post._id}
              >
                <Article>
                  {fileExtension && (
                    <span>
                      <File size={20} />
                      {` ${fileExtension.toUpperCase()}`}
                    </span>
                  )}
                  <div>
                    <h2
                      style={{
                        fontSize: hasLargeTitle ? "1.75rem" : "2.5rem",
                        wordWrap: "break-word",
                      }}
                    >
                      {post.title}
                    </h2>
                  </div>
                  <p style={{ fontSize: "0.9rem" }}>
                    {new Date(post._createdAt).toLocaleDateString()}
                  </p>
                  {Boolean(post.mainImage?.asset.gatsbyImageData) && (
                    <GatsbyImage
                      style={{ minWidth: 160, maxWidth: "100%" }}
                      alt=""
                      image={post.mainImage.asset.gatsbyImageData}
                    />
                  )}
                  {Boolean(hasExtract) && (
                    <p
                      style={{
                        maxHeight: "100px",
                        overflow: "hidden",
                        fontSize: "1rem !important",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {post.extract}
                    </p>
                  )}
                  {post.categories.map((category) => (
                    <span key={category._id}>{category.title}</span>
                  ))}
                </Article>
              </Link>
            );
          })}
      </PostsContainer>
    </DefaultLayout>
  );
}

export default IndexPage;

export const query = graphql`
  query {
    allSanityPost(
      sort: { fields: _updatedAt, order: DESC }
    ) {
      nodes {
        _id
        _createdAt
        title
        extract
        slug {
          current
        }
        file {
          _key
          asset {
            extension
          }
        }
        mainImage {
          asset {
            gatsbyImageData
          }
        }
        categories {
          _id
          title
        }
        _rawBody
      }
    }
  }
`;
