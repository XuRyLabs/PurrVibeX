# 🐾 PurrVibeX

> A cozy social playground for cat lovers — chat, play, listen to music, and hang out, all in cat style. 😸

---

## 🎯 What is PurrVibeX?

PurrVibeX is a **cat-themed social platform** where users can hang out in themed rooms, listen to music together, play mini games, customize their own cat avatar, and connect with fellow cat lovers.

It's not just a social network — it's a vibe. 🐱✨

---

## ✨ Core Features (✅ = Frontend UI Implemented)

| Feature | Status | Description |
|---------|--------|-------------|
| 🏠 PurrLounge | ✅ | Join themed rooms to chat, chill, play games, or listen to music |
| 🎧 BeatPaws | ✅ | Queue songs and listen in sync with everyone (player UI + queue) |
| 🐱 MeowDex | ✅ | Your personal cat ID card — profile, badges, activity feed |
| 🖼️ Cat Gallery | ✅ | Share real cat photos (masonry, filters, likes) |
| 🏆 Hall of Paws | ✅ | Meow Points leaderboard with podium (top 3) |
| 🛍️ ClawMart | ✅ | Shop for avatar items, stickers, themes (with Meow Points) |
| 🔐 Authentication | ✅ | Google OAuth + Email/Password, Firebase integration |
| 🌙 Dark Mode | ✅ | Full light/dark theme toggle (PurrLight / PurrDark) |
| 📱 Apple Dock Nav | ✅ | Bottom dock for mobile/tablet (responsive, animated) |
| ⚡ User Dropdown | ✅ | Profile → PurrDex, Language, Dark/Light, Logout |
| ⏳ Loading Screen | ✅ | Animated meow cat while checking session |
| 🎨 Responsive Design | ✅ | Full typography clamp, desktop/tablet/mobile breakpoints |
| ✨ Apple Parallax | ✅ | Mouse-driven parallax on hero + scroll reveal animations |
| 💬 Chat & Social | 🔄 | Real-time chat, DMs, group chat, friend system (backend WIP) |
| 🎮 Mini Games | 🔄 | Play Catch the Mouse, Fish Collector, etc. (backend WIP) |
| 📅 Cat Events | ⏰ | Seasonal events (planned for v2) |

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
cd /Users/jerrynguyen99/IdeaProjects/meow-world/backend
composer create-project laravel/laravel .cd /Users/jerrynguyen99/IdeaProjects/meow-world/backend
composer create-project laravel/laravel .cd /Users/jerrynguyen99/IdeaProjects/meow-world/backend
composer create-project laravel/laravel .| Frontend | React 18 + Vite + TailwindCSS |
| State Management | Zustand |
| Backend | Laravel 11 (PHP 8.3) |
| Real-time | Laravel Echo + Soketi (self-hosted, free) |
| Music | yt-dlp → FFmpeg → WebSocket stream |
| Database | PostgreSQL 15 |
| File Storage | Cloudflare R2 / Supabase Storage (free tier) |
| Hosting | Railway / Render (backend) · Vercel / Netlify (frontend) |
| Avatar Builder | Canvas API or SVG layering |

---

## 📋 Requirements

Make sure you have all of the following installed before starting:

