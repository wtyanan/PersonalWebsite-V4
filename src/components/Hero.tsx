import { useEffect, useRef, Fragment, type CSSProperties } from 'react';
import portrait from '../assets/portrait.jpg';
import { links, profile } from '../data/profile';
import { ArrowIcon, LinkIcon } from './icons';

/** Staggered CSS entrance, so the hero paints with the document rather than
    waiting for hydration to reveal it. */
const rise = (delay: number) => ({ '--rise-delay': `${delay}ms` }) as CSSProperties;

export function Hero() {
  const innerRef = useRef<HTMLDivElement>(null);

  // Drift the hero up and out as the page scrolls past it.
  useEffect(() => {
    const node = innerRef.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      node.style.setProperty('--hero-shift', `${progress * -48}px`);
      node.style.setProperty('--hero-opacity', `${1 - progress * 1.15}`);
      node.parentElement?.style.setProperty('--hero-opacity', `${1 - progress * 2.4}`);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="hero shell">
      <div className="hero-inner" ref={innerRef}>
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
              {part}
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
