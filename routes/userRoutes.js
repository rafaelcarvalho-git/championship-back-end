const express =  require("express")
const bcrypt = require("bcrypt")

const router = express.Router()
const User = require("../models/userModel")

router.post("/auth/register", async(req, res) => {

  const {name, email, password} = req.body

  // validations
  if(!name || !email || !password) {
    return res.status(400).json({
      message: "Cadastro deve conter nome, email e senha"
    })
  }

  // checar se usuario existe
  const userExist = await User.findOne({
    email: email
  })

  if (userExist) {
    return res.status(400).json({
      message: "O usuario já existe"
    })
  }

  // criando senha
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  // criando usuario
  const user = new User({
    name, email, password: passwordHash
  })

  try {
    await user.save()
    res.status(201).json({
      message: "Usuario criado com sucesso"
    })
  } catch(error) {
    console.log(error)
    res.status(400).json({
      message: "Erro ocorreu durante a criacao do usuario"
    })
  }

})

module.exports = router