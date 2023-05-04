const express = require("express")
const playerModel = require("../models/playerModel")
const { checkToken } = require("../middleware/checkToken")

const routes = express.Router()

// Rota para adicionar jogador em um time
routes.post("/player/new", checkToken, async (req, res) => {

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


// Rota para listar jogadores
routes.get("/players", checkToken, async (req, res) => {

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


// Editar jogador pelo ID
routes.patch("/player/edit/:id", checkToken, async (req, res) => {
  try {
    const playerId = req.params.id
    const player = await playerModel.findOne({ _id: playerId })

    if (!player) {
      return res.status(404).json({ message: "Jogador não encontrado" })
    }

    const { name, picture, height, weight, age, position, number, idTeam } = req.body

    player.name = name || player.name
    player.picture = picture || player.picture
    player.height = height || player.height
    player.weight = weight || player.weight
    player.age = age || player.age
    player.position = position || player.position
    player.number = number || player.number
    player.idTeam = idTeam || player.idTeam

    await player.save()

    return res.status(200).json({
      message: "Jogador atualizado com sucesso",
      player: player,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar jogador",
    })
  }
})


//Deletar jogador pelo ID
routes.delete("/player/delete/:id", checkToken, async (req, res) => {
  try {
    const playerId = req.params.id
    const player = await playerModel.findOne({ _id: playerId })

    if (!player) {
      return res.status(404).json({ message: "Jogador não encontrado" })
    }

    await playerModel.deleteOne({ _id: playerId })

    return res.status(200).json({
      message: "Jogador removido com sucesso",
      player: player,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao remover jogador",
    })
  }
})

module.exports = routes