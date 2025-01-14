import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getLibraryMovies from "../../redux/library/thunks";
import { Button, Loader, MovieList } from "../../components";
import styles from './LibraryPage.module.scss';

export default function LibraryPage({ type = 'watched'}) {
    const isLoading = useSelector(state => state.library.loading);
    const isError = useSelector(state => state.library.error);
    const watched = useSelector(state => state.library.watched);
    const queue = useSelector(state => state.library.queue);
    const movies = useSelector(state => state.library.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Library';
    }, [])

    useEffect(() => {
        if (type === 'queue') {
            dispatch(getLibraryMovies({ movieIds: queue }));
        } else if (type === 'watched') {
            dispatch(getLibraryMovies({ movieIds: watched }));
        }
    }, [dispatch, queue, type, watched]);


    // Try again function in case of load fail
    function tryAgain() {
        if (type === 'queue') {
            dispatch(getLibraryMovies({ movieIds: queue }));
        } else if (type === 'watched') {
            dispatch(getLibraryMovies({ movieIds: watched }));
        }
    }

    return (
        <section className={`${styles['library-section']} section`}>
            <div className={`${ isError ? styles['error-container'] : ''} container`}>
                {isLoading && <Loader />}
                {isError && 
                    <>
                        <p className={styles['error-message']}>Error Loading :(</p>
                        <Button className={styles['try-again-button']} onClick={tryAgain}>Try again</Button>
                    </>
                }
                {!isLoading && !isError && <MovieList movies={movies} library/>}
            </div>
        </section>
    );
}