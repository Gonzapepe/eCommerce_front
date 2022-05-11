import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Profile } from "../../assets/icons/Profile.svg";
import { ReactComponent as ShoppingCart } from "../../assets/icons/shopping-cart.svg";
import { toggleCartHidden } from "../../redux/reducers/cart";
import "./headerStyle.css";
import { useNavigate } from "react-router-dom";
import MenuItem from "../MenuItem/MenuItem";
import CartDropdown from "..//Cart/CartDropdown";

const Header = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Maybe I should add a isAuthenticated to the redux user initialState
  // Like this: isAuthenticated: Cookies.get('token') ? true : false
  const logOut = () => {
    Cookies.remove("token");
  };
  const hidden = true;
  // const { hidden } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center w-full h-24 bg-blue-700 text-white">
      <div className=" w-full max-w-6xl h-full gap-x-6 flex flex-row justify-center items-center md:gap-x-10 lg:ml-4 lg:mr-4">
        {hidden ? null : <CartDropdown />}
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
        {user?.name ? (
          <div
            className="hidden sm:flex sm:flex-row sm:items-center sm:gap-x-6 "
            id="logIn_signUp"
          >
            <div className="dropdown relative">
              {/* Dropdown button */}
              <button
                className=" flex flex-row dropdown-toggle hover:underline hover:opacity-80 bg-transparent"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Profile
                  width="25"
                  height="25"
                  className=" color-profile mr-1"
                  color="white"
                />
                <p>{user.name}</p>
              </button>
              {/* Menu item */}
              {isOpen && <MenuItem logOut={logOut} />}
            </div>
            {/* Shopping Cart Icon */}
            <div
              onClick={() => dispatch(toggleCartHidden())}
              className="relative w-11 h-11 flex items-center justify-center cursor-pointer"
            >
              <ShoppingCart width="24" height="25" className=" color-profile" />
              <span className="absolute text-xs font-bold bottom-3"></span>
            </div>
          </div>
        ) : (
          <div
            className="hidden sm:flex sm:flex-row sm:items-center sm:gap-x-6 "
            id="logIn_signUp"
          >
            <a href="/log-in" className=" hover:underline ">
              Ingresar
            </a>
            <a href="/sign-up" className="bg-cyan-600 rounded-lg p-2">
              Registrarse
            </a>
          </div>
        )}

        <div className="w-[2.5rem] lg:hidden" id="mobile-nav">
          <div className="border mb-2"></div>
          <div className="border mb-2"></div>
          <div className="border mb-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
