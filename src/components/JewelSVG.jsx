// AURELIA – Inline SVG Jewellery Components
// All pieces rendered with gold gradients and gem facets

const GoldGradient = ({ id }) => (
  <defs>
    <linearGradient id={`gold-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#D4AF37" />
      <stop offset="45%" stopColor="#F0D060" />
      <stop offset="100%" stopColor="#B8942E" />
    </linearGradient>
    <linearGradient id={`diamond-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#E8F4FF" stopOpacity="0.9" />
      <stop offset="30%" stopColor="#FFFFFF" />
      <stop offset="60%" stopColor="#B8D8F8" stopOpacity="0.8" />
      <stop offset="100%" stopColor="#7AB8E0" stopOpacity="0.6" />
    </linearGradient>
    <radialGradient id={`gem-${id}`} cx="40%" cy="35%" r="60%">
      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
      <stop offset="30%" stopColor="#E0F0FF" stopOpacity="0.8" />
      <stop offset="70%" stopColor="#5090C0" stopOpacity="0.6" />
      <stop offset="100%" stopColor="#2060A0" stopOpacity="0.4" />
    </radialGradient>
    <filter id={`glow-${id}`}>
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
  </defs>
);

export function RingSVG({ size = 200 }) {
  const id = 'ring';
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="jewel-svg" aria-label="Diamond ring illustration">
      <GoldGradient id={id} />
      {/* Band */}
      <ellipse cx="100" cy="140" rx="55" ry="22" fill={`url(#gold-${id})`} />
      <ellipse cx="100" cy="118" rx="55" ry="22" fill="none" stroke={`url(#gold-${id})`} strokeWidth="18" />
      <ellipse cx="100" cy="118" rx="55" ry="22" fill="none" stroke="#F0D060" strokeWidth="2" opacity="0.5" />
      {/* Setting prongs */}
      <line x1="100" y1="118" x2="90" y2="75" stroke={`url(#gold-${id})`} strokeWidth="4" strokeLinecap="round" />
      <line x1="100" y1="118" x2="110" y2="75" stroke={`url(#gold-${id})`} strokeWidth="4" strokeLinecap="round" />
      <line x1="100" y1="118" x2="80" y2="82" stroke={`url(#gold-${id})`} strokeWidth="4" strokeLinecap="round" />
      <line x1="100" y1="118" x2="120" y2="82" stroke={`url(#gold-${id})`} strokeWidth="4" strokeLinecap="round" />
      {/* Diamond */}
      <polygon points="100,45 120,72 100,82 80,72" fill={`url(#diamond-${id})`} filter={`url(#glow-${id})`} />
      <polygon points="100,45 120,72 100,62" fill="white" opacity="0.7" />
      <polygon points="100,82 80,72 100,62" fill="#B8D8F8" opacity="0.5" />
      <polygon points="100,82 120,72 100,62" fill="#7AB8E0" opacity="0.4" />
      {/* Sparkle */}
      <line x1="100" y1="35" x2="100" y2="42" stroke="#F0D060" strokeWidth="1.5" opacity="0.8" />
      <line x1="93" y1="37" x2="97" y2="43" stroke="#F0D060" strokeWidth="1" opacity="0.6" />
      <line x1="107" y1="37" x2="103" y2="43" stroke="#F0D060" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

export function PendantSVG({ size = 200 }) {
  const id = 'pendant';
  return (
    <svg viewBox="0 0 200 220" width={size} height={size} className="jewel-svg" aria-label="Diamond pendant illustration">
      <GoldGradient id={id} />
      {/* Chain */}
      <path d="M100,20 Q100,40 100,55" stroke={`url(#gold-${id})`} strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="100" cy="18" rx="8" ry="4" fill="none" stroke={`url(#gold-${id})`} strokeWidth="2" />
      {/* Bail */}
      <rect x="94" y="52" width="12" height="16" rx="4" fill={`url(#gold-${id})`} />
      {/* Pear stone */}
      <path d="M100,68 C78,78 72,105 100,118 C128,105 122,78 100,68 Z" fill={`url(#gem-${id})`} filter={`url(#glow-${id})`} />
      {/* Facets */}
      <line x1="100" y1="68" x2="88" y2="95" stroke="white" strokeWidth="0.8" opacity="0.5" />
      <line x1="100" y1="68" x2="112" y2="95" stroke="white" strokeWidth="0.8" opacity="0.5" />
      <line x1="100" y1="68" x2="100" y2="118" stroke="white" strokeWidth="0.8" opacity="0.3" />
      <line x1="82" y1="90" x2="118" y2="90" stroke="white" strokeWidth="0.5" opacity="0.4" />
      {/* Sparkle */}
      <circle cx="90" cy="78" r="2" fill="white" opacity="0.8" />
      <line x1="85" y1="72" x2="90" y2="80" stroke="white" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

export function EarringSVG({ size = 200 }) {
  const id = 'earring';
  return (
    <svg viewBox="0 0 200 220" width={size} height={size} className="jewel-svg" aria-label="Diamond earrings illustration">
      <GoldGradient id={id} />
      {/* Left earring */}
      <circle cx="65" cy="30" r="8" fill={`url(#gold-${id})`} />
      <line x1="65" y1="38" x2="65" y2="70" stroke={`url(#gold-${id})`} strokeWidth="2.5" />
      <polygon points="65,65 45,95 65,110 85,95" fill={`url(#gem-${id})`} filter={`url(#glow-${id})`} />
      <polygon points="65,65 45,95 65,85" fill="white" opacity="0.6" />
      {/* Right earring */}
      <circle cx="135" cy="30" r="8" fill={`url(#gold-${id})`} />
      <line x1="135" y1="38" x2="135" y2="70" stroke={`url(#gold-${id})`} strokeWidth="2.5" />
      <polygon points="135,65 115,95 135,110 155,95" fill={`url(#gem-${id})`} filter={`url(#glow-${id})`} />
      <polygon points="135,65 115,95 135,85" fill="white" opacity="0.6" />
      {/* Halo */}
      {[0,60,120,180,240,300].map((angle, i) => (
        <circle key={i} cx={65 + 22 * Math.cos(angle * Math.PI / 180)} cy={88 + 12 * Math.sin(angle * Math.PI / 180)} r="3" fill={`url(#diamond-${id})`} opacity="0.7" />
      ))}
      {[0,60,120,180,240,300].map((angle, i) => (
        <circle key={i + 10} cx={135 + 22 * Math.cos(angle * Math.PI / 180)} cy={88 + 12 * Math.sin(angle * Math.PI / 180)} r="3" fill={`url(#diamond-${id})`} opacity="0.7" />
      ))}
    </svg>
  );
}

export function StudSVG({ size = 200 }) {
  const id = 'stud';
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="jewel-svg" aria-label="Diamond stud earrings illustration">
      <GoldGradient id={id} />
      {/* Left stud */}
      <circle cx="65" cy="100" r="32" fill={`url(#gold-${id})`} />
      <polygon points="65,68 82,88 65,100 48,88" fill={`url(#diamond-${id})`} filter={`url(#glow-${id})`} />
      <polygon points="65,100 48,88 55,92" fill="#B8D8F8" opacity="0.5" />
      <polygon points="65,100 82,88 75,92" fill="white" opacity="0.6" />
      {/* Right stud */}
      <circle cx="135" cy="100" r="32" fill={`url(#gold-${id})`} />
      <polygon points="135,68 152,88 135,100 118,88" fill={`url(#diamond-${id})`} filter={`url(#glow-${id})`} />
      <polygon points="135,100 118,88 125,92" fill="#B8D8F8" opacity="0.5" />
      <polygon points="135,100 152,88 145,92" fill="white" opacity="0.6" />
      {/* Sparkles */}
      <circle cx="58" cy="75" r="2" fill="white" opacity="0.9" />
      <circle cx="128" cy="75" r="2" fill="white" opacity="0.9" />
    </svg>
  );
}

export function NecklaceSVG({ size = 200 }) {
  const id = 'necklace';
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="jewel-svg" aria-label="Gemstone necklace illustration">
      <GoldGradient id={id} />
      {/* Chain arc */}
      <path d="M20,60 Q100,130 180,60" stroke={`url(#gold-${id})`} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Gems along chain */}
      {[20,45,70,95,120,145,170].map((x, i) => {
        const y = 60 + Math.sin((x - 20) / 160 * Math.PI) * 70;
        const colors = ['#D4AF37','#5090C0','#E0F0FF','#5090C0','#E0F0FF','#5090C0','#D4AF37'];
        return (
          <g key={i}>
            <rect x={x - 4} y={y - 5} width="8" height="10" rx="2" fill={colors[i]} opacity="0.9" />
            <rect x={x - 3} y={y - 4} width="3" height="4" fill="white" opacity="0.5" rx="1" />
          </g>
        );
      })}
      {/* Centre pendant */}
      <ellipse cx="100" cy="130" rx="18" ry="22" fill={`url(#gem-${id})`} filter={`url(#glow-${id})`} />
      <ellipse cx="95" cy="123" rx="6" ry="8" fill="white" opacity="0.5" />
    </svg>
  );
}

export function HuggieSVG({ size = 200 }) {
  const id = 'huggie';
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="jewel-svg" aria-label="Huggie earrings illustration">
      <GoldGradient id={id} />
      {/* Left huggie */}
      <path d="M50,70 A30,30 0 1 1 50,130" stroke={`url(#gold-${id})`} strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M50,70 A30,30 0 0 0 50,130" stroke="#F0D060" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* Pavé dots left */}
      {[80, 95, 110].map((y, i) => (
        <circle key={i} cx="23" cy={y} r="3" fill={`url(#diamond-${id})`} opacity="0.85" />
      ))}
      {/* Right huggie */}
      <path d="M150,70 A30,30 0 1 0 150,130" stroke={`url(#gold-${id})`} strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M150,70 A30,30 0 0 1 150,130" stroke="#F0D060" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* Pavé dots right */}
      {[80, 95, 110].map((y, i) => (
        <circle key={i + 10} cx="177" cy={y} r="3" fill={`url(#diamond-${id})`} opacity="0.85" />
      ))}
    </svg>
  );
}

