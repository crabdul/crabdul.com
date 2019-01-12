import React from 'react'
import PropTypes from 'prop-types'
import { navigate, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'


const animateAndNavigateTo = (e, slug) => {
    const $target = e.currentTarget
    $target.parentElement.style.transform = 'translateY(-32px)'
    // 15px rather than 16px as entry has a 1px top border
    const distanceToTop = $target.getBoundingClientRect().top - 15
    const spacerHeight = document.querySelector('.spacer').offsetHeight;
    $target.style.transitionDuration = "0.7s"
    if (Math.abs(distanceToTop - spacerHeight) < 16) {
        $target.style.boxSizing = 'content-box'
        $target.previousElementSibling.style.transitionDuration = "0.7s"
        $target.previousElementSibling.style.transform = `translateY(-${distanceToTop}px)`
    } else {
        $target.style.transform = `translateY(-${distanceToTop}px)`
        $target.style.paddingTop = `${spacerHeight}px`
    }
    $target.style.height = `${window.innerHeight}px`
    setTimeout(() => {
        navigate(slug)
    }, 700)
}

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="index-page">
          <div className="container">
            <ul>
            {posts
              .map(({ node: post }, i) => (
                  <li>
                      {i == 0 &&
                      <div className="black-line" />}
                    <article className="entry post-meta-content" onClick={(e) => animateAndNavigateTo(e, post.fields.slug)} key={post.id}>
						<div className='post-meta'>
							<h2 className="p">{post.frontmatter.title}</h2>
							<small>{post.frontmatter.date}</small>
						</div>
                    <div className="post-content">

                        <Img className='post-content' sizes={post.frontmatter.coverPhoto.childImageSharp.sizes} alt={post.frontmatter.title} />
                  <p>{post.excerpt}</p>
                  </div>
                    </article>
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
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
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
