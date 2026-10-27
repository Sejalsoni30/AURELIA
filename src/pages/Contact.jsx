import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useDocTitle, useScrollTop } from '../hooks/useUtils';

export default function Contact() {
  useScrollTop();
  useDocTitle('Contact', 'Contact AURELIA Fine Jewellery – Mumbai atelier, phone, email and enquiries.');

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Please write at least 10 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1600);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@aurelia.in', href: 'mailto:hello@aurelia.in' },
    { icon: Phone, label: 'Phone', value: '+91 88888 88888', href: 'tel:+918888888888' },
    { icon: MapPin, label: 'Address', value: '22 Rope Walk Lane, Kala Ghoda, Fort, Mumbai 400 001', href: null },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat 10 AM – 6 PM\nSunday by appointment only', href: null },
  ];

  const field = (key, label, type = 'text', placeholder = '') => (
    <div>
      <label htmlFor={`contact-${key}`} className="block text-[#8A8580] text-[10px] tracking-widest uppercase mb-1.5">{label}</label>
      <input
        id={`contact-${key}`}
        type={type}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full bg-[#1A1A1A] border px-4 py-3 text-sm text-[#F9F6F0] outline-none transition-colors placeholder-[#4A4540] ${errors[key] ? 'border-red-500' : 'border-[rgba(212,175,55,0.2)] focus:border-[#D4AF37]'}`}
      />
      {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="bg-[#121212] min-h-screen">
      {/* Hero */}
      <div className="pt-40 pb-20 px-6 text-center" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #121212 100%)' }}>
        <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">Get in Touch</span>
        <h1 className="font-display text-5xl md:text-6xl text-[#F9F6F0] mt-3 mb-6">Contact</h1>
        <p className="text-[#8A8580] text-base max-w-md mx-auto">We respond to every message personally, usually within one business day.</p>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 pb-24 grid md:grid-cols-2 gap-16">
        {/* Contact Info + Map */}
        <div>
          <div className="gold-line mb-6" />
          <h2 className="font-display text-3xl text-[#F9F6F0] mb-8">Find Us</h2>

          <div className="flex flex-col gap-6 mb-10">
            {contactInfo.map(c => (
              <div key={c.label} className="flex gap-4 items-start">
                <c.icon size={18} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#4A4540] text-[10px] tracking-widest uppercase mb-0.5">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-[#F9F6F0] text-sm hover:text-[#D4AF37] transition-colors no-underline">{c.value}</a>
                  ) : (
                    <p className="text-[#F9F6F0] text-sm whitespace-pre-line">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div
            className="relative border border-[rgba(212,175,55,0.15)] overflow-hidden"
            style={{ height: '320px', background: '#0D0D0D' }}
            role="img"
            aria-label="Map showing AURELIA location at Kala Ghoda, Mumbai"
          >
            {/* Stylised map */}
            <svg viewBox="0 0 400 320" className="w-full h-full opacity-60" aria-hidden="true">
              <rect width="400" height="320" fill="#0D0D0D" />
              {/* Streets */}
              {[50,100,150,200,250,300,350].map(y => (
                <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#1E1E1E" strokeWidth="8" />
              ))}
              {[50,100,150,200,250,300,350].map(x => (
                <line key={x} x1={x} y1="0" x2={x} y2="320" stroke="#1E1E1E" strokeWidth="8" />
              ))}
              {/* Main road */}
              <line x1="0" y1="160" x2="400" y2="160" stroke="#2A2A2A" strokeWidth="14" />
              <line x1="200" y1="0" x2="200" y2="320" stroke="#2A2A2A" strokeWidth="12" />
              {/* Labels */}
              <text x="205" y="155" fontSize="10" fill="#4A4540" fontFamily="Inter">Rope Walk Lane</text>
              <text x="60" y="165" fontSize="10" fill="#4A4540" fontFamily="Inter">Kala Ghoda</text>
              {/* Pin */}
              <circle cx="200" cy="160" r="10" fill="#D4AF37" />
              <circle cx="200" cy="160" r="6" fill="#121212" />
              <circle cx="200" cy="160" r="3" fill="#D4AF37" />
              {/* Pulse */}
              <circle cx="200" cy="160" r="20" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
            </svg>
            <div className="absolute bottom-3 left-3 glass-panel px-3 py-2">
              <p className="text-[#D4AF37] text-xs font-medium">AURELIA Atelier</p>
              <p className="text-[#8A8580] text-[10px]">22 Rope Walk Lane, Kala Ghoda</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          {submitted ? (
            <div className="glass-panel p-10 text-center h-full flex flex-col items-center justify-center gap-6">
              <CheckCircle size={48} className="text-[#D4AF37]" />
              <div>
                <h3 className="font-display text-3xl text-[#F9F6F0] mb-3">Message Received</h3>
                <p className="text-[#8A8580] text-sm leading-relaxed">
                  Thank you, {form.name}. We have received your message and will reply to <span className="text-[#F9F6F0]">{form.email}</span> within one business day.
                </p>
              </div>
              <button onClick={() => { setSubmitted(false); setForm({ name:'', email:'', subject:'', message:'' }); }} className="btn-ghost text-xs">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-panel p-8 flex flex-col gap-5" noValidate aria-label="Contact form">
              <h2 className="font-display text-2xl text-[#F9F6F0] mb-2">Send a Message</h2>
              {field('name', 'Your Name', 'text', 'Ananya Sharma')}
              {field('email', 'Email Address', 'email', 'ananya@example.com')}
              {field('subject', 'Subject (optional)', 'text', 'Bespoke commission enquiry')}
              <div>
                <label htmlFor="contact-message" className="block text-[#8A8580] text-[10px] tracking-widest uppercase mb-1.5">Message</label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us how we can help..."
                  rows={6}
                  className={`w-full bg-[#1A1A1A] border px-4 py-3 text-sm text-[#F9F6F0] outline-none transition-colors resize-none placeholder-[#4A4540] ${errors.message ? 'border-red-500' : 'border-[rgba(212,175,55,0.2)] focus:border-[#D4AF37]'}`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>
              <button type="submit" disabled={loading} className="btn-gold w-full justify-center">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
