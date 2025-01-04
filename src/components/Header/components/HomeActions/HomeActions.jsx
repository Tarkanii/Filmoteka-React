import styles from './HomeActions.module.scss';
import sprite from '../../../../assets/sprite.svg';

export default function HomeActions() {
    return (
        <form className={styles['search-form']}>
            <label htmlFor="searchInput" className={styles['search-form__label']}>
                <input id='searchInput' className={styles['search-form__input']} type="text" placeholder="Search films"/>
                <svg className={styles['search-form__icon']}>
                    <use href={sprite + '#icon-search'}></use>
                </svg>
            </label>
            <p className={styles['search-form__error']}>Search result not successful. Enter the correct movie name</p>
        </form>
    );
}