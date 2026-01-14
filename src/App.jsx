import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ====== Local inline icon set (no external fetch) =============================
const IconBase = ({ children, className = "h-6 w-6", strokeWidth = 1.6 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const Icons = {
  Phone: (p) => (
    <IconBase {...p}>
      <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.72 19.72 0 0 1-8.59-3.07 19.38 19.38 0 0 1-6-6 19.72 19.72 0 0 1-3.07-8.6A2 2 0 0 1 4.18 1h2a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L7 8a16 16 0 0 0 9 9l.67-1.27a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92z" />
    </IconBase>
  ),
  Calendar: (p) => (
    <IconBase {...p}>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M8 2v4M16 2v4M3 10h18" />
    </IconBase>
  ),
  Building: (p) => (
    <IconBase {...p}>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-2M14 21v-2" />
    </IconBase>
  ),
  Scissors: (p) => (
    <IconBase {...p}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <path d="M20 4L7 13M7 11l13 9" />
    </IconBase>
  ),
  Tooth: (p) => (
    <IconBase {...p}>
      <path d="M8 3c-2.5 0-4 2.2-4 4.6C4 11 6 13 6 16s1.2 5 2.5 5c1.6 0 1.8-3 3.5-3s1.9 3 3.5 3C17.8 21 19 19 19 16s2-5 2-8.4C21 5.2 19.5 3 17 3c-2.2 0-3.2 1.4-5 1.4S10.2 3 8 3z" />
    </IconBase>
  ),
  Stethoscope: (p) => (
    <IconBase {...p}>
      <path d="M6 3v4a4 4 0 1 0 8 0V3M10 11v2a5 5 0 0 0 10 0v-1" />
      <circle cx="20" cy="12" r="2" />
    </IconBase>
  ),
  Wrench: (p) => (
    <IconBase {...p}>
      <path d="M21 2l-4.5 4.5a3.5 3.5 0 1 0 1 1L22 3l-1-1z" />
      <path d="M12 8L4 16l4 4 8-8" />
      <circle cx="5" cy="19" r="1" />
    </IconBase>
  ),
  Shield: (p) => (
    <IconBase {...p}>
      <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
    </IconBase>
  ),
  Headphones: (p) => (
    <IconBase {...p}>
      <path d="M4 14v4a2 2 0 0 0 2 2h1V12a7 7 0 0 1 14 0v8h-1a2 2 0 0 1-2-2v-4" />
      <path d="M4 14a8 8 0 1 1 16 0" />
    </IconBase>
  ),
  Globe: (p) => (
    <IconBase {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2c3 3.5 3 14.5 0 20M12 2c-3 3.5-3 14.5 0 20" />
    </IconBase>
  ),
  BarChart: (p) => (
    <IconBase {...p}>
      <path d="M3 21h18" />
      <rect x="6" y="10" width="3" height="8" rx="1" />
      <rect x="11" y="6" width="3" height="12" rx="1" />
      <rect x="16" y="13" width="3" height="5" rx="1" />
    </IconBase>
  ),
  Sparkles: (p) => (
    <IconBase {...p}>
      <path d="M12 2l2.5 5 5 2.5-5 2.5L12 17l-2.5-5L4.5 9.5 9.5 7z" />
      <path d="M19 17l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
    </IconBase>
  ),
  Message: (p) => (
    <IconBase {...p}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M7 18l-4 3V6" />
    </IconBase>
  ),
  Clock: (p) => (
    <IconBase {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </IconBase>
  ),
  ArrowRight: (p) => (
    <IconBase {...p}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </IconBase>
  ),
  Check: (p) => (
    <IconBase {...p}>
      <path d="M20 6L9 17l-5-5" />
    </IconBase>
  ),
};

// ====== Error Boundary (prevents blank screen) ================================
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white p-6">
          <div className="mx-auto max-w-2xl rounded-xl border border-white/10 bg-white/5 p-6">
            <h1 className="text-xl font-semibold">Something went wrong.</h1>
            <p className="mt-2 text-sm text-white/70">
              A runtime error occurred. Check the console for details. Use the back button or refresh to continue.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ====== Quick Setup ===========================================================
const brand = {
  name: "Covex",
  tagline: "Websites that convert. Automations that scale.",
  supportEmail: "support@covex.app",
  phone: "+1 (864) 787-8324",
};

const websitePricing = [
  {
    name: "One-Page Launch",
    setup: 999,
    monthly: 99,
    blurb: "A high-converting one-page site built to drive calls, texts, and form leads.",
    popular: false,
    features: [
      "Premium one-page layout (hero → services → proof → CTA → contact)",
      "Mobile-first + fast load",
      "Lead capture (call button, form routing, click-to-text)",
      "Basic on-page SEO (titles/meta, index-ready)",
      "Hosting, SSL, backups",
      "Monthly updates (small edits included)",
    ],
  },
  {
    name: "5-Page Growth",
    setup: 2999,
    monthly: 149,
    blurb: "For serious local businesses: service pages, credibility, and conversion flow.",
    popular: true,
    features: [
      "Up to 5 pages (Home, Services, About, Proof, Contact)",
      "Conversion-focused sections + CTAs",
      "Analytics + event tracking (calls/forms)",
      "Basic local SEO foundations",
      "Hosting, SSL, backups",
      "Monthly updates (more edits included)",
    ],
  },
  {
    name: "10-Page Authority",
    setup: 5999,
    monthly: 299,
    blurb: "For multi-service businesses that want maximum coverage and trust.",
    popular: false,
    features: [
      "Up to 10 pages (structured services + content)",
      "Advanced tracking + performance tuning",
      "Stronger SEO structure (internal linking, schema-ready)",
      "Speed optimization + QA",
      "Hosting, SSL, backups",
      "Priority monthly updates",
    ],
  },
];

const voiceUpgrade = {
  name: "Optional Upgrade: AI Receptionist",
  blurb:
    "After your site starts generating leads, upgrade your phones to capture every call, qualify leads, and book automatically.",
  bullets: [
    "24/7 call answering + intake",
    "Lead capture + summaries + call insights",
    "Booking + confirmations (calendar integration)",
    "Missed-call follow-up via SMS (optional)",
    "Routes VIP/urgent calls to your team",
  ],
  note:
    "We typically add voice automation after launch once you’ve seen lead flow and want higher conversion.",
};

const industries = [
  { label: "Home Services", icon: Icons.Wrench },
  { label: "Clinics & Med Spas", icon: Icons.Stethoscope },
  { label: "Dental Clinics", icon: Icons.Tooth },
  { label: "Auto Services", icon: Icons.Building },
  { label: "Studios & Boutiques", icon: Icons.Scissors },
];

const faqs = [
  {
    q: "Do you do custom designs or templates?",
    a: "We build premium, conversion-first layouts custom tailored to your business. The goal is simple: get you more calls, forms, and booked jobs—not just a “pretty website.”",
  },
  {
    q: "What does the monthly fee cover?",
    a: "Hosting, SSL, backups, basic security, and ongoing updates/edits. You’re not paying to “keep the lights on”—you’re paying for maintenance and continuous improvement.",
  },
  {
    q: "How fast can you launch?",
    a: "One-page sites can launch in ~3–7 days. 5-page sites typically take ~1–3 weeks. 10-page sites take ~3–6 weeks depending on content and approvals.",
  },
  {
    q: "Can you add the AI receptionist later?",
    a: "Yes. We’re intentionally website-first. Once your site is live and leads are coming in, we can upgrade your phone lines with a voice agent to capture every call and increase conversion.",
  },
  {
    q: "Do you handle copywriting and photos?",
    a: "We can work with your existing copy/photos or help refine them. If you need full copywriting or content creation, we can scope it as an add-on.",
  },
];

// ====== Utilities =============================================================
function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`relative scroll-mt-28 md:scroll-mt-32 py-24 md:py-32 ${className}`}>
      {children}
    </section>
  );
}

function Container({ className = "", children }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 md:px-8 ${className}`}>{children}</div>;
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

function GradientBG() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-500/30 via-sky-500/20 to-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-tr from-white/10 to-white/0 blur-2xl" />
      <div className="absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

function CheckItem({ text }) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-0.5 rounded-full bg-white/10 p-1">
        <Icons.Check className="h-3 w-3" />
      </div>
      <span className="text-white/80">{text}</span>
    </li>
  );
}

function scrollToId(e, id) {
  if (e) e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector("header");
  const offset = header ? header.offsetHeight + 16 : 96;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
  try {
    history.replaceState(null, "", `#${id}`);
  } catch {}
}

