const express = require("express")

const app = express()

const teams = []; // Array para armazenar os times cadastrados - substituir pelo mongoDB

app.use(express.json());

// Cadastrar novo time
// Verifica se o time já existe, não permite cadstrar mais do que 8 times
app.post("/teams/new", (req, res) => {
  const { name, shieldImage, city, coach, website, players } = req.body;
  const existingTeam = teams.find(team => team.name === name);
  if (existingTeam) {
    res.status(409).json({ error: "O time já foi cadastrado" });
    return;
  }else {
    if (teams.length < 8) { 
      const newTeam = {
        id: teams.length + 1,
        name,
        shieldImage,
        city,
        coach,
        website,
        players,
      };
      teams.push(newTeam); // Substituir pelo mongoDB
      res.status(201).json(newTeam);
    } else {
      res.status(401).json({ error: "Não é possível cadastrar mais do que 8 times" });
    }
  }
});


// Sortear times
// Verifica se os 8 times estão cadastrados e sorteia duas chaves com 4 partidas
app.get("/teams/sort", (req, res) => {
  if (teams.length < 8) {
    res.status(401).json({ error: "Não é possível sortear jogos com menos de 8 times cadastrados" });
  } else {
    const shuffledTeams = teams.sort(() => Math.random() - 0.5);
    const chaveA = shuffledTeams.slice(0, 4);
    const chaveB = shuffledTeams.slice(4, 8);
    const games = [];
    for (let i = 0; i < 4; i++) {
      const game = {
        PARTIDA: i + 1,
        timeA: chaveA[i],
        timeB: chaveB[i]
      };
      games.push(game);
    }
    res.status(200).json(games);
  }
});


// Lista todos os times cadastrados
app.get("/teams/list", (req, res) => {
  res.status(200).json(teams);
});


// Editar time
app.patch("/teams/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, shieldImage, city, coach, website } = req.body;
  const teamIndex = teams.findIndex((team) => team.id === id);
  if (teamIndex < 0) {
    return res.status(404).json({ error: "Time não encontrado" });
  }
  teams[teamIndex].name = name;
  teams[teamIndex].shieldImage = shieldImage;
  teams[teamIndex].city = city;
  teams[teamIndex].coach = coach;
  teams[teamIndex].website = website;
  res.status(200).json(teams[teamIndex]);
});


// Deletar time
app.delete("/teams/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const teamIndex = teams.findIndex((team) => team.id === id);
  if (teamIndex < 0) {
    return res.status(404).json({ error: "Time não encontrado" });
  }
  teams.splice(teamIndex, 1); // Remove o time do array (no caso prático aqui vai a lógica para remover do banco)
  res.status(204).json(); 
});


app.listen("5000", () => {
  console.log("Servidor rodando na porta 5000")
})
