import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { getTrendingMovies } from "../../redux/movies/thunks";
import { MovieList, Loader, Button} from "../../components";
import styles from './HomePage.module.scss';

export default function HomePage() {
    const isError = useSelector(state => state.movies.error);
    const isLoading = useSelector(state => state.movies.loading);
    const movies = useSelector(state => state.movies.movies);
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);

    useEffect(() => {
        // Redirecting to home route 
        if (location.pathname === '/') {
            navigate(`/home${params?.page ? '?page=' + params.page : ''}${params.search ? '&search=' + params.search : ''}`);
        } else {
            // Getting trending movies ones on the right path
            dispatch(getTrendingMovies({ page: Number(params?.page) || 1 }));
        }
    }, [dispatch, location.pathname, navigate, params.page, params.search])
    
    // Getting movies on try again button click
    function tryAgain() {
        dispatch(getTrendingMovies({ page: Number(params?.page) || 1 }));
    }

    return (
        <section className={`${styles['movies-section']} section`}>
            <div className={`${ isError ? styles['error-container'] : ''} container`}>
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