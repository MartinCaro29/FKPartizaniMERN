let express = require("express");
const mongoose = require("mongoose");
const Contact = require("../Models/contactModel");

let app = express();
app.use(express.json());



app.post("/addContact", async (req, res) => {
  try {
    let newContact = new Contact(req.body);
    await newContact.save();
    res.status(200).send(newContact);
  } catch (err) {
    res.status(500).send("Error add:" + err);
    console.log("Error add:" + err);
  }
});

app.get("/getAllContacts", async (req, res) => {
  try {
  
  const contacts = await Contact.find({}).sort({ date: -1 });
 
  console.log(contacts)
  res.status(200).send(contacts);
  } catch (err) {
  
  console.log("Error get: " + err)
  res.status(500).send("Error get: " + err);
  }
});

module.exports = app;