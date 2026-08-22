import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';

gsap.registerPlugin(SplitText, DrawSVGPlugin, Physics2DPlugin);

/**
 * De openingssequentie: het CV zet zichzelf in elkaar.
 *
 * Alles blijft `from`-gebaseerd, dus de eindtoestand is de gewone CSS-toestand.
 * Geeft een opruimfunctie terug (SplitText moet zijn spans weer opruimen).
 */
export function bouwIntro(): () => void {
  const naam = document.querySelector<HTMLElement>('.name-title');
  const opruimers: Array<() => void> = [];

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. De naam klapt letter per letter uit het niets naar voren.
  if (naam) {
    const split = new SplitText(naam, { type: 'chars', charsClass: 'naam-char' });
    opruimers.push(() => split.revert());

    gsap.set(naam, { perspective: 600 });
    tl.from(split.chars, {
      opacity: 0,
      rotationX: -95,
      y: 26,
      transformOrigin: '50% 50% -30px',
      duration: 0.75,
      stagger: 0.035,
      ease: 'back.out(1.6)',
    });

    // Easter egg: klik op de naam en de letters vliegen weg met echte zwaartekracht.
    const laatVallen = () => {
      if (gsap.isTweening(split.chars)) return;
      gsap
        .timeline()
        .to(split.chars, {
          duration: 0.9,
          physics2D: { velocity: 'random(260, 620)', angle: 'random(235, 305)', gravity: 1100 },
          rotation: 'random(-220, 220)',
          opacity: 0.35,
          stagger: { each: 0.012, from: 'random' },
        })
        .to(split.chars, {
          duration: 0.85,
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          ease: 'back.out(1.7)',
          stagger: { each: 0.012, from: 'random' },
        });
    };

    naam.addEventListener('click', laatVallen);
    opruimers.push(() => naam.removeEventListener('click', laatVallen));
  }

  // 2. De zwarte contactbalk veegt open van links naar rechts.
  tl.from('.contact-strip', { clipPath: 'inset(0 100% 0 0)', duration: 0.75, ease: 'power3.inOut' }, 0.35)
    .from('.contact-strip .contact-entry', { opacity: 0, y: 10, duration: 0.4, stagger: 0.05 }, 0.75);

  // 3. Het terracotta paneel schuift van onder omhoog het blad in.
  tl.from('.page-one .sidebar-terracotta', { clipPath: 'inset(100% 0 0 0)', duration: 0.8, ease: 'power4.inOut' }, 0.5)
    .from('.page-one .edu-block', { opacity: 0, x: -18, duration: 0.45, stagger: 0.07 }, 0.95);

  // 4. Rond de foto wordt een ring getekend.
  tl.from('.photo-arch-frame', { opacity: 0, scale: 0.9, duration: 0.6 }, 0.85).from(
    '.photo-ring rect',
    { drawSVG: '0%', duration: 1.1, ease: 'power2.inOut' },
    1,
  );

  // 5. De hoofdkolom kantelt binnen.
  tl.from(
    '.page-one .main-white > section',
    { opacity: 0, y: 30, rotationX: -8, transformOrigin: '50% 0%', duration: 0.6, stagger: 0.12 },
    0.8,
  );

  // 6. De skill-sliders schieten naar hun waarde en veren na.
  tl.from(
    '.skill-track-dot',
    { left: '0%', opacity: 0, duration: 1, ease: 'elastic.out(1, 0.55)', stagger: 0.07 },
    1.1,
  );

  opruimers.push(() => tl.kill());

  return () => opruimers.forEach((op) => op());
}
