import React from 'react';
import { animateAndNavigateTo } from '../utils/helpers';

const Entry = ({ post }) => (
    <article
        className="entry post-meta-content dark:bg-darkpurple border-t border-black dark:border-gray-500"
        onClick={e => animateAndNavigateTo(e, post.fields.slug)}
        key={post.id}
    >
        <div className="mb-2 post-meta sm:mb-0 md:mb-1">
            <h2 className="text-lg font-bold p dark:text-pink">
                {post.frontmatter.title}
            </h2>
            <small className="text-base text-gray-800 dark:text-lightpink">
                {post.frontmatter.date}
            </small>
        </div>
        <div className="post-content">
            <p className="prose dark:text-gray-400">{post.excerpt}</p>
        </div>
    </article>
);

export default Entry;
