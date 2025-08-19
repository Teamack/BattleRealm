const app = document.getElementById('app')

if (app) {
  const name = import.meta.env.VITE_SITE_NAME || 'Battle Realm'
  const tagline = import.meta.env.VITE_SITE_TAGLINE || ''
  app.innerHTML = `<h1>${name}</h1><p>${tagline}</p>`
}
