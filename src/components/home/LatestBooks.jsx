import React from "react";
import "../../assets/css/LatestBooks.css";
import { useGetAllBooksQuery } from "../../store/api/booksApi";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

function LatestBooks() {
  const { data } = useGetAllBooksQuery();
  const navigate = useNavigate();

  const handleCardClick = (bookId) => {
    navigate(`/bookReview/${bookId}`);
  };

  return (
    <div className="LatestBooks-main">
      <div className="LatestBooks-top">
        <h1>Latest Books</h1>
        <p>View All</p>
      </div>
      <div className="LatestBooks-grid">
        {data?.payload && data.payload.length > 0 ? (
          data.payload.map((book) => (
            <div
              key={book.id}
              className="LatestBooks-card"
              onClick={() => handleCardClick(book.id)} 
            >
              <div className="LatestBooks-card-top">
                <img src={book.imageURL || bookImg} alt="bookimg" />
              </div>
              <div className="LatestBooks-card-btm">
                <h1>{book.bookTitle}</h1>
                {/* <Rating
                  name="book-rating"
                  defaultValue={4.5}
                  precision={0.5}
                  size="small"
                  sx={{
                    "& .MuiRating-iconFilled": { color: "#B4D51E" },
                  }}
                  readOnly
                /> */}
                <p>{book.bookDiscription}</p>
                <div className="LatestBooks-card-footer">
                  <p>{book.autherName}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
}

export default LatestBooks;
