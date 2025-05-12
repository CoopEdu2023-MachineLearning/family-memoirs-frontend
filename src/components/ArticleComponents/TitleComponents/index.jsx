import React from 'react';
import styles from './index.module.scss';

function TitleComponents({title, era, startDate, endDate, location}) {
    return (
        <div className={styles.titleContainer}>
            <h1 className={styles.title}>{title}</h1>

            <div className={styles.metaInfo}>
                {era && (
                    <div className={styles.metaItem}>
                        <div>
                            {era && /^\d{4}年?$/.test(String(era)) && (
                                <span>{String(era).substring(2, 4)}年代 {location}</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TitleComponents;