import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/register";
import Slider from "../../layouts/home/Slider";

const Home = () => {
  const token = sessionStorage.getItem("token");
  let userName = localStorage.getItem("name");

  if (!token) {
    userName = null;
  }

  return (
    <>
      {!userName ? (
        <div>Hola Mundo</div>
      ) : (
        <div>
          Hola <strong>{userName}</strong>
        </div>
      )}
      <Slider />
    </>
  );
};

export default Home;
