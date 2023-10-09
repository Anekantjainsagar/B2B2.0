const express = require("express");
const agent = express.Router();
const Agent = require("../db/model/agentSchema");

agent.post("/addAgent", async (req, res) => {
  const { name, email, phone } = req.body;

  const agent = new Agent({
    name,
    email,
    phone,
  });
  agent
    .save()
    .then(() => {
      res.status(200).json({ agent });
    })
    .catch((err) => {
      console.log(err);
    });
});

agent.get("/getAgents", async (req, res) => {
  let { name } = req.query;

  if (!name) {
    name = "";
  }

  const agents = await Agent.find({ name: { $regex: name, $options: "i" } });

  res.status(200).send({ agents });
});

module.exports = agent;
