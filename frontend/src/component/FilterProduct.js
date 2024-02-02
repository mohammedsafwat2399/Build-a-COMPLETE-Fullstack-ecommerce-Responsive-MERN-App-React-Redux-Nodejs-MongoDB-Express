import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({ category, onClick, isActive }) => {
  return (
    <div className="flex flex-col justify-center items-center" onClick={onClick}>
      <div
        className={` p-5 text-3xl ${
          isActive ? " bg-red-600 text-white" : " bg-yellow-500"
        } rounded-full cursor-pointer h-16 w-16`}
      >
        <CiForkAndKnife />
      </div>
      <p className=" capitalize text-center font-medium my-1">{category}</p>
    </div>
  );
};

export default FilterProduct;
