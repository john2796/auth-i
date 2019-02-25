require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = require("./data/dbConfig");
const User = require("./data/user-model");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger("dev"));

// @route    GET api/register
// @desc     register //username, password
// @Access   Public
server.post("/api/register", async (req, res) => {
  let user = req.body;
  if (!user.username || !user.password) {
    return res.status(400).json({ message: "all fields are required" });
  }
  try {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    const users = await User.add(user);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: `internal server err ${err}` });
  }
});

// @route    GET api/login
// @desc     login
// @Access   Public
server.post("/api/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await User.findBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ message: `Welcome ${user.username}!` });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: `internal err server ${err}` });
  }
});
// @route    -MIDDLEWARE-
// @desc      protected auth
// @Access   Private
async function auth(req, res, next) {
  const { username, password } = req.headers;
  try {
    if (username && password) {
      const user = await User.findBy({ username });

      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ message: "No credentials provided" });
    }
  } catch (err) {
    res.status(500).json({ message: `internal err server ${err}` });
  }
}

server.get("/api/users", auth, async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: `internal err server ${err}` });
  }
});

// [...]
// 404
server.use(function(req, res, next) {
  return res
    .status(404)
    .send({ message: "[Route] --> " + req.url + " <-- Not found." });
});
// 500 - Any server error
server.use(function(err, req, res, next) {
  return res.status(500).send({ error: err });
});

const port = 5000;
server.listen(port, () => {
  console.log(`
  ------------------------------------------
      server running on port ${port}
  ------------------------------------------
  `);
});
