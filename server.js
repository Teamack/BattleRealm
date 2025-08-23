import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = process.env.JWT_SECRET || 'dev-secret';

// Simple in-memory user store
const users = {
  player1: { password: 'password' }
};

// Session store keeps nonce and game state per user
const sessions = {};

function generateToken(username) {
  return jwt.sign({ username }, SECRET, { expiresIn: '15m' });
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  sessions[username] = { nonce: 0, gameState: {} };
  const token = generateToken(username);
  res.json({ token });
});

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: 'Missing token' });
  }
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload.username;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.post('/game/action', authMiddleware, (req, res) => {
  const { nonce, action } = req.body;
  const session = sessions[req.user];
  if (!session) {
    return res.status(401).json({ error: 'No active session' });
  }
  if (nonce !== session.nonce + 1) {
    return res.status(409).json({ error: 'Invalid nonce' });
  }
  session.nonce = nonce;
  session.gameState.lastAction = action;
  res.json({ ok: true, state: session.gameState });
});

app.post('/refresh', authMiddleware, (req, res) => {
  const token = generateToken(req.user);
  res.json({ token });
});

app.post('/logout', authMiddleware, (req, res) => {
  delete sessions[req.user];
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
