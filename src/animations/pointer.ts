import gsap from 'gsap';

/**
 * Muis-gestuurde laag: de bladen kantelen mee, knoppen worden magnetisch en
 * over de contactbalk loopt een spotlight. Alleen op echte muisaanwijzers.
 */
export function bouwPointerEffecten(): () => void {
  const opruimers: Array<() => void> = [];

  // 1. Beide A4-bladen kantelen subtiel mee met de cursor.
  gsap.utils.toArray<HTMLElement>('.cv-page').forEach((blad) => {
    gsap.set(blad, { transformPerspective: 1600, transformOrigin: '50% 50%' });
    const naarY = gsap.quickTo(blad, 'rotationY', { duration: 0.7, ease: 'power3' });
    const naarX = gsap.quickTo(blad, 'rotationX', { duration: 0.7, ease: 'power3' });

    const beweeg = (e: MouseEvent) => {
      const vak = blad.getBoundingClientRect();
      naarY(gsap.utils.clamp(-3.5, 3.5, ((e.clientX - (vak.left + vak.width / 2)) / vak.width) * 7));
      naarX(gsap.utils.clamp(-2.5, 2.5, (((vak.top + vak.height / 2) - e.clientY) / vak.height) * 5));
    };
    const herstel = () => {
      naarY(0);
      naarX(0);
    };

    blad.addEventListener('mousemove', beweeg);
    blad.addEventListener('mouseleave', herstel);
    opruimers.push(() => {
      blad.removeEventListener('mousemove', beweeg);
      blad.removeEventListener('mouseleave', herstel);
    });
  });

  // 2. Magnetische knoppen: ze trekken naar de cursor en veren terug.
  gsap.utils.toArray<HTMLElement>('.action-link, .btn-print').forEach((knop) => {
    const naarX = gsap.quickTo(knop, 'x', { duration: 0.35, ease: 'power3' });
    const naarY = gsap.quickTo(knop, 'y', { duration: 0.35, ease: 'power3' });

    const trek = (e: MouseEvent) => {
      const vak = knop.getBoundingClientRect();
      naarX((e.clientX - (vak.left + vak.width / 2)) * 0.35);
      naarY((e.clientY - (vak.top + vak.height / 2)) * 0.5);
    };
    const los = () => {
      gsap.to(knop, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' });
    };

    knop.addEventListener('mousemove', trek);
    knop.addEventListener('mouseleave', los);
    opruimers.push(() => {
      knop.removeEventListener('mousemove', trek);
      knop.removeEventListener('mouseleave', los);
    });
  });

  // 3. Spotlight die over de zwarte contactbalk glijdt.
  const balk = document.querySelector<HTMLElement>('.contact-strip');
  if (balk) {
    const zetX = gsap.quickSetter(balk, '--spot-x', 'px');
    const zetY = gsap.quickSetter(balk, '--spot-y', 'px');
    const volg = (e: MouseEvent) => {
      const vak = balk.getBoundingClientRect();
      zetX(e.clientX - vak.left);
      zetY(e.clientY - vak.top);
    };
    balk.addEventListener('mousemove', volg);
    opruimers.push(() => balk.removeEventListener('mousemove', volg));
  }

  return () => opruimers.forEach((op) => op());
}
