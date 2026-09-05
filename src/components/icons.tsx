import type { Link } from '../data/profile';

type Icon = {
  /** Trimmed to the artwork's own bounds (plus half the stroke, where stroked)
      so every icon renders at the same ink height for a given CSS height. */
  viewBox: string;
  path: string;
  strokeWidth?: number;
};

const icons: Record<Link['icon'], Icon> = {
  linkedin: {
    viewBox: '2.48 3.5 20.52 17.5',
    path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C21.6 8.75 23 11 23 14.4V21h-4v-5.9c0-1.4-.03-3.2-2-3.2s-2.3 1.53-2.3 3.1V21h-4V9Z',
  },
  github: {
    viewBox: '0.5 0.5 23.24 22.47',
    path: 'M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.8.55A11.5 11.5 0 0 0 12 .5Z',
  },
  resume: {
    viewBox: '3.2 1.2 16.6 21.6',
    path: 'M6 2h8l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7.5 1.75V7.5H17M8 12h8M8 16h5',
    strokeWidth: 1.6,
  },
};

const arrow: Icon = {
  viewBox: '5.8 5.8 12.4 12.4',
  path: 'M7 17 17 7M8 7h9v9',
  strokeWidth: 2.4,
};

function Glyph({ icon, className }: { icon: Icon; className: string }) {
  const stroked = icon.strokeWidth !== undefined;
  return (
    <svg
      className={className}
      viewBox={icon.viewBox}
      aria-hidden="true"
      fill={stroked ? 'none' : 'currentColor'}
      stroke={stroked ? 'currentColor' : 'none'}
      strokeWidth={icon.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={icon.path} />
    </svg>
  );
}

export function LinkIcon({ name }: { name: Link['icon'] }) {
  return <Glyph icon={icons[name]} className="glyph" />;
}

export function ArrowIcon() {
  return <Glyph icon={arrow} className="arrow" />;
}
