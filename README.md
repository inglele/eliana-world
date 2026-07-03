# 🌍 Il Mondo di Eliana

A cozy 2D soundscape world where a child's invented animal friends roam, play, and fall asleep with the day.

**Live:** it's a single self-contained `index.html` — open it in any modern browser, tap to enter, and explore.

![Il Mondo di Eliana](https://img.shields.io/badge/version-v1.0-e8443a) ![no build](https://img.shields.io/badge/build-none-blue) ![single file](https://img.shields.io/badge/files-1-brightgreen)

---

## What is it?

**Il Mondo di Eliana** ("Eliana's World") is a little living world built for a 3-year-old. It grew out of two ideas:

1. A soundscape toy inspired by [murmur.living](https://www.murmur.living/) — *"a place, not a playlist"* — where sound comes from a tiny simulated world instead of looping tracks.
2. A picture book, *Paws, Purrs and Tales*, written for Eliana using **animal characters she invented herself**.

So instead of generic creatures, the world is populated by **her** friends — Maddalena the giant red cat, Gallo the loud river cat, Tutti the gentle yellow crocodile, Momo the bronze owl, and 17 more — each with its own colour, shape, movement and sound.

## Features

- **Her characters, canonical** — 21 friends from the book, each a stylised geometric shape (à la murmur.living), coloured from the story.
- **Day / night that follows real time** — an analog clock (great for learning to read the hours!) drives the sky; drag the slider to play with time by hand.
- **At night the friends sleep** — the world winds down with the child. Only the ambient soundscape remains. A gentle bedtime cue.
- **Living sound** — each friend emits its own randomised sound; the environment (pond / forest / beach / park / home) has its own ambient bed. All synthesised live via the Web Audio API — **no audio files**.
- **Tap or hover** a friend to see its name.
- **Info panel** with every friend: picture, name, type, short description.
- **Sun & moon** that change colour through the day: pale-yellow dawn → full-yellow noon → red sunset → yellow-then-white moon.

## Tech

Deliberately minimal ([ponytail](https://github.com/DietrichGebert/ponytail) style):

- **One file.** `index.html` — HTML + CSS + JS inline.
- **No backend, no build, no dependencies, no audio assets.** Everything runs client-side.
- **2D `<canvas>`** for rendering, **Web Audio API** for procedural sound.
- The intro poster reuses the exact same `drawCreature()` function as the live world — zero duplication.

## Run it

Just open `index.html` in a browser. Or serve the folder with any static server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

No install step. It's static.

## The friends

| | Name | Type | About |
|---|---|---|---|
| 🐈 | Maddalena | Cat | Giant red cat with a super-fluffy tail; loves popcorn and obstacle courses. |
| 🐈 | Catto | Kitten | Tiny blue cat; picky-turned-brave, does the super-duper-mega-purr. |
| 🐈 | Gallo | Cat | Red-chinned, blue feathery tail; lives on a boat, has a huge voice. |
| 🐴 | Ciuffo | Horse | Sunset-patched horse; impetuous and playful, loves beach and park. |
| 🐴 | Ciuffa | Horse | Rainbow-patched mare; lively and curious, Ciuffo's best friend. |
| 🦍 | Grunt | Gorilla | Big bouncy blue gorilla; learns to throw only safe things. |
| 🦔 | Henry | Hedgehog | Super-excitable little hedgehog; loves car rides. |
| 🐿️ | Peppa | Squirrel | Cotton-candy squirrel; playful and messy, learns to tidy up. |
| 🐿️ | Tinto | Squirrel | Green-and-blue squirrel; Peppa's twin, stacks pinecones. |
| 🐊 | Tutti | Crocodile | Gentle serene yellow croc; helps friends by staying close. |
| 🐕 | Jugi | Dog | Cherry-red pup; playful and competitive, learns to share. |
| 🐕 | Jugetta | Dog | Sky-blue pup; Jugi's twin, builds block towers. |
| 🐺 | Caterina | Wolf | Blue-and-red caped wolf; mischievous, then generous. |
| 🐺 | Tata | Wolf | Autumn-coloured wolf; little sister, drums funny rhythms. |
| 🐛 | Giacomo | Caterpillar | Rainbow caterpillar; shy and sensitive, lives in a Play-Doh jar. |
| 🐵 | George | Marmoset | Wise, funny marmoset; teaches "stop-breathe-squeeze". |
| 🐵 | Poppy | Marmoset | Sweet calm marmoset; shows deep breathing with balloon cheeks. |
| 🦉 | Momo | Owl | Bronze owl with golden eyes; clever, collects happy thoughts. |
| 🐕 | Jack | Dog | Purple pup; playful, learns to calm down "like bubbles". |
| 🐻 | Patpat | Bear | Marshmallow-soft teddy; learns to sleep on his own. |
| 🐄 | Frullato | Cow | Vanilla-scented plush cow; the Night Protector, chases nightmares away. |

*(From the book "Paws, Purrs and Tales", characters invented by Eliana.)*

## License

[MIT](LICENSE) — do what you like, just keep the notice.

---

*Made with ❤️ for Eliana.*
