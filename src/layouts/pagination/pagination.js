import React, { useState } from "react";

const Pagination = ({ page, perPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const changePage = (e) => {
    const pageNumber = Number(e.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / 5) * 5;
    return new Array(pageLimit).fill().map((_, index) => start * index + 1);
  };

  return (
    <div className="pagination flex align-center justify-center">
      <button
        onClick={goToPreviousPage}
        className={`prev ${currentPage === 1 ? "disabled" : ""}`}
      >
        Anterior
      </button>
      {getPaginationGroup().map((item, index) => (
        <button
          key={index}
          onClick={changePage}
          className={`paginationItem relative cursor-pointer mx-auto my-1 bg-white border-2  border-solid border-sky-800 rounded-full h-11 w-11 ${
            currentPage === item ? "active" : null
          }`}
        >
          <span>{item}</span>
        </button>
      ))}

      <button
        onClick={goToNextPage}
        className={`next ${currentPage === pages ? "disabled" : ""}`}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
