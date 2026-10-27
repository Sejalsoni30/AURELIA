import { useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchOverlay from './components/SearchOverlay';
import Toast from './components/Toast';
import {
  CartProvider,
  WishlistProvider,
  ToastProvider,
  SearchProvider,
  CartDrawerProvider,
  useCartDrawer,
  useSearch
} from './context/AppContext';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetail from './pages/ProductDetail';
import Craft from './pages/Craft';
import Origin from './pages/Origin';
import Atelier from './pages/Atelier';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Wishlist from './pages/Wishlist';
import { Shipping, Returns, Care, Privacy, Terms, NotFound } from './pages/StaticPages';

// Custom cursor
function Cursor() {
  const cursorRef = useRef(null);
  
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    const cursor = cursorRef.current;
    if (!cursor) return;

    let targetX = 0, targetY = 0, currX = 0, currY = 0;
    let animId;

    const move = (e) => { targetX = e.clientX; targetY = e.clientY; };

    const animate = () => {
      currX += (targetX - currX) * 0.15;
      currY += (targetY - currY) * 0.15;
      cursor.style.left = currX + 'px';
      cursor.style.top = currY + 'px';
      animId = requestAnimationFrame(animate);
    };

    const addHover = () => cursor.classList.add('hovering');
    const removeHover = () => cursor.classList.remove('hovering');

    window.addEventListener('mousemove', move);
    animate();

    // Add hover class to interactive elements
    const attachListeners = () => {
      document.querySelectorAll('a, button, [data-cursor], input, select, textarea').forEach(el => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    };
    attachListeners();

    // Re-attach on DOM mutations
    const obs = new MutationObserver(attachListeners);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(animId);
      obs.disconnect();
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}

// Scroll-to-top on route change + close drawers
function RouteEffects() {
  const location = useLocation();
  const { closeCart } = useCartDrawer();
  const { closeSearch } = useSearch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    closeCart();
    closeSearch();
  }, [location.pathname, closeCart, closeSearch]);

  return null;
}

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Cursor />
      <RouteEffects />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/craft" element={<Craft />} />
          <Route path="/origin" element={<Origin />} />
          <Route path="/atelier" element={<Atelier />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/care" element={<Care />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <SearchProvider>
              <CartDrawerProvider>
                <AppLayout />
              </CartDrawerProvider>
            </SearchProvider>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </HashRouter>
  );
}
