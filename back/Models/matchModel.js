let mongoose = require("mongoose");

let matchSchema = new mongoose.Schema({
    competition: {
        type: String,
        required: true,  
      },
  hometeam: {
    type: String,
    required: true, 
  },
  awayteam: {
    type: String,
    required: true,  
  },
  homegoals: {
    type: Number,
    required: true, 
    min: 0,
    validate: {
      validator: Number.isInteger, 
      message: 'Home goals must be an integer',
    },
  },
  awaygoals: { 
    type: Number,
    required: true, 
    min: 0,
    validate: {
      validator: Number.isInteger, 
      message: 'Away goals must be an integer',
    },
  },
  date: {
    type: Date,
    required: true,
  }
});

const Match = mongoose.model("Match", matchSchema);  

module.exports = Match;