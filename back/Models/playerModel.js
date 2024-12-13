let mongoose = require("mongoose");

let playerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  shirtNumber: {
    type: Number,
    require:true
  },
  position: {
    type: String,
    require: true,
    enum: ['Sulmues', 'Mesfushor', 'Mbrojtes', 'Portier'],
  },
  image: { 
    type: String, 
    required: true 
  },
  foot: {
    type: String,
    require: true,
    enum: ['E majta', 'E djathta', 'Te dyja']
  },
});

const Player = mongoose.model("player", playerSchema);

module.exports = Player;