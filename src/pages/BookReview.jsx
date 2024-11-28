import React, { useState } from "react";
import NavBar from "../components/common/NavBar";
import "../assets/css/BookReview.css";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookByIdQuery } from "../store/api/booksApi";
import { Rating } from "@mui/material";
import { useGetAllReviewsQuery } from "../store/api/reviewApi";
import AddReview from "../components/models/AddReview";
import { useDeleteReviewMutation } from "../store/api/bookReviewApi";
import Swal from "sweetalert2";

function BookReview() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { data } = useGetBookByIdQuery(bookId);
  const { data: bookreview, refetch } = useGetAllReviewsQuery(bookId);
  const [deleteReview] = useDeleteReviewMutation(); // Hook for deleting a review
  const signedUserId = localStorage.getItem("userId");
  const [openAddReview, setOpenAddReview] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState(null);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { imageURL, autherName, bookDiscription, bookTitle } = data.payload;

  const hasUserReviewed = bookreview?.payload?.some(
    (review) => review.userId === Number(signedUserId)
  );

  const handleRateButtonClick = () => {
    if (!signedUserId) {
      navigate("/login");
    } else {
      setReviewToEdit(null);
      setOpenAddReview(true);
    }
  };

  const handleUpdateClick = (review) => {
    setReviewToEdit(review);
    setOpenAddReview(true);
  };
  const handleDeleteClick = async (review) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteReview({ bookId, userId: review.userId }).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "Your review has been deleted.",
            icon: "success",
          });
          refetch();
        } catch (error) {
          console.error("Failed to delete review:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the review.",
            icon: "error",
          });
        }
      }
    });
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
                <button
                  className="rate-button"
                  onClick={handleRateButtonClick}
                  disabled={hasUserReviewed}
                  title={
                    hasUserReviewed
                      ? "You have already reviewed this book."
                      : "Rate this book"
                  }
                >
                  <span className="material-symbols-outlined">star</span> Rate
                </button>
              </div>
              <div className="bookReviews-review-con">
                {bookreview?.payload?.map((review, index) => {
                  const isCurrentUserReview =
                    review.userId === Number(signedUserId);
                  const reviewerName = `${
                    review.User.firstName || "Anonymous"
                  } ${review.User.lastName || ""}`.trim();

                  return (
                    <div
                      className="bookReviews-card"
                      key={index}
                      style={{
                        backgroundColor: isCurrentUserReview
                          ? "#def7e43a"
                          : "white",
                      }}
                    >
                      <div className="bookReviews-cards-top">
                        <h1>{reviewerName || "Anonymous"}</h1>
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
                      <div className="bookReviews-card-comment">
                        {review.comment}
                      </div>
                      {isCurrentUserReview && (
                        <div className="bookReviews-card-actions">
                          <button
                            className="update-button"
                            onClick={() => handleUpdateClick(review)}
                          >
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                            Update
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => handleDeleteClick(review)}
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}

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
        reviewToEdit={reviewToEdit}
        onReviewAdded={(newReview) => {
          console.log("New review added:", newReview);
        }}
      />
    </div>
  );
}

export default BookReview;
