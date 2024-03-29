import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { editUser } from "../../redux/reducers/user/user.actions";

const EditSettings = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { data, isLoading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setFormData((values) => {
      return { ...values, [name]: value };
    });
  };

  useEffect(() => {
    if (formData.length === undefined || formData.length === null) {
      setFormData({
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
      });
    }
  }, [data, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FORM DATA: ", formData);
    dispatch(editUser(data.id, formData));
    // navigate("/settings");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-300">
      <div className="mx-auto my-20 max-w-2xl shadow-lg bg-white p-10">
        <div className="flex flex-row">
          <Link to="/settings" className="text-gray-700 font-semibold ">
            {" "}
            Mi cuenta{" "}
          </Link>
          <p>
            {/* &nbsp; es un espacio en blanco */}
            &nbsp; / <span className="font-semibold"> Editar información </span>
          </p>
        </div>
        {/* NOMBRE */}
        <div className="mt-3">
          <label className="font-semibold text-lg" for="nombre">
            Nombre:
          </label>
          <input
            className="text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0 focus:outline-none focus:border-solid focus:border-sky-700"
            type="text"
            placeholder="nombre"
            id="nombre"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {/* APELLIDO */}
        <div className="mt-3">
          <label className="font-semibold text-lg" for="apellido">
            Apellido:
          </label>
          <input
            className="text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0 focus:outline-none focus:border-solid focus:border-sky-700"
            type="text"
            placeholder="apellido"
            id="apellido"
            name="surname"
            value={formData.surname}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {/* EMAIL */}
        <div className="mt-3">
          <label className="font-semibold text-lg" for="email">
            Correo electrónico:
          </label>
          <input
            className="text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0 focus:outline-none focus:border-solid focus:border-sky-700"
            type="text"
            placeholder="correo electrónico"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {/* TELEFONO */}
        <div className="mt-3">
          <label className="font-semibold text-lg" for="phone">
            Teléfono:
          </label>
          <input
            className="text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0 focus:outline-none focus:border-solid focus:border-sky-700"
            type="text"
            placeholder="Teléfono"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {/* CONTRASEÑA */}
        {/* <div>
          <label for="password">Contraseña</label>
          <input
            className="text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0 focus:outline-none focus:border-solid focus:border-sky-700"
            type="password"
            placeholder="Contraseña"
            id="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </div> */}
        {/* CONFIRMAR CONTRASEÑA */}
        {/* <div>
          <label for="confirmPassword">Confirmar contraseña</label>
          <input
            className="text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0 focus:outline-none focus:border-solid focus:border-sky-700"
            type="password"
            placeholder="Confirmar contraseña"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
        </div> */}

        <div className=" flex flex-row text-center ">
          <button
            className="p-2 bg-blue-600 text-white font-semibold mt-5"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Actualizar
          </button>

          <Link
            className="p-2 text-blue-600 font-semibold rounded ml-3 mt-5"
            to="/settings"
          >
            Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditSettings;
