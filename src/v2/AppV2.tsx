import { useRef, useState } from 'react';
import {
  ArrowUpRight,
  Briefcase,
  ExternalLink,
  FolderGit2,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import {
  EDUCATION,
  EMAIL,
  EXPERIENCES,
  GITHUB_URL,
  LANGUAGES,
  LOCATIE,
  PRIMARY_PROJECTS,
  ROL,
  SECONDARY_PROJECTS,
  SHOWCASE_URL,
  SKILLS,
  type Project,
} from '../cvData';
import { MaskedPhone } from '../MaskedPhone';
import { useV2Animations } from './useV2Animations';

const SECTIES = [
  { id: 'over', label: 'Over mij', icoon: User },
  { id: 'projecten', label: 'Projecten', icoon: FolderGit2 },
  { id: 'ervaring', label: 'Werkervaring', icoon: Briefcase },
  { id: 'opleiding', label: 'Opleiding & talen', icoon: GraduationCap },
  { id: 'contact', label: 'Contact', icoon: Mail },
] as const;

const ALLE_PROJECTEN = [...PRIMARY_PROJECTS, ...SECONDARY_PROJECTS];

function ProjectBlok({ project }: { project: Project }) {
  return (
    <article className="v2-project">
      <header className="v2-project-kop">
        <h4>{project.title}</h4>
        <span className="v2-meta">{project.meta}</span>
      </header>
      <p className="v2-project-bedrijf">{project.company}</p>

      <ul className="v2-stack">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <p className="v2-tekst">{project.description}</p>

      <ul className="v2-bullets">
        {project.bullets.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>

      {project.stats && (
        <div className="v2-stats">
          {project.stats.map((stat) => (
            <div key={stat.label} className="v2-stat">
              <span className="v2-stat-waarde" data-waarde={stat.waarde} data-achtervoegsel={stat.achtervoegsel ?? ''}>
                {stat.waarde}
                {stat.achtervoegsel ?? ''}
              </span>
              <span className="v2-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      {project.links.length > 0 && (
        <div className="v2-knoppen">
          {project.links.map((link) => (
            <a key={link.url} className="v2-knop" href={link.url} target="_blank" rel="noopener noreferrer">
              {link.label.replace(/^[^\w]+\s*/, '').replace(' ↗', '')}
              <ArrowUpRight />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export default function AppV2() {
  const [fotoMislukt, setFotoMislukt] = useState(false);
  const kolom = useRef<HTMLDivElement>(null);
  const { venster, actieveSectie, gaNaar } = useV2Animations(kolom);

  return (
    <div className="v2-shell">
      <div className="v2-window" ref={venster}>
        {/* Icoonrail */}
        <nav className="v2-rail" aria-label="Secties">
          <span className="v2-monogram">GB</span>
          <ul>
            {SECTIES.map(({ id, label, icoon: Icoon }) => (
              <li key={id}>
                <button
                  type="button"
                  className={`v2-rail-knop${actieveSectie === id ? ' is-actief' : ''}`}
                  onClick={() => gaNaar(id)}
                  title={label}
                  aria-label={label}
                  aria-current={actieveSectie === id ? 'true' : undefined}
                >
                  <Icoon strokeWidth={1.6} />
                </button>
              </li>
            ))}
          </ul>
          <a className="v2-rail-versie" href="./index.html" title="Naar de printbare versie">
            v1
          </a>
        </nav>

        {/* Fotopaneel dat boven en onder buiten het venster steekt */}
        <aside className="v2-foto">
          <div className="v2-foto-beeld">
            {fotoMislukt ? (
              <User className="v2-foto-fallback" strokeWidth={1.2} />
            ) : (
              <img src={`${import.meta.env.BASE_URL}avatar.jpg`} alt="Gregory Buts" onError={() => setFotoMislukt(true)} />
            )}
          </div>

          <div className="v2-foto-kaart">
            <h1 className="v2-naam">
              Gregory <span>Buts</span>
            </h1>
            <p className="v2-rol">{ROL}</p>
            <div className="v2-sociaal">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
                <Github strokeWidth={1.8} />
              </a>
              <a href={`mailto:${EMAIL}`} title="E-mail" aria-label="E-mail">
                <Mail strokeWidth={1.8} />
              </a>
              <a href={SHOWCASE_URL} target="_blank" rel="noopener noreferrer" title="Showcase" aria-label="Showcase">
                <ExternalLink strokeWidth={1.8} />
              </a>
            </div>
          </div>
        </aside>

        {/* Scrollende inhoudskolom */}
        <div className="v2-kolom" ref={kolom}>
          <section id="over" className="v2-sectie">
            <h2 className="v2-titel">over mij</h2>
            <p className="v2-kruimels">
              <span>Graduaat Programmeren</span>
              <span>{LOCATIE}</span>
              <span>Open voor werk</span>
            </p>
            <p className="v2-tekst v2-tekst-groot">
              Ik bouw backends waar je op kán bouwen. <strong>C# en ASP.NET Core</strong> zijn mijn thuisbasis — van Web
              API-ontwerp en EF Core-datamodellen tot authenticatie met Identity. Daarnaast breng ik bijna tien jaar mee
              als <strong>administratief manager en IT-coördinator</strong>: ik ken de kant van de organisatie die
              uiteindelijk met de software moet werken. Criminologie leerde me complexe systemen uit elkaar halen tot ze
              kloppen; die reflex gebruik ik nu in code, databases en architectuur.
            </p>

          </section>

          <section id="projecten" className="v2-sectie">
            <h2 className="v2-titel">projecten</h2>
            {ALLE_PROJECTEN.map((project) => (
              <ProjectBlok key={project.title} project={project} />
            ))}
          </section>

          <section id="ervaring" className="v2-sectie">
            <h2 className="v2-titel">werkervaring</h2>
            {EXPERIENCES.map((ervaring) => (
              <article key={ervaring.title} className="v2-project">
                <header className="v2-project-kop">
                  <h4>{ervaring.title}</h4>
                  <span className="v2-meta">{ervaring.meta}</span>
                </header>
                <p className="v2-project-bedrijf">{ervaring.company}</p>
                {ervaring.bullets && (
                  <ul className="v2-bullets">
                    {ervaring.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
                {ervaring.description && <p className="v2-tekst">{ervaring.description}</p>}
              </article>
            ))}
          </section>

          <section id="opleiding" className="v2-sectie">
            <h2 className="v2-titel">opleiding &amp; talen</h2>
            <div className="v2-duo">
              <div>
                {EDUCATION.map((edu) => (
                  <div key={edu.degree} className="v2-edu">
                    <span className="v2-edu-titel">{edu.degree}</span>
                    <span className="v2-meta">{edu.period}</span>
                    <span className="v2-tekst">{edu.school}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="v2-vaardigheden">
                  {SKILLS.map((skill) => (
                    <div key={skill.name} className="v2-vaardigheid">
                      <span>{skill.name}</span>
                      <div className="v2-balk">
                        <div className="v2-balk-vulling" style={{ width: skill.level }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="v2-talen">
                  {LANGUAGES.map((taal) => (
                    <div key={taal.name} className="v2-taal">
                      <span>{taal.name}</span>
                      <span className="v2-meta">{taal.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="v2-sectie v2-sectie-laatst">
            <h2 className="v2-titel">contact</h2>
            <ul className="v2-contact">
              <li>
                <Mail strokeWidth={1.7} />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <Github strokeWidth={1.7} />
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  github.com/GregoryButs
                </a>
              </li>
              <li>
                <ExternalLink strokeWidth={1.7} />
                <a href={SHOWCASE_URL} target="_blank" rel="noopener noreferrer">
                  Showcase case study
                </a>
              </li>
              <li>
                <MapPin strokeWidth={1.7} />
                <span>{LOCATIE}</span>
              </li>
              <li>
                <Phone strokeWidth={1.7} />
                <MaskedPhone />
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
