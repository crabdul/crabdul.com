import React from 'react';
import { animateAndNavigateTo } from '../utils/helpers';

const Entry = ({ post }) => (
    <article
        className="entry post-meta-content"
        onClick={(e) => animateAndNavigateTo(e, post.fields.slug)}
        key={post.id}
    >
        <div className="post-meta mb-2 sm:mb-0">
            <h2 className="text-lg font-bold p">{post.frontmatter.title}</h2>
            <small className="text-gray-800">{post.frontmatter.date}</small>
        </div>
        <div className="post-content">
            <p className="prose">{post.excerpt}</p>
        </div>
    </article>
);

export default Entry;
