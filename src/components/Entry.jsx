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
            <h2 className="p font-bold text-lg">{post.frontmatter.title}</h2>
            <small className="text-gray-800">{post.frontmatter.date}</small>
        </div>
        <div className="post-content">
            <Img
                className="mb-5 post-content"
                sizes={post.frontmatter.coverPhoto.childImageSharp.sizes}
                alt={post.frontmatter.title}
            />
            <p className="prose">{post.excerpt}</p>
        </div>
    </article>
);

export default Entry;
