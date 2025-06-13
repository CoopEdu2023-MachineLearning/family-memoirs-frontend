import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

function TitleComponents({era, location, startYear, endYear, startMonth, endMonth}) {
    const formatDateAndLocation = () => {
        // 只有起始年代
        if (era && !startYear && !endYear && !startMonth && !endMonth) {
            return(
                <>
                    <span className={styles.digits}>{String(era).substring(2, 4)}</span>年代 {location}
                </>
            )
        }

        // 只有起始年
        if (startYear && !endYear && !startMonth && !endMonth) {
            return (
                <>
                    <span className={styles.digits}>{startYear}</span>年 {location}
                </>
            );
        }

        // 起始年和结束年
        if (startYear && endYear && !startMonth && !endMonth) {
            return (
                <>
                    <div className={styles.date_style1}>
                        <div><span className={styles.digits}>{startYear}</span>年-<span className={styles.digits}>{endYear}</span>年</div>
                        <div>{location}</div>
                    </div>
                </>
            );
        }

        // 只有起始年和月
        if (startYear && startMonth && !endYear && !endMonth) {
            return (
                <div className={styles.date_style1}>
                    <div><span className={styles.digits}>{startYear}</span>年<span className={styles.digits}>{startMonth}</span>月</div>
                    <div>{location}</div>
                </div>
            );
        }

        // 完整的起始和结束时间
        if (startYear && startMonth && endYear && endMonth) {
            if (startYear === endYear) {
                return (
                    <div className={styles.date_style2}>
                        <div><span className={styles.digits}>{startYear}</span>年<span className={styles.digits}>{startMonth}</span>月-<span className={styles.digits}>{endMonth}</span>月
                        </div>
                        <div>{location}</div>
                    </div>
                )
            } else {
                return (
                    <div className={styles.date_style2}>
                        <div><span className={styles.digits}>{startYear}</span>年<span className={styles.digits}>{startMonth}</span>月
                        </div>
                        <div className={styles.second_line}>至
                            <div><span className={styles.digits}>{endYear}</span>年<span className={styles.digits}>{endMonth}</span>月
                            </div>
                        </div>
                        <div>{location}</div>
                    </div>
                );
            }
        }

        return '时间未知';
    };

    return (
        <div className={styles.titleContainer}>
            <div className={styles.metaInfo}>
                <div className={styles.metaItem}>
                    <div>{formatDateAndLocation()}</div>
                </div>
            </div>
        </div>
    );
}

TitleComponents.propTypes = {
    title: PropTypes.string.isRequired,
    era: PropTypes.number,
    location: PropTypes.string,
    startYear: PropTypes.number,
    endYear: PropTypes.number,
    startMonth: PropTypes.number,
    endMonth: PropTypes.number
};

export default TitleComponents;