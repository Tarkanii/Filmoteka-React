import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getMoviesBySearch, getTrendingMovies } from "../../redux/movies/thunks";
import { MovieList, Loader, Button} from "../../components";
import styles from './HomePage.module.scss';

export default function HomePage() {
    const isError = useSelector(state => state.movies.error);
    const isLoading = useSelector(state => state.movies.loading);
    const movies = useSelector(state => state.movies.movies);
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();

    useEffect(() => {
        // Getting trending movies ones on the right path
        if (searchParams.get('search')) {
            dispatch(getMoviesBySearch({ search: searchParams.get('search'), page: searchParams.get('page') || 1 }))
        } else {
            dispatch(getTrendingMovies({ page: searchParams.get('page') || 1 }));
        }
    }, [dispatch, searchParams])
    
    // Getting movies on try again button click
    function tryAgain() {
        if (searchParams.get('search')) {
            dispatch(getMoviesBySearch({ search: searchParams.get('search'), page: searchParams.get('page') || 1 }))
        } else {
            dispatch(getTrendingMovies({ page: searchParams.get('page') || 1 }));
        }
    }

    return (
        <section className={`${styles['movies-section']} section`}>
            <div className={`${isError ? styles['error-container'] : ''} container`}>
                {isLoading && <Loader />}
                {isError && 
                    <>
                        <p className={styles['error-message']}>Error Loading :(</p>
                        <Button className={styles['try-again-button']} onClick={tryAgain}>Try again</Button>
                    </>
                }
                {!isLoading && !isError && <MovieList movies={movies}/>}
            </div>
        </section>
    );
}