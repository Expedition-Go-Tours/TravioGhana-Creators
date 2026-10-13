import { motion } from 'framer-motion'
import { Search, Star, MapPin, ExternalLink } from 'lucide-react'

const TOURS = [
  { id: '1', title: 'Kakum Canopy Walkway', region: 'Central Region', rating: 4.8, reviews: 42, commission: '15%', image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=600&q=80' },
  { id: '2', title: 'Mole National Park Safari', region: 'Savannah Region', rating: 4.9, reviews: 38, commission: '15%', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80' },
  { id: '3', title: 'Cape Coast & Elmina Castles', region: 'Central Region', rating: 4.7, reviews: 56, commission: '15%', image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&q=80' },
  { id: '4', title: 'Boti Falls & Aburi Gardens', region: 'Eastern Region', rating: 4.6, reviews: 28, commission: '15%', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' },
  { id: '5', title: 'Kumasi Cultural Heritage', region: 'Ashanti Region', rating: 4.8, reviews: 34, commission: '15%', image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=80' },
  { id: '6', title: 'Nzulezo Stilt Village', region: 'Western Region', rating: 4.5, reviews: 22, commission: '15%', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80' },
]

const stagger = { show: { transition: { staggerChildren: 0.06 } } }
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.3, 0.8, 0.4, 1] as const } },
}

export default function DiscoverPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={item} className="page-header">
        <h1>Discover Experiences</h1>
        <p>Browse eligible tours and generate your referral links.</p>
      </motion.div>

      {/* ── Filters ── */}
      <motion.div variants={item} style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-light)' }} />
          <input
            type="search"
            placeholder="Search tours..."
            style={{
              width: '100%',
              padding: '12px 16px 12px 42px',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 15,
              background: '#fff',
              outline: 'none',
            }}
          />
        </div>
        <select style={{ padding: '12px 16px', border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)', background: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          <option>All Categories</option>
          <option>Nature & Wildlife</option>
          <option>Culture & Heritage</option>
          <option>Adventure</option>
        </select>
        <select style={{ padding: '12px 16px', border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)', background: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          <option>All Regions</option>
          <option>Greater Accra</option>
          <option>Central</option>
          <option>Ashanti</option>
          <option>Northern</option>
        </select>
      </motion.div>

      {/* ── Tour grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {TOURS.map((tour) => (
          <motion.div key={tour.id} variants={item} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: 'var(--mint)' }}>
              <img
                src={tour.image}
                alt={tour.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                loading="lazy"
              />
            </div>
            <div style={{ padding: '20px 24px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <MapPin size={14} color="var(--muted-light)" />
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>{tour.region}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 8 }}>
                {tour.title}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                <Star size={14} fill="var(--amber)" color="var(--amber)" />
                <span style={{ fontSize: 14, fontWeight: 700 }}>{tour.rating}</span>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>({tour.reviews} reviews)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="pill pill-success" style={{ fontSize: 12 }}>
                  {tour.commission} commission
                </span>
                <button type="button" className="btn btn-primary btn-sm">
                  Get Link <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 40, color: 'var(--muted)', fontSize: 14 }}>
        Showing 6 of 33 experiences
      </div>
    </motion.div>
  )
}
