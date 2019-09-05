const express = require('express');

const server = express();

const userDb = require('./users/userDb')

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`)
// });

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

// server.use(validateUserId);

function validateUser(req,res,next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" })
  } else if (req.body.name) {
    next()
  } 
    else{
    res.status(400).json({ message: "missing required name field" })
  } 
}



// server.use(validateUser)

function validatePost(req,res,next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" })
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" })
  } else {
    next();
  }
}

// server.use(validatePost)

server.get('/api/users', (req,res) => {
  userDb
      .get()
      .then(users => {
        console.log(users)
        res.status(200).json(users)
      }
      )
})

server.get('/api/users/:id', (req,res) => {
  console.log('fired')
  userDb
      .getById(req.params.id)
      .then(user => 
        { if (!req.params.id){
          res.status(404).json({ message: "The user with the specified ID does not exist." })
      } else if (!user){
          res.status(500).json({ error: "The user information could not be retrieved." })
      }
      else {
          res.status(200).json(user)
      }
    }
    )
})

module.exports = server;
