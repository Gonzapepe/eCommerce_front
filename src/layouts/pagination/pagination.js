import React, { useState } from "react";

const Pagination = ({ path, page, perPage }) => {
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
    return new Array(perPage).fill().map((_, index) => start * index + 1);
  };

  return (
    <div className="pagination flex align-center justify-center">
      <button
        onClick={goToPreviousPage}
        className={`prev p-2.5 bg-white border-none text-blue-600 mx-0 my-2.5 cursor-pointer ${
          currentPage === 1
            ? "disabled:pointer-events-none disabled:shadow-none  disabled:text-border-700"
            : ""
        }`}
      >
        Anterior
      </button>
      {getPaginationGroup().map((item, index) => (
        <button
          key={index}
          onClick={changePage}
          className={`paginationItem relative cursor-pointer mx-auto my-1 bg-white border-2  border-solid border-sky-800 rounded-full h-11 w-11 ${
            currentPage === item
              ? "active:border active:border-solid active:border-gray-800 active:border-gray-800"
              : null
          }`}
        >
          <span className="absolute top-1/2 left-1/2 transform">{item}</span>
        </button>
      ))}

      <button
        onClick={goToNextPage}
        className={`next p-2.5 bg-white border-none text-blue-600 mx-0 my-2.5 cursor-pointer ${
          currentPage === page
            ? "disabled:pointer-events-none disabled:shadow-none disabled:text-border-700"
            : ""
        }`}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
