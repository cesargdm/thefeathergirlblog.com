import * as React from "react";
import { Link } from "gatsby";
import Helmet from "react-helmet";
import { Twitter, Facebook } from "react-feather";

import "./index.css";
import "./default.css";

import { Body, Footer } from "./styled";

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  location?: {
    pathname: string;
  };
}

const currentYear = new Date().getFullYear();

function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <>
      <Helmet
        titleTemplate="%s | The Feather Girl Blog"
        title={props.title}
        meta={[
          { name: "description", content: "template" },
          { name: "keywords", content: "blog, feather girl" },
        ]}
      >
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;800&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Body>
        {props.children}
        <Footer>
          <div>
            <p>
              <Link to="/">The Feather Girl Blog</Link> &copy; {currentYear}{" "}
            </p>
            <p>
              <Twitter />
              <Facebook />
            </p>
            <p>
              <Link to="/">Home</Link>
            </p>
          </div>
        </Footer>
      </Body>
    </>
  );
}

export default DefaultLayout;
