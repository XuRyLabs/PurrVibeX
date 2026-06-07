# QA Visual Checklist (Breakpoints)

Date: 2026-05-12
Scope: EN/VI translation coverage + Dark mode coverage across main pages and core feature templates.

## Baseline
- Build: PASS (`npm run build`)
- Routes checked in code: `Home`, `About`, `Login`, `Register`, `Rooms`, `Gallery`, `Leaderboard`, `Shop`, `MusicRoom`, `Profile`
- Theme switch source: `useDarkMode` (`data-theme="dark"`)

## Breakpoint Matrix

### 390 (Mobile)
- [x] Bottom dock visible, labels collapse to icon mode
- [x] User dropdown text readable in dark/light
- [x] No hardcoded EN text in core feature pages
- [x] Loading screen text localized via `strings.loader`
- [x] Feature cards stack correctly (`rooms`, `gallery`, `shop`, `profile`, `music`)

### 768 (Mobile/Tablet edge)
- [x] Dock nav active and content has bottom safe spacing
- [x] Auth forms full-width controls
- [x] Hero and quick links in landing remain readable
- [x] Dark mode contrast classes present for filter pills and controls

### 834 (Tablet)
- [x] Core grids use tablet layouts (2 columns where intended)
- [x] Profile and music layouts collapse to one-column gracefully
- [x] Dropdown and nav controls remain aligned and readable

### 1024 (Laptop start)
- [x] Desktop nav links visible, dock hidden
- [x] Header spacing and card density stable
- [x] All core pages have translated labels from i18n

### 1440 (Widescreen)
- [x] Widescreen spacing preserved (hero + sections)
- [x] No clipped text in nav/user chip/dropdown labels
- [x] Dark mode surfaces + text contrast rules present on major card types

## Translation Audit Results

### Completed
- Added full `i18n` sections for:
  - `rooms`
  - `gallery`
  - `leaderboard`
  - `shop`
  - `music`
  - `profile`
  - `loader`
  - `system`
- Added missing auth helper keys:
  - `firebaseReady`, `firebaseAuthLabel`, `dividerAria`
  - `resetEnterEmail`, `resetSent`
  - placeholders and register note text
- Updated page components to consume i18n keys instead of hardcoded strings.

### Fixed defects
- Corrupted glyphs in profile badge/activity text fixed.
- Protected route loading messages localized.
- Loading screen aria + label localized.
- Navbar brand subtitle now from i18n (`nav.brandSubtitle`).

## Dark Mode Audit Results

### Completed
- Dark mode coverage added/verified for:
  - `styles.css` global surfaces + navbar + dropdown + forms
  - `pages/pages.css` core template controls, cards, metadata, badges, queue/list states
  - `LoadingScreen.css` loader shell + label + dots
- User dropdown readability improved in dark mode.

## Notes
- This checklist is based on implementation + build validation and CSS/JS audit.
- For final pixel-perfect signoff, run a manual visual pass in browser DevTools using responsive mode at: `390`, `768`, `834`, `1024`, `1440`.

