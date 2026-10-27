import { useEffect, useRef, useState } from 'react';
import { X, Search } from 'lucide-react';
import { useSearch } from '../context/AppContext';
import { products, formatINR } from '../data/products';
import { Link } from 'react-router-dom';
import { JewelSVG } from './JewelSVG';

export default function SearchOverlay() {
  const { searchOpen, closeSearch, query, setQuery } = useSearch();
  const inputRef = useRef(null);

  const results = query.trim().length >= 2
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.stone.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeSearch(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeSearch]);

  return (
    <div
      className={`search-overlay fixed inset-0 z-[70] ${searchOpen ? 'open' : ''}`}
      style={{ background: 'rgba(12,12,12,0.97)', backdropFilter: 'blur(8px)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="max-w-2xl mx-auto px-6 pt-32">
        <button
          onClick={closeSearch}
          className="absolute top-6 right-6 text-[#8A8580] hover:text-[#D4AF37] transition-colors"
          aria-label="Close search"
        >
          <X size={24} />
        </button>

        <div className="relative mb-8">
          <Search size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search jewellery, stones, styles..."
            className="w-full bg-transparent border-b border-[rgba(212,175,55,0.3)] pl-8 pr-4 py-3 text-[#F9F6F0] text-lg outline-none focus:border-[#D4AF37] transition-colors placeholder-[#4A4540]"
            aria-label="Search query"
          />
        </div>

        {query.trim().length >= 2 && (
          <div>
            {results.length === 0 ? (
              <p className="text-[#8A8580] text-center py-8">No results for "{query}"</p>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-[#4A4540] text-xs tracking-widest uppercase mb-2">{results.length} results</p>
                {results.map(p => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    onClick={closeSearch}
                    className="flex items-center gap-4 p-3 hover:bg-[rgba(212,175,55,0.05)] transition-colors no-underline border border-transparent hover:border-[rgba(212,175,55,0.15)]"
                  >
                    <div className="w-12 h-12 bg-[#1E1E1E] flex items-center justify-center flex-shrink-0">
                      <JewelSVG type={p.svgType || 'ring'} size={40} />
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-[#F9F6F0] text-base">{p.name}</p>
                      <p className="text-[#8A8580] text-xs capitalize">{p.category} · {p.purity}</p>
                    </div>
                    <p className="text-[#D4AF37] text-sm">{formatINR(p.price)}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {query.trim().length < 2 && (
          <div className="text-center py-8">
            <p className="text-[#4A4540] text-sm">Type at least 2 characters to search</p>
            <div className="flex justify-center gap-4 mt-6">
              {['Rings', 'Necklaces', 'Earrings'].map(cat => (
                <Link
                  key={cat}
                  to={`/collection?cat=${cat.toLowerCase()}`}
                  onClick={closeSearch}
                  className="btn-ghost text-xs px-5 py-2"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
