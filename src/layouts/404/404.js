import React from "react";

const NotFound = () => {
  return (
    <div>
      <div>
        <h1> 404 </h1>
      </div>
      <div>
        <h2>Página no encontrada</h2>
        <p>
          La página que estas buscando talvez fue removida o su nombre ha
          cambiado
        </p>
        <a href="/"> Home </a>
      </div>
    </div>
  );
};

export default NotFound;
