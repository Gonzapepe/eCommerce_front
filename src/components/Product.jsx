import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductQuery } from "../api/products/products";
import { useParams } from "react-router-dom";
import { getProduct } from "../redux/reducers/products";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "./productStyle.css";

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, isLoading, errors } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct({ id }));
  }, [id]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className=" background h-full w-full">
        {product.data && (
          <div className="bg-white rounded overflow-hidden border-solid border-2 border-slate-300 w-10/12 mt-6 mx-auto">
            <div className="flex flex-row ">
              <div className="w-96 h-96 slider-contain ">
                <AwesomeSlider
                  className="sliderProduct h-72"
                  fillParent={false}
                >
                  {product.data?.images.map((image, index) => {
                    console.log("imagenes: ", image);
                    return (
                      // <img
                      //   height={100}
                      //   width={100}
                      //   className=""
                      //   src={`http://localhost:4000/${image.path}`}
                      // />
                      <div
                        className=""
                        key={image.id}
                        data-src={`http://localhost:4000/${image.path}`}
                      />
                    );
                  })}
                </AwesomeSlider>

                {/* <img
                src={`http://localhost:4000/${product.data.images[0].path}`}
                className="h-[378px] w-[468px] object-center object-cover"
              /> */}
              </div>
              <div className="flex flex-col ml-4 justify-between">
                <div className="pt-4">
                  <div className="font-bold text-2xl ">
                    {product.data.title}
                  </div>
                  <div className="text-lg font-semibold">
                    $ {product.data.price}
                  </div>
                  <div className="font-bold text-base"> Descripción: </div>
                  <div className="text-base"> {product.data.description} </div>
                </div>

                <div className="mb-24">
                  <button className="bg-blue-600 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded">
                    {" "}
                    Comprar
                  </button>
                  <button className="text-blue-500 rounded shadow-md py-2 px-4 ml-2">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {console.log("DATOS: ", product.data)}
      </div>
    </>
  );
};

export default Product;
