import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useDocTitle, useScrollTop } from '../hooks/useUtils';
import { products, categories, sortOptions } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Collection() {
  useScrollTop();
  useDocTitle('Collection', 'Browse all AURELIA fine jewellery – rings, necklaces and earrings. 12 handcrafted pieces.');

  const [searchParams, setSearchParams] = useSearchParams();
  const initCat = searchParams.get('cat') || 'All';
  const [activeCategory, setActiveCategory] = useState(
    categories.find(c => c.toLowerCase() === initCat.toLowerCase()) || 'All'
  );
  const [sortBy, setSortBy] = useState('default');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) {
      const found = categories.find(c => c.toLowerCase() === cat.toLowerCase());
      if (found) setActiveCategory(found);
    }
  }, [searchParams]);

  const filteredAndSorted = (() => {
    let list = activeCategory === 'All'
      ? products
      : products.filter(p => p.category === activeCategory.toLowerCase());

    switch (sortBy) {
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating);
      default: return list;
    }
  })();

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') setSearchParams({});
    else setSearchParams({ cat: cat.toLowerCase() });
  };

  return (
    <div className="bg-[#121212] min-h-screen">
      {/* Page header */}
      <div
        className="pt-32 pb-16 px-6 md:px-12 text-center relative"
        style={{ background: 'linear-gradient(180deg, #0A0800 0%, #121212 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.15), transparent 70%)' }}
        />
        <div className="relative z-10">
          <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">The Collection</span>
          <h1 className="font-display text-5xl md:text-6xl text-[#F9F6F0] mt-3 mb-4">All Jewellery</h1>
          <p className="text-[#8A8580] text-base max-w-md mx-auto">
            {filteredAndSorted.length} piece{filteredAndSorted.length !== 1 ? 's' : ''} — each handcrafted to order
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-[68px] z-30 bg-[rgba(18,18,18,0.95)] backdrop-blur-md border-b border-[rgba(212,175,55,0.1)] px-6 md:px-12 py-4">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2 text-xs tracking-widest uppercase transition-all ${
                  activeCategory === cat
                    ? 'bg-[#D4AF37] text-[#121212] font-semibold'
                    : 'border border-[rgba(212,175,55,0.25)] text-[#8A8580] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                }`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none bg-transparent border border-[rgba(212,175,55,0.25)] text-[#8A8580] text-xs tracking-widest uppercase px-4 py-2 pr-8 focus:border-[#D4AF37] outline-none cursor-pointer hover:border-[#D4AF37] transition-colors"
              aria-label="Sort products"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value} className="bg-[#1E1E1E] text-[#F9F6F0]">
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#D4AF37] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12">
        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl text-[#8A8580]">No pieces found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSorted.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
