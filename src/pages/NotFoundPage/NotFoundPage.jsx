import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
    return (
        <div className={styles['message-container']}>
            <p className={styles['message']}>404 Page not found</p>
        </div>
    );
}