# CV — Gregory Buts

Interactieve versie van mijn CV. React 19 + TypeScript + Vite, met een GSAP-openingssequentie
en scroll-reveals. Print- en PDF-uitvoer is exact twee A4-pagina's.

**Live:** https://gregorybuts.github.io/cv/

## Opzet

| Pad | Rol |
| --- | --- |
| `src/App.tsx` | Inhoud (typed arrays) en de twee A4-pagina's |
| `src/index.css` | Volledige stylesheet, inclusief de strikte print-regels |
| `src/useCvAnimations.ts` | GSAP-timeline en ScrollTrigger-reveals |

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
