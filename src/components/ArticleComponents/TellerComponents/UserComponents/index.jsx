import React from 'react';
import PropTypes from 'prop-types';
import styles from  './index.module.scss';

export default function UserDetails ({name})  {
    return (
        <div className={styles.details}>
            <div className={styles.details__uploader}>
                上传用户：<span className={styles.details__name}>{name}</span>
            </div>
        </div>
    );
}

UserDetails.propTypes = {
    name:       PropTypes.string.isRequired,
};
