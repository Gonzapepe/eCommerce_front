import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/reducers/user";
import Cookies from "js-cookie";
import Slider from "../../layouts/home/Slider";
import Header from "../../layouts/global/Header";

const Home = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state) => state.user);

  useEffect(() => {
    if (token !== null) {
      dispatch(getUserData(token));
    }
  }, [token]);

  return (
    <div className="overflow-hidden bg-slate-300">
      <Header user={data} />
      <Slider />
    </div>
  );
};

export default Home;
