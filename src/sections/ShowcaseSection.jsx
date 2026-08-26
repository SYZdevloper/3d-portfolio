import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);
  const [activeModal, setActiveModal] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={rydeRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <img src="/images/facdbe02-374a-4e45-bfbc-424d93df2e1f.png" alt="Generative AI Monorepo Project" />
            </div>
            <div className="text-content">
              <h2>
                A Massive 23-Website Monorepo Powered by Generative AI
              </h2>
              <p className="text-white-50 md:text-xl">
                A comprehensive business reports, news, and blogs platform utilizing generative AI to create reports and more. Hosted securely on Cloudflare.
              </p>
              <button 
                onClick={() => setActiveModal('stralligence')}
                className="mt-6 px-6 py-2 bg-white-50 text-black font-semibold rounded-lg hover:bg-white transition-colors"
              >
                Read More
              </button>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project flex flex-col" ref={libraryRef}>
              <div className="image-wrapper bg-[#FFEFDB]">
                <img
                  src="/images/soulhome.webp"
                  alt="Soulhome Resource Platform"
                />
              </div>
              <h2 className="flex-1">Soulhome - Influencer Resource Platform</h2>
              <button 
                onClick={() => setActiveModal('soulhome')}
                className="mt-4 px-4 py-2 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors w-fit"
              >
                Read More
              </button>
            </div>

            <div className="project flex flex-col" ref={ycDirectoryRef}>
              <div className="image-wrapper bg-[#FFE7EB]">
                <img src="/images/ad1eb88c-fd3d-4106-8cc2-3233f434d18f.png" alt="XMF Martial Arts Platform" />
              </div>
              <h2 className="flex-1">XMF - Martial Arts Platform</h2>
              <button 
                onClick={() => setActiveModal('xmf')}
                className="mt-4 px-4 py-2 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors w-fit"
              >
                Read More
              </button>
            </div>
          </div>
        </div>

        {/* Additional Projects Section (Loaded via Load More) */}
        {showMore && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="project flex flex-col">
              <div className="image-wrapper bg-[#1a1a1a] p-4 rounded-xl">
                <img 
                  src="/images/73d4ee11-e0b3-40d6-8dde-efe199378415.png" 
                  alt="Garment ERP Software" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h2 className="flex-1 mt-5 text-xl font-semibold">Garment ERP Software</h2>
              <button 
                onClick={() => setActiveModal('erp')}
                className="mt-4 px-4 py-2 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors w-fit"
              >
                Read More
              </button>
            </div>

            <div className="project flex flex-col">
              <div className="image-wrapper bg-[#1a1a1a] p-4 rounded-xl">
                <img 
                  src="/images/f311689b-c4d2-4e61-b0e4-db4dbd65fdae.jpeg" 
                  alt="TradeKomp Admin Panel" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h2 className="flex-1 mt-5 text-xl font-semibold">TradeKomp B2B Admin Panel</h2>
              <button 
                onClick={() => setActiveModal('tradekomp')}
                className="mt-4 px-4 py-2 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors w-fit"
              >
                Read More
              </button>
            </div>

            <div className="project flex flex-col">
              <div className="image-wrapper bg-[#1a1a1a] p-4 rounded-xl">
                <img 
                  src="/images/08429210-6c5f-4790-92e0-937e01fb196d.png" 
                  alt="SACG NGO Platform" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h2 className="flex-1 mt-5 text-xl font-semibold">SACG NGO Management Platform</h2>
              <button 
                onClick={() => setActiveModal('sacg')}
                className="mt-4 px-4 py-2 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors w-fit"
              >
                Read More
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-16">
          <button 
            onClick={() => setShowMore(!showMore)}
            className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-white-50 transition-colors shadow-lg hover:shadow-xl"
          >
            {showMore ? "Show Less" : "Load More Projects"}
          </button>
        </div>
      </div>

      {/* Project Details Modal */}
      {activeModal === 'stralligence' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-white-50 hover:text-white transition-colors p-2 bg-black/50 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img 
              src="/images/facdbe02-374a-4e45-bfbc-424d93df2e1f.png" 
              alt="Generative AI Monorepo Project" 
              className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
            />
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              A Massive 23-Website Monorepo Powered by Generative AI
            </h2>
            
            <div className="text-white-50 space-y-5 text-base md:text-lg leading-relaxed font-light">
              <p>
                This ambitious project consolidates 23 independent websites into a single, high-performance monorepo hosted securely on Cloudflare. The core of this platform is a sophisticated generative AI pipeline designed to automate the creation of comprehensive business reports, daily news, and insightful blog posts.
              </p>
              <p>
                To ensure our AI always has the most relevant data, we built our own <strong>custom search engine</strong>. This acts as the primary data retrieval mechanism. Alongside it, we utilize <strong>Playwright</strong> to meticulously scrape and extract report titles, trends, and structural data from key competitor websites across the industry.
              </p>
              <p>
                Once we have this raw data, we process it locally. Using our own secure, <strong>local LLM</strong>, we structure the topics and map out the narratives. This structured data is then fed into the <strong>Claude API</strong>, which handles the heavy lifting of drafting high-quality, long-form content. 
              </p>
              <p>
                Finally, the entire operation is completely automated. A dedicated <strong>cron job scheduler</strong> coordinates the pipeline, automatically writing and publishing fresh news and blogs periodically. This ensures all 23 sites remain active, SEO-optimized, and constantly updated with minimal human intervention.
              </p>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {["Next.js", "NextAuth", "Cloudflare D1", "Cloudflare R2", "Tinyfish", "Stripe"].map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white-50 text-sm font-medium hover:bg-white/10 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'soulhome' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-white-50 hover:text-white transition-colors p-2 bg-black/50 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img 
              src="/images/soulhome.webp" 
              alt="Soulhome Platform" 
              className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
            />
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Soulhome - Exclusive Influencer Resource Platform
            </h2>
            
            <div className="text-white-50 space-y-5 text-base md:text-lg leading-relaxed font-light">
              <p>
                Soulhome is a bespoke platform developed for a prominent UK-based influencer, designed as a premium marketplace for digital resources. The system completely automates the sales and distribution pipeline to ensure a frictionless experience for both the creator and the customers.
              </p>
              <p>
                The transaction flow begins with <strong>Calendly</strong>, which seamlessly handles the payment processing. Once a successful payment is made, a secure webhook immediately sends a notification to our centralized backend server.
              </p>
              <p>
                This webhook acts as the catalyst for our automated fulfillment system. The server automatically generates a secure <strong>magic link</strong> and dispatches it directly to the customer's email address.
              </p>
              <p>
                When the user clicks the magic link, it triggers a custom API integration with <strong>Google Drive</strong>. This integration instantly authenticates the user's specific email and grants them explicit, secure access to the purchased resources, eliminating the need for manual file sharing entirely.
              </p>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {["Calendly API", "Google Drive API", "Node.js Webhooks", "Email Magic Links", "Payment Processing"].map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white-50 text-sm font-medium hover:bg-white/10 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'xmf' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-white-50 hover:text-white transition-colors p-2 bg-black/50 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img 
              src="/images/ad1eb88c-fd3d-4106-8cc2-3233f434d18f.png" 
              alt="XMF Platform" 
              className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
            />
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              XMF - Modern Martial Arts Management Platform
            </h2>
            
            <div className="text-white-50 space-y-5 text-base md:text-lg leading-relaxed font-light">
              <p>
                XMF is a comprehensive, end-to-end platform tailored specifically for martial arts classes and academies. It modernizes the way dojos manage their students, replacing outdated manual tracking with a sleek, automated digital solution.
              </p>
              <p>
                At the core of the platform is a robust <strong>Admin Panel</strong> that gives instructors full control over class schedules, student rosters, and curriculum requirements. From this centralized hub, the administration can manage every aspect of the academy's day-to-day operations.
              </p>
              <p>
                For the practitioners, the <strong>Student Dashboard</strong> offers a personalized portal where they can track their complete progress. Students can view detailed statistics about their attendance, belt promotions, and skill milestones, keeping them highly motivated and engaged in their martial arts journey.
              </p>
              <p>
                The platform also features an automated communication system that sends out timely <strong>email notifications</strong> to students regarding upcoming events, grading ceremonies, and schedule changes, ensuring everyone stays connected and informed.
              </p>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {["Next.js", "Cloudflare", "Automated Email Systems", "Admin Dashboards", "Data Analytics"].map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white-50 text-sm font-medium hover:bg-white/10 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'erp' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-white-50 hover:text-white transition-colors p-2 bg-black/50 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img 
              src="/images/73d4ee11-e0b3-40d6-8dde-efe199378415.png" 
              alt="Garment ERP Software" 
              className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
            />
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Garment Industry ERP Software
            </h2>
            
            <div className="text-white-50 space-y-5 text-base md:text-lg leading-relaxed font-light">
              <p>
                This project involved building a comprehensive Enterprise Resource Planning (ERP) software tailored specifically for the garment industry. It handles complex data pipelines, inventory management, and business analytics in a sleek, modern interface.
              </p>
              <p>
                Working collaboratively in a cross-functional team, I took on a dual role as both a <strong>UI/UX Designer</strong> and the lead <strong>Frontend Developer</strong>. This unique position allowed me to conceptualize user journeys and translate them directly into pixel-perfect implementations.
              </p>
              <p>
                A significant portion of my development focused on integrating <strong>Recharts</strong> to build interactive, data-heavy dashboards. By utilizing <strong>React</strong> and <strong>Next.js</strong>, I ensured the application remained highly performant even when processing massive datasets.
              </p>
              <p>
                Beyond feature development, I placed a heavy emphasis on <strong>code optimization</strong>. By refining the component architecture and managing state efficiently, I drastically reduced load times and improved the overall responsiveness of the ERP system for end-users.
              </p>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                Tech Stack & Roles
              </h3>
              <div className="flex flex-wrap gap-3">
                {["UI/UX Design", "Frontend Development", "Next.js", "React", "Recharts", "Code Optimization"].map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white-50 text-sm font-medium hover:bg-white/10 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'tradekomp' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-white-50 hover:text-white transition-colors p-2 bg-black/50 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img 
              src="/images/f311689b-c4d2-4e61-b0e4-db4dbd65fdae.jpeg" 
              alt="TradeKomp Admin Panel" 
              className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
            />
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              TradeKomp B2B Platform
            </h2>
            
            <div className="text-white-50 space-y-5 text-base md:text-lg leading-relaxed font-light">
              <p>
                TradeKomp is a robust B2B platform designed to facilitate large-scale commercial transactions. For this project, I was tasked with developing the overarching <strong>Admin Panel</strong> that serves as the nerve center for the platform's operations.
              </p>
              <p>
                The dashboard was constructed from the ground up using <strong>Next.js</strong> and <strong>React</strong>. Given the complexity of B2B data (including user management, transaction logs, and inventory tracking), building a highly responsive, client-side application was critical.
              </p>
              <p>
                I applied modern <strong>UI/UX techniques</strong> to ensure the interface was not just functional, but deeply intuitive. By streamlining complex workflows into manageable, visually distinct components, I significantly reduced the cognitive load on administrators using the software daily.
              </p>
              <p>
                Through the use of modern CSS utility frameworks and state management, the panel achieves high performance metrics and maintains state effortlessly across multiple complex views, providing a seamless operational experience.
              </p>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {["Next.js", "React", "UI/UX Design", "B2B Dashboard", "State Management"].map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white-50 text-sm font-medium hover:bg-white/10 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'sacg' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-white-50 hover:text-white transition-colors p-2 bg-black/50 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img 
              src="/images/08429210-6c5f-4790-92e0-937e01fb196d.png" 
              alt="SACG Platform" 
              className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
            />
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              SACG - US-Based NGO Admin Panel
            </h2>
            
            <div className="text-white-50 space-y-5 text-base md:text-lg leading-relaxed font-light">
              <p>
                SACG is a prominent US-based Non-Governmental Organization (NGO) that required a highly robust, multi-faceted administration platform to handle their rapidly expanding operations and extensive outreach programs.
              </p>
              <p>
                To meet their complex organizational needs, I engineered a comprehensive <strong>Admin Panel</strong> packed with numerous interlocking modules. This allowed the administrative team to manage all their core activities from a single, centralized dashboard.
              </p>
              <p>
                The platform includes a deeply integrated <strong>Member Organization</strong> module for tracking thousands of volunteers and staff members, alongside a sophisticated <strong>Event Management</strong> system designed to coordinate logistics, scheduling, and attendance for large-scale charity drives and fundraisers.
              </p>
              <p>
                Furthermore, I developed a dedicated <strong>Sponsorship tracking</strong> system to manage donor relations, funding allocations, and reporting. The modular architecture of this dashboard ensures that as the NGO scales, new features can be seamlessly integrated without disrupting existing workflows.
              </p>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                Core Modules
              </h3>
              <div className="flex flex-wrap gap-3">
                {["Member Organization", "Event Management", "Sponsorship Tracking", "Modular Architecture", "Admin Dashboard"].map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white-50 text-sm font-medium hover:bg-white/10 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppShowcase;
