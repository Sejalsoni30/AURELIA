import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useDocTitle, useScrollTop } from '../hooks/useUtils';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    number: '01',
    title: 'The Genesis',
    subtitle: 'Responsible Sourcing',
    body: `Every Aurelia piece begins with a choice: to source gold and gemstones responsibly. We partner exclusively with Fairmined-certified cooperatives in Colombia, Peru, and Tanzania — communities where artisan mining is a multi-generational tradition.

Our gold is 100% recycled or Fairmined. Our diamonds are fully traceable through the Kimberley Process and our proprietary supply chain audit. We publish our sourcing partners annually.

This is not just an ethical commitment — it is our founding philosophy. Jewellery that carries no hidden costs.`,
    visual: (
      <svg viewBox="0 0 280 280" className="w-full max-w-[280px] jewel-svg" aria-label="Gold source illustration">
        <defs>
          <radialGradient id="earth-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2A5C45" />
            <stop offset="60%" stopColor="#1A3C2A" />
            <stop offset="100%" stopColor="#0D1F16" />
          </radialGradient>
          <radialGradient id="gold-vein" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#F0D060" />
            <stop offset="100%" stopColor="#B8942E" />
          </radialGradient>
        </defs>
        <circle cx="140" cy="140" r="120" fill="url(#earth-grad)" />
        <path d="M80,100 Q140,80 200,100 Q220,140 200,170 Q140,190 80,170 Z" fill="url(#gold-vein)" opacity="0.7" />
        <text x="140" y="148" textAnchor="middle" fontSize="10" fill="#121212" fontFamily="Inter" fontWeight="500">Fairmined Gold</text>
        <circle cx="140" cy="140" r="120" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
        {[30, 75, 130, 185, 235].map((a, i) => {
          const r = 125;
          const x = 140 + r * Math.cos(a * Math.PI / 180);
          const y = 140 + r * Math.sin(a * Math.PI / 180);
          return <circle key={i} cx={x} cy={y} r="4" fill="#D4AF37" opacity="0.6" />;
        })}
      </svg>
    ),
  },
  {
    number: '02',
    title: 'The Blueprint',
    subtitle: 'Design & Draftsmanship',
    body: `In our Mumbai atelier, a new piece begins as a conversation. A client shares an idea — a memory, a dream, a shape they have carried with them. Our senior designer listens first, sketches second.

Each design is simultaneously rendered in traditional pencil and in 3D CAD software, creating a dialogue between artisanal intuition and technological precision. The two approaches inform each other: CAD catches structural realities that sketches may miss; hand-drawing captures emotional nuance that software cannot replicate.

No two Aurelia designs begin the same way. And no two pieces end the same way.`,
    visual: (
      <svg viewBox="0 0 280 240" className="w-full max-w-[280px] opacity-70" aria-label="CAD blueprint illustration">
        <defs>
          <linearGradient id="sk-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E8C94A" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <rect x="20" y="20" width="240" height="200" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2" />
        <circle cx="140" cy="110" r="75" fill="none" stroke="url(#sk-grad)" strokeWidth="1.5" />
        <circle cx="140" cy="110" r="55" fill="none" stroke="url(#sk-grad)" strokeWidth="0.8" />
        <line x1="65" y1="110" x2="215" y2="110" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.4" />
        <line x1="140" y1="35" x2="140" y2="185" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.4" />
        <text x="140" y="220" textAnchor="middle" fontSize="8" fill="#D4AF37" opacity="0.5" fontFamily="Inter">Scale 1:1 · Aurelia Design Studio</text>
        <text x="30" y="40" fontSize="6" fill="#D4AF37" opacity="0.4" fontFamily="Inter">REF: AUR-2024-007</text>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'The Setting',
    subtitle: 'Diamond Mastery',
    body: `A diamond setter occupies a singular position in the craft hierarchy. They are both scientist and artist — required to understand gemology, metallurgy, optics, and physics while maintaining the steady hands and focused eyes of a surgeon.

Our principal setters trained for a minimum of seven years before setting a single Aurelia stone. They work under 10x loupe magnification, using tools they have often made themselves, adapted over years to their particular grip and rhythm.

A single prong-set ring typically requires 12–15 hours of setting work. Our pavé pieces — where hundreds of tiny diamonds are hand-placed in a matrix of metal — can take a week.`,
    visual: (
      <svg viewBox="0 0 280 260" className="w-full max-w-[280px]" style={{ filter: 'drop-shadow(0 0 30px rgba(180,220,255,0.25))' }} aria-label="Diamond setting illustration">
        <defs>
          <radialGradient id="set-diam" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E0F4FF" />
            <stop offset="100%" stopColor="#5090C0" stopOpacity="0.5" />
          </radialGradient>
        </defs>
        <ellipse cx="140" cy="170" rx="80" ry="28" fill="#B8942E" opacity="0.6" />
        <polygon points="140,40 190,120 140,150 90,120" fill="url(#set-diam)" />
        <polygon points="140,40 190,120 140,100" fill="white" opacity="0.6" />
        <polygon points="140,40 90,120 140,100" fill="#B8D8F8" opacity="0.4" />
        {[[140,38],[190,120],[140,150],[90,120]].map(([x,y],i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill="#D4AF37" />
            <line x1={x} y1={y} x2={x} y2={y > 100 ? y + 20 : y - 20} stroke="#D4AF37" strokeWidth="3" />
          </g>
        ))}
        {[[100,75],[175,78],[155,130],[125,132]].map(([x,y],i) => (
          <g key={i + 10}>
            <line x1={x} y1={y - 7} x2={x} y2={y + 7} stroke="white" strokeWidth="1.2" opacity="0.7" />
            <line x1={x - 7} y1={y} x2={x + 7} y2={y} stroke="white" strokeWidth="1.2" opacity="0.7" />
          </g>
        ))}
        <text x="140" y="240" textAnchor="middle" fontSize="9" fill="#D4AF37" opacity="0.5" fontFamily="Inter">4-Prong Cathedral Setting</text>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'The Masterpiece',
    subtitle: 'Hallmarking & Quality',
    body: `Before any Aurelia piece leaves our atelier, it undergoes a 42-point quality inspection under 10x magnification. We examine every prong tip, every surface finish, every clasp mechanism — in natural light, artificial light, and UV.

Only then does it receive the Aurelia hallmark: a small hand-stamped 'A' in a hexagonal cartouche, placed inside the band or on the clasp. This mark is our guarantee — not just of materials and craftsmanship, but of the values that produced the piece.

Your jewellery is then placed in a handcrafted wooden box lined with ivory silk, accompanied by its certificate of authenticity, gemstone grading report, and care guide. It is ready to begin its story — with you.`,
    visual: (
      <svg viewBox="0 0 280 260" className="w-full max-w-[280px]" style={{ filter: 'drop-shadow(0 0 50px rgba(212,175,55,0.4))' }} aria-label="Finished ring illustration">
        <defs>
          <linearGradient id="mp2-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="45%" stopColor="#F0D060" />
            <stop offset="100%" stopColor="#B8942E" />
          </linearGradient>
          <radialGradient id="mp2-gem" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E8F4FF" />
            <stop offset="100%" stopColor="#7AB8E8" stopOpacity="0.6" />
          </radialGradient>
        </defs>
        <ellipse cx="140" cy="185" rx="85" ry="25" fill="url(#mp2-gold)" />
        <ellipse cx="140" cy="155" rx="85" ry="25" fill="none" stroke="url(#mp2-gold)" strokeWidth="30" />
        <ellipse cx="140" cy="155" rx="85" ry="25" fill="none" stroke="#F0D060" strokeWidth="2" opacity="0.3" />
        {[0,45,90,135,180,225,270,315].map((a,i)=>{
          const rad = a * Math.PI / 180;
          const x = 140 + 85 * Math.cos(rad);
          const y = 155 + 24 * Math.sin(rad);
          return <circle key={i} cx={x} cy={y} r="3" fill="#F0D060" opacity={0.3 + 0.5 * Math.abs(Math.cos(rad))} />;
        })}
        <polygon points="140,58 165,95 140,112 115,95" fill="url(#mp2-gem)" />
        <polygon points="140,58 165,95 140,80" fill="white" opacity="0.7" />
        {[[140,56],[165,95],[140,112],[115,95]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="4" fill="url(#mp2-gold)" />
        ))}
        <text x="140" y="235" textAnchor="middle" fontSize="10" fill="#D4AF37" opacity="0.6" fontFamily="Cormorant Garamond, serif">AURELIA · Hallmarked</text>
      </svg>
    ),
  },
];

