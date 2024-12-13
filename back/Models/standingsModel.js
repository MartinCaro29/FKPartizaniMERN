let mongoose = require("mongoose");

const standingsSchema = new mongoose.Schema({
    teamName: {
      type: String,
      required: true, 
    },
    color1: {
        type: String,
      required: true, 
    },
    color2: {
        type: String,
      required: true, 
    },
    points: {
      type: Number,
      required: true, 
      min: [0, 'Points cannot be negative'], 
      validate: {
        validator: function(value) {
          
          return Number.isInteger(value);
        },
        message: 'Points must be an integer value'
      }
    }
  });



const Standings = mongoose.model("standings", standingsSchema);

module.exports = Standings;