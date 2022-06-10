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
  let subcategories = [];
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, fetchProducts]);
  useEffect(() => {
    console.log("ESTADO: ", products);
  }, [products]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="relative h-screen flex flex-row">
      <aside className="w-3/12">
        <DashboardSidebar />
      </aside>
      <div className="m-auto flex align-center justify-between w-9/12 h-screen ">
        <div className="m-auto ">
          <table className="w-full">
            <thead className="">
              <tr>
                <th className="w-1/5 text-center border border-gray-400 font-normal px-2 py-2">
                  Categoría
                </th>
                <th className="w-1/5 text-center border border-gray-400 font-normal px-2 py-2">
                  Subcategoría(s)
                </th>
                <th className="w-2/5 text-center border border-gray-400 font-normal px-2 py-2">
                  Nombre
                </th>
                <th className="w-1/ text-center border border-gray-400 font-normal px-2 py-2">
                  Editar
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  className="border border-gray-400 border-b h-10"
                  key={product.id}
                >
                  {product.subcategories.forEach((subcategory) => {
                    subcategories.push(subcategory.name);
                  })}
                  <td className="text-center border-gray-400 border-r">
                    {product.category}
                  </td>
                  <td className="text-center border-gray-400 border-r">
                    {subcategories.join(",")}
                  </td>
                  <td className="text-center border-gray-400 border-r">
                    {product.title}
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
