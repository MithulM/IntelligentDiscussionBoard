import React from "react"
import ReactDom from "react-dom"
import "../styles/Modal.css"

function Modal({ open, title, children, onClose, onConfirm }) {
    if (!open) {
        return null;
    }
    return ReactDom.createPortal(
        <React.Fragment>
            <div className="modal-overlay" />
            <section className="modal">
                <h1 className="modal-title">{title}</h1>
                <div className="content">
                    {children}
                </div>
                <div className="button-container">
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                    <button className="confirm-button" onClick={onConfirm}>Confirm</button>
                </div>
            </section>
        </React.Fragment>,
        document.getElementById('portal')
    )
}

export default Modal;