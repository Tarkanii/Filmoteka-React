import Button from '../../../Button';
import styles from './LibraryActions.module.scss';

export default function LibraryActions() {
    return (
        <div className={styles['action-buttons-container']}>
            <Button className={styles['action-button']} header>Watched</Button>
            <Button className={styles['action-button']} header>Queue</Button>
        </div>
    );
}