import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { formatINR } from '../data/products';

export default function CheckoutModal({ cart, total, onClose, onConfirm }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', pincode: '' });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required';
    if (!form.phone.match(/^\+?[0-9]{10,13}$/)) errs.phone = 'Valid phone required';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.pincode.match(/^[0-9]{6}$/)) errs.pincode = '6-digit PIN required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onConfirm();
    }, 2000);
  };

  const field = (key, label, type = 'text', placeholder = '') => (
    <div>
      <label htmlFor={`checkout-${key}`} className="block text-[#8A8580] text-xs tracking-widest uppercase mb-1">{label}</label>
      <input
        id={`checkout-${key}`}
        type={type}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full bg-[#1E1E1E] border px-3 py-2.5 text-sm text-[#F9F6F0] outline-none transition-colors placeholder-[#4A4540] ${errors[key] ? 'border-red-500' : 'border-[rgba(212,175,55,0.2)] focus:border-[#D4AF37]'}`}
      />
      {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 modal-backdrop"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-content bg-[#141414] border border-[rgba(212,175,55,0.2)] w-full max-w-lg max-h-[90vh] overflow-y-auto" role="dialog" aria-modal="true" aria-label="Checkout">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(212,175,55,0.1)]">
          <h2 className="font-display text-xl tracking-wide text-[#F9F6F0]">Checkout</h2>
          <button
            id="close-checkout-modal"
            onClick={onClose}
            className="text-[#8A8580] hover:text-[#D4AF37] transition-colors p-1"
            aria-label="Close checkout"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4" noValidate>
          {/* Order summary */}
          <div className="bg-[#1A1A1A] border border-[rgba(212,175,55,0.1)] p-4 mb-2">
            <p className="text-xs tracking-widest uppercase text-[#8A8580] mb-3">Order Summary</p>
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm py-1">
                <span className="text-[#F9F6F0]">{item.name} × {item.qty}</span>
                <span className="text-[#D4AF37]">{formatINR(item.price * item.qty)}</span>
              </div>
            ))}
            <div className="border-t border-[rgba(212,175,55,0.1)] mt-3 pt-3 flex justify-between font-medium">
              <span className="text-[#F9F6F0] text-sm">Total</span>
              <span className="text-[#D4AF37]">{formatINR(total)}</span>
            </div>
          </div>

          {field('name', 'Full Name', 'text', 'Ananya Sharma')}
          {field('email', 'Email', 'email', 'ananya@example.com')}
          {field('phone', 'Phone', 'tel', '+91 98765 43210')}
          {field('address', 'Delivery Address', 'text', '22, Marine Drive')}
          <div className="grid grid-cols-2 gap-4">
            {field('city', 'City', 'text', 'Mumbai')}
            {field('pincode', 'PIN Code', 'text', '400001')}
          </div>

          <button type="submit" disabled={processing} className="btn-gold w-full justify-center mt-2">
            {processing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : 'Place Order'}
          </button>
          <p className="text-[#4A4540] text-xs text-center">This is a demonstration. No payment will be charged.</p>
        </form>
      </div>
    </div>
  );
}
