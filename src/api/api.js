import axios from "axios";

export const api = axios.create({
  //   baseURL: "https://e-pharmacy-franchise-back.onrender.com/api",
  baseURL: "http://localhost:4000/books",
});
