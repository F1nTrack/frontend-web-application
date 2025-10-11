const jsonServer = require('json-server');
const path = require('path');

// Resolve fixtures DB path
const dbFile = path.join(__dirname, '..', 'fixtures', 'db.json');

const server = jsonServer.create();
const router = jsonServer.router(dbFile);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  console.log(`[json-server] ${req.method} ${req.url}`);
  next();
});
server.use(router);

// Export a CommonJS handler for Vercel serverless
module.exports = function handler(req, res) {
  try {
    server(req, res);
  } catch (err) {
    console.error('[api] handler error:', err && err.stack ? err.stack : err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};
