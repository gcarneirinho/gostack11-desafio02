const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.send(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }
  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const { title, url, techs } = request.body;

  const repository = repositories.find(repo => repo.id === id);
  
  if(repository === undefined) {
    return response.status(400).json({error: `Repository doesn't exists`})
  }

  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const idRepo = repositories.findIndex(repo => repo.id === id);

  if(idRepo >= 0){
    repositories.splice(idRepo, 1);
  } else {
    return response.status(400).json({error: `Repository doesn't exists`})
  }

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repo => repo.id === id);
  
  if(repository === undefined) {
    return response.status(400).json({error: `Repository doesn't exists`})
  }

  repository.likes ++;

  return response.json(repository);
});

module.exports = app;
