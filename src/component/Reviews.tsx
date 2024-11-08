import React, { useEffect, useState } from "react";
import ReviewTable from "./ReviewTable";

const ReviewComponent: React.FC = () => {
  const [page, setPage] = useState(0);
  const [reviews, setReviews] = useState([]);

  const getAllReviews = async (page: number) => {
    const response = await fetch(
      `http://localhost:8080/api/v1/reviews?pageSize=5&pageNumber=${page + 1}`,
    );
    const data = await response.json();
    setReviews(data.data);
  };

  useEffect(() => {
    getAllReviews(page);
  }, [page]);

  return (
    <div>
      <h1>Product Reviews</h1>
      <ReviewTable
        reviews={reviews.filter((row) => row)}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default ReviewComponent;
