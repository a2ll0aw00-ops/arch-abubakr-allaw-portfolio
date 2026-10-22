import Hero from '../components/Hero';
import SelectedWorks from '../components/SelectedWorks';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWorks />
      <About />
      <Services />
      <Contact />
    </>
  );
}
