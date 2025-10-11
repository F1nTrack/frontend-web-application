const http = require('http');
const handler = require('./index.cjs');

const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => handler(req, res));

server.listen(port, () => {
  console.log(`API test server listening on http://localhost:${port}`);
});
