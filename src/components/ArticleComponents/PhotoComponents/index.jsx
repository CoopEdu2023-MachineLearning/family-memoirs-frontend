import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

export default function PhotoComponents({photos}) {
    const [selected, setSelected] = useState(null);

    const formatPhotos = () => {
        if (!photos || photos.length === 0) {
            return null;
        }
        if (photos.length === 1 || photos.length === 2) {
            return (
                <div className={styles.galley_simple}>
                    {photos.map(photo => (
                        <div className={styles.item} key={photo.id}>
                            <img
                                className={styles.image}
                                src={`http://localhost:8080${photo.imageUrl}`}
                                alt={`Photo ${photo.id}`}
                                loading="lazy"
                                onClick={() => setSelected(photo)}
                            />
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div className={styles.gallery}>
                    {photos.map(photo => (
                        <div className={styles.item} key={photo.id}>
                            <img
                                className={styles.image}
                                src={`http://localhost:8080${photo.imageUrl}`}
                                alt={`Photo ${photo.id}`}
                                loading="lazy"
                                onClick={() => setSelected(photo)}
                            />
                        </div>
                    ))}
                </div>
            )
        }
    }

// 三张及以上图片的渲染
    return (
        <>
            <div>{formatPhotos()}</div>
            {selected && (
                <div className={styles.lightbox}>
                    <img
                        src={`http://localhost:8080${selected.imageUrl}`}
                        alt={`Photo ${selected.id}`}
                        className={styles.lightboxImage}
                    />
                    <button
                        className={styles.closeButton}
                        onClick={() => setSelected(null)}
                    >
                        ×
                    </button>
                </div>
            )}
        </>
    );
}

PhotoComponents.propTypes = {
    photos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            imageUrl: PropTypes.string.isRequired,
        })
    ),
};
