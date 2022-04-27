import React, { useContext, useEffect, useState } from "react";

// React Router
import { Routes, Route, Link, Navigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import user, { getUserData } from "./redux/reducers/user";

/* Components */
import Home from "./components/Home/Home";
import LogIn from "./components/Login/LogIn";
import SignUp from "./components/Signup/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import Products from "./components/Products/Products";
import Payment from "./layouts/payment/payment";
import Feedback from "./layouts/payment/feedback";
import Header from "./layouts/global/Header";
import Product from "./components/Product/Product";
import NotFound from "./layouts/404/404";
import AccountSettings from "./components/Settings/AccountSettings";
import EditSettings from "./components/Settings/EditSettings";
import "./index.css";

// Cookies
import Cookies from "js-cookie";

/* Components */

function App() {
  // const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(null);
  const readCookie = () => {
    const tokenCookie = Cookies.get("token");
    if (tokenCookie) {
      setToken(tokenCookie);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    // Carga al usuario cada vez que renderizamos
    dispatch(getUserData(token));
  }, [dispatch, token]);

  const { data, isLoading } = useSelector((state) => state.user);
  console.log("DATA: ", data);

  // Metodo para mostrar 404 no encontrado
  const generateRoute = (path, component) => {
    if (data && data.role === "STANDARD" && !isLoading) {
      return <Route path={path} element={component} exact />;
    } else if (isLoading) {
      // return <Route path={path} element={} exact />
    } else if (!data) {
      return <Route path={path} element={<NotFound />} exact />;
    }
  };

  return (
    <>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/payment"
          element={
            <>
              <Route
                path="/feedback"
                element={
                  <>
                    <Header /> <Feedback />
                  </>
                }
              />
              <Header />
              <Payment />
            </>
          }
        />
        <Route path="/product/:id" element={<Product />} />
        {/* Configuración de la cuenta */}
        {generateRoute("/settings", <AccountSettings />)}
        {generateRoute('/settings/edit', <EditSettings />)}

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
