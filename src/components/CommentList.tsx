import type { Comment as CommentType, User } from "../types/comment";
import Comment from "./Comment";

interface CommentListProps {
  comments: CommentType[];
  currentUser: User;
  onReply: (id: number, content: string, replyingTo: string) => void;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  onScoreChange: (id: number, amount: number) => void;
}

export default function CommentList({
  comments,
  currentUser,
  onReply,
  onEdit,
  onDelete,
  onScoreChange,
}: CommentListProps) {
  return (
    <section className="space-y-4">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
          onScoreChange={onScoreChange}
        />
      ))}
    </section>
  );
}
