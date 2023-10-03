const express = require("express");
const login = express.Router();
const jwt = require("jsonwebtoken");

const Agent = require("../db/model/agentSchema");
const Login = require("../db/model/loginSchema");

login.post("/", async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();

  let data = await Login.findOne({ email });
  let agent = await Agent.findOne({ email });
  if (data) {
    if (data.password === password) {
      const jwtToken = jwt.sign(
        {
          user: data._id,
        },
        process.env.SECRET_KEY
      );
      res
        .status(200)
        .json({ token: jwtToken, data: data, msg: "Logged in successfully" });
    } else {
      res.status(202).json({ msg: "Password does't match" });
    }
  } else if (agent) {
    if (agent.phone === parseInt(password)) {
      const jwtToken = jwt.sign(
        {
          user: agent._id,
        },
        process.env.SECRET_KEY
      );
      res.status(200).json({
        token: jwtToken,
        data: {
          _id: agent._id,
          name: agent.name,
          email: agent.email,
          password: agent.phone,
          type: "b2b",
          typeof: "Agent",
        },
        msg: "Logged in successfully",
      });
    } else {
      res.status(202).json({ msg: "Password does't match" });
    }
  } else {
    res.status(202).json({ msg: "Email not found" });
  }
});

login.post("/check", async (req, res) => {
  let { token } = req.body;

  if (token) {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const user =
      (await Login.findById(decode?.user)) ||
      (await Agent.findById(decode?.user));

    if (!user) {
      return res.json({
        Success: false,
        message: "Unauthorized user jwt doesn't match",
      });
    } else {
      res.json({ Success: true, message: user });
    }
  } else {
    res.json({ Success: false, message: "User not logged in" });
  }
});

module.exports = login;
