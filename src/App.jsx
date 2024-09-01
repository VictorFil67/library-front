import { useEffect, useState } from "react";
// import axios from "axios";

import "./App.css";
import { api } from "./api/api";
import { Book } from "./components/Book/Book";
import { createPortal } from "react-dom";
import { Modal } from "./components/Modal/Modal";

function App() {
  const [books, setBooks] = useState([]);
  const [modal, setmodal] = useState();

  async function getBooksList() {
    try {
      const { data } = await api("/");
      console.log(data);
      setBooks(data);
    } catch (error) {
      return console.error(error);
    }
  }

  function open() {
    setmodal(true);
  }
  function close() {
    setmodal(false);
  }

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modal]);

  return (
    <div className="App">
      <button onClick={getBooksList}>List of books</button>
      <button onClick={open}>Add book</button>
      {console.log(books)}

      <ul className="list">
        {books.length > 0 &&
          books.map((book) => (
            <Book
              key={book.isbn}
              isbn={book.isbn}
              title={book.title}
              author={book.author}
              isBorrowed={book.isBorrowed}
            />
          ))}
      </ul>
      {modal &&
        createPortal(
          <Modal
            close={close}
            formTitle={"Adding a book"}
            buttonName={"Add to library"}
            getBooksList={getBooksList}
          />,
          document.body
        )}
    </div>
  );
}

export default App;
