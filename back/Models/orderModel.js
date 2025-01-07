let mongoose = require ("mongoose");

let orderSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
    },

    shirtNumber:{
        type: Number,
        require: true,
        min: -1, max: 99,
    validate: {
      validator: Number.isInteger,
    },
    },
    size:{
        type: String,
        require: true,
        enum: ['S', 'M', 'L', 'XL', 'null'],
    },
  

    price:{
        type: Number,
        require: true,
        min: 0,
    validate: {
      validator: Number.isInteger,
    },
    },
    date: {
        type: Date,
        required: true,
      }
    
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;