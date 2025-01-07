let express = require("express");
const mongoose = require("mongoose");
const Order = require("../Models/orderModel");

let app = express();
app.use(express.json());

// GET route to fetch all orders
app.get("/getAllOrders", async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ date: -1 });
    console.log(orders);
    res.status(200).send(orders);  // Fixed the variable name from "contacts" to "orders"
  } catch (err) {
    console.log("Error get: " + err);
    res.status(500).send("Error get: " + err);
  }
});

// POST route to create a new order
app.post("/order", async (req, res) => {
  try {
    const { name, shirtNumber, size, price, date } = req.body;

    // Create a new order instance
    const newOrder = new Order({
      name,
      shirtNumber,
      size,
      price,
      date,
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).send({ message: "Order placed successfully!", order: newOrder });
  } catch (err) {
    console.log("Error post: " + err);
    res.status(500).send("Error post: " + err);
  }
});

module.exports = app;
