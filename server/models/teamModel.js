const mongoose =  require("mongoose")

const Team = mongoose.model("Team", {
  name: String,
  shieldImage: String,
  city: String,
  coachName: String,
  website: String
})

module.exports = Team
