import { useEffect, useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart, useCartDrawer } from '../context/AppContext';
import { formatINR } from '../data/products';
import { JewelSVG } from './JewelSVG';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQty, cartTotal, clearCart } = useCart();
  const { cartOpen, closeCart } = useCartDrawer();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Close on escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeCart(); };
    if (cartOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cartOpen, closeCart]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen]);

  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  const handleOrderConfirmed = () => {
    setCheckoutOpen(false);
    setConfirmed(true);
    clearCart();
  };

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`cart-drawer fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#141414] border-l border-[rgba(212,175,55,0.15)] z-[61] flex flex-col`}
        style={{ transform: cartOpen ? 'translateX(0)' : 'translateX(100%)' }}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(212,175,55,0.1)]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-[#D4AF37]" />
            <h2 className="font-display text-lg tracking-wide text-[#F9F6F0]">Your Bag</h2>
          </div>
          <button
            onClick={closeCart}
            className="text-[#8A8580] hover:text-[#D4AF37] transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 && !confirmed ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-20">
              <div className="opacity-20">
                <JewelSVG type="ring" size={100} />
              </div>
              <p className="font-display text-xl text-[#8A8580]">Your bag is empty</p>
              <p className="text-[#4A4540] text-sm">Discover our collection</p>
            </div>
          ) : confirmed ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-6 py-20">
              <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
                <span className="text-[#D4AF37] text-2xl">✦</span>
              </div>
              <div>
                <h3 className="font-display text-2xl text-[#F9F6F0] mb-2">Order Confirmed</h3>
                <p className="text-[#8A8580] text-sm">Thank you for your order. Our team will be in touch shortly with your confirmation and delivery details.</p>
              </div>
              <button onClick={() => { setConfirmed(false); closeCart(); }} className="btn-ghost text-xs">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 py-4 border-b border-[rgba(212,175,55,0.08)]">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#1E1E1E] flex items-center justify-center flex-shrink-0 border border-[rgba(212,175,55,0.1)]">
                    <JewelSVG type={item.svgType || 'ring'} size={64} />
                  </div>
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm text-[#F9F6F0] leading-tight mb-1">{item.name}</p>
                    <p className="text-[#8A8580] text-xs mb-3">{item.purity}</p>
                    <div className="flex items-center justify-between">
                      {/* Qty */}
                      <div className="flex items-center gap-2 border border-[rgba(212,175,55,0.2)]">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          disabled={item.qty <= 1}
                          className="w-7 h-7 flex items-center justify-center text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] transition-colors disabled:opacity-30"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-[#F9F6F0] text-xs w-5 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-[#D4AF37] text-sm font-medium">{formatINR(item.price * item.qty)}</p>
                    </div>
                  </div>
                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#4A4540] hover:text-red-400 transition-colors self-start mt-1"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && !confirmed && (
          <div className="px-6 py-5 border-t border-[rgba(212,175,55,0.1)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#8A8580] text-xs tracking-widest uppercase">Total</span>
              <span className="font-display text-xl text-[#D4AF37]">{formatINR(cartTotal)}</span>
            </div>
            <p className="text-[#4A4540] text-xs mb-4">Shipping & taxes calculated at checkout</p>
            <button onClick={handleCheckout} className="btn-gold w-full justify-center">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {checkoutOpen && (
        <CheckoutModal
          cart={cart}
          total={cartTotal}
          onClose={() => setCheckoutOpen(false)}
          onConfirm={handleOrderConfirmed}
        />
      )}
    </>
  );
}
