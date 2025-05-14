import React from 'react';
    import PropTypes from 'prop-types';
    import styles from './index.module.scss';

    function TitleComponents({title, era, location, startYear, endYear, startMonth, endMonth}) {
        const formatDate = () => {
            // 只有起始年代
            if (era && !startYear && !endYear && !startMonth && !endMonth) {
                return `${String(era).substring(0, 4)}年代`;
            }

            // 只有起始年
            if (startYear && !endYear && !startMonth && !endMonth) {
                return `${startYear}年`;
            }

            // 起始年和结束年
            if (startYear && endYear && !startMonth && !endMonth) {
                return `${startYear}年 - ${endYear}年`;
            }

            // 只有起始年和月
            if (startYear && startMonth && !endYear && !endMonth) {
                return `${startYear}年${startMonth}月`;
            }

            // 完整的起始和结束时间
            if (startYear && startMonth && endYear && endMonth) {
                return `${startYear}年${startMonth}月 - ${endYear}年${endMonth}月`;
            }

            return '时间未知';
        };

        return (
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.metaInfo}>
                    <div className={styles.metaItem}>
                        <label>时间</label>
                        <div>{formatDate()}</div>
                    </div>
                    {location && (
                        <div className={styles.metaItem}>
                            <label>地点</label>
                            <div>{location}</div>
                        </div>
                    )}
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