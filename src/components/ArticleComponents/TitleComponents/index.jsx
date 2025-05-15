import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

function TitleComponents({era, location, startYear, endYear, startMonth, endMonth}) {
    const formatDateAndLocation = () => {
        // 只有起始年代
        if (era && !startYear && !endYear && !startMonth && !endMonth) {
            return `${String(era).substring(2, 4)}年代 ${location}`;
        }

        // 只有起始年
        if (startYear && !endYear && !startMonth && !endMonth) {
            return `${startYear}年 ${location}`;
        }

        // 起始年和结束年
        if (startYear && endYear && !startMonth && !endMonth) {
            return (
                <>
                    <div className={styles.date_style1}>
                        <span>{startYear}年-{endYear}年</span>
                        <span>{location}</span>
                    </div>
                </>
            );
        }

        // 只有起始年和月
        if (startYear && startMonth && !endYear && !endMonth) {
            return (
                <div className={styles.date_style1}>
                    <span>{startYear}年{startMonth}月</span>
                    <span>{location}</span>
                </div>
            );
        }

        // 完整的起始和结束时间
        if (startYear && startMonth && endYear && endMonth) {
            if (startYear === endYear) {
                return (
                    <div className={styles.date_style2}>
                        <span>{startYear}年{startMonth}月-{endMonth}月</span>
                        <span>{location}</span>
                    </div>
                )
            } else {
                return (
                    <div className={styles.date_style2}>
                        <span>{startYear}年{startMonth}月</span>
                        <div className={styles.second_line}>至
                            <div>{endYear}年{endMonth}月</div>
                        </div>
                        <span>{location}</span>
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