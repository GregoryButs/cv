# CV — Gregory Buts

Mijn CV in twee ontwerpen, één codebase. React 19 + TypeScript + Vite met GSAP.

| Pagina | Ontwerp | Bedoeld voor |
| --- | --- | --- |
| [`/`](https://gregorybuts.github.io/cv/) | Donker venster met icoonrail en intern scrollende kolom | de link die ik deel |
| [`/print.html`](https://gregorybuts.github.io/cv/print.html) | Licht editorial ontwerp | afdrukken — exact twee A4-pagina's |

Het printer-icoon linksonder in de rail brengt je van de hoofdpagina naar de printbare versie.

## Opzet

| Pad | Rol |
| --- | --- |
| `src/cvData.tsx` | Alle inhoud — één bron voor beide ontwerpen |
| `src/v2/AppV2.tsx` | Hoofdpagina: het venster-ontwerp |
| `src/v2/useV2Animations.ts` | Intro, scroll-reveals en de actieve sectie in de rail |
| `src/App.tsx` | Printbare versie: de twee A4-pagina's |
| `src/index.css` | Stylesheet van de printbare versie, inclusief de strikte print-regels |
| `src/useCvAnimations.ts` | GSAP-timeline van de printbare versie |

Ontwerpkeuzes die de moeite waard zijn om te kennen:

- Alle animaties zijn `gsap.from()`, dus de eindtoestand is de natuurlijke CSS-toestand:
  zonder JavaScript staat het CV gewoon volledig zichtbaar op het scherm.
- `gsap.matchMedia()` slaat de sequentie over bij `prefers-reduced-motion: reduce`.
- Print wordt afgeschermd in CSS (`@media print` met `!important`), niet in JavaScript —
  die regels winnen ook van GSAP's inline styles als er middenin een animatie wordt afgedrukt.
- `base: './'` in `vite.config.ts`: dezelfde build werkt op elk (sub)pad.

## Lokaal draaien

```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # productie-build in dist/
```

Zet je pasfoto als `public/avatar.jpg`; ontbreekt die, dan valt de pagina terug op een icoon.
