import styles from './Modal.module.css';

export default function Modal({ content, onClose }) {
  return (
    <div onClick={onClose} className={styles.bg}>
      <div className={styles.modal} id="confirmation">
        {content}
        <button className={styles.cross} onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}
