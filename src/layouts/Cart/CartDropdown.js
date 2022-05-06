import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toggleCartHidden, getCart } from "../../redux/reducers/cart";
import { useDispatch, useSelector } from "react-redux";
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
    <div className="absolute w-60 h-80 flex flex-col p-5 border border-solid bg-white top-20 right-10 z-[5] ">
      <div className="h-60 flex flex-col overflow-scroll">
        {cartItems?.map((item, index) => {
          console.log("ITEM DE CARRITO", item);
          return <div> </div>;
        })}
      </div>

      <button
        className="m-auto text-black"
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
