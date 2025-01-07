import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getTrendingMovies } from "../../redux/movies/thunks";
import { MovieList, Loader, Button} from "../../components";
import styles from './HomePage.module.scss';

export default function HomePage() {
    const isError = useSelector(state => state.movies.error);
    const isLoading = useSelector(state => state.movies.loading);
    const movies = useSelector(state => state.movies.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTrendingMovies());
    }, [dispatch])

    return (
        <>
        <Navigate to="/home" />
            <section className={`${styles['movies-section']} section`}>
                <div className={`${ isError ? styles['error-container'] : ''} container`}>
                    {isLoading && <Loader />}
                    {isError && 
                        <>
                            <p className={styles['error-message']}>Error Loading :(</p>
                            <Button className={styles['try-again-button']}>Try again</Button>
                        </>
                    }
                    {!isLoading && !isError && <MovieList movies={movies}/>}
                </div>
            </section>
        </>
    );
}