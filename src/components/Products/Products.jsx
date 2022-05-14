import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
import Product from "../../layouts/products/Product";
import Header from "../../layouts/global/Header";
import Subcategories from "../../layouts/subcategories/Subcategories";
import { fetchProducts } from "../../redux/reducers/products/products.actions";
import { useGetSubcategoriesProductsQuery } from "../../api/subcategories/subcategory";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../redux/reducers/user";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading } = useSelector((state) => state.products);
  const [subcategories, setSubcategories] = useState([]);
  // Es mejor hacer una sola request pero con todos los datos o hacer muchas por cada Producto?
  // const { data: subcategoriesProducts } =
  //   useGetSubcategoriesProductsQuery(subcategories);
  const { data: user } = useSelector((state) => state.user);

  const handleCallback = (name) => {
    // subcategories.forEach((subcategory) => {
    //   if (subcategory !== name) {
    //     setSubcategories((prevSubcategories) => [...prevSubcategories, name]);
    //   } else {
    //     setSubcategories(
    //       subcategories.filter((subcategory) => subcategory !== name)
    //     );
    //   }
    // });
    if (subcategories.find((subcategory) => subcategory === name)) {
      setSubcategories((prevSubcategories) =>
        prevSubcategories.filter((prevSubcategory) => prevSubcategory !== name)
      );
    } else {
      setSubcategories((prevSubcategories) => [...prevSubcategories, name]);
    }
  };

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Dirije al producto hacia la pagina del producto
  const onProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  // useEffect(() => {
  //   console.log("DATOS DE PRODUCTOS SUBCATEGORIAS: ", subcategoriesProducts);
  // }, [subcategories]);

  // useEffect(() => {
  //   console.log("PRODUCTS DE SUBCATEGORIA", subcategoryProducts);
  // }, [subcategories]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      {(console.log("USUARIOOO: "), user)}
      <Header user={user} />
      <div className=" flex bg-slate-200  h-screen">
        <div className=" w-1/4">
          <Subcategories parentCallback={handleCallback} />
        </div>
        <div className=" mt-8 ml-12 w-3/4  flex  gap-y-10 gap-x-6 ">
          {
            subcategories.length === 0 || subcategories.length === undefined
              ? products.map((item) => {
                  {
                    console.log("ITEM: ", item);
                  }
                  return (
                    <div onClick={() => onProductClick(item.id)}>
                      <Product
                        key={item.id}
                        path={
                          item.images.length
                            ? item.images[0].path
                            : "uploads/default.png"
                        }
                        title={item.title}
                        subcategories={
                          item.subcategories.length ? item.subcategories : null
                        }
                        price={item.price}
                        description={item.description}
                      />
                    </div>
                    // <div>
                    //   <h2> {item.title} </h2>
                    //   <img
                    //     src={`http://localhost:4000/${item.images[0].path}`}
                    //     runat="server"
                    //   />
                    //   <p> {item.stock} </p>
                    //   <p> {item.description} </p>
                    // </div>
                  );
                })
              : null
            // subcategoriesProducts?.data.map((item) => {
            //     console.log("IMAGENES DE: ", item.images);
            //     return (
            //       <Product
            //         key={item.id}
            //         title={item.title}
            //         price={item.price}
            //         description={item.description}
            //         path={
            //           item.images !== undefined && item.images !== null
            //             ? item.images.length
            //               ? item.images[0].path
            //               : "uploads/default.png"
            //             : "uploads/default.png"
            //         }
            //       />
            //     );
            //   })
          }
        </div>
      </div>
    </>
  );
};

export default Products;
