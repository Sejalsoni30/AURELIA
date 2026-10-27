import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist, useCart, useToast, useCartDrawer } from '../context/AppContext';
import { JewelSVG } from '../components/JewelSVG';
import { formatINR } from '../data/products';
import { useDocTitle, useScrollTop } from '../hooks/useUtils';

export default function Wishlist() {
  useScrollTop();
  useDocTitle('Wishlist', 'Your AURELIA wishlist – saved pieces for future consideration.');

  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const { openCart } = useCartDrawer();

  const handleAdd = (product) => {
    addToCart(product);
    addToast(`Added to your bag — ${product.name}`, 'cart');
    openCart();
  };

  const handleRemove = (product) => {
    toggleWishlist(product);
    addToast(`Removed from wishlist — ${product.name}`, 'wishlist');
  };

  return (
    <div className="bg-[#121212] min-h-screen">
      <div className="pt-40 pb-16 px-6 text-center" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #121212 100%)' }}>
        <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">Your Saved Pieces</span>
        <h1 className="font-display text-5xl text-[#F9F6F0] mt-3 mb-4">Wishlist</h1>
        <p className="text-[#8A8580] text-base">{wishlist.length} piece{wishlist.length !== 1 ? 's' : ''} saved</p>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 pb-24">
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-24 text-center">
            <Heart size={48} className="text-[rgba(212,175,55,0.2)]" />
            <p className="font-display text-3xl text-[#8A8580]">Your wishlist is empty</p>
            <p className="text-[#4A4540] text-sm">Save pieces you love by clicking the heart icon</p>
            <Link to="/collection" className="btn-gold mt-4">Explore the Collection</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map(product => (
              <div key={product.id} className="bg-[#161616] border border-[rgba(212,175,55,0.08)] hover:border-[rgba(212,175,55,0.2)] transition-colors group">
                {/* Image */}
                <Link to={`/product/${product.id}`}>
                  <div className="relative aspect-square flex items-center justify-center p-8"
                    style={{ background: 'radial-gradient(circle at 50% 40%, rgba(212,175,55,0.06), rgba(18,18,18,0.98) 70%)' }}>
                    <JewelSVG type={product.svgType || 'ring'} size={160} />
                    <button
                      onClick={(e) => { e.preventDefault(); handleRemove(product); }}
                      className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Heart size={18} className="fill-current" />
                    </button>
                  </div>
                </Link>

                {/* Info */}
                <div className="p-4 border-t border-[rgba(212,175,55,0.08)]">
                  <Link to={`/product/${product.id}`} className="no-underline">
                    <p className="font-display text-base text-[#F9F6F0] mb-1 hover:text-[#D4AF37] transition-colors">{product.name}</p>
                  </Link>
                  <p className="text-[#8A8580] text-xs mb-3">{product.purity}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#D4AF37] text-sm font-medium">{formatINR(product.price)}</span>
                    <button
                      onClick={() => handleAdd(product)}
                      className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-[#D4AF37] border border-[rgba(212,175,55,0.3)] px-3 py-1.5 hover:bg-[rgba(212,175,55,0.1)] transition-colors"
                    >
                      <ShoppingBag size={11} /> Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
