import React from 'react';
import PropTypes from 'prop-types';
import './UserDetails.scss';

const UserDetails = ({ avatarUrl, name, uploader, description }) => {
    return (
        <div className={'styles.user-details'}>
            <div className={'styles.user-details__header'}>
                <img
                    className={'styles.user-details__avatar'}
                    src={avatarUrl}
                    alt={name}
                />
                <h2 className={'styles.user-details__name'}>{name}</h2>
            </div>
            <div className={'styles.user-details__uploader'}>
                上传用户：<span className={'styles.user-details__uploader-name'}>{uploader}</span>
            </div>
            <p className={'styles.user-details__description'}>{description}</p>
        </div>
    );
};

UserDetails.propTypes = {
    avatarUrl: PropTypes.string.isRequired,
    name:       PropTypes.string.isRequired,
    uploader:   PropTypes.string.isRequired,
    description:PropTypes.string.isRequired,
};

export default UserDetails;
