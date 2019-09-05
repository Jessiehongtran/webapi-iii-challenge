// code away!
const server = require('./server.js');

const port = process.env.PORT || 5002;
server.listen(port, () => console.log(`API on port ${port}`))