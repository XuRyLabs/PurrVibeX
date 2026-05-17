# 💡 PurrVibeX 🐾 — Ideas & Brainstorm

> This is where all ideas are recorded, big or small, complete or not — as long as they relate to **PurrVibeX** 🐾

---


## 🎯 Vision

A **social playground** for cat lovers.  
Not just a social network — but a playful, relaxing space for connecting with friends in a cat-inspired style.

---

## 🧩 Core Feature Ideas (✅ Implemented: Frontend UI Templates)

### 🏠 PurrLounge (Rooms)
- **Status**: ✅ Frontend UI complete (template)
- Themed "rooms" where users can join in and hang out
- Each room can include: chat, games, music, or just a chill space
- Public / private / invite-only rooms
- Room owners can customize background, music, and theme
- Real-time member count and avatars

---

### 💬 Chat & Social
- Real-time chat between friends
- Friend system (send requests, accept, block)
- Cat-themed emoji reactions (🐱😸🙀😹)
- Cat stickers (can be unlocked through the Meow Shop)
- Private DM (Direct Message)
- Group chat

---

### 🎧 BeatPaws (Music Stream Room)
- **Status**: ✅ Frontend UI complete (player controls, queue, artwork rotation)
- A shared music room �� many people listening together at the same time
- Users request songs by pasting a **YouTube link**
- Bot automatically queues and plays them for the whole room (synchronized)
- Everyone listens from the same point in time (no drifting)
- Can vote to skip songs
- Shows a queue of upcoming songs
- Chat sidebar inside the music room
- **Tech idea:** yt-dlp extract audio → FFmpeg encode → WebSocket stream to all clients

---

### 🎮 Mini Games
- Play games together with friends in a Meow Room
- **Game ideas:**
    - 🐭 Catch the Mouse — platformer mini game
    - 🐟 Fish Collector — idle game, collect fish to exchange for Meow Points
    - 🧶 Cat Tower — puzzle game
    - 🃏 Meow Cards — turn-based card game with friends
    - 🎯 Laser Chase — reflex mini game
- Earn **Meow Points** after playing
- Weekly/monthly leaderboard

---

### 🐱 Cat Customization
- Each user has a unique **cat avatar**
- Customization options:
    - Fur color (solid, tabby, calico, ...)
    - Accessories: hats, glasses, bows, collars
    - Profile background
    - Avatar frame
    - Special effects (sparkle, rainbow, ...)
- Unlock items through the Meow Shop or events

---

### 🐱 MeowDex (Cat Profile)
- **Status**: ✅ Frontend UI complete (profile card, badges, activity feed)
- A "cat ID card"-style personal profile
- Shows: cat avatar, name, bio, mood, badges, cat photo collection
- Friends list
- Game achievements
- Current Meow Points balance
- Provider badge (Google / Email auth)
- Recent activity timeline

---

### 🛒 ClawMart (Shop)
- **Status**: ✅ Frontend UI complete (categories, item cards, buy button, owned state)
- In-game store
- Use **Meow Points** to buy:
    - Avatar items
    - Sticker packs
    - Room decorations
    - Profile frames
    - Exclusive themes
- May include limited-time event items
- New badge highlight for latest items

---

### 💰 Meow Points System
- Internal currency of Meow Zone
- Earn by:
    - Playing games
    - Daily login (daily check-in)
    - Joining events
    - Receiving gifts from friends
    - Completing quests
- Spend in the Meow Shop

---

### 📸 Cat Gallery
- **Status**: ✅ Frontend UI complete (masonry layout, filter tags, like counter)
- Feed of real cat photos uploaded by users
- Like, comment, share
- Follow people with cute cats
- Tag cats by breed (British, Maine Coon, Munchkin, ...)
- Cat photo contest (voting)

---

### 📅 Cat Events
- Seasonal / special-day events:
    - 🎃 Halloween Meow
    - 🎄 Meow-mas (Christmas)
    - 💕 Valentine's Meow
    - 😺 World Cat Day (8/8)
- Limited-time items and rooms for each event
- Special mini games for events

---

### 🌙 Mood System
- Users set a cat-like status:
    - 😴 *“Sleeping like a cat”*
    - 🎯 *“Hunting”*
    - 🐟 *“Eating fish”*
    - 🌞 *“Sunbathing”*
    - 🙈 *“Do not disturb”*
- Displayed on profile and friend list

## 🎯 New Core Features (Frontend Completed)

### 🏆 TopPaw (Leaderboard)
- **Status**: ✅ Frontend UI complete (podium, ranked list, highlight current user)
- Top cats ranked by Meow Points
- Weekly / monthly leaderboard reset
- Visual podium for top 3 (👑 🥈 🥉)
- Highlight row for current user
- Real-time ranking updates

