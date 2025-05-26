import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const TagComponents = ({ tags }) => {
    if (!tags || tags.length === 0) {
        return null;
    }

    return (
        <div className={styles.tags}>
            {tags.map((tag) => (
                <button key={tag.id} className={styles['tags__item']}>
                    {tag.name}
                </button>
            ))}
        </div>
    );
};

TagComponents.propTypes = {
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
};

export default TagComponents;