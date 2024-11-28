import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Rating, Box } from "@mui/material";

function AddReview({ open, handleClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
    handleClose();
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
          />
        </Box>
      </DialogContent>
      <DialogActions style={{marginRight:"20px" , marginBottom:"20px"}}>
        <Button onClick={handleClose} color="secondary"  >
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddReview;
