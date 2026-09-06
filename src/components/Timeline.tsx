import { useState, type MouseEvent } from 'react';
import { groups, type Entry } from '../data/profile';
import { ArrowIcon } from './icons';
import { Reveal } from './Reveal';

/** Company logo from `public/logos/<slug>.png`, with a monogram fallback. */
function Logo({ entry }: { entry: Entry }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="logo logo-fallback" aria-hidden="true">
        {entry.company.charAt(0)}
      </span>
    );
  }

  return (
    <span className="logo">
      <img
        src={`/logos/${entry.slug}.png`}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

function Card({ entry, delay }: { entry: Entry; delay: number }) {
  // Track the cursor so the card can light up under it.
  const onMove = (event: MouseEvent<HTMLLIElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <Reveal
      as="li"
      className="entry"
      delay={delay}
      data-current={entry.current ? 'true' : undefined}
      onMouseMove={onMove}
    >
      <article className="card">
        <Logo entry={entry} />
        <div className="card-body">
          <h3>
            <a
              className="company-link"
              href={entry.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {entry.company}
              <ArrowIcon />
            </a>
          </h3>
          <p className="role">{entry.role}</p>
          <div className="entry-meta">
            <span>{entry.period}</span>
            <span className="dot">·</span>
            <span>{entry.location}</span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Timeline() {
  let index = 0;

  return (
    <section className="section shell" id="experience" aria-labelledby="experience-label">
      <Reveal as="h2" className="section-label" id="experience-label" delay={0}>
        Experience
      </Reveal>

      {/* The rail fills itself from the CSS view timeline; no scroll listener. */}
      <div className="timeline">
        {groups.map((group) => (
          <div className="group" key={group.label}>
            <Reveal className="group-label" delay={0}>
              {group.label}
            </Reveal>
            <ol className="entries">
              {group.entries.map((entry) => (
                <Card
                  key={`${entry.slug}-${entry.period}`}
                  entry={entry}
                  delay={Math.min(index++, 4) * 70}
                />
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
