const jwt = require("jsonwebtoken")

exports.checkToken = function (req, res, next) {

  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  
  if (!token) {
    return res.status(401).json({
      message: "Acesso negado"
    })
  }

  try {

    const secret = process.env.SECRET
    jwt.verify(token, secret)
    next()

  } catch(error) {

    console.log(error)

    return res.status(400).json({
      message: "Token Invalido"
    })
  }

}
