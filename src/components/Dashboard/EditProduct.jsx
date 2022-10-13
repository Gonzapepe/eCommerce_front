import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardSidebar from "../../layouts/DashboardSidebar/DashboardSidebar";
import { fetchProducts } from "../../redux/reducers/products/products.actions";
import Spinner from "../Spinner/Spinner";
import EditProductModal from "../../layouts/EditProductModal/EditProductModal";
import { ReactComponent as Edit } from "../../assets/icons/Edit.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import Pagination from "../../layouts/pagination/pagination";

import "./editProduct.css";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useLocation().search;
  // const page = parseInt(query.get("page") || "1", 10);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const { products, isLoading } = useSelector((state) => state.products);
  let subcategories = [];

  console.log("USE LOCATION: ", search);

  const handleModal = (id) => {
    setIsOpen(!isOpen);
    if (id === undefined) {
      id = null;
    }
    setId(id);
  };

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
    <div className=" h-screen flex flex-row">
      <aside className="w-3/12">
        <DashboardSidebar />
      </aside>
      <div className="m-auto flex align-center justify-between w-9/12 h-screen">
        <div className="w-full bg-gray">
          <div className="m-auto mt-3 flex flex-row justify-between align-center mb-3 w-11/12">
            <p className="ml-1 font-bold text-2xl"> Editar Productos</p>
          </div>
          <table className="bg-white justify-center align-center m-auto w-11/12 rounded">
            <thead className="">
              <tr>
                <th className="w-1/6 font-bold text-center border border-gray-400  px-2 py-2">
                  Categoría
                </th>
                <th className="w-1/6 font-bold text-center border border-gray-400  px-2 py-2">
                  Subcategoría(s)
                </th>
                <th className="w-2/6 font-bold text-center border border-gray-400  px-2 py-2">
                  Nombre
                </th>
                <th className="w-1/6 font-bold text-center border border-gray-400  px-2 py-2">
                  Editar
                </th>
              </tr>
            </thead>
            <tbody>
              {products.products &&
                products.products.map((product) => (
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
                        className="rounded bg-blue-500 p-2 mr-2 hover:bg-blue-500/50 "
                        onClick={() => handleModal(product.id)}
                      >
                        <Edit className="white" width="14" height="14" />
                      </button>
                      <button className="rounded bg-red-500 p-2 hover:bg-red-500/50">
                        <Trash className="white" width="14" height="14" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {!isLoading && (
          <Pagination path="/edit/product" pagesCount={products.last_page} />
        )}
      </div>

      {isOpen && <EditProductModal handleModal={handleModal} id={id} />}
    </div>
  );
};

export default EditProduct;
