const express = require("express")

const routes = express.Router()
const teamModel = require("../models/teamModel")


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
      message: "TIime já existe"
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

module.exports = routes