const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
let path = require('path')
require('dotenv').config();

const connectionString = process.env.MONGODB_URI;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.log('Error connecting to MongoDB:', err);
});

app.use(cors(
    {
    credentials: true,
    origin: "http://localhost:3000",
    exposedHeaders: ["set-cookie"],
    }))
    app.use(session({
    secret: "This will be secret",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
    }))
    app.use(express.json({ limit: "1000mb", extended: true }));

   

    let matchRouter = require("./routes/matchRouter");
    let standingsRouter = require("./routes/standingsRouter");
    let contactRouter = require("./routes/contactRouter");
    let playerRouter = require("./routes/playerRouter");
    let productRouter = require("./routes/productRouter");
    let orderRouter = require("./routes/orderRouter");
app.use('/Images', express.static(path.join(__dirname, 'Images')));
app.use(matchRouter);
app.use(standingsRouter);
app.use(contactRouter);
app.use(playerRouter);
app.use(productRouter);
app.use(orderRouter);
app.listen(5000, () => {
console.log('Server Created!')
})
