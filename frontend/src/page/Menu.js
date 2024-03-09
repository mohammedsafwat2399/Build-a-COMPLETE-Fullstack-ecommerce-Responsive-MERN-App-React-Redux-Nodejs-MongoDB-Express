import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AllProduct from "../component/AllProduct";
import { addCartItem } from "../redux/productSlice";
import { Helmet } from "react-helmet-async";


const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const productData = useSelector((state) => state.product.productList);
  const filterDetailsProduct = productData.filter(
    (el) => el._id === params.filterby
  )[0];
  const handleButtonCart = () => {
    dispatch(addCartItem(filterDetailsProduct));
  };
  const handleBuy = () => {
    dispatch(addCartItem(filterDetailsProduct));
    navigate("/cart");
  };
  return (
    <>
     <Helmet>
        <title>menu product</title>
        <meta name="description" content="this page is menu product page" />
      </Helmet>
      <div className=" p-2 md:p-4  ">
      <div className="w-ful m-auto max-w-4xl bg-white md:flex gap-7">
        <div className=" max-w-lg p-5 shadow overflow-hidden w-full">
          <img
            src={filterDetailsProduct.image}
            alt="product image"
            className="h-full hover:scale-105 translate-full"
          />
        </div>
        <div className="w-1/2 flex flex-col gap-1">
          <h3 className=" font-semibold   text-slate-600 capitalize text-lg">
            {filterDetailsProduct.name}
          </h3>
          <p className=" font-medium  text-2xl  text-slate-500">
            {filterDetailsProduct.category}
          </p>
          <p className=" font-bold  md:text-2xl ">
            <span className=" text-red-500">$</span>
            {filterDetailsProduct.price}
          </p>
          <div className="flex gap-3">
            <button
              className=" bg-yellow-500 cursor-pointer py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px] "
              onClick={handleBuy}
            >
              Buy
            </button>
            <button
              className=" bg-yellow-500 cursor-pointer py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px] "
              onClick={handleButtonCart}
            >
              Add Card
            </button>
          </div>
          <div className="">
            <p className=" text-slate-600 font-medium">description:</p>
            <p>{filterDetailsProduct.description}</p>
          </div>
        </div>
      </div>
      <AllProduct heading={"Related Product"} />
    </div>
    </>
   
  );
};

export default Menu;
