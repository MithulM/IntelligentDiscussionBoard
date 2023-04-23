import ModalButton from "./ModaButton";
import { useState } from "react";

function PostFooter() {
    const [isDelete, setDelete] = useState(false);
    const [isReply, setReply] = useState(false);
    const [isEdit, setEdit] = useState(false);

    const confirmDelete = () => {
        deleteAPI("delete_post", postID);
        setDelete(false);
        console.log("/" + post.course.course_number);
        navigate("/" + post.course.course_number.toLowerCase().replace(/\s/g, ''));
    }

    return (
        <div className="modify">
            <ModalButton title="Reply" className="ModifyPost" isOpen={isReply} buttonName="Reply" setFunc={setReply}>
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
            </ModalButton>
            <ModalButton title="Edit Post" className="ModifyPost edit" isOpen={isEdit} buttonName="Edit" setFunc={setEdit}>
                <form className="edit-form">
                    <label className="edit-label">Edit your post: </label>
                    <textarea
                        className="edit-input"
                        id="edit-body"
                        placeholder="Edit your post"
                        rows="10"
                        cols="45"
                    ></textarea>
                </form>
            </ModalButton>
            <ModalButton isOpen={isDelete} title="Delete Post" className="ModifyPost delete" setFunc={setDelete} buttonName="Delete" onConfirm={confirmDelete}>
                Are you sure you want to delete this post?
            </ModalButton>
        </div>
    )
}

export default PostFooter;