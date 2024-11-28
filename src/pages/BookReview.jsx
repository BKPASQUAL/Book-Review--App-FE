import React, { useState } from "react";
import NavBar from "../components/common/NavBar";
import "../assets/css/BookReview.css";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookByIdQuery } from "../store/api/booksApi";
import { Rating } from "@mui/material";
import { useGetAllReviewsQuery } from "../store/api/reviewApi";
import { useGetSignedUserQuery } from "../store/api/userApi";
import AddReview from "../components/models/AddReview";

function BookReview() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { data } = useGetBookByIdQuery(bookId);
  const { data: bookreview } = useGetAllReviewsQuery(bookId);
  const { data: signedUser } = useGetSignedUserQuery(); // Check user login status
  const [openAddReview, setOpenAddReview] = useState(false);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { imageURL, autherName, bookDiscription, bookTitle } = data.payload;

  const handleAddReview = (reviewData) => {
    console.log("New Review:", reviewData);
  };

  const handleRateButtonClick = () => {
    if (!signedUser?.payload?.name) {
      navigate("/login"); // Redirect to login page if not logged in
    } else {
      setOpenAddReview(true); // Open modal if logged in
    }
  };

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
                <button className="rate-button" onClick={handleRateButtonClick}>
                  <span className="material-symbols-outlined">star</span> Rate
                </button>
              </div>
              <div className="bookReviews-review-con">
                {bookreview?.payload?.map((review, index) => (
                  <div className="bookReviews-card" key={index}>
                    <div className="bookReviews-cards-top">
                      <h1>{review.User.name || "Anonymous"}</h1>
                      <Rating
                        name={`book-rating-${index}`}
                        value={review.ratings}
                        precision={0.5}
                        size="small"
                        sx={{
                          "& .MuiRating-iconFilled": { color: "#B4D51E" },
                        }}
                        readOnly
                      />
                    </div>
                    <div className="bookReviews-card-comment">{review.commnet}</div>
                  </div>
                ))}
                {bookreview?.payload?.length === 0 && (
                  <div>No reviews available for this book.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddReview
        open={openAddReview}
        handleClose={() => setOpenAddReview(false)}
        bookId={bookId}
        onReviewAdded={(newReview) => {
          console.log("New review added:", newReview);
          // Optionally refresh the reviews or update state here
        }}
      />
    </div>
  );
}

export default BookReview;
