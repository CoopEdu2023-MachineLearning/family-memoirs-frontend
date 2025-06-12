import React from 'react';
import styles from './index.module.scss';
import UserDetails from './UserComponents';

export default function TellerComponents({ teller, uploaderName }) {
    if (!teller) {
        return null;
    } else {
        return (
            <div className={styles.teller}>
                <div className={styles.header}>
                    {teller.avatarUrlOld && (
                        <img
                            src={`http://localhost:8080/teller/avatar${teller.avatarUrlOld}`}
                            alt={teller.nameOld}
                            className={styles.avatar}
                        />
                    )}
                    <h2 className={styles.name}>{teller.nameOld}</h2>
                </div>
                {uploaderName && <UserDetails name={uploaderName} />}
                <div className={styles.intro}>{teller.introOld}</div>
            </div>
        );
    }
}
