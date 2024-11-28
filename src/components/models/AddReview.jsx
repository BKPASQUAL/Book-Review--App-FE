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
import {
  useAddReviewMutation,
  useEditReviewMutation,
} from "../../store/api/bookReviewApi";
import { useGetAllReviewsQuery } from "../../store/api/reviewApi";

function AddReview({ open, handleClose, bookId, reviewToEdit, onReviewAdded }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [addReview, { isLoading: isAdding }] = useAddReviewMutation();
  const [editReview, { isLoading: isEditing }] = useEditReviewMutation();
  const {  refetch } = useGetAllReviewsQuery(bookId);


  useEffect(() => {
    if (reviewToEdit) {
      setRating(reviewToEdit.ratings || 0);
      setComment(reviewToEdit.comment || ""); 
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
        comment, 
      };
  
      let response;
  
      if (reviewToEdit) {
        response = await editReview({
          bookId,
          userId: reviewToEdit.userId, 
          inputData: reviewData,
        }).unwrap();
        console.log("Review updated successfully:", response);
      } else {
        response = await addReview(reviewData).unwrap();
        console.log("Review added successfully:", response);
      }
  
      await refetch();
  
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
            disabled={isAdding || isEditing}
          />
          <TextField
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            rows={4}
            variant="outlined"
            disabled={isAdding || isEditing}
          />
        </Box>
      </DialogContent>
      <DialogActions style={{ marginRight: "20px", marginBottom: "20px" }}>
        <Button onClick={handleClose} color="secondary" disabled={isAdding || isEditing}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={isAdding || isEditing || !rating || !comment}
        >
          {reviewToEdit ? "Update" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddReview;
