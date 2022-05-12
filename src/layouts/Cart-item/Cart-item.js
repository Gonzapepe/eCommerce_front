import React from "react";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/reducers/cart/cart.actions";

// imagen y precio y lo demas esta dentro de product exceptuando la cantidad
const CartItem = ({ item, token }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-100 flex h-32 m-4">
      <img
        className="w-1/3"
        alt="item"
        src={
          item.product.images.length > 0
            ? `http://localhost:4000/${item.product.images[0].path}`
            : `http://localhost:4000/uploads/default.png`
        }
      />
      <div className="w-2/3 flex flex-col  items-start justify-center px-2.5 py-5">
        <p className="text-black text-xs max-w-[150px] truncate">
          {item.product.title}
        </p>
        <div className="flex justify-between text-black px-2 mt-2 text-xs max-w-[150px] rounded border border-solid border-gray-800">
          <div className="font-bold text-lg">-</div>
          <span className="mx-5 my-auto">{item.quantity}</span>
          <div className="font-bold text-lg">+</div>
        </div>
      </div>
      <div className=" w-32 flex flex-col mt-2 justify-between items-end">
        <Trash
          className="cursor-pointer"
          width="24"
          height="24"
          onClick={() => {
            dispatch(removeFromCart(item.id));
          }}
        />
        <span className="font-bold mb-5 text-sm text-black ">
          {" "}
          $ {item.product.price * item.quantity}{" "}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
