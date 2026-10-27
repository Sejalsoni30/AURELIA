import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';
import { useDocTitle } from '../hooks/useUtils';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

gsap.registerPlugin(ScrollTrigger);

// Diamond dust particle canvas
function DiamondCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    const particles = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.6 + 0.2,
        sparkle: Math.random(),
        sparkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.sparkle += p.sparkleSpeed;
        const alpha = p.opacity * (0.4 + 0.6 * Math.abs(Math.sin(p.sparkle)));

        // Diamond shape
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.moveTo(0, -p.r * 2);
        ctx.lineTo(p.r, 0);
        ctx.lineTo(0, p.r * 2);
        ctx.lineTo(-p.r, 0);
        ctx.closePath();
        ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
        ctx.fill();
        ctx.restore();

        p.y -= p.speed;
        p.x += Math.sin(p.angle * 2) * 0.3;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} id="diamond-canvas" className="absolute inset-0 w-full h-full" />;
}

// Story steps configuration
const storySteps = [
  {
    step: '01',
    title: 'The Genesis',
    subtitle: 'Sustainable Sourcing',
    body: 'Every Aurelia piece begins with a responsible choice. We source our gold exclusively from certified recycled refineries and Fairmined partners across South America and Africa — communities where artisan mining is a generational tradition we are proud to uplift.',
    accent: 'rgba(180, 130, 30, 0.15)',
    gradient: 'linear-gradient(135deg, #1A1400 0%, #2C1F00 40%, #121212 100%)',
  },
  {
    step: '02',
    title: 'The Blueprint',
    subtitle: 'Master Artisan Design',
    body: 'In our Mumbai atelier, master craftsmen translate inspiration into precise technical drawings. Each piece is rendered in CAD and hand-sketched simultaneously — a dialogue between modern precision and centuries-old intuition. No two designs ever begin the same way.',
    accent: 'rgba(50, 80, 180, 0.12)',
    gradient: 'linear-gradient(135deg, #0A0C1A 0%, #151825 40%, #121212 100%)',
  },
  {
    step: '03',
    title: 'The Setting',
    subtitle: 'Diamond Precision',
    body: 'A diamond setter\'s art requires years of apprenticeship and an almost meditative stillness. Each stone is examined for its unique character — its inclusions, its fire — before being placed by hand under magnification. A single ring can hold 40 hours of setting work.',
    accent: 'rgba(180, 220, 255, 0.08)',
    gradient: 'linear-gradient(135deg, #080F1A 0%, #10182A 40%, #121212 100%)',
  },
  {
    step: '04',
    title: 'The Masterpiece',
    subtitle: 'Your Heirloom',
    body: 'After final polishing, each piece is evaluated under 10x magnification against our 42-point quality standard. Only then does it receive the Aurelia hallmark — a small gold \'A\' stamped inside the band. Your heirloom is ready to begin its story.',
    accent: 'rgba(212, 175, 55, 0.12)',
    gradient: 'linear-gradient(135deg, #141008 0%, #201808 40%, #121212 100%)',
  },
];

// SVG blueprint path for step 2 (animated)
function BlueprintSVG({ progress }) {
  const len = 800;
  const offset = len * (1 - Math.min(progress, 1));
  return (
    <svg viewBox="0 0 300 250" className="w-full max-w-sm opacity-40" aria-hidden="true">
      <defs>
        <linearGradient id="bp-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#E8C94A" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Ring outline */}
      <circle cx="150" cy="120" r="80" fill="none" stroke="url(#bp-grad)" strokeWidth="1.5" strokeDasharray={len} strokeDashoffset={offset} />
      <circle cx="150" cy="120" r="60" fill="none" stroke="url(#bp-grad)" strokeWidth="0.8" strokeDasharray={len} strokeDashoffset={offset * 1.2} />
      {/* Guide lines */}
      <line x1="150" y1="30" x2="150" y2="210" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="5,5" opacity="0.4" strokeDashoffset={offset} />
      <line x1="60" y1="120" x2="240" y2="120" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="5,5" opacity="0.4" strokeDashoffset={offset} />
      {/* Dimension marks */}
      <line x1="70" y1="40" x2="230" y2="40" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
      <line x1="70" y1="38" x2="70" y2="42" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
      <line x1="230" y1="38" x2="230" y2="42" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
      <text x="150" y="36" textAnchor="middle" fontSize="8" fill="#D4AF37" opacity="0.6">160mm</text>
      {/* Detail annotation */}
      <circle cx="230" cy="120" r="3" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6" />
      <line x1="233" y1="117" x2="255" y2="100" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
      <text x="257" y="98" fontSize="6" fill="#D4AF37" opacity="0.6">4-prong</text>
      <text x="257" y="106" fontSize="6" fill="#D4AF37" opacity="0.6">cathedral</text>
    </svg>
  );
}

