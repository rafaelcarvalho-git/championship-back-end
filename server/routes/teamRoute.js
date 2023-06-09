const express = require("express")

const routes = express.Router()
const teamModel = require("../models/teamModel")
const playerModel = require("../models/playerModel")
const { checkToken } = require("../middleware/checkToken")

// Rota para criar um novo time
routes.post("/teams/new", checkToken, async (req, res) => {
  // retrieving data from the body
  const { name, shieldImage, city, coachName, website } = req.body

  // simple verification for recieved data
  if (!name || !shieldImage || !city || !coachName || !website) {
    return res.status(400).json({
      message: "Dado necessario nao esta presente",
    })
  }

  const teamExist = await teamModel.findOne({
    name: name,
  })

  if (teamExist) {
    return res.status(400).json({
      message: "TIime já existe",
    })
  }

  const teamCount = await teamModel.countDocuments()
  if (teamCount >= 8) {
    return res.status(400).json({
      message: "Nao é possivel cadastrar mais times",
    })
  }

  const team = {
    name,
    shieldImage,
    city,
    coachName,
    website,
  }

  try {
    await teamModel.create(team)

    return res.status(201).json({
      message: "Time criado com sucesso!",
    })
  } catch (error) {
    return res.status(500).json({
      message: "Erro ocorreu durante a criacao do time",
    })
  }
})

// Rota para listar um time caso passe o ID, caso contrario lista todos os times
routes.get("/teams/list/:id?", checkToken, async (req, res) => {
  try {
    if (req.params.id) {
      const team = await teamModel.findById(req.params.id)
      if (!team) {
        return res.status(404).json({
          message: "Time não encontrado",
        })
      }
      return res.status(200).json({
        team: team,
      })
    } else {
      const teams = await teamModel.find()
      return res.status(200).json({
        teams: teams,
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao listar os times existentes",
    })
  }
})

// Rota para deletar os times
routes.delete("/teams/delete/:id", checkToken, async (req, res) => {
  const id = req.params.id
  try {
    // deleta todos os jogadores do time com o idTeam igual ao id do time
    await playerModel.deleteMany({ idTeam: id })

    const result = await teamModel.deleteOne({ _id: id })
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Time não encontrado",
      })
    }

    return res.status(200).json({
      message: "Time removido com sucesso",
    })
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao remover o time",
      error: error,
    })
  }
})

// Rota para sortear os times
routes.get("/teams/sort", checkToken, async (req, res) => {
  try {
    const teams = await teamModel.find({})
    if (teams.length !== 8) {
      return res.status(400).json({
        message:
          "Não é possível sortear os times, é necessário ter 8 times cadastrados.",
      })
    }
    const shuffledTeams = teams.sort(() => Math.random() - 0.5)
    const chaveA = shuffledTeams.slice(0, 4)
    const chaveB = shuffledTeams.slice(4, 8)
    const games = []
    for (let i = 0; i < 4; i++) {
      const game = {
        PARTIDA: i + 1,
        timeA: chaveA[i],
        timeB: chaveB[i],
      }
      games.push(game)
    }
    res.status(200).json(games)
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao sortear os times.",
    })
  }
})

// Rota para editar os times
routes.patch("/teams/edit/:id", checkToken, async (req, res) => {
  try {
    const { name, shieldImage, city, coachName, website } = req.body
    const { id } = req.params
    const team = await teamModel.findByIdAndUpdate(
      id,
      { name, shieldImage, city, coachName, website },
      { new: true }
    )

    if (!team) {
      return res.status(404).json({
        message: "Time não encontrado",
      })
    }

    return res.status(200).json({
      message: "Time atualizado com sucesso",
      team: team,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Erro ao atualizar o time",
    })
  }
})


routes.get("/teams/one/:id", async (req, res) => {

  const id = req.params.id
  let team = ""

  // searching for the team
  try {

    team = await teamModel.findOne({
      _id: id
    })

  } catch(error) {
    if (!team) {
      return res.status(400).json({
        message: "Time nao encontrado"
      })
    
    }
  }
  
  try {

    const players = await playerModel.find({
      idTeam: id
    })
    
    return res.status(200).json({
      id: team._id,
      name: team.name,
      shieldImage: team.shieldImage,
      city: team.city,
      coachName: team.coachName,
      website: team.website,
      players: players
    })

  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar os jogadores"
    })
  }

})

module.exports = routes