export function SignetSVG({ size = 200 }) {
  const id = 'signet';
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="jewel-svg" aria-label="Signet ring illustration">
      <GoldGradient id={id} />
      {/* Band */}
      <ellipse cx="100" cy="148" rx="52" ry="20" fill={`url(#gold-${id})`} />
      <rect x="48" y="100" width="104" height="48" rx="4" fill={`url(#gold-${id})`} />
      <ellipse cx="100" cy="100" rx="52" ry="20" fill="#E8C94A" />
      {/* Signet face */}
      <ellipse cx="100" cy="72" rx="40" ry="28" fill="#1A1A1A" />
      <ellipse cx="100" cy="72" rx="38" ry="26" fill="#0A0A0A" />
      <ellipse cx="100" cy="72" rx="38" ry="26" stroke={`url(#gold-${id})`} strokeWidth="2" fill="none" />
      {/* Monogram / intaglio */}
      <text x="100" y="79" textAnchor="middle" fontSize="24" fontFamily="Cormorant Garamond, serif" fill="#D4AF37" opacity="0.85">A</text>
      {/* Gold rim highlight */}
      <ellipse cx="100" cy="72" rx="40" ry="28" fill="none" stroke="#F0D060" strokeWidth="3" opacity="0.25" />
    </svg>
  );
}

