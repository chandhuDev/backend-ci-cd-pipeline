const express = require("express");
const app = express()
require('dotenv').config()
require("./DB-Connect/Connect").Connect()
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);
const User_Model=require("./Models/Schema")
const cors = require('cors');


app.use(express.json());
app.use(cors());

const calculateOrderAmount = (amount) => {
  return amount*150;
};

app.get("/publishKey",async (req,res)=>{
  res.send({
    publishable_key:process.env.STRIPE_API_PUBLISHABLE_KEY
  })
})

app.post("/create-payment-intent", async (req, res) => {
  const { numberOfSeats } = req.body.seats;
  console.log(numberOfSeats)
  try{
  const cost=  calculateOrderAmount(numberOfSeats)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: cost,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  await User_Model.create({
    client_secret:paymentIntent.client_secret,
    amount:cost
  })
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
  }
  catch(error){
    res.send({
        error:{
           message:error.message
        }
    })
  }

});

app.listen(5173, () => console.log("Node server listening on port 5173!"));