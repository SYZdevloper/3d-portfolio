
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Hero from "./sections/Hero";
import About from "./sections/About";
import ShowcaseSection from "./sections/ShowcaseSection";

import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";

const App = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <ShowcaseSection />

    <FeatureCards />
    <TechStack />
    <Contact />
    <Footer />
  </>
);

export default App;
