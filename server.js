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

function atGate(req,res,next) {
  console.log('At the gate, about to be eaten');
  next();
}

function auth(req,res,next) {
  if(req.url === '/melon'){
    next()
  } else {
    res.send('You shall not pass')
  }
}

server.get('/melon', (req,res) => {
  console.log('Gate opening...');
  console.log('Inside and safe');
  res.send('Welcome Traveler')
})

server.get('/haha', (req,res) => {
  res.send("Let's discover")
})


server.use(logger)
server.use(atGate)
server.use(auth)
module.exports = server;