// Diamond macro SVG for step 3
function DiamondMacroSVG() {
  return (
    <svg viewBox="0 0 300 280" className="w-full max-w-sm" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 40px rgba(180, 220, 255, 0.3))' }}>
      <defs>
        <radialGradient id="diam-glow" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#E0F4FF" />
          <stop offset="60%" stopColor="#7AB8E8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2060A0" stopOpacity="0.5" />
        </radialGradient>
        <filter id="diam-glow-filter">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Main diamond */}
      <polygon points="150,30 230,110 150,250 70,110" fill="url(#diam-glow)" filter="url(#diam-glow-filter)" />
      {/* Internal facets */}
      <line x1="150" y1="30" x2="150" y2="250" stroke="white" strokeWidth="0.8" opacity="0.3" />
      <line x1="70" y1="110" x2="230" y2="110" stroke="white" strokeWidth="0.8" opacity="0.3" />
      <line x1="150" y1="30" x2="70" y2="110" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="150" y1="30" x2="230" y2="110" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="70" y1="110" x2="150" y2="250" stroke="white" strokeWidth="0.5" opacity="0.2" />
      <line x1="230" y1="110" x2="150" y2="250" stroke="white" strokeWidth="0.5" opacity="0.2" />
      {/* Refraction sparkles */}
      {[[80, 80], [220, 90], [150, 55], [100, 145], [200, 145]].map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="white" strokeWidth="1" opacity="0.6" />
          <line x1={x - 8} y1={y} x2={x + 8} y2={y} stroke="white" strokeWidth="1" opacity="0.6" />
          <line x1={x - 5} y1={y - 5} x2={x + 5} y2={y + 5} stroke="white" strokeWidth="0.7" opacity="0.4" />
          <line x1={x + 5} y1={y - 5} x2={x - 5} y2={y + 5} stroke="white" strokeWidth="0.7" opacity="0.4" />
        </g>
      ))}
      {/* Prongs */}
      <circle cx="70" cy="110" r="6" fill="#D4AF37" opacity="0.9" />
      <circle cx="230" cy="110" r="6" fill="#D4AF37" opacity="0.9" />
      <circle cx="150" cy="30" r="5" fill="#D4AF37" opacity="0.9" />
      <circle cx="150" cy="250" r="5" fill="#D4AF37" opacity="0.9" />
    </svg>
  );
}

// Masterpiece rotating ring SVG for step 4
function MasterpieceSVG({ rotation }) {
  return (
    <svg viewBox="0 0 280 280" className="w-full max-w-sm" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 50px rgba(212,175,55,0.4))' }}>
      <defs>
        <linearGradient id="mp-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="40%" stopColor="#F0D060" />
          <stop offset="100%" stopColor="#B8942E" />
        </linearGradient>
        <radialGradient id="mp-diam" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#E8F4FF" />
          <stop offset="100%" stopColor="#7AB8E8" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      {/* Band */}
      <ellipse cx="140" cy="190" rx="88" ry="30" fill="url(#mp-gold)" transform={`rotate(${rotation}, 140, 140)`} />
      <ellipse cx="140" cy="155" rx="88" ry="30" fill="none" stroke="url(#mp-gold)" strokeWidth="28" transform={`rotate(${rotation}, 140, 140)`} />
      {/* Brilliance */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = ((angle + rotation) * Math.PI) / 180;
        const x = 140 + 95 * Math.cos(rad);
        const y = 155 + 26 * Math.sin(rad);
        return (
          <circle key={i} cx={x} cy={y} r="3" fill="#F0D060" opacity={0.4 + 0.4 * Math.abs(Math.sin(rad))} />
        );
      })}
      {/* Centre stone */}
      <polygon points="140,65 165,100 140,118 115,100" fill="url(#mp-diam)" />
      <polygon points="140,65 165,100 140,88" fill="white" opacity="0.7" />
      <polygon points="140,118 115,100 140,88" fill="#7AB8E8" opacity="0.4" />
      {/* Prongs */}
      {[[140, 60], [165, 100], [140, 118], [115, 100]].map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r="4" fill="url(#mp-gold)" />
      ))}
    </svg>
  );
}

