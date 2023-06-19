import React, { useState } from "react";
import { editComment, postComment } from "../util/APIUtils";
import { toast } from "react-toastify";
import Like from "./Like";
import Share from "./Share";

const CommentBox = props => {
  const [comment, setComment] = useState(props.comment?.text || "");

  const handlePostComment = async () => {
    if (!comment) return;

    if (props.editComment) {
      handleEditComment();
      return;
    }

    try {
      const response = await postComment({
        postId: props.id,
        text: comment,
        userId: props.currentUser.id
      });
      if (response.id) {
        toast("Comment posted", { type: "success" });
        setComment("");
        props.updateComment(response);
      }
    } catch (error) {
      toast("Oops! Something went wrong.", { type: "error" });
    }
  };

  const handleEditComment = async () => {
    try {
      console.log(comment);
      const response = await editComment(props.comment.id, {
        ...props.comment,
        text: comment
      });
      if (response) {
        toast("Comment successfully updated", { type: "success" });
        props.setEditComment(false);
        props.updateComment(response);
      }
    } catch (error) {
      toast("Oops! Something went wrong.", { type: "error" });
    }
  };

  const handleComment = event => {
    setComment(event.target.value);
  };

  return (
    <div>
      <div className="flex items-center px-3 py-2 rounded-b-lg bg-gray-900">
        {!props.editComment && (
          <>
            <Like {...props} />

            {!props.shared && <Share post={props} />}
          </>
        )}

        <textarea
          id="chat"
          rows="1"
          onChange={handleComment}
          value={comment}
          className="block mx-4 p-2.5 w-full text-sm text-gray-200 bg-gray-800 rounded-lg border border-gray-700  dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 "
          placeholder="Your comment..."
        ></textarea>
        <button
          onClick={handlePostComment}
          className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-300"
        >
          <svg
            aria-hidden="true"
            className="w-6 h-6 rotate-90"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
