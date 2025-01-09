import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { fetchService } from "../../services";
import { Button } from '../';
import styles from './MovieModal.module.scss';
import sprite from '../../assets/sprite.svg';

export default function MovieModal({ movieDetails, closeModal }) {
    const closeButtonRef = useRef(null);
    const genres = useSelector(state => state.genres.genres);
    const { poster_path, genre_ids, title, original_title, vote_average, vote_count, overview, popularity } = movieDetails;
    console.log(movieDetails);

    useEffect(() => {
        closeButtonRef.current.focus();
    }, [])

    // Handling onClick event
    function handleOnClick(e) {
        if (e.target.classList.contains(styles['modal-backdrop']) || e.target.classList.value.includes('modal__close-button')) {
            closeModal();
        }
    }

    // Handling onBlur event
    function handleOnBlur(e) {
        if (
            e.relatedTarget !== null &&
            !e.relatedTarget.classList.contains(styles['modal__close-button']) &&
            !e.relatedTarget.classList.contains(styles['modal__action-button'])
        ) {
            closeModal();
        }
    }

    // Getting genres paragraph for movie modal
    let genresLine = '';
    if (genres.length) {
        genresLine = genre_ids.reduce((prev, genre_id, index) => {
            const genreName = genres.find((genre) => genre.id === genre_id).name;
            if (index === 0) return genreName;
            return prev + `, ${genreName}`;
        }, '');
    }

    return createPortal(
        <div className={styles['modal-backdrop']} onClick={handleOnClick} onBlur={handleOnBlur}>
            <div className={`${styles['modal-container']} container`}>
                <div className={`${styles['modal']}`}>
                    <button className={styles['modal__close-button']} onClick={handleOnClick} ref={closeButtonRef}>
                        <svg className={styles['modal__close-button__icon']}>
                            <use href={sprite + '#icon-close'}></use>
                        </svg>
                    </button>
                    <img className={styles['modal__poster']} src={fetchService.imgUrl + poster_path} alt={title} height="300px"/>
                    <div className={styles['modal__information']}>
                        <h3 className={styles['modal__information__title']}>{title}</h3>
                        <ul className={styles['modal__information__list']}>
                            <li className={styles['modal__information__list__element']}>
                                <p className={styles['modal__information__list__key']}>Vote / Votes</p>
                                <p className={`${styles['modal__information__list__value']} ${styles['vote']}`}>
                                    {vote_average ? <span className={styles['vote-average']}>{vote_average.toFixed(1)}</span> : '_'} / {vote_count ? <span className={styles['vote-count']}>{vote_count}</span> : '_'}
                                </p>
                            </li>
                            <li className={styles['modal__information__list__element']}>
                                <p className={styles['modal__information__list__key']}>Popularity</p>
                                <p className={styles['modal__information__list__value']}>{popularity ? popularity.toFixed(1) : '_'}</p>
                            </li>
                            <li className={styles['modal__information__list__element']}>
                                <p className={styles['modal__information__list__key']}>Original Title</p>
                                <p className={`${styles['modal__information__list__value']} ${styles['title']}`}>{original_title ? original_title : '_'}</p>
                            </li>
                            <li className={styles['modal__information__list__element']}>
                                <p className={styles['modal__information__list__key']}>Genres</p>
                                <p className={styles['modal__information__list__value']}>{genresLine.length ? genresLine : '_'}</p>
                            </li>
                        </ul>
                        <h4 className={styles['modal__information__subtitle']}>About</h4>
                        <p className={styles['modal__information__description']}>{overview}</p>
                        <div className={styles['modal__information__buttons-container']}>
                            <Button className={styles['modal__action-button']}>Add to watched</Button>
                            <Button className={styles['modal__action-button']}>Add to queue</Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Focus bait to close modal window */}
            <button className='visually-hidden'></button>
        </div>,
        document.getElementById('portal')
    )
}