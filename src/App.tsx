import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Bot,
  Check,
  ChevronDown,
  CircuitBoard,
  Cloud,
  Code2,
  Copy,
  Cpu,
  FileDown,
  GitBranch,
  Globe2,
  Layers3,
  MapPin,
  Menu,
  MessageCircle,
  PenTool,
  Send,
  ServerCog,
  Sparkles,
  TerminalSquare,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import {
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import HeroScene from "./components/HeroScene";
import ProjectVisual from "./components/ProjectVisual";
import SystemScene from "./components/SystemScene";
import { blueprints, projects, skillGroups, socialLinks, workflowSteps, type Project } from "./data";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
];

const skillIcons = [Code2, Cloud, Bot, CircuitBoard, PenTool];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 54, clipPath: "inset(0 0 18% 0)" }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProfilePortrait({ reducedMotion }: { reducedMotion: boolean }) {
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 160, damping: 22 });
  const rotateY = useSpring(rotateYValue, { stiffness: 160, damping: 22 });
  const transform = useMotionTemplate`perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const handlePointer = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateXValue.set(y * -10);
    rotateYValue.set(x * 12);
  };

  const reset = () => {
    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  return (
    <motion.div
      className="profile-tilt"
      style={{ transform }}
      onMouseMove={handlePointer}
      onMouseLeave={reset}
      initial={reducedMotion ? false : { opacity: 0, y: 60, rotate: 5 }}
      animate={reducedMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1.2, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="profile-frame">
        <img src="/images/dea-vanna-profile.jpg" alt="Dea Vanna, IT and Electrical Engineering student" loading="eager" fetchPriority="high" />
        <div className="profile-shade" />
        <div className="profile-topline"><span>DV—01</span><span>PHNOM PENH</span></div>
        <div className="profile-caption"><small>STUDENT / BUILDER</small><strong>Dea Vanna</strong></div>
      </div>
      <div className="profile-badge badge-code"><Code2 size={14} /><span>FULL-STACK</span></div>
      <div className="profile-badge badge-system"><Cpu size={14} /><span>SYSTEMS</span></div>
      <div className="profile-orbit" aria-hidden="true"><i /><i /></div>
    </motion.div>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener("keydown", trapFocus);
    return () => {
      dialog.removeEventListener("keydown", trapFocus);
      previousFocus?.focus();
    };
  }, []);

  return (
    <motion.div
      className="dialog-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        className={`project-dialog tone-${project.tone}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        initial={{ opacity: 0, y: 70, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 45, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="dialog-topbar">
          <span>CASE STUDY / {project.number}</span>
          <button type="button" onClick={onClose} aria-label="Close case study" autoFocus><X size={20} /></button>
        </div>
        <div className="dialog-scroll">
          <div className="dialog-visual"><ProjectVisual project={project} /></div>
          <div className="dialog-heading">
            <div><p>{project.category} — {project.label}</p><h2 id="dialog-title">{project.title}</h2></div>
            <a href={project.link} target="_blank" rel="noreferrer" className="round-link" aria-label={project.linkLabel}><ArrowUpRight size={24} /></a>
          </div>
          <div className="dialog-body">
            <div className="dialog-main-copy"><p>{project.caseStudy}</p><div className="dialog-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
            <div className="dialog-contribution"><small>MY CONTRIBUTION</small><p>{project.contribution}</p></div>
          </div>
          <div className="dialog-deliverables">
            <small>KEY DELIVERABLES</small>
            <div>{project.deliverables.map((item, index) => <p key={item}><span>0{index + 1}</span>{item}<Check size={16} /></p>)}</div>
          </div>
          <a className="button button-primary dialog-cta" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel}<ArrowUpRight size={17} /></a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const reducedMotion = useReducedMotion() ?? false;
  const heroRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [filter, setFilter] = useState("All work");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openSkill, setOpenSkill] = useState(0);
  const [blueprintIndex, setBlueprintIndex] = useState(0);
  const [nodeIndex, setNodeIndex] = useState(0);
  const [toast, setToast] = useState("");
  const [localTime, setLocalTime] = useState("");

  const { scrollYProgress: pageProgress } = useScroll();
  const smoothPageProgress = useSpring(pageProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroTextY = useTransform(heroProgress, [0, 1], [0, reducedMotion ? 0 : -110]);
  const heroOpacity = useTransform(heroProgress, [0, 0.78], [1, reducedMotion ? 1 : 0]);
  const portraitY = useTransform(heroProgress, [0, 1], [0, reducedMotion ? 0 : 150]);
  const portraitScale = useTransform(heroProgress, [0, 1], [1, reducedMotion ? 1 : 0.82]);

  const filteredProjects = useMemo(
    () => filter === "All work" ? projects : projects.filter((project) => project.category === filter),
    [filter],
  );
  const activeBlueprint = blueprints[blueprintIndex];

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Phnom_Penh",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date()));
    };
    updateTime();
    const timer = window.setInterval(updateTime, 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const sections = ["about", "expertise", "work", "process", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      }),
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const locked = menuOpen || Boolean(selectedProject);
    document.body.style.overflow = locked ? "hidden" : "";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen, selectedProject]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const copyTelegram = async () => {
    const text = "@deavanna1";
    try {
      await navigator.clipboard.writeText(text);
      setToast("Telegram handle copied");
    } catch {
      const input = document.createElement("textarea");
      input.value = text;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      const copied = document.execCommand("copy");
      input.remove();
      setToast(copied ? "Telegram handle copied" : "Telegram: @deavanna1");
    }
  };

  const downloadContact = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:Dea Vanna",
      "N:Vanna;Dea;;;",
      "TITLE:IT & Electrical Engineering Student | Full-Stack Developer",
      "ADR:;;;Phnom Penh;;;Cambodia",
      "URL:https://github.com/deavanna007",
      "URL:https://t.me/deavanna1",
      "NOTE:Full-stack web development, automation systems, and hardware operations.",
      "END:VCARD",
    ].join("\r\n");
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dea-vanna.vcf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setToast("Contact card downloaded");
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <motion.div className="page-progress" style={{ scaleX: smoothPageProgress }} />
      <div className="noise" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Dea Vanna, back to top"><span>DV</span><i>.</i></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={activeSection === item.href.slice(1) ? "active" : ""}>
              <span>{item.label}</span><i />
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <span className="local-time"><i />PP {localTime || "--:--"}</span>
          <a className="header-contact" href="https://t.me/deavanna1" target="_blank" rel="noreferrer">Let’s talk<ArrowUpRight size={15} /></a>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-navigation"><Menu size={22} /></button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}>
            <div className="mobile-menu-top"><span className="brand"><span>DV</span><i>.</i></span><button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" autoFocus><X size={24} /></button></div>
            <nav aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <motion.a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + index * 0.06 }}><small>0{index + 1}</small>{item.label}<ArrowUpRight /></motion.a>
              ))}
              <motion.a href="#contact" onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}><small>05</small>Contact<ArrowUpRight /></motion.a>
            </nav>
            <div className="mobile-menu-footer"><span>Phnom Penh, Cambodia</span><a href="https://github.com/deavanna007" target="_blank" rel="noreferrer">GitHub ↗</a></div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content">
        <section className="hero" id="top" ref={heroRef} aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />
          <motion.div className="hero-scene" style={{ opacity: heroOpacity }}>
            <HeroScene progress={heroProgress} reducedMotion={reducedMotion} />
          </motion.div>
          <motion.div className="hero-content" style={{ y: heroTextY, opacity: heroOpacity }}>
            <motion.div className="hero-kicker" initial={reducedMotion ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
              <span><i />Portfolio / 2026</span><span>Phnom Penh, Cambodia</span>
            </motion.div>
            <h1 id="hero-title" className="hero-title">
              <span className="title-mask"><motion.span initial={reducedMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>DEA</motion.span></span>
              <span className="title-mask title-last"><motion.span initial={reducedMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}>VANNA</motion.span></span>
            </h1>
            <motion.div className="hero-intro" initial={reducedMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
              <p>IT & Electrical Engineering student building <strong>full-stack web experiences</strong>, intelligent automations, and practical systems.</p>
              <div className="hero-buttons">
                <a href="#work" className="button button-primary">Explore my work<ArrowDown size={16} /></a>
                <a href="https://t.me/deavanna1" target="_blank" rel="noreferrer" className="text-link">Telegram me<ArrowUpRight size={16} /></a>
              </div>
            </motion.div>
          </motion.div>
          <motion.div className="hero-portrait" style={{ y: portraitY, scale: portraitScale }}><ProfilePortrait reducedMotion={reducedMotion} /></motion.div>
          <motion.div className="hero-bottom" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15, duration: 0.8 }}>
            <div className="hero-disciplines"><span>WEB DEVELOPMENT</span><i /><span>AUTOMATION</span><i /><span>ELECTRICAL SYSTEMS</span></div>
            <a href="#about" className="scroll-cue"><span>Scroll to discover</span><ArrowDown size={15} /></a>
          </motion.div>
        </section>

        <div className="marquee" aria-label="Core technologies">
          <div className="marquee-track">
            {[0, 1].map((set) => <div className="marquee-set" key={set} aria-hidden={set === 1}>{["JavaScript ES6+", "Python", "Node.js", "Tailwind CSS", "Telegram APIs", "VMware", "Figma", "Vercel"].map((item) => <span key={item}>{item}<Sparkles size={13} /></span>)}</div>)}
          </div>
        </div>

        <section className="about section-pad" id="about" aria-labelledby="about-title">
          <div className="section-index"><span>01</span><i /><small>ABOUT ME</small></div>
          <div className="about-layout">
            <Reveal className="about-heading">
              <p className="eyebrow">Engineering curiosity.<br />Design sensibility.</p>
              <h2 id="about-title" className="section-title">I turn logic into<br /><em>useful experiences.</em></h2>
            </Reveal>
            <Reveal className="about-copy" delay={0.1}>
              <p className="about-lead">My name is Dea Vanna. I’m a driven IT and Electrical Engineering student based in Phnom Penh, Cambodia.</p>
              <p>I specialize in full-stack web development, automation systems, and hardware operations. My technical approach combines precise code execution with functional UI/UX design—bringing ideas from local development to production.</p>
              <a href="#expertise" className="text-link">Explore my technical core<ArrowRight size={16} /></a>
            </Reveal>
          </div>
          <div className="about-facts">
            {[
              { icon: MapPin, label: "Based in", value: "Phnom Penh, KH", note: "Building for a connected world" },
              { icon: CircuitBoard, label: "Studying", value: "IT + Electrical", note: "Two disciplines, one systems mindset" },
              { icon: Layers3, label: "Focused on", value: "Web + Automation", note: "From first wireframe to deployment" },
            ].map((fact, index) => {
              const Icon = fact.icon;
              return <Reveal className="fact-card" delay={index * 0.08} key={fact.label}><div className="fact-top"><Icon size={20} strokeWidth={1.4} /><span>0{index + 1}</span></div><small>{fact.label}</small><h3>{fact.value}</h3><p>{fact.note}</p></Reveal>;
            })}
          </div>
        </section>

        <section className="expertise section-pad" id="expertise" aria-labelledby="expertise-title">
          <div className="section-heading-row">
            <Reveal><p className="eyebrow"><span>02</span> Technical core</p><h2 id="expertise-title" className="section-title">Across the stack.<br /><em>Beyond the browser.</em></h2></Reveal>
            <Reveal className="section-side-copy" delay={0.1}><p>A versatile toolkit shaped around one goal: making digital products work beautifully and reliably in the real world.</p><span>Select a discipline to explore <ArrowDown size={14} /></span></Reveal>
          </div>
          <div className="skills-list">
            {skillGroups.map((group, index) => {
              const Icon = skillIcons[index];
              const isOpen = openSkill === index;
              return (
                <Reveal key={group.title} delay={index * 0.04}>
                  <article className={`skill-row ${isOpen ? "open" : ""}`}>
                    <button type="button" onClick={() => setOpenSkill(isOpen ? -1 : index)} aria-expanded={isOpen} aria-controls={`skill-panel-${index}`}>
                      <span className="skill-number">{group.number}</span>
                      <span className="skill-icon"><Icon size={22} strokeWidth={1.3} /></span>
                      <span className="skill-title"><small>{group.short}</small><strong>{group.title}</strong></span>
                      <span className="skill-toggle">{isOpen ? <X size={20} /> : <ChevronDown size={20} />}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div id={`skill-panel-${index}`} className="skill-panel" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.25 } }}>
                          <div className="skill-panel-inner"><p>{group.description}</p><div className="skill-tags">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <SystemScene />

        <section className="work section-pad" id="work" aria-labelledby="work-title">
          <div className="section-heading-row work-heading">
            <Reveal><p className="eyebrow"><span>04</span> Selected work</p><h2 id="work-title" className="section-title">Built to be used.<br /><em>Shipped to be seen.</em></h2></Reveal>
            <Reveal className="work-count" delay={0.1}><strong>05</strong><span>Projects across<br />web & automation</span></Reveal>
          </div>
          <Reveal className="project-filters">
            <div role="group" aria-label="Filter projects">
              {["All work", "Web platforms", "Bots & automation"].map((item) => <button type="button" key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}<span>{item === "All work" ? projects.length : projects.filter((project) => project.category === item).length}</span></button>)}
            </div>
            <p>Click any project for the full case study.</p>
          </Reveal>
          <motion.div layout className={`projects-grid ${filteredProjects.length === 2 ? "two-projects" : ""}`}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  layout
                  key={project.id}
                  className={`project-card tone-${project.tone} ${filter === "All work" && index === 0 ? "project-featured" : ""}`}
                  initial={{ opacity: 0, y: 45, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button type="button" className="project-open" onClick={() => setSelectedProject(project)} aria-label={`Open ${project.title} case study`}>
                    <ProjectVisual project={project} />
                    <div className="project-info">
                      <div className="project-meta"><span>{project.number} / {project.category}</span><span className="project-arrow"><ArrowUpRight size={19} /></span></div>
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                      <div className="project-card-bottom"><div>{project.stack.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div><small>View case study</small></div>
                    </div>
                  </button>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <section className="automation section-pad" id="automation" aria-labelledby="automation-title">
          <div className="section-index"><span>05</span><i /><small>AUTOMATION ANATOMY</small></div>
          <div className="section-heading-row">
            <Reveal><h2 id="automation-title" className="section-title">Look inside<br /><em>the workflow.</em></h2></Reveal>
            <Reveal className="section-side-copy" delay={0.1}><p>Good automation is a sequence of clear decisions. Explore three architecture maps drawn from my web and bot projects.</p><span>Interactive map — select any node <ArrowRight size={14} /></span></Reveal>
          </div>
          <Reveal className="blueprint-shell">
            <div className="blueprint-tabs" role="tablist" aria-label="Workflow architecture">
              {blueprints.map((blueprint, index) => (
                <button
                  type="button"
                  role="tab"
                  id={`blueprint-tab-${blueprint.id}`}
                  aria-controls="blueprint-panel"
                  aria-selected={blueprintIndex === index}
                  tabIndex={blueprintIndex === index ? 0 : -1}
                  key={blueprint.id}
                  className={blueprintIndex === index ? "active" : ""}
                  onClick={() => { setBlueprintIndex(index); setNodeIndex(0); }}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                    event.preventDefault();
                    const direction = event.key === "ArrowRight" ? 1 : -1;
                    const next = (index + direction + blueprints.length) % blueprints.length;
                    setBlueprintIndex(next);
                    setNodeIndex(0);
                    requestAnimationFrame(() => document.getElementById(`blueprint-tab-${blueprints[next].id}`)?.focus());
                  }}
                >
                  <span>0{index + 1}</span>{blueprint.label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div className="blueprint-content" id="blueprint-panel" role="tabpanel" aria-labelledby={`blueprint-tab-${activeBlueprint.id}`} key={activeBlueprint.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                <div className="blueprint-intro"><small>ARCHITECTURE / {activeBlueprint.label.toUpperCase()}</small><h3>{activeBlueprint.title}</h3><p>{activeBlueprint.description}</p></div>
                <div className="node-map" role="group" aria-label={`${activeBlueprint.label} nodes`}>
                  {activeBlueprint.nodes.map((node, index) => (
                    <div className="node-wrap" key={node.name}>
                      <button type="button" className={`workflow-node ${nodeIndex === index ? "active" : ""}`} onClick={() => setNodeIndex(index)} aria-pressed={nodeIndex === index}>
                        <span className="node-index">0{index + 1}</span>
                        <span className="node-symbol">{index === 0 ? <MessageCircle size={21} /> : index === 1 ? <TerminalSquare size={21} /> : index === 2 ? <ServerCog size={21} /> : <Zap size={21} />}</span>
                        <strong>{node.name}</strong>
                        <small>{nodeIndex === index ? "SELECTED" : "SELECT NODE"}</small>
                      </button>
                      {index < activeBlueprint.nodes.length - 1 && <div className="node-connector" aria-hidden="true"><i /><ArrowRight size={15} /></div>}
                    </div>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div className="node-detail" key={`${activeBlueprint.id}-${nodeIndex}`} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.28 }}>
                    <span>NODE 0{nodeIndex + 1}</span><strong>{activeBlueprint.nodes[nodeIndex].name}</strong><p>{activeBlueprint.nodes[nodeIndex].detail}</p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </section>

        <section className="hardware" id="hardware" aria-labelledby="hardware-title">
          <div className="hardware-inner section-pad">
            <div className="hardware-copy">
              <Reveal><p className="eyebrow dark"><span>06</span> Systems & electrical</p><h2 id="hardware-title" className="section-title">The screen is only<br /><em>half the system.</em></h2><p className="hardware-lead">My electrical engineering background adds a physical dimension to the way I build: understand the current, isolate the fault, and respect the whole system.</p></Reveal>
              <div className="hardware-list">
                {[
                  { icon: ServerCog, title: "Virtual environments", text: "VMware Workstation and VirtualBox for isolated systems practice, testing environments, and hands-on labs." },
                  { icon: Wrench, title: "Systems diagnostics", text: "A methodical approach to investigating behavior, isolating issues, and understanding how components interact." },
                  { icon: Zap, title: "Electrical layouts", text: "Foundations in motor control circuits and architectural wiring layouts connect software logic to physical infrastructure." },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return <Reveal className="hardware-item" delay={index * 0.08} key={item.title}><span><Icon size={20} /></span><div><small>0{index + 1}</small><h3>{item.title}</h3><p>{item.text}</p></div></Reveal>;
                })}
              </div>
            </div>
            <Reveal className="circuit-panel" delay={0.15}>
              <div className="circuit-header"><span>SYSTEM MAP / DV—06</span><i /></div>
              <svg viewBox="0 0 560 620" role="img" aria-label="Abstract circuit diagram connecting interface, compute, and electrical systems">
                <defs><linearGradient id="circuitGlow" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#141713" /><stop offset="1" stopColor="#617c15" /></linearGradient></defs>
                <g className="circuit-grid-lines" opacity="0.12">{[80, 160, 240, 320, 400, 480].map((x) => <line key={`x${x}`} x1={x} y1="20" x2={x} y2="600" />)}{[100, 180, 260, 340, 420, 500].map((y) => <line key={`y${y}`} x1="20" y1={y} x2="540" y2={y} />)}</g>
                <g className="circuit-traces" fill="none" stroke="url(#circuitGlow)" strokeWidth="2">
                  <path d="M60 150 H180 V250 H280" /><path d="M500 150 H390 V250 H280" /><path d="M60 470 H180 V370 H280" /><path d="M500 470 H390 V370 H280" /><path d="M280 310 V550 H440" />
                </g>
                <g className="circuit-pulses" fill="#708e1c"><circle r="5"><animateMotion dur="4s" repeatCount="indefinite" path="M60 150 H180 V250 H280" /></circle><circle r="5"><animateMotion dur="5s" repeatCount="indefinite" path="M500 470 H390 V370 H280" /></circle></g>
                <g className="circuit-nodes" fill="#f0f0e8" stroke="#171a16" strokeWidth="2">{[[60,150],[500,150],[60,470],[500,470],[440,550]].map(([x,y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="9" />)}</g>
                <rect x="220" y="250" width="120" height="120" rx="8" fill="#171a16" />
                <rect x="238" y="268" width="84" height="84" rx="4" fill="none" stroke="#d9ff63" strokeWidth="1.5" />
                <text x="280" y="306" textAnchor="middle" fill="#d9ff63" fontSize="14" fontFamily="monospace">DV / CORE</text><text x="280" y="328" textAnchor="middle" fill="#f0f0e8" fontSize="10" fontFamily="monospace">LOGIC + CURRENT</text>
                <g fill="#171a16" fontSize="11" fontFamily="monospace"><text x="38" y="130">INTERFACE</text><text x="430" y="130">AUTOMATION</text><text x="38" y="500">HARDWARE</text><text x="438" y="500">CONTROL</text><text x="398" y="580">DIAGNOSTICS</text></g>
              </svg>
              <div className="circuit-footer"><span>SOFTWARE</span><i>+</i><span>HARDWARE</span><i>=</i><strong>SYSTEMS THINKING</strong></div>
            </Reveal>
          </div>
        </section>

        <section className="process section-pad" id="process" aria-labelledby="process-title">
          <div className="process-layout">
            <div className="process-sticky">
              <Reveal><p className="eyebrow"><span>07</span> How I work</p><h2 id="process-title" className="section-title">From first thought<br /><em>to final release.</em></h2><p>One continuous process, with design and engineering informing each other at every step.</p></Reveal>
            </div>
            <div className="process-steps">
              {workflowSteps.map((step, index) => (
                <Reveal className="process-step" delay={index * 0.06} key={step.title}>
                  <div className="process-number"><span>{step.number}</span><i /></div>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                  <span className="process-icon">{index === 0 ? <Globe2 /> : index === 1 ? <PenTool /> : index === 2 ? <Code2 /> : <Cloud />}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contact" aria-labelledby="contact-title">
          <div className="contact-glow" aria-hidden="true" />
          <Reveal className="contact-top"><p className="eyebrow"><span>08</span> Start a conversation</p><span className="contact-location"><MapPin size={15} />Phnom Penh · {localTime || "ICT"}</span></Reveal>
          <Reveal className="contact-heading" delay={0.08}>
            <h2 id="contact-title">Have an idea?<br /><em>Let’s make it work.</em></h2>
            <a className="contact-orb" href="https://t.me/deavanna1" target="_blank" rel="noreferrer" aria-label="Message Dea Vanna on Telegram"><span>LET’S TALK</span><Send size={30} strokeWidth={1.2} /><i /></a>
          </Reveal>
          <Reveal className="contact-actions" delay={0.12}>
            <button type="button" className="button button-outline" onClick={copyTelegram}><Copy size={16} />Copy Telegram handle</button>
            <button type="button" className="button button-outline" onClick={downloadContact}><FileDown size={16} />Save contact card</button>
          </Reveal>
          <div className="social-list">
            {socialLinks.map((social, index) => (
              <Reveal key={social.label} delay={index * 0.05}>
                <a href={social.url} target="_blank" rel="noreferrer" className="social-row"><span className="social-index">0{index + 1}</span><strong>{social.label}</strong><span>{social.handle}</span><span className="social-icon">{social.label === "GitHub" ? <GitBranch size={20} /> : <ArrowUpRight size={20} />}</span></a>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#top"><span>DV</span><i>.</i></a>
        <p>Designed & built with intention.<br /><span>© {new Date().getFullYear()} Dea Vanna</span></p>
        <div><span>PHNOM PENH, CAMBODIA</span><a href="#top">Back to top<ArrowUp size={14} /></a></div>
      </footer>

      <AnimatePresence>{selectedProject && <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="toast" role="status" initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }}><Check size={16} />{toast}</motion.div>}</AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export default App;
