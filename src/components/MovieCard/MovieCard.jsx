import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchService } from "../../services";
import styles from './MovieCard.module.scss';

export default function MovieCard({ movieDetails, type = 'home' }) {
    const genres = useSelector(state => state.genres.genres);
    const { poster_path, genre_ids, id, title, vote_average, release_date } = movieDetails;

    // Getting genres paragraph for movie card
    let genresLine = '';
    if (genres.length) {
        genresLine = genre_ids.slice(0, 3).reduce((prev, genre_id, index) => {
            const genreName = genres.find((genre) => genre.id === genre_id).name;
            if (index === 0) return genreName;
            return prev + `, ${genreName}`;
        }, '');
    }


    return (
        <li className={styles['movie-card']}>
            <NavLink to={`${id}`}>
                <div className={styles['movie-card__img-container']}>
                    <img src={fetchService.imgUrl + poster_path} alt={title} />
                </div>
                {title && <h3 className={styles['movie-card__title']}>{title}</h3>}
                <div className={styles['movie-card__genres-container']}>
                    {genresLine && <p className={styles['movie-card__genres']}>{genresLine} | {release_date && release_date.split('').slice(0, 4).join('')}</p>}
                    {type === 'library' && vote_average && <span className={styles['movie-card__vote']}>{vote_average.toFixed(1)}</span>}
                </div>
            </NavLink>
        </li>
    );
}