export default function Home() {
  useDocTitle('', 'AURELIA – Fine Jewellery. The Art of Timeless Craftsmanship. Handcrafted diamonds and gold in Mumbai.');

  const heroRef = useRef(null);
  const storyWrapRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [rotation, setRotation] = useState(0);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Jump to specific step
  const goToStep = (index) => {
    setActiveStep(index);
    if (index === 3) setRotation(90);
    if (scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const target = st.start + ((index + 0.12) / 4) * (st.end - st.start);
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  // GSAP scroll-triggered story
  useEffect(() => {
    if (prefersReduced) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.story-pin-wrap',
        start: 'top top',
        end: '+=260%',
        pin: '.story-pin',
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          setStoryProgress(p);
          const step = Math.min(3, Math.floor(p * 4));
          setActiveStep(step);
          // Rotation for masterpiece step
          if (step === 3) setRotation(((p - 0.75) / 0.25) * 180);
        },
      },
    });

    scrollTriggerRef.current = tl.scrollTrigger;

    // Hero parallax: float upwards and fade out to prevent overlapping
    gsap.to('.hero-content', {
      y: -60,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Featured products reveal
    gsap.fromTo('.featured-card', 
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.featured-grid',
          start: 'top 80%',
        }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [prefersReduced]);

  const featuredProducts = products.slice(0, 4);
  const stepProgress = activeStep === 1 ? Math.max(0, (storyProgress - 0.25) / 0.25) : 0;

  return (
    <div className="bg-[#121212]">
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        aria-label="Hero section"
      >
        {/* Gold texture background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 60% 40%, rgba(212,175,55,0.12) 0%, rgba(180,130,20,0.06) 40%, transparent 70%), linear-gradient(180deg, #0A0800 0%, #121212 60%, #0D0D0D 100%)',
          }}
        />
        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(212,175,55,0.03) 2px, rgba(212,175,55,0.03) 4px)',
          }}
        />
        <DiamondCanvas />

        {/* Hero content */}
        <div className="hero-content relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="divider-gold mb-8">
            <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">Aurelia Fine Jewellery</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl text-[#F9F6F0] mb-6 leading-none">
            The Art of<br />
            <span className="italic text-[#D4AF37]">Timeless</span><br />
            Craftsmanship
          </h1>
          <p className="text-[#8A8580] text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Every piece a chapter. Every diamond a promise. Handcrafted in our Mumbai atelier since 2004.
          </p>
          <Link to="/collection" className="btn-gold">
            Explore the Collection <ArrowRight size={14} />
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <ChevronDown size={20} className="text-[#D4AF37] opacity-60" />
        </div>
      </section>

      {/* ── SCROLL-STORY (pinned) ── */}
      <div ref={storyWrapRef} className="story-pin-wrap relative z-20 bg-[#121212] w-full" aria-label="Our craft story">
        <div
          className="story-pin relative w-full h-screen min-h-screen flex flex-col justify-center overflow-hidden bg-[#121212] pt-20 pb-8"
          style={{ background: storySteps[activeStep]?.gradient || '#121212', transition: 'background 0.8s ease' }}
        >
          {/* Accent glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-700"
            style={{ background: `radial-gradient(ellipse at 70% 50%, ${storySteps[activeStep]?.accent || 'transparent'}, transparent 65%)` }}
          />

          {/* Interactive Step Switcher Tabs at top of story */}
          <div className="relative z-10 max-w-screen-xl mx-auto w-full px-6 md:px-12 mb-4 md:mb-6">
            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-none" role="tablist">
              {storySteps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => goToStep(i)}
                  role="tab"
                  aria-selected={activeStep === i}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs tracking-[0.2em] uppercase transition-all whitespace-nowrap border ${
                    activeStep === i
                      ? 'border-[#D4AF37] bg-[rgba(212,175,55,0.15)] text-[#D4AF37] font-semibold shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                      : 'border-transparent text-[#8A8580] hover:text-[#F9F6F0] hover:border-[rgba(212,175,55,0.3)]'
                  }`}
                >
                  <span className="text-[#D4AF37] opacity-60 mr-1.5">{s.step}</span>
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          <div className="relative z-10 w-full flex items-center">
            <div className="max-w-screen-xl mx-auto w-full px-6 md:px-12 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left: text panel */}
              <div className="glass-panel p-6 sm:p-8 md:p-12 max-w-lg shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">Step {storySteps[activeStep]?.step}</span>
                  <span className="text-[#8A8580] text-[10px] tracking-widest uppercase">Our Process</span>
                </div>
                <div className="gold-line mb-5" />
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#F9F6F0] mb-2 leading-tight">
                  {storySteps[activeStep]?.title}
                </h2>
                <p className="text-[#D4AF37] text-xs sm:text-sm tracking-widest uppercase mb-5 font-medium">
                  {storySteps[activeStep]?.subtitle}
                </p>
                <p className="text-[#8A8580] text-sm sm:text-base leading-relaxed min-h-[100px]">
                  {storySteps[activeStep]?.body}
                </p>

                {/* Step navigation controls */}
                <div className="flex items-center justify-between pt-5 mt-5 border-t border-[rgba(212,175,55,0.15)]">
                  <button
                    onClick={() => goToStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-[#8A8580] hover:text-[#D4AF37] transition-colors disabled:opacity-20 disabled:pointer-events-none"
                    aria-label="Previous step"
                  >
                    <ArrowLeft size={14} /> Prev
                  </button>
                  <div className="text-[11px] text-[#D4AF37] tracking-widest font-mono">
                    0{activeStep + 1} / 04
                  </div>
                  <button
                    onClick={() => goToStep(Math.min(3, activeStep + 1))}
                    disabled={activeStep === 3}
                    className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-[#8A8580] hover:text-[#D4AF37] transition-colors disabled:opacity-20 disabled:pointer-events-none"
                    aria-label="Next step"
                  >
                    Next <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Right: visual */}
              <div className="flex items-center justify-center min-h-[260px] sm:min-h-[300px]">
                {activeStep === 0 && (
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex flex-col items-center justify-center">
                    <div
                      className="absolute inset-0 rounded-full opacity-30 animate-pulse pointer-events-none"
                      style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(180,130,20,0.1) 50%, transparent 70%)' }}
                    />
                    <svg viewBox="0 0 220 220" className="w-56 h-56 sm:w-64 sm:h-64 jewel-svg" aria-label="Fairmined Gold Nugget">
                      <defs>
                        <radialGradient id="nugget" cx="38%" cy="32%" r="65%">
                          <stop offset="0%" stopColor="#FFF2B2" />
                          <stop offset="25%" stopColor="#F5D061" />
                          <stop offset="60%" stopColor="#D4AF37" />
                          <stop offset="100%" stopColor="#7A5208" />
                        </radialGradient>
                        <filter id="gold-glow">
                          <feGaussianBlur stdDeviation="8" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <circle cx="110" cy="105" r="70" fill="url(#nugget)" filter="url(#gold-glow)" />
                      <path d="M70,80 Q110,60 150,85 Q130,125 90,130 Z" fill="none" stroke="#FFF2B2" strokeWidth="1" opacity="0.4" />
                      <circle cx="95" cy="85" r="12" fill="#FFF8D6" opacity="0.3" />
                      <circle cx="130" cy="115" r="8" fill="#FFF8D6" opacity="0.2" />
                      <line x1="110" y1="50" x2="110" y2="40" stroke="#FFF2B2" strokeWidth="1.5" opacity="0.7" />
                      <line x1="110" y1="160" x2="110" y2="170" stroke="#D4AF37" strokeWidth="1.5" opacity="0.4" />
                      <text x="110" y="198" textAnchor="middle" fontSize="10" fill="#D4AF37" opacity="0.8" letterSpacing="0.1em" fontFamily="Inter" fontWeight="500">
                        Fairmined Gold · 22K Purity
                      </text>
                    </svg>
                  </div>
                )}
                {activeStep === 1 && <BlueprintSVG progress={stepProgress} />}
                {activeStep === 2 && <DiamondMacroSVG />}
                {activeStep === 3 && <MasterpieceSVG rotation={rotation} />}
              </div>
            </div>

            {/* Clickable Progress dots */}
            <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
              {storySteps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => goToStep(i)}
                  className="group flex items-center justify-end gap-3 p-1 transition-all"
                  aria-label={`Jump to Step ${s.step}: ${s.title}`}
                >
                  <span className={`text-[10px] tracking-widest uppercase transition-all duration-300 hidden lg:block ${
                    activeStep === i ? 'text-[#D4AF37] opacity-100 font-medium' : 'text-[#8A8580] opacity-0 group-hover:opacity-100'
                  }`}>
                    {s.title}
                  </span>
                  <span className={`block rounded-full transition-all duration-300 ${
                    activeStep === i
                      ? 'w-3 h-3 bg-[#D4AF37] shadow-[0_0_12px_#D4AF37]'
                      : 'w-2 h-2 bg-[#4A4540] group-hover:bg-[#8A8580]'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURED COLLECTION ── */}
      <section className="bg-[#F9F6F0] py-24 px-6 md:px-12" aria-label="Featured collection">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <div className="gold-line mx-auto" />
            <h2 className="font-display text-4xl md:text-5xl text-[#121212] mb-4">Featured Pieces</h2>
            <p className="text-[#8A8580] text-base max-w-md mx-auto">Curated from our current collection. Each piece is available for immediate delivery or bespoke customisation.</p>
          </div>

          <div className="featured-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="featured-card">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/collection" className="btn-ghost">
              View Full Collection <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ATELIER CTA ── */}
      <section
        className="py-28 px-6 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0D0A00 0%, #1A1400 50%, #121212 100%)' }}
        aria-label="Design your own call to action"
      >
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'repeating-linear-gradient(60deg, transparent, transparent 30px, rgba(212,175,55,0.03) 30px, rgba(212,175,55,0.03) 31px)' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">Bespoke Atelier</span>
          <h2 className="font-display text-5xl md:text-6xl text-[#F9F6F0] mt-4 mb-6">
            Design Your<br /><span className="italic text-[#D4AF37]">Own Piece</span>
          </h2>
          <p className="text-[#8A8580] text-base leading-relaxed mb-10">
            Work with our master artisans to create a piece that is uniquely yours. From a personal monogram to an heirloom re-imagined, every bespoke journey begins with a conversation.
          </p>
          <Link to="/atelier" className="btn-gold">
            Book an Atelier Appointment <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── BRAND VALUES ── */}
      <section className="py-24 px-6 md:px-12 border-t border-[rgba(212,175,55,0.08)]" aria-label="Brand values">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: '✦', title: 'Ethically Sourced', body: 'Every gram of gold and every gemstone is traceable to its responsible origin. No exceptions.' },
            { icon: '◇', title: 'Hand-Finished', body: 'Each piece passes through the hands of at least 7 master artisans before it reaches you.' },
            { icon: '∞', title: 'Lifetime Guarantee', body: 'We stand behind every piece we create. Free repairs, polishing, and resizing for life.' },
          ].map(val => (
            <div key={val.title} className="text-center p-8 border border-[rgba(212,175,55,0.1)] hover:border-[rgba(212,175,55,0.25)] transition-colors">
              <div className="text-[#D4AF37] text-3xl mb-4">{val.icon}</div>
              <h3 className="font-display text-xl text-[#F9F6F0] mb-3">{val.title}</h3>
              <p className="text-[#8A8580] text-sm leading-relaxed">{val.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
