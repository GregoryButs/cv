import { useState, type CSSProperties, type ReactNode } from 'react';
import { Printer, Phone, Mail, Github, ExternalLink, MapPin, User } from 'lucide-react';
import { useCvAnimations } from './useCvAnimations';
import { MaskedPhone } from './MaskedPhone';

/* ---------------------------------------------------------------------------
 * Data — identiek gehouden met CV/standalone/gregory-buts-cv.html.
 * Die HTML is de bron van waarheid voor inhoud én design.
 * ------------------------------------------------------------------------- */

interface ProjectLink {
  label: string;
  url: string;
}

interface Project {
  title: string;
  meta: string;
  company: string;
  stack: string[];
  description: string;
  bullets: ReactNode[];
  links: ProjectLink[];
}

interface Experience {
  title: string;
  meta: string;
  company: string;
  bullets?: string[];
  description?: string;
}

interface Education {
  degree: string;
  period: string;
  school: string;
}

interface Skill {
  name: string;
  level: string;
}

interface FocusArea {
  title: string;
  items: string;
}

const PRIMARY_PROJECTS: Project[] = [
  {
    title: 'De Verstandhouding — Zorgplatform',
    meta: 'Heden · Full-Stack Developer',
    company: 'De Verstandhouding · Eerstelijnspsychologische Praktijk',
    stack: ['ASP.NET Core 10 LTS', 'C# 13', 'EF Core 10', 'React 19', 'TypeScript', 'Hangfire', 'HL7 FHIR R4'],
    description:
      'Live zorgplatform voor eerstelijnspsychologische zorg: planning, digitaal patiëntendossier (SOEP) en facturatie in één geïntegreerd systeem.',
    bullets: [
      <>
        Modulair platform ontworpen en gebouwd volgens <strong>Domain-Driven Design (DDD)</strong> en <strong>CQRS</strong>{' '}
        met ontkoppelde C# controllers en services.
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
        Belgische zorgwetgeving (ELP/RIZIV): geautomatiseerde opvolging van het 8-sessiescontingent met 1-click
        facturatie-export.
      </>,
      <>
        <strong>90%+ geautomatiseerde testdekking</strong> (423 xUnit- en 177 Vitest-tests) in CI/CD pipeline met
        zero-downtime deployment.
      </>,
    ],
    links: [
      { label: '🌟 Showcase Case Study ↗', url: 'https://gregorybuts.github.io/de-verstandhouding-showcase/' },
      { label: '🌐 deverstandhouding.be ↗', url: 'https://www.deverstandhouding.be' },
      { label: '📁 GitHub Repository ↗', url: 'https://github.com/GregoryButs' },
    ],
  },
];

const SECONDARY_PROJECTS: Project[] = [
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

const EXPERIENCES: Experience[] = [
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
    title: 'Eerdere Professionele Ervaring',
    meta: '2004 — 2013 (9 jaar)',
    company: 'Silhouette CC · Colruyt · Vanden Borre e.a.',
    description:
      'Klantenservice, teamcoördinatie, promotie en logistiek beheer. Basis gelegd voor sterke communicatie, verantwoordelijkheid en flexibiliteit in multidisciplinaire projectteams.',
  },
];

const EDUCATION: Education[] = [
  { degree: 'Graduaat Programmeren', period: '2023 — Heden (Verwacht: 2027)', school: 'Odisee Hogeschool (Full-Stack)' },
  { degree: 'Bachelor Criminologie', period: '2006 — 2012', school: 'Vrije Universiteit Brussel (VUB)' },
  { degree: 'ASO Latijn — Wiskunde/Talen', period: '1999 — 2005', school: 'Koninklijk Atheneum Halle' },
];

const SKILLS: Skill[] = [
  { name: 'C# 13 · .NET 10 LTS', level: '92%' },
  { name: 'ASP.NET Core Web API', level: '90%' },
  { name: 'Entity Framework Core 10', level: '88%' },
  { name: 'React 19 · TypeScript', level: '82%' },
  { name: 'xUnit · Hangfire · CI/CD', level: '86%' },
];

