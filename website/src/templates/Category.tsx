import React from "react";
import Link from "gatsby-link";
import PageProps from "../models/PageProps";
import DefaultLayout from "../layouts";

class CategoryTemplate extends React.PureComponent<PageProps> {
  public render() {
    const { posts, categoryName } = this.props.pathContext;

    return (
      <>
        <DefaultLayout title="Categories" />
        <div className="categories-content">
          <span>Posts about {categoryName}:</span>
          <ul>
            {posts
              ? posts.map((post: any, index: number) => (
                  <li key={index}>
                    <Link to={post.frontmatter.path}>
                      {post.frontmatter.title}
                    </Link>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </>
    );
  }
}

export default CategoryTemplate;
