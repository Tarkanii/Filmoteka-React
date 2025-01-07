import { createPortal } from 'react-dom';
import styles from './Loader.module.scss';

export default function Loader() {
    return createPortal(
        <div className={styles['loader-backdrop']}>
            <div className={styles['loader']}>
                <div className={styles['block']}></div>
                <div className={styles['block']}></div>
                <div className={styles['block']}></div>
                <div className={styles['block']}></div>
                <div className={styles['block']}></div>
                <div className={styles['block']}></div>
                <div className={styles['block']}></div>
                <div className={styles['block']}></div>
                <div className={styles['block']}></div>
                <div className={styles['block']}></div>
                <div className={styles['block']}></div>
                <div className={styles['block']}></div>
                <div className={styles['block']}></div>
                <div className={styles['block']}></div>
                <div className={styles['block']}></div>
                <div className={styles['block']}></div>
            </div>
        </div>,
        document.getElementById('portal')
    );
}