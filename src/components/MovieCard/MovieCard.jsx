import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fetchService } from "../../services";
import { MovieModal } from "../";
import styles from './MovieCard.module.scss';
import sprite from '../../assets/sprite.svg';

export default function MovieCard({ movieDetails, library = false }) {
    const [modalOpen, setModalOpen] = useState(false);
    const movieCardLinkRef = useRef(null);
    const savedGenres = useSelector(state => state.genres.genres);
    const { poster_path, genres, title, vote_average, release_date } = movieDetails;
    let { genre_ids } = movieDetails;

    if (library) {
        genre_ids = genres ? genres.map(({id}) => id) : [];
        movieDetails = {...movieDetails, genre_ids}
    }

    // Getting genres paragraph for movie card
    let genresLine = '';
    if (savedGenres.length && genre_ids) {
        genresLine = genre_ids.slice(0, 3).reduce((prev, genre_id, index) => {
            const genreName = savedGenres.find((genre) => genre.id === genre_id).name;
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
                <a className={styles['movie-card__link']} href="/" onClick={handleOnClick} ref={movieCardLinkRef}>
                    <div className={`${styles['movie-card__img-container']} ${ poster_path ? '' : styles['substitute']}`}>
                        { poster_path ? 
                            <img src={fetchService.imgUrl + poster_path} alt={title} /> 
                            :
                            <svg className={styles['movie-card__poster-substitute__icon']}>
                                <use href={sprite + '#icon-image'}></use>
                            </svg>
                        }

                    </div>
                    {title && <h3 className={styles['movie-card__title']}>{title}</h3>}
                    <div className={styles['movie-card__genres-container']}>
                        {genresLine && <p className={styles['movie-card__genres']}>{genresLine} | {release_date && release_date.split('').slice(0, 4).join('')}</p>}
                        {library && vote_average && <span className={styles['movie-card__vote']}>{vote_average.toFixed(1)}</span>}
                    </div>
                </a>
            </li> 
            {modalOpen && <MovieModal movieDetails={movieDetails} closeModal={() => closeModalWindow()} />}
        </>
    );
}