export function PearlSVG({ size = 200 }) {
  const id = 'pearl';
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="jewel-svg" aria-label="Pearl necklace illustration">
      <GoldGradient id={id} />
      {/* Chain */}
      <path d="M20,100 Q100,50 180,100" stroke={`url(#gold-${id})`} strokeWidth="2" fill="none" />
      {/* Pearls */}
      {[20, 42, 64, 86, 108, 130, 152, 174].map((x, i) => {
        const t = (x - 20) / 154;
        const y = 100 - 50 * Math.sin(t * Math.PI);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="9" fill="url(#pearl-grad)" />
            <circle cx={x - 3} cy={y - 3} r="3.5" fill="white" opacity="0.7" />
          </g>
        );
      })}
      <defs>
        <radialGradient id="pearl-grad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F0EAE0" />
          <stop offset="100%" stopColor="#C8B8A8" />
        </radialGradient>
      </defs>
      {/* Clasp */}
      <rect x="93" y="94" width="14" height="12" rx="3" fill={`url(#gold-${id})`} />
      <circle cx="100" cy="100" r="3" fill={`url(#diamond-${id})`} />
    </svg>
  );
}

export function ChandelierSVG({ size = 200 }) {
  const id = 'chandelier';
  return (
    <svg viewBox="0 0 200 240" width={size} height={size} className="jewel-svg" aria-label="Chandelier earrings illustration">
      <GoldGradient id={id} />
      {/* Posts */}
      <circle cx="65" cy="25" r="6" fill={`url(#gold-${id})`} />
      <circle cx="135" cy="25" r="6" fill={`url(#gold-${id})`} />
      <line x1="65" y1="31" x2="65" y2="50" stroke={`url(#gold-${id})`} strokeWidth="2.5" />
      <line x1="135" y1="31" x2="135" y2="50" stroke={`url(#gold-${id})`} strokeWidth="2.5" />
      {/* Hoops left */}
      <circle cx="65" cy="75" r="28" fill="none" stroke={`url(#gold-${id})`} strokeWidth="6" />
      <circle cx="65" cy="75" r="28" fill="none" stroke="#F0D060" strokeWidth="1" opacity="0.4" />
      {/* Hoop gems left */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <circle key={i} cx={65 + 28 * Math.cos(a * Math.PI/180)} cy={75 + 28 * Math.sin(a * Math.PI/180)} r="3.5" fill={`url(#gem-${id})`} />
      ))}
      {/* Drops left */}
      {[55, 65, 75].map((cx, i) => (
        <g key={i}>
          <line x1={cx} y1="103" x2={cx} y2="125" stroke={`url(#gold-${id})`} strokeWidth="1.5" />
          <ellipse cx={cx} cy="135" rx="5" ry="8" fill="#4080B0" opacity="0.85" />
          <ellipse cx={cx - 1} cy="131" rx="2" ry="3" fill="white" opacity="0.6" />
        </g>
      ))}
      {/* Hoops right */}
      <circle cx="135" cy="75" r="28" fill="none" stroke={`url(#gold-${id})`} strokeWidth="6" />
      <circle cx="135" cy="75" r="28" fill="none" stroke="#F0D060" strokeWidth="1" opacity="0.4" />
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <circle key={i + 20} cx={135 + 28 * Math.cos(a * Math.PI/180)} cy={75 + 28 * Math.sin(a * Math.PI/180)} r="3.5" fill={`url(#gem-${id})`} />
      ))}
      {[125, 135, 145].map((cx, i) => (
        <g key={i + 30}>
          <line x1={cx} y1="103" x2={cx} y2="125" stroke={`url(#gold-${id})`} strokeWidth="1.5" />
          <ellipse cx={cx} cy="135" rx="5" ry="8" fill="#4080B0" opacity="0.85" />
          <ellipse cx={cx - 1} cy="131" rx="2" ry="3" fill="white" opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

const svgMap = {
  ring: RingSVG,
  pendant: PendantSVG,
  earring: EarringSVG,
  stud: StudSVG,
  necklace: NecklaceSVG,
  huggie: HuggieSVG,
  signet: SignetSVG,
  pearl: PearlSVG,
  chandelier: ChandelierSVG,
};

export function JewelSVG({ type = 'ring', size = 200 }) {
  const Component = svgMap[type] || RingSVG;
  return <Component size={size} />;
}
