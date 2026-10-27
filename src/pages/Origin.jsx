import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Globe, Award, Recycle } from 'lucide-react';
import { useDocTitle, useScrollTop } from '../hooks/useUtils';

const origins = [
  {
    material: 'Gold',
    icon: '✦',
    colour: '#D4AF37',
    sources: ['Fairmined Cooperative, Antioquia, Colombia', 'Certified Recycled Refineries, Switzerland', 'Artisan Guild, Tanzania'],
    process: 'All our gold — whether new or recycled — carries Fairmined or Fairtrade certification. We publish our refinery partners annually and conduct unannounced audits.',
    stat: '100% traceable',
  },
  {
    material: 'Diamonds',
    icon: '◇',
    colour: '#A8D8F0',
    sources: ['Botswana (De Beers Debswana)', 'Canada (Arctic Canadian Diamond Co.)', 'Laboratory-grown option available'],
    process: 'Every diamond is Kimberley Process certified. We work with grading houses in Antwerp and Mumbai. Upon request, we offer laboratory-grown diamonds with full origin documentation.',
    stat: 'Kimberley certified',
  },
  {
    material: 'Sapphires',
    icon: '◈',
    colour: '#5080C0',
    sources: ['Kashmir Valley, India', 'Ratnapura, Sri Lanka (Ceylon)', 'Ilakaka, Madagascar'],
    process: 'Our sapphires are sourced through small family partnerships, never from large extraction operations. Each stone carries a geographic origin certificate from a certified gemological laboratory.',
    stat: 'Origin certified',
  },
  {
    material: 'Pearls',
    icon: '○',
    colour: '#F0EAE0',
    sources: ['Ise-Shima, Japan (Akoya)', 'Tahiti, French Polynesia (Tahitian)', 'Broome, Australia (South Sea)'],
    process: 'We source exclusively from sustainable aquaculture. Our pearl farmers practise responsible oyster cultivation with no impact on wild pearl mollusc populations.',
    stat: 'Sustainable aquaculture',
  },
];

const commitments = [
  { icon: Leaf, title: 'Net Zero by 2030', body: 'We have committed to becoming fully carbon-neutral by 2030, starting with our supply chain and logistics.' },
  { icon: Recycle, title: '100% Recycled Packaging', body: 'Our jewellery boxes, tissue paper, and mail packaging are made entirely from recycled and FSC-certified materials.' },
  { icon: Globe, title: 'Community Investment', body: '5% of our annual profits are reinvested into the mining communities that supply our gold. This funds schools, health clinics, and skills training.' },
  { icon: Award, title: 'RJC Certified', body: 'Aurelia is a member of the Responsible Jewellery Council, meeting the highest international standards for ethics, human rights, social and environmental practices.' },
];

export default function Origin() {
  useScrollTop();
  useDocTitle('Origin', 'Learn where AURELIA sources its gold, diamonds and gemstones – and our sustainability commitments.');

  return (
    <div className="bg-[#121212] min-h-screen">
      {/* Hero */}
      <div className="relative pt-40 pb-24 px-6 text-center overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #050A08 0%, #121212 100%)' }}>
        <div className="absolute inset-0 opacity-15"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(60,150,80,0.3), transparent 70%)' }} />
        <div className="relative z-10">
          <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">Where Our Materials Come From</span>
          <h1 className="font-display text-5xl md:text-7xl text-[#F9F6F0] mt-3 mb-6 leading-none">
            Origin &amp;<br /><span className="italic text-[#D4AF37]">Provenance</span>
          </h1>
          <p className="text-[#8A8580] text-base max-w-xl mx-auto leading-relaxed">
            We believe you deserve to know the full story of your jewellery — from the earth it came from to the hands that shaped it.
          </p>
        </div>
      </div>

      {/* Material origins */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20">
        <div className="gold-line mb-4" />
        <h2 className="font-display text-3xl text-[#F9F6F0] mb-16">Our Materials</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {origins.map(origin => (
            <div key={origin.material} className="glass-panel p-8 hover:border-[rgba(212,175,55,0.35)] transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-3xl" style={{ color: origin.colour }}>{origin.icon}</span>
                  <h3 className="font-display text-2xl text-[#F9F6F0] mt-2">{origin.material}</h3>
                </div>
                <span className="text-xs tracking-widest uppercase border px-2 py-1" style={{ color: origin.colour, borderColor: `${origin.colour}40` }}>
                  {origin.stat}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-[#4A4540] text-[10px] tracking-widest uppercase mb-2">Source Regions</p>
                <ul className="space-y-1">
                  {origin.sources.map(src => (
                    <li key={src} className="text-[#8A8580] text-sm flex items-start gap-2">
                      <span style={{ color: origin.colour }}>—</span> {src}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[#8A8580] text-sm leading-relaxed">{origin.process}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainability commitments */}
      <div className="bg-[#0D0D0D] py-20 px-6 md:px-12 border-t border-[rgba(212,175,55,0.08)]">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <div className="gold-line mx-auto" />
            <h2 className="font-display text-4xl text-[#F9F6F0] mb-4">Our Sustainability Commitments</h2>
            <p className="text-[#8A8580] text-base max-w-md mx-auto">Beyond certification. These are the active promises we are held accountable to — by our customers, our partners, and ourselves.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map(c => (
              <div key={c.title} className="text-center p-8 border border-[rgba(212,175,55,0.08)] hover:border-[rgba(212,175,55,0.2)] transition-colors">
                <c.icon size={28} className="text-[#D4AF37] mx-auto mb-4" />
                <h3 className="font-display text-xl text-[#F9F6F0] mb-3">{c.title}</h3>
                <p className="text-[#8A8580] text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-6 text-center">
        <Link to="/craft" className="btn-ghost">
          See How We Craft Each Piece <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
