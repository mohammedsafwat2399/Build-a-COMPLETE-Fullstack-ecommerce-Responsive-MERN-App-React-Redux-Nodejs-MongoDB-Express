import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
const NewProdect = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);

    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, category, image } = data;
    if (name && price && category && image) {
      const fatchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const resData = await fatchData.json();
      toast(resData.message);
      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
    } else {
      toast("Enter Require Filed");
    }
  };

  return (
    <>
      <Helmet>
        <title>new product</title>
        <meta name="description" content="this page is new product" />
      </Helmet>
      <div className="p-4 ">
      <form
        className=" flex flex-col m-auto max-w-md bg-white p-4  shadow w-full "
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className=" bg-slate-200 p-1 my-1 "
          onChange={handleChange}
          name="name"
          value={data.name}
        />
        <label htmlFor="category">Category</label>
        <select
          className=" bg-slate-200 p-2 my-1"
          id="category"
          value={data.category}
          onChange={handleChange}
          name="category"
        >
          <option value={"other"}>Select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"icream"}>Icream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"piza"}>Pizza</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>burger</option>
          <option value={"dosa"}>dosa</option>
          <option value={"sandwich"}>sandwich</option>
        </select>
        <label htmlFor="image">
          Image
          <div className="h-40 w-full  bg-slate-200 p-1 flex justify-center items-center  my-1  ">
            {data.image ? (
              <img src={data.image} alt="create image" className="h-full" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}
            <input
              className="hidden"
              type="file"
              accept="image/*"
              id="image"
              onChange={uploadImage}
            />
          </div>{" "}
        </label>
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          className=" bg-slate-200 p-1 my-1 "
          name="price"
          value={data.price}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          rows={3}
          id="description"
          className=" bg-slate-200 p-1  my-1"
          value={data.description}
          onChange={handleChange}
          name="description"
        />
        <button  className=" bg-red-500 hover:bg-red-600 p-1 my-2  text-lg font-medium resize-none  drop-shadow text-white">
          Save
        </button>
      </form>
    </div>
    </>
  
  );
};

export default NewProdect;
