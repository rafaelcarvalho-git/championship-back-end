const dotenv  = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())
app.use(require("./routes/userRoutes"))

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

