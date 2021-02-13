import React from 'react';
import Img from 'gatsby-image';
import { animateAndNavigateTo } from '../utils/helpers';

const Entry = ({ post }) => (
    <article
        className="entry post-meta-content"
        onClick={e => animateAndNavigateTo(e, post.fields.slug)}
        key={post.id}
    >
        <div className="post-meta">
            <h2 className="p">{post.frontmatter.title}</h2>
            <small>{post.frontmatter.date}</small>
        </div>
        <div className="post-content">
            <Img
                className="post-content"
                sizes={post.frontmatter.coverPhoto.childImageSharp.sizes}
                alt={post.frontmatter.title}
            />
            <p>{post.excerpt}</p>
        </div>
    </article>
);

export default Entry;
