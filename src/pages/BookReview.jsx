import React from "react";
import NavBar from "../components/common/NavBar";
import "../assets/css/BookReview.css";
import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../store/api/booksApi";
import { Rating } from "@mui/material";

function BookReview() {
  const { bookId } = useParams();
  const { data } = useGetBookByIdQuery(bookId);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { imageURL, autherName, bookDiscription, bookTitle } = data.payload;

  return (
    <div className="bookReview-main">
      <NavBar />
      <div className="bookReview-con">
        <div className="bookReview-left">
          <div className="bookReview-left-top">
            <img src={imageURL} alt={bookTitle} className="bookReview-image" />
          </div>
          <div className="bookReview-left-btm">
            <h1>
              <strong>Author Name:</strong> {autherName}
            </h1>
            <p>
              <strong>Description:</strong> <br />
              {bookDiscription}
            </p>
          </div>
        </div>
        <div className="bookReview-right">
          <div className="bookReview-right-top">
            <h2>{bookTitle}</h2>
          </div>
          <div className="bookReview-right-btm">
            <div className="bookReviews-review">
              <div className="bookReviews-review-title">
                <h1>Review</h1>
                <button className="rate-button">
                  <span className="material-symbols-outlined">star</span> Rate
                </button>
              </div>
              <div className="bookReviews-review-con">
                <div className="bookReviews-card">
                  <div className="bookReviews-cards-top">
                    <h1>Bawantha Pasqual</h1>
                    <Rating
                      name="book-rating"
                      defaultValue={4.5}
                      precision={0.5}
                      size="small"
                      sx={{
                        "& .MuiRating-iconFilled": { color: "#B4D51E" },
                      }}
                      readOnly
                    />
                  </div>
                  <div>
                    dscj sdjh dscbkhskbdsc kdsjc jcshd dsccccccccccccsd
                    cdssssssssssssssss sdcsc
                  </div>
                </div>
                <div className="bookReviews-card"></div>
                <div className="bookReviews-card"></div>
                <div className="bookReviews-card"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookReview;
