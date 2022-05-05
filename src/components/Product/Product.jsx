import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../redux/reducers/products";
import { addItem } from "../../redux/reducers/cart";
import Spinner from "../Spinner/Spinner";
import AwesomeSlider from "react-awesome-slider";
import Cookies from "js-cookie";
import "react-awesome-slider/dist/styles.css";
import "./productStyle.css";

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, isLoading } = useSelector((state) => state.product);
  const token = Cookies.get("token");
  const [orderQuantity, setOrderQuantity] = useState(0);

  useEffect(() => {
    console.log("TOKEN DEL USUARIO: ", token);
  }, [token]);

  useEffect(() => {
    dispatch(getProduct({ id }));
  }, [dispatch, id]);

  let stock = product.data?.stock;
  const options = () => {
    let arr = [];

    for (let i = 1; i <= stock; i++) {
      arr.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return arr;
  };

  if (isLoading) {
    return <Spinner />;
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
                  <div className=" mt-5 flex flex-row">
                    <span className="mr-2 font-semibold text-lg ">
                      Stock disponible:{" "}
                    </span>
                    <select
                      className="w-20 text-center border p-1 rounded"
                      onChange={(e) => setOrderQuantity(e.target.value)}
                    >
                      <option value={0}>CANT</option>
                      {options()}
                    </select>
                  </div>
                </div>

                <div className="mb-24">
                  <button className="bg-blue-600 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded">
                    {" "}
                    Comprar
                  </button>
                  <button
                    className="text-blue-500 rounded shadow-md py-2 px-4 ml-2"
                    onClick={async () => {
                      let quantity = orderQuantity;
                      await dispatch(addItem({ token, id, quantity }));
                    }}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
