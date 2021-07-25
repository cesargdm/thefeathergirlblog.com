import React from "react";
import Link from "gatsby-link";
import PageProps from "../models/PageProps";
import DefaultLayout from "../layouts";

class AllTagTemplate extends React.PureComponent<PageProps> {
  public render() {
    const { tags } = this.props.pathContext;

    if (tags) {
      return (
        <>
          <DefaultLayout title="Tags" />
          <div className="all-tags-content">
            <p> Tag List </p>
            <ul>
              {tags.map((tag: any, index: number) => (
                <li key={index}>
                  <Link to={`/tags/${tag}`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    }
  }
}

export default AllTagTemplate;