| Tool | Minimum Version | Check |
|------|----------------|-------|
| [PHP](https://www.php.net/) | 8.2+ | `php --version` |
| [Composer](https://getcomposer.org/) | 2.x | `composer --version` |
| [Node.js](https://nodejs.org/) | 20+ | `node --version` |
| [npm](https://www.npmjs.com/) | 9+ | `npm --version` |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | Latest | `docker --version` |
| [Git](https://git-scm.com/) | 2.x | `git --version` |

**Optional but recommended:**
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) — for Music Stream Room feature
- [FFmpeg](https://ffmpeg.org/) — for audio encoding in Music Stream Room

### Installing on macOS

```bash
# 1. Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install PHP, Composer, Node, Git
brew install php composer node git

# 3. Install Docker Desktop
brew install --cask docker
# Then open Docker Desktop from Applications and wait for it to start

# 4. Optional: Music stream tools
brew install yt-dlp ffmpeg
```

### Installing on Windows

```bash
# Use Scoop (https://scoop.sh) or install manually:
scoop install php composer nodejs git

# Docker Desktop: https://www.docker.com/products/docker-desktop/
# yt-dlp + FFmpeg: https://github.com/yt-dlp/yt-dlp#installation
```

### Installing on Linux (Ubuntu/Debian)

```bash
sudo apt update && sudo apt install -y php8.3 php8.3-cli php8.3-mbstring \
  php8.3-xml php8.3-curl php8.3-pgsql git nodejs npm

# Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Docker
curl -fsSL https://get.docker.com | sh

# yt-dlp + FFmpeg (optional)
sudo apt install -y ffmpeg
pip install yt-dlp
```

---

## 🚀 Installation & Setup

### Option A — Docker (Recommended, easiest)

Spins up backend + frontend + database + WebSocket server in one command.

```bash
# 1. Clone the repository
git clone https://github.com/your-username/meow-world.git
cd meow-world

# 2. Copy environment file
cp .env.example .env

# 3. Start all services
docker-compose up -d

# 4. Check all containers are running
docker-compose ps
```

You should see 4 containers: `backend`, `frontend`, `soketi`, `db`.

```bash
# 5. Run database migrations (first time only)
docker-compose exec backend php artisan migrate --seed
```

---

### Option B — Manual Setup (without Docker)

#### 🔧 Backend (Laravel)

```bash
cd backend

# Install Laravel into this folder
composer create-project laravel/laravel .

# Copy the skeleton files back (they may get overwritten — restore from git)
# Controllers, Models, Events, and routes/api.php are already in place

# Install dependencies
composer install

# Set up environment
cp .env.example .env
php artisan key:generate

# Configure your database in .env, then run migrations
php artisan migrate --seed

# Start the dev server
php artisan serve
# → Running at http://localhost:8000
```

#### 🎨 Frontend (React + Vite)

```bash
cd frontend

# Install dependencies
npm install

# Copy frontend env for Firebase auth
cp .env.example .env

# Start the dev server
npm run dev
# → Running at http://localhost:5173
```

To enable login/register with Firebase, fill in the values inside `frontend/.env` using your Firebase project settings.

#### 📡 Soketi (WebSocket — optional for real-time features)

```bash
# Install globally
npm install -g @soketi/soketi

# Run with default config
soketi start --config=soketi/.env.example
# → Listening at ws://localhost:6001
```

---

## 🌐 Service URLs

| Service | URL |
|---------|-----|
| 🎨 Frontend | http://localhost:5173 |
| 🔌 Backend API | http://localhost:8000/api |
| 📡 WebSocket (Soketi) | ws://localhost:6001 |
| 🐘 PostgreSQL | localhost:5432 |

---

## 🗺️ Roadmap

| Priority | Feature |
|----------|---------|
| 🔴 High | Auth, Profile, Chat, Friend system |
| 🟠 Medium | Music Stream Room |
| 🟡 Medium | Mini Games (v1) |
| 🟢 Low | Cat Gallery, Events, Shop |
| ⚪ Future | AI companion, Voice rooms, Horoscope... |

---

## 🔮 Future Ideas (WIP)

- 🤖 Meow AI Companion — a tiny AI cat that reacts to what you do on screen
- 🔮 Cat Horoscope — daily fortune based on your cat's breed
- 🎙️ Voice Rooms — group voice chat, no music, just vibes
- 📖 Meow Diary — a private cat-themed journal
- 🏠 Cat Adoption Board — help cats find their forever home
- 🐾 Pet Your Friend's Cat — tap to send a little pat 🥰
- 🤓 Cat Facts Bot — daily cat facts dropped in the room

---

## 📁 Project Structure

```
meow-world/
├── backend/                  # Laravel API (PHP)
│   ├── app/Http/Controllers/ # Auth, User, Room, Chat, Music, Game, Shop, Gallery
│   ├── app/Models/           # User, Room, Message, Friendship, MusicQueue, ShopItem, CatPhoto, GameSession
│   ├── app/Events/           # MessageSent, MusicSync, RoomUpdated
│   └── routes/api.php        # All API routes
├── frontend/                 # React SPA (Vite + TailwindCSS)
│   └── src/
│       ├── components/       # chat, room, music, game, avatar, shop, gallery
│       ├── pages/            # Home, Login, Register, Profile, Rooms, MusicRoom, Shop, Gallery, Leaderboard
│       ├── store/            # Zustand stores (auth, room, chat, music)
│       └── services/         # API client + service modules
├── soketi/                   # Self-hosted WebSocket server config
├── docker-compose.yml        # Full local dev stack
└── .env.example              # Environment variable template
```

---

## 🤝 Contributing

All ideas are welcome! Check out [`IDEA.md`](./IDEA.md) for the full brainstorm board.  
Feel free to open an issue or PR with suggestions. 🐾

---

## 📄 License

MIT — free to use, fork, and meow with. 🐱

---

> *Every idea, no matter how small, is recorded here. PurrVibeX will grow over time! 🐾*
