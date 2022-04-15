import React from "react";

const Header = () => (
  <div className="flex justify-center w-full h-24 bg-blue-700 text-white">
    <div className=" w-full max-w-6xl h-full gap-x-6 flex flex-row justify-center items-center md:gap-x-10 lg:ml-4 lg:mr-4">
      <div className="" id="logo">
        <h1>Logo</h1>
      </div>

      <div className="w-[50%] md:w-[40%]" id="searchBar">
        <input className="w-full rounded" />
      </div>

      <div
        className="hidden lg:gap-x-8 lg:flex lg:flex-row lg:items-center"
        id="menu"
      >
        <p>Productos</p>
        <p>Acerca de</p>
        <p>Contacto</p>
      </div>

      <div
        className="hidden sm:flex sm:flex-row sm:items-center sm:gap-x-6 "
        id="logIn_signUp"
      >
        <p>Ingresar</p>
        <p className="bg-cyan-600 rounded-lg p-2">Registrarse</p>
      </div>

      <div className="w-[2.5rem] lg:hidden" id="mobile-nav">
        <div className="border mb-2"></div>
        <div className="border mb-2"></div>
        <div className="border mb-2"></div>
      </div>
    </div>
  </div>
);

export default Header;
