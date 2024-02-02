import React, { useRef } from "react";
import { useSelector } from "react-redux";
import HomeCardList from "../component/HomeCardList";
import CardFeature from "../component/CardFeature";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";
import { Helmet } from "react-helmet-async";
function Home() {
  const productData = useSelector((state) => state.product.productList);
  const productSlice = productData.slice(0, 4);
  const homeProductCardListVegetables = productData.filter(
    (el) => el.category === "vegetable"
  );
  const loadingArray = new Array(4).fill(null);
  const loadingArraySlider = new Array(20).fill(null);
  const sliderProductRef = useRef(null);
  const nextProduct = () => {
    sliderProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    sliderProductRef.current.scrollLeft -= 200;
  };
  return (
    <>
      <Helmet>
        <title>product home page</title>
        <meta name="description" content="this page is product home" />
      </Helmet>
      <div className="p-2 md:p-4">
        <div className="md:flex gap-4 py-2">
          <div className="md:w-1/2">
            <div className="flex  gap-3  bg-slate-300  w-36 items-center  rounded-full  px-2">
              <p className="text-sm  font-medium text-slate-900 ">
                Bice Delivery
              </p>
              <img
                className="h-7"
                alt="Delivery home"
                src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              />
            </div>
            <h2 className="text-4xl font-bold mt-2 md:text-7xl py-3">
              The Fasted Delivery in{" "}
              <span className="text-red-700 ">Your Home</span>
            </h2>
            <p className=" font-bold mt-2 text-2xl py-3">THIS APPLICATION CONTAINS PRODUCTS</p>
          </div>
          <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
            {productSlice[0]
              ? productSlice.map((el) => (
                  <HomeCardList
                    image={el.image}
                    category={el.category}
                    name={el.name}
                    price={el.price}
                    key={el._id}
                    id={el._id}
                  />
                ))
              : loadingArray.map((el, index) => (
                  <HomeCardList key={index} loading="loading..." />
                ))}
          </div>
        </div>
        <div>
          <div className=" flex  items-center w-full">
            <h2 className=" font-bold text-2xl text-slate-800">
              Fresh Vegetables
            </h2>
            <div className="ml-auto flex gap-4">
              <button
              aria-labelledby="preve"
                onClick={preveProduct}
                className=" bg-slate-300  hover:bg-slate-400 rounded p-1 "
              >
                <GrPrevious />
              </button>
              <button
              aria-labelledby="next"
                onClick={nextProduct}
                className=" bg-slate-300  hover:bg-slate-400 rounded p-1 "
              >
                <GrNext />
              </button>
            </div>
          </div>

          <div
            className=" flex flex-row gap-5 mt-4 overflow-scroll scrollbar-none  scroll-smooth transition-all"
            ref={sliderProductRef}
          >
            {homeProductCardListVegetables[0]
              ? homeProductCardListVegetables.map((el, index) => (
                  <CardFeature
                    id={el._id}
                    image={el.image}
                    category={el.category}
                    name={el.name}
                    price={el.price}
                    key={index}
                  />
                ))
              : loadingArraySlider.map((el, index) => (
                  <CardFeature key={index} loading="loading" />
                ))}
          </div>
        </div>
        <AllProduct heading={"Your Product"} />
      </div>
    </>
  );
}

export default Home;
