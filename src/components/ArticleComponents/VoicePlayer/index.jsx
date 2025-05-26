import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const formatTime = seconds => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export default function VoiceComponents({ audioList }) {
    const audioRefs = useRef({});
    const menuContainerRef = useRef(null);
    const [selectedId, setSelectedId] = useState(audioList[0]?.id || null);
    const [playingId, setPlayingId] = useState(null);
    const [progressMap, setProgressMap] = useState({});
    const [draggingId, setDraggingId] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        return () => Object.values(audioRefs.current).forEach(a => a && a.pause());
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuOpen &&
                menuContainerRef.current &&
                !menuContainerRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    const selected = audioList.find(item => item.id === selectedId);
    if (!selected) return null;

    const currentTime = progressMap[selected.id] || 0;
    const percent = selected.duration > 0 ? (currentTime / selected.duration) * 100 : 0;
    const isPlaying = playingId === selected.id;

    const handleTimeUpdate = id => {
        if (draggingId === id) return;
        const audio = audioRefs.current[id];
        if (audio) setProgressMap(prev => ({ ...prev, [id]: audio.currentTime }));
    };

    const handlePlayPause = id => {
        const currentAudio = audioRefs.current[id];
        if (!currentAudio) return;
        Object.values(audioRefs.current).forEach(a => a && a.id !== id && !a.paused && a.pause());
        if (playingId === id) {
            currentAudio.pause();
            setPlayingId(null);
        } else {
            currentAudio.play();
            setPlayingId(id);
        }
    };

    const handleEnded = id => {
        setPlayingId(null);
        setProgressMap(prev => ({ ...prev, [id]: 0 }));
    };

    const handleSeekStart = (id, duration, e) => {
        const bar = e.currentTarget;
        const update = x => {
            const rect = bar.getBoundingClientRect();
            const ratio = Math.min(Math.max((x - rect.left) / rect.width, 0), 1);
            const time = ratio * duration;
            const audio = audioRefs.current[id];
            if (audio) audio.currentTime = time;
            setProgressMap(prev => ({ ...prev, [id]: time }));
        };
        update(e.clientX);
        setDraggingId(id);
        const onMove = ev => update(ev.clientX);
        const onUp = () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            setDraggingId(null);
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    };

    return (
        <div className={styles.container}>
            {/* 音频选择与进度容器 */}
            <div className={styles.leftSection}>
                <div ref={menuContainerRef}>
                    <div className={styles.title} onClick={() => setMenuOpen(o => !o)}>
                        {selected.name || '音频'}
                        <span className={styles.arrow}>{menuOpen ? '▲' : '▼'}</span>
                    </div>
                {menuOpen && (
                    <ul className={styles.menu}>
                        {audioList.map(item => (
                            <li
                                key={item.id}
                                className={item.id === selectedId ? styles.active : ''}
                                onClick={() => {
                                    setSelectedId(item.id);
                                    setMenuOpen(false);
                                    if (item.id !== playingId) {
                                        setPlayingId(null);
                                    }
                                }}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )}
                </div>
                {/* 音频进度条和时间显示 */}
                <div className={styles.progressBar}
                     onMouseDown={e => handleSeekStart(selected.id, selected.duration, e)}>
                    <div className={styles.progress} style={{width: `${percent}%`}}/>
                    <div className={styles.dragHandle} style={{left: `${percent}%`}}/>
                </div>
                <div className={styles.timeRow}>
                <span className={styles.current}>{formatTime(currentTime)}</span>
                    <span className={styles.total}>-{formatTime(selected.duration - currentTime)}</span>
                </div>
            </div>
            {/* 播放按钮单独容器 */}
            <div className={styles.rightSection}>
                <button className={styles.playBtn} onClick={() => handlePlayPause(selected.id)}>
                    <span className={isPlaying ? styles.pauseIcon : styles.playIcon} />
                </button>
            </div>
            <audio
                ref={el => { audioRefs.current[selected.id] = el; }}
                src={`http://localhost:8080${selected.audioUrl}`}
                onTimeUpdate={() => handleTimeUpdate(selected.id)}
                onEnded={() => handleEnded(selected.id)}
            />
        </div>
    );
}

VoiceComponents.propTypes = {
    audioList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            audioUrl: PropTypes.string.isRequired,
            name: PropTypes.string,
            duration: PropTypes.number.isRequired
        })
    ).isRequired
};