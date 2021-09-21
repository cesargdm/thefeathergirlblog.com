import * as React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import { Twitter, Facebook } from 'react-feather'

import './index.css'
import './default.css'

import { Body, Footer } from './styled'

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
  title: string
  image?: string
  location?: {
    href: string
    pathname: string
  }
}

const currentYear = new Date().getFullYear()
const defaultTitle = 'The Feather Girl Blog'
const description =
  'I write images and they write me. Read me to find out artsy stuff !'

function DefaultLayout(props: DefaultLayoutProps) {
  const { image, title, location } = props

  return (
    <>
      <Helmet
        titleTemplate={`%s - ${defaultTitle}`}
        title={title}
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: 'blog, feather girl' },
        ]}
      >
        {image && <meta property="og:image" content={image} />}
        {location?.href && <meta property="og:url" content={location.href} />}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title ?? defaultTitle} />
        <meta property="og:description" content={description} />

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
              <Link to="/">The Feather Girl Blog</Link> &copy; {currentYear}{' '}
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
  )
}

export default DefaultLayout
