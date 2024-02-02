import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import {
  increaseQty,
  decreaseQty,
  deletedCartItem,
} from "../redux/productSlice";
import { useDispatch } from "react-redux";
const CartProduct = ({ name, price, id, category, quty, total, image }) => {
  const dispatch = useDispatch();
  return (
    <div className=" bg-slate-200 p-2 flex gap-4 rounded border border-slate-300">
      <div className=" p-3 bg-white rounded overflow-hidden ">
        <img alt="image product" src={image} className="h-28 w-40 object-cover" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className=" flex justify-between items-center ">
          <h3 className=" font-semibold   text-slate-600 capitalize text-lg">
            {name}
          </h3>
          <div
            className=" cursor-pointer text-slate-700 hover:text-red-500"
            onClick={() => dispatch(deletedCartItem(id))}
          >
            <AiFillDelete />
          </div>
        </div>
        <p className=" font-medium    text-slate-500">{category}</p>
        <p className=" font-bold  text-base ">
          <span className=" text-red-500">$</span>
          {price}
        </p>
        <div className=" flex justify-between">
          <div className="flex gap-3 items-center">
            <button
              className=" bg-slate-300 cursor-pointer py-1 mt-2 rounded hover:bg-slate-400  p-1 "
              onClick={() => dispatch(increaseQty(id))}
            >
              <TbPlus />
            </button>
            <p className=" font-semibold p-1">{quty}</p>
            <button
              className=" bg-slate-300 cursor-pointer py-1 mt-2 rounded hover:bg-slate-400 p-1 "
              onClick={() => dispatch(decreaseQty(id))}
            >
              <TbMinus />
            </button>
          </div>
          <div className=" flex gap-2 items-center font-bold text-slate-700">
            <p>Total :</p>
            <p className="">
              {" "}
              <span className=" text-red-500 ">$</span>
              {total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
