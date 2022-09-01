import React, { useContext, useEffect, useState } from "react";

// React Router
import { Routes, Route, Link, Navigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./redux/reducers/login";
import user, { getUserData } from "./redux/reducers/user";
import { loadUser } from "./redux/reducers/user/user.actions";

/* Components */
import Home from "./components/Home/Home";
import LogIn from "./components/Login/LogIn";
import SignUp from "./components/Signup/SignUp";
import Products from "./components/Products/Products";
import Payment from "./layouts/payment/payment";
import Feedback from "./layouts/payment/feedback";
import Header from "./layouts/global/Header";
import Product from "./components/Product/Product";
import NotFound from "./layouts/404/404";
import AccountSettings from "./components/Settings/AccountSettings";
import EditSettings from "./components/Settings/EditSettings";
import Spinner from "./components/Spinner/Spinner";
import Dashboard from "./components/Dashboard/Dashboard";
import AddProduct from "./components/Dashboard/AddProduct";
import AddSubcategory from "./components/Dashboard/AddSubcategory";
import EditProduct from "./components/Dashboard/EditProduct";
import EditSubcategory from "./components/Dashboard/EditSubcategory";
import "./index.css";

/* Components */

function App() {
  // const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  const state = useSelector((state) => state.user);

  useEffect(() => {
    // Carga al usuario cada vez que renderizamos
    dispatch(loadUser());
  }, [dispatch]);

  const { data, isLoading } = useSelector((state) => state.user);

  console.log("DATA: ", data);

  // Metodo para mostrar 404 no encontrado
  const generateRoute = (path, component) => {
    if (data && data.role === "STANDARD" && !isLoading) {
      return <Route path={path} element={component} exact />;
    } else if (isLoading) {
      return <Route path={path} element={<Spinner />} exact />;
    } else if (!data && !isLoading) {
      return <Route path={path} element={<NotFound />} exact />;
    }
  };

  const generateAdminRoute = (path, component) => {
    if (data && data.role === "ADMINISTRATOR" && !isLoading) {
      return <Route path={path} element={component} exact />;
    } else if (isLoading) {
      return <Route path={path} element={<Spinner />} exact />;
    } else if (!data && !isLoading) {
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
        {generateRoute("/settings/edit", <EditSettings />)}

        {/* Configuracion para el administrador */}
        {generateAdminRoute("/dashboard", <Dashboard />)}
        {generateAdminRoute("/dashboard/add/product", <AddProduct />)}
        {generateAdminRoute("/dashboard/edit/product/*", <EditProduct />)}
        {generateAdminRoute("/dashboard/add/subcategory", <AddSubcategory />)}
        {generateAdminRoute("/dashboard/edit/subcategory", <EditSubcategory />)}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
