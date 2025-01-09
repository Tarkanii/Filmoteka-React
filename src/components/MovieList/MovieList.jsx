import { MovieCard, Pagination} from "../";
import styles from './MovieList.module.scss';

export default function MovieList({ type = 'home', movies }) {

    return (
        <div className={styles['movie-list-container']}>
            <ul className={styles['movie-list']}>
                {
                    movies.map((movie) => {
                        return (
                            <MovieCard movieDetails={movie} key={movie.id} />
                        )
                    })
                }
            </ul>
            {type === 'home' && <Pagination />}
        </div>
    );
}