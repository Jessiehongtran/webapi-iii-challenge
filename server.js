const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use(express.json())

//custom middleware
server.use(function logger(req, res, next) {
  res.status(404).send("Ain't nobody got time for dat!")
});


module.exports = server;
