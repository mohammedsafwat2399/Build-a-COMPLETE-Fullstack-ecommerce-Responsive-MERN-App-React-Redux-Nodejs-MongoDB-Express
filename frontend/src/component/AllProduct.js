import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterProduct from "./FilterProduct";
import CardFeature from "./CardFeature";
import ClipLoader from "react-spinners/ClipLoader";
import PulseLoader from "react-spinners/PulseLoader";
 

const AllProduct = ({ heading }) => {
 
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];
  const [filterBy, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);
  const handelFilterProduct = (category) => {
    setFilterBy(category);
    const filter = productData.filter((el) => el.category === category);
    setDataFilter(() => {
      return [...filter];
    });
  };
  const loadingArray = new Array(20).fill(null);

  return (
    <div className="my-5">
      <h2 className=" font-bold text-2xl text-slate-800">{heading}</h2>
      <div className="flex   flex-wrap gap-4 md:flex-row justify-center">
        {/* filter data */}
        {categoryList[0] ? (
          categoryList.map((el, index) => (
            <FilterProduct
              key={index}
              category={el}
              isActive={el.toLowerCase() === filterBy.toLowerCase()}
              onClick={() => handelFilterProduct(el)}
            />
          ))
        ) : (
          <div className=" min-h-[150px] flex justify-center  items-center h-full ">
            <p className="  text-2xl  text-slate-800"><PulseLoader  color="#36d7b7" />  </p>
          </div>
        )}
      </div>
      <div className="flex gap-4 flex-wrap mt-4 justify-center">
        {/* all data */}
        {dataFilter[0]
          ? dataFilter.map((el) => (
              <CardFeature
                id={el._id}
                image={el.image}
                category={el.category}
                name={el.name}
                price={el.price}
                key={el._id}
              />
            ))
          : loadingArray.map((el, index) => (
              <CardFeature key={index} loading={<ClipLoader size="50"  color="#36d7b7" />  }/>
            ))}
      </div>
    </div>
  );
};

export default AllProduct;
