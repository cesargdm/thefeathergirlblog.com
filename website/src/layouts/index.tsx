import * as React from "react";
import { Link } from "gatsby";
import Helmet from "react-helmet";
import { Twitter, Facebook } from "react-feather";

import "./index.css";
import "./default.css";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;800&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <body
        style={{
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          minHeight: "100vh",
          backgroundColor: '#F7F1E4'
        }}
      >
        {props.children}
        <footer>
          <div>
            <p>
              <Link to="/">The Feather Girl Blog</Link> &copy; {currentYear} </p>
            <p>
              <Twitter />
              <Facebook />
            </p>
            <p>
              <Link to="/">Home</Link>
            </p>
          </div>
        </footer>
      </body>
    </>
  );
}

export default DefaultLayout;
