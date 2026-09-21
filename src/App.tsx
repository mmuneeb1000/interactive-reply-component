import { useState } from "react";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import DeleteModal from "./components/Delete";
import ResetButton from "./components/Reset";
import { useComments } from "./hooks/useComments";

function App() {
  const {
    comments,
    resetComments,
    addComment,
    addReply,
    editComment,
    deleteComment,
    updateScore,
    currentUser,
  } = useComments();

  const [deleteId, setDeleteId] = useState<number | null>(null);

  function handleConfirmDelete() {
    if (deleteId === null) {
      return;
    }

    deleteComment(deleteId);
    setDeleteId(null);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <CommentList
          comments={comments}
          currentUser={currentUser}
          onReply={addReply}
          onEdit={editComment}
          onDelete={setDeleteId}
          onScoreChange={updateScore}
        />

        <div className="mt-5">
          <CommentForm currentUser={currentUser} onSubmit={addComment} />
        </div>
        <ResetButton onReset={resetComments} />
      </div>
      <DeleteModal
        isOpen={deleteId !== null}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}

export default App;
