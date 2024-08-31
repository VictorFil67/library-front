import React from "react";
import s from "./Book.module.css";

export const Book = ({ isbn, title, author, isBorrowed }) => {
  return (
    <li className={s.item}>
      <p>{isbn}</p>
      <h2>{title}</h2>
      <h3>{author}</h3>
      <span>Borrowed {isBorrowed && "✔"}</span>
    </li>
  );
};
