const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const stripe = require("stripe")("sk_test_51Mlo1WGOZ8YZWiavl1vydq496E3qkv3rO8KfiqCxcUi9u4vpJifLJtcRfWSC4ihCUUDaYKObIsLJMXwD9o3msyqM00Sgd0VYxr");
 const { reset } = require("nodemon");
 const dotenv = require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

//mongodb
console.log(process.env.MONGODB_URL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("conact to database"))
  .catch((error) => console.log(error));

//  schema
const userSchema = mongoose.Schema({
  fristName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmpasswored: String,
  image: String,
});
//model
const userModel = mongoose.model("user", userSchema);
//api
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.send("hello s world");
});

//api signup
app.post("/signup", async (req, res) => {
   const { email } = req.body;
  userModel.findOne({ email: email }, (err, result) => {
     if (result) {
      res.send({ message: "Email id already register", alert: false });
    } else {
      const data = userModel(req.body);
      const save = data.save();
      res.send({ message: "successfully sign up", alert: true });
    }
  });
});
// api login
app.post("/login", (req, res) => {
   const { email} = req.body;

  userModel.findOne({ email: email }, (err, result) => {
    
    if (result) {
      const dataSend = {
        _id: result._id,
        fristName: result.fristName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
       res.send({
        message: "login is successfully",
        alert: true,
        data: dataSend,
      });
    } else {
       res.send({
        message: "Email is not availble , please sign up",
        alert: false,
      });
    }
  });
});
// product 
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
})
const productModel = mongoose.model("product", schemaProduct)
// prodcut
app.post("/uploadProduct",async (req, res)=>{
   const data = await productModel(req.body)
  const savaDta = await data.save()
   res.send({
          message: "upload successfully"})
   
})
// get product
app.get("/product", async(req, res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))

})
// payment //
   
app.post("/checkout-payment",async(req,res)=>{
  const products = req.body
   const lineItem = products.map((prodect)=>({
    price_data : {
      currency:"AED",
      product_data:{
        name: prodect.name,
       },
      unit_amount: prodect.price * 100,
     
    },
    adjustable_quantity:{
                  enabled:true,
                  minimum:1,
                },
    quantity : prodect.quty
  }));
   console.log(lineItem)
   const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineItem,
    mode:"payment",
    success_url :`${process.env.FRONTEND_URL}/success`,
    cancel_url :`${process.env.FRONTEND_URL}/cancel`


  })
  res.json({id:session.id})
//  try {
//   const params = {
//     submit_type:"pay",
//     mode:"payment",
//     payment_method_types:["card"],
//     billing_address_collection:"auto",
//     shipping_options:[{shipping_rate:"shr_1Oa1TqGOZ8YZWiavLWQM7Z3Z"}],
//     line_items: req.body.map((item)=>{
//       return {
//         price_data :{
//           currency:"AED",
//           product_data:{
//             name: item.name,
//             // images:[item.image]
//           },
//           unit_amount:item.price * 100,
//           adjustable_quantity:{
//             enabled:true,
//             minimum:1,
//           },
//           quantity : item.qty
//         }

//       }
//     }),
//     success_url :`${process.env.FRONTEND_URL}/success`,
//     cancel_url :`${process.env.FRONTEND_URL}/cancel`

//   }
//   const session = await stripe.Checkout.sessions.create(params)
// res.status(200).json(session.id)
// console.log(session)
//  } catch (error) {
//   res.status(error.statuscode || 500).json(`${error.message} my error`)
 
//  }

})
app.listen(PORT, () => console.log("server is running at port;" + PORT));
