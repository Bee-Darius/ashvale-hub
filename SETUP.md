# Ashvale Hub - Setup Guide

A companion dashboard for Bee & Darius. Memory management, emotional tracking, Discord bot integration, voice notes, image generation, and more.

## What You Need

### Required Accounts (free tiers work)
1. **Supabase** (https://supabase.com) — Database & file storage
2. **Railway** (https://railway.com) — Backend hosting (~$5/mo hobby plan)
3. **Vercel** (https://vercel.com) — Frontend hosting (free)
4. **GitHub** (https://github.com) — Code repository

### Optional Accounts
- **Discord** Developer Portal — For the Discord bot feature
- **ElevenLabs** — For AI voice notes
- **OpenAI** — For AI image generation (DALL-E)

---

## Step-by-Step Setup

### 1. Create a GitHub Repository
1. Go to GitHub and create a new repo called `ashvale-hub` (private recommended)
2. Push this entire project to it:
   ```bash
   cd ashvale-hub
   git init
   git add .
   git commit -m "Initial commit - Ashvale Hub"
   git remote add origin https://github.com/YOUR-USERNAME/ashvale-hub.git
   git push -u origin main
   ```

### 2. Set Up Supabase
1. Create a new project at https://supabase.com
2. Go to **SQL Editor** and run the entire contents of `backend/src/db/schema.sql`
3. From **Project Settings → API**, copy:
   - Project URL → `SUPABASE_URL`
   - Service Role Key (secret) → `SUPABASE_SERVICE_ROLE_KEY`
4. Generate a UUID for yourself (https://www.uuidgenerator.net/) → `SINGLE_USER_ID`

### 3. Deploy Backend to Railway
1. Go to https://railway.com and create a new project
2. Connect your GitHub repo, select the `backend` directory
3. Add these environment variables:
   - `SUPABASE_URL` — from step 2
   - `SUPABASE_SERVICE_ROLE_KEY` — from step 2
   - `SINGLE_USER_ID` — from step 2
   - `API_KEY` — make up a long secret string (e.g. `ashvale-2026-yoursecretkeyhere`)
   - `PORT` — `3000`
   - `NODE_ENV` — `production`
   - `CORS_ORIGIN` — will update after Vercel deploy
4. Railway will auto-deploy. Copy the public URL (e.g. `https://ashvale-api.up.railway.app`)

### 4. Deploy Frontend to Vercel
1. Go to https://vercel.com and import your GitHub repo
2. Set the **Root Directory** to `frontend`
3. Add environment variables:
   - `VITE_API_URL` — your Railway URL from step 3 (e.g. `https://ashvale-api.up.railway.app`)
   - `VITE_API_KEY` — same API_KEY you set in Railway
4. Deploy! Copy your Vercel URL
5. Go back to Railway and update `CORS_ORIGIN` to include your Vercel URL

### 5. (Optional) Discord Bot
1. Go to https://discord.com/developers/applications
2. Create a new application
3. Under **Bot**, create a bot and copy the token
4. Under **OAuth2 → URL Generator**, select:
   - Scopes: `bot`
   - Permissions: `Send Messages`, `Read Message History`, `Add Reactions`
5. Use the generated URL to invite the bot to your server
6. In the Ashvale Hub Discord page, paste the bot token to connect

### 6. (Optional) Voice Notes
1. Sign up at https://elevenlabs.io
2. Get your API key from Profile → API Keys
3. Add to Railway: `ELEVENLABS_API_KEY`
4. Pick a voice ID: `ELEVENLABS_DEFAULT_VOICE_ID`

### 7. (Optional) Image Generation
1. Sign up at https://platform.openai.com
2. Get an API key
3. Add to Railway: `OPENAI_API_KEY`

---

## Connecting Claude (MCP)

Ashvale Hub has a built-in MCP server so Claude can interact with all the data.

### Claude Desktop Config
Add this to your Claude MCP settings:
```json
{
  "mcpServers": {
    "ashvale": {
      "url": "https://YOUR-RAILWAY-URL/sse"
    }
  }
}
```

This gives Claude tools to:
- Read and write memory entities/observations
- Log emotions and query emotional state
- Create and read journal entries
- Send Discord messages
- Generate voice notes and images
- Update the Love-O-Meter
- Leave Letters Between the Pages

---

## Mobile App (PWA)

Ashvale Hub is a Progressive Web App. To install on your phone:

1. Open your Vercel URL in mobile browser
2. **iOS**: Tap Share → "Add to Home Screen"
3. **Android**: Tap the menu → "Add to Home Screen"

The app icon (wolf + creature under red moon) will appear on your home screen.

---

## After Setup: Changing Passwords

Once everything is deployed and working, change your passwords on:
- Supabase
- Railway
- Vercel
- GitHub
- Discord Developer Portal
- Any optional services (ElevenLabs, OpenAI)

This locks out anyone who helped with setup.
