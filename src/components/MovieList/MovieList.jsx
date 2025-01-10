import { MovieCard, Pagination} from "../";
import styles from './MovieList.module.scss';

export default function MovieList({ type = 'home', movies }) {

    return (
        <div className={`${styles['movie-list-container']} ${movies.length >= 0 ? styles['error'] : ''}`}>
            {movies.length > 0 ?
                <ul className={styles['movie-list']}>
                    {
                        movies.map((movie) => {
                            return (
                                <MovieCard movieDetails={movie} key={movie.id} />
                            )
                        })
                    }
                </ul> :
                <p className={styles['movies-error-message']}>Nothing Found...</p>
            }
            {type === 'home' && <Pagination />}
        </div>
    );
}