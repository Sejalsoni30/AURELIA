import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useDocTitle, useScrollTop } from '../hooks/useUtils';

const faqs = [
  {
    q: 'Are your diamonds certified?',
    a: 'Yes. Every diamond we use carries a grading report from either the GIA (Gemological Institute of America) or IGI (International Gemological Institute). The report accompanies your jewellery. Diamonds above 0.30ct include an individual laser inscription on the girdle.',
  },
  {
    q: 'What is the Aurelia Lifetime Guarantee?',
    a: 'Every piece we create carries a lifetime guarantee against manufacturing defects. This covers loose prongs, faulty clasps, and structural issues at no charge. It also includes one complimentary re-polishing and sizing per year. Normal wear, accidental damage, and loss are not covered.',
  },
  {
    q: 'Can I customise an existing design?',
    a: 'Absolutely. Any piece in our collection can be adapted — metal colour, stone choice, stone size, or proportions. Contact us or book an atelier appointment. Most modifications add 2–3 weeks to the production timeline.',
  },
  {
    q: 'How do I find my ring size?',
    a: 'The most accurate method is to visit our atelier, where we use a set of precision sizing rings. Alternatively, wrap a 6mm strip of paper snugly around your finger, mark the overlap point, and measure the length. Compare against our size guide on any ring product page.',
  },
  {
    q: 'How long does a bespoke commission take?',
    a: 'Most bespoke commissions take 4–8 weeks from approved design to delivery. Exceptionally complex pieces — such as full pavé pieces or those incorporating multiple stones — may require 10–12 weeks. We provide a timeline with every commission quote.',
  },
  {
    q: 'Do you offer international shipping?',
    a: 'Yes. We ship worldwide via insured express courier (DHL or FedEx). International delivery typically takes 5–10 business days. All duties and taxes are the responsibility of the recipient. We can provide an estimate of likely import costs for your destination country.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards, UPI, bank transfer (NEFT/RTGS), and PayPal for international orders. For orders above ₹5 lakhs, we offer a structured payment plan. Contact us for details.',
  },
  {
    q: 'Can I return or exchange a piece?',
    a: 'We offer a 30-day return window on unaltered, unworn pieces in original packaging with proof of purchase. Bespoke commissions and personalised pieces are non-returnable by nature. Please see our full Returns Policy for details.',
  },
  {
    q: 'How should I clean my jewellery at home?',
    a: 'For gold and diamond jewellery, warm water with a drop of mild dish soap and a soft toothbrush is usually sufficient. Rinse thoroughly and pat dry with a lint-free cloth. Avoid ultrasonic cleaners for pieces with pearls, emeralds, opals, or stones set in pavé. See our Jewellery Care guide for specific advice.',
  },
  {
    q: 'Do you buy or appraise old jewellery?',
    a: 'We offer a complimentary appraisal service for heirloom pieces you wish to redesign with us. We do not purchase jewellery outright, but we excel at incorporating existing stones and metals into new commissions.',
  },
];

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[rgba(212,175,55,0.1)]">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left flex items-center justify-between py-5 gap-4"
        aria-expanded={open}
        id={`faq-btn-${index}`}
        aria-controls={`faq-panel-${index}`}
      >
        <span className="text-[#F9F6F0] text-base leading-snug pr-4">{item.q}</span>
        <ChevronDown
          size={18}
          className={`text-[#D4AF37] flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
        className={`faq-content ${open ? 'open' : ''}`}
      >
        <p className="text-[#8A8580] text-sm leading-relaxed pb-5">{item.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  useScrollTop();
  useDocTitle('FAQ', 'Frequently asked questions about AURELIA jewellery – diamonds, sizing, shipping, returns and more.');

  return (
    <div className="bg-[#121212] min-h-screen">
      <div className="pt-40 pb-16 px-6 text-center" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #121212 100%)' }}>
        <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">Questions &amp; Answers</span>
        <h1 className="font-display text-5xl text-[#F9F6F0] mt-3 mb-4">Frequently Asked Questions</h1>
      </div>

      <div className="max-w-screen-md mx-auto px-6 md:px-12 pb-24">
        <div className="gold-line mb-8" />
        {faqs.map((item, i) => (
          <FAQItem key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
