import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './HomeActions.module.scss';
import sprite from '../../../../assets/sprite.svg';
import { getMoviesBySearch } from '../../../../redux/movies/thunks';

export default function HomeActions() {
    const searchError = useSelector(state => state.movies.searchError);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchRef = useRef(null);
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        const search = searchRef.current.value.trim();
        if (search.length) {
            searchRef.current.value = '';
            if (searchParams.get('search') === search) {
                dispatch(getMoviesBySearch({ search, page: 1 }));
            } else {
                setSearchParams({ search, page: 1 });
            }
        } else {
            setSearchParams({});
        }
    }

    return (
        <form className={styles['search-form']} onSubmit={handleSubmit}>
            <label htmlFor="searchInput" className={styles['search-form__label']}>
                <input id='searchInput' className={styles['search-form__input']} type="text" placeholder="Search films" ref={searchRef}/>
                <svg className={styles['search-form__icon']}>
                    <use href={sprite + '#icon-search'}></use>
                </svg>
            </label>
            {searchError && <p className={styles['search-form__error']}>Search result not successful. Enter the correct movie name</p>}
        </form>
    );
}