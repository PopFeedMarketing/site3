import { Nav } from './components/sections/Nav';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Skills } from './components/sections/Skills';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';

// App is composition only — section order per §5. No content lives here.
export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
