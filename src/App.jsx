import React, { useContext, useEffect, useState } from "react";

// React Router
import { Routes, Route, Link, Navigate } from "react-router-dom";

/* Components */
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Auth from "./Auth";
import Payment from "./layouts/payment/payment";
import Feedback from "./layouts/payment/feedback";
import Header from "./layouts/global/Header";
import Product from "./components/Product";

// Cookies
import Cookies from "js-cookie";

/* Components */

function App() {
  const [auth, setAuth] = useState(false);

  const readCookie = () => {
    const user = Cookies.get("user");
    if (user) {
      setAuth(true);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <>
      <Auth.Provider value={{ auth, setAuth }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<ProtectedLogin />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<ProtectedDashboard />} />
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
        </Routes>
      </Auth.Provider>
    </>
  );
}

function ProtectedDashboard() {
  const { auth } = useContext(Auth);

  return <>{auth ? <Dashboard /> : <Navigate to="/log-in" />}</>;
}

function ProtectedLogin() {
  const { auth } = useContext(Auth);

  return <>{!auth ? <LogIn /> : <Navigate to="/dashboard" />}</>;
}

export default App;
