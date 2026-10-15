import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect, type FormEvent } from "react";
import { ArrowUpRight, ArrowDown, ArrowUp, Mail, Send, Check, Menu, X } from "lucide-react";
import { LANGS, useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { GithubIcon, MagneticButton, Reveal, SectionHeading, TiltCard, softSpring } from "./primitives";

const OWNER = "orzech";
const EMAIL = "hello@orzechdev.pl";
const SECTIONS = ["about", "history", "projects", "contact"] as const;

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={softSpring}
      className="fixed inset-x-0 top-4 z-50 px-4"
    >
      <nav className={cn("liquid-glass mx-auto flex max-w-6xl items-center justify-between overflow-hidden rounded-full px-5 py-3 transition-all duration-700", scrolled && "py-2.5")}>
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-silver-bright">
          <img src="/logo-7.png" alt="" aria-hidden="true" className="h-7 w-7 object-contain" />
          {OWNER}
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {SECTIONS.map((s) => (
            <li key={s}>
              <a href={`#${s}`} className="relative text-sm text-muted-foreground transition-colors duration-300 hover:text-silver-bright after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-crimson-bright after:transition-all after:duration-500 hover:after:w-full">
                {t.nav[s]}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <div className="relative flex overflow-hidden rounded-full border border-border p-0.5">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={cn(
                  "relative z-10 rounded-full px-2.5 py-1 font-mono text-[11px] uppercase transition-colors",
                  lang === l ? "bg-crimson text-primary-foreground" : "text-muted-foreground hover:text-silver-bright",
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <button aria-label="Menu" onClick={() => setOpen((o) => !o)} className="rounded-full p-2 text-silver md:hidden">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      {open && (
        <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="liquid-glass mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl p-3 md:hidden">
          {SECTIONS.map((s) => (
            <li key={s}>
              <a onClick={() => setOpen(false)} href={`#${s}`} className="block rounded-xl px-3 py-2 text-sm text-silver hover:bg-accent">{t.nav[s]}</a>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.header>
  );
}

function FloatingShape({ className, delay, children }: { className: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      aria-hidden
      className={cn("absolute", className)}
      animate={{ y: [0, -24, 0], rotateX: [0, 25, 0], rotateY: [0, 45, 0], rotateZ: [0, 10, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32" style={{ perspective: 1200 }}>
      <FloatingShape className="right-[8%] top-[22%] hidden md:block" delay={0}>
        <div className="liquid-glass h-40 w-40 rotate-12 rounded-3xl" />
      </FloatingShape>
      <FloatingShape className="bottom-[18%] right-[28%] hidden md:block" delay={3}>
        <div className="liquid-glass h-20 w-20 rounded-full" />
      </FloatingShape>
      <FloatingShape className="left-[6%] top-[30%] hidden lg:block" delay={6}>
        <svg width="110" height="110" viewBox="0 0 120 120" className="text-silver/20">
          <defs>
            <linearGradient id="triangle-surface" x1="18" y1="20" x2="102" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="currentColor" stopOpacity="0.12" />
              <stop offset="0.55" stopColor="currentColor" stopOpacity="0.025" />
              <stop offset="1" stopColor="#000" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M64 13 111 88c2.5 4-.6 9-5.3 8.5L20 86c-4.8-.5-7-6-4.2-9.8L56.5 14c1.7-3.1 5.6-3.5 7.5-1Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.35"
            transform="translate(-4 -5)"
          />
          <path
            d="M64 13 111 88c2.5 4-.6 9-5.3 8.5L20 86c-4.8-.5-7-6-4.2-9.8L56.5 14c1.7-3.1 5.6-3.5 7.5-1Z"
            fill="url(#triangle-surface)"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
            opacity="0.7"
          />
          <path
            d="M64 13 111 88M20 86l-4-9.8M105.7 96.5l5.3-8.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.55"
            opacity="0.25"
          />
        </svg>
      </FloatingShape>

      <motion.div style={{ y, opacity }} className="relative mx-auto w-full max-w-6xl">
        <h1 className="text-[13vw] font-semibold leading-[0.92] tracking-[-0.04em] md:text-[7.5rem]">
          {[t.hero.line1, t.hero.line2].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-2">
              <motion.span
                key={line}
                className={cn("block", i === 0 ? "text-metal" : "text-silver/70")}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ ...softSpring, delay: 0.3 + i * 0.15 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <Reveal delay={0.6} className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">{t.hero.lead}</p>
          <div className="flex flex-wrap gap-4">
            <MagneticButton href="#contact">
              {t.hero.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
            </MagneticButton>
            <MagneticButton href="#projects" variant="ghost">{t.hero.secondary}</MagneticButton>
          </div>
        </Reveal>
      </motion.div>
      <motion.a href="#about" aria-label="Scroll" animate={{ y: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-crimson-bright">
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading label={t.about.label} title={t.about.title} />
          <div className="space-y-4">
            {t.about.lines.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...softSpring, delay: i * 0.12 }}
                className="text-xl leading-relaxed text-silver"
              >
                {line}
              </motion.p>
            ))}
          </div>
          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {t.about.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <p className="text-metal text-4xl font-semibold">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.2}>
          <TiltCard className="p-0">
            <div className="flex items-center gap-2 border-b border-border px-5 py-4">
              <span className="h-2.5 w-2.5 rounded-full bg-crimson-bright" />
              <span className="h-2.5 w-2.5 rounded-full bg-silver/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-silver/20" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">dev.ts</span>
            </div>
            <pre className="overflow-x-auto p-6 font-mono text-sm leading-7 text-muted-foreground">
              <code>
                <span className="text-crimson-bright">const</span> <span className="text-silver-bright">mvp</span> = {"{"}{"\n"}
                {"  "}name: <span className="text-silver-bright">"{OWNER}"</span>,{"\n"}
                {"  "}focus: [<span className="text-silver-bright">"Style"</span>, <span className="text-silver-bright">"Interface"</span>],{"\n"}
                {"  "}stack: [<span className="text-silver-bright">"React"</span>, <span className="text-silver-bright">"TypeScript"</span>, <span className="text-silver-bright">"And many more"</span>],{"\n"}
                {"  "}values: {"{"} creativity: <span className="text-crimson-bright">Infinity</span> {"}"},{"\n"}
                {"  "}available: <span className="text-crimson-bright">true</span>,{"\n"}
                {"}"};
              </code>
            </pre>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}

function TimelineItem({ job, index }: { job: { period: string; role: string; company: string; text: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const left = index % 2 === 0;
  return (
    <div ref={ref} className="relative grid items-center md:grid-cols-2 md:gap-16">
      <motion.span
        animate={{ scale: active ? 1 : 0.6, opacity: active ? 1 : 0.4 }}
        transition={softSpring}
        className={cn("absolute left-4 top-8 z-10 h-3 w-3 -translate-x-1/2 rounded-full md:left-1/2", active ? "bg-crimson-bright glow-crimson" : "bg-silver/40")}
      />
      <Reveal x={left ? -60 : 60} className={cn("pl-12 md:pl-0", left ? "md:col-start-1" : "md:col-start-2")}>
        <div className={cn("liquid-glass rounded-2xl p-7 transition-colors duration-700", active && "border-crimson-bright/40")}>
          <p className="font-mono text-xs uppercase tracking-widest text-crimson-bright">{job.period}</p>
          <h3 className="mt-3 text-xl font-semibold text-silver-bright">{job.role}</h3>
          <p className="text-sm text-silver/70">{job.company}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{job.text}</p>
        </div>
      </Reveal>
    </div>
  );
}

export function History() {
  const { t } = useI18n();
  return (
    <section id="history" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label={t.history.label} title={t.history.title} />
        <div className="relative space-y-14">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-transparent via-silver/40 to-transparent md:left-1/2" />
          {t.history.jobs.map((job, i) => (
            <TimelineItem key={`${job.period}-${job.role}`} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  const { t } = useI18n();
  return (
    <section id="projects" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label={t.projects.label} title={t.projects.title} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.projects.items.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.1} className="h-full">
              <TiltCard>
                <div className="flex h-full flex-col p-7">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <ArrowUpRight className="h-5 w-5 text-silver/50 transition-all duration-500 group-hover:rotate-45 group-hover:text-crimson-bright" />
                  </div>
                  <h3 className="text-metal mt-12 text-2xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{p.text}</p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <li key={s} className="rounded-full border border-silver/25 px-3 py-1 font-mono text-[11px] text-silver">{s}</li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type Status = "idle" | "sending" | "sent";

export function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "message", string>>>({});

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next: Partial<Record<"name" | "email" | "message", string>> = {};
    if (name.length < 2) next.name = t.contact.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t.contact.errEmail;
    if (message.length < 10) next.message = t.contact.errMessage;
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("sending");
    window.setTimeout(() => {
      setStatus("sent");
      form.reset();
    }, 1200);
  };

  const links = [
    { href: `mailto:${EMAIL}`, label: EMAIL, icon: <Mail className="h-4 w-4" /> },
    { href: "https://github.com", label: "github.com/mvporzech", icon: <GithubIcon className="h-4 w-4" /> },
  ];

  return (
    <section id="contact" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label={t.contact.label} title={t.contact.title} />
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="max-w-sm text-lg leading-relaxed text-muted-foreground">{t.contact.lead}</p>
            <p className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">{t.contact.direct}</p>
            <ul className="mt-5 space-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-4 text-silver transition-colors duration-300 hover:text-silver-bright">
                    <span className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 group-hover:border-crimson-bright/60 group-hover:text-crimson-bright">{l.icon}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <form onSubmit={submit} noValidate className="liquid-glass space-y-8 rounded-2xl p-8 md:p-10">
              {(["name", "email", "message"] as const).map((f) => (
                <div key={f}>
                  <label htmlFor={f} className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{t.contact[f]}</label>
                  {f === "message" ? (
                    <textarea id={f} name={f} rows={4} maxLength={2000} className="field resize-none" />
                  ) : (
                    <input id={f} name={f} type={f === "email" ? "email" : "text"} maxLength={f === "email" ? 255 : 100} className="field" />
                  )}
                  {errors[f] && <p className="mt-2 text-xs text-crimson-bright">{errors[f]}</p>}
                </div>
              ))}
              <div className="flex flex-wrap items-center gap-6">
                <button type="submit" disabled={status === "sending"} className="group inline-flex items-center gap-3 rounded-full bg-crimson px-7 py-4 text-sm font-medium text-primary-foreground glow-crimson transition-all duration-500 hover:bg-crimson-bright disabled:opacity-60">
                  {status === "sending" ? t.contact.sending : t.contact.send}
                  <Send className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </button>
                {status === "sent" && (
                  <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-sm text-silver">
                    <Check className="h-4 w-4 text-crimson-bright" /> {t.contact.sent}
                  </motion.p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} WaveZ Studio. {t.footer.rights}</p>
        <a href="#top" className="group flex items-center gap-2 transition-colors hover:text-silver-bright">
          {t.footer.top}
          <span className="liquid-glass flex h-9 w-9 items-center justify-center rounded-full transition-all duration-500 group-hover:border-crimson-bright/60 group-hover:text-crimson-bright">
            <ArrowUp className="h-4 w-4" />
          </span>
        </a>
      </div>
    </footer>
  );
}
