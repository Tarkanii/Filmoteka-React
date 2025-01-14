import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';
import sprite from '../../assets/sprite.svg';

export default function Pagination() {
    const currentPage = useSelector(state => state.movies.currentPage);
    const totalPages = useSelector(state => state.movies.totalPages);
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useMemo(
        () => Object.fromEntries([...searchParams]),
        [searchParams]
    );

    if (currentPage === null || totalPages === null || totalPages < 2) return <></>;

    // Changing page on click
    function handleOnClick(e, page) {
        e.target.blur();
        if (page > totalPages || page < 1) return;
        setSearchParams({...params, page})
    }

    // Getting array with buttons for mobile pagination
    function getMobilePaginationButtons() {
        const numbers = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                numbers.push(i);
            }
        }

        if (totalPages > 5) {

            if (currentPage - 1 < 2) {
                for (let i = 1; i <= 5; i++) {
                    numbers.push(i);
                }
            }

            if (currentPage - 1 >= 2 && currentPage + 2 <= totalPages) {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    numbers.push(i);
                }
            }

            if (currentPage + 2 > totalPages) {
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    numbers.push(i);
                }
            }
        }

        return numbers.map((number) => {
            return (
                <button 
                    className={`${styles['pagination__button']} ${ currentPage === number ? styles['selected'] : ''}`}
                    onClick={(e) => handleOnClick(e, number)}
                    key={number}
                >
                    {number}
                </button>
            )
        });
    }

    // Getting array with buttons for full pagination
    function getFullPaginationButtons() {
        let numbers = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                numbers.push(i);
            }
        }

        if (totalPages > 7) {
            if (currentPage <= 4) {
                for (let i = 1; i < 7; i++) {
                    numbers.push(i);
                }
                numbers = numbers.concat([0, totalPages]);
            }

            if (currentPage > 4 && totalPages - currentPage > 4) {
                numbers = numbers.concat([1, 0]);
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    numbers.push(i);
                }
                numbers = numbers.concat([0, totalPages]);
            }

            if (totalPages - currentPage <= 4) {
                numbers = numbers.concat([1, 0]);
                for (let i = totalPages - 5; i <= totalPages; i++) {
                    numbers.push(i);
                }
            }
        }

        return numbers.map((number, index) => {
            if (number === 0) {
                return <div className={styles['pagination__dots']} key={index}>...</div>
            }

            return (
                <button 
                    className={`${styles['pagination__button']} ${ currentPage === number ? styles['selected'] : ''}`} 
                    onClick={(e) => handleOnClick(e, number)}
                    key={index}
                >
                    {number}
                </button>
            )
        })
    }

    return (
        <>
            <div className={`${styles['pagination']} ${styles['mobile']}`}>  
                <button 
                    disabled={currentPage === 1} 
                    className={styles['pagination__arrow-button']}
                    onClick={(e) => handleOnClick(e, currentPage - 1)}
                >
                    <svg className={styles['pagination__arrow-button__icon']}>
                        <use href={sprite + '#icon-arrow'}></use>
                    </svg>
                </button>
                {getMobilePaginationButtons()}
                <button 
                    disabled={currentPage === totalPages} 
                    className={`${styles['pagination__arrow-button']} ${styles['next']}`}
                    onClick={(e) => handleOnClick(e, currentPage + 1)}
                >
                    <svg className={styles['pagination__arrow-button__icon']}>
                        <use href={sprite + '#icon-arrow'}></use>
                    </svg>
                </button>
            </div>
            <div className={styles['pagination']}>  
                <button 
                    disabled={currentPage === 1} 
                    className={styles['pagination__arrow-button']}
                    onClick={(e) => handleOnClick(e, currentPage - 1)}
                >
                    <svg className={styles['pagination__arrow-button__icon']}>
                        <use href={sprite + '#icon-arrow'}></use>
                    </svg>
                </button> 
                {getFullPaginationButtons()}   
                <button 
                    disabled={currentPage === totalPages} 
                    className={`${styles['pagination__arrow-button']} ${styles['next']}`}
                    onClick={(e) => handleOnClick(e, currentPage + 1)}
                >
                    <svg className={styles['pagination__arrow-button__icon']}>
                        <use href={sprite + '#icon-arrow'}></use>
                    </svg>
                </button>
            </div>
        </>
    )
}