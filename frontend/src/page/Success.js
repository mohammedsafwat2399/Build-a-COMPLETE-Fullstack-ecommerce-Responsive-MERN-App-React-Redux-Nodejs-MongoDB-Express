import React from 'react'
import { Helmet } from "react-helmet-async";


const Success = () => {
  return (
    <>
     <Helmet>
        <title>success payment</title>
        <meta name="description" content="this page is success payment" />
      </Helmet>
    <div className=' bg-green-200 m-auto max-w-md flex items-center justify-center font-bold h-32'>
      <p> Payment is Successfuiiy</p>
    </div>
    </>
  )
}

export default Success
