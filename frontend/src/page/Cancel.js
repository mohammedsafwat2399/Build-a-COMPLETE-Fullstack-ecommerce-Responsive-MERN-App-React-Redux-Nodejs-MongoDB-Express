import React from "react";
import { Helmet } from "react-helmet-async";

const Cancel = () => {
  return (
    <>
      <Helmet>
        <title>cancel payment</title>
        <meta name="description" content="this page is cancel payment " />
      </Helmet>
      <div className=" bg-red-200 m-auto max-w-md flex items-center justify-center font-bold h-32">
        <p> Payment is Cancel</p>
      </div>
    </>
  );
};

export default Cancel;
