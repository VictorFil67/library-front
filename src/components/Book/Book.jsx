import React, { useState } from "react";
import s from "./Book.module.css";
import { api } from "../../api/api";

export const Book = ({
  isbn,
  title,
  author,
  isBorrowed,
  open,
  setIsbn,
  setTitle,
  setAuthor,
  getBooksList,
}) => {
  const [check, setCheck] = useState(isBorrowed);

  function handleclick(e) {
    if (e.target.nodeName === "BUTTON") {
      return;
    }
    if (e.target.nodeName !== "INPUT") {
      setState();
      open(e);
    }
  }
  function setState() {
    setIsbn(isbn);
    setTitle(title);
    setAuthor(author);
  }

  async function deleteBook(isbn) {
    try {
      await api.delete(`/${isbn}`);

      getBooksList();
    } catch (error) {
      return console.error(error);
    }
  }

  async function handleChange(e) {
    setCheck(!check);

    if (e.target.nodeName === "INPUT") {
      try {
        await api.patch(`/${isbn}/borrow`, {
          isBorrowed: !check,
        });

        getBooksList();
      } catch (error) {
        return console.error(error);
      }
    }
  }

  return (
    <li className={s.item} onClick={handleclick}>
      <p>{isbn}</p>
      <h2>{title}</h2>
      <h3>{author}</h3>
      <div>
        <span>Borrowed {isBorrowed && "✔"}</span>
        <input
          type="checkbox"
          defaultChecked={isBorrowed}
          onChange={handleChange}
        />
      </div>
      <button onClick={() => deleteBook(isbn)}>Delete</button>
    </li>
  );
};
