import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="home-posts">
          <div className="container">
            {posts
              .map(({ node: post }) => (
                    <Link className="entry" to={post.fields.slug} key={post.id}>
						<div className=''>
							<h2>{post.frontmatter.title}</h2>
							<small>{post.frontmatter.date}</small>
						</div>
                        <Img sizes={post.frontmatter.coverPhoto.childImageSharp.sizes} alt={post.frontmatter.title} />
                    </Link>
              ))}
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
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
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
