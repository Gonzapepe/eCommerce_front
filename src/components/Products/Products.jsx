import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import ProductCard from "../../layouts/products/Product";
import Header from "../../layouts/global/Header";
import Subcategories from "../../layouts/subcategories/Subcategories";
import { fetchProducts } from "../../redux/reducers/products/products.actions";
import { useNavigate } from "react-router-dom";
import { loadUser } from "../../redux/reducers/user/user.actions";
import { fetchProductsSubcategories } from "../../redux/reducers/productSubcategories/productSubcategories.actions";

const Products = ({ fetchProducts, fetchUserData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading } = useSelector((state) => state.products);
  const { products: subcategoriesProducts } = useSelector(
    (state) => state.productSubcategories
  );
  const [subcategories, setSubcategories] = useState([]);
  // Es mejor hacer una sola request pero con todos los datos o hacer muchas por cada Producto?
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
    dispatch(fetchProductsSubcategories(subcategories));
  }, [dispatch, subcategories]);

  useEffect(() => {
    fetchProducts();
    fetchUserData();
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
    <div className="max-h-screen overflow-y-auto ">
      <Header user={user} />
      <div className="flex h-screen ">
        {/* <Box sx={{ display: "flex" }}> */}
        <div className="w-1/6 bg-gray-200 px-4 py-8">
          <Subcategories parentCallback={handleCallback} />
        </div>
        <div className="flex-1 bg-white overflow-y-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Productos</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategories.length === 0 || subcategories.length === undefined
              ? products.products &&
                products.products.map((item) => {
                  {
                    console.log("ITEM: ", item);
                  }
                  return (
                    <div onClick={() => onProductClick(item.id)}>
                      <ProductCard
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
              : subcategoriesProducts?.map((item) => {
                  console.log("IMAGENES DE: ", item.images);
                  return (
                    <ProductCard
                      key={item.id}
                      title={item.title}
                      price={item.price}
                      description={item.description}
                      path={
                        item.images !== undefined && item.images !== null
                          ? item.images.length
                            ? item.images[0].path
                            : "uploads/default.png"
                          : "uploads/default.png"
                      }
                    />
                  );
                })}
          </div>
        </div>
        {/* </Box> */}
      </div>
    </div>
  );
};

// Aprovechamos para hacerlo mas limpio
const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  fetchUserData: () => dispatch(loadUser()),
});

export default connect(null, mapDispatchToProps)(Products);
