import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(useGSAP, ScrambleTextPlugin);

/**
 * Telefoonnummer achter animatiesterretjes.
 *
 * De cijfers staan nergens leesbaar in de HTML-bron of in de bundel: ze worden pas
 * na een klik uit hun char codes samengesteld. Een scraper die de pagina uitleest,
 * vindt dus enkel sterretjes — een mens die het nummer nodig heeft, klikt één keer.
 */
const PHONE_CODES = [48, 52, 55, 48, 48, 50, 53, 54, 52, 57];

/** Non-breaking spaces, zodat de sterretjes in de contactstrip niet afbreken. */
const MASK = '✱✱✱✱ / ✱✱ ✱✱ ✱✱';

function leesNummer() {
  const cijfers = String.fromCharCode(...PHONE_CODES);
  return {
    cijfers,
    weergave: `${cijfers.slice(0, 4)} / ${cijfers.slice(4, 6)} ${cijfers.slice(6, 8)} ${cijfers.slice(8, 10)}`,
  };
}

export function MaskedPhone() {
  const [nummer, setNummer] = useState<ReturnType<typeof leesNummer> | null>(null);
  const scope = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (nummer) {
          // Onthullen: de sterretjes scramblen weg en laten de cijfers achter.
          gsap.to('.phone-value', {
            duration: 0.9,
            ease: 'none',
            scrambleText: { text: nummer.weergave, chars: '✱✦✧0123456789', speed: 0.45, revealDelay: 0.1 },
          });
          return;
        }

        // Verborgen: traag, laag-amplitude twinkelen. Geen stagger vanaf links maar
        // willekeurig, anders leest het als een voortgangsbalk in plaats van sterren.
        gsap.to('.phone-star', {
          opacity: 0.45,
          scale: 0.82,
          duration: 0.9,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.16, from: 'random' },
        });
      });

      return () => mm.revert();
    },
    { scope, dependencies: [nummer] },
  );

  if (nummer) {
    return (
      <span ref={scope}>
        <a className="phone-value" href={`tel:${nummer.cijfers}`}>
          {nummer.weergave}
        </a>
      </span>
    );
  }

  return (
    <span ref={scope}>
      <button
        type="button"
        className="phone-mask"
        onClick={() => setNummer(leesNummer())}
        title="Klik om het telefoonnummer te tonen"
        aria-label="Telefoonnummer tonen"
      >
        <span aria-hidden="true">
          {[...MASK].map((teken, i) =>
            teken === '✱' ? (
              <span key={i} className="phone-star">
                ✱
              </span>
            ) : (
              <span key={i}>{teken}</span>
            ),
          )}
        </span>
      </button>
    </span>
  );
}
