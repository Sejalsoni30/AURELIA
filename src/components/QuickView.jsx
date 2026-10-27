import { useEffect } from 'react';
import { X, Star, ShoppingBag, Heart } from 'lucide-react';
import { useCart, useWishlist, useToast, useCartDrawer } from '../context/AppContext';
import { formatINR } from '../data/products';
import { JewelSVG } from './JewelSVG';
import { Link } from 'react-router-dom';

export default function QuickView({ product, onClose }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const { openCart } = useCartDrawer();
  const wishlisted = isWishlisted(product.id);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleAdd = () => {
    addToCart(product);
    addToast(`Added to your bag — ${product.name}`, 'cart');
    openCart();
    onClose();
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    addToast(wishlisted ? 'Removed from wishlist' : `Saved to wishlist — ${product.name}`, 'wishlist');
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 modal-backdrop"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
    >
      <div className="modal-content bg-[#141414] border border-[rgba(212,175,55,0.2)] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(212,175,55,0.1)]">
          <h2 className="font-display text-lg text-[#F9F6F0] tracking-wide">{product.name}</h2>
          <button onClick={onClose} className="text-[#8A8580] hover:text-[#D4AF37] transition-colors" aria-label="Close quick view">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/2 bg-[#1A1A1A] flex items-center justify-center p-12 min-h-[280px]"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.06), transparent 70%)' }}>
            <JewelSVG type={product.svgType || 'ring'} size={180} />
          </div>

          {/* Details */}
          <div className="md:w-1/2 p-6 flex flex-col gap-4">
            {product.badge && (
              <span className="inline-block text-[#D4AF37] text-[10px] tracking-widest uppercase border border-[rgba(212,175,55,0.4)] px-2 py-0.5 w-fit">
                {product.badge}
              </span>
            )}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < Math.round(product.rating) ? 'star fill-current' : 'text-[#4A4540]'} />
                ))}
              </div>
              <span className="text-[#8A8580] text-xs">({product.reviews})</span>
            </div>

            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl text-[#D4AF37]">{formatINR(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-[#4A4540] text-sm line-through">{formatINR(product.originalPrice)}</span>
                )}
              </div>
            </div>

            <div className="text-[#8A8580] text-sm space-y-1">
              <p><span className="text-[#F9F6F0]">Metal:</span> {product.purity}</p>
              <p><span className="text-[#F9F6F0]">Stone:</span> {product.stone}</p>
            </div>

            <p className="text-[#8A8580] text-sm leading-relaxed line-clamp-3">{product.description}</p>

            <div className="flex gap-3 mt-auto">
              <button onClick={handleAdd} className="btn-gold flex-1 text-xs">
                <ShoppingBag size={14} /> Add to Bag
              </button>
              <button
                onClick={handleWishlist}
                className={`border border-[rgba(212,175,55,0.3)] p-3 hover:border-[#D4AF37] transition-colors ${wishlisted ? 'text-red-400' : 'text-[#D4AF37]'}`}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={16} className={wishlisted ? 'fill-current' : ''} />
              </button>
            </div>

            <Link to={`/product/${product.id}`} onClick={onClose} className="text-center text-[#8A8580] hover:text-[#D4AF37] text-xs tracking-widest uppercase underline underline-offset-4 transition-colors">
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
