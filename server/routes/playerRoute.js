const express = require("express")
const playerModel = require("../models/playerModel")

const routes = express.Router()

routes.post("/player", async (req, res) => {

  // retrieving data from the body and checking if they exist
  const {name, picture, height, weight, age, position, number, idTeam} = req.body

  if (!name || !picture || !height || !weight || !age || !position || !number || !idTeam) {
    return res.status(400).json({
      message: "Dado necessario esta faltando"
    })
  }

  // checking if there is more than 22 players in the team
  try {

    const players = await playerModel.find({
      idTeam: idTeam
    })
  
    if (players.length == 22) {
      return res.status(400).json({
        message: "Quantidade de jogadores excedida"
      })
    }

  } catch (error) {
    
    return res.status(500).json({
      message: "Erro ao buscar jogadores"
    })

  }

  try {

    // inserting on the database
    const player = {
      name, picture, height, weight, age, position, number, idTeam
    }

    await playerModel.create(player)

    return res.status(201).json({
      message: "Jogador criado com sucesso"
    })

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao inserir jogador"
    })
  }

})

routes.get("/players", async (req, res) => {

  try {
    
    const players = await playerModel.find()

    return res.status(200).json({
      players: players
    })

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao listar os jogadores"
    })
  }

})

module.exports = routes