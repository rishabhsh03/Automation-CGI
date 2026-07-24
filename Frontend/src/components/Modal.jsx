import { createPortal } from "react-dom";
import "./Modal.css";
import { FaTimes } from "react-icons/fa";


export default function Modal({
    isOpen,
    onClose,
    title,
    children
}) {

    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>

                    <button
                        className="modal-close"
                        onClick={onClose}
                        type="button"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="modal-body">
                    {children}
                </div>

                <div className="modal-footer">
                  
                </div>
            </div>
        </div>,
        document.body
    );
}