import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TitleHeader from "../components/TitleHeader";
import { counterItems } from "../constants";

const techStack = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Cloudflare", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Stripe", icon: "https://img.icons8.com/color/48/stripe.png" },
  { name: "Payload CMS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Gen AI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
];

const About = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".about-bento",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=100",
        },
      }
    );
  }, []);

  return (
    <section id="about" className="section-padding flex-center" ref={containerRef}>
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="About Me"
          sub="👋 Who's behind the screen"
        />

        {/* Bento Grid Layout */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:grid-rows-2">
          
          {/* 1. Main Bio (Takes up 2 columns, 1 row on Desktop) */}
          <div className="about-bento card-border rounded-3xl p-8 md:p-10 xl:col-span-2 xl:row-span-1 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Building robust digital products from end to end.
            </h3>
            <div className="text-white-50 text-base leading-relaxed space-y-4">
              <p>
                I'm Yash — I've been writing code for over <strong className="text-white">4 years</strong> now. Started with basic frontend development and kept going deeper. Today, I architect and build full-stack applications handling everything from the initial database design and cloud infrastructure down to the final UI polish.
              </p>
              <p>
                Recently, I've been heavily focused on integrating <strong className="text-white">Generative AI</strong> into traditional software — building automated content pipelines, custom search engines, and intelligent systems that run autonomously. I like building things that actually work well and don't fall apart the moment real users touch them.
              </p>
            </div>
          </div>

          {/* 2. Stats Card (Takes up 1 column, 1 row) */}
          <div className="about-bento card-border rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <p className="text-white-50 text-sm font-medium uppercase tracking-widest mb-6">The Numbers</p>
              <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                {counterItems.map((item, index) => (
                  <div key={index}>
                    <h4 className="text-3xl md:text-4xl font-bold text-white">{item.value}{item.suffix}</h4>
                    <p className="text-white-50 text-xs md:text-sm mt-1 pr-2">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Tech Stack (Takes up 3 columns, 1 row on Desktop) */}
          <div className="about-bento card-border rounded-3xl p-8 md:p-10 xl:col-span-3 xl:row-span-1 flex flex-col justify-center overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <p className="text-white-50 text-sm font-medium uppercase tracking-widest">Core Technologies</p>
              <p className="text-white-50 text-sm hidden md:block">My go-to tools for production</p>
            </div>
            
            {/* Scrolling Marquee Container */}
            <div className="relative w-full overflow-hidden flex items-center">
              {/* Fade out edges so icons don't just abruptly disappear */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0d0d0d] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10 pointer-events-none" />

              <div 
                className="flex w-max gap-4"
                style={{ animation: "scroll-marquee 35s linear infinite" }}
                onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
              >
                {/* We double the array so it loops seamlessly */}
                {[...techStack, ...techStack].map((tech, index) => (
                  <div
                    key={index}
                    className="flex-none w-32 group flex flex-col items-center justify-center gap-3 py-5 px-3 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 hover:bg-[#111111] transition-all duration-300"
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                      style={tech.invert ? { filter: "invert(1)" } : {}}
                    />
                    <span className="text-white-50 text-xs font-semibold text-center group-hover:text-white transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inline CSS for the localized marquee scroll */}
            <style jsx>{`
              @keyframes scroll-marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
