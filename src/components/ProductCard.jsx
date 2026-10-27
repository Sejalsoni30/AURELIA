import { useState } from 'react';
import { ShoppingBag, Heart, Eye, Star } from 'lucide-react';
import { useCart, useWishlist, useToast, useCartDrawer } from '../context/AppContext';
import { formatINR } from '../data/products';
import { JewelSVG } from './JewelSVG';
import QuickView from './QuickView';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const { openCart } = useCartDrawer();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    addToast(`Added to your bag — ${product.name}`, 'cart');
    openCart();
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    addToast(wishlisted ? 'Removed from wishlist' : `Saved to wishlist — ${product.name}`, 'wishlist');
  };

  return (
    <>
      <article className="product-card group bg-[#161616]" data-cursor>
        {/* Image area */}
        <Link to={`/product/${product.id}`} className="block no-underline">
          <div
            className="relative overflow-hidden"
            style={{
              background: 'radial-gradient(circle at 50% 40%, rgba(212,175,55,0.07), rgba(18,18,18,0.95) 70%)',
              paddingBottom: '100%',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-8 product-card-img">
              <JewelSVG type={product.svgType || 'ring'} size={180} />
            </div>

            {/* Overlay */}
            <div className="product-card-overlay" />

            {/* Badge */}
            {product.badge && (
              <span className="absolute top-3 left-3 text-[#D4AF37] text-[10px] tracking-widest uppercase border border-[rgba(212,175,55,0.4)] bg-[rgba(18,18,18,0.8)] px-2 py-0.5 z-10">
                {product.badge}
              </span>
            )}

            {/* Wishlist button */}
            <button
              onClick={handleWishlist}
              className={`wishlist-btn absolute top-3 right-3 z-10 p-2 ${wishlisted ? 'active text-red-400' : 'text-[#D4AF37]'} opacity-0 group-hover:opacity-100 transition-opacity`}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={16} className={wishlisted ? 'fill-current' : ''} />
            </button>

            {/* Hover actions */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <button
                onClick={handleAdd}
                className="btn-gold flex-1 py-2 text-[10px]"
              >
                <ShoppingBag size={12} />Add to Bag
              </button>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickViewOpen(true); }}
                className="w-10 h-10 flex items-center justify-center border border-[rgba(212,175,55,0.4)] bg-[rgba(18,18,18,0.9)] text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] transition-colors flex-shrink-0"
                aria-label="Quick view"
              >
                <Eye size={14} />
              </button>
            </div>
          </div>

          {/* Card info */}
          <div className="p-4 border-t border-[rgba(212,175,55,0.08)]">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-display text-base text-[#F9F6F0] leading-tight mb-1 line-clamp-1">{product.name}</p>
                <p className="text-[#8A8580] text-xs capitalize mb-2">{product.purity}</p>
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < Math.round(product.rating) ? 'star fill-current' : 'text-[#2A2A2A]'} />
                    ))}
                  </div>
                  <span className="text-[#4A4540] text-[10px]">({product.reviews})</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[#D4AF37] font-medium text-sm">{formatINR(product.price)}</p>
                {product.originalPrice && (
                  <p className="text-[#4A4540] text-xs line-through">{formatINR(product.originalPrice)}</p>
                )}
              </div>
            </div>
          </div>
        </Link>
      </article>

      {quickViewOpen && <QuickView product={product} onClose={() => setQuickViewOpen(false)} />}
    </>
  );
}