### 🎨 Dark Mode (PurrDark / PurrLight)
- **Status**: ✅ Full implementation + CSS theming
- Toggle in user dropdown menu
- Saves preference to localStorage
- Respects OS `prefers-color-scheme` setting
- Full color palette for dark theme (all pages, cards, forms, navbar, dock)
- Smooth transition when switching

### 🔐 Auth System
- **Status**: ✅ Firebase Google OAuth + Email/Password
- Google sign-in button on login/register
- User profile normalization (displayName, photoURL, providerId, email)
- Protected routes (redirect to login if not authenticated)
- Redirect to originally requested page after login
- Session persistence across page reloads

### ⚡ Apple-Style Bottom Dock (Mobile / Tablet)
- **Status**: ✅ Full implementation
- Fixed bottom navigation docked with blur background
- Active link gradient highlight
- Responsive: shown on `<= 1023px`
- Icons + labels (desktop), icons only on `<= 480px`
- Dark mode support

### 💬 User Dropdown Menu
- **Status**: ✅ Full implementation
- Click user name → dropdown with:
  - 🐾 PurrDex (profile link)
  - 🌐 Language toggle (EN / VI)
  - 🌙 PurrDark / ☀️ PurrLight toggle
  - 🚪 Logout button
- Click-outside to close
- Smooth animation and hover states

### ⏳ Loading Screen (Cute Meow Cat)
- **Status**: ✅ SVG animated cat with:
  - Bobbing motion
  - Ear wiggle animation
  - Tail sway
  - Eye blink
  - Glowing background pulse
  - Animated loading dots
  - i18n text ("Đợi xíu nhé...")
- Blocks all routes during Firebase session check
- Respects `prefers-reduced-motion`

- [ ] 🤖 **Meow AI Companion** — a tiny AI cat that lives in the corner of your screen and reacts to what you do!
- [ ] 🔮 **Cat Horoscope** — get your daily fortune told based on your cat's breed ✨
- [ ] 🎙️ **Voice Rooms** — cozy group voice chat rooms, no music streaming, just vibes
- [ ] 📖 **Meow Diary** — a private, cat-themed journal only you can see 🐾
- [ ] 🏠 **Cat Adoption Board** — a community board for cats looking for their forever home 💕
- [ ] 🖼️ **Meow NFT / Digital Collectibles** — collect rare digital cats and show them off *(optional)*
- [ ] 🐾 **Pet Your Friend's Cat** — tap to give your friend's cat a little pat, just because 🥰
- [ ] 🤓 **Cat Facts Bot** — a bot that drops a fun cat fact every day in the room 😸
- [ ] 💰 **Meow Points & Currency** — a reward points system used to buy decorative items 🛍️
- [ ] 📸 **Cat Gallery** — share real photos of your own cats with the community 🐱📷
- [ ] 🏆 **Leaderboard** — rankings for games and overall activity, weekly & monthly 🥇
- [ ] 📅 **Cat Events** — seasonal & special-day events like World Cat Day, Halloween Meow 🎃😺
- [ ] 🛒 **Meow Shop** — a store for avatars, themes, backgrounds, and more 🎨
- [ ] 🌙 **Mood System** — set a cat-style status like *"sleeping like a cat"* or *"on the hunt"* 😴🎯
---

## 🛠️ Tech Notes

| Problem | Suggested Solution |
|--------|--------------------|
| Music sync for many users | WebSocket broadcast + server-side timestamp |
| YouTube audio extraction | yt-dlp → pipe to FFmpeg → stream |
| Real-time chat | Laravel Echo + **Soketi** (free, self-hosted Pusher alternative) |
| Multiplayer games | WebSocket rooms per game session |
| Avatar builder | Canvas API or SVG layering |
| File upload (cat photos) | **Cloudflare R2** (free tier: 10GB) or **Supabase Storage** (free tier: 1GB) |
| Hosting (backend) | **Railway** or **Render** (free tier available) |
| Hosting (frontend) | **Vercel** or **Netlify** (completely free for hobby projects) |
| Database | **PlanetScale** free tier / **Supabase** (PostgreSQL, free tier) |
| Domain | **Freenom** (.tk/.ml) or grab a cheap `.xyz` for ~$1/yr on Namecheap |
---

## 📌 Priority (temporary)

| Priority | Feature |
|----------|---------|
| 🔴 High | Auth, Profile, Chat, Friend system |
| 🟠 Medium | Music Stream Room |
| 🟡 Medium | Mini Games (v1) |
| 🟢 Low | Cat Gallery, Events, Shop |
| ⚪ Future | AI companion, Voice rooms, ... |

---



> *Every idea, no matter how small, is recorded here. **PurrVibeX** will grow over time! 🐾*