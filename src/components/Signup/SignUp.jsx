import React, { useState, useRef, useEffect } from "react";

// Redux toolkit
import { useDispatch, useSelector } from "react-redux";
import { postRegister } from "../../redux/reducers/user";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const formRef = useRef();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = async () => {
    const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    const validatedPhone = phoneRegex.test(formData.phone);
    if (formData.email.trim() === "") {
      console.log("Email invalido");
      return;
    } else if (formData.name.trim() === "") {
      console.log("Nombre inválido");
      return;
    } else if (formData.surname.trim() === "") {
      console.log("Apellido inválido");
      return;
    } else if (formData.phone.trim() === "" || validatedPhone === false) {
      console.log("Número de teléfono inválido");
      return;
    } else if (formData.password.trim() === "") {
      console.log("Por favor ingrese una contraseña");
      return;
    } else if (formData.password.length <= 6) {
      console.log("La contraseña tiene que tener mas de 6 caracteres");
      return;
    } else if (formData.confirmPassword.trim() === "") {
      console.log("Confirmar contraseña inválido");
      return;
    } else if (formData.confirmPassword !== formData.password) {
      console.log("Contraseña y confirmar contraseña deben ser iguales");
      return;
    } else {
      dispatch(postRegister(formData));
      formRef.current.resetFields();
      navigate("/log-in");
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-300">
      <div className="max-w-md w-full absolute top-10 left-1/3 rounded overflow-hidden shadow-lg bg-white mx-auto p-10 ">
        <form className="flex flex-col" ref={formRef}>
          <div className="mb-10">
            <h3 className="text-center"> REGISTRARSE </h3>
          </div>
          {/* NOMBRE Y APELLIDO */}
          <div className="flex flex-row justify-between ">
            <div className="relative">
              <input
                className="peer placeholder-transparent text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0  focus:outline-none focus:border-b focus:border-solid focus:border-sky-700"
                type="text"
                placeholder="Nombre"
                id="nombre"
                name="name"
                onChange={(e) => handleChange(e)}
              />
              <label
                for="nombre"
                className="absolute left-0 -top-3 transition-all text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-gray-700 peer-focus:text-xs"
              >
                Nombre
              </label>
            </div>
            <div className="relative">
              <input
                className="peer placeholder-transparent text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0  focus:outline-none focus:border-b focus:border-solid focus:border-sky-700"
                type="text"
                placeholder="Apellido"
                id="apellido"
                name="surname"
                onChange={(e) => handleChange(e)}
              />
              <label
                for="apellido"
                className="absolute left-0 -top-3 transition-all text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-gray-700 peer-focus:text-xs"
              >
                Apellido
              </label>
            </div>
          </div>
          {/* EMAIL */}
          <div className="relative mt-10 ">
            <input
              id="email"
              type="text"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
              className="peer placeholder-transparent text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0 focus:outline-none focus:border-b focus:border-solid focus:border-sky-700"
            />
            <label
              for="email"
              className="absolute left-0 -top-3 transition-all text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-gray-700 peer-focus:text-xs"
            >
              Email
            </label>
          </div>
          {/* TELÉFONO */}
          <div className="relative mt-10 ">
            <input
              id="telefono"
              type="text"
              placeholder="telefono"
              name="phone"
              onChange={(e) => handleChange(e)}
              className="peer placeholder-transparent text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0 focus:outline-none focus:border-b focus:border-solid focus:border-sky-700"
            />
            <label
              for="telefono"
              className="absolute left-0 -top-3 transition-all text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-gray-700 peer-focus:text-xs"
            >
              Teléfono
            </label>
          </div>
          {/* CONTRASEÑA */}
          <div className="relative mt-10 ">
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={(e) => handleChange(e)}
              className="peer placeholder-transparent text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0 focus:outline-none focus:border-b focus:border-solid focus:border-sky-700"
            />
            <label
              for="password"
              className="absolute left-0 -top-3 transition-all text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-gray-700 peer-focus:text-xs"
            >
              Contraseña
            </label>
            {/* CONFIRMAR CONTRASEÑA */}
          </div>
          <div className="relative mt-10 ">
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirmar contraseña"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
              className="peer placeholder-transparent text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0 focus:outline-none focus:border-b focus:border-solid focus:border-sky-700"
            />
            <label
              for="confirmPassword"
              className="absolute left-0 -top-3 transition-all text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-gray-700 peer-focus:text-xs"
            >
              Confirmar contraseña
            </label>
          </div>
          {/* BOTON */}
          <div className="text-center">
            <button
              className="p-2 bg-blue-600 text-white font-semibold mt-5 "
              type="submit"
            >
              Registrarme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
