import Modal from "./Modal";

function ModalButton({ title, className, isOpen, children, setFunc, buttonName, onConfirm }) {

    const closeOnConfirm = () => {
        onConfirm();
        setFunc(false)
    }
    return (
        <>
            <button onClick={() => setFunc(true)} className={className} >{buttonName}</button>
            <Modal open={isOpen} onClose={() => setFunc(false)} title={title} onConfirm={closeOnConfirm}>
                {children}
            </Modal>
        </>
    )
}

export default ModalButton;