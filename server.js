require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./data/dbConfig");
const User = require("./data/user-model");
const server = express();
const keys = "secret";
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger("dev"));

// @route    GET api/register
// @desc     register //username, password
// @Access   Public
server.post("/api/register", async (req, res) => {
  let user = req.body;
  if (!user.username) {
    return res.status(400).json({ username: "Username field is required" });
  }
  if (!user.password) {
    return res.status(400).json({ password: "Password field is required" });
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = {
        id: user.id,
        username: user.username,
        password: user.password
      };

      jwt.sign(payload, keys, { expiresIn: 604800000 }, (err, token) => {
        res.json({
          success: true,
          token: token
        });
      });
    } else {
      res.status(400).json({ message: "password incorrect" });
    }
  } catch (err) {
    res.status(500).json({ message: `internal err server ${err}` });
  }
});
// @route    -MIDDLEWARE-
// @desc      protected auth
// @Access   Private
function auth(req, res, next) {
  const token = req.get("Authorization");

  if (token) {
    jwt.verify(token, "secret", (error, decoded) => {
      if (error) {
        res.status(401).json({ message: "You are not authorized" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "You are not authorized" });
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
