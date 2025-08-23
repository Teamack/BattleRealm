# 🃏 Battle Realm

*Collect, summon, and command — a fantasy trading card game where creatures, spells, and equipment clash across legendary realms.*

---

## 🎯 Objective
Build a deck of powerful cards — from dragons and demons to spells and relics — and reduce your opponent’s health points to zero.

---

## ⚔ Gameplay Overview
- Each player starts with a **deck** and a set amount of **health points**.
- Players **draw and play cards** each turn:
  - **Creatures** (fight, defend, or support)
  - **Spells** (damage, heal, or manipulate the board)
  - **Equipment** (boost a creature’s abilities)
  - **Locations** (special horizontal cards that shape the battlefield)
- Win by bringing your opponent’s health to **0**.

---

## 🧩 Card Types
- **Creatures** — warriors, mages, beasts, legends.
- **Spells** — elemental, healing, destructive.
- **Equipment** — swords, shields, talismans, relics.
- **Locations** — panoramic battlefield cards that grant unique bonuses.

---

## 🌟 Unique Features
- **Essence Crest System** — every card carries an elemental alignment (Fire, Frost, Shadow, Nature, Arcane, etc.).
- **Soul Value** — a unique stat that fuels resurrection, fusion, and sacrifice mechanics.
- **Horizontal Location Cards** — wide-format cards that literally create the battlefield.

---

## 📜 Example Card

**SOLDIER (Common Creature)**  
- Attack: ⚔ 2 | Defense: 🛡 2 | Soul: 💠 1  
- **Ability:** *Formation Bond — When Soldier enters the battlefield, if another Warrior is on the field, both gain +1 Defense until end of turn.*  
- *Flavor Text:* *“One blade does not win wars. One shield does not hold a wall. But together—together, we endure.”*  

---

## 🚀 Project Setup

### For Developers
1. Clone repo:
   ```bash
   git clone https://github.com/<your-username>/Battle-Realm.git
   cd Battle-Realm
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run locally:
   ```bash
   npm run dev
   ```
4. Build site:
   ```bash
   npm run build
   ```

---

## 🔐 Environment Variables

- Copy `.env.example` to `.env` and fill in your values.
- Only variables prefixed with `VITE_` are exposed to client code.
- Keep secrets unprefixed and out of the repository.
- Run `npm run check-env` to warn about any unprefixed variables referenced in `src/`.

---

## 🌍 Deployment

This repo is configured for GitHub Pages. Push to main and the site auto-deploys.
Live site: https://<your-username>.github.io/Battle-Realm

---

## 🔒 Content Security Policy

Scripts are restricted to trusted sources using a Content Security Policy defined in `index.html`:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'" />
```

- Only scripts loaded from the same origin are permitted.
- Inline scripts and the use of `eval` are blocked.

If your changes require scripts from another domain, update the `script-src` directive and note the exception here for future contributors.

---

## 📜 License

This project is licensed under CC BY-NC-SA 4.0.
Use, share, and adapt with attribution. No commercial use without permission.

---
