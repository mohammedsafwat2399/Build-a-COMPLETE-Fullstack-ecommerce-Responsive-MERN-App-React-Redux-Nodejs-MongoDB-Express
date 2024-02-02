import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { logOutReducer } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const data = useSelector((state) => state.user);
  const handleLogOut = () => {
    dispatch(logOutReducer());
    toast("logOut successfully");
  };
  const cartItemNumber = useSelector((state) => state.product.cartItem);
  return (
    <header className=" shadow-md w-full h-16 px-4 md:px-4 fixed z-50  bg-white ">
      <div className="flex justify-between items-center h-full">
        <div className="h-10 flex justify-center flex-col items-center  text-slate-600">
          <Link to="/">
          <div>Shopping Card</div>
            <div className="text-2xl ">
              <FaShoppingCart />
            </div>
          </Link>
        </div>
        <div className="flex gap-4 md:gap-7 ">
          <nav className="  items-center gap-4 md:gap-6 text-base md:text-lg md:flex hidden ">
            <Link to="/">Home</Link>
          </nav>
          <div className="text-2xl  text-slate-600 relative">
            <Link to="cart" >
              <FaShoppingCart />
              <div className="absolute bg-red-500 -top-3 -right-2 w-5 h-5 m-0 p-0 text-sm  rounded-full  text-center text-white">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div
            className="  text-slate-600 cursor-pointer "
            onClick={() => setShowMenu(!showMenu)}
          >
            <div className="text-3xl  shadow">
              {data.image ? (
                <div className="w-10 h-10 rounded-full  overflow-hidden ">
                  <img src={data.image} alt=""/>{" "}
                </div>
              ) : (
                <HiOutlineUserCircle />
              )}
              <img src={data.img} className="w-full h-full" alt=""/>
            </div>
            {showMenu && (
              <div className=" absolute right-2 py-2 px-2 shadow drop-shadow-md bg-white  flex flex-col text-center">
                {data.email === process.env.REACT_APP_EMAIL_ADMIN && (
                  <Link to="newprodect">
                    <p className=" whitespace-nowrap cursor-pointer">
                      new prodect
                    </p>
                  </Link>
                )}
                {data.image || data.email ? (
                  <p
                    className="whitespace-nowrap cursor-pointe p-1  py-2 bg-red-500 text-white text-center "
                    onClick={handleLogOut}
                  >
                    logOut ({data.fristName})
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className=" whitespace-nowrap cursor-pointer py-2"
                  >
                    login
                  </Link>
                )}
                <nav className=" flex items-center flex-col  md:gap-6 text-base md:text-lg md:hidden  ">
                  <Link className="py-2" to="/">
                    Home
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
