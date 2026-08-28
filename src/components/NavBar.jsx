import { useState, useEffect } from "react";

import { navLinks } from "../constants";

const NavBar = () => {
  // track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    // create an event listener for when the user scrolls
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // check if the user has scrolled down at least 10px
          // if so, set the state to true
          const isScrolled = window.scrollY > 10;
          setScrolled(isScrolled);
          ticking = false;
        });
        ticking = true;
      }
    };

    // add the event listener to the window
    window.addEventListener("scroll", handleScroll, { passive: true });

    // cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <a href="#hero" className="logo">
          Yash Kondane
        </a>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <a href={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <a 
            href="/yash_kondane_resume.pdf" 
            download="Yash_Kondane_Resume.pdf"
            className="hidden md:flex px-5 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors duration-300"
          >
            <span>Resume</span>
          </a>
          <a href="#contact" className="contact-btn group">
            <div className="inner">
              <span>Contact me</span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
