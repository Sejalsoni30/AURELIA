import { useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/AppContext';
import { useCartDrawer } from '../context/AppContext';
import { useSearch } from '../context/AppContext';
import { useState } from 'react';

const navLinks = [
  { to: '/collection', label: 'Collection' },
  { to: '/craft', label: 'Craft & Story' },
  { to: '/origin', label: 'Origin' },
  { to: '/atelier', label: 'Atelier' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { cartCount } = useCart();
  const { openCart } = useCartDrawer();
  const { openSearch } = useSearch();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Header scroll effect
  useEffect(() => {
    const header = document.getElementById('main-header');
    const onScroll = () => {
      if (window.scrollY > 60) header?.classList.add('scrolled');
      else header?.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        id="main-header"
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4"
        style={{ background: 'transparent' }}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-xl md:text-2xl tracking-[0.25em] text-[#D4AF37] no-underline hover:opacity-80 transition-opacity"
            aria-label="AURELIA – Home"
          >
            AURELIA
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={openSearch}
              className="text-[#F9F6F0] hover:text-[#D4AF37] transition-colors p-1"
              aria-label="Open search"
            >
              <Search size={18} />
            </button>

            <NavLink to="/wishlist" className="text-[#F9F6F0] hover:text-[#D4AF37] transition-colors p-1" aria-label="Wishlist">
              <Heart size={18} />
            </NavLink>

            <button
              onClick={openCart}
              className="relative text-[#F9F6F0] hover:text-[#D4AF37] transition-colors p-1"
              aria-label={`Shopping bag, ${cartCount} items`}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden text-[#F9F6F0] hover:text-[#D4AF37] transition-colors p-1"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div
        className={`mobile-nav fixed inset-0 z-40 flex flex-col bg-[#121212] pt-24 px-8 ${mobileOpen ? 'open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-5"
          style={{ background: 'radial-gradient(circle at 80% 30%, #D4AF37, transparent 70%)' }}
        />
        <nav className="flex flex-col gap-6">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `font-display text-3xl tracking-wide text-[#F9F6F0] hover:text-[#D4AF37] transition-colors no-underline${isActive ? ' text-[#D4AF37]' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto mb-12 flex flex-col gap-3 text-[#8A8580] text-xs tracking-widest uppercase">
          <NavLink to="/wishlist" onClick={() => setMobileOpen(false)} className="hover:text-[#D4AF37] transition-colors no-underline">Wishlist</NavLink>
          <a href="tel:+918888888888" className="hover:text-[#D4AF37] transition-colors">+91 88888 88888</a>
        </div>
      </div>
    </>
  );
}
