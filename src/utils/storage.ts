import type { Comment } from "../types/comment";

const STORAGE_KEY = "interactive-comments";

export function getComments(): Comment[] | null {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as Comment[];
  } catch {
    return null;
  }
}

export function saveComments(comments: Comment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

export function clearComments() {
  localStorage.removeItem(STORAGE_KEY);
}
