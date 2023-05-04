const crypto = require("crypto")

exports.generate = function () {
  return crypto.randomBytes(20).toString("hex")
}
