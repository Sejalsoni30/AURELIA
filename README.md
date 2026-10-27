# AURELIA – Fine Jewellery Website

A cinematic, scroll-driven luxury e-commerce and storytelling website for the AURELIA fine jewellery brand. Built with React 18 + Vite, Tailwind CSS, GSAP ScrollTrigger, and React Router (HashRouter for GitHub Pages deployment).

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deploy to GitHub Pages

1. Build the project: `npm run build`
2. Push the `dist/` folder to the `gh-pages` branch (using `gh-pages` package):
   ```bash
   npm install -g gh-pages
   gh-pages -d dist
   ```
3. In your GitHub repo settings → Pages, set source to `gh-pages` branch.
4. The HashRouter ensures all client-side routes work correctly without server configuration.

## 📁 Project Structure

```
src/
├── assets/          # Static assets (empty – jewellery uses inline SVGs)
├── components/
│   ├── CartDrawer.jsx       # Sliding cart with quantity controls
│   ├── CheckoutModal.jsx    # Demo checkout + order confirmation
│   ├── Footer.jsx           # 5-column footer with newsletter
│   ├── Header.jsx           # Sticky nav with cart badge
│   ├── JewelSVG.jsx         # 9 inline SVG jewellery components
│   ├── ProductCard.jsx      # Card with hover, quick view, wishlist
│   ├── QuickView.jsx        # Product quick-view modal
│   ├── SearchOverlay.jsx    # Full-screen live search
│   └── Toast.jsx            # Notification toasts
├── context/
│   └── AppContext.jsx       # Cart, Wishlist, Toast, Search contexts
├── data/
│   └── products.js          # 12-product catalogue, INR pricing
├── hooks/
│   └── useUtils.js          # Scroll-to-top, doc title, cursor hooks
└── pages/
    ├── Home.jsx             # Cinematic hero + GSAP scroll story
    ├── Collection.jsx       # Filterable product grid
    ├── ProductDetail.jsx    # PDP with size guide modal
    ├── Craft.jsx            # 4-stage craft story
    ├── Origin.jsx           # Sourcing & sustainability
    ├── Atelier.jsx          # Booking form
    ├── Contact.jsx          # Contact form + map
    ├── FAQ.jsx              # Accordion FAQ
    ├── Wishlist.jsx         # Saved items
    └── StaticPages.jsx      # Shipping, Returns, Care, Privacy, Terms, 404
```

## 🎨 Design System

| Token | Value |
|-------|-------|
| Matte Black | `#121212` |
| Champagne Gold | `#D4AF37` |
| Soft Ivory | `#F9F6F0` |
| Display Font | Cormorant Garamond |
| Body Font | Inter |

## ✨ Key Features

- **GSAP ScrollTrigger** – 4-step pinned scroll story on the home page
- **Custom Gold Cursor** – Animated ring that expands over interactive elements (desktop only)
- **Diamond Particle Canvas** – Animated floating particles on the hero section
- **Persistent Cart & Wishlist** – Saved to localStorage
- **Live Search** – Filters all products in real time
- **Quick View Modal** – Escape key and click-outside to close
- **Ring Size Guide** – Modal with size conversion table on ring PDPs
- **Cart Drawer** – Slides in from right with quantity controls
- **Checkout Flow** – Demo form → processing → order confirmed
- **Toast Notifications** – For cart and wishlist actions
- **Fully Accessible** – ARIA labels, focus-visible, keyboard nav, prefers-reduced-motion
- **Responsive** – Mobile-first, hamburger menu, touch-friendly

## 🛠️ Tech Stack

- React 18 + Vite 6
- React Router v6 (HashRouter)
- Tailwind CSS v3
- GSAP + ScrollTrigger
- Lucide React (icons)
- No backend – all client-side

## 📝 Notes

- All jewellery imagery uses hand-crafted inline SVG components (no external image dependencies)
- Prices are in Indian Rupees (INR) with Indian grouping (e.g., ₹1,48,000)
- The checkout flow is a demonstration – no real payment processing
- Forms validate client-side and show success states

---

© 2025 AURELIA Fine Jewellery Private Limited · Mumbai
