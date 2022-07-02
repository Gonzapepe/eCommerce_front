import React, { useState, useRef } from "react";
import DashboardSidebar from "../../layouts/DashboardSidebar/DashboardSidebar";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/reducers/product/product.actions";
import { useNavigate } from "react-router-dom";
import FileInput from "../../layouts/FileInput/FileInput";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const formRef = useRef();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((values) => {
      return { ...values, [name]: value };
    });
  };

  const onFileChange = (files) => {
    console.log(files);
    setFormData((values) => {
      return { ...values, images: files };
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    formRef.current.reset();
    setFormData({});
    navigate("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("DATA DEL FORM DATA: ", formData);
    dispatch(addProduct(formData));
    formRef.current.reset();
    setFormData({});
  };

  return (
    <div className="relative h-full flex flex-row">
      <aside className="w-3/12">
        <DashboardSidebar />
      </aside>
      <div className="m-auto my-5 flex align-center justify-between w-9/12 h-full overflow-hidden max-w-2xl bg-white rounded shadow-xl">
        <form className="m-auto" ref={formRef} onSubmit={handleSubmit}>
          <div className="header mt-3">
            <p className="font-semibold text-xl ">Añadir productos</p>
          </div>

          {/* Titulo del producto */}
          <div className="mt-3">
            <label for="title" className="font-semibold text-base">
              Nombre del producto
            </label>
            <input
              onChange={(e) => handleChange(e)}
              placeholder="título"
              type="text"
              id="title"
              name="title"
              className="text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0 focus:outline-none focus:border-solid focus:border-sky-700"
            />
          </div>

          {/* Descripción del producto */}
          <div className="mt-3">
            <label for="description" className="font-semibold text-base">
              Descripción
            </label>
            <textarea
              onChange={(e) => handleChange(e)}
              type="text"
              id="description"
              name="description"
              placeholder="Descripción"
              className="text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0 focus:outline-none focus:border-solid focus:border-sky-700"
            />
          </div>

          {/* Stock y precio */}
          <div className="mt-3 flex flex-row justify-between">
            <div className="mr-3">
              <label for="stock" className="font-semibold text-base">
                Stock
              </label>
              <input
                onChange={(e) => handleChange(e)}
                type="number"
                id="stock"
                name="stock"
                placeholder="Stock"
                className="text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0 focus:outline-none focus:border-solid focus:border-sky-700"
              />
            </div>
            <div className="ml-3">
              <label for="price" className="font-semibold text-base">
                Precio
              </label>
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                id="price"
                name="price"
                placeholder="Precio"
                className="text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0 focus:outline-none focus:border-solid focus:border-sky-700"
              />
            </div>
          </div>
          {/* Categoría */}
          <div className="mt-3 flex flex-col">
            <label for="category" className="font-semibold text-base">
              Categoría
            </label>
            <select
              onChange={(e) => handleChange(e)}
              name="category"
              id="category"
              className="mt-2 w-30 text-center border p-1 rounded"
            >
              <option value={null}>Elegir categoría</option>
              <option value={"muebles"}>Muebles</option>
              <option value={"pisos"}>Pisos</option>
              <option value={"sanitarios"}>Sanitarios</option>
              <option value={"cocina"}>Cocina</option>
              <option value={"accesorios"}>Accesorios</option>
              <option value={"pinturas"}>Pinturas</option>
            </select>
          </div>
          {/* Subir Imágen */}
          <div className="mt-5 flex items-center justify-center">
            <FileInput onFileChange={(files) => onFileChange(files)} />
          </div>
          <div className="flex flex-row justify-end mt-10 mb-5">
            <button
              onClick={(e) => handleCancel(e)}
              className=" text-blue-500 rounded shadow-md py-2 px-4 ml-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="ml-5 text-white bg-blue-500 rounded shadow-md py-2 px-4 ml-2"
            >
              {" "}
              Añadir{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
