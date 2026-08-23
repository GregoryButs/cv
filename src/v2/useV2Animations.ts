import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText);

/**
 * Animatie- en navigatielaag van het venster-ontwerp.
 *
 * Bijzonderheid tegenover v1: niet de pagina scrollt, maar één kolom binnen het
 * venster. Die kolom is dus de `scroller` van elke ScrollTrigger — behalve op
 * smalle schermen, waar het venster openvouwt tot een gewone pagina.
 */
export function useV2Animations(kolom: RefObject<HTMLDivElement>) {
  const venster = useRef<HTMLDivElement>(null);
  const [actieveSectie, setActieveSectie] = useState('over');

  // Actieve sectie in de rail.
  //
  // Niet met een IntersectionObserver-drempel: secties zijn hier veel hoger dan
  // het zichtbare deel van de kolom (projecten is ~1300px in een venster van
  // 760px), waardoor zo'n sectie nooit een zichtbaarheidsdrempel haalt en het
  // icoon dus nooit oplicht. In plaats daarvan één leeslijn op 30% van de
  // hoogte: actief is de laatste sectie die daar voorbij is.
  useEffect(() => {
    const container = kolom.current;
    if (!container) return;

    const secties = [...container.querySelectorAll<HTMLElement>('.v2-sectie')];
    if (secties.length === 0) return;

    const internScrollend = () => container.scrollHeight > container.clientHeight + 10;
    let frame = 0;

    const bepaal = () => {
      frame = 0;
      const intern = internScrollend();
      const grens = intern
        ? container.getBoundingClientRect().top + container.clientHeight * 0.3
        : window.innerHeight * 0.3;

      const onderaan = intern
        ? container.scrollTop + container.clientHeight >= container.scrollHeight - 4
        : window.scrollY + window.innerHeight >= document.body.scrollHeight - 4;

      if (onderaan) {
        setActieveSectie(secties[secties.length - 1].id);
        return;
      }

      let actief = secties[0];
      for (const sectie of secties) {
        if (sectie.getBoundingClientRect().top <= grens) actief = sectie;
      }
      setActieveSectie(actief.id);
    };

    const plan = () => {
      if (!frame) frame = requestAnimationFrame(bepaal);
    };

    container.addEventListener('scroll', plan, { passive: true });
    window.addEventListener('scroll', plan, { passive: true });
    window.addEventListener('resize', plan);
    bepaal();

    return () => {
      container.removeEventListener('scroll', plan);
      window.removeEventListener('scroll', plan);
      window.removeEventListener('resize', plan);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [kolom]);

  const gaNaar = useCallback(
    (id: string) => {
      const container = kolom.current;
      const doel = container?.querySelector<HTMLElement>(`#${id}`);
      if (!container || !doel) return;

      const intern = container.scrollHeight > container.clientHeight + 10;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        doel.scrollIntoView({ block: 'start' });
        return;
      }

      gsap.to(intern ? container : window, {
        duration: 0.8,
        ease: 'power3.inOut',
        scrollTo: { y: doel, offsetY: intern ? 24 : 80 },
      });
    },
    [kolom],
  );

  useGSAP(
    () => {
      const container = kolom.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const intern = container.scrollHeight > container.clientHeight + 10;
        const scroller = intern ? container : undefined;
        const split = new SplitText('.v2-naam', { type: 'chars', charsClass: 'v2-naam-char' });

        // 1. Het venster bouwt zich op: rail, fotopaneel, dan de eerste sectie.
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('.v2-window', { opacity: 0, y: 26, duration: 0.7 })
          .from('.v2-rail-knop, .v2-monogram, .v2-rail-versie', { opacity: 0, x: -14, duration: 0.45, stagger: 0.06 }, 0.2)
          .from('.v2-foto', { clipPath: 'inset(100% 0 0 0)', duration: 0.85, ease: 'power4.out' }, 0.15)
          .from(split.chars, { opacity: 0, y: 24, rotationX: -70, duration: 0.6, stagger: 0.03 }, 0.5)
          .from('.v2-rol, .v2-sociaal a', { opacity: 0, y: 12, duration: 0.4, stagger: 0.05 }, 0.75)
          .from('#over .v2-titel, #over .v2-kruimels, #over .v2-tekst', { opacity: 0, y: 18, duration: 0.5, stagger: 0.08 }, 0.45);

        // 2. Elke sectie komt binnen terwijl de kolom scrollt.
        gsap.utils.toArray<HTMLElement>('.v2-sectie:not(#over)').forEach((sectie) => {
          gsap.from(sectie.children, {
            opacity: 0,
            y: 26,
            duration: 0.55,
            ease: 'power3.out',
            stagger: 0.07,
            scrollTrigger: { trigger: sectie, scroller, start: 'top 88%', once: true },
          });
        });

        // 3. Kerncijfers tellen op zodra ze in beeld komen.
        gsap.utils.toArray<HTMLElement>('.v2-stat-waarde').forEach((el) => {
          const doel = Number(el.dataset.waarde ?? 0);
          const achtervoegsel = el.dataset.achtervoegsel ?? '';
          const teller = { n: 0 };

          gsap.to(teller, {
            n: doel,
            duration: 1.4,
            ease: 'power2.out',
            snap: { n: 1 },
            onUpdate: () => {
              el.textContent = `${Math.round(teller.n)}${achtervoegsel}`;
            },
            scrollTrigger: { trigger: el, scroller, start: 'top 95%', once: true },
          });
        });

        // 4. De vaardigheidsbalken lopen vol.
        gsap.utils.toArray<HTMLElement>('.v2-balk-vulling').forEach((balk) => {
          gsap.from(balk, {
            width: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: balk, scroller, start: 'top 95%', once: true },
          });
        });

        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope: venster, dependencies: [] },
  );

  return { venster, actieveSectie, gaNaar };
}
