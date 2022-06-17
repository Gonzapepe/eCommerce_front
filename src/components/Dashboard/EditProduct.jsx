import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../../layouts/DashboardSidebar/DashboardSidebar";
import { fetchProducts } from "../../redux/reducers/products/products.actions";
import Spinner from "../Spinner/Spinner";
import EditProductModal from "../../layouts/EditProductModal/EditProductModal";
import { ReactComponent as Edit } from "../../assets/icons/Edit.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
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
          <table className="w-full bg-white">
            <thead className="">
              <tr>
                <th className="w-1/5 font-bold text-center border border-gray-400  px-2 py-2">
                  Categoría
                </th>
                <th className="w-1/5 font-bold text-center border border-gray-400  px-2 py-2">
                  Subcategoría(s)
                </th>
                <th className="w-2/5 font-bold text-center border border-gray-400  px-2 py-2">
                  Nombre
                </th>
                <th className="w-1/ font-bold text-center border border-gray-400  px-2 py-2">
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
                  <td className="text-center border-gray-400 ">
                    {product.category}
                  </td>
                  <td className="text-center border-gray-400 ">
                    {subcategories.join(",")}
                  </td>
                  <td className="text-center border-gray-400 ">
                    {product.title}
                  </td>
                  <td className="flex  justify-center items-center h-20">
                    <button
                      className="rounded bg-blue-500 p-2 mr-2 "
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <Edit width="14" height="14" />
                    </button>
                    <button className="rounded bg-red-500 p-2 ">
                      <Trash width="14" height="14" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isOpen && <EditProductModal />}
    </div>
  );
};

export default EditProduct;
