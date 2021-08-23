import styles from './Cell.module.css'

export default function Cell ({ number }) {
    return <div className={styles.prefilledcell}>
        {number}
    </div>
}