import React, { useState, useRef, useEffect } from "react";

// Redux toolkit
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/reducers/user/user.actions";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const formRef = useRef();
  const { userCreated, errors } = useSelector((state) => state.user);

  // useEffect(() => {
  //   console.log("ERRORES: ", errors);
  //   errors.map((error) => {
  //     if (error.email) {
  //       console.log("ERRORRES EMAIL: ", error);
  //     }
  //   });
  // }, [errors]);

  useEffect(() => {
    console.log("USUARIO CREADO: ", userCreated);
    if (userCreated !== false) {
      navigate("/log-in");
    }
  }, [userCreated, navigate]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(formData));
    formRef.current.reset();
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-300">
      <div className="max-w-md w-full absolute top-10 left-1/3 rounded overflow-hidden shadow-lg bg-white mx-auto pt-10 pl-10 pr-10 pb-5">
        <form className="flex flex-col" ref={formRef} onSubmit={handleSubmit}>
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
              {/* ERRORES NOMBRE */}
              <div>
                {errors.errorsValidation
                  ? errors.errorsValidation.map((error) => {
                      if (error.name) {
                        return (
                          <div className="text-red-600"> {error.name} </div>
                        );
                      } else return null;
                    })
                  : null}
              </div>
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
              <div>
                {errors.errorsValidation
                  ? errors.errorsValidation.map((error) => {
                      if (error.surname) {
                        return (
                          <div className="text-red-600"> {error.surname} </div>
                        );
                      } else return null;
                    })
                  : null}
              </div>
            </div>
          </div>
          {/* EMAIL */}
          <div className="relative mt-5 ">
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
            {/* ERRORES DE EMAIL */}
            <div>
              {errors.errorsValidation
                ? errors.errorsValidation.map((error) => {
                    if (error.email) {
                      return <div className="text-red-600">{error.email}</div>;
                    } else return null;
                  })
                : null}
            </div>
          </div>
          {/* TELÉFONO */}
          <div className="relative mt-5 ">
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
            {/* ERRORES TELÉFONO */}
            <div>
              {errors.errorsValidation
                ? errors.errorsValidation.map((error) => {
                    if (error.phone) {
                      return (
                        <div className="text-red-600"> {error.phone} </div>
                      );
                    } else return null;
                  })
                : null}
            </div>
          </div>
          {/* CONTRASEÑA */}
          <div className="relative mt-5 ">
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
            {/* ERRORES CONTRASEÑA */}
            <div>
              {errors.errorsValidation
                ? errors.errorsValidation.map((error) => {
                    if (error.password) {
                      return (
                        <div className="text-red-600"> {error.password} </div>
                      );
                    } else return null;
                  })
                : null}
            </div>
          </div>
          {/* CONFIRMAR CONTRASEÑA */}
          <div className="relative mt-5 ">
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
            {/* ERRORES CONFIRMAR CONTRASEÑA  */}
            <div>
              {errors.errorsValidation
                ? errors.errorsValidation.map((error) => {
                    if (error.passwordConfirm) {
                      return (
                        <div className="text-red-600">
                          {" "}
                          {error.passwordConfirm}{" "}
                        </div>
                      );
                    } else return null;
                  })
                : null}
            </div>
          </div>
          {/* BOTON */}
          <div className="text-center">
            <button
              className="p-2 bg-blue-600 text-white font-semibold mt-5 "
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Registrarme
            </button>
          </div>
          <div className="mt-5">
            <p>
              ¿Ya tenés cuenta?{" "}
              <Link to="/log-in" className="text-blue-500 hover:underline ">
                Inicia sesión
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
