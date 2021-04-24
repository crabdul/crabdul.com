import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Entry from '../components/Entry';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

export const BlogPostTemplate = ({
    content,
    contentComponent,
    date,
    description,
    tags,
    title,
    helmet,
}) => {
    const PostContent = contentComponent || Content;

    return (
        <section className="section blog-post">
            {helmet || ''}
            <div className="container">
                <div className="post-meta-content">
                    <div className="mb-10 post-meta sm:mb-0 md:mb-4">
                        <h1 className="text-lg font-bold text-pink">{title}</h1>
                        <small className="text-base text-lightpink">
                            {date}
                        </small>
                    </div>
                    <div className="post-content">
                        <PostContent content={content} title={title} />
                        {tags && tags.length ? (
                            <div
                                style={{
                                    marginTop: `4rem`,
                                    marginBottom: `2rem`,
                                }}
                            >
                                <h4>Tags</h4>
                                <ul className="taglist">
                                    {tags.map(tag => (
                                        <li key={tag + `tag`}>
                                            <Link
                                                to={`/tags/${kebabCase(tag)}/`}
                                            >
                                                {tag}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </div>
                <script
                    src="https://utteranc.es/client.js"
                    repo="crabdul/crabdul.com"
                    issue-term="url"
                    label="comment"
                    theme="github-dark"
                    crossorigin="anonymous"
                    async
                ></script>
            </div>
        </section>
    );
};

BlogPostTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    date: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.array,
    title: PropTypes.string,
    helmet: PropTypes.object,
};

const BlogPost = ({ data }) => {
    const { post } = data;
    const { nextPost, previousPost } = data;
    const posts = [];
    if (nextPost) {
        if (nextPost.id !== post.id) {
            posts.push(nextPost);
        }
    }
    if (previousPost) {
        if (previousPost.id !== post.id && previousPost.id !== nextPost.id) {
            posts.push(previousPost);
        }
    }

    return (
        <Layout>
            <BlogPostTemplate
                content={post.html}
                contentComponent={HTMLContent}
                date={post.frontmatter.date}
                description={post.frontmatter.description}
                helmet={
                    <Helmet titleTemplate="%s | Blog">
                        <title>{`${post.frontmatter.title}`}</title>
                        <meta
                            name="description"
                            content={`${post.frontmatter.description}`}
                        />
                    </Helmet>
                }
                tags={post.frontmatter.tags}
                title={post.frontmatter.title}
            />
            <div className="container">
                <ul className="entries">
                    {posts.map((post, i) => (
                        <li key={i}>
                            <Entry post={post} />
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

BlogPost.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
};

export default BlogPost;

export const pageQuery = graphql`
    query BlogPostByID($id: String!, $nextId: String, $previousId: String) {
        post: markdownRemark(id: { eq: $id }) {
            id
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                description
                tags
            }
        }
        nextPost: markdownRemark(id: { eq: $nextId }) {
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
        previousPost: markdownRemark(id: { eq: $previousId }) {
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
`;
