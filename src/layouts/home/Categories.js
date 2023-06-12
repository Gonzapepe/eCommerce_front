import React from "react";
import { useNavigate } from "react-router-dom";

/* Assets */
import mueblesPNG from "../../assets/images/muebles.png";
import pisosPNG from "../../assets/images/pisos.png";
import sanitariosPNG from "../../assets/images/sanitario.png";
import cocinaPNG from "../../assets/images/cocina.png";
import accesoriosPNG from "../../assets/images/accesorios.png";
import pinturasPNG from "../../assets/images/pinturas.png";

const categoriesImages = [
  {
    title: "muebles",
    image: mueblesPNG,
  },
  {
    title: "pisos",
    image: pisosPNG,
  },
  {
    title: "sanitarios",
    image: sanitariosPNG,
  },
  {
    title: "cocina",
    image: cocinaPNG,
  },
  {
    title: "accesorios",
    image: accesoriosPNG,
  },
  {
    title: "pinturas",
    image: pinturasPNG,
  },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <>
      <div
        id="categoriesContainer"
        className="w-full p-2 md:my-4 m-auto md:mt-20 md:max-w-6xl"
      >
        <h1
          className="uppercase text-slate-600	font-normal text-2xl my-4"
          id="categoriesTitle"
        >
          Categorías
        </h1>

        <div
          id="CategoriesList"
          className="w-full m-auto gap-4 grid grid-rows-2 md:grid-cols-2"
        >
          {categoriesImages.map((data, index) => {
            return (
              <div
                key={index}
                className="flex w-full h-full relative justify-center items-center cursor-pointer"
                onClick={() => handleClick(data.title)}
              >
                <h3 className="uppercase text-base md:text-2xl text-white absolute z-10">
                  {data.title}
                </h3>
                <img src={data.image} className="w-full" alt="category pic" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Categories;
