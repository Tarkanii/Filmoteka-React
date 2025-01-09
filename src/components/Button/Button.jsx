import styles from './Button.module.scss';

export default function Button({ children, selected = false, header = false, className = '', onClick }) {
    return (
        <button 
            className={`${className} ${styles['button']} ${selected ? styles['selected'] : ''} ${header ? styles['button--header'] : ''}`}
            onClick={onClick}    
        >
            {children}
        </button>
    )
}