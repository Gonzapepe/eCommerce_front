import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProduct,
  updateProduct,
} from "../../redux/reducers/product/product.actions";

import {
  fetchImages,
  deleteImage,
} from "../../redux/reducers/images/images.actions";
import { fetchProducts } from "../../redux/reducers/products/products.actions";
import { useLocation } from "react-router-dom";
import FileInput from "../../layouts/FileInput/FileInput";
import Spinner from "../../components/Spinner/Spinner";

const EditProductModal = ({ id, handleModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stock: 0,
    price: 0,
    category: "",
    images: null,
  });
  const [success, setSuccess] = useState(false);
  const { product, isLoading } = useSelector((state) => state.product);
  const { images } = useSelector((state) => state.images);
  const dispatch = useDispatch();
  const search = useLocation().search;

  useEffect(() => {
    dispatch(fetchProduct(id));
    dispatch(fetchImages(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log("PRODUCTO TITULO: ", product);
    if (product) {
      setFormData({
        id: id,
        title: product.title,
        description: product.description,
        stock: product.stock,
        price: product.price,
        category: product.category,
        images: images,
      });
    }
  }, [product, id, images]);

  const onFileChange = (files) => {
    console.log(files);
    setFormData((values) => {
      return { ...values, images: files };
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProduct(formData));
    setSuccess(true);
  };

  const removeImage = (e, id) => {
    e.preventDefault();
    dispatch(deleteImage(product.id, id));
  };

  useEffect(() => {
    if (success) {
      dispatch(fetchProducts(search));
      handleModal();
    }
  }, [dispatch, success, search, handleModal]);

  if (isLoading) {
    return (
      <div className="absolute flex w-screen h-screen bg-black/75">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="absolute overflow-y-scroll flex w-screen h-full bg-black/75">
      <div className="z-50 overflow-hidden w-2/4 m-auto align-center bg-white accent-white rounded">
        <form
          onSubmit={handleSubmit}
          className="m-auto w-10/12 accent-white p-5"
        >
          <div className="header">
            <p className="font-semibold text-xl">Editar producto</p>
          </div>
          {/* Titulo del producto */}
          <div className="mt-3">
            <label for="title" className="font-semibold text-base">
              Nombre del producto
            </label>
            <input
              value={formData.title}
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
            <input
              value={formData.description}
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
                value={formData.stock}
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
                value={formData.price}
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
              value={formData.category}
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

          {/* Añadir imágenes */}
          <div className="mt-5">
            {product && product.images && product.images.length > 0 ? (
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-lg"> Imágenes </span>
                <div className="flex flex-row justify-between items-center">
                  {images.map((image, index) => {
                    return (
                      <div
                        className="flex rounded align-center justify-center relative group w-40 h-30"
                        key={index}
                      >
                        <img
                          className=" h-40 w-30 object-cover group-hover:brightness-50 "
                          src={`http://localhost:4000/${image.path}`}
                          alt={index}
                        />
                        <button
                          className="absolute top-1/2 my-auto hidden text-xs text-white p-2 rounded font-semibold uppercase bg-red-500 group-hover:block hover:bg-red-700"
                          onClick={(e) => removeImage(e, image.id)}
                        >
                          eliminar
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-black font-semibold ">
                {product && product.images && product.images.length === 0
                  ? "éste producto no tiene imágenes"
                  : "Loading..."}
              </p>
            )}
          </div>

          {/* Subir imagen */}
          <div className="mt-10 flex items-center justify-center">
            <FileInput onFileChange={(files) => onFileChange(files)} />
          </div>

          {/* Botones */}
          <div className="flex flex-row justify-end mt-10">
            <button
              className="text-blue-500 rounded shadow-md py-2 px-4 ml-2 hover:bg-slate-300"
              onClick={() => handleModal()}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="ml-5 text-white bg-blue-500 rounded shadow-md py-2 px-4 ml-2 hover:bg-blue-600"
            >
              Añadir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
