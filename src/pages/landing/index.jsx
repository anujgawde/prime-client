import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { PrimeLogo } from "../../components/base/Icons";

const FEATURES = [
  {
    title: "Template-First Reports",
    desc: "Create consistent, professional documents from a shared library of reusable templates your whole team can access.",
    svg: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="4" y="2" width="14" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <line x1="7.5" y1="7" x2="14.5" y2="7" stroke="currentColor" strokeWidth="1.3" />
        <line x1="7.5" y1="10.5" x2="14.5" y2="10.5" stroke="currentColor" strokeWidth="1.3" />
        <line x1="7.5" y1="14" x2="11.5" y2="14" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    title: "Role-Based Access",
    desc: "Super-Admins, Admins, and Members each see exactly what they need. Permission boundaries are built into every view.",
    svg: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="8" cy="7.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="15" cy="7.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 19c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M13 13.2c1-.7 2.1-1.2 3.5-1.2 3 0 5.5 2.7 5.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Usage Analytics",
    desc: "Track who's creating what, monitor template adoption, and see activity trends across your entire organization.",
    svg: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="4" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <polyline points="6,14 9,10 12,12 16,8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Focused Editor",
    desc: "A distraction-free writing environment with rich text, tables, images, and callouts — everything a report needs.",
    svg: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M15 3l4 4L8 18H4v-4L15 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="12" y1="6" x2="16" y2="10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Organization Management",
    desc: "Invite team members, assign roles, manage templates — a complete workspace for your document operations.",
    svg: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="6" y="2" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <rect x="1" y="16" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <rect x="11" y="16" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <line x1="8.5" y1="6" x2="8.5" y2="11" stroke="currentColor" strokeWidth="1.4" />
        <line x1="3.5" y1="16" x2="3.5" y2="11" stroke="currentColor" strokeWidth="1.4" />
        <line x1="13.5" y1="16" x2="13.5" y2="11" stroke="currentColor" strokeWidth="1.4" />
        <line x1="3.5" y1="11" x2="13.5" y2="11" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: "Dynamic Fields",
    desc: "Templates support placeholder fields that auto-fill when generating reports — company name, dates, authors, and more.",
    svg: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="3" width="16" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="11" y1="8.5" x2="11" y2="19" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    num: "01",
    title: "Build a Template",
    desc: "Design your document structure once — add headings, sections, placeholder fields, and formatting. Your template becomes the single source of truth.",
  },
  {
    num: "02",
    title: "Generate Reports",
    desc: "Team members create reports from templates with one click. Fields auto-populate, formatting stays consistent, and everyone works faster.",
  },
  {
    num: "03",
    title: "Track & Collaborate",
    desc: "See who's creating what, review documents across your org, and monitor adoption — all from a unified dashboard with role-based views.",
  },
];

