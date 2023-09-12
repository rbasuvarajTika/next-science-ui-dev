const http = require('http');
const cors = require('cors');

const server = http.createServer((req, res) => {
  // Use the cors middleware to allow requests from any origin during development
  cors()(req, res, () => {
    // Your server logic
  });
});

server.listen(9090, () => {
  console.log('Server is running on port 9090');
});