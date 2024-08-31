import { useState } from "react";
// import axios from "axios";

import "./App.css";
import { api } from "./api/api";
import { Book } from "./components/Book/Book";

function App() {
  const [books, setBooks] = useState([]);

  async function getBooksList() {
    // await api
    //   .get("/")
    //   .then(({ data }) => {
    //     console.log(data);
    //     setBooks(data);
    //     return data;
    //     // console.log(books);
    //   })
    //   .catch((err) => console.error(err));
    try {
      const { data } = await api.get("/");
      console.log(data);
      setBooks(data);
    } catch (error) {
      return console.error(error);
    }
  }

  // useEffect(() => {
  //   setBooks(getBooksList);
  //   console.log(books);
  // }, [books]);

  return (
    <div className="App">
      <button onClick={getBooksList}>List of books</button>
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
    </div>
  );
}

export default App;
