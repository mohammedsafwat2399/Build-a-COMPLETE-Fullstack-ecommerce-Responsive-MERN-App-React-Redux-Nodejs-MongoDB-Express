import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SingUpImage from "../assest/login-animation.97a8f494ac4826dd1781.gif";
import { BiHide, BiShow } from "react-icons/bi";
import {ImagetoBase64} from "../utility/ImagetoBase64";
import { Helmet } from "react-helmet-async";
import {toast} from 'react-hot-toast';
 const SingUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    fristName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpasswored: "",
    image: "",
  });
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleImageProfile = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    console.log(e.target.files[0])
    setData((prev) => {
      return {
        ...prev,
        image: data
      };
    });
  };
   const handleSubmit = async (e) => {
    e.preventDefault();
    const { fristName, lastName, email, password, confirmpasswored } = data;
    if (fristName && lastName && email && password && confirmpasswored) {
      if (password === confirmpasswored) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/signup`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const dataRes = await fetchData.json() 
         toast(dataRes.message)
         if(dataRes.alert){
           navigate("/login");
         }

      } else {
        alert("password and confirmpassword not equal ");
      }
    } else {
      alert("please Enter required fields");
    }
  };
  return (
    <>
     <Helmet>
        <title>signUp page</title>
        <meta name="description" content="this page is signUp" />
      </Helmet>
      <div className="p-3 md:p-4 ">
      <div className="w-full bg-white m-auto max-w-sm flex flex-col  p-4 ">
        <div className="w-20 h-20 rounded-full drop-shadow-md overflow-hidden shadow-md  m-auto relative ">
          <img
            src={data.image ? data.image : SingUpImage} alt="signup image"
            className="w-full h-full"
          />
          <label htmlFor="profileImage" className=" ">
            <div className=" absolute bottom-0 w-full h-1/3 bg-slate-500 text-center cursor-pointer opacity-50	 ">
              <p className="text-white text-sm p-1">Uload</p>
            </div>
          </label>
          <input
            type="file"
            id="profileImage"
            className=" hidden"
            accept="image/*"
            onChange={handleImageProfile}
          />
        </div>

        <form onSubmit={handleSubmit} className="py-3 w-full flex flex-col">
          <label htmlFor="fristName" className="">
            Frist Name
          </label>
          <input
            name="fristName"
            type="text"
            id="fristName"
            value={data.fristName}
            onChange={handleOnchange}
            className=" bg-slate-200 mt-1  mb-2 w-full py-2 px-1 rounded focus:outline-blue-300"
          />
          <label htmlFor="lastName" className="">
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            id="lastName"
            value={data.lastName}
            onChange={handleOnchange}
            className=" bg-slate-200 mt-1 mb-2  w-full py-2 px-1 rounded  focus:outline-blue-300"
          />
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            value={data.email}
            onChange={handleOnchange}
            className=" bg-slate-200 mt-1 mb-2  w-full py-2 px-1 rounded focus:outline-blue-300"
          />
          <label htmlFor="password" className="">
            Password
          </label>
          <div className="flex  bg-slate-200 mt-1  mb-2  py-2 px-1 rounded  focus-within:outline  focus-within:outline-blue-300 ">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              value={data.password}
              onChange={handleOnchange}
              className="w-full  bg-slate-200 border-none outline-none"
            />

            <span
              className="flex text-xl cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {" "}
              {showPassword ? <BiHide /> : <BiShow />}
            </span>
          </div>
          <label htmlFor="fristName" className="">
            Confirm Password
          </label>
          <div className="flex bg-slate-200 rounded focus-within:outline focus-within:outline-blue-300  mt-1 mb-2  w-full py-2 px-1 ">
            <input
              name="confirmpasswored"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={data.confirmpasswored}
              onChange={handleOnchange}
              className="outline-none border-none bg-slate-200  w-full"
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {" "}
              {showConfirmPassword ? <BiHide /> : <BiShow />}
            </span>
          </div>
          <button className="bg-red-500 hover:bg-red-600 rounded-full py-3 m-auto text-white w-full max-w-[150px] mt-4 text-xl cursor-pointer">
            SingUp
          </button>
        </form>
        <p className=" mt-2 text-sm text-left	">
          Already have account?
          <Link to="/login" className="text-red-500">
            login
          </Link>
        </p>
      </div>
    </div>
    </>
   
  );
};
export default SingUp;
