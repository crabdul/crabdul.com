import React from 'react';
import PropTypes from 'prop-types';

export const HTMLContent = ({ content, className }) => (
    <div className="prose text-lightpink">
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    </div>
);

const Content = ({ content, className }) => (
    <div className="text-gray-400 prose">
        <div className={className}>{content}</div>
    </div>
);

Content.propTypes = {
    content: PropTypes.node,
    className: PropTypes.string,
};

HTMLContent.propTypes = Content.propTypes;

export default Content;
