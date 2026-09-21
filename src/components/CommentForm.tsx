import { useState } from "react";
import type { SubmitEvent } from "react";
import type { User } from "../types/comment";

interface CommentFormProps {
  currentUser: User;
  onSubmit: (content: string) => void;
  placeholder?: string;
  buttonText?: string;
  id?: string;
}

export default function CommentForm({
  currentUser,
  onSubmit,
  placeholder = "Add a comment...",
  buttonText = "SEND",
  id = "comment-form",
}: CommentFormProps) {
  const [content, setContent] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return;
    }

    onSubmit(trimmedContent);
    setContent("");
  }

  const textareaId = `${id}-input`;

  return (
    <form
      onSubmit={handleSubmit}
      aria-label={buttonText === "REPLY" ? "Reply to comment" : "Add a comment"}
      className="rounded-lg bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <picture>
          <source srcSet={currentUser.image.webp} type="image/webp" />
          <img
            src={currentUser.image.png}
            alt=""
            aria-hidden="true"
            className="hidden h-10 w-10 shrink-0 rounded-full sm:block"
          />
        </picture>

        <div className="flex-1">
          <label htmlFor={textareaId} className="sr-only">
            {placeholder}
          </label>

          <textarea
            id={textareaId}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={placeholder}
            rows={3}
            className="min-h-24 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 motion-reduce:transition-none"
          />
        </div>

        <button
          type="submit"
          className="
            self-end rounded-lg bg-indigo-600 px-5 py-3
            text-xs font-bold tracking-wide text-white
            transition-colors duration-200
            hover:bg-indigo-500
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-indigo-500
            focus-visible:ring-offset-2
            active:scale-[0.98]
            motion-reduce:transition-none
            motion-reduce:active:scale-100
            sm:self-start
          "
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}
