/* ---------------------------------------------------------------------------
 * Eén bron voor de inhoud van het CV — gebruikt door beide ontwerpen
 * (App.tsx = editorial print-versie, v2/AppV2.tsx = donkere venster-versie).
 * Blijft inhoudelijk gelijk met CV/standalone/gregory-buts-cv.html.
 * ------------------------------------------------------------------------- */

import type { ReactNode } from 'react';

export interface ProjectLink {
  label: string;
  url: string;
  /** Tooltiptekst: vertelt wat de bezoeker achter de link vindt. */
  titel: string;
}

/** Kerncijfers van een project — getoond als cijferstrook onder het project. */
export interface Stat {
  waarde: number;
  achtervoegsel?: string;
  label: string;
}

export const STATS: Stat[] = [
  { waarde: 695, label: 'xUnit-tests' },
  { waarde: 372, label: 'Vitest-tests' },
  { waarde: 90, achtervoegsel: '%+', label: 'testdekking' },
  { waarde: 50, label: 'threads stress test' },
];

export interface Project {
  title: string;
  meta: string;
  company: string;
  stack: string[];
  description: string;
  bullets: ReactNode[];
  links: ProjectLink[];
  /** Optionele cijferstrook; alleen zinvol bij een project met harde metrics. */
  stats?: Stat[];
}

export interface Experience {
  title: string;
  meta: string;
  company: string;
  bullets?: string[];
  description?: string;
}

