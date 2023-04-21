import React from "react"
import ReactDom from "react-dom"
import "./Modal.css"

function Modal({ open, children, onClose }) {
    if (!open) {
        return null;
    }
    return ReactDom.createPortal(
        <React.Fragment>
            <div className="modal-overlay" />
            <div className="Modal">
                <button onClick={onClose} className="closeButton">Close</button>
                {children}
            </div>
        </React.Fragment>,
        document.getElementById('portal')
    )
}

export default Modal;