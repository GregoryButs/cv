import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Openingssequentie + scroll-reveals voor het CV.
 *
 * Uitgangspunten:
 * - Alles is `gsap.from()`: de eindtoestand is de natuurlijke CSS-toestand, dus zonder
 *   JavaScript (of bij een fout) staat het CV gewoon volledig zichtbaar op het scherm.
 * - `gsap.matchMedia()` slaat alle motion over bij `prefers-reduced-motion: reduce`.
 * - Print wordt afgeschermd in index.css (`@media print`), niet hier: die regels winnen
 *   ook van GSAP's inline styles als er halverwege een animatie wordt afgedrukt.
 */
export function useCvAnimations() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. Openingssequentie van pagina 1 — leest van boven naar beneden mee.
        //    Absolute posities: de hele sequentie is na ~1,3s klaar en de hoofdkolom
        //    staat er al na ~0,75s, zodat lezen nooit op de animatie hoeft te wachten.
        const intro = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.45 } });

        intro
          .from('.header-banner > *', { opacity: 0, y: 12, stagger: 0.06 }, 0)
          .from('.contact-strip .contact-entry', { opacity: 0, y: 8, duration: 0.35, stagger: 0.04 }, 0.15)
          .from('.page-one .sidebar-terracotta', { opacity: 0, duration: 0.5 }, 0.2)
          .from('.page-one .edu-block', { opacity: 0, y: 10, duration: 0.35, stagger: 0.05 }, 0.3)
          .from('.photo-arch-frame', { opacity: 0, scale: 0.94, duration: 0.5 }, 0.3)
          .from('.page-one .main-white > section', { opacity: 0, y: 16, stagger: 0.1 }, 0.3)
          // 2. Skill-sliders: de punt loopt van links naar zijn niveau.
          .from(
            '.skill-track-dot',
            { left: '0%', opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.05 },
            0.5,
          );

        // 3. Pagina 2 komt binnen tijdens het scrollen — één keer, per blok.
        const revealTargets = gsap.utils.toArray<HTMLElement>(
          '.page-two .main-white > section, .page-two .sidebar-terracotta > div',
        );

        revealTargets.forEach((target) => {
          gsap.from(target, {
            opacity: 0,
            y: 18,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: { trigger: target, start: 'top 88%', once: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return scope;
}
