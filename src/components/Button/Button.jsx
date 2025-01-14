import styles from './Button.module.scss';

export default function Button({ children, selected = false, className = '', onClick = () => {} }) {
    return (
        <button 
            className={`${className} ${styles['button']} ${selected ? styles['selected'] : ''}`}
            onClick={onClick}    
        >
            {children}
        </button>
    )
}