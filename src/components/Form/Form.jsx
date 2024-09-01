import React, { useState } from "react";
import s from "./Form.module.css";

import { api } from "../../api/api";

export const Form = ({
  formTitle,
  buttonName,
  close,
  getBooksList,
  isbn,
  title,
  author,
  formType,
}) => {
  const inputs = [
    {
      label: "ISBN",
      name: "isbn",
      type: "text",
    },
    {
      label: "Title",
      name: "title",
      type: "text",
    },
    {
      label: "Author",
      name: "author",
      type: "text",
    },
  ];

  const [isbnValue, setIsbnValue] = useState(isbn);
  const [titleValue, setTitleValue] = useState(title);
  const [authorValue, setAuthorValue] = useState(author);

  function handleChange(e) {
    if (e.target.name === "isbn") {
      setIsbnValue(e.target.value);
    }
    if (e.target.name === "title") {
      setTitleValue(e.target.value);
    }
    if (e.target.name === "author") {
      setAuthorValue(e.target.value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const book = { isbn: isbnValue, title: titleValue, author: authorValue };
    try {
      const { data } = await api.post("/", book);
      console.log(data);
      close();
      getBooksList();
    } catch (error) {
      return console.error(error);
    }
  }

  async function handleUpdateSubmit(e) {
    e.preventDefault();

    const book = { isbn: isbnValue, title: titleValue, author: authorValue };
    try {
      const { data } = await api.put(`/${isbn}`, book);
      console.log(data);
      close();
      getBooksList();
    } catch (error) {
      return console.error(error);
    }
  }

  return (
    <form
      className={s.form}
      onSubmit={formType === "BUTTON" ? handleSubmit : handleUpdateSubmit}
    >
      <h2>{formTitle}</h2>
      {inputs.map((el, idx) => (
        <label key={idx} className={s.label}>
          {el.label}
          <input
            name={el.name}
            value={
              el.name === "isbn"
                ? isbnValue
                : el.name === "title"
                ? titleValue
                : authorValue
            }
            type={el.type}
            onChange={handleChange}
            className={s.input}
          />
        </label>
      ))}
      <button type="submit">{buttonName}</button>
    </form>
  );
};
