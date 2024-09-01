import React from "react";
import s from "./Book.module.css";

export const Book = ({
  isbn,
  title,
  author,
  isBorrowed,
  open,
  setIsbn,
  setTitle,
  setAuthor,
}) => {
  function handleclick(e) {
    setState();
    open(e);
  }
  function setState() {
    setIsbn(isbn);
    setTitle(title);
    setAuthor(author);
  }

  return (
    <li className={s.item} onClick={handleclick}>
      <p>{isbn}</p>
      <h2>{title}</h2>
      <h3>{author}</h3>
      <span>Borrowed {isBorrowed && "✔"}</span>
    </li>
  );
};
