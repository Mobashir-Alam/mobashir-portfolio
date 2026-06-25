import { useEffect, useRef, useState } from "react";

/* ── DATA ──────────────────────────────────────────────── */

const SKILLS = [
  { label: "Languages", tags: ["JavaScript", "TypeScript", "Python", "SQL", "C", "C++"] },
  { label: "Frontend", tags: ["React 18", "Next.js", "Vite", "Tailwind CSS", "HTML5", "CSS3"] },
  { label: "Backend", tags: ["Node.js", "Deno", "REST APIs", "Edge Functions"] },
  { label: "Databases & Cloud", tags: ["PostgreSQL", "Supabase", "MySQL", "Google Cloud Storage", "Vercel"] },
  { label: "Concepts", tags: ["RBAC", "Row-Level Security", "2FA / OTP", "OAuth 2.0", "RAG / Gen AI", "DSA", "OOP"] },
  { label: "Tools", tags: ["Git", "GitHub", "VS Code", "Hostinger"] },
];

const EXPERIENCE = [
  {
    role: "Software Engineer",
    company: "Nasheedio",
    subtitle: "Muslim-friendly audio streaming platform",
    period: "Feb 2026 – Present",
    current: true,
    bullets: [
      <>Architected and built <strong>Founder OS</strong> — an internal operations platform from scratch (React 18, TypeScript, Supabase + Deno edge functions) shipping 35+ features across ~118 commits, including a CEO dashboard, project management, HR module, and AI assistant.</>,
      <>Integrated <strong>GitHub, Slack, and YouTube</strong> data connectors with real-time sync pipelines, analytics dashboards, and AI-powered Q&A (RAG pattern) surfacing engineering, team, and content metrics.</>,
      <>Designed <strong>PostgreSQL Row-Level Security</strong> enforcing a 5-role access model (founder, HR, PM, tech lead, employee) at the database layer, with email-OTP 2FA via Deno edge functions.</>,
      <>Built a <strong>subscription analytics dashboard</strong> tracking MRR, churn, conversion funnel, and country-level revenue, mapping users from registration to paid conversion.</>,
      <>Resolved critical bugs across the <strong>Nasheedio web player</strong> — playlist caching, cross-platform recently-played sync, and like-button state management.</>,
      <>Delivered <strong>Next.js 16 migration fixes</strong> (proxy alignment, /auth/me response shape) and shipped a Styles content-management module in the admin panel.</>,
      <>Hardened the <strong>Node.js / GCS upload pipeline</strong> — UBLA compatibility and content-length-range enforcement — preventing upload failures in production.</>,
      <>Built the <strong>"Badlaav" campaign landing page</strong> with mobile-responsive hero and banner sections; configured Android Digital Asset Links and static SPA build for Vercel.</>,
    ],
  },
];

const PROJECTS = [
  {
    emoji: "🧠",
    name: "Founder OS",
    desc: "Full-stack internal operations platform for multi-startup portfolio management — CEO dashboard, RBAC, project management, HR, 3 data connectors, and an AI assistant (RAG).",
    tags: ["React 18", "TypeScript", "Supabase", "Deno", "AI/RAG"],
  },
  {
    emoji: "🔍",
    name: "Dev Detective",
    desc: "GitHub profile search that dynamically renders repos, followers, and stats via the REST API with graceful error handling and a responsive UI.",
    tags: ["HTML", "CSS", "JavaScript", "GitHub API"],
  },
  {
    emoji: "🌤️",
    name: "Weather Application",
    desc: "Real-time weather app fetching temperature, humidity, and conditions for any city via async API calls.",
    tags: ["JavaScript", "REST API"],
  },
  {
    emoji: "🚀",
    name: "Personal Portfolio",
    desc: "Responsive developer portfolio showcasing projects and skills. Deployed and managed in production on Hostinger.",
    tags: ["HTML", "CSS", "JavaScript", "Hostinger"],
  },
];

const EDUCATION = [
  {
    degree: "B.Tech in Computer Engineering",
    school: "J.C. Bose University of Science & Technology, YMCA — Faridabad, Haryana",
    period: "Aug 2023 – Present",
  },
  {
    degree: "Diploma in Computer Engineering",
    school: "Jamia Millia Islamia — New Delhi",
    period: "Oct 2020 – Jun 2023",
  },
];

const CERTS = [
  { icon: "☁️", name: "Oracle Cloud Infrastructure 2025 — Certified Generative AI Professional", issuer: "Oracle · 2025" },
  { icon: "🤖", name: "Oracle Cloud Infrastructure 2025 — Certified AI Foundations Associate", issuer: "Oracle · 2025" },
  { icon: "🔀", name: "Version Control", issuer: "Meta · Coursera · 2025" },
  { icon: "🗄️", name: "Database Management System (DBMS)", issuer: "NPTEL · IIT Kharagpur" },
  { icon: "🏆", name: "Leadership and Team Effectiveness", issuer: "NPTEL Elite · IIT Roorkee · 2026" },
  { icon: "🌱", name: "Education for Sustainable Development", issuer: "NPTEL Elite · IIT Kharagpur · 2026" },
];


