# Changelog

All notable changes to **Il Mondo di Eliana**.
Format based on [Keep a Changelog](https://keepachangelog.com/).
Versions are derived from git tags via `deploy.sh` (`git describe`).

## [v1.4] — 2026-07-03

### Living landscape (layered environments)
- The world is now **one place** (sky + ground + horizon) with natural elements you
  toggle on/off and **combine**: mountains, forest, pond, sea, flowers.
- Ambient sound is the **sum** of the active elements.
- Everything is animated: **drifting clouds**, swaying trees, water ripples, swaying flowers.
- Coherent **water system**: a pond up on the left feeds a **river** that flows down;
  turn the sea on and the river simply runs beneath it (fixed course, natural layering).
- Animals roam on the **meadow** (no more floating creatures above the trees).

### Clock helper
- Tap the mantel clock to open it **big and centred**; **Momo the owl** says the time
  out loud — now with the correct voice per language (falls back to the written bubble
  if no matching voice is installed).

### Day / night
- Real **astronomical** sunrise/sunset; location taken from `config.js` **or estimated
  from the browser timezone** (no geolocation permission).
- Sun/moon decided by the real hour (sunset shows a red sun, not the moon).
- Hover the sun/moon to see its name.

### Polish
- Friends get **two eyes** when front-facing, one in profile; eyes close during sleep.
- A soft **glow** pulses around a friend when it makes its sound.
- Language follows the **browser** (no persisted choice); flag button to switch.
- Title translates with the child's name (config).

### Project
- Reorganised into folders: `config.js`, `content/`, `locales/`, `lib/`.
- Version derived from git via `deploy.sh`; `Cache-Control: no-cache` so updates show
  without a hard refresh.
- Homepage screenshot + this changelog.

## [v1.3] — 2026-07-03

First public release. Everything below was built in the initial session.

### The world
- 2D living soundscape world where a child's invented animal friends roam, play,
  and **fall asleep at night** (only the ambient soundscape remains).
- Fully client-side: **canvas 2D** rendering + **Web Audio API** procedural sound.
  No backend, no build, no dependencies, no audio files.

### Characters (21 friends from the book *Paws, Purrs and Tales*)
- Stylised geometric silhouettes per species (à la murmur.living), coloured from the story.
- Each friend has 5 traits: shape (species), colour, speed, movement, sound.
- Tap / hover a friend to see its name.
- Eyes adapt to orientation: front-facing animals get two eyes, side-view animals one.
- A soft **glow pulses** around a friend when it makes its sound (links sound ↔ animal).

### Day / night — real sky
- Follows the **real time of day** (no manual slider — slow, calm rhythm).
- **Astronomical sunrise/sunset** (NOAA algorithm, no dependencies): long summer days,
  short winter days, automatically.
- Location is taken from `config.js` or **estimated from the browser timezone**
  (no geolocation permission needed).
- Sun changes colour (pale-yellow dawn → full-yellow noon → red sunset);
  moon changes colour (evening yellow → night white). Hover to see "Sun" / "Moon".

### Clock (learning to tell the time)
- Wooden **mantel/tambour clock**, always visible — hours + minutes only, no seconds, no digital.
- Tap it to open it **big and centred** with a zoom animation.
- **Momo the owl** helper: tap it and it **says the time out loud** (speech synthesis)
  plus a speech bubble, in the current language.

### Intro
- Poster with all 21 friends arranged in an oval around the title, names labelled.
- Tap to enter → **zoom-in** transition into the live world.
- World-scene favicon and app icon.

### Environments
- 5 scenes: pond, forest, beach, park, home (each with its own sky and ambient sound).

### Internationalization
- Italian + English. Auto-detects the browser language (region fallback,
  e.g. `en-GB`→`en-US`; final fallback Italian).
- Flag button (🇮🇹 / 🇺🇸) to switch; `?lang=` override. No persisted choice —
  each device follows its own language.
- Title composes from the child's name: "Il Mondo di {name}" / "{name}'s World".

### Project / tooling
- Modular, buildless structure: `config.js`, `languages.js` + `locales/<BCP47>.js`,
  `sun.js`, `characters.js`, `environments.js`, `creatures.js`, engine in `index.html`.
- `deploy.sh` derives the version from git and writes `version.js` (shown in the info panel).
- MIT licensed.

### Debug
- Triple-tap the corner clock → phase menu (dawn / day / sunset / night / auto).

## Unreleased / planned
- Real CC0 audio samples in place of synthesised sound.
