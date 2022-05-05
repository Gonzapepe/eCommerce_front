import React from "react";
import { useNavigate } from "react-router-dom";
import { toggleCartHidden } from "../../redux/reducers/cart";
import { useDispatch } from "react-redux";

const CartDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="absolute w-60 h-80 flex flex-col p-5 border border-solid bg-white top-20 right-10 z-[5] ">
      <div className="h-60 flex flex-col overflow-scroll"></div>

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
