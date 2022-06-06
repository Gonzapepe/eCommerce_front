import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../../layouts/DashboardSidebar/DashboardSidebar";
import { fetchProducts } from "../../redux/reducers/products/products.actions";
import Spinner from "../Spinner/Spinner";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, fetchProducts]);
  useEffect(() => {
    console.log("PRODUCTOS: ", products);
  }, [products]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="relative w-full h-screen flex flex-row">
      <DashboardSidebar />
      <div className="w-full h-screen ">
        <div className="absolute left-1/2 top-1/3 ">
          <table>
            <thead className="">
              <tr>
                <th>Categoría</th>
                <th>Subcategoría(s)</th>
                <th>Nombre</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr>
                  <td>{product.category}</td>
                  <td>{product.subcategories}</td>
                  <td>{product.title}</td>
                  <td>
                    <button></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
