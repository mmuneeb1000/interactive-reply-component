# Frontend Mentor - Interactive Comments Section

This is my solution to the [Frontend Mentor Interactive Comments Section challenge](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9).

A responsive, interactive comments application built with React and TypeScript. Users can create comments, reply to existing comments, edit and delete their own comments, vote on comments, and persist their changes using `localStorage`.

Live Site: https://incredible-kheer-31fa7d.netlify.app/

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)

- [Built With](#built-with)
- [Features](#features)
- [Project Structure](#project-structure)

- [How It Works](#how-it-works)
- [Accessibility](#accessibility)
- [What I Learned](#what-i-learned)
- [AI Collaboration](#ai-collaboration)
- [Continued Development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The Challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover states for interactive elements
- Create a new comment
- Reply to existing comments
- Edit their own comments
- Delete their own comments
- Upvote and downvote comments
- See nested replies
- Retain their changes after refreshing the page

## Built With

- React
- TypeScript
- Tailwind CSS
- Vite
- Local Storage API
- Semantic HTML
- Responsive CSS

## Features

### Comment Creation

Users can create new comments using the main comment form.

### Replies

Comments support nested replies. Each reply records the user being replied to and is displayed within the comment hierarchy.

### Editing

Users can edit comments belonging to the current user.

### Deleting

Users can delete their own comments through a confirmation dialog.

### Voting

Comments support upvotes and downvotes with the score updated immediately in the interface.

### Local Persistence

Comment changes are stored in `localStorage`, allowing the current state to survive a page refresh.

A reset control is also included to restore the original challenge data during development.

### Responsive Design

The layout adapts between desktop and mobile screen sizes. Voting controls and comment actions reposition themselves depending on the available space.

## Project Structure

```text
src/
├── components/
│   ├── Comment.tsx
│   ├── CommentForm.tsx
│   ├── CommentList.tsx
│   ├── DeleteModal.tsx
│   └── ResetButton.tsx
│
├── data/
│   └── comments.ts
│
├── hooks/
│   └── useComments.ts
│
├── types/
│   └── comment.ts
│
├── utils/
│   └── storage.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

## How It Works

The original Frontend Mentor comment data is stored in:

```text
src/data/comments.ts
```

The `useComments` custom hook manages the application's comment state.

```text
useComments
├── addComment
├── addReply
├── editComment
├── deleteComment
├── updateScore
└── resetComments
```

Comment operations use recursive functions to locate and update comments at any level of the nested comment tree.

The current comment state is synchronized with `localStorage`, allowing the application to restore the user's changes when the page is refreshed.

## Accessibility

Accessibility was considered throughout the component implementation rather than being added only to the final UI.

The project includes:

- Semantic HTML elements such as `main`, `section`, `article`, `header`, and `time`
- Proper labels for form controls
- Keyboard-accessible buttons
- Visible `focus-visible` states
- Descriptive labels for voting controls
- `aria-expanded` and `aria-controls` for interactive sections
- Accessible dialog semantics for the delete confirmation
- Escape-key support for closing the delete dialog
- Decorative avatar handling with appropriate `alt` attributes
- Reduced-motion support
- Responsive interaction layouts

The goal was to use native HTML semantics wherever possible and only introduce ARIA where additional information was necessary.

## What I Learned

This project gave me practice building a stateful React application rather than treating a Frontend Mentor challenge as a static UI exercise.

Key areas I practiced include:

- TypeScript interfaces for nested data
- React state management
- Custom hooks
- Recursive components
- Controlled form inputs
- Local storage persistence
- Responsive Tailwind layouts
- Component reusability
- Accessibility
- Modal interaction
- Keyboard interaction
- Managing nested comment data

## AI Collaboration

AI was used as a development collaborator throughout the project.

The collaboration focused on:

- Discussing component architecture
- Reviewing TypeScript types
- Identifying state-management issues
- Debugging React implementation details
- Reviewing accessibility
- Improving keyboard interaction
- Refining responsive Tailwind classes
- Reviewing component responsibilities
- Discussing local storage persistence
- Reviewing the README and project documentation

The implementation decisions, code integration, testing, and final project direction remained under my control.

AI was used as a development aid rather than as a replacement for understanding the implementation.

## Continued Development

Potential future improvements include:

- Preventing repeated votes from the same user
- Tracking individual vote state
- Improving focus trapping and focus restoration in the delete dialog
- Using actual timestamps instead of static relative-time strings
- Adding automated accessibility testing
- Adding more interaction feedback
- Improving the comment data model for larger discussion threads

## Author

M. Muneeb

- GitHub: [@mmuneeb1000](https://github.com/mmuneeb1000)
- Frontend Mentor: [@mmuneeb1000](https://www.frontendmentor.io/profile/mmuneeb1000)

## Acknowledgments

- [Frontend Mentor](https://www.frontendmentor.io/) for the challenge and design
- Frontend Mentor community for the challenge resources

## License

This project was created as a solution to a Frontend Mentor challenge and is intended for learning and portfolio purposes.
