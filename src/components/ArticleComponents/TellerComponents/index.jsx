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
                    {teller.avatar_url && (
                        <img
                            src={`http://localhost:8080/teller/avatar${teller.avatar_url}`}
                            alt={teller.name}
                            className={styles.avatar}
                        />
                    )}
                    <h2 className={styles.name}>{teller.name}</h2>
                </div>
                {uploaderName && <UserDetails name={uploaderName} />}
                <p className={styles.intro}>{teller.intro}</p>
            </div>
        );
    }
}
