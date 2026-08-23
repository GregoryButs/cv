import { useState, type CSSProperties, type ReactNode } from 'react';
import { Printer, Phone, Mail, Github, ExternalLink, MapPin, User } from 'lucide-react';
import { useCvAnimations } from './useCvAnimations';
import { MaskedPhone } from './MaskedPhone';

import {
  EDUCATION,
  EXPERIENCES,
  FOCUS_AREAS,
  GITHUB_URL,
  LANGUAGES,
  PRIMARY_PROJECTS,
  SECONDARY_PROJECTS,
  SHOWCASE_URL,
  SKILLS,
  BESCHIKBAARHEID,
  type Experience,
  type Project,
} from './cvData';

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
        <svg className="photo-ring" viewBox="0 0 175 235" aria-hidden="true">
          <rect x="4" y="4" width="167" height="227" rx="83.5" ry="83.5" />
        </svg>
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
        <h1 className="name-title" title="Klik eens op mijn naam">
          <span>GREGORY</span>
          <span className="surname-accent">BUTS</span>
        </h1>
        <div className="name-subtitle">.NET · ASP.NET Core Developer</div>
        <div className="beschikbaarheid">{BESCHIKBAARHEID}</div>
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
                  {edu.opmerking && <div className="edu-opmerking">{edu.opmerking}</div>}
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
    <div className="cv-canvas" ref={scope}>
      <div className="floating-toolbar no-print">
        <button onClick={() => window.print()} className="btn-print" title="Afdrukken of Opslaan als PDF">
          <Printer strokeWidth={2} />
          <span>Opslaan als PDF</span>
        </button>
        <a className="versie-link" href="./" title="Terug naar de hoofdpagina">
          ← Home
        </a>
      </div>

      <PageOne />
      <PageTwo />
    </div>
  );
}
