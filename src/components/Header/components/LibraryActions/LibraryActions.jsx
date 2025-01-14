import { NavLink } from 'react-router-dom';
import styles from './LibraryActions.module.scss';

export default function LibraryActions() {

    // Getting className string for NavLinks
    function getNavLinkClassName(isActive) {
        return (activeClassName, className) => {
            return isActive ? `${activeClassName} ${className}` : className;
        }
    }

    return (
        <div className={styles['navlinks-container']}>
            <NavLink to='/library/watched' className={({ isActive }) => getNavLinkClassName(isActive)(styles['navlink--selected'], styles['navlink'])}>Watched</NavLink>
            <NavLink to='/library/queue' className={({ isActive }) => getNavLinkClassName(isActive)(styles['navlink--selected'], styles['navlink'])}>Queue</NavLink>
        </div>
    );
}