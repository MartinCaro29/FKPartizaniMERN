let express = require("express");
const mongoose = require("mongoose");
const Order = require("../Models/orderModel");

let app = express();
app.use(express.json());


app.get("/getAllOrders", async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ date: -1 });
    console.log(orders);
    res.status(200).send(orders);
  } catch (err) {
    console.log("Error get: " + err);
    res.status(500).send("Error get: " + err);
  }
});


app.post("/order", async (req, res) => {
  try {
    const { name, shirtNumber, size, price, date } = req.body;


    const newOrder = new Order({
      name,
      shirtNumber,
      size,
      price,
      date,
    });


    await newOrder.save();

    res.status(201).send({ message: "Order placed successfully!", order: newOrder });
  } catch (err) {
    console.log("Error post: " + err);
    res.status(500).send("Error post: " + err);
  }
});

module.exports = app;
