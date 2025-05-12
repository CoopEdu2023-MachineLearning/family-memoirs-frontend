import React from 'react';
import PropTypes from 'prop-types';
import './index.module.scss';

const UserDetails = ({name}) => {
    return (
        <div className={'styles.user-details'}>
            <div className={'styles.user-details__uploader'}>
                上传用户：<span className={'styles.user-details__uploader-name'}>{name}</span>
            </div>
        </div>
    );
};

UserDetails.propTypes = {
    name:       PropTypes.string.isRequired,
};

export default UserDetails;
