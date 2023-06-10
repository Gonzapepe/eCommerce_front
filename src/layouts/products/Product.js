import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, path, title, price, subcategories, onClick }) => {
  const navigate = useNavigate();
  if (onClick) {
    navigate(`/product/${id}`);
  }
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-auto cursor-pointer">
      <img
        className="w-full h-48 object-cover"
        src={`http://localhost:4000/${path}`}
        alt={title}
      />
      <div className="p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-2 truncate max-w-[200px]">
          {" "}
          {title}{" "}
        </h2>
        <p className="text-gray-700 text-base mb-4">
          {" "}
          {subcategories
            ? subcategories.map((subcategory) => {
                console.log("SUBCATEGORIA: ", subcategory);
                return (
                  <span
                    key={subcategory.id}
                    className="mr-1 inline-block bg-gray-200 rounded-full px-2 py-1 text-sm text-gray-800"
                  >
                    {" "}
                    {subcategory.name}{" "}
                  </span>
                );
              })
            : ""}
        </p>
        <div className="flex flex-col sm:flex-row  items-center justify-between">
          <span className="text-gray-800 font-bold mb-2 sm:mb-0">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
