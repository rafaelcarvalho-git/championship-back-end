const express =  require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const router = express.Router()
const User = require("../models/userModel")

// Rota de criacao de usuario
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
    res.status(400).json({
      message: "Erro ocorreu durante a criacao do usuario"
    })
  }

})

// rota de login do usuario
router.post("/auth/login", async (req, res) => {

  const {email, password} = req.body

  // validations
  if (!email || !password) {
    res.status(400).json({
      message: "Requisicao deve conter os campos de senha e email"
    })
  }

  // checando se o usuario existe
  const user = await User.findOne({
    email: email
  })

  if(!user) {
    return res.status(400).json({
      message: "Usuario nao cadastrado"
    })
  }

  // verificando se a senha está correta
  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    res.status(400).json({
      message: "Senha nao corresponde"
    })
  }

  try {
    
    const secret = process.env.SECRET

    const token = jwt.sign({
      id: user._id,
      nome: user.name,
      email: user.email,
      password: user.password,
    }, 
    secret
    )

    res.status(200).json({
      message: "Autenticacao realizada com sucesso",
      token: token
    })

  } catch (error) {
    res.status(400).json({
      message: "Erro ocorreu durante autenticacao"
    })
  }

})

module.exports = router