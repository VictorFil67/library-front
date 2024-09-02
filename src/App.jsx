import { useEffect, useState } from "react";
// import axios from "axios";

import "./App.css";
import { api } from "./api/api";
import { Book } from "./components/Book/Book";
import { createPortal } from "react-dom";
import { Modal } from "./components/Modal/Modal";

function App() {
  const [books, setBooks] = useState([]);
  const [modal, setmodal] = useState("");
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [searchByIsbn, setSearchByIsbn] = useState("");
  const [searchByTitle, setSearchByTitle] = useState("");
  // const [book, setBook] = useState("");

  async function getBooksList() {
    try {
      const { data } = await api("/");
      console.log(data);

      setBooks(data);
    } catch (error) {
      return console.error(error);
    }
  }

  function open(e) {
    // e.target.nodeName === 'A'

    console.log(e.currentTarget.nodeName);
    setmodal(e.currentTarget.nodeName);
  }
  // function open() {
  //   setmodal(true);
  // }
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

  function handleChange(e) {
    if (e.target.name === "isbn") {
      setSearchByIsbn(e.target.value);
    }
    if (e.target.name === "title") {
      setSearchByTitle(e.target.value);
    }
  }

  async function searchBook({ isbn, title }) {
    const query =
      searchByIsbn && searchByTitle
        ? { isbn: searchByIsbn, title: searchByTitle }
        : searchByIsbn
        ? { isbn: searchByIsbn }
        : { title: searchByTitle };
    try {
      const { data } = await api("/search", {
        params: query,
      });
      const book = [];
      console.log(data);
      book.push(data);
      setBooks(book);
      console.log(books);
    } catch (error) {
      setBooks([]);
      if (error.response.data.message === "Not Found") {
        console.error("Such the book does not exist");
      } else if (error.message === "Request failed with status code 500") {
        console.error("The library is empty");
      } else {
        console.error(error.message);
      }
      // console.error.response.data.message ?? console.error.message;
    }
  }

  return (
    <div className="App">
      <button onClick={getBooksList}>List of books</button>
      <button onClick={open}>Add book</button>
      <input
        type="text"
        name="isbn"
        placeholder="ISBN"
        value={searchByIsbn}
        onChange={handleChange}
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={searchByTitle}
        onChange={handleChange}
      />
      <button onClick={searchBook}>Search</button>

      <ul className="list">
        {books.length > 0 &&
          books.map((book) => (
            <Book
              key={book.isbn}
              isbn={book.isbn}
              title={book.title}
              author={book.author}
              isBorrowed={book.isBorrowed}
              open={open}
              setIsbn={setIsbn}
              setTitle={setTitle}
              setAuthor={setAuthor}
              getBooksList={getBooksList}
            />
          ))}
      </ul>
      {modal &&
        createPortal(
          <Modal
            close={close}
            formTitle={
              modal === "BUTTON" ? "Adding a book" : "Editing book data"
            }
            buttonName={
              modal === "BUTTON" ? "Add to library" : "Edit book data"
            }
            getBooksList={getBooksList}
            isbn={modal === "BUTTON" ? "" : isbn}
            title={modal === "BUTTON" ? "" : title}
            author={modal === "BUTTON" ? "" : author}
            formType={modal}
          />,
          document.body
        )}
    </div>
  );
}

export default App;
