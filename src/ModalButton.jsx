import { Children } from "react";
import Modal from "./components/Modal";

function ModalButton({ title, className, isOpen, children, setFunc, buttonName, onConfirm }) {
    return (
        <>
            <button onClick={() => setFunc(true)} className={className} >{buttonName}</button>
            <Modal open={isOpen} onClose={() => setFunc(false)} title={title} onConfirm={onConfirm}>
                {children}
            </Modal>
        </>
    )
}

export default ModalButton;