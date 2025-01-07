import { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';

import HomeActions from './components/HomeActions';
import LibraryActions from './components/LibraryActions';

import sprite from '../../assets/sprite.svg';
import styles from './Header.module.scss';

export default function Header() {
    const location = useLocation();
    const [page, setPage] = useState('home');

    // Setting current page
    useEffect(() => {
        if (location?.pathname === '/') {
            setPage('home');
        } else if (location?.pathname === '/library') {
            setPage('library');
        } else {
            setPage('*');
        }
    }, [location])

    // Getting className string for NavLinks
    function getNavLinkClassName(isActive) {
        return (activeClassName, className) => {
            return isActive ? `${activeClassName} ${className}` : className;
        }
    }

    return (
        <header className={`${styles['header']} ${page === 'library' ? styles['library'] : ''} section`}> 
            <div className="container">
                <div className={styles['header__nav__container']}>
                    <NavLink to="/home" className={styles['logo']}>
                        <svg className={styles['logo__icon']}>
                            <use href={sprite + '#icon-logo'}></use>
                        </svg>
                        <p className={styles['logo__text']}>Filmoteka</p>
                    </NavLink>
                    <nav className={styles['header__nav']}>
                        <NavLink className={({ isActive }) => getNavLinkClassName(isActive)(styles['active'], styles['header__nav__link'])} to="/home">Home</NavLink>
                        <NavLink className={({ isActive }) => getNavLinkClassName(isActive)(styles['active'], styles['header__nav__link'])} to="/library">My library</NavLink>
                    </nav>
                </div>
                <Routes>
                    <Route path='/home' element={<HomeActions />}></Route>
                    <Route path='/library' element={<LibraryActions />}></Route>
                </Routes>
            </div>
        </header>
    );
}