const http = require('http'); // Add this line
const app = require('./app'); // Assuming app is exported from another file
const port = 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
