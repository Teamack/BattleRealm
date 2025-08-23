export {};

const app = document.getElementById('app');

async function post(path: string, payload: any) {
  const res = await fetch(`http://localhost:3000${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

function renderState(target: HTMLElement, state: any) {
  target.textContent = JSON.stringify(state, null, 2);
}

if (app) {
  const name = import.meta.env.VITE_SITE_NAME || 'Battle Realm';
  const tagline = import.meta.env.VITE_SITE_TAGLINE || '';
  app.innerHTML = `<h1>${name}</h1><p>${tagline}</p>`;

  const statePre = document.createElement('pre');
  app.appendChild(statePre);

  const playBtn = document.createElement('button');
  playBtn.textContent = 'Play Card';
  playBtn.onclick = async () => {
    try {
      const { state } = await post('/play-card', { playerId: 'p1', card: 'card1' });
      renderState(statePre, state);
    } catch (err: any) {
      alert(err.message);
    }
  };
  app.appendChild(playBtn);

  const attackBtn = document.createElement('button');
  attackBtn.textContent = 'Attack';
  attackBtn.onclick = async () => {
    try {
      const { state } = await post('/attack', { attackerId: 'p1', targetId: 'p2' });
      renderState(statePre, state);
    } catch (err: any) {
      alert(err.message);
    }
  };
  app.appendChild(attackBtn);
}

// --- Basic client-side auth demo ---
let token = localStorage.getItem('token') || ''
let nonce = 0

const authRoot = document.createElement('div')
authRoot.innerHTML = `
  <form id="login-form">
    <input id="username" placeholder="username" required />
    <input id="password" type="password" placeholder="password" required />
    <button type="submit">Login</button>
  </form>
  <button id="action-btn" disabled>Send Action</button>
  <button id="refresh-btn" disabled>Refresh Token</button>
  <button id="logout-btn" disabled>Logout</button>
`
document.body.appendChild(authRoot)

function setLoggedIn(state: boolean) {
  (document.getElementById('action-btn') as HTMLButtonElement).disabled = !state
  (document.getElementById('refresh-btn') as HTMLButtonElement).disabled = !state
  (document.getElementById('logout-btn') as HTMLButtonElement).disabled = !state
}

setLoggedIn(!!token)

// ... rest of the authentication code remains the same ...