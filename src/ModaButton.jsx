import Modal from "./Modal";

function ModalButton({ title, className, isOpen}) {
    return (
        <>
            <button onClick={() => setFunc(true)} className={className} >Reply</button>
            <Modal open={isOpen} onClose={() => setFunc(false)} title={title}>
                <form className="comments-form">
                    <label className="comments-label">Leave a comment:</label>
                    <textarea
                        className="comments-input"
                        id="comment-body"
                        placeholder="Enter your comment here"
                        rows="10"
                        cols="45"
                    ></textarea>
                </form>
            </Modal>
        </>
    )
}

export default ModalButton;