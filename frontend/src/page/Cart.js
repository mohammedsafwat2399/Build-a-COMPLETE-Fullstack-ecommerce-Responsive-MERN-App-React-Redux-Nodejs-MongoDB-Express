import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import CartProduct from "../component/CartProduct";
import cartImage from "../assest/empty.gif";

const Cart = () => {
  const navigate = useNavigate();
  const stateData = useSelector((state) => state.product.cartItem);
  const { email } = useSelector((state) => state.user);
  const totalPrice = stateData.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = stateData.reduce(
    (acc, curr) => acc + parseInt(curr.quty),
    0
  );
  const handlePayment = async () => {
    if (email) {
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      const dataRes = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/checkout-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(stateData),
        }
      );
      const session = await dataRes.json();
      const result = stripe.redirectToCheckout({ sessionId: session.id });
      toast("Redirect to payment Gateway...!")
      if (result.error) {
        console.log(result.error);
      }
    } else {
      toast("You have not Login!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };
  return (
    <>
      <Helmet>
        <title>cart product</title>
        <meta name="description" content="this page is payment cart" />
      </Helmet>
      <div className="p-2 md:p-4 ">
        <h2 className=" text-lg md:text-2xl text-slate-600 font-bold">
          Your Cart Items
        </h2>
        <>
          {stateData[0] ? (
            <div className="my-4 flex  sm:flex-col md:flex-col  lg:flex-row xl:flex-row   gap-3">
              <div className=" w-full  xl:max-w-3xl  lg:max-w-3xl">
                {stateData.map((el, index) => (
                  <CartProduct
                    name={el.name}
                    key={index}
                    category={el.category}
                    description={el.category}
                    image={el.image}
                    price={el.price}
                    id={el._id}
                    quty={el.quty}
                    total={el.total}
                  />
                ))}
              </div>
              <div className="w-full  lg:max-w-3xl xl:max-w-3xl   lg:ml-auto xl:ml-auto md:ml-auto">
                <h2 className=" bg-blue-500 text-white p-2  text-lg">
                  Summary
                </h2>
                <div className="flex w-full py-2 text-lg border-b">
                  <p>Total Qty</p>
                  <p className=" ml-auto w-32 font-bold">{totalQty}</p>
                </div>
                <div className="flex w-full py-2 text-lg border-b">
                  <p>Total Price</p>
                  <p className="ml-auto w-32 font-bold">
                    <span className=" text-red-500">$</span>
                    {totalPrice}
                  </p>
                </div>
                <button
                  className="bg-red-500 w-full text-lg py-2 font-bold text-white"
                  onClick={handlePayment}
                >
                  Payment
                </button>
              </div>
            </div>
          ) : (
            <div className=" flex justify-center items-center flex-col">
              <img src={cartImage} alt="empty card" className="w-full max-w-sm" />
              <p className=" text-slate-500 text-3xl font-bold ">Empty Cart</p>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default Cart;
