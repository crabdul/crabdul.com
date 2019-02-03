import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Entry from '../components/Entry'
import Layout from '../components/Layout'

var a = []


export default class IndexPage extends React.Component {
    render() {
        const { data } = this.props
        const { edges: posts } = data.allMarkdownRemark

        return (
            <Layout>
                <section className="index-page">
                    <div className="container">
                        <ul className="entries">
                            {posts.map(({ node: post }, i) => (
                                <li key={i}>
                                    {i == 0 && <div className="black-line" />}
                                    <Entry post={post} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </Layout>
        )
    }
}

IndexPage.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export const pageQuery = graphql`
    query IndexQuery {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
            edges {
                node {
                    excerpt(pruneLength: 400)
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        coverPhoto {
                            childImageSharp {
                                sizes(maxWidth: 600) {
                                    ...GatsbyImageSharpSizes
                                }
                            }
                        }
                        title
                        templateKey
                        date(formatString: "MMMM DD, YYYY")
                    }
                }
            }
        }
    }
`
