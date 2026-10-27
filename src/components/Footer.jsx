import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

// Inline social icons to avoid lucide version issues
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
import { useState } from 'react';

const footerColumns = [
  {
    heading: 'Shop',
    links: [
      { to: '/collection', label: 'All Jewellery' },
      { to: '/collection?cat=rings', label: 'Rings' },
      { to: '/collection?cat=necklaces', label: 'Necklaces' },
      { to: '/collection?cat=earrings', label: 'Earrings' },
    ],
  },
  {
    heading: 'Maison',
    links: [
      { to: '/craft', label: 'Craft & Story' },
      { to: '/origin', label: 'Origin' },
      { to: '/atelier', label: 'Atelier' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { to: '/shipping', label: 'Shipping' },
      { to: '/returns', label: 'Returns' },
      { to: '/care', label: 'Jewellery Care' },
      { to: '/faq', label: 'FAQ' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms of Sale' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    setError('');
    setEmail('');
  };

  return (
    <footer className="bg-[#0D0D0D] border-t border-[rgba(212,175,55,0.15)]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
          {/* Brand + newsletter */}
          <div className="lg:col-span-2">
            <div className="font-display text-2xl tracking-[0.25em] text-[#D4AF37] mb-4">AURELIA</div>
            <p className="text-[#8A8580] text-sm leading-relaxed mb-6">
              Founded in Mumbai, Aurelia is a house of fine jewellery where ancient craft meets contemporary elegance. Each piece is ethically sourced, hand-finished, and made to last generations.
            </p>
            <div className="flex gap-4 mb-6">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-[#8A8580] hover:text-[#D4AF37] transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-[#8A8580] hover:text-[#D4AF37] transition-colors">
                <FacebookIcon />
              </a>
            </div>
            {/* Newsletter */}
            <div>
              <p className="text-[#F9F6F0] text-xs tracking-widest uppercase mb-3">The Aurelia Circle</p>
              {subscribed ? (
                <p className="text-[#D4AF37] text-sm">Welcome to the Circle. ✦</p>
              ) : (
                <form onSubmit={handleNewsletter} noValidate>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="flex-1 bg-[#1E1E1E] border border-[rgba(212,175,55,0.2)] text-[#F9F6F0] px-3 py-2 text-xs focus:border-[#D4AF37] outline-none transition-colors placeholder-[#4A4540]"
                      aria-label="Email for newsletter"
                    />
                    <button type="submit" className="btn-gold px-4 py-2 text-[10px]">
                      Join
                    </button>
                  </div>
                  {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
                </form>
              )}
            </div>
          </div>

          {/* Footer columns */}
          {footerColumns.map(col => (
            <div key={col.heading}>
              <h3 className="text-[#F9F6F0] text-xs tracking-widest uppercase mb-5 font-body font-medium">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-[#8A8580] text-sm hover:text-[#D4AF37] transition-colors no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="border-t border-[rgba(212,175,55,0.1)] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-[#8A8580] text-xs">
            <a href="mailto:hello@aurelia.in" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors no-underline">
              <Mail size={13} />hello@aurelia.in
            </a>
            <a href="tel:+918888888888" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors no-underline">
              <Phone size={13} />+91 88888 88888
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={13} />Kala Ghoda, Mumbai 400 001
            </span>
          </div>
          <p className="text-[#4A4540] text-xs">
            © {new Date().getFullYear()} Aurelia Fine Jewellery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
