import React from 'react';
import { animateAndNavigateTo } from '../utils/helpers';

const Entry = ({ post, showType }) => (
    <article
        className="entry post-meta-content bg-darkpurple border-t border-gray-500"
        onClick={e => animateAndNavigateTo(e, post.fields.slug)}
        key={post.id}
    >
        <div className="mb-2 post-meta sm:mb-0 md:mb-1">
            <h2 className="text-lg font-bold p text-pink">
                {post.frontmatter.title}
            </h2>
            <small className="text-base text-lightpink">
                {post.frontmatter.date}
            </small>
            {showType && (
                <div>
                    <small className="text-base opacity-75 text-lightpink">
                        {post.frontmatter.templateKey == 'til-post'
                            ? 'TIL'
                            : 'Blog'}
                    </small>
                </div>
            )}
        </div>
        <div className="post-content">
            <p className="text-lightpink prose">{post.excerpt}</p>
        </div>
    </article>
);

export default Entry;
