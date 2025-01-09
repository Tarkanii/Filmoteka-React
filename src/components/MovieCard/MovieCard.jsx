import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fetchService } from "../../services";
import { MovieModal } from "../";
import styles from './MovieCard.module.scss';

export default function MovieCard({ movieDetails, type = 'home' }) {
    const [modalOpen, setModalOpen] = useState(false);
    const movieCardLinkRef = useRef(null);
    const genres = useSelector(state => state.genres.genres);
    const { poster_path, genre_ids, title, vote_average, release_date } = movieDetails;

    // Getting genres paragraph for movie card
    let genresLine = '';
    if (genres.length) {
        genresLine = genre_ids.slice(0, 3).reduce((prev, genre_id, index) => {
            const genreName = genres.find((genre) => genre.id === genre_id).name;
            if (index === 0) return genreName;
            return prev + `, ${genreName}`;
        }, '');
    }

    // Handling click on movie card
    function handleOnClick(e) {
        e.preventDefault();
        setModalOpen(true);
    }

    // Close modal window
    function closeModalWindow() {
        movieCardLinkRef.current.focus();
        setModalOpen(false);
    }

    return (
        <>
            <li className={styles['movie-card']}>
                <a className={styles['movie-card__link']} href="#" onClick={handleOnClick} ref={movieCardLinkRef}>
                    <div className={styles['movie-card__img-container']}>
                        <img src={fetchService.imgUrl + poster_path} alt={title} />
                    </div>
                    {title && <h3 className={styles['movie-card__title']}>{title}</h3>}
                    <div className={styles['movie-card__genres-container']}>
                        {genresLine && <p className={styles['movie-card__genres']}>{genresLine} | {release_date && release_date.split('').slice(0, 4).join('')}</p>}
                        {type === 'library' && vote_average && <span className={styles['movie-card__vote']}>{vote_average.toFixed(1)}</span>}
                    </div>
                </a>
            </li> 
            {modalOpen && <MovieModal movieDetails={movieDetails} closeModal={() => closeModalWindow()}  />}
        </>
    );
}