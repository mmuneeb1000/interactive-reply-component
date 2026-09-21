import { useEffect, useState } from "react";
import { commentsData } from "../data/comments";
import { getComments, saveComments } from "../utils/storage";
import type { Comment } from "../types/comment";

export function useComments() {
  const [comments, setComments] = useState<Comment[]>(
    () => getComments() ?? commentsData.comments,
  );

  const currentUser = commentsData.currentUser;

  useEffect(() => {
    saveComments(comments);
  }, [comments]);

  function addComment(content: string) {
    const newComment: Comment = {
      id: Date.now(),
      content,
      createdAt: "just now",
      score: 0,
      user: currentUser,
      replies: [],
    };

    setComments((current) => [...current, newComment]);
  }

  function addReply(parentId: number, content: string, replyingTo: string) {
    const newReply: Comment = {
      id: Date.now(),
      content,
      createdAt: "just now",
      score: 0,
      replyingTo,
      user: currentUser,
      replies: [],
    };

    setComments((current) =>
      updateComment(current, parentId, (comment) => ({
        ...comment,
        replies: [...comment.replies, newReply],
      })),
    );
  }

  function deleteComment(id: number) {
    setComments((current) => removeComment(current, id));
  }

  function editComment(id: number, content: string) {
    setComments((current) =>
      updateComment(current, id, (comment) => ({
        ...comment,
        content,
      })),
    );
  }
  function resetComments() {
    localStorage.removeItem("interactive-comments");
    setComments(commentsData.comments);
  }
  function updateScore(id: number, amount: number) {
    setComments((current) =>
      updateComment(current, id, (comment) => ({
        ...comment,
        score: Math.max(0, comment.score + amount),
      })),
    );
  }

  return {
    currentUser,
    comments,
    addComment,
    addReply,
    deleteComment,
    editComment,
    updateScore,
    resetComments,
  };
}

function updateComment(
  comments: Comment[],
  id: number,
  updater: (comment: Comment) => Comment,
): Comment[] {
  return comments.map((comment) => {
    if (comment.id === id) {
      return updater(comment);
    }

    return {
      ...comment,
      replies: updateComment(comment.replies, id, updater),
    };
  });
}

function removeComment(comments: Comment[], id: number): Comment[] {
  return comments
    .filter((comment) => comment.id !== id)
    .map((comment) => ({
      ...comment,
      replies: removeComment(comment.replies, id),
    }));
}
