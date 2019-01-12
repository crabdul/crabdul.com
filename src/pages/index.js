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
    // 15px rather than 16px as entry has a 1px top border
    const distanceToTop = $target.getBoundingClientRect().top - 15
    const spacerHeight = document.querySelector('.spacer').offsetHeight;
    $target.style.transitionDuration = "1s"
    $target.style.height = "1000px"
    console.log(Math.abs(distanceToTop - spacerHeight))
    if (Math.abs(distanceToTop - spacerHeight) < 16) {
        $target.style.boxSizing = 'content-box'
        $target.previousElementSibling.style.transitionDuration = "1s"
        $target.previousElementSibling.style.transform = `translateY(-${distanceToTop}px)`
    } else {
        $target.style.transform = `translateY(-${distanceToTop}px)`
        $target.style.paddingTop = `${spacerHeight}px`
    }
    const transitionEvent = whichTransitionEvent($target)
    setTimeout(() => {
        navigate(slug)
    }, 1100)
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
							<h2>{post.frontmatter.title}</h2>
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
