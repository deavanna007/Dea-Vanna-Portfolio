import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Box, Braces, Check, Cloud, Code2, Layers3 } from "lucide-react";
import { useRef, useState } from "react";

const layers = [
  {
    name: "Interface",
    kicker: "The visible layer",
    description: "Responsive structure, clear hierarchy, and interactions that make the product understandable.",
    icon: Layers3,
  },
  {
    name: "Logic",
    kicker: "The behavior layer",
    description: "JavaScript, Python, and Node.js turn requirements into repeatable, task-focused behavior.",
    icon: Braces,
  },
  {
    name: "Integration",
    kicker: "The connection layer",
    description: "Telegram bots, AI platform APIs, and file workflows connect the product to useful services.",
    icon: Box,
  },
  {
    name: "Production",
    kicker: "The public layer",
    description: "Hosting, DNS, custom domains, and indexing take the build beyond a local machine.",
    icon: Cloud,
  },
];

function LayerContent({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="layer-ui">
        <div className="layer-window-bar"><i /><i /><i /><span>interface / responsive</span></div>
        <div className="layer-ui-body"><div className="layer-ui-copy"><small>BUILD WITH PURPOSE</small><b>Clear at<br />every screen.</b><span /></div><div className="layer-ui-art"><i /><i /><i /></div></div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="layer-code">
        <div><span>01</span><code><em>const</em> idea = <b>understand</b>(problem);</code></div>
        <div><span>02</span><code><em>const</em> flow = <b>design</b>(idea);</code></div>
        <div><span>03</span><code><em>await</em> <b>build</b>(flow);</code></div>
        <div><span>04</span><code><em>return</em> usefulProduct;</code></div>
        <Code2 size={42} strokeWidth={1} />
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="layer-integrations">
        <div className="integration-node"><span>TL</span><small>TELEGRAM</small></div>
        <div className="integration-lines"><i /><i /><i /></div>
        <div className="integration-node main-node"><Box size={28} /><small>BOT LOGIC</small></div>
        <div className="integration-lines reverse"><i /><i /><i /></div>
        <div className="integration-node"><span>AI</span><small>PLATFORM API</small></div>
      </div>
    );
  }
  return (
    <div className="layer-production">
      <div className="production-icon"><Cloud size={36} strokeWidth={1.2} /></div>
      <small>FROM LOCAL TO PRODUCTION</small>
      <strong>your-domain.site</strong>
      <div className="production-tags"><span><Check size={12} /> Hosting</span><span><Check size={12} /> DNS</span><span><Check size={12} /> Indexing</span></div>
    </div>
  );
}

function AssemblyLayer({ index, progress }: { index: number; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const starts = [
    { x: -22, y: -26, z: 160, r: -9 },
    { x: 24, y: -6, z: 50, r: 8 },
    { x: -18, y: 22, z: -60, r: -5 },
    { x: 20, y: 34, z: -150, r: 10 },
  ][index];
  const x = useTransform(progress, [0, 0.55, 1], [starts.x, 0, 0]);
  const y = useTransform(progress, [0, 0.55, 1], [starts.y, index * 5, index * 2]);
  const z = useTransform(progress, [0, 0.55, 1], [starts.z, (3 - index) * 44, (3 - index) * -10]);
  const rotate = useTransform(progress, [0, 0.55, 1], [starts.r, 0, 0]);
  const opacity = useTransform(progress, [0, 0.08, 0.82, 1], [0.35 + index * 0.12, 1, 1, index === 3 ? 1 : 0.12]);
  const transform = useMotionTemplate`translate3d(${x}%, ${y}%, ${z}px) rotateZ(${rotate}deg)`;

  return (
    <motion.div className={`assembly-layer assembly-layer-${index}`} style={{ transform, opacity, zIndex: 4 - index }}>
      <div className="assembly-layer-label"><span>0{index + 1}</span>{layers[index].name}</div>
      <LayerContent index={index} />
    </motion.div>
  );
}

function AnimatedSystem() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.55, 1], [56, 16, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.55, 1], [-10, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [0.74, 0.94, 1]);
  const stageTransform = useMotionTemplate`rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActive(Math.min(3, Math.floor(latest * 4)));
  });

  return (
    <section className="system-scene" ref={section} aria-labelledby="system-title">
      <div className="system-sticky">
        <div className="system-heading">
          <p className="eyebrow"><span>03</span> Systems, assembled</p>
          <h2 id="system-title">One build.<br /><em>Every layer.</em></h2>
        </div>
        <div className="system-copy">
          <div className="system-step-list">
            {layers.map((layer, index) => {
              const Icon = layer.icon;
              return (
                <button
                  type="button"
                  key={layer.name}
                  className={active === index ? "active" : ""}
                  onClick={() => {
                    const element = section.current;
                    if (!element) return;
                    const top = element.offsetTop + (element.offsetHeight - window.innerHeight) * ((index + 0.15) / 4);
                    window.scrollTo({ top, behavior: "smooth" });
                  }}
                  aria-label={`Scroll to ${layer.name} layer`}
                >
                  <span className="system-step-icon"><Icon size={16} /></span>
                  <span><small>0{index + 1} / {layer.kicker}</small><b>{layer.name}</b></span>
                </button>
              );
            })}
          </div>
          <div className="system-active-copy" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.24 }}>
                {layers[active].description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
        <div className="assembly-stage-wrap">
          <div className="assembly-coordinate coordinate-top">Y / 04</div>
          <div className="assembly-coordinate coordinate-bottom">X / 01</div>
          <motion.div className="assembly-stage" style={{ transform: stageTransform }}>
            {layers.map((layer, index) => <AssemblyLayer key={layer.name} index={index} progress={scrollYProgress} />)}
          </motion.div>
        </div>
        <div className="system-progress">
          <span>EXPLODED</span><div><motion.i style={{ scaleX: progressScale }} /></div><span>DEPLOYED</span>
        </div>
      </div>
    </section>
  );
}

function StaticSystem() {
  return (
    <section className="system-static section-pad" aria-labelledby="system-static-title">
      <p className="eyebrow"><span>03</span> Systems, assembled</p>
      <h2 id="system-static-title" className="section-title">One build. <em>Every layer.</em></h2>
      <div className="system-static-grid">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          return <article key={layer.name}><Icon size={22} /><small>0{index + 1} / {layer.kicker}</small><h3>{layer.name}</h3><p>{layer.description}</p></article>;
        })}
      </div>
    </section>
  );
}

export default function SystemScene() {
  const reducedMotion = useReducedMotion();
  return reducedMotion ? <StaticSystem /> : <AnimatedSystem />;
}
