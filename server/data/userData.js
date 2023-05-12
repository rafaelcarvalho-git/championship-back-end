const User = require("../models/userModel")

exports.findOne = async function (email) {
  return await User.findOne({
    email: email
  })
}
