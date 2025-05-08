import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.scss';

const WaveIcon = () => (
    <svg className={styles['wave-icon']} width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="2" height="8" fill="#888"/>
        <rect x="9" y="2" width="2" height="12" fill="#888"/>
        <rect x="15" y="6" width="2" height="4" fill="#888"/>
    </svg>
);

function VoicePlayer({ tracks, location }) {
    const [current, setCurrent] = useState(tracks[0] || null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    // 其它逻辑保持不变...

    if (!current) {
        return <div className={styles['voice-player-wrapper']}>加载中...</div>;
    }

    return (
        <div className={styles['voice-player-wrapper']}>
            <div className={styles['voice-player-bubble']}>
                <div className={styles.header}>
                    <span className={styles.location}>{location || current.location || '未知位置'}</span>
                    <span className={styles['header-time']}>{current.time}</span>
                </div>

                <div className={styles['track-list']}>
                    {tracks.map(track => (
                        <div
                            key={track.id}
                            className={`${styles['track-item']}${track.id === current.id ? ' ' + styles.active : ''}`}
                            onClick={() => selectTrack(track)}
                        >
                            {track.id === current.id ? (
                                <div className={styles['track-badge']}>
                                    <WaveIcon />
                                    <span className={styles['track-title']}>{track.title}</span>
                                </div>
                            ) : (
                                <span className={`${styles['track-title']} ${styles.plain}`}>{track.title}</span>
                            )}
                            <span className={styles['track-time']}>{track.time}</span>
                        </div>
                    ))}
                </div>

                <div className={styles['progress-bar']}>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={seek}
                    />
                    <div className={styles['time-labels']}>
                        <span className={styles.elapsed}>{current.time}</span>
                        <span className={styles.remaining}>{formatRemaining()}</span>
                    </div>
                </div>

                <audio ref={audioRef} src={current.src} preload="metadata" />
            </div>

            <div className={styles['control-button']} onClick={togglePlay}>
                {playing ? (
                    <>
                        <div className={styles.bar}></div>
                        <div className={styles.bar}></div>
                    </>
                ) : (
                    <div className={styles['play-triangle']}></div>
                )}
            </div>
        </div>
    );
}

export default VoicePlayer;