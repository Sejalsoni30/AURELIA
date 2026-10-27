import { useToast } from '../context/AppContext';
import { CheckCircle, X, ShoppingBag, Heart } from 'lucide-react';

export default function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div
      className="fixed bottom-6 right-6 z-[9998] flex flex-col gap-3 pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="toast-enter pointer-events-auto flex items-center gap-3 px-5 py-4 glass-panel min-w-[260px] max-w-[360px]"
          role="status"
        >
          <div className="text-[#D4AF37]">
            {toast.type === 'cart' ? <ShoppingBag size={18} /> :
             toast.type === 'wishlist' ? <Heart size={18} /> :
             <CheckCircle size={18} />}
          </div>
          <p className="text-[#F9F6F0] text-sm flex-1">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}
