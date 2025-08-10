import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// NOTE: Removed dependency on external icon library to avoid CDN export mismatches
// Small inline SVG icon components are defined below so the component builds reliably.

function IconSun({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5.636 5.636L4.222 4.222M19.778 19.778l-1.414-1.414M19.778 4.222l-1.414 1.414M5.636 18.364l-1.414 1.414" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
function IconMoon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
function IconSearch({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconX({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconDownload({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 11l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 21H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconGitHub({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.5-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82A7.66 7.66 0 018 4.6c.68.003 1.36.092 2 .27 1.52-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  );
}
function IconLinkedIn({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.98h5V24H0V8.98zM8.5 8.98h4.78v2.07h.07c.66-1.25 2.27-2.57 4.68-2.57 5 0 5.93 3.29 5.93 7.57V24H18.2v-7.95c0-1.9-.03-4.34-2.64-4.34-2.64 0-3.05 2.07-3.05 4.2V24H8.5V8.98z"/>
    </svg>
  );
}

export default function GalaxyPortfolio() {
  const [themeDark, setThemeDark] = useState(true);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [projects] = useState(sampleProjects());
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight);
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.2,
      d: Math.random() * 0.03 + 0.005,
    }));

    let rafId = 0;
    function draw() {
      ctx.clearRect(0, 0, w, h);

      // faint nebula gradient overlay
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "rgba(6, 9, 23, 0.85)");
      g.addColorStop(0.4, "rgba(15, 13, 36, 0.7)");
      g.addColorStop(1, "rgba(4, 3, 7, 0.9)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // stars
      for (const s of stars) {
        ctx.beginPath();
        const alpha = 0.8 * (0.5 + Math.sin(Date.now() / 1000 + s.x) * 0.5);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.x += Math.cos(Date.now() * 0.0002 + s.x) * s.d * 2;
        s.y += Math.sin(Date.now() * 0.0001 + s.y) * s.d * 1.5;
        if (s.x > w + 10) s.x = -10;
        if (s.x < -10) s.x = w + 10;
        if (s.y > h + 10) s.y = -10;
        if (s.y < -10) s.y = h + 10;
      }

      // soft glowing orbs (nebula)
      ctx.beginPath();
      const rg = ctx.createRadialGradient(w * 0.2, h * 0.3, 10, w * 0.2, h * 0.3, 600);
      rg.addColorStop(0, "rgba(110, 24, 255, 0.08)");
      rg.addColorStop(1, "rgba(110, 24, 255, 0)");
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, w, h);

      rafId = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, [canvasRef]);

  useEffect(() => {
    document.documentElement.style.background = themeDark ? "#000" : "#0f172a";
  }, [themeDark]);

  const filtered = projects
    .filter((p) => activeFilter === "all" || p.tags.includes(activeFilter))
    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="relative min-h-screen text-slate-100 antialiased selection:bg-violet-600 selection:text-black">
      <canvas ref={canvasRef} className="fixed inset-0 -z-10" />

      <header className="sticky top-0 z-30 backdrop-blur-sm bg-black/30 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-400 flex items-center justify-center text-black font-bold shadow-2xl">G</div>
            <div className="hidden sm:block">
              <div className="text-lg font-semibold">Galaxy — Personal</div>
              <div className="text-xs text-white/60">Projects · Experiments · Notes</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <a href="#projects" className="hover:underline">Projects</a>
            <a href="#skills" className="hover:underline">Skills</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="#contact" className="hover:underline">Contact</a>
            <button onClick={() => setThemeDark(!themeDark)} aria-label="Toggle theme" className="p-2 rounded-md bg-white/5 hover:bg-white/6">
              {themeDark ? <IconSun /> : <IconMoon />}
            </button>
            <a href="/resume.pdf" className="flex items-center gap-2 px-3 py-1 rounded-md bg-gradient-to-r from-violet-600 to-indigo-500 text-black font-medium">Resume <IconDownload /></a>
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setThemeDark(!themeDark)} className="p-2 rounded-md bg-white/5">
              {themeDark ? <IconSun /> : <IconMoon />}
            </button>
            <button onClick={() => setShowMenu(true)} className="p-2 rounded-md bg-white/4">Menu</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }} className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Hi, I'm Naitik — I build clean code and stellar visuals.
            </motion.h1>
            <motion.p initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} className="mt-4 text-slate-300 max-w-xl">
              A civil engineering student turned web tinkerer. I craft interactive demos, tools and portfolio pieces that feel buttery-smooth. Explore my projects below — filter, launch demos, inspect source and play with live previews.
            </motion.p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 text-black font-semibold">Explore Projects</a>
              <a href="#contact" className="px-4 py-2 rounded-full border border-white/10 hover:bg-white/3">Get in touch</a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <StatCard title="Years Coding" value="3" />
              <StatCard title="Live Projects" value="12" />
              <StatCard title="Open source" value="8" />
              <StatCard title="Internship Goal" value="Microsoft" />
            </div>
          </div>

          <div className="relative p-6 rounded-2xl bg-white/3 backdrop-blur-sm border border-white/5">
            {/* Interactive orbital preview */}
            <OrbitalPreview />
          </div>
        </section>

        <section id="projects" className="mt-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Projects</h2>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-white/5 rounded-full px-3 py-1">
                <IconSearch />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects..." className="bg-transparent outline-none text-sm w-48" />
              </div>
              <div className="flex gap-2 items-center">
                {['all','web','ml','cv','design'].map(tag=> (
                  <button key={tag} onClick={()=>setActiveFilter(tag)} className={`px-3 py-1 rounded-full text-sm ${activeFilter===tag? 'bg-violet-600 text-black':'bg-white/4'}`}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <motion.div layout className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <motion.article layout key={p.id} whileHover={{ y: -6 }} className="rounded-xl p-4 bg-white/3 border border-white/5 cursor-pointer" onClick={() => setSelectedProject(p)}>
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-400 flex items-center justify-center font-bold text-black">{p.emoji}</div>
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-slate-300 mt-1 line-clamp-2">{p.description}</p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {p.tags.map(t => <span key={t} className="text-xs px-2 py-1 bg-white/5 rounded">{t}</span>)}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section id="skills" className="mt-16">
          <h2 className="text-2xl font-bold">Skills & Tools</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkillCard title="Languages" items={["C++","Python","HTML/CSS","JS"]} />
            <SkillCard title="Frameworks" items={["React","Tailwind","TensorFlow","OpenCV"]} />
            <SkillCard title="Other" items={["Git","LaTeX","MATLAB","SQL"]} />
          </div>
        </section>

        <section id="about" className="mt-16">
          <h2 className="text-2xl font-bold">About</h2>
          <div className="mt-4 text-slate-300 max-w-3xl">
            <p>
              I study civil engineering at IIT Bombay, but I live in the overlap between structural analysis and interactive web — building delightful visual experiences and robust, well-tested code. I like making projects that teach something and look beautiful.
            </p>
          </div>
        </section>

        <section id="contact" className="mt-16">
          <h2 className="text-2xl font-bold">Contact</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white/3 border border-white/5">
              <h3 className="font-semibold">Say hello</h3>
              <p className="text-sm text-slate-300 mt-2">Email me at <button onClick={()=>navigator.clipboard.writeText('naitik@example.com')} className="underline">naitik@example.com</button> or use the form.</p>

              <form onSubmit={(e)=>{e.preventDefault(); alert('This is a demo contact; wire up your backend to send messages.');}} className="mt-4 flex flex-col gap-3">
                <input placeholder="Your name" className="p-3 rounded bg-white/5 outline-none" />
                <input placeholder="Your email" className="p-3 rounded bg-white/5 outline-none" />
                <textarea placeholder="Message" className="p-3 rounded bg-white/5 outline-none h-28" />
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 rounded bg-gradient-to-r from-violet-600 to-indigo-500 text-black">Send</button>
                  <button type="button" onClick={()=>{navigator.clipboard.writeText('naitik@example.com'); alert('Email copied to clipboard');}} className="px-4 py-2 rounded border">Copy Email</button>
                </div>
              </form>
            </div>

            <div className="p-6 rounded-xl bg-white/3 border border-white/5">
              <h3 className="font-semibold">Quick links</h3>
              <div className="mt-4 flex flex-col gap-3">
                <a href="#projects" className="underline">Projects</a>
                <a href="https://github.com/" target="_blank" rel="noreferrer" className="underline flex items-center gap-2">GitHub <IconGitHub /></a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="underline flex items-center gap-2">LinkedIn <IconLinkedIn /></a>
              </div>

              <div className="mt-6">
                <h4 className="font-medium">Live Realtime Widgets</h4>
                <p className="text-sm text-slate-300 mt-2">Terminal preview, small interactive canvas demos and a tiny chart to showcase progress.</p>
                <div className="mt-3">
                  <TerminalPreview />
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-24 py-12 text-center text-sm text-white/60">
          Crafted with care · Galaxy Theme · Built with React + Tailwind + Framer Motion
        </footer>
      </main>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/70 backdrop-blur">
            <div className="max-w-sm mx-auto mt-24 bg-black/80 p-6 rounded-lg border border-white/5">
              <div className="flex items-center justify-between">
                <div className="font-bold">Menu</div>
                <button onClick={()=>setShowMenu(false)} aria-label="Close menu"><IconX /></button>
              </div>
              <nav className="mt-4 flex flex-col gap-3">
                <a href="#projects" onClick={()=>setShowMenu(false)}>Projects</a>
                <a href="#skills" onClick={()=>setShowMenu(false)}>Skills</a>
                <a href="#about" onClick={()=>setShowMenu(false)}>About</a>
                <a href="#contact" onClick={()=>setShowMenu(false)}>Contact</a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.98, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.98, y: 8 }} className="max-w-3xl w-full bg-black/90 rounded-2xl p-6 border border-white/5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-2xl font-bold">{selectedProject.title}</div>
                  <div className="text-sm text-slate-300 mt-1">{selectedProject.tags.join(' · ')}</div>
                </div>
                <div className="flex items-center gap-3">
                  <a href={selectedProject.live} target="_blank" rel="noreferrer" className="px-3 py-2 rounded bg-white/5">Open demo</a>
                  <a href={selectedProject.repo} target="_blank" rel="noreferrer" className="px-3 py-2 rounded border">Source</a>
                  <button onClick={()=>setSelectedProject(null)} className="p-2 rounded bg-white/5" aria-label="Close project"><IconX /></button>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-slate-300">{selectedProject.long}</p>
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div className="rounded bg-white/4 p-3">
                    <h4 className="font-medium">Preview</h4>
                    <div className="mt-2 h-40 rounded bg-black/60 flex items-center justify-center text-sm text-slate-300">Live iframe / canvas demo placeholder</div>
                  </div>
                  <div className="rounded bg-white/4 p-3">
                    <h4 className="font-medium">Tech</h4>
                    <div className="mt-2 flex flex-wrap gap-2">{selectedProject.tags.map(t=> <span key={t} className="px-2 py-1 bg-white/5 rounded text-xs">{t}</span>)}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- small helper components used inside the page ---------- */

function StatCard({ title, value }){
  return (
    <div className="p-3 rounded-xl bg-white/2 border border-white/5">
      <div className="text-sm text-slate-300">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}

function OrbitalPreview(){
  // lightweight interactive SVG orbit demo — responsive and interactive
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <motion.div whileHover={{ scale: 1.03 }} className="relative w-56 h-56">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="12" fill="url(#g1)" />
          <motion.circle animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }} transform="translate(100 100)" r="2" cx="50" cy="0" fill="#fff" />
          <g>
            <motion.ellipse rx="70" ry="30" cx="100" cy="100" stroke="rgba(255,255,255,0.08)" fill="none" />
          </g>
        </svg>
      </motion.div>
    </div>
  )
}

