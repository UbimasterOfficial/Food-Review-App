/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { deleteComment } from "../util/APIUtils";
import CommentBox from "./CommentBox";

const Comment = ({ comment, ...rest }) => {
  const [commentState, setCommentState] = useState(comment);
  const [editComment, setEditComment] = useState(false);

  const handleDeleteComment = async () => {
    try {
      const response = await deleteComment(comment.id, rest.currentUser.id);
      if (response) {
        toast("Comment successfully deleted", { type: "success" });
        rest.updateComment(comment.id);
      }
    } catch (error) {
      toast("Delete operation failed", { type: "error" });
    }
  };

  const handleEditComment = () => {
    setEditComment(true);
  };

  const updateEditedComment = com => {
    setCommentState(com);
  };

  const isOwner = comment.userId === rest.currentUser.id;

  return editComment ? (
    <CommentBox
      comment={commentState}
      {...rest}
      editComment
      setEditComment={setEditComment}
      updateComment={updateEditedComment}
    />
  ) : (
    <ul className="divide-y bg-gray-800 dark:divide-gray-700">
      <li className="p-2 sm:p-2 ">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              className="w-8 h-8 rounded-full"
              src={
                commentState.commentedUser?.imageUrl ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt={commentState.commentedUser?.name || "User"}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-left font-medium text-gray-500 truncate dark:text-gray-500">
              {commentState.commentedUser?.name || "User"}
            </p>
            <p className="text-sm text-left text-gray-200 dark:text-gray-200">
              {commentState.text}
            </p>
          </div>

          {isOwner && (
            <div className="inline-flex items-right text-base font-semibold text-gray-900">
              <div
                type="button"
                onClick={handleDeleteComment}
                className="inline-flex justify-center p-2 text-gray-200 rounded-lg cursor-pointer hover:text-gray-700 hover:bg-gray-800 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
              <div
                type="button"
                onClick={handleEditComment}
                className="inline-flex justify-center p-2 text-gray-200 rounded-lg cursor-pointer hover:text-gray-700 hover:bg-gray-800 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </li>
    </ul>
  );
};

export default Comment;
