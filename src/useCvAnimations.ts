import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bouwIntro } from './animations/intro';
import { bouwScrollEffecten } from './animations/scroll';
import { bouwPointerEffecten } from './animations/pointer';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Regelt de volledige animatielaag van het CV.
 *
 * Drie vangnetten die overeind blijven hoe zot de rest ook wordt:
 * 1. Alles is `from`-gebaseerd → zonder JavaScript staat het CV volledig zichtbaar.
 * 2. `gsap.matchMedia()` schakelt alles uit bij `prefers-reduced-motion: reduce`,
 *    en de muis-laag alleen in bij een echte muisaanwijzer.
 * 3. Print wordt in CSS afgeschermd (`@media print`), niet hier — die regels winnen
 *    ook van inline styles die GSAP halverwege een animatie heeft achtergelaten.
 */
export function useCvAnimations() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          beweging: '(prefers-reduced-motion: no-preference)',
          muis: '(hover: hover) and (pointer: fine)',
        },
        (context) => {
          const { beweging, muis } = context.conditions as { beweging: boolean; muis: boolean };
          if (!beweging) return;

          const opruimIntro = bouwIntro();
          bouwScrollEffecten();
          const opruimPointer = muis ? bouwPointerEffecten() : () => {};

          return () => {
            opruimIntro();
            opruimPointer();
          };
        },
      );

      return () => mm.revert();
    },
    { scope },
  );

  return scope;
}
