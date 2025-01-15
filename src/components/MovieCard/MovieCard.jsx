import { useDispatch, useSelector } from "react-redux";
import { fetchService } from "../../services";
import { openModal } from '../../redux/modal/slice';
import styles from './MovieCard.module.scss';
import sprite from '../../assets/sprite.svg';

export default function MovieCard({ movieDetails, library = false }) {
    const savedGenres = useSelector(state => state.genres.genres);
    const dispatch = useDispatch();
    const { id, poster_path, genres, title, vote_average, release_date } = movieDetails;
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
        dispatch(openModal(movieDetails));
    }

    return (
        <li className={styles['movie-card']}>
            <a className={styles['movie-card__link']} href="/" onClick={handleOnClick} id={id}>
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
    );
}