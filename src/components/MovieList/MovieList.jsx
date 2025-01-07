import { MovieCard } from "../";
import styles from './MovieList.module.scss';

export default function MovieList({ type = 'home', movies }) {

    return (
        <ul className={styles['movie-list']}>
            {
                movies.map((movie) => {
                    return (
                        <MovieCard movieDetails={movie} key={movie.id} />
                    )
                })
            }
        </ul>
    );
}