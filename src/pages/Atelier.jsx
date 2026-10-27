import { useState } from 'react';
import { CheckCircle, Calendar } from 'lucide-react';
import { useDocTitle, useScrollTop } from '../hooks/useUtils';

const interests = [
  'Engagement Ring',
  'Wedding Band',
  'Necklace / Pendant',
  'Earrings',
  'Bespoke Commission',
  'Repair / Restoration',
  'Redesign Heirloom',
  'Other',
];

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];

export default function Atelier() {
  useScrollTop();
  useDocTitle('Atelier', 'Book an appointment at the AURELIA atelier in Mumbai – bespoke jewellery commissions and consultations.');

  const [form, setForm] = useState({
    name: '', phone: '', email: '', date: '', time: '', interest: '', notes: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.match(/^\+?[0-9]{10,13}$/)) e.phone = 'Valid phone required';
    if (form.email && !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email format required';
    if (!form.date) e.date = 'Please select a date';
    if (!form.time) e.time = 'Please select a time';
    if (!form.interest) e.interest = 'Please select your interest';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
  };

  const field = (key, label, type = 'text', placeholder = '', required = false) => (
    <div>
      <label htmlFor={`atelier-${key}`} className="block text-[#8A8580] text-[10px] tracking-widest uppercase mb-1.5">
        {label}{required && <span className="text-[#D4AF37] ml-1">*</span>}
      </label>
      <input
        id={`atelier-${key}`}
        type={type}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        required={required}
        className={`w-full bg-[#1A1A1A] border px-4 py-3 text-sm text-[#F9F6F0] outline-none transition-colors placeholder-[#4A4540] ${errors[key] ? 'border-red-500' : 'border-[rgba(212,175,55,0.2)] focus:border-[#D4AF37]'}`}
      />
      {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  // Minimum date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="bg-[#121212] min-h-screen">
      {/* Hero */}
      <div className="relative pt-40 pb-20 px-6 text-center overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #100A00 0%, #121212 100%)' }}>
        <div className="absolute inset-0 opacity-15"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.2), transparent 70%)' }} />
        <div className="relative z-10">
          <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">Mumbai · By Appointment</span>
          <h1 className="font-display text-5xl md:text-7xl text-[#F9F6F0] mt-3 mb-6 leading-none">
            The<br /><span className="italic text-[#D4AF37]">Atelier</span>
          </h1>
          <p className="text-[#8A8580] text-base max-w-xl mx-auto leading-relaxed">
            Our private atelier on Kala Ghoda is where ideas become heirlooms. Every visit is personal, unhurried, and begins with tea.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 pb-24 grid md:grid-cols-2 gap-16 items-start">
        {/* Left: info */}
        <div>
          <div className="gold-line mb-6" />
          <h2 className="font-display text-3xl text-[#F9F6F0] mb-6">What to Expect</h2>

          {[
            { icon: '01', title: 'The Welcome', body: 'Arrive at our Kala Ghoda atelier where our creative director will greet you personally. We begin with tea, a tour of our archive pieces, and an open conversation — no agenda, no pressure.' },
            { icon: '02', title: 'The Vision', body: 'Share your inspiration — a photograph, a feeling, a word. Our senior designer will sketch in real time as you talk, capturing the essence of what you have in mind.' },
            { icon: '03', title: 'The Proposal', body: 'Within 5 days, you will receive a detailed design proposal: hand sketches, CAD renders, a gemstone selection, and a comprehensive quote.' },
            { icon: '04', title: 'The Creation', body: 'Once you approve the design, crafting begins. Most pieces take 4–8 weeks. You will receive progress photographs throughout.' },
          ].map(step => (
            <div key={step.icon} className="flex gap-5 mb-8">
              <div className="font-display text-4xl text-[rgba(212,175,55,0.3)] leading-none flex-shrink-0 w-10">{step.icon}</div>
              <div>
                <h3 className="font-display text-xl text-[#F9F6F0] mb-2">{step.title}</h3>
                <p className="text-[#8A8580] text-sm leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}

          <div className="glass-panel p-6 mt-6">
            <p className="text-[#4A4540] text-[10px] tracking-widest uppercase mb-3">Location</p>
            <p className="text-[#F9F6F0] text-sm mb-1">22 Rope Walk Lane, Kala Ghoda</p>
            <p className="text-[#8A8580] text-sm mb-4">Fort, Mumbai 400 001</p>
            <p className="text-[#D4AF37] text-xs tracking-widest uppercase">Mon – Sat · 10:00 AM – 6:00 PM</p>
          </div>
        </div>

        {/* Right: form */}
        <div>
          {submitted ? (
            <div className="glass-panel p-10 text-center">
              <CheckCircle size={48} className="text-[#D4AF37] mx-auto mb-6" />
              <h3 className="font-display text-3xl text-[#F9F6F0] mb-4">Appointment Requested</h3>
              <p className="text-[#8A8580] text-sm leading-relaxed mb-2">
                Thank you, <span className="text-[#F9F6F0]">{form.name}</span>. We will confirm your appointment at {form.time} on {new Date(form.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} within 24 hours.
              </p>
              <p className="text-[#8A8580] text-sm">A confirmation will be sent to {form.phone}.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-panel p-8 flex flex-col gap-5" noValidate aria-label="Atelier booking form">
              <h2 className="font-display text-2xl text-[#F9F6F0] mb-2">Book Your Visit</h2>

              {field('name', 'Full Name', 'text', 'Ananya Sharma', true)}
              {field('phone', 'Phone Number', 'tel', '+91 98765 43210', true)}
              {field('email', 'Email (optional)', 'email', 'ananya@example.com')}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="atelier-date" className="block text-[#8A8580] text-[10px] tracking-widest uppercase mb-1.5">
                    Date <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    id="atelier-date"
                    type="date"
                    min={minDate}
                    value={form.date}
                    onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    className={`w-full bg-[#1A1A1A] border px-4 py-3 text-sm text-[#F9F6F0] outline-none transition-colors ${errors.date ? 'border-red-500' : 'border-[rgba(212,175,55,0.2)] focus:border-[#D4AF37]'}`}
                  />
                  {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                </div>
                <div>
                  <label htmlFor="atelier-time" className="block text-[#8A8580] text-[10px] tracking-widest uppercase mb-1.5">
                    Time <span className="text-[#D4AF37]">*</span>
                  </label>
                  <select
                    id="atelier-time"
                    value={form.time}
                    onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                    className={`w-full bg-[#1A1A1A] border px-4 py-3 text-sm text-[#F9F6F0] outline-none transition-colors ${errors.time ? 'border-red-500' : 'border-[rgba(212,175,55,0.2)] focus:border-[#D4AF37]'}`}
                  >
                    <option value="" className="bg-[#1A1A1A]">Select time</option>
                    {timeSlots.map(t => <option key={t} value={t} className="bg-[#1A1A1A]">{t}</option>)}
                  </select>
                  {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="atelier-interest" className="block text-[#8A8580] text-[10px] tracking-widest uppercase mb-1.5">
                  Interest <span className="text-[#D4AF37]">*</span>
                </label>
                <select
                  id="atelier-interest"
                  value={form.interest}
                  onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
                  className={`w-full bg-[#1A1A1A] border px-4 py-3 text-sm text-[#F9F6F0] outline-none transition-colors ${errors.interest ? 'border-red-500' : 'border-[rgba(212,175,55,0.2)] focus:border-[#D4AF37]'}`}
                >
                  <option value="" className="bg-[#1A1A1A]">Select your interest</option>
                  {interests.map(i => <option key={i} value={i} className="bg-[#1A1A1A]">{i}</option>)}
                </select>
                {errors.interest && <p className="text-red-400 text-xs mt-1">{errors.interest}</p>}
              </div>

              <div>
                <label htmlFor="atelier-notes" className="block text-[#8A8580] text-[10px] tracking-widest uppercase mb-1.5">Notes (optional)</label>
                <textarea
                  id="atelier-notes"
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Tell us about your vision, occasion, or budget..."
                  rows={4}
                  className="w-full bg-[#1A1A1A] border border-[rgba(212,175,55,0.2)] focus:border-[#D4AF37] px-4 py-3 text-sm text-[#F9F6F0] outline-none transition-colors resize-none placeholder-[#4A4540]"
                />
              </div>

              <button type="submit" disabled={loading} className="btn-gold w-full justify-center">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Booking...
                  </span>
                ) : (
                  <><Calendar size={14} /> Request Appointment</>
                )}
              </button>

              <p className="text-[#4A4540] text-xs text-center">Appointments are confirmed within 24 hours. No deposit required.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
