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
      <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.72 19.72 0 0 1-8.59-3.07 19.38 19.38 0 0 1-6-6 19.72 19.72 0 0 1-3.07-8.6A2 2 0 0 1 4.18 1h2a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L7 8a16 16 0 0 0 9 9l.67-1.27a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92z"/>
    </IconBase>
  ),
  Calendar: (p) => (
    <IconBase {...p}>
      <rect x="3" y="4" width="18" height="17" rx="2"/>
      <path d="M8 2v4M16 2v4M3 10h18"/>
    </IconBase>
  ),
  Building: (p) => (
    <IconBase {...p}>
      <rect x="6" y="3" width="12" height="18" rx="2"/>
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-2M14 21v-2"/>
    </IconBase>
  ),
  Scissors: (p) => (
    <IconBase {...p}>
      <circle cx="6" cy="6" r="2"/>
      <circle cx="6" cy="18" r="2"/>
      <path d="M20 4L7 13M7 11l13 9"/>
    </IconBase>
  ),
  Tooth: (p) => (
    <IconBase {...p}>
      <path d="M8 3c-2.5 0-4 2.2-4 4.6C4 11 6 13 6 16s1.2 5 2.5 5c1.6 0 1.8-3 3.5-3s1.9 3 3.5 3C17.8 21 19 19 19 16s2-5 2-8.4C21 5.2 19.5 3 17 3c-2.2 0-3.2 1.4-5 1.4S10.2 3 8 3z"/>
    </IconBase>
  ),
  Stethoscope: (p) => (
    <IconBase {...p}>
      <path d="M6 3v4a4 4 0 1 0 8 0V3M10 11v2a5 5 0 0 0 10 0v-1"/>
      <circle cx="20" cy="12" r="2"/>
    </IconBase>
  ),
  Wrench: (p) => (
    <IconBase {...p}>
      <path d="M21 2l-4.5 4.5a3.5 3.5 0 1 0 1 1L22 3l-1-1z"/>
      <path d="M12 8L4 16l4 4 8-8"/>
      <circle cx="5" cy="19" r="1"/>
    </IconBase>
  ),
  Shield: (p) => (
    <IconBase {...p}>
      <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"/>
    </IconBase>
  ),
  Headphones: (p) => (
    <IconBase {...p}>
      <path d="M4 14v4a2 2 0 0 0 2 2h1V12a7 7 0 0 1 14 0v8h-1a2 2 0 0 1-2-2v-4"/>
      <path d="M4 14a8 8 0 1 1 16 0"/>
    </IconBase>
  ),
  Globe: (p) => (
    <IconBase {...p}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2c3 3.5 3 14.5 0 20M12 2c-3 3.5-3 14.5 0 20"/>
    </IconBase>
  ),
  BarChart: (p) => (
    <IconBase {...p}>
      <path d="M3 21h18"/>
      <rect x="6" y="10" width="3" height="8" rx="1"/>
      <rect x="11" y="6" width="3" height="12" rx="1"/>
      <rect x="16" y="13" width="3" height="5" rx="1"/>
    </IconBase>
  ),
  Sparkles: (p) => (
    <IconBase {...p}>
      <path d="M12 2l2.5 5 5 2.5-5 2.5L12 17l-2.5-5L4.5 9.5 9.5 7z"/>
      <path d="M19 17l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"/>
    </IconBase>
  ),
  Message: (p) => (
    <IconBase {...p}>
      <rect x="3" y="4" width="18" height="14" rx="2"/>
      <path d="M7 18l-4 3V6"/>
    </IconBase>
  ),
  Clock: (p) => (
    <IconBase {...p}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </IconBase>
  ),
  ArrowRight: (p) => (
    <IconBase {...p}>
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </IconBase>
  ),
  Check: (p) => (
    <IconBase {...p}>
      <path d="M20 6L9 17l-5-5"/>
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
            <p className="mt-2 text-sm text-white/70">A runtime error occurred. Check the console for details. Use the back button or refresh to continue.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ====== Quick Setup (edit these) =============================================
const brand = {
  name: "Covex",
  tagline: "An AI receptionist that books while you work.",
  supportEmail: "hello@ghostreception.com",
  phone: "+1 (864) 787-8324",
};

// Minutes TBD — replace "TBD" anytime.
const pricing = [
  {
    name: "Basic",
    price: 200,
    blurb: "Great for solo operators and small studios.",
    minutes: "TBD",
    cta: "Get Basic",
    popular: false,
    features: [
      "24/7 call answering & intake",
      "Appointment booking + confirmations",
      "Google Calendar sync",
      "Spam + robocall filtering",
      "Call transcripts & summaries",
    ],
  },
  {
    name: "Standard",
    price: 400,
    blurb: "Perfect for busy storefronts & clinics.",
    minutes: "TBD",
    cta: "Get Standard",
    popular: true,
    features: [
      "Everything in Basic",
      "Multi-location & team routing",
      "Two-way SMS follow-ups",
      "Custom call flows & keywords",
      "Analytics dashboard",
    ],
  },
  {
    name: "Pro",
    price: 650,
    blurb: "Scale-ready with premium support.",
    minutes: "TBD",
    cta: "Get Pro",
    popular: false,
    features: [
      "Everything in Standard",
      "Priority onboarding (72h)",
      "Dedicated success manager",
      "Advanced reporting & exports",
      "Webhook/CRM integrations",
    ],
  },
];

const industries = [
  { label: "Barbers & Salons", icon: Icons.Scissors },
  { label: "Dental Clinics", icon: Icons.Tooth },
  { label: "Medical & Med Spas", icon: Icons.Stethoscope },
  { label: "Auto & Body Shops", icon: Icons.Wrench },
  { label: "Studios & Boutiques", icon: Icons.Building },
];

const faqs = [
  {
    q: "How does the AI actually book appointments?",
    a: "We connect to your calendar (e.g., Google Calendar). The receptionist understands availability, proposes times to callers, books, and sends confirmations—without double-booking.",
  },
  {
    q: "Can it forward calls to my team?",
    a: "Yes. Set rules like business hours, VIP lists, or keywords—then auto-transfer to a person when needed.",
  },
  {
    q: "What about privacy & security?",
    a: "We follow security best-practices, encrypt data in transit, and offer data retention controls. Healthcare customers should reach out for compliance options.",
  },
  {
    q: "Does it support multiple locations?",
    a: "Absolutely. Route by location, service line, language, or staff availability.",
  },
  {
    q: "What happens if a caller speaks another language?",
    a: "We support multilingual interactions for common languages and can tailor flows for your audience.",
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
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 md:px-8 ${className}`}>{children}</div>
  );
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
      <div className="mt-0.5 rounded-full bg-white/10 p-1"><Icons.Check className="h-3 w-3" /></div>
      <span className="text-white/80">{text}</span>
    </li>
  );
}

// Smooth-scroll helper that avoids router/hash glitches
function scrollToId(e, id) {
  if (e) e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector('header');
  const offset = header ? header.offsetHeight + 16 : 96;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
  try { history.replaceState(null, '', `#${id}`); } catch {}
}

// ====== Main App ==============================================================
function AppInner() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", size: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.group("Self-tests");
    try {
      console.assert(Array.isArray(pricing) && pricing.length === 3, "Pricing should have 3 tiers");
      pricing.forEach((p) => {
        console.assert(typeof p.price === "number" && p.price > 0, `Price invalid for ${p.name}`);
        console.assert(typeof p.minutes === "string", `Minutes must be a string for ${p.name}`);
      });
      console.assert(typeof brand.supportEmail === "string" && brand.supportEmail.includes("@"), "Support email looks invalid");
      console.assert(typeof brand.phone === "string" && brand.phone.length >= 7, "Phone looks short");
      // Anchor sanity: ensure nav hash links have matching section IDs
      const ids = ["features","industries","how","pricing","faq"]; ids.forEach(id => console.assert(!!document.getElementById(id), `Missing section #${id}`));
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

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur">
        <Container className="flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-3" aria-label={brand.name}>
            <img
              src="/upscalemedia-transformed.png"
              alt={brand.name}
              className="h-12 w-auto md:h-20 lg:h-24"
              loading="eager"
              decoding="async"
            />
          </a>
          <nav className="hidden items-center gap-7 text-sm text-white/70 md:flex" role="navigation" aria-label="Primary">
            <a href="#features" onClick={(e)=>scrollToId(e,'features')} className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded-md">Features</a>
            <a href="#industries" onClick={(e)=>scrollToId(e,'industries')} className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded-md">Industries</a>
            <a href="#how" onClick={(e)=>scrollToId(e,'how')} className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded-md">How it works</a>
            <a href="#pricing" onClick={(e)=>scrollToId(e,'pricing')} className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded-md">Pricing</a>
            <a href="#faq" onClick={(e)=>scrollToId(e,'faq')} className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded-md">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" onClick={(e)=>scrollToId(e,'contact')} className="rounded-xl border border-white/15 px-3 py-2 text-sm text-white/90 hover:bg-white/10">Book a demo</a>
            <a href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`} className="hidden rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90 md:inline-block">
              Call us
            </a>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <Section id="home" className="pt-20">
        <Container className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Pill>
                <Icons.Sparkles className="h-3.5 w-3.5" />
                {brand.tagline}
              </Pill>
              <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                Let callers book themselves.
                <span className="block bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">Effortless. On-brand. 24/7.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base text-white/70 md:text-lg">
                {brand.name} answers every call, understands intent, and schedules real appointments directly on your calendar. No missed calls. No lost revenue.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#contact" onClick={(e)=>scrollToId(e,'contact')} className="group inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5">
                  Book a live demo <Icons.ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
                <a href="#pricing" onClick={(e)=>scrollToId(e,'pricing')} className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 text-sm text-white/80 hover:bg-white/10">
                  See pricing
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-white/50">
                <Pill><Icons.Phone className="h-3.5 w-3.5" /> Twilio-ready</Pill>
                <Pill><Icons.Calendar className="h-3.5 w-3.5" /> Google Calendar</Pill>
                <Pill><Icons.Shield className="h-3.5 w-3.5" /> Privacy-first</Pill>
              </div>
            </motion.div>
          </div>

          {/* Phone Preview Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mx-auto w-full max-w-md">
            <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 shadow-2xl backdrop-blur">
              <div className="mx-auto h-10 w-28 rounded-full bg-white/10" />
              <div className="mt-6 rounded-2xl bg-black/60 p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-black"><Icons.Headphones className="h-5 w-5" /></div>
                  <div>
                    <p className="text-sm font-semibold">{brand.name}</p>
                    <p className="text-xs text-white/60">"Hi! We can get you scheduled in under 60 seconds."</p>
                  </div>
                </div>
                <div className="mt-4 space-y-3 text-xs text-white/70">
                  <div className="flex items-center gap-2"><Icons.Clock className="h-4 w-4" /> 24/7 answering</div>
                  <div className="flex items-center gap-2"><Icons.Calendar className="h-4 w-4" /> Live calendar booking</div>
                  <div className="flex items-center gap-2"><Icons.Message className="h-4 w-4" /> SMS confirmations</div>
                </div>
              </div>
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gradient-to-tr from-white/30 to-white/0 blur-2xl" />
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* FEATURES */}
      <Section id="features">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">The modern front desk—without the desk.</h2>
            <p className="mt-3 text-white/70">Everything you expect from a great receptionist—done instantly, consistently, and on-brand.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Icons.Phone, title: "Natural conversations", desc: "Understands callers, handles intake, and gets to the point fast." },
              { icon: Icons.Calendar, title: "Real booking power", desc: "Checks availability, proposes times, books, reschedules, cancels." },
              { icon: Icons.Globe, title: "Multilingual support", desc: "Serve more customers in their preferred language." },
              { icon: Icons.Shield, title: "Spam & screening", desc: "Blocks robocalls, filters sales, and routes VIPs to you." },
              { icon: Icons.BarChart, title: "Transcripts & analytics", desc: "Every call summarized. Trends that help you staff smarter." },
              { icon: Icons.Headphones, title: "Smart transfers", desc: "Escalates to your team on rules you define." },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:bg-white/10">
                <f.icon className="h-6 w-6 text-white" />
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-white/70">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* INDUSTRIES */}
      <Section id="industries" className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Built for real businesses</h2>
            <p className="mt-3 text-white/70">From barbershops to dental clinics, {brand.name} adapts to your flow—not the other way around.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-5">
            {industries.map(({ label, icon: Icon }, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-black"><Icon className="h-5 w-5" /></div>
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* HOW IT WORKS */}
      <Section id="how" className="py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">How it works</h2>
            <p className="mt-3 text-white/70">A simple setup that feels like magic to callers.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[ 
              { title: "Connect", desc: "We connect your phone line and calendar. Set your hours and rules.", icon: Icons.Phone },
              { title: "Understand", desc: "AI greets callers, understands intent, and captures details.", icon: Icons.Message },
              { title: "Book", desc: "It proposes times, books, reschedules, or cancels as needed.", icon: Icons.Calendar },
              { title: "Sync", desc: "Everything is logged, summarized, and synced to your systems.", icon: Icons.BarChart },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <s.icon className="h-6 w-6" />
                <h3 className="mt-4 text-lg font-semibold">{i + 1}. {s.title}</h3>
                <p className="mt-2 text-sm text-white/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* PRICING */}
      <Section id="pricing" className="py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Simple pricing, real results</h2>
            <p className="mt-3 text-white/70">No long-term contracts. Start, pause, or upgrade anytime.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pricing.map((p) => (
              <div key={p.name} className={`relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur ${p.popular ? "ring-2 ring-white/30" : ""}`}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">Most popular</div>
                )}
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <Pill><Icons.Clock className="h-3.5 w-3.5" /> Minutes: {p.minutes}</Pill>
                </div>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-4xl font-semibold">${p.price}</span>
                  <span className="text-white/60">/month</span>
                </div>
                <p className="mt-2 text-sm text-white/70">{p.blurb}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <CheckItem key={f} text={f} />
                  ))}
                </ul>
                <a href="#contact" onClick={(e)=>scrollToId(e,'contact')} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-white/90">
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* SOCIAL PROOF (simple) */}
      <Section className="py-10">
        <Container>
          <div className="grid items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold">Customers cut missed calls by 60%+</h3>
              <p className="mt-2 text-sm text-white/70">Fewer voicemails, faster bookings, happier clients. Let your team focus on service—not the phone.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
              <Pill>Avg. first response: &lt;2s</Pill>
              <Pill>Bookings in-call</Pill>
              <Pill>Works with your number</Pill>
            </div>
          </div>
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
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Book a live demo</h2>
            <p className="mt-3 text-white/70">See {brand.name} handle a call end-to-end and place a real booking on your calendar.</p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6">
            {submitted ? (
              <div className="text-center">
                <h3 className="text-xl font-semibold">Thanks! We’ll reach out shortly.</h3>
                <p className="mt-2 text-white/70">Prefer to talk now? Call us at <a className="underline" href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`}>{brand.phone}</a>.</p>
              </div>
            ) : (
              <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
                <input className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/30 md:col-span-1" placeholder="Full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input type="email" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/30 md:col-span-1" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/30 md:col-span-1" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/30 md:col-span-1" placeholder="Business / Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                <select className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/30 md:col-span-1" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}>
                  <option value="">Company size</option>
                  <option value="1-3">1–3</option>
                  <option value="4-10">4–10</option>
                  <option value="11-25">11–25</option>
                  <option value="26+">26+</option>
                </select>
                <textarea className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/30 md:col-span-2" rows={5} placeholder="What do you want your receptionist to handle?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                <button type="submit" className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90">
                  Request demo <Icons.ArrowRight className="h-4 w-4" />
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
            <img
              src="/upscalemedia-transformed.png"   
              alt="Covex"
              className="h-8 w-auto"
              loading="eager"
              decoding="async"
            />
            <div className="text-xs">© {new Date().getFullYear()} — All rights reserved.</div>
          </div>

          <nav className="flex gap-4">
            <a href="mailto:support@covex.app">Support</a>
            <a href="/privacy.html">Privacy</a>
            <a href="/terms.html">Terms</a>
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
