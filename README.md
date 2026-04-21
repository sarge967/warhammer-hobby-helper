# ⚔ Warhammer Hobby Helper

A free, installable Progressive Web App (PWA) for Warhammer 40K painters.
Works on **iPhone, Android, and desktop** — no app store required.

## Features

- 🎨 **Colour Theory** — Browse all ~220 Citadel paints, get AI-powered painting guides
- 📦 **Inventory** — Track paints and brushes, generate a shopping list
- 🖌️ **Brushes** — Beginner-friendly guides to every Citadel brush
- 🎭 **Schemes** — 4 curated paint schemes for all 13 Warhammer 40K armies
- 📖 **Beginner Tips** — 30+ tips on techniques, tools, and common mistakes
- 📋 **Project Planner** — Track army projects, units, and painting progress

---

## Getting the Colour Theory tab working (FREE)

The AI features use **Google Gemini**, which is completely free — no credit card needed.

### Step 1 — Get your free API key (2 minutes)
1. Go to **https://aistudio.google.com/app/apikey**
2. Sign in with a Google account
3. Click **Create API key**
4. Copy the key (it looks like `AIzaSy...`)

### Step 2 — Add it to Netlify
1. In your Netlify dashboard, open your site
2. Go to **Site configuration → Environment variables**
3. Click **Add a variable**
   - Key: `GEMINI_API_KEY`
   - Value: the key you copied
4. Click **Save**

### Step 3 — Redeploy
1. Go to **Deploys → Trigger deploy → Deploy site**
2. Wait ~1 minute — done!

---

## Deploying for the first time (GitHub + Netlify)

1. Create a GitHub repo at https://github.com/new named `warhammer-hobby-helper`
2. Upload all files from this folder (keeping the folder structure)
3. Go to https://netlify.com → **Add new site → Import from GitHub**
4. Select your repo — Netlify auto-detects the settings → click **Deploy**
5. Add the `GEMINI_API_KEY` environment variable (Step 2 above)
6. Trigger a redeploy

## Installing on iPhone
Open your Netlify URL in **Safari** → Share button → **Add to Home Screen** → Add

## Installing on Android
Open your Netlify URL in **Chrome** → three-dot menu → **Install app**

---

## How the secure proxy works

The app calls `/api/claude` — a small Netlify Function (`netlify/functions/claude.js`)
that runs on Netlify's servers. It adds your secret API key and calls Google Gemini.
Your key is never sent to the browser or visible to users.

## Local development

```bash
npm install
npm run dev        # Basic dev server (AI tab won't work without proxy)

# To test with AI working locally:
npm install -g netlify-cli
echo "GEMINI_API_KEY=your_key_here" > .env.local
netlify dev        # Runs app + functions at http://localhost:8888
```
