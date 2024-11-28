import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Box,
} from "@mui/material";
import { useAddReviewMutation } from "../../store/api/bookReviewApi";

function AddReview({ open, handleClose, bookId, onReviewAdded }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [addReview, { isLoading }] = useAddReviewMutation();

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in local storage");
        return;
      }

      const reviewData = {
        userId: parseInt(userId, 10),
        bookId,
        ratings: rating,
        commnet: comment,
      };

      const response = await addReview(reviewData).unwrap(); 
      console.log("Review added successfully:", response);

      onReviewAdded(response);

      setRating(0);
      setComment("");
      handleClose();
    } catch (error) {
      console.error("Failed to add review:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add a Review</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Rating
            name="book-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={0.5}
            size="large"
          />
          <TextField
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            rows={4}
            variant="outlined"
            disabled={isLoading}
          />
        </Box>
      </DialogContent>
      <DialogActions style={{ marginRight: "20px", marginBottom: "20px" }}>
        <Button onClick={handleClose} color="secondary" disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={isLoading || !rating || !comment}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddReview;
