import { createServer, IncomingMessage, ServerResponse } from 'http';
import { GameEngine } from './game-engine.js';

const engine = new GameEngine();

function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

function send(res: ServerResponse, code: number, payload: any) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

const server = createServer(async (req, res) => {
  if (!req.url || req.method !== 'POST') {
    send(res, 404, { error: 'Not found' });
    return;
  }
  try {
    const body = await parseBody(req);
    let state;
    if (req.url === '/play-card') {
      state = engine.playCard(body.playerId, body.card);
    } else if (req.url === '/attack') {
      state = engine.attack(body.attackerId, body.targetId);
    } else {
      send(res, 404, { error: 'Not found' });
      return;
    }
    send(res, 200, { state });
  } catch (err: any) {
    send(res, 400, { error: err.message });
  }
});

const PORT = Number(process.env.PORT) || 3000;
server.listen(PORT);
console.log(`Server listening on http://localhost:${PORT}`);
