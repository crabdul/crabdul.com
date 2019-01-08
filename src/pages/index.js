import React from 'react'
import PropTypes from 'prop-types'
import { navigate, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'


const whichTransitionEvent = (el) => {
    const transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    let t;
    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}

const animateAndNavigateTo = (e, slug) => {
    const $target = e.currentTarget
    const distanceToTop = $target.offsetTop
    const maxHeight = document.querySelector('.spacer').offsetHeight;
    const transformHeight = distanceToTop - maxHeight
    $target.style.transform = `translateY(-${transformHeight}px)`
    $target.style.transitionDuration = "0.8s"
    const transitionEvent = whichTransitionEvent($target)
    $target.addEventListener(transitionEvent, () => {
        setTimeout(() => {
            navigate(slug)
        }, 100)
    });
}

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="index-page">
          <div className="container">
            {posts
              .map(({ node: post }, i) => (
                    <article className="entry post-meta-content" onClick={(e) => animateAndNavigateTo(e, post.fields.slug)} key={post.id}>
						<div className='post-meta'>
							<h2>{post.frontmatter.title}</h2>
							<small>{post.frontmatter.date}</small>
						</div>
                    <div className="post-content">

                        <Img className='post-content' sizes={post.frontmatter.coverPhoto.childImageSharp.sizes} alt={post.frontmatter.title} />
                  <p>{post.excerpt}</p>
                  </div>
                    </article>
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
