# ⚔ Warhammer Hobby Helper

A free, installable Progressive Web App (PWA) for Warhammer 40K painters.

## Getting the Colour Theory AI working (FREE — no credit card)

The app uses **OpenRouter** for AI — it's free, no credit card required.

### Step 1 — Get a free OpenRouter key (2 minutes)
1. Go to **https://openrouter.ai** and create a free account
2. Go to **https://openrouter.ai/keys** and click **Create Key**
3. Copy the key — it starts with `sk-or-...`

### Step 2 — Add it to Netlify
1. Netlify dashboard → your site → **Site configuration → Environment variables**
2. Click **Add a variable**
   - Key: `OPENROUTER_API_KEY`
   - Value: your key from step 1
3. Click **Save**
4. If you have an old `GEMINI_API_KEY` variable, delete it

### Step 3 — Redeploy
1. Go to **Deploys → Trigger deploy → Deploy site**
2. Wait ~1 minute for it to finish
3. Visit **your-site.netlify.app/test.html** to confirm it's working

---

## Installing on iPhone
Open your Netlify URL in **Safari** → Share button → **Add to Home Screen** → Add

## Installing on Android
Open your Netlify URL in **Chrome** → three-dot menu → **Install app**

---

## Project structure
```
netlify/functions/claude.js   ← Secure AI proxy (uses OpenRouter)
public/test.html              ← Diagnostic page
src/App.jsx                   ← The entire application
netlify.toml                  ← Build + routing config
```
