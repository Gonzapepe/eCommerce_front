import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct } from "../../redux/reducers/product/product.actions";
import { addToCart } from "../../redux/reducers/cart/cart.actions";
import Spinner from "../Spinner/Spinner";
import AwesomeSlider from "react-awesome-slider";
import Header from "../../layouts/global/Header";
import "react-awesome-slider/dist/styles.css";
import "./productStyle.css";

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, isLoading } = useSelector((state) => state.product);
  const { data: user } = useSelector((state) => state.user);
  const [orderQuantity, setOrderQuantity] = useState(0);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log("PRODUCTO : ", product);
  });

  let stock = product?.stock;
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

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header user={user} />

      <div className=" bg-gray-100 h-full flex flex-col">
        <div className=" py-2 w-10/12 mx-auto">
          <button
            className="cursor-pointer hover:underline"
            onClick={() => goBack()}
          >
            Volver al listado
          </button>
        </div>
        {product && (
          <div className="bg-white rounded-lg overflow-hidden border border-gray-300 w-10/12 mx-auto">
            <div className="flex flex-row ">
              <div className="w-96 h-96 slider-contain ">
                <AwesomeSlider
                  className="sliderProduct h-72"
                  fillParent={false}
                >
                  {product.images &&
                    product?.images.map((image, index) => {
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
                  <div className="font-bold text-2xl ">{product.title}</div>
                  <div className="text-lg font-semibold">$ {product.price}</div>
                  <div className="font-bold text-base"> Descripción: </div>
                  <div className="text-base"> {product.description} </div>
                  <div className=" mt-5 flex flex-row items-center">
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

                <div className="mb-4">
                  <button className="bg-blue-600 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded">
                    {" "}
                    Comprar
                  </button>
                  <button
                    className="text-blue-500 rounded shadow-md py-2 px-4 ml-2"
                    onClick={async () => {
                      let quantity = orderQuantity;
                      await dispatch(addToCart(id, quantity));
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