export interface Education {
  degree: string;
  period: string;
  school: string;
  /** Optionele toelichting, bv. wat er nog rest van de opleiding. */
  opmerking?: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface FocusArea {
  title: string;
  items: string;
}

export const PRIMARY_PROJECTS: Project[] = [
  {
    title: 'De Verstandhouding — Zorgplatform',
    meta: 'Heden · Full-Stack Developer',
    company: 'De Verstandhouding · Eerstelijnspsychologische Praktijk',
    stack: ['ASP.NET Core 10 LTS', 'C# 13', 'EF Core 10', 'React 19', 'TypeScript', 'Hangfire', 'HL7 FHIR R4'],
    description:
      'Live zorgplatform voor eerstelijnspsychologische zorg: planning, digitaal patiëntendossier (SOEP) en ELP-sessieopvolging in één geïntegreerd systeem.',
    bullets: [
      <>
        Modulair platform ontworpen en gebouwd met <strong>CQRS-scheiding tussen lees- en
        schrijfmodellen</strong>, ontkoppelde C# controllers en services, en een expliciet gemodelleerd domein.
      </>,
      <>
        Atomaire beschikbaarheidsengine (<em>SlotCalculator</em>) met <strong>Lock-synchronisatie</strong>:
        double-bookings 100% uitgesloten, bewezen met 50-thread stress tests.
      </>,
      <>
        Medische data-privacy (GDPR) via <strong>AES-256 GCM veld-encryptie</strong> in EF Core, BOLA/IDOR-autorisatie en
        OWASP-mitigatie.
      </>,
      <>
        Realtime 2-weg Google Calendar-synchronisatie, Google Meet links en asynchrone e-mailherinneringen via{' '}
        <strong>Hangfire</strong>.
      </>,
      <>
        Belgische zorgwetgeving (ELP/RIZIV): geautomatiseerde opvolging van het 8-sessiescontingent, met
        export voor registratie in het eHealth/ELP-portaal.
      </>,
      <>
        <strong>90%+ geautomatiseerde testdekking</strong> (695 xUnit- en 372 Vitest-tests) in CI/CD pipeline met
        zero-downtime deployment.
      </>,
    ],
    links: [
      {
        label: '🌟 Showcase Case Study ↗',
        url: 'https://gregorybuts.github.io/de-verstandhouding-showcase/',
        titel: 'Case study van De Verstandhouding: architectuur, ontwerpkeuzes en resultaten',
      },
      {
        label: '🌐 deverstandhouding.be ↗',
        url: 'https://www.deverstandhouding.be',
        titel: 'De live praktijkwebsite waarop het platform draait',
      },
    ],
    stats: STATS,
  },
];

export const SECONDARY_PROJECTS: Project[] = [
  {
    title: 'NextUp Matching Platform',
    meta: '2025 — 2026 · Full-Stack Developer',
    company: 'NextUp vzw · Studenten- & Bedrijfsportaal',
    stack: ['ASP.NET Core Web API', 'EF Core', 'SQL Server', 'PostgreSQL', 'React', 'Tailwind CSS'],
    description:
      'Gecentraliseerd systeem dat studenten aan mentoren koppelt via bedrijfssponsoring — publiek portaal én beheerdersdashboard.',
    bullets: [
      'ASP.NET Core Web API als centrale backend service met Entity Framework Core op SQL Server en PostgreSQL.',
      'Het relationele datamodel van de grond af ontworpen en complexe matching-algoritmen in C# gerealiseerd.',
      'Herbruikbare React-componenten en interactieve dashboards opgezet voor het studenten- en sponsorportaal.',
    ],
    links: [],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    title: 'Administratief Manager & IT-Coördinator',
    meta: 'Oktober 2013 — December 2023 (10 jaar)',
    company: 'School zonder Racisme vzw · Brussel',
    bullets: [
      'Operationeel verantwoordelijk voor websitebeheer (CMS), SharePoint-omgevingen, e-mailinfrastructuur en CRM — de technische kant van een organisatie in de praktijk geleerd.',
      'Noden van scholen geanalyseerd en educatieve trajecten gecoördineerd van intake tot tijdige oplevering.',
      'Complexe meerjarige subsidiedossiers uitgeschreven, gemonitord en gerapporteerd met strikte deadline-opvolging.',
      'Scharnierfunctie tussen externe IT-leveranciers en het interne team voor procesoptimalisatie en digitalisering.',
    ],
  },
  {
    title: 'Studenten- en interimjobs',
    meta: '2004 — 2013 · naast mijn studies',
    company: 'Silhouette CC · Colruyt · Vanden Borre e.a.',
    description:
      'Klantenservice, teamcoördinatie, promotie en logistiek beheer, gecombineerd met voltijdse studies. Basis gelegd voor sterke communicatie, verantwoordelijkheid en flexibiliteit in multidisciplinaire teams.',
  },
];

export const EDUCATION: Education[] = [
  {
    degree: 'Graduaat Programmeren',
    period: '2023 — 2026/2027',
    school: 'Odisee Hogeschool (Full-Stack)',
    opmerking: 'Enkel het afstudeerproject rest, uit te voeren op een programmeerwerkplek.',
  },
  { degree: 'Bachelor Criminologie', period: '2006 — 2012', school: 'Vrije Universiteit Brussel (VUB)' },
  { degree: 'ASO Latijn — Wiskunde/Talen', period: '1999 — 2005', school: 'Koninklijk Atheneum Halle' },
];

export const SKILLS: Skill[] = [
  { name: 'C# 13 · .NET 10 LTS', level: '92%' },
  { name: 'ASP.NET Core Web API', level: '90%' },
  { name: 'Entity Framework Core 10', level: '88%' },
  { name: 'React 19 · TypeScript', level: '82%' },
  { name: 'xUnit · Hangfire · CI/CD', level: '86%' },
];

export const LANGUAGES = [
  { name: 'Nederlands', level: 'Moedertaal' },
  { name: 'Engels', level: 'Vloeiend (C2)' },
  { name: 'Frans', level: 'Goed (B2)' },
  { name: 'Duits & Spaans', level: 'Basis' },
];

export const FOCUS_AREAS: FocusArea[] = [
  { title: 'Architectuur & Patterns', items: 'CQRS-modelscheiding, domeingedreven modellering, REST API Design, Modular Monolith, ADR-praktijk' },
  { title: 'Kwaliteit & Security', items: 'TDD, xUnit (620+ tests), Concurrency Locks, AES-256 GCM, OWASP mitigatie' },
  { title: 'Databases & DevOps', items: 'SQL Server, PostgreSQL, EF Core 10, GitHub Actions CI/CD, Docker' },
];

export const SHOWCASE_URL = 'https://gregorybuts.github.io/de-verstandhouding-showcase/';
export const GITHUB_URL = 'https://github.com/GregoryButs';


/** Contactgegevens die in beide ontwerpen terugkomen. */
export const EMAIL = 'buts0038@gmail.com';
export const LOCATIE = 'Geraardsbergen, België';
export const ROL = '.NET · ASP.NET Core Developer';
export const BESCHIKBAARHEID = 'Onmiddellijk beschikbaar';
export const SITE_URL = 'https://www.deverstandhouding.be';

/** Tooltipteksten voor de vaste links, gedeeld door beide ontwerpen. */
export const TOOLTIPS = {
  email: `E-mail sturen naar ${EMAIL}`,
  github: 'GitHub-profiel van Gregory Buts: broncode van de projecten',
  showcase: 'Case study van De Verstandhouding: architectuur, ontwerpkeuzes en resultaten',
  site: 'De live praktijkwebsite waarop het platform draait',
  locatie: `Woonplaats: ${LOCATIE}`,
} as const;