function SkillCard({ title, items }){
  return (
    <div className="p-4 rounded-xl bg-white/3 border border-white/5">
      <div className="font-semibold">{title}</div>
      <div className="mt-3 flex flex-wrap gap-2">{items.map(i=> <span key={i} className="px-2 py-1 bg-white/5 rounded text-sm">{i}</span>)}</div>
    </div>
  )
}

function TerminalPreview(){
  const [lines] = useState(["$ git clone https://github.com/you/portfolio","$ cd demo","$ npm run start","Server started on http://localhost:3000"]);
  return (
    <div className="rounded bg-black/60 p-3 font-mono text-sm text-slate-300">
      {lines.map((l,i)=> <div key={i} className="flex items-center gap-2"><span className="text-green-400">{i===lines.length-1? '>' : '$'}</span><span>{l}</span></div>)}
    </div>
  )
}

/* ---------- sample projects (replace with your real data) ---------- */
function sampleProjects(){
  return [
    { id: 1, title: 'Marble Motion', emoji: '🪨', description: 'Cinematic marble slow-motion reel generator.', long: 'A time-lapse and slow-motion rendering tool for marble textures and product presentation.', tags: ['web','design'], live: '#', repo: '#'},
    { id: 2, title: 'Edge Detector', emoji: '🔍', description: 'OpenCV experiment for edge detection and filters.', long: 'Real-time webcam edge detection with custom filters and export.', tags: ['cv','ml'], live: '#', repo: '#'},
    { id: 3, title: 'Neon Terminal', emoji: '🖥️', description: 'A browser-based terminal with small dev tools.', long: 'Terminal emulator with shortcuts, file viewer and sample projects.', tags: ['web'], live: '#', repo: '#'},
    { id: 4, title: 'Pose Playground', emoji: '🤖', description: 'Pose estimation + small visuals', long: 'A pose estimation demo using TensorFlow.js and webcam.', tags: ['ml','cv'], live: '#', repo: '#'},
    { id: 5, title: 'Portfolio CMS', emoji: '📚', description: 'A tiny CMS to upload and manage projects.', long: 'Local-only CMS to manage project metadata and images', tags: ['web','design'], live: '#', repo: '#'},
  ];
}