export default function Craft() {
  useScrollTop();
  useDocTitle('Craft & Story', 'Discover the 4-stage Aurelia craft process – from responsible sourcing to hand-finished masterpiece.');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced) return;
    gsap.fromTo('.craft-section',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: '.craft-sections', start: 'top 75%', stagger: 0.2 }
      }
    );
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [prefersReduced]);

  return (
    <div className="bg-[#121212] min-h-screen">
      {/* Hero */}
      <div className="relative pt-40 pb-24 px-6 text-center overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0A0800 0%, #121212 100%)' }}>
        <div className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.2), transparent 70%)' }} />
        <div className="relative z-10">
          <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">The Aurelia Process</span>
          <h1 className="font-display text-5xl md:text-7xl text-[#F9F6F0] mt-3 mb-6 leading-none">
            Craft &amp;<br /><span className="italic text-[#D4AF37]">Story</span>
          </h1>
          <p className="text-[#8A8580] text-base max-w-xl mx-auto leading-relaxed">
            Every Aurelia piece moves through four sacred stages — from the earth to your hands. This is the story of how we work.
          </p>
        </div>
      </div>

      {/* Stages */}
      <div className="craft-sections max-w-screen-lg mx-auto px-6 md:px-12 pb-24">
        {stages.map((stage, idx) => (
          <div
            key={stage.number}
            className={`craft-section grid md:grid-cols-2 gap-12 items-center py-20 border-b border-[rgba(212,175,55,0.08)] ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Text */}
            <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
              <div className="text-[#D4AF37] text-[10px] tracking-widest uppercase mb-2">Stage {stage.number}</div>
              <div className="gold-line mb-6" />
              <h2 className="font-display text-4xl md:text-5xl text-[#F9F6F0] mb-3">{stage.title}</h2>
              <p className="text-[#D4AF37] text-sm tracking-widest uppercase mb-6">{stage.subtitle}</p>
              <div className="text-[#8A8580] text-sm leading-relaxed space-y-4">
                {stage.body.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>
            {/* Visual */}
            <div className={`flex justify-center ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
              <div className="w-full max-w-[320px] aspect-square bg-[#161616] border border-[rgba(212,175,55,0.1)] flex items-center justify-center p-10"
                style={{ background: 'radial-gradient(circle at 50% 45%, rgba(212,175,55,0.06), rgba(18,18,18,0.98) 70%)' }}>
                {stage.visual}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[#F9F6F0] py-20 px-6 text-center">
        <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">Start Your Journey</span>
        <h2 className="font-display text-4xl text-[#121212] mt-3 mb-6">Visit Our Atelier</h2>
        <p className="text-[#8A8580] text-base max-w-md mx-auto mb-8">
          Meet our artisans, see the tools of the trade, and begin your bespoke commission.
        </p>
        <Link to="/atelier" className="btn-gold">Book an Appointment <ArrowRight size={14} /></Link>
      </div>
    </div>
  );
}
