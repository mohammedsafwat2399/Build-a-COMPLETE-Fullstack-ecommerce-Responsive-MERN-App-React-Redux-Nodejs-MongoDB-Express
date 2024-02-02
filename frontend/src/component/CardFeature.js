import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/productSlice";

const CardFeature = ({ name, price, image, category, loading, id }) => {
  const dispatch = useDispatch();
  const handleButtonCart = () => {
    dispatch(
      addCartItem({
        name,
        price,
        image,
        category,

        _id: id,
      })
    );
  };
  return (
    <div className=" bg-white  p-2 rounded min-w-[200px] max-w-[200px] flex flex-col cursor-pointer drop-shadow-lg py-5 px-4 hover:shadow-lg ">
      {name ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() =>
              window.scrollTo({
                top: "0",
                behavior: "smooth",
              })
            }
          >
            <div className="h-28 min-h-[150px] flex  flex-col items-center justify-center">
              <img className="h-full" src={image}  alt="image product"/>
            </div>
            <h3 className=" font-semibold   text-slate-600 capitalize text-lg mt-4  overflow-hidden whitespace-nowrap">
              {name}
            </h3>
            <p className=" font-medium   text-slate-500">{category}</p>
            <p className=" font-bold ">
              <span className=" text-red-500">$</span>
              {price}
            </p>
          </Link>
          <button
            className=" bg-yellow-500 cursor-pointer py-1 mt-2 rounded hover:bg-yellow-600 w-full "
            onClick={handleButtonCart}
          >
            Add Card
          </button>
        </>
      ) : (
        <div className=" min-h-[150px] flex justify-center  items-center h-full ">
          <p className="  text-2xl  text-slate-800">{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