const LANGUAGES = [
  { name: 'Nederlands', level: 'Moedertaal' },
  { name: 'Engels', level: 'Vloeiend (C2)' },
  { name: 'Frans', level: 'Goed (B2)' },
  { name: 'Duits & Spaans', level: 'Basis' },
];

const FOCUS_AREAS: FocusArea[] = [
  { title: 'Architectuur & Patterns', items: 'DDD, CQRS, Vertical Slice, REST API Design, Clean Architecture' },
  { title: 'Kwaliteit & Security', items: 'TDD, xUnit (420+ tests), Concurrency Locks, AES-256 GCM, OWASP mitigatie' },
  { title: 'Databases & DevOps', items: 'SQL Server, PostgreSQL, EF Core 10, GitHub Actions CI/CD, Docker' },
];

const SHOWCASE_URL = 'https://gregorybuts.github.io/de-verstandhouding-showcase/';
const GITHUB_URL = 'https://github.com/GregoryButs';

/* ---------------------------------------------------------------------------
 * Herbruikbare bouwstenen
 * ------------------------------------------------------------------------- */

function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="bullet-list">
      {items.map((item, index) => (
        <li key={index}>
          <span className="bullet-dash">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="entry-card">
      <div className="entry-heading">
        <span>{project.title}</span>
      </div>
      <div className="entry-meta">{project.meta}</div>
      <div className="entry-subtitle">{project.company}</div>

      <div className="tech-pill-row">
        {project.stack.map((tech) => (
          <span key={tech} className="tech-pill">
            {tech}
          </span>
        ))}
      </div>

      <p className="entry-description">{project.description}</p>

      <BulletList items={project.bullets} />

      {project.links.length > 0 && (
        <div className="action-links-row">
          {project.links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="action-link">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="entry-card">
      <div className="entry-heading">
        <span>{experience.title}</span>
      </div>
      <div className="entry-meta">{experience.meta}</div>
      <div className="entry-subtitle">{experience.company}</div>

      {experience.bullets && <BulletList items={experience.bullets} />}
      {experience.description && <p className="entry-description">{experience.description}</p>}
    </article>
  );
}

function ProfilePhoto() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <div className="photo-arch-container">
      <div className="photo-arch-frame">
        {photoFailed ? (
          <User />
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}avatar.jpg`}
            alt="Gregory Buts"
            onError={() => setPhotoFailed(true)}
          />
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Pagina 1 & 2 (vaste A4-pagina's, net als de statische HTML)
 * ------------------------------------------------------------------------- */

function PageOne() {
  return (
    <div className="cv-page page-one">
      <header className="header-banner">
        <h1 className="name-title">
          <span>GREGORY</span>
          <span className="surname-accent">BUTS</span>
        </h1>
        <div className="name-subtitle">.NET · ASP.NET Core Developer</div>
      </header>

      <div className="contact-strip">
        <div className="contact-entry">
          <Phone strokeWidth={2} />
          <MaskedPhone />
        </div>

        <div className="contact-entry">
          <Mail strokeWidth={2} />
          <a href="mailto:buts0038@gmail.com">buts0038@gmail.com</a>
        </div>

        <div className="contact-entry">
          <Github strokeWidth={2} />
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            github.com/GregoryButs
          </a>
        </div>

        <div className="contact-entry">
          <ExternalLink strokeWidth={2} />
          <a href={SHOWCASE_URL} target="_blank" rel="noopener noreferrer" className="showcase-highlight">
            Showcase Case Study ↗
          </a>
        </div>

        <div className="contact-entry">
          <MapPin strokeWidth={2} />
          <span>Geraardsbergen, België</span>
        </div>
      </div>

      <div className="body-split-wrapper">
        <div className="left-white-margin" />

        <aside className="sidebar-terracotta page-1-sidebar">
          <div className="sidebar-top-block">
            <h2 className="sidebar-section-heading">Opleidingen</h2>
            <div className="edu-group">
              {EDUCATION.map((edu) => (
                <div key={edu.degree} className="edu-block">
                  <div className="edu-degree-title">{edu.degree}</div>
                  <div className="edu-period">{edu.period}</div>
                  <div className="edu-institution">{edu.school}</div>
                </div>
              ))}
            </div>
          </div>

          <ProfilePhoto />

          <div className="sidebar-bottom-block">
            <h2 className="sidebar-section-heading">Vaardigheden</h2>
            <div className="skills-slider-list">
              {SKILLS.map((skill) => (
                <div key={skill.name} className="skill-slider-row">
                  <span className="skill-slider-label">{skill.name}</span>
                  <div className="skill-track">
                    <div className="skill-track-dot" style={{ '--dot-left': skill.level } as CSSProperties} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="main-white">
          <section>
            <h2 className="main-section-title">Over Mij</h2>
            <p className="about-text">
              Ik bouw backends waar je op kán bouwen. <strong>C# en ASP.NET Core</strong> zijn mijn thuisbasis — van Web
              API-ontwerp en EF Core-datamodellen tot authenticatie met Identity. Daarnaast breng ik bijna tien jaar mee
              als <strong>administratief manager en IT-coördinator</strong>: ik ken de kant van de organisatie die
              uiteindelijk met de software moet werken. Voor <em>De Verstandhouding</em> bouwde ik als lead architect een
              live zorgplatform op DDD en CQRS, met 90%+ testdekking. Criminologie leerde me complexe systemen uit elkaar
              halen tot ze kloppen; die reflex gebruik ik nu in code, databases en architectuur.
            </p>
          </section>

          <section>
            <h2 className="main-section-title">Projecten</h2>
            <div className="entry-list">
              {PRIMARY_PROJECTS.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function PageTwo() {
  return (
    <div className="cv-page page-two">
      <div className="body-split-wrapper full-height">
        <div className="left-white-margin" />

        <aside className="sidebar-terracotta">
          <div>
            <h2 className="sidebar-section-heading">Talen</h2>
            <div className="lang-pill-list">
              {LANGUAGES.map((lang) => (
                <div key={lang.name} className="lang-row">
                  <span className="name">{lang.name}</span>
                  <span className="level">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="sidebar-section-heading">Kernfocus</h2>
            {FOCUS_AREAS.map((focus) => (
              <div key={focus.title} className="sidebar-focus-card">
                <strong>{focus.title}</strong>
                <div>{focus.items}</div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="sidebar-section-heading">Portfolio &amp; Code</h2>
            <div className="sidebar-portfolio-list">
              <div>
                🌟 <strong>Case Study:</strong>{' '}
                <a href={SHOWCASE_URL} target="_blank" rel="noopener noreferrer">
                  gregorybuts.github.io
                </a>
              </div>
              <div>
                📁 <strong>GitHub:</strong>{' '}
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  github.com/GregoryButs
                </a>
              </div>
            </div>
          </div>
        </aside>

        <main className="main-white page-2-main">
          <section>
            <h2 className="main-section-title">Vervolg Projecten</h2>
            <div className="entry-list">
              {SECONDARY_PROJECTS.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="main-section-title">Werkervaring</h2>
            <div className="entry-list">
              {EXPERIENCES.map((experience) => (
                <ExperienceCard key={experience.title} experience={experience} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const scope = useCvAnimations();

  return (
    // display:contents houdt de flex-layout van #root intact; de div dient enkel
    // als scope-container voor GSAP (automatische cleanup via useGSAP).
    <div ref={scope} style={{ display: 'contents' }}>
      <div className="floating-toolbar no-print">
        <button onClick={() => window.print()} className="btn-print" title="Afdrukken of Opslaan als PDF">
          <Printer strokeWidth={2} />
          <span>Opslaan als PDF</span>
        </button>
      </div>

      <PageOne />
      <PageTwo />
    </div>
  );
}
