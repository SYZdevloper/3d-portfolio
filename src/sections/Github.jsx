import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TitleHeader from "../components/TitleHeader";

const GITHUB_USERNAME = "SYZdevloper";

const langColors = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Java: "#b07219",
};

const Github = () => {
  const containerRef = useRef(null);
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
          ),
        ]);
        const profileData = await profileRes.json();
        const reposData = await reposRes.json();

        setProfile(profileData);

        const ownRepos = reposData
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);

        setRepos(ownRepos);
      } catch (err) {
        console.error("Failed to fetch GitHub data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGithub();
  }, []);

  useGSAP(() => {
    if (!loading) {
      gsap.fromTo(
        ".gh-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom-=100",
          },
        }
      );
    }
  }, [loading]);

  const langStats = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});
  const totalWithLang = Object.values(langStats).reduce((a, b) => a + b, 0);

  if (loading) {
    return (
      <section className="section-padding flex-center">
        <div className="w-full h-full md:px-10 px-5">
          <TitleHeader title="GitHub" sub="⚡ Loading live data..." />
        </div>
      </section>
    );
  }

  return (
    <section
      id="github"
      className="section-padding flex-center"
      ref={containerRef}
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader title="GitHub" sub="⚡ Live from my repositories" />

        <div className="mt-16 flex flex-col gap-5">
          {/* Row 1: Profile Banner */}
          <div className="gh-item card-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {profile?.avatar_url && (
              <img
                src={profile.avatar_url}
                alt={GITHUB_USERNAME}
                className="w-20 h-20 rounded-full border-2 border-white/10 flex-shrink-0"
              />
            )}
            <div className="flex-1 flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white">
                  {profile?.name || GITHUB_USERNAME}
                </h3>
                <p className="text-white-50 text-sm">@{GITHUB_USERNAME}</p>
              </div>

              <div className="flex gap-8 md:gap-12">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {profile?.public_repos}
                  </p>
                  <p className="text-white-50 text-xs">Repos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {profile?.followers}
                  </p>
                  <p className="text-white-50 text-xs">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {profile?.following}
                  </p>
                  <p className="text-white-50 text-xs">Following</p>
                </div>
              </div>

              {/* Language Bar */}
              <div className="flex-1 w-full md:w-auto">
                <div className="w-full h-3 rounded-full bg-white/5 flex overflow-hidden gap-px">
                  {Object.entries(langStats)
                    .sort((a, b) => b[1] - a[1])
                    .map(([lang, count]) => (
                      <div
                        key={lang}
                        className="h-full first:rounded-l-full last:rounded-r-full"
                        title={`${lang}: ${Math.round(
                          (count / totalWithLang) * 100
                        )}%`}
                        style={{
                          width: `${(count / totalWithLang) * 100}%`,
                          backgroundColor: langColors[lang] || "#8b8b8b",
                        }}
                      />
                    ))}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                  {Object.entries(langStats)
                    .sort((a, b) => b[1] - a[1])
                    .map(([lang]) => (
                      <div key={lang} className="flex items-center gap-1.5">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: langColors[lang] || "#8b8b8b",
                          }}
                        />
                        <span className="text-white-50 text-xs">{lang}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <a
              href={profile?.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white-50 text-sm font-medium hover:bg-white/10 hover:text-white transition-all"
            >
              View Profile →
            </a>
          </div>

          {/* Row 2: Repos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="gh-item card-border rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 transition-all duration-300 group"
              >
                {/* Repo icon + name */}
                <div className="flex items-center gap-2.5">
                  <svg
                    className="w-5 h-5 text-white-50 flex-shrink-0"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
                  </svg>
                  <h4 className="text-white font-semibold text-base group-hover:text-blue-400 transition-colors truncate">
                    {repo.name}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-white-50 text-sm leading-relaxed flex-1">
                  {repo.description || "No description provided."}
                </p>

                {/* Footer: language + stars + forks */}
                <div className="flex items-center gap-5 pt-1 border-t border-white/5">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            langColors[repo.language] || "#8b8b8b",
                        }}
                      />
                      <span className="text-white-50 text-xs">
                        {repo.language}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-white-50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    <span className="text-white-50 text-xs">
                      {repo.stargazers_count}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-white-50"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
                    </svg>
                    <span className="text-white-50 text-xs">
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Github;
