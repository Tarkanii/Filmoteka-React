import styles from './Footer.module.scss';
import sprite from '../../assets/sprite.svg';

export default function Footer() {
    return (
        <footer className={styles['footer']}>
            <p className={styles['footer__copyright']}>&copy;  2020 | All Rights Reserved |</p>
            <p className={styles['footer__developed-with']}>
                Developed with 
                <svg className={styles['footer__copyright-icon']}>
                    <use href={sprite + '#icon-love'}></use>
                </svg> 
                <a className={styles['footer__copyright-link']} href="https://github.com/Tarkanii" target='_blank'>by GoIT Student</a>
            </p>
        </footer>
    )
}