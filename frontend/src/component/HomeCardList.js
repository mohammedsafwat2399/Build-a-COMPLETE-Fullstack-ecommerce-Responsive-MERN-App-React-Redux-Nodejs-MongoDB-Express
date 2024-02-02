import React from "react";
import { Link } from "react-router-dom";

const HomeCardList = ({ name, image, price, category, loading, id }) => {
  return (
    <div className=" bg-white shadow-md p-2 rounded  min-w-[150px]">
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
            {" "}
            <div className="w-40 min-h-[150px]">
              <img className=" w-full h-full" alt="image product card" src={image}  />
            </div>
            <h3 className=" font-semibold text-center  text-slate-600 capitalize text-lg">
              {name}
            </h3>
            <p className=" font-medium text-center  text-slate-500">
              {category}
            </p>
            <p className=" font-bold text-center">
              <span className=" text-red-500">$</span>
              {price}
            </p>
          </Link>
        </>
      ) : (
        <div className=" flex justify-center  items-center h-full ">
          <p className="  text-2xl  text-slate-800">{loading}</p>
        </div>
      )}
    </div>
  );
};

export default HomeCardList;
