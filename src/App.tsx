import { Hero } from './components/Hero';
import { ScrollProgress } from './components/ScrollProgress';
import { Timeline } from './components/Timeline';
import { profile } from './data/profile';

export default function App() {
  return (
    <>
      <div className="aurora" aria-hidden="true" />
      <ScrollProgress />
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
