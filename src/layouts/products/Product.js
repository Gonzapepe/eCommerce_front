import React from "react";

const Product = ({ id, path, title, price, subcategories }) => {
  return (
    <div
      key={id}
      className="group bg-white border-solid border-gray-300 rounded-md border w-48 h-[354px]"
    >
      <div className=" w-full aspect-w-1 aspect-h-1 overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
        <img
          src={`http://localhost:4000/${path}`}
          className="w-48 h-[214px] object-center object-cover group-hover:opacity-75"
        />
      </div>
      <div className=" flex flex-col grow">
        <div className=" ml-3 mt-3 flex flex-col h-10 items-start text-sm font-medium text-gray-900">
          <p> $ {price} </p>
          <div>
            {subcategories
              ? subcategories.map((subcategory) => {
                  return <p> {subcategory.name} </p>;
                })
              : ""}
          </div>
        </div>
        <h3 className=" ml-3 mt-3 text-sm font-medium text-gray-900">
          {" "}
          {title}{" "}
        </h3>
      </div>
    </div>
  );
};

export default Product;
