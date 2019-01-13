const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

const findPreviousPostId = (posts, index) => {
    const post = posts.find(
        post => post.node.frontmatter.templateKey == 'blog-post'
    )
    if (post) {
        return post.node.id
    }
    return null
}

const findNextPostId = (posts, index) => {
    return findPreviousPostId(posts.reverse(), index)
}

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions

    return graphql(`
        {
            allMarkdownRemark(
                limit: 1000
                sort: { fields: [frontmatter___date], order: DESC }
            ) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            tags
                            templateKey
                        }
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            result.errors.forEach(e => console.error(e.toString()))
            return Promise.reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges

        posts.forEach((edge, index) => {
            const id = edge.node.id

            const olderPosts = posts.slice(index + 1)
            const newerPosts = posts.slice(0, index)

            let previousId =
                index === 0 || olderPosts.length === 0
                    ? null
                    : findPreviousPostId(olderPosts, index)
            let nextId =
                index === posts.length - 1 && newerPosts.length === 0
                    ? null
                    : findNextPostId(newerPosts, index)
            if (!previousId) {
                previousId = posts[0].node.id
            }
            if (!nextId) {
                nextId = findPreviousPostId(olderPosts.reverse())
            }
            createPage({
                path: edge.node.fields.slug,
                tags: edge.node.frontmatter.tags,
                component: path.resolve(
                    `src/templates/${String(
                        edge.node.frontmatter.templateKey
                    )}.js`
                ),
                // additional data can be passed via context
                context: {
                    id,
                    nextId,
                    previousId,
                },
            })
        })

        // Tag pages:
        let tags = []
        // Iterate through each post, putting all found tags into `tags`
        posts.forEach(edge => {
            if (_.get(edge, `node.frontmatter.tags`)) {
                tags = tags.concat(edge.node.frontmatter.tags)
            }
        })
        // Eliminate duplicate tags
        tags = _.uniq(tags)

        // Make tag pages
        tags.forEach(tag => {
            const tagPath = `/tags/${_.kebabCase(tag)}/`

            createPage({
                path: tagPath,
                component: path.resolve(`src/templates/tags.js`),
                context: {
                    tag,
                },
            })
        })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
    fmImagesToRelative(node) // convert image paths for gatsby images

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
}
