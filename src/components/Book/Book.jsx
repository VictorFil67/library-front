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
      console.log(e.currentTarget);
      console.log(e.target);
      return;
    }
    if (e.target.nodeName !== "INPUT") {
      console.log(e.target.nodeName);
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
      const { data } = await api.delete(`/${isbn}`);
      console.log(data);
      getBooksList();
    } catch (error) {
      return console.error(error);
    }
  }

  async function handleChange(e) {
    console.log(check);
    setCheck(!check);
    console.log(check);
    if (e.target.nodeName === "INPUT") {
      try {
        const { data } = await api.patch(`/${isbn}/borrow`, {
          isBorrowed: !check,
        });
        console.log(data);
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
