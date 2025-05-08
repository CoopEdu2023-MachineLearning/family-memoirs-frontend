import React from 'react';
    import PropTypes from 'prop-types';
    import styles from './index.module.scss';

    const Tags = ({ tags }) => {
        return (
            <div className={styles.tags}>
                {tags.map((tag, idx) => (
                    <span key={idx} className={styles['tags__item']}>
                        {tag}
                    </span>
                ))}
            </div>
        );
    };

    Tags.propTypes = {
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    };

    export default Tags;