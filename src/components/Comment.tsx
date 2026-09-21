import { useState } from "react";
import type { Comment as CommentType, User } from "../types/comment";
import CommentForm from "./CommentForm";

interface CommentProps {
  comment: CommentType;
  currentUser: User;
  onReply: (id: number, content: string, replyingTo: string) => void;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  onScoreChange: (id: number, amount: number) => void;
}

export default function Comment({
  comment,
  currentUser,
  onReply,
  onEdit,
  onDelete,
  onScoreChange,
}: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const isCurrentUser = comment.user.username === currentUser.username;
  const editId = `edit-comment-${comment.id}`;

  function handleEdit() {
    const trimmed = editContent.trim();

    if (!trimmed) {
      return;
    }

    onEdit(comment.id, trimmed);
    setIsEditing(false);
  }

  return (
    <div>
      <article className="rounded-lg bg-white p-5 shadow-sm sm:p-6">
        <div className="flex gap-4">
          {/* Desktop vote control */}
          <div className="hidden shrink-0 sm:block">
            <div className="flex flex-col items-center rounded-lg bg-slate-100">
              <button
                type="button"
                onClick={() => onScoreChange(comment.id, 1)}
                aria-label={`Upvote ${comment.user.username}'s comment`}
                className="
                  rounded-t-lg px-3 py-2 text-lg font-bold text-indigo-400
                  transition-colors duration-200
                  hover:text-indigo-600
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-indigo-500
                  focus-visible:ring-inset
                  motion-reduce:transition-none
                "
              >
                +
              </button>

              <span
                aria-label={`Score: ${comment.score}`}
                className="py-1 text-sm font-bold text-indigo-600"
              >
                {comment.score}
              </span>

              <button
                type="button"
                onClick={() => onScoreChange(comment.id, -1)}
                aria-label={`Downvote ${comment.user.username}'s comment`}
                className="
                  rounded-b-lg px-3 py-2 text-lg font-bold text-indigo-400
                  transition-colors duration-200
                  hover:text-indigo-600
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-indigo-500
                  focus-visible:ring-inset
                  motion-reduce:transition-none
                "
              >
                −
              </button>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            {/* Header */}
            <header className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <picture>
                  <source srcSet={comment.user.image.webp} type="image/webp" />

                  <img
                    src={comment.user.image.png}
                    alt=""
                    aria-hidden="true"
                    className="h-8 w-8 shrink-0 rounded-full"
                  />
                </picture>

                <span className="truncate text-sm font-bold text-slate-800">
                  {comment.user.username}
                </span>

                {isCurrentUser && (
                  <span className="rounded-sm bg-indigo-600 px-1.5 py-0.5 text-xs font-medium text-white">
                    you
                  </span>
                )}

                <time className="shrink-0 text-sm text-slate-400">
                  {comment.createdAt}
                </time>
              </div>

              {/* Desktop actions */}
              <div className="hidden shrink-0 items-center gap-4 sm:flex">
                {isCurrentUser ? (
                  <>
                    <button
                      type="button"
                      onClick={() => onDelete(comment.id)}
                      className="
                        rounded-sm text-sm font-bold text-red-500
                        transition-colors duration-200
                        hover:text-red-700
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-red-500
                        focus-visible:ring-offset-2
                        motion-reduce:transition-none
                      "
                    >
                      Delete
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      aria-expanded={isEditing}
                      aria-controls={editId}
                      className="
                        rounded-sm text-sm font-bold text-indigo-600
                        transition-colors duration-200
                        hover:text-indigo-800
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-indigo-500
                        focus-visible:ring-offset-2
                        motion-reduce:transition-none
                      "
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsReplying((value) => !value)}
                    aria-expanded={isReplying}
                    aria-controls={`reply-${comment.id}`}
                    className="
                      rounded-sm text-sm font-bold text-indigo-600
                      transition-colors duration-200
                      hover:text-indigo-800
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-indigo-500
                      focus-visible:ring-offset-2
                      motion-reduce:transition-none
                    "
                  >
                    {isReplying ? "Cancel reply" : "Reply"}
                  </button>
                )}
              </div>
            </header>

            {/* Comment content / edit */}
            {isEditing ? (
              <div className="mt-4" id={editId}>
                <label htmlFor={`${editId}-input`} className="sr-only">
                  Edit your comment
                </label>

                <textarea
                  id={`${editId}-input`}
                  value={editContent}
                  onChange={(event) => setEditContent(event.target.value)}
                  rows={4}
                  className="
                    w-full resize-none rounded-lg border border-slate-200 p-3
                    text-sm text-slate-700 outline-none
                    transition-colors duration-200
                    focus:border-indigo-400
                    focus:ring-2 focus:ring-indigo-100
                    motion-reduce:transition-none
                  "
                />

                <div className="mt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditContent(comment.content);
                      setIsEditing(false);
                    }}
                    className="
                      rounded-lg px-4 py-2 text-xs font-bold text-slate-500
                      transition-colors duration-200
                      hover:bg-slate-100
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-slate-400
                      focus-visible:ring-offset-2
                      motion-reduce:transition-none
                    "
                  >
                    CANCEL
                  </button>

                  <button
                    type="button"
                    onClick={handleEdit}
                    className="
                      rounded-lg bg-indigo-600 px-4 py-2
                      text-xs font-bold text-white
                      transition-colors duration-200
                      hover:bg-indigo-500
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-indigo-500
                      focus-visible:ring-offset-2
                      active:scale-[0.98]
                      motion-reduce:transition-none
                      motion-reduce:active:scale-100
                    "
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {comment.replyingTo && (
                  <span className="font-bold text-indigo-600">
                    @{comment.replyingTo}{" "}
                  </span>
                )}

                {comment.content}
              </p>
            )}

            {/* Mobile controls */}
            <div className="mt-5 flex items-center justify-between sm:hidden">
              <div className="flex items-center rounded-lg bg-slate-100">
                <button
                  type="button"
                  onClick={() => onScoreChange(comment.id, 1)}
                  aria-label={`Upvote ${comment.user.username}'s comment`}
                  className="
                    rounded-l-lg px-3 py-1 text-lg font-bold text-indigo-400
                    transition-colors duration-200
                    hover:text-indigo-600
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-indigo-500
                    focus-visible:ring-inset
                    motion-reduce:transition-none
                  "
                >
                  +
                </button>

                <span
                  aria-label={`Score: ${comment.score}`}
                  className="px-2 text-sm font-bold text-indigo-600"
                >
                  {comment.score}
                </span>

                <button
                  type="button"
                  onClick={() => onScoreChange(comment.id, -1)}
                  aria-label={`Downvote ${comment.user.username}'s comment`}
                  className="
                    rounded-r-lg px-3 py-1 text-lg font-bold text-indigo-400
                    transition-colors duration-200
                    hover:text-indigo-600
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-indigo-500
                    focus-visible:ring-inset
                    motion-reduce:transition-none
                  "
                >
                  −
                </button>
              </div>

              {isCurrentUser ? (
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => onDelete(comment.id)}
                    className="
                      rounded-sm text-sm font-bold text-red-500
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-red-500
                      focus-visible:ring-offset-2
                    "
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    aria-expanded={isEditing}
                    aria-controls={editId}
                    className="
                      rounded-sm text-sm font-bold text-indigo-600
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-indigo-500
                      focus-visible:ring-offset-2
                    "
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsReplying((value) => !value)}
                  aria-expanded={isReplying}
                  aria-controls={`reply-${comment.id}`}
                  className="
                    rounded-sm text-sm font-bold text-indigo-600
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-indigo-500
                    focus-visible:ring-offset-2
                  "
                >
                  {isReplying ? "Cancel reply" : "Reply"}
                </button>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Reply form */}
      {isReplying && (
        <div id={`reply-${comment.id}`} className="mt-4 sm:ml-16">
          <CommentForm
            id={`reply-form-${comment.id}`}
            currentUser={currentUser}
            placeholder={`Reply to @${comment.user.username}...`}
            buttonText="REPLY"
            onSubmit={(content) => {
              onReply(comment.id, content, comment.user.username);
              setIsReplying(false);
            }}
          />
        </div>
      )}

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div
          className="mt-4 ml-4 border-l-2 border-slate-200 pl-4 sm:ml-12 sm:pl-8"
          aria-label={`Replies to ${comment.user.username}'s comment`}
        >
          <div className="space-y-4">
            {comment.replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                currentUser={currentUser}
                onReply={onReply}
                onEdit={onEdit}
                onDelete={onDelete}
                onScoreChange={onScoreChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
