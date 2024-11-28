import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import BookReview from "./pages/BookReview";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      <Route path="/bookReview/:bookId" element={<BookReview />} />

    </Routes>
  );
}

export default App;
