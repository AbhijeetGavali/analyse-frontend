import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip,
} from "@mui/material";

interface Review {
  name: string;
  date: string;
  rating: number;
  review: string;
  sentiment: string;
  aspect_sentiment: { [key: string]: string };
  review_summary: string;
  keywords: string[];
  rating_validation: string;
}

interface ReviewTableProps {
  reviews: Review[];
  setPage: (page: number) => void;
  page: number;
}

const ReviewTable: React.FC<ReviewTableProps> = ({
  reviews,
  setPage,
  page,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  const getColor = (state: string) => {
    if (state.toLocaleLowerCase() === "positive") return "#4CAF50";
    else if (state.toLocaleLowerCase() === "negative") return "#F44336";
    else return "#FFC107";
  };

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ height: "60vh", scrollbarWidth: "thin" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Rating</TableCell>
              {/* <TableCell>Review</TableCell> */}
              <TableCell>Sentiment</TableCell>
              <TableCell>Review Summary</TableCell>
              <TableCell>Keywords</TableCell>
              <TableCell>Rating Validation</TableCell>
              <TableCell>Keyword Destribution</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review, index) => (
              <TableRow key={index}>
                <TableCell>{review.name.split("-").join(" ")}</TableCell>
                <TableCell>{review.date}</TableCell>
                <TableCell>{review.rating}</TableCell>
                {/* <TableCell>{review.review}</TableCell> */}
                <TableCell>{review.sentiment}</TableCell>
                <TableCell>{review.review_summary}</TableCell>
                <TableCell>{review.keywords.join(", ")}</TableCell>
                <TableCell>{review.rating_validation}</TableCell>
                <TableCell>
                  {Object.keys(review.aspect_sentiment).map((key) => (
                    <Chip
                      key={key}
                      label={key}
                      style={{
                        margin: "2px",
                        backgroundColor: getColor(review.aspect_sentiment[key]),
                      }}
                    />
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={2782}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ReviewTable;
