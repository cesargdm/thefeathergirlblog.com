import React from 'react';
import Link from 'gatsby-link';
import './Tag.scss';
import PageProps from '../models/PageProps';
import DefaultLayout from '../layouts';

class TagTemplate extends React.PureComponent<PageProps> {
  public render() {
    const { posts, tagName } = this.props.pathContext;

    return (
      <>
        <DefaultLayout />
        <div className="tags-content">
          <span>Posts about {tagName}:</span>
          <ul>
            {posts
              ? posts.map((post: any, index: number) => (
                  <li key={index}>
                    <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </>
    );
  }
}

export default TagTemplate;
