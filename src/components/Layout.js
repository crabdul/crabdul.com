import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.scss'

const TemplateWrapper = ({ children }) => (
    <StaticQuery
        query={graphql`
            query HeadingQuery {
                site {
                    siteMetadata {
                        title
                        description
                    }
                }
            }
        `}
        render={data => (
            <div>
                <Helmet>
                    <html lang="en" />
                    <title>{data.site.siteMetadata.title}</title>
                    <meta
                        name="description"
                        content={data.site.siteMetadata.description}
                    />

                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/img/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        href="/img/favicon.png?v=2"
                        sizes="32x32"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        href="/img/favicon.png?v=2"
                        sizes="16x16"
                    />

                    <link
                        rel="icon"
                        type="image/x-icon"
                        href="/img/favicon.ico?v=2"
                        sizes="16x16"
                    />
                    <link
                        rel="mask-icon"
                        href="/img/safari-pinned-tab.svg"
                        color="#ff4400"
                    />
                    <meta name="theme-color" content="#fff" />

                    <meta property="og:type" content="business.business" />
                    <meta
                        property="og:title"
                        content={data.site.siteMetadata.title}
                    />
                    <meta property="og:url" content="/" />
                    <meta property="og:image" content="/img/favicon.png" />
                </Helmet>
                <Navbar />
                <div className="spacer" />
                <div>{children}</div>
                <Footer />
            </div>
        )}
    />
)

export default TemplateWrapper
