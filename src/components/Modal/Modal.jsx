// Styles
import styles from './Modal.module.css';

/**
 * Modal component - Represents a reusable modal popup.
 *
 * @component
 * @param {React.Node} content - The content to show in the modal.
 * @param {function} onClose - The function executed after the modal closes.
 *
 * @returns {React.Component} The Modal component.
 */
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
