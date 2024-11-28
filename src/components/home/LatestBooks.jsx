import React from "react";
import "../../assets/css/LatestBooks.css";
import bookImg from "../../assets/images/image.png";
import Rating from "@mui/material/Rating";

function LatestBooks() {
  return (
    <div className="LatestBooks-main">
      <div className="LatestBooks-top">
        <h1>Latest Books</h1>
        <p>View All</p>
      </div>
      <div className="LatestBooks-grid">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="LatestBooks-card">
            <div className="LatestBooks-card-top">
              <img src={bookImg} alt="bookimg" />
            </div>
            <div className="LatestBooks-card-btm">
              <h1>Book Title {index + 1}</h1>
              <Rating name="half-rating" defaultValue={4.5} precision={0.5} />
              <div className="LatestBooks-card-footer">
                <img
                  src="https://via.placeholder.com/30"
                  alt="User Avatar"
                  className="LatestBooks-avatar"
                />
                <p>John Doe • {5 * (index + 1)} days ago</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestBooks;
