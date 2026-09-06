import { Fragment, type CSSProperties, type MouseEvent } from 'react';
import portrait from '../assets/portrait.jpg';
import { links, profile } from '../data/profile';
import { ArrowIcon, LinkIcon } from './icons';

/** Staggered CSS entrance, so the hero paints with the document rather than
    waiting for hydration to reveal it. */
const rise = (delay: number) => ({ '--rise-delay': `${delay}ms` }) as CSSProperties;

/** Feeds the pointer position to the pill's spotlight, as the cards do. */
const trackCursor = (event: MouseEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
};

export function Hero() {
  return (
    <header className="hero shell">
      {/* The drift-out on scroll lives in CSS on a scroll timeline, so this
          component ships no JavaScript at all. */}
      <div className="hero-inner">
        <div className="portrait rise" style={rise(0)}>
          <img
            src={portrait}
            width={400}
            height={400}
            alt={`Portrait of ${profile.name}`}
            fetchPriority="high"
          />
        </div>

        <h1 className="rise" style={rise(80)}>
          {profile.name}
        </h1>

        <p className="tagline rise" style={rise(160)}>
          {profile.tagline.map((part, i) => (
            <Fragment key={part}>
              {i > 0 && <span className="sep">|</span>}
              <span className="part">{part}</span>
            </Fragment>
          ))}
        </p>

        <nav className="links rise" style={rise(240)} aria-label="Profile links">
          {links.map((link) => (
            <a
              key={link.label}
              className="link"
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              onMouseMove={trackCursor}
            >
              <span className="link-face">
                <LinkIcon name={link.icon} />
                <span className="link-label">{link.label}</span>
                <ArrowIcon />
              </span>
            </a>
          ))}
        </nav>
      </div>

      <a className="scroll-cue" href="#experience" aria-label="Jump to experience">
        <span className="cue-line" />
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
          <path d="m6 9 6 6 6-6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </header>
  );
}
