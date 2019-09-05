const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use(express.json())

//custom middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`
  );
  next();
};

server.use(logger);

function validateUserId(req,res,next, id) {
  if (id === res.params.id){
    res.send(req.user);
    next();
  } else {
    res.status(400).json({ message: "invalid user id" })
  }
}

server.use(validateUserId);

function validateUser(req,res,next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" })
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next();
  }
}

server.use(validateUser)

function validatePost(req,res,next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" })
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" })
  } else {
    next();
  }
}

module.exports = server;
