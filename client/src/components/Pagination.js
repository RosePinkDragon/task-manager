import React from "react";

const Pagination = ({ count: totalPosts, setPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / 10); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paginate-wrap">
      <ul className="paginate">
        {pageNumbers.map((number) => (
          <p className="page-link" onClick={() => setPage(number)}>
            {number}
          </p>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
