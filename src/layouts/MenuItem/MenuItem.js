import React from "react";

import { ReactComponent as Settings } from "../../assets/icons/Settings.svg";
import { ReactComponent as Logout } from "../../assets/icons/Logout.svg";
import { ReactComponent as Dashboard } from "../../assets/icons/Dashboard.svg";
import { Link } from "react-router-dom";

const MenuItem = ({ logOut, role }) => {
  console.log("ROL DEL USUARIO: ", role);

  return (
    <div className="z-10 origin-top-right absolute rounded-md -right-1 mt-2 w-40  shadow-lg bg-white divide-y divide-gray-100 focus:outline-none">
      <div className="">
        {role === "STANDARD" ? (
          <Link
            to="/settings"
            className="group w-full flex items-center px-4 py-2 text-sm text-black hover:underline hover:opacity-60"
          >
            <Settings width="14" height="14" className="mr-1" />
            Configuración
          </Link>
        ) : null}
        {role === "ADMINISTRATOR" ? (
          <Link
            to="/dashboard"
            className="group w-full flex items-center px-4 py-2 text-sm text-black hover:underline hover:opacity-60"
          >
            <Dashboard width="14" height="14" className="mr-1" />
            Dashboard{" "}
          </Link>
        ) : null}
        <button
          onClick={logOut}
          className="group w-full flex items-center px-4 py-2 text-sm text-black hover:underline hover:opacity-60 "
        >
          <Logout width="14" height="14" className="mr-1" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
