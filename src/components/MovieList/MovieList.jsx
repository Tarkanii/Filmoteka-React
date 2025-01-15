import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MovieCard, Pagination} from "../";
import styles from './MovieList.module.scss';

export default function MovieList({ library = false, movies }) {
    const modalOpen = useSelector(state => state.modal.modalOpen);

    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [modalOpen])

    return (
        <div className={`${styles['movie-list-container']} ${movies.length <= 0 ? styles['error'] : ''}`}>
            {movies.length > 0 ?
                <ul className={styles['movie-list']}>
                    {
                        movies.map((movie) => {
                            return (
                                <MovieCard movieDetails={movie} key={movie.id} library={library} />
                            )
                        })
                    }
                </ul> :
                <p className={styles['movies-error-message']}>Nothing Found...</p>
            }
            {library === false && <Pagination />}
        </div>
    );
}