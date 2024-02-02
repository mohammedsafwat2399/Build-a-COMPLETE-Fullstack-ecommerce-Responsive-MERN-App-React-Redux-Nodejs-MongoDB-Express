import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SingUpImage from "../assest/login-animation.97a8f494ac4826dd1781.gif";
import { BiHide, BiShow } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { loginReducer } from "../redux/userSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await axios.post(
        `${process.env.REACT_APP_SERVER_DOMIN}/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast(fetchData.data.data.fristName + " " + fetchData.data.message);
      if (fetchData.data.alert) {
        dispatch(loginReducer(fetchData.data));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setTimeout(() => {
          navigate("/signup");
        }, 1000);
      }
    } else {
      alert("please Enter required fields");
    }
  };
  return (
    <>
    <Helmet>
        <title>login page</title>
        <meta
          name="description"
          content="this page is login "
        />
      </Helmet>
     <div className="p-3 md:p-4 ">
      <div className="w-full bg-white m-auto max-w-sm flex flex-col  p-4 ">
        <div className="w-20 rounded-full drop-shadow-md overflow-hidden shadow-md  m-auto ">
          <img src={SingUpImage} alt="login image" className="w-full " />
        </div>
        <form onSubmit={handleSubmit} className="py-3 w-full flex flex-col">
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
          <button className="bg-red-500 hover:bg-red-600 rounded-full py-3 m-auto text-white w-full max-w-[150px] mt-4 text-xl cursor-pointer">
            Login
          </button>
        </form>
        <p className=" mt-2 text-sm text-left	">
          donot have account?
          <Link to="/signup" className="text-red-500">
            SingUp
          </Link>
        </p>
      </div>
    </div>
    </>
   
  );
};

export default Login;
