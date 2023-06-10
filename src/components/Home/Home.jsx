import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/reducers/user";
import Cookies from "js-cookie";
import Slider from "../../layouts/home/Slider";
import Header from "../../layouts/global/Header";
import Categories from "../../layouts/home/Categories";
import ColorSimulator from "../../layouts/home/ColorSimulator";
import Delivery from "../../layouts/home/Delivery";
import { loadUser } from "../../redux/reducers/user/user.actions";

const Home = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state) => state.user);

  useEffect(() => {
    if (token !== null) {
      dispatch(loadUser());
    }
  }, [token]);

  return (
    <div className="max-h-screen overflow-y-auto  bg-slate-300">
      <Header user={data} />
      <Slider />
      <Categories />
      <ColorSimulator />
      <Delivery />
    </div>
  );
};

export default Home;
