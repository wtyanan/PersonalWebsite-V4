import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { profile } from './data/profile';

export default function App() {
  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      {/* Reading progress. Driven entirely by the CSS scroll timeline. */}
      <div className="progress" aria-hidden="true" />
      <main>
        <Hero />
        <Timeline />
      </main>
      <footer className="footer shell">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
      </footer>
    </>
  );
}
