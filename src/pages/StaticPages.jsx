// Static informational pages – Shipping, Returns, Care, Privacy, Terms, 404

import { Link } from 'react-router-dom';
import { useDocTitle, useScrollTop } from '../hooks/useUtils';

function StaticPage({ title, subtitle, docTitle, metaDesc, children }) {
  useScrollTop();
  useDocTitle(docTitle || title, metaDesc);
  return (
    <div className="bg-[#121212] min-h-screen">
      <div className="pt-40 pb-16 px-6 text-center" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #121212 100%)' }}>
        {subtitle && <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">{subtitle}</span>}
        <h1 className="font-display text-5xl text-[#F9F6F0] mt-3 mb-4">{title}</h1>
      </div>
      <div className="max-w-screen-md mx-auto px-6 md:px-12 pb-24 text-[#8A8580] leading-relaxed">
        <div className="gold-line mb-8" />
        {children}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="font-display text-2xl text-[#F9F6F0] mb-4">{title}</h2>
      {children}
    </div>
  );
}

function P({ children }) {
  return <p className="text-sm leading-relaxed mb-4">{children}</p>;
}

function Ul({ items }) {
  return (
    <ul className="space-y-2 mb-4">
      {items.map((item, i) => (
        <li key={i} className="text-sm flex items-start gap-2">
          <span className="text-[#D4AF37] mt-0.5">—</span> {item}
        </li>
      ))}
    </ul>
  );
}

// ── SHIPPING ────────────────────────────────────────────────
export function Shipping() {
  return (
    <StaticPage title="Shipping" subtitle="Delivery Information" docTitle="Shipping" metaDesc="AURELIA shipping policy – India and international delivery, timelines and packaging.">
      <Section title="India Delivery">
        <P>All domestic orders are shipped via insured express courier (Blue Dart or DTDC) and require a signature upon receipt. We do not use third-party fulfilment centres — your order is packed and dispatched directly from our Mumbai atelier.</P>
        <Ul items={[
          'Standard Delivery (3–5 business days) – Free on all orders',
          'Express Delivery (1–2 business days) – ₹1,500',
          'Same-day Mumbai delivery available by 12 PM – ₹3,000',
        ]} />
      </Section>
      <Section title="International Delivery">
        <P>We ship to over 40 countries via DHL Express or FedEx International. All international shipments are fully insured for the declared retail value.</P>
        <Ul items={[
          'USA, UK, EU, Australia – 5–8 business days',
          'UAE, Singapore, Hong Kong – 3–5 business days',
          'Other destinations – 7–14 business days',
          'International shipping: ₹4,500–₹8,500 depending on destination',
        ]} />
        <P>Import duties, taxes, and customs fees are the responsibility of the recipient and are not included in our shipping charges. We recommend checking your local customs regulations before ordering.</P>
      </Section>
      <Section title="Packaging">
        <P>Every Aurelia order is packed in a handcrafted wooden jewellery box lined with ivory silk, tied with a gold ribbon, and placed in a recycled kraft outer box. A certificate of authenticity, gemstone grading report (where applicable), and care guide are included.</P>
        <P>Our packaging is 100% recyclable. The wooden box is made from responsibly sourced mango wood.</P>
      </Section>
      <Section title="Order Tracking">
        <P>Once your order has been dispatched, you will receive an email and/or SMS with a tracking number. Orders can be tracked directly on the courier's website. For any tracking enquiries, please contact us at hello@aurelia.in.</P>
      </Section>
    </StaticPage>
  );
}

// ── RETURNS ─────────────────────────────────────────────────
export function Returns() {
  return (
    <StaticPage title="Returns" subtitle="Returns & Exchanges" docTitle="Returns" metaDesc="AURELIA returns policy – 30-day window, conditions, and process.">
      <Section title="Our Returns Policy">
        <P>We want you to be completely delighted with your Aurelia purchase. If for any reason you are not satisfied, we offer a 30-day return window from the date of delivery for unworn, unaltered pieces in their original packaging.</P>
      </Section>
      <Section title="Eligible for Return">
        <Ul items={[
          'Unworn jewellery in original condition',
          'Item in original box with all documentation',
          'Purchased within the last 30 days',
          'Not a bespoke or personalised commission',
          'Not an engraved or resized piece',
        ]} />
      </Section>
      <Section title="How to Return">
        <P>To initiate a return, email hello@aurelia.in with your order number and reason for return. We will arrange a complimentary, insured return courier collection from your address. Once we have received and inspected the item, we will process your refund within 5–7 business days.</P>
        <P>Refunds are issued to the original payment method. Bank transfer timelines may vary by institution.</P>
      </Section>
      <Section title="Exchanges">
        <P>We are happy to exchange a piece for a different size, metal colour, or style. Please follow the same return process and indicate your preferred exchange item. If there is a price difference, we will invoice or refund accordingly.</P>
      </Section>
      <Section title="Non-Returnable Items">
        <Ul items={[
          'Bespoke and personalised commissions',
          'Engraved pieces',
          'Resized rings (beyond our complimentary first resize)',
          'Items showing signs of wear or damage',
          'Items not in original packaging',
        ]} />
      </Section>
    </StaticPage>
  );
}

// ── CARE ─────────────────────────────────────────────────────
export function Care() {
  return (
    <StaticPage title="Jewellery Care" subtitle="Care & Maintenance" docTitle="Jewellery Care" metaDesc="How to care for your AURELIA fine jewellery – cleaning, storage, and maintenance advice.">
      <Section title="General Care Principles">
        <P>Fine jewellery is designed to last lifetimes — but it rewards thoughtful care. A few simple habits will keep your Aurelia pieces as brilliant as the day they arrived.</P>
        <Ul items={[
          'Remove jewellery before swimming, showering, or exercising',
          'Apply perfume, hairspray, and lotions before putting on jewellery',
          'Store each piece separately to avoid scratching',
          'Have prongs and clasps checked by a professional annually',
        ]} />
      </Section>
      <Section title="Cleaning Gold Jewellery">
        <P>Mix a few drops of mild dish soap in warm (not hot) water. Soak your piece for 20–30 minutes, then gently scrub with a very soft toothbrush — paying attention to settings and under stones. Rinse thoroughly in clean warm water and pat dry with a lint-free cloth.</P>
        <P>Allow to air dry completely before storing.</P>
      </Section>
      <Section title="Cleaning Diamond Jewellery">
        <P>Diamonds can be cleaned with the soap-and-water method above. For a deeper clean, a few drops of ammonia in warm water (1 part ammonia to 6 parts water) works effectively. Soak for 10 minutes, brush gently, rinse, and dry.</P>
        <P>Ultrasonic cleaners are generally safe for diamond jewellery but should not be used on pieces with very small pavé stones or if prongs appear loose.</P>
      </Section>
      <Section title="Caring for Pearls">
        <P>Pearls are organic and highly sensitive. Wipe with a slightly damp soft cloth after each wear. Never submerge in water or expose to ultrasonic cleaners. Store flat — not hung — to prevent stretching of the silk thread. Re-knotting is recommended every 2–3 years.</P>
      </Section>
      <Section title="Caring for Coloured Gemstones">
        <P>Most coloured gemstones (sapphires, rubies, spinels) can be cleaned with warm soapy water. Avoid harsh chemicals. Emeralds and opals are more delicate — use a lightly damp cloth only and avoid any soaking.</P>
      </Section>
      <Section title="Storage">
        <P>Store each piece in its Aurelia box or in a fabric-lined jewellery box with separate compartments. This prevents pieces from scratching each other. Gold and silver should not be stored together. A silica gel sachet in the box helps absorb moisture.</P>
      </Section>
      <Section title="Professional Servicing">
        <P>We recommend bringing your Aurelia jewellery in for a complimentary professional clean and inspection once a year. Our craftsmen will check all prongs, clasps, and settings, and polish the piece to its original lustre. Book via our Atelier page or email us.</P>
      </Section>
    </StaticPage>
  );
}

// ── PRIVACY ──────────────────────────────────────────────────
export function Privacy() {
  return (
    <StaticPage title="Privacy Policy" subtitle="Data & Privacy" docTitle="Privacy Policy" metaDesc="AURELIA privacy policy – how we collect, use and protect your personal data.">
      <P className="text-[#4A4540] text-sm">Last updated: 1 January 2025</P>
      <Section title="1. Who We Are">
        <P>Aurelia Fine Jewellery Private Limited ("Aurelia", "we", "us") is a private company registered in India (CIN: U74999MH2004PTC000000) with its principal place of business at 22 Rope Walk Lane, Kala Ghoda, Fort, Mumbai 400 001.</P>
      </Section>
      <Section title="2. What We Collect">
        <P>When you interact with our website or make a purchase, we may collect: your name, email address, phone number, delivery address, payment card details (processed by our payment provider — we do not store card data ourselves), and browsing behaviour on our website.</P>
      </Section>
      <Section title="3. How We Use It">
        <Ul items={[
          'To process and fulfil your orders',
          'To communicate about your order, returns, and appointments',
          'To send the Aurelia Circle newsletter (only with your explicit consent)',
          'To improve our website and customer experience',
          'To comply with legal and regulatory obligations',
        ]} />
      </Section>
      <Section title="4. Sharing Your Data">
        <P>We do not sell your personal data. We share it only with: our delivery partners (for shipment), our payment processor (for transactions), and our email service provider (for correspondence). All partners are bound by data processing agreements.</P>
      </Section>
      <Section title="5. Your Rights">
        <P>Under applicable data protection law, you have the right to access, correct, delete, or port your personal data. To exercise any of these rights, email privacy@aurelia.in. We will respond within 30 days.</P>
      </Section>
      <Section title="6. Cookies">
        <P>We use essential cookies (for cart and session functionality) and optional analytics cookies. You can manage cookie preferences in your browser settings.</P>
      </Section>
      <Section title="7. Contact">
        <P>For privacy questions, contact our Data Protection Officer at privacy@aurelia.in or write to us at our Mumbai address above.</P>
      </Section>
    </StaticPage>
  );
}

// ── TERMS ──────────────────────────────────────────────────
export function Terms() {
  return (
    <StaticPage title="Terms of Sale" subtitle="Legal" docTitle="Terms of Sale" metaDesc="AURELIA terms of sale – ordering, payment, delivery and your rights as a customer.">
      <P className="text-[#4A4540] text-sm">Last updated: 1 January 2025</P>
      <Section title="1. Application">
        <P>These Terms of Sale govern all purchases made through aurelia.in. By placing an order, you agree to these terms. Please read them carefully before ordering.</P>
      </Section>
      <Section title="2. Orders">
        <P>Your order constitutes an offer to purchase. We will confirm receipt by email. A binding contract is formed when we send a dispatch confirmation. We reserve the right to decline any order at our discretion.</P>
      </Section>
      <Section title="3. Prices">
        <P>All prices are in Indian Rupees (INR) and include applicable GST at 3% (as applicable to gold jewellery). We reserve the right to change prices at any time, but changes will not affect confirmed orders.</P>
      </Section>
      <Section title="4. Payment">
        <P>Payment is due in full at the time of ordering. We accept all major credit and debit cards, UPI, and bank transfer. For bespoke commissions above ₹5 lakhs, we may arrange a staged payment schedule by mutual agreement.</P>
      </Section>
      <Section title="5. Hallmarking">
        <P>All Aurelia jewellery is hallmarked in accordance with Bureau of Indian Standards (BIS) regulations. Certificate of hallmarking is provided with every purchase.</P>
      </Section>
      <Section title="6. Warranties">
        <P>Our Lifetime Guarantee covers manufacturing defects. It does not cover normal wear, accidental damage, or loss. Third-party insurance for loss and accidental damage is available and recommended for high-value pieces.</P>
      </Section>
      <Section title="7. Dispute Resolution">
        <P>Any dispute arising from a purchase shall first be addressed through our customer service team. If unresolved, disputes are subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra, India.</P>
      </Section>
      <Section title="8. Contact">
        <P>For queries about these terms, email legal@aurelia.in or write to 22 Rope Walk Lane, Kala Ghoda, Fort, Mumbai 400 001.</P>
      </Section>
    </StaticPage>
  );
}

// ── 404 ─────────────────────────────────────────────────────
export function NotFound() {
  useScrollTop();
  useDocTitle('Page Not Found', '');
  return (
    <div className="bg-[#121212] min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="mb-8 opacity-20">
        <svg viewBox="0 0 200 200" width={120} height={120} aria-hidden="true">
          <defs>
            <linearGradient id="nf-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B8942E" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="none" stroke="url(#nf-gold)" strokeWidth="2" />
          <text x="100" y="115" textAnchor="middle" fontSize="64" fill="url(#nf-gold)" fontFamily="Cormorant Garamond, serif">?</text>
        </svg>
      </div>
      <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase mb-3">Error 404</span>
      <h1 className="font-display text-5xl text-[#F9F6F0] mb-4">Page Not Found</h1>
      <p className="text-[#8A8580] text-base max-w-sm mx-auto mb-10 leading-relaxed">
        The page you are looking for seems to have wandered off, like a gemstone between settings. Let us help you find your way.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/" className="btn-gold">Return Home</Link>
        <Link to="/collection" className="btn-ghost">View Collection</Link>
        <Link to="/contact" className="btn-ghost">Contact Us</Link>
      </div>
    </div>
  );
}
