import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Star, ArrowLeft, Info, Ruler } from 'lucide-react';
import { useCart, useWishlist, useToast, useCartDrawer } from '../context/AppContext';
import { products, getRelatedProducts, formatINR } from '../data/products';
import { JewelSVG } from '../components/JewelSVG';
import ProductCard from '../components/ProductCard';
import { useDocTitle, useScrollTop } from '../hooks/useUtils';

// Ring size guide modal
function RingSizeModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const sizes = [
    { us: '5', uk: 'J', circumference: '49.3mm', diameter: '15.7mm' },
    { us: '6', uk: 'L', circumference: '51.9mm', diameter: '16.5mm' },
    { us: '7', uk: 'N', circumference: '54.4mm', diameter: '17.3mm' },
    { us: '8', uk: 'P', circumference: '57.0mm', diameter: '18.1mm' },
    { us: '9', uk: 'R', circumference: '59.5mm', diameter: '18.9mm' },
    { us: '10', uk: 'T', circumference: '62.1mm', diameter: '19.8mm' },
    { us: '11', uk: 'V', circumference: '64.6mm', diameter: '20.6mm' },
    { us: '12', uk: 'X', circumference: '67.2mm', diameter: '21.4mm' },
  ];

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 modal-backdrop"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Ring size guide"
    >
      <div className="modal-content bg-[#141414] border border-[rgba(212,175,55,0.2)] w-full max-w-lg max-h-[85vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-[#F9F6F0]">Ring Size Guide</h2>
          <button onClick={onClose} className="text-[#8A8580] hover:text-[#D4AF37] text-lg" aria-label="Close size guide">✕</button>
        </div>
        <p className="text-[#8A8580] text-sm mb-4 leading-relaxed">
          To find your ring size, wrap a thin strip of paper around your finger and mark where it overlaps. Measure the length with a ruler — this is your circumference.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(212,175,55,0.2)]">
                {['US Size', 'UK Size', 'Circumference', 'Diameter'].map(h => (
                  <th key={h} className="py-2 px-3 text-left text-[#D4AF37] text-xs tracking-widest uppercase font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((s, i) => (
                <tr key={i} className="border-b border-[rgba(212,175,55,0.06)] hover:bg-[rgba(212,175,55,0.03)]">
                  <td className="py-2.5 px-3 text-[#F9F6F0]">{s.us}</td>
                  <td className="py-2.5 px-3 text-[#F9F6F0]">{s.uk}</td>
                  <td className="py-2.5 px-3 text-[#8A8580]">{s.circumference}</td>
                  <td className="py-2.5 px-3 text-[#8A8580]">{s.diameter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[#4A4540] text-xs mt-4">If between sizes, we recommend choosing the larger size. Complimentary resizing available within 30 days.</p>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  useScrollTop();
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const related = getRelatedProducts(id);

  useDocTitle(
    product?.name || 'Product',
    product ? `${product.name} – ${product.purity}. ${product.stone}. ${formatINR(product.price)} at AURELIA.` : ''
  );

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const { openCart } = useCartDrawer();
  const [qty, setQty] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const wishlisted = product ? isWishlisted(product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-center">
          <p className="font-display text-3xl text-[#F9F6F0] mb-4">Piece not found</p>
          <Link to="/collection" className="btn-gold">Back to Collection</Link>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product, qty);
    addToast(`Added to your bag — ${product.name}`, 'cart');
    openCart();
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    addToast(wishlisted ? 'Removed from wishlist' : `Saved to wishlist — ${product.name}`, 'wishlist');
  };

  return (
    <div className="bg-[#121212] min-h-screen">
      {/* Back */}
      <div className="pt-24 px-6 md:px-12 pb-4 max-w-screen-xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#8A8580] hover:text-[#D4AF37] transition-colors text-xs tracking-widest uppercase"
          aria-label="Go back"
        >
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div
            className="relative aspect-square flex items-center justify-center bg-[#161616] border border-[rgba(212,175,55,0.1)]"
            style={{ background: 'radial-gradient(circle at 50% 45%, rgba(212,175,55,0.08), rgba(18,18,18,0.98) 70%)' }}
          >
            {product.badge && (
              <span className="absolute top-4 left-4 text-[#D4AF37] text-[10px] tracking-widest uppercase border border-[rgba(212,175,55,0.4)] bg-[rgba(18,18,18,0.85)] px-2 py-0.5 z-10">
                {product.badge}
              </span>
            )}
            <div className="p-16">
              <JewelSVG type={product.svgType || 'ring'} size={320} />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6 pt-2">
            {/* Category */}
            <div>
              <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">{product.category}</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl text-[#F9F6F0] leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.round(product.rating) ? 'star fill-current' : 'text-[#2A2A2A]'} />
                ))}
              </div>
              <span className="text-[#8A8580] text-sm">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="font-display text-3xl text-[#D4AF37]">{formatINR(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-[#4A4540] text-lg line-through">{formatINR(product.originalPrice)}</span>
                  <span className="text-green-400 text-sm">Save {formatINR(product.originalPrice - product.price)}</span>
                </>
              )}
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#1A1A1A] border border-[rgba(212,175,55,0.1)] p-4">
                <p className="text-[#4A4540] text-[10px] tracking-widest uppercase mb-1">Metal</p>
                <p className="text-[#F9F6F0] text-sm">{product.purity}</p>
              </div>
              <div className="bg-[#1A1A1A] border border-[rgba(212,175,55,0.1)] p-4">
                <p className="text-[#4A4540] text-[10px] tracking-widest uppercase mb-1">Stone</p>
                <p className="text-[#F9F6F0] text-sm">{product.stone}</p>
              </div>
            </div>

            {/* Ring size guide link */}
            {product.isRing && (
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-widest uppercase hover:underline underline-offset-4 w-fit"
              >
                <Ruler size={13} /> Ring Size Guide
              </button>
            )}

            {/* Qty + Add */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-[rgba(212,175,55,0.25)]">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] transition-colors text-lg"
                  aria-label="Decrease quantity"
                >−</button>
                <span className="w-10 text-center text-[#F9F6F0] text-sm">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] transition-colors text-lg"
                  aria-label="Increase quantity"
                >+</button>
              </div>
              <button onClick={handleAdd} className="btn-gold flex-1">
                <ShoppingBag size={16} /> Add to Bag
              </button>
              <button
                onClick={handleWishlist}
                className={`w-11 h-11 flex items-center justify-center border transition-colors ${wishlisted ? 'border-red-400 text-red-400' : 'border-[rgba(212,175,55,0.3)] text-[#D4AF37] hover:border-[#D4AF37]'}`}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={16} className={wishlisted ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="flex flex-wrap gap-4 text-xs text-[#8A8580]">
              {['Free Shipping in India', 'Lifetime Guarantee', 'Complimentary Gift Box', 'Certified Hallmark'].map(g => (
                <span key={g} className="flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">✓</span> {g}
                </span>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-t border-[rgba(212,175,55,0.1)] pt-6">
              <div className="flex gap-6 mb-4 border-b border-[rgba(212,175,55,0.08)]">
                {['details', 'care', 'delivery'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-xs tracking-widest uppercase transition-colors ${activeTab === tab ? 'text-[#D4AF37] border-b border-[#D4AF37] -mb-[1px]' : 'text-[#8A8580] hover:text-[#D4AF37]'}`}
                  >
                    {tab === 'details' ? 'Description' : tab === 'care' ? 'Care' : 'Delivery'}
                  </button>
                ))}
              </div>
              <div className="text-[#8A8580] text-sm leading-relaxed">
                {activeTab === 'details' && <p>{product.description}</p>}
                {activeTab === 'care' && <p>{product.care}</p>}
                {activeTab === 'delivery' && (
                  <div className="space-y-2">
                    <p>✓ Free insured delivery across India (3–5 business days)</p>
                    <p>✓ International shipping available (7–14 business days)</p>
                    <p>✓ Each piece delivered in a handcrafted Aurelia jewellery box</p>
                    <p>✓ Complimentary gift message</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* You may also like */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-12">
              <div className="gold-line mx-auto" />
              <h2 className="font-display text-3xl text-[#F9F6F0]">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {sizeGuideOpen && <RingSizeModal onClose={() => setSizeGuideOpen(false)} />}
    </div>
  );
}
