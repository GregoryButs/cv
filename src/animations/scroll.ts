import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-gestuurde laag: parallax op de kolommen en reveals per blok.
 * Alle triggers worden door de aanroeper opgeruimd via matchMedia-revert.
 */
export function bouwScrollEffecten() {
  // 1. Parallax: het terracotta paneel loopt trager dan het blad, de foto zoomt mee.
  gsap.utils.toArray<HTMLElement>('.sidebar-terracotta').forEach((paneel) => {
    gsap.to(paneel, {
      yPercent: -4,
      ease: 'none',
      scrollTrigger: { trigger: paneel.closest('.cv-page'), start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    });
  });

  gsap.to('.photo-arch-frame img, .photo-arch-frame svg', {
    scale: 1.12,
    ease: 'none',
    scrollTrigger: { trigger: '.page-one', start: 'top top', end: 'bottom top', scrub: 0.8 },
  });

  // 2. Pagina 2 komt blok per blok binnen, met een lichte 3D-kanteling.
  gsap.utils
    .toArray<HTMLElement>('.page-two .main-white > section, .page-two .sidebar-terracotta > div')
    .forEach((blok) => {
      gsap.from(blok, {
        opacity: 0,
        y: 44,
        rotationX: -10,
        transformOrigin: '50% 0%',
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: blok, start: 'top 90%', once: true },
      });
    });

  // 3. Tech-pills klappen als kaartjes open zodra ze in beeld komen.
  gsap.utils.toArray<HTMLElement>('.tech-pill-row').forEach((rij) => {
    gsap.from(rij.children, {
      opacity: 0,
      rotationY: -75,
      x: -14,
      transformOrigin: 'left center',
      duration: 0.5,
      ease: 'back.out(1.4)',
      stagger: 0.045,
      scrollTrigger: { trigger: rij, start: 'top 92%', once: true },
    });
  });

  // 4. De bullets van elk project schuiven één voor één in.
  gsap.utils.toArray<HTMLElement>('.bullet-list').forEach((lijst) => {
    gsap.from(lijst.children, {
      opacity: 0,
      x: -16,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.06,
      scrollTrigger: { trigger: lijst, start: 'top 92%', once: true },
    });
  });
}