// ====== Main App ==============================================================
function AppInner() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    size: "",
    message: "",
    interest: "Website",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.group("Self-tests");
    try {
      console.assert(Array.isArray(websitePricing) && websitePricing.length === 3, "websitePricing should have 3 tiers");
      websitePricing.forEach((p) => {
        console.assert(typeof p.setup === "number" && p.setup > 0, `Setup invalid for ${p.name}`);
        console.assert(typeof p.monthly === "number" && p.monthly > 0, `Monthly invalid for ${p.name}`);
        console.assert(Array.isArray(p.features) && p.features.length > 0, `Features missing for ${p.name}`);
      });
      console.assert(typeof brand.supportEmail === "string" && brand.supportEmail.includes("@"), "Support email looks invalid");
      console.assert(typeof brand.phone === "string" && brand.phone.length >= 7, "Phone looks short");
      const ids = ["websites", "voice", "how", "pricing", "faq", "contact"];
      ids.forEach((id) => console.assert(!!document.getElementById(id), `Missing section #${id}`));
      console.log("All sanity checks passed.");
    } catch (e) {
      console.error("Self-tests error:", e);
    }
    console.groupEnd();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Lead:", form);
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-white/20 scroll-smooth">
      <GradientBG />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur">
        <Container className="py-1 md:py-1">
          <div className="grid grid-cols-2 md:grid-cols-3 items-center">
            <a href="/" className="flex items-center gap-3 justify-self-start -ml-3 md:-ml-6" aria-label={brand.name}>
              <img
                src="/upscalemedia-transformed.png"
                alt={brand.name}
                className="h-24 w-auto md:h-36 lg:h-40 -mt-2 md:-mt-3"
                loading="eager"
                decoding="async"
              />
            </a>

            <nav
              className="hidden md:flex items-center justify-center gap-7 text-sm text-white/70"
              role="navigation"
              aria-label="Primary"
            >
              <a
                href="#websites"
                onClick={(e) => scrollToId(e, "websites")}
                className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded-md"
              >
                Websites
              </a>
              <a
                href="#voice"
                onClick={(e) => scrollToId(e, "voice")}
                className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded-md"
              >
                Voice AI
              </a>
              <a
                href="#how"
                onClick={(e) => scrollToId(e, "how")}
                className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded-md"
              >
                Process
              </a>
              <a
                href="#pricing"
                onClick={(e) => scrollToId(e, "pricing")}
                className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded-md"
              >
                Pricing
              </a>
              <a
                href="#faq"
                onClick={(e) => scrollToId(e, "faq")}
                className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded-md"
              >
                FAQ
              </a>
            </nav>

            <div className="flex items-center gap-3 justify-self-end">
              <a
                href="#contact"
                onClick={(e) => scrollToId(e, "contact")}
                className="rounded-xl border border-white/15 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
              >
                Get a quote
              </a>

              {(typeof window !== "undefined" && localStorage.getItem("covex_session_token")) ? (
                <a
                  href="/dashboard"
                  className="hidden md:inline-block rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90"
                >
                  Dashboard
                </a>
              ) : (
                <a
                  href="/login"
                  className="hidden md:inline-block rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90"
                >
                  Login
                </a>
              )}
            </div>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <Section id="home" className="pt-8 md:pt-10">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
              Build a site that gets you booked.
            </h1>
            <p className="mt-4 text-base md:text-xl text-white/70">
              Covex builds conversion-first websites for local businesses—then upgrades your phones with AI to capture every lead.
            </p>
          </div>
        </Container>

        <Container className="mt-10 grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                Website first.
                <span className="block bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
                  Automation later.
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-base text-white/70 md:text-lg">
                We start by fixing your online presence—fast, clean, and built to convert. Once leads are flowing, you can optionally
                upgrade to a 24/7 AI receptionist so you stop missing calls and bookings.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#pricing"
                  onClick={(e) => scrollToId(e, "pricing")}
                  className="group inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
                >
                  View website pricing <Icons.ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => scrollToId(e, "contact")}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 text-sm text-white/80 hover:bg-white/10"
                >
                  Get a quote
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-white/50">
                <Pill>
                  <Icons.Sparkles className="h-3.5 w-3.5" /> Conversion-first design
                </Pill>
                <Pill>
                  <Icons.BarChart className="h-3.5 w-3.5" /> Tracking & analytics
                </Pill>
                <Pill>
                  <Icons.Shield className="h-3.5 w-3.5" /> Hosting, SSL, backups
                </Pill>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto w-full max-w-md"
          >
            <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 shadow-2xl backdrop-blur">
              <div className="mx-auto h-10 w-28 rounded-full bg-white/10" />
              <div className="mt-6 rounded-2xl bg-black/60 p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-black">
                    <Icons.Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{brand.name} Websites</p>
                    <p className="text-xs text-white/60">“Designed to get you calls, leads, and bookings.”</p>
                  </div>
                </div>
                <div className="mt-4 space-y-3 text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <Icons.Sparkles className="h-4 w-4" /> Premium layout + copy flow
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.BarChart className="h-4 w-4" /> Event tracking (calls/forms)
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.Headphones className="h-4 w-4" /> Optional AI receptionist upgrade
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gradient-to-tr from-white/30 to-white/0 blur-2xl" />
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* WEBSITES */}
      <Section id="websites" className="py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Website services</h2>
            <p className="mt-3 text-white/70">
              Clean design, fast load, and built-in conversion paths—so visitors become leads.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Icons.Globe, title: "Conversion-first layout", desc: "Above-the-fold clarity, strong CTAs, proof, and frictionless contact." },
              { icon: Icons.BarChart, title: "Tracking that matters", desc: "Track calls, forms, and key actions—know what’s actually working." },
              { icon: Icons.Shield, title: "Managed & protected", desc: "Hosting, SSL, backups, and ongoing updates—no fragile DIY setup." },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:bg-white/10"
              >
                <f.icon className="h-6 w-6 text-white" />
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-white/70">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* VOICE */}
      <Section id="voice" className="py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Voice AI (optional upgrade)</h2>
            <p className="mt-3 text-white/70">
              Once your website is producing leads, upgrade your phones to capture every call and convert more of what you already earn.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-black">
                  <Icons.Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{voiceUpgrade.name}</h3>
                  <p className="text-sm text-white/70">{voiceUpgrade.blurb}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-sm">
                {voiceUpgrade.bullets.map((b) => (
                  <CheckItem key={b} text={b} />
                ))}
              </ul>

              <p className="mt-6 text-xs text-white/50">{voiceUpgrade.note}</p>
              <a
                href="#contact"
                onClick={(e) => scrollToId(e, "contact")}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Ask about the upgrade <Icons.ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold">Why this order works</h3>
              <p className="mt-2 text-sm text-white/70">
                Most businesses don’t have a lead problem—they have a conversion problem. Website first gets you more inbound. Voice AI later
                increases conversion without hiring.
              </p>

              <div className="mt-6 space-y-4 text-sm text-white/75">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-white/10 p-1">
                    <Icons.Check className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="font-medium text-white/90">Step 1: Fix the funnel</p>
                    <p className="text-white/70">A site that clearly explains services, builds trust, and pushes action.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-white/10 p-1">
                    <Icons.Check className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="font-medium text-white/90">Step 2: Track conversions</p>
                    <p className="text-white/70">See calls/forms and know where leads come from.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-white/10 p-1">
                    <Icons.Check className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="font-medium text-white/90">Step 3: Capture every call</p>
                    <p className="text-white/70">Upgrade to AI receptionist once you want higher conversion.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* HOW IT WORKS */}
      <Section id="how" className="py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Process</h2>
            <p className="mt-3 text-white/70">A simple workflow that gets you live fast.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { title: "Discover", desc: "Quick call: your services, goal, competitors, and offer clarity.", icon: Icons.Message },
              { title: "Build", desc: "We design and build the site with conversion flow and tracking.", icon: Icons.Globe },
              { title: "Launch", desc: "Go live with SSL, backups, and lead routing dialed in.", icon: Icons.Shield },
              { title: "Optimize", desc: "Ongoing updates + optional automations as you scale.", icon: Icons.BarChart },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <s.icon className="h-6 w-6" />
                <h3 className="mt-4 text-lg font-semibold">
                  {i + 1}. {s.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-5">
            {industries.map(({ label, icon: Icon }, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-black">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* PRICING */}
      <Section id="pricing" className="py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Website pricing</h2>
            <p className="mt-3 text-white/70">Simple, productized packages. Website first, with optional upgrades later.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {websitePricing.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur ${
                  p.popular ? "ring-2 ring-white/30" : ""
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                    Most popular
                  </div>
                )}

                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-white/70">{p.blurb}</p>

                <div className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-white/70">Setup</span>
                    <span className="text-2xl font-semibold">${p.setup.toLocaleString()}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-white/70">Monthly</span>
                    <span className="text-2xl font-semibold">${p.monthly}</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <CheckItem key={f} text={f} />
                  ))}
                </ul>

                <a
                  href="#contact"
                  onClick={(e) => scrollToId(e, "contact")}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-white/90"
                >
                  Get started <Icons.ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-black">
                  <Icons.Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Optional upgrade</p>
                  <p className="text-white/70 text-sm">Add Voice AI after launch to capture every call and increase conversion.</p>
                </div>
              </div>
              <a
                href="#contact"
                onClick={(e) => scrollToId(e, "contact")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Ask about Voice AI <Icons.ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <p className="mt-4 text-xs text-white/50 text-center">
            Final scope depends on content complexity and integrations. We keep packages tight so delivery stays fast.
          </p>
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">FAQ</h2>
            <p className="mt-3 text-white/70">Everything you need to know before you get started.</p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10">
            {faqs.map((f, i) => (
              <details key={i} className="group p-6 open:bg-white/5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-left text-base font-medium text-white/90">
                  {f.q}
                  <span className="ml-4 rounded-full border border-white/10 bg-white/5 p-1 text-xs text-white/60">{i + 1}</span>
                </summary>
                <p className="mt-3 text-sm text-white/70">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="pb-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Get a quote</h2>
            <p className="mt-3 text-white/70">
              Tell us what you need. We’ll recommend the right website package and any optional automations.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6">
            {submitted ? (
              <div className="text-center">
                <h3 className="text-xl font-semibold">Thanks! We’ll reach out shortly.</h3>
                <p className="mt-2 text-white/70">
                  Prefer to talk now? Call us at{" "}
                  <a className="underline" href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`}>
                    {brand.phone}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
                <input
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/30"
                  placeholder="Full name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="email"
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/30"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/30"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <input
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/30"
                  placeholder="Business / Company"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
                <select
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-white/30"
                  value={form.size}
                  onChange={(e) => setForm({ ...form, size: e.target.value })}
                >
                  <option value="">Company size</option>
                  <option value="1-3">1–3 team members</option>
                  <option value="4-10">4–10 team members</option>
                  <option value="11-25">11–25 team members</option>
                  <option value="26+">26+ team members</option>
                </select>

                <select
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-white/30"
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                >
                  <option value="Website">Interested in: Website</option>
                  <option value="Website+VoiceAI">Interested in: Website + Voice AI upgrade</option>
                  <option value="VoiceAI">Interested in: Voice AI only</option>
                </select>

                <textarea
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/30 md:col-span-2"
                  rows={5}
                  placeholder="What should your website achieve? (calls, bookings, leads, service areas, etc.)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <button
                  type="submit"
                  className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
                >
                  Request quote <Icons.ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </Container>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-[rgba(255,255,255,.12)] py-8">
        <div className="container mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <img src="/upscalemedia-transformed.png" alt="Covex" className="h-8 w-auto" loading="eager" decoding="async" />
            <div className="text-xs">© {new Date().getFullYear()} — All rights reserved.</div>
          </div>

          <nav className="flex gap-4 text-sm text-white/70">
            <a className="hover:text-white" href={`mailto:${brand.supportEmail}`}>
              Support
            </a>
            <a className="hover:text-white" href="/privacy.html">
              Privacy
            </a>
            <a className="hover:text-white" href="/terms.html">
              Terms
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppInner />
    </ErrorBoundary>
  );
}
