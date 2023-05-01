const dotenv  = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("./models/userModel")

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.status(200).send({
    message: "pagina principal"
  })
})

// registrar usuario
app.post("/auth/register", async(req, res) => {

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
    name, email, password
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

// credenciais
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

// conexao com o banco
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.gzb5jda.mongodb.net/?retryWrites=true&w=majority`).then(
  () => {
    app.listen("3000", () => {
      console.log("rodando na porta 3000")
    })
    console.log("conectou ao banco")
  }
).catch(
  (err) => {
    console.log(err)
  }
)

