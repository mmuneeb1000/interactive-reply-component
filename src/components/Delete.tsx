import { useEffect, useRef } from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({
  isOpen,
  onCancel,
  onConfirm,
}: DeleteModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    cancelButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-5"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
      >
        <h2
          id="delete-modal-title"
          className="text-xl font-bold text-slate-800"
        >
          Delete comment
        </h2>

        <p
          id="delete-modal-description"
          className="mt-3 text-sm leading-6 text-slate-500"
        >
          Are you sure you want to delete this comment? This will remove the
          comment and cannot be undone.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onCancel}
            className="
              flex-1 rounded-lg bg-slate-500 px-4 py-3
              text-xs font-bold text-white
              transition-colors duration-200
              hover:bg-slate-600
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-slate-500
              focus-visible:ring-offset-2
              motion-reduce:transition-none
            "
          >
            NO, CANCEL
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              flex-1 rounded-lg bg-red-500 px-4 py-3
              text-xs font-bold text-white
              transition-colors duration-200
              hover:bg-red-600
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-500
              focus-visible:ring-offset-2
              active:scale-[0.98]
              motion-reduce:transition-none
              motion-reduce:active:scale-100
            "
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
