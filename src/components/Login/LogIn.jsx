import React, { useState, useRef, useEffect } from "react";
// RTK
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/reducers/user/user.actions";
// React-router-dom
import { Link } from "react-router-dom";
// React Router
import { useNavigate } from "react-router-dom";
import "./login.css";

const LogIn = () => {
  const dispatch = useDispatch();

  // Estado local
  const [formData, setFormData] = useState({});

  const { errors, token } = useSelector((state) => state.user);

  // React Router
  const navigate = useNavigate();

  // Ref
  const formRef = useRef();

  // Functions

  useEffect(() => {
    console.log("TOKEN: ", token);
    if (token !== null) {
      navigate("/");
    }
  }, [token]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
    if (errors === null) {
      formRef.current.reset();
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-300 ">
      <div className="max-w-md w-full absolute top-10 left-1/3 rounded overflow-hidden shadow-lg bg-white mx-auto p-10 ">
        <form className="flex flex-col" ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-10">
            <h3 className="text-center"> INICIAR SESIÓN </h3>
          </div>
          {/* EMAIL */}
          <div className="relative">
            <input
              className="peer placeholder-transparent text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0
              focus:outline-none focus:border-b focus:border-solid focus:border-sky-700
            "
              type="text"
              placeholder="email"
              id="email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <label
              for="email"
              className="absolute left-0 -top-3 transition-all text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-gray-700 peer-focus:text-xs"
            >
              Email
            </label>
            {/* ERRORES EMAIL */}
            <div>
              {errors.errorsValidation
                ? errors.errorsValidation.map((error) => {
                    if (error.email) {
                      return (
                        <div className="text-red-600"> {error.email} </div>
                      );
                    }
                  })
                : null}
            </div>
          </div>
          {/* CONTRASEÑA */}
          <div className="relative mt-10">
            <input
              className="peer placeholder-transparent text-base w-full bg-clip-padding bg-transparent border-0 border-b border-solid border-slate-700 pt-1 px-0
              focus:outline-none focus:border-b focus:border-solid focus:border-sky-700
            "
              type="password"
              placeholder="contraseña"
              id="password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <label
              for="password"
              className="absolute left-0 -top-3 transition-all text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-gray-700 peer-focus:text-xs"
            >
              {" "}
              Contraseña{" "}
            </label>
            {/* ERRORES DE CONTRASEÑA O LOGIN GENERAL */}
            <div>
              {console.log("ERRORES: ", errors)}
              {errors.errorsValidation
                ? errors.errorsValidation.map((error, index) => {
                    console.log("ERROR: ", error);
                    if (error.password) {
                      return (
                        <div key={index} className="text-red-600">
                          {error.password}
                        </div>
                      );
                    }
                  })
                : null}
              {errors.errors
                ? errors.errors.map((error) => {
                    return <div className="text-red-600"> {error} </div>;
                  })
                : null}
            </div>
          </div>
          {/* BOTÓN */}
          <div className="text-center">
            <button
              className="p-2 bg-blue-600 text-white font-semibold mt-5"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Iniciar sesión
            </button>
          </div>
          <div className="mt-5">
            <p>
              ¿No tenés cuenta?{" "}
              <Link to="/sign-up" className="text-blue-500 hover:underline">
                Registrate
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
