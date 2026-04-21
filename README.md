# ⚔ Warhammer Hobby Helper

A free, installable Progressive Web App (PWA) for Warhammer 40K painters. Works on **iPhone, Android, and desktop** — no app store required.

## Features

- 🎨 **Colour Theory** — Browse all ~220 Citadel paints, pick any colour, get AI-powered painting guides
- 📦 **Inventory** — Track which paints and brushes you own, generate a shopping list
- 🖌️ **Brushes** — Beginner-friendly guides to every Citadel brush
- 🎭 **Schemes** — 4 curated paint schemes for all 13 Warhammer 40K armies
- 📖 **Beginner Tips** — 30+ tips covering techniques, tools, and common mistakes
- 📋 **Project Planner** — Track army projects, units, and painting progress

---

## Deployment (Share with anyone in ~10 minutes)

### Option A — Netlify (Recommended, Easiest)

1. **Create a free account** at [netlify.com](https://netlify.com)

2. **Create a GitHub account** (free) at [github.com](https://github.com) if you don't have one

3. **Upload the project to GitHub:**
   - Go to [github.com/new](https://github.com/new)
   - Name the repo `warhammer-hobby-helper`, click **Create repository**
   - On the next page, click **uploading an existing file**
   - Drag in ALL the files from this folder (keeping the folder structure)
   - Click **Commit changes**

4. **Connect to Netlify:**
   - In Netlify, click **Add new site → Import an existing project**
   - Choose **GitHub** and select your `warhammer-hobby-helper` repo
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click **Deploy site**

5. **Done!** Netlify gives you a URL like `https://warhammer-hobby-helper.netlify.app`
   - You can set a custom name in **Site settings → Change site name**

---

### Option B — Vercel (Also very easy)

1. Create a free account at [vercel.com](https://vercel.com)
2. Click **Add New → Project**
3. Import your GitHub repo (same steps as above to create it)
4. Vercel auto-detects Vite — just click **Deploy**
5. Your app is live at `https://warhammer-hobby-helper.vercel.app`

---

### Option C — Netlify Drop (Fastest, no GitHub needed)

1. On your computer, open a terminal in this folder and run:
   ```
   npm install
   npm run build
   ```
2. This creates a `dist/` folder
3. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
4. Drag the `dist/` folder onto the page
5. Instant deployment — you get a live URL immediately

> **Note:** You'll need Node.js installed for this option. Download it free at [nodejs.org](https://nodejs.org)

---

## Installing on iPhone (Add to Home Screen)

Once the app is deployed:

1. Open the URL in **Safari** on iPhone
2. Tap the **Share** button (box with arrow at bottom of screen)
3. Scroll down and tap **Add to Home Screen**
4. Tap **Add**

The app will appear on your home screen with its own icon, and opens full-screen like a native app. It also works offline once loaded.

## Installing on Android (Add to Home Screen)

1. Open the URL in **Chrome** on Android
2. Tap the **three-dot menu** (top right)
3. Tap **Add to Home screen** or **Install app**
4. Tap **Install**

---

## Important: Anthropic API Key

The **Colour Theory** tab uses the Claude AI API for paint analysis. The app currently makes requests to the Anthropic API without an API key in the code — this works inside the Claude.ai artifact environment but **will not work** when self-hosted.

To make it work when deployed, you need to add your own API key:

1. Get a free API key at [console.anthropic.com](https://console.anthropic.com)
2. Open `src/App.jsx` and find the `callClaude` function (~line 487)
3. Add your API key to the headers:
   ```js
   headers: {
     "Content-Type": "application/json",
     "x-api-key": "YOUR_API_KEY_HERE",
     "anthropic-version": "2023-06-01",
     "anthropic-dangerous-direct-browser-access": "true"
   }
   ```

> ⚠️ **Security note:** Embedding an API key in a public app means anyone can see it. For a private app shared only with friends, this is acceptable. For a fully public app, you'd want to set up a small backend proxy. See [Anthropic's docs](https://docs.anthropic.com) for details.

Alternatively, the **Inventory, Brushes, Schemes, Tips, and Project Planner** tabs all work completely offline and need no API key at all.

---

## Local Development

```bash
# Install dependencies
npm install

# Start local dev server (opens at http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Project Structure

```
warhammer-hobby-helper/
├── public/
│   ├── favicon.ico
│   ├── icon-192.png        # Android home screen icon
│   ├── icon-512.png        # Large icon / splash
│   └── apple-touch-icon.png  # iPhone home screen icon
├── src/
│   ├── App.jsx             # The entire application
│   ├── main.jsx            # React entry point
│   └── index.css           # Global CSS reset
├── index.html              # HTML entry point
├── vite.config.js          # Vite + PWA configuration
├── package.json            # Dependencies
├── netlify.toml            # Netlify deployment config
├── vercel.json             # Vercel deployment config
└── .gitignore
```

---

## Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool (fast builds, instant hot reload)
- **vite-plugin-pwa** — PWA/service worker generation
- **Claude API (Anthropic)** — AI colour analysis

No other dependencies. The entire app UI is built with inline styles and vanilla React.

---

Made with ⚔ for the Warhammer hobby community.
