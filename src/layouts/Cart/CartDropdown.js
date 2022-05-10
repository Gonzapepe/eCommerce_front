import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toggleCartHidden, getCart } from "../../redux/reducers/cart";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../Cart-item/Cart-item";
import Cookies from "js-cookie";

const CartDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(async () => {
    dispatch(getCart(token));
  }, [dispatch, token]);

  return (
    <div className="fixed top-0 bottom-0 right-0 p-2 w-96 h-screen text-center bg-white z-[999] ">
      <div className="h-10 justify-between flex flex-row border-b border-black border-solid">
        {/* Carrito de compras header */}
        <div
          onClick={() => {
            dispatch(toggleCartHidden());
          }}
          className="ml-2 text-lg font-semibold text-black cursor-pointer hover:opacity-60"
        >
          <p>X</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-black  mr-3">
            Carrito de compras
          </p>
        </div>
      </div>

      <div className="h-5/6 flex flex-col overflow-y-auto">
        {cartItems?.map((item, index) => {
          return <CartItem token={token} key={index} item={item} />;
        })}
      </div>

      <button
        className="h-1/6 m-auto text-black"
        onClick={() => {
          dispatch(toggleCartHidden());
          navigate("/checkout");
        }}
      >
        PAGAR
      </button>
    </div>
  );
};

export default CartDropdown;
