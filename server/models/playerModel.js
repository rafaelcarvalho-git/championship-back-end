const mongoose = require("mongoose")

const Player = mongoose.model("Player", {
  name: String,
  picture: String,
  height: Number,
  weight: Number,
  age: Number,
  position: String,
  number: Number,
  idTeam: Number
})

module.exports = Player