const NAV_LINKS = ["skills", "experience", "projects", "contact"];

/* ── HOOKS ─────────────────────────────────────────────── */

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── SUB-COMPONENTS ─────────────────────────────────────── */

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref}>{children}</div>;
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <FadeIn>
      <p className="text-xs font-semibold tracking-[3px] uppercase text-accent2 mb-3">{label}</p>
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12">{title}</h2>
    </FadeIn>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 text-[0.8rem] font-medium rounded-lg bg-white/5 border border-white/10 text-[#e8e8f0] hover:bg-accent/15 hover:border-accent transition-colors cursor-default">
      {children}
    </span>
  );
}

function ProjectTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2.5 py-0.5 text-[0.72rem] font-semibold rounded-md bg-accent/10 border border-accent/20 text-accent2">
      {children}
    </span>
  );
}

/* ── SECTIONS ───────────────────────────────────────────── */

function Navbar({ active }: { active: string }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 backdrop-blur-xl bg-bg/70 border-b border-white/[0.07]">
      <span className="font-bold text-lg tracking-tight accent-grad-text">MA.</span>
      <div className="hidden md:flex gap-8">
        {NAV_LINKS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`text-sm font-medium capitalize transition-colors ${
              active === id ? "text-[#e8e8f0]" : "text-muted hover:text-[#e8e8f0]"
            }`}
          >
            {id}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center px-6 md:px-10 pt-28 pb-20 max-w-5xl mx-auto">
      <div className="max-w-2xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 text-xs font-semibold text-accent2 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-green animate-[pulse-dot_2s_ease-in-out_infinite]" />
          Open to opportunities · New Delhi, India
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
          <span className="grad-text">Full-Stack</span>
          <br />Developer.
        </h1>

        <p className="text-base md:text-lg text-muted leading-relaxed max-w-lg mb-10">
          Final-year Computer Engineering student building and shipping real products at Nasheedio —
          from internal platforms and analytics pipelines to consumer web apps.
          I turn ideas into working software.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:mobashiralam22078@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-br from-accent to-accent2 text-white shadow-[0_4px_24px_rgba(108,99,255,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(108,99,255,0.5)] transition-all"
          >
            <EmailIcon /> Email Me
          </a>
          <a
            href="https://wa.me/917838713212"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[#22c55e] text-white shadow-[0_4px_24px_rgba(34,197,94,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(34,197,94,0.45)] transition-all"
          >
            <WhatsAppIcon /> WhatsApp Me
          </a>
          <a
            href="https://github.com/Mobashir-Alam"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-surface2 border border-white/[0.07] text-[#e8e8f0] hover:border-accent2 hover:-translate-y-0.5 transition-all"
          >
            <GithubIcon /> GitHub
          </a>
          <a
            href="/Mobashir_Alam_CV.pdf"
            download="Mobashir_Alam_CV.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-surface2 border border-white/[0.07] text-[#e8e8f0] hover:border-green hover:-translate-y-0.5 transition-all"
          >
            <DownloadIcon /> Download CV
          </a>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 max-w-5xl mx-auto px-6 md:px-10">
      <SectionHeader label="What I work with" title="Technical Skills" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SKILLS.map((group, i) => (
          <FadeIn key={group.label} delay={i * 70}>
            <div className="bg-surface border border-white/[0.07] rounded-2xl p-7 hover:border-accent hover:-translate-y-1 transition-all">
              <p className="text-[0.7rem] font-bold tracking-[2px] uppercase text-accent2 mb-4">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-24 max-w-5xl mx-auto px-6 md:px-10">
      <SectionHeader label="Where I've worked" title="Experience" />
      {EXPERIENCE.map((exp) => (
        <FadeIn key={exp.company}>
          <div className="bg-surface border border-white/[0.07] rounded-2xl p-8 md:p-10 relative overflow-hidden">
            {/* top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-green" />

            <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
              <div>
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <p className="text-accent2 font-semibold mt-0.5">{exp.company}</p>
                <p className="text-muted text-xs mt-1">{exp.subtitle} · {exp.period}</p>
              </div>
              {exp.current && (
                <span className="bg-green/10 border border-green/30 text-green text-[0.72rem] font-bold px-3 py-1 rounded-full">Current</span>
              )}
            </div>

            <ul className="mt-7 space-y-3">
              {exp.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-[0.9rem] text-muted leading-relaxed">
                  <span className="text-accent2 font-bold mt-px shrink-0">→</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      ))}
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 max-w-5xl mx-auto px-6 md:px-10">
      <SectionHeader label="Things I've built" title="Projects" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {PROJECTS.map((p, i) => (
          <FadeIn key={p.name} delay={i * 80}>
            <div className="h-full bg-surface border border-white/[0.07] rounded-2xl p-7 flex flex-col hover:border-accent2 hover:-translate-y-1 transition-all">
              <div className="text-3xl mb-4">{p.emoji}</div>
              <h3 className="font-bold text-base mb-2">{p.name}</h3>
              <p className="text-muted text-sm leading-relaxed flex-1 mb-5">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => <ProjectTag key={t}>{t}</ProjectTag>)}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="py-24 max-w-5xl mx-auto px-6 md:px-10">
      <SectionHeader label="Academic background" title="Education" />
      <div className="space-y-4">
        {EDUCATION.map((e, i) => (
          <FadeIn key={e.degree} delay={i * 80}>
            <div className="bg-surface border border-white/[0.07] rounded-2xl px-7 py-6 flex flex-wrap justify-between items-center gap-3 hover:border-accent2 transition-colors">
              <div>
                <p className="font-bold">{e.degree}</p>
                <p className="text-muted text-sm mt-1">{e.school}</p>
              </div>
              <span className="text-accent2 text-sm font-semibold whitespace-nowrap">{e.period}</span>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Certs inline */}
      <div className="mt-16">
        <FadeIn>
          <p className="text-xs font-semibold tracking-[3px] uppercase text-accent2 mb-3">Credentials</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-10">Certifications</h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CERTS.map((c, i) => (
            <FadeIn key={c.name} delay={i * 60}>
              <div className="bg-surface border border-white/[0.07] rounded-xl px-5 py-4 flex items-center gap-4 hover:border-accent2 transition-colors">
                <span className="text-2xl shrink-0">{c.icon}</span>
                <div>
                  <p className="text-sm font-semibold leading-snug">{c.name}</p>
                  <p className="text-muted text-xs mt-0.5">{c.issuer}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 max-w-5xl mx-auto px-6 md:px-10">
      <FadeIn>
        <div className="bg-surface border border-white/[0.07] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 section-glow pointer-events-none" />
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Let's build something<br />
            <span className="accent-grad-text">together.</span>
          </h2>
          <p className="text-muted text-base max-w-md mx-auto mb-10">
            Open to full-stack developer roles, internships, and freelance work.
            Reach out on email or WhatsApp — I reply fast.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <a
              href="mailto:mobashiralam22078@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-br from-accent to-accent2 text-white shadow-[0_4px_24px_rgba(108,99,255,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(108,99,255,0.5)] transition-all"
            >
              <EmailIcon /> mobashiralam22078@gmail.com
            </a>
            <a
              href="https://wa.me/917838713212"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[#22c55e] text-white shadow-[0_4px_24px_rgba(34,197,94,0.3)] hover:-translate-y-0.5 transition-all"
            >
              <WhatsAppIcon /> +91 78387 13212
            </a>
            <a
              href="/Mobashir_Alam_CV.pdf"
              download="Mobashir_Alam_CV.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-surface2 border border-white/[0.07] text-[#e8e8f0] hover:border-green hover:-translate-y-0.5 transition-all"
            >
              <DownloadIcon /> Download CV
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted">
            <a href="https://github.com/Mobashir-Alam" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#e8e8f0] transition-colors">
              <GithubIcon /> github.com/Mobashir-Alam
            </a>
            <a href="mailto:mobashiralam22078@gmail.com" className="flex items-center gap-2 hover:text-[#e8e8f0] transition-colors">
              <EmailIcon /> mobashiralam22078@gmail.com
            </a>
            <span className="flex items-center gap-2">
              <PinIcon /> New Delhi, India
            </span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ── ICONS ──────────────────────────────────────────────── */

function EmailIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
    </svg>
  );
}

/* ── BACKGROUND ─────────────────────────────────────────── */

function Background() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.12] blur-[120px] bg-accent -top-48 -left-48 animate-[drift-a_18s_ease-in-out_infinite_alternate]" />
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.10] blur-[120px] bg-green -bottom-36 -right-36 animate-[drift-b_18s_ease-in-out_infinite_alternate]" />
      </div>
    </>
  );
}

/* ── APP ────────────────────────────────────────────────── */

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const handler = () => {
      let current = "hero";
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 140) current = s.id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="relative min-h-screen bg-bg text-[#e8e8f0] font-sans overflow-x-hidden">
      <Background />
      <div className="relative z-10">
        <Navbar active={activeSection} />
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
        <footer className="border-t border-white/[0.07] py-6 text-center text-xs text-muted">
          Built by Mobashir Alam · 2026
        </footer>
      </div>
    </div>
  );
}
