import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from '../Spinner/Spinner'

const AccountSettings = () => {
  const { data, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("CONFIGURACION DEL USUARIO", data);
  }, [data]);

  if(isLoading) {
    return <Spinner />
  }

  return (
    <div className=" w-screen h-screen overflow-hidden bg-slate-300 ">
      <div className=" mx-auto my-20 max-w-2xl shadow-lg bg-white p-10">
        <div className="flex flex-row justify-between ">
          <h1 className="text-3xl font-bold"> Configuración de cuenta </h1>
          <Link to="/settings/edit" className="p-2 bg-gray-600 rounded">
            <button className="text-white font-semibold">Editar</button>
          </Link>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mt-3 ">
            {" "}
            Información de la cuenta{" "}
          </h2>
          <div className="mt-2">
            <p className="font-semibold">
              Nombre:{" "}
              <span className="font-semibold text-gray-500">{data.name}</span>{" "}
            </p>
            <p className="font-semibold">
              Apellido:{" "}
              <span className="font-semibold text-gray-500">
                {data.surname}
              </span>{" "}
            </p>
            <p className="font-semibold">
              Contraseña:{" "}
              <span className="font-semibold text-gray-500"> ******** </span>{" "}
            </p>
            <p className="font-semibold">
              {" "}
              Teléfono:{" "}
              <span className="font-semibold text-gray-500">
                {" "}
                {data.phone}{" "}
              </span>{" "}
            </p>
            <p className="font-semibold">
              Correo electrónico:{" "}
              <span className="font-semibold text-gray-500">
                {" "}
                {data.email}{" "}
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
