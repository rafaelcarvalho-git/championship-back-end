const express = require("express")

const routes = express.Router()
const teamModel = require("../models/teamModel")

// Rota de criacao de time
routes.post("/teams", async (req, res) => {

  // retrieving data from the 
  const {name, shieldImage, city, coachName, website} = req.body

  // simple verification for recieved data
  if (!name || !shieldImage || !city || !coachName || !website) {
    return res.status(400).json({
      message: "Dado necessario nao esta presente"
    })
  }

  // check if team exists
  const teamExist = await teamModel.findOne({
    name: name
  })

  if (teamExist) {
    return res.status(400).json({
      message: "Time já existe"
    })
  }

  // checks if there is more than 8 teams
  const teamLength = await teamModel.count()

  if (teamLength == 8) {
    return res.status(400).json({
      message: "Quantidade de times é igual a 8"
    })
  }

  const team = {
    name, 
    shieldImage,
    city, 
    coachName,
    website
  }

  try {

    // creating data
    await teamModel.create(team)

    return res.status(201).json({
      message: "Time criado com sucesso!"
    })

  } catch (error) {

    return res.status(500).json({
      message: "Erro ocorreu durante a criacao do time"
    })

  }

})

// Rota de retorno de todos os times
routes.get("/teams", async (req, res) => {

  try {
    
    const teams = await teamModel.find()
    res.status(200).json({
      teams: teams
    })

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao listar os times existentes"
    })
  }

})


// para terminar
routes.put("/teams/:id", async (req, res) => {

  const id = req.params.id

  // check if team with the id exist
  const teamExist = await teamModel.findOne({
    id: id
  })

  if (!teamExist) {
    return res.status(400).json({
      message: "Não existe nenhum time com o id dado"
    })
  }

  try {
    console.log("entra aqui")
    const team = await teamModel.find({
      id: id
    })
    console.log(team)

    return res.status(200).json({
      message: "Busca feita com sucesso",
      team: team
    })

  } catch (error) {
    return res.status(500).json({
      message: "Erro ocorreu ao pesquisar o time"
    })
  }

})

module.exports = routes