function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
            e.target.classList.remove("opacity-0", "translate-y-8");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-sr]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const SR = ({ children, delay = 0, className = "", as: Comp = "div", ...rest }) => (
  <Comp
    data-sr
    className={`opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    style={{ transitionDelay: `${delay}s` }}
    {...rest}
  >
    {children}
  </Comp>
);

export default function LandingPage() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  useScrollReveal();

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/dashboard");
    }
  }, [auth.currentUser, navigate]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleGetStarted = () => navigate("/auth");

  return (
    <div className="min-h-screen bg-bg-base text-text-primary font-sans overflow-x-hidden">
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center transition-all duration-300 ${
          scrolled ? "bg-bg-base/85 backdrop-blur-md shadow-[0_1px_0_var(--color-border-subtle,#E4E0EC)]" : ""
        }`}
      >
        <div className="flex items-center gap-2 font-bold text-base tracking-tight">
          <PrimeLogo size={28} />
          Prime
        </div>
        <div className="hidden md:flex gap-8 ml-12">
          <a href="#features" className="text-sm text-text-secondary font-medium hover:text-text-primary transition-colors">
            Features
          </a>
          <a href="#how" className="text-sm text-text-secondary font-medium hover:text-text-primary transition-colors">
            How it Works
          </a>
          <a href="#" className="text-sm text-text-secondary font-medium hover:text-text-primary transition-colors">
            Pricing
          </a>
        </div>
        <div className="ml-auto flex gap-3 items-center">
          <button
            onClick={handleGetStarted}
            className="hidden sm:inline-flex bg-transparent text-text-secondary font-medium text-sm px-4 py-2 cursor-pointer border-none hover:text-text-primary"
          >
            Sign In
          </button>
          <button
            onClick={handleGetStarted}
            className="bg-primary-base text-white font-semibold text-sm rounded-xs px-5 py-2.5 cursor-pointer border-none hover:bg-primary-hover hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(140,96,243,0.3)] transition-all duration-150"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-40 md:pt-44 pb-24 md:pb-28 px-6 md:px-12 text-center overflow-hidden">
        {/* Glow */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none animate-glow-pulse"
          style={{
            background: "radial-gradient(circle, rgba(140,96,243,0.25) 0%, transparent 70%)",
            top: "-120px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        {/* Dots */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #c8b5f5 0.8px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <SR className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 pl-2 bg-bg-surface border border-border-subtle rounded-full text-[13px] text-text-secondary font-medium mb-7">
            <span className="w-2 h-2 rounded-full bg-primary-base animate-badge-pulse" />
            Now in public beta
          </div>
        </SR>

        <SR delay={0.08} as="h1" className="relative z-10 font-bold tracking-[-0.04em] leading-[1.05] max-w-3xl mx-auto mb-5" >
          <span className="text-[40px] sm:text-5xl md:text-6xl lg:text-7xl block">
            Document workflows,
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #8C60F3 0%, #b794f6 50%, #6A3ECE 100%)",
              }}
            >
              built for teams.
            </span>
          </span>
        </SR>

        <SR delay={0.16} as="p" className="relative z-10 text-lg text-text-secondary leading-relaxed max-w-xl mx-auto mb-9">
          Create polished reports from reusable templates, manage your organization, and track every document — all in one focused workspace.
        </SR>

        <SR delay={0.24} className="relative z-10 flex gap-3 justify-center items-center flex-wrap">
          <button
            onClick={handleGetStarted}
            className="bg-primary-base text-white font-semibold text-[15px] rounded-md px-8 py-3.5 cursor-pointer border-none hover:bg-primary-hover hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(140,96,243,0.3)] transition-all duration-150"
          >
            Start for Free
          </button>
          <button
            className="bg-bg-surface text-text-primary border border-border-default font-semibold text-[15px] rounded-md px-8 py-3.5 cursor-pointer hover:bg-bg-hover transition-colors"
          >
            See a Demo
          </button>
        </SR>

        {/* Product preview */}
        <SR delay={0.32} className="relative z-10 max-w-4xl mx-auto mt-16 rounded-xl overflow-hidden border border-border-subtle shadow-[0_24px_80px_rgba(53,49,72,0.12),0_2px_8px_rgba(53,49,72,0.06)]">
          <div className="bg-bg-surface relative" style={{ aspectRatio: "16/9.5" }}>
            <div className="h-11 bg-bg-surface border-b border-border-subtle flex items-center px-4 gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-bg-hover" />
              <div className="w-2.5 h-2.5 rounded-full bg-bg-hover" />
              <div className="w-2.5 h-2.5 rounded-full bg-bg-hover" />
              <div className="flex-1" />
              <div className="w-20 h-2 bg-border-subtle rounded" />
            </div>
            <div className="absolute left-0 top-11 bottom-0 w-44 bg-bg-surface border-r border-border-subtle p-3">
              <div className="h-2 mb-1.5 rounded w-[70%] bg-primary-subtle border border-primary-border" />
              <div className="h-2 mb-1.5 rounded w-[60%] bg-border-subtle" />
              <div className="h-2 mb-1.5 rounded w-[80%] bg-border-subtle" />
              <div className="h-2 mb-1.5 rounded w-[50%] bg-border-subtle" />
            </div>
            <div className="absolute left-44 top-11 right-0 bottom-0 p-8">
              <div className="h-3.5 mb-2 rounded w-[40%] bg-text-primary/10" />
              <div className="h-2 mb-2 rounded w-[70%] bg-border-subtle" />
              <div className="h-2 mb-2 rounded w-[85%] bg-border-subtle" />
              <div className="h-2 mb-2 rounded w-[60%] bg-border-subtle" />
              <div className="mt-5 px-4 py-3.5 bg-primary-subtle border border-primary-border rounded-xs">
                <div className="h-2 mb-1 rounded w-[50%] bg-primary-border" />
                <div className="h-2 rounded w-[70%] bg-primary-border opacity-50" />
              </div>
              <div className="h-2 mt-5 mb-2 rounded w-[90%] bg-border-subtle" />
              <div className="h-2 rounded w-[75%] bg-border-subtle" />
            </div>
          </div>
        </SR>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 md:py-28 px-6 md:px-12 max-w-6xl mx-auto">
        <SR>
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase text-primary-base mb-4 before:content-[''] before:w-5 before:h-0.5 before:bg-primary-base before:rounded">
            Features
          </div>
        </SR>
        <SR delay={0.08} as="h2" className="text-3xl md:text-4xl font-bold tracking-tight leading-tight max-w-xl mb-14">
          Everything you need
          <br />
          to manage documents.
        </SR>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <SR key={f.title} delay={0.08 * ((i % 3) + 1)} className="p-7 bg-bg-surface border border-border-subtle rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(53,49,72,0.08)]">
              <div className="w-11 h-11 rounded-md bg-primary-subtle border border-primary-border flex items-center justify-center mb-5 text-primary-base">
                {f.svg}
              </div>
              <h3 className="text-base font-semibold mb-2 tracking-tight">{f.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
            </SR>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 md:py-28 px-6 md:px-12 bg-text-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(140,96,243,0.15) 0.8px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <SR>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase text-primary-border mb-4 before:content-[''] before:w-5 before:h-0.5 before:bg-primary-border before:rounded">
              How it works
            </div>
          </SR>
          <SR delay={0.08} as="h2" className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-16 text-white">
            Three steps to better
            <br />
            document workflows.
          </SR>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <SR key={s.num} delay={0.08 * (i + 1)} className="relative">
                <div className="text-6xl font-extrabold tracking-tight leading-none mb-4" style={{ color: "rgba(140,96,243,0.2)" }}>
                  {s.num}
                </div>
                <h3 className="text-lg font-semibold mb-2.5">{s.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-12 w-8 h-0.5 bg-primary-base/30" />
                )}
              </SR>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-24 px-6 md:px-12 text-center relative overflow-hidden">
        <div
          className="absolute pointer-events-none"
          style={{
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(140,96,243,0.15) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <SR as="h2" className="relative z-10 text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Ready to streamline your reports?
        </SR>
        <SR delay={0.08} as="p" className="relative z-10 text-base text-text-secondary mb-8 max-w-md mx-auto">
          Start creating professional documents with your team today. Free during beta.
        </SR>
        <SR delay={0.16} className="relative z-10">
          <button
            onClick={handleGetStarted}
            className="bg-primary-base text-white font-semibold text-[15px] rounded-md px-8 py-3.5 cursor-pointer border-none hover:bg-primary-hover hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(140,96,243,0.3)] transition-all duration-150"
          >
            Get Started — It's Free
          </button>
        </SR>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-12 border-t border-border-subtle max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-10">
          <div className="col-span-2 max-w-60">
            <div className="flex items-center gap-2 font-bold text-base tracking-tight mb-3">
              <PrimeLogo size={28} />
              Prime
            </div>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              Document workflows, built for teams. Create reports from reusable templates, manage your organization, and track usage.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary mb-3.5">Product</h4>
            <a href="#" className="block text-[13px] text-text-secondary py-1 no-underline hover:text-text-primary">Features</a>
            <a href="#" className="block text-[13px] text-text-secondary py-1 no-underline hover:text-text-primary">Pricing</a>
            <a href="#" className="block text-[13px] text-text-secondary py-1 no-underline hover:text-text-primary">Changelog</a>
            <a href="#" className="block text-[13px] text-text-secondary py-1 no-underline hover:text-text-primary">Roadmap</a>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary mb-3.5">Company</h4>
            <a href="#" className="block text-[13px] text-text-secondary py-1 no-underline hover:text-text-primary">About</a>
            <a href="#" className="block text-[13px] text-text-secondary py-1 no-underline hover:text-text-primary">Blog</a>
            <a href="#" className="block text-[13px] text-text-secondary py-1 no-underline hover:text-text-primary">Careers</a>
            <a href="#" className="block text-[13px] text-text-secondary py-1 no-underline hover:text-text-primary">Contact</a>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary mb-3.5">Legal</h4>
            <a href="#" className="block text-[13px] text-text-secondary py-1 no-underline hover:text-text-primary">Privacy</a>
            <a href="#" className="block text-[13px] text-text-secondary py-1 no-underline hover:text-text-primary">Terms</a>
            <a href="#" className="block text-[13px] text-text-secondary py-1 no-underline hover:text-text-primary">Security</a>
          </div>
        </div>
        <div className="flex justify-between items-center pt-6 border-t border-border-subtle text-xs text-text-muted">
          <span>© 2025 Prime Reports. All rights reserved.</span>
          <span>Built with care.</span>
        </div>
      </footer>
    </div>
  );
}
