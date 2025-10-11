import http from 'http';
import handler from './index.js';

const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  // wrap handler which may be async
  Promise.resolve().then(() => handler(req, res)).catch((e) => {
    console.error('server runner caught:', e && e.stack ? e.stack : e);
    if (!res.headersSent) {
      res.statusCode = 500; res.end('server error');
    }
  });
});

server.listen(port, () => console.log(`API test server listening on http://localhost:${port}`));
