import React, { useState, useEffect } from "react";
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

function AddReview({ open, handleClose, bookId, reviewToEdit, onReviewAdded }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [addReview, { isLoading }] = useAddReviewMutation();

  // Populate state with existing review data for editing
  useEffect(() => {
    if (reviewToEdit) {
      setRating(reviewToEdit.ratings || 0);
      setComment(reviewToEdit.commnet || ""); // Handle typo in 'commnet'
    } else {
      setRating(0);
      setComment("");
    }
  }, [reviewToEdit]);

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
        commnet: comment, // Corrected 'commnet' for API compatibility
        id: reviewToEdit?.id, // Include ID for updating if editing
      };

      const response = await addReview(reviewData).unwrap();
      console.log("Review added/updated successfully:", response);

      onReviewAdded(response);

      setRating(0);
      setComment("");
      handleClose();
    } catch (error) {
      console.error("Failed to add/update review:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{reviewToEdit ? "Update Review" : "Add a Review"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Rating
            name="book-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={0.5}
            size="large"
            disabled={isLoading}
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
          {reviewToEdit ? "Update" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddReview;
