/*
  Rota criada para teste de middleware
  Pode ser deletada na insercao das outras rotas
*/
const express = require("express")
const User = require("../models/userModel")
const middleware = require("../middleware/checkToken")

const router = express.Router()

router.get("/user/:id", middleware.checkToken, async(req, res) => {

  const id = req.params.id

  const user = await User.findById(id, "-password -__v")

  if (!user) {
    return res.status(400).json({
      message: "Usuario nao encontrado"
    })
  }

  res.status(200).json({
    sucess: true,
    user: user
  })
})

module.exports = router
