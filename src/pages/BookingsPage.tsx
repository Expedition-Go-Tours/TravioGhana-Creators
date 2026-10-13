import { motion } from 'framer-motion'
import { Download, CalendarDays } from 'lucide-react'

const BOOKINGS = [
  { ref: 'REF-2024-0847', tour: 'Kakum Canopy Walkway', date: '12 Oct 2026', guests: 2, amount: 'GHS 450', commission: 'GHS 68', status: 'confirmed' },
  { ref: 'REF-2024-0846', tour: 'Mole National Park Safari', date: '11 Oct 2026', guests: 4, amount: 'GHS 1,200', commission: 'GHS 180', status: 'pending' },
  { ref: 'REF-2024-0845', tour: 'Elmina Castle Tour', date: '10 Oct 2026', guests: 2, amount: 'GHS 350', commission: 'GHS 53', status: 'confirmed' },
  { ref: 'REF-2024-0844', tour: 'Boti Falls & Aburi', date: '09 Oct 2026', guests: 3, amount: 'GHS 280', commission: 'GHS 42', status: 'cancelled' },
  { ref: 'REF-2024-0843', tour: 'Kumasi Cultural Heritage', date: '08 Oct 2026', guests: 2, amount: 'GHS 400', commission: 'GHS 60', status: 'confirmed' },
  { ref: 'REF-2024-0842', tour: 'Nzulezo Stilt Village', date: '07 Oct 2026', guests: 6, amount: 'GHS 720', commission: 'GHS 108', status: 'confirmed' },
]

const stagger = { show: { transition: { staggerChildren: 0.04 } } }
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.3, 0.8, 0.4, 1] as const } },
}

const statusPill = (s: string) => {
  if (s === 'confirmed') return 'pill-success'
  if (s === 'pending') return 'pill-warning'
  return 'pill-error'
}

export default function BookingsPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={item} className="page-header">
        <div className="page-header-row">
          <div>
            <h1>Bookings</h1>
            <p>Bookings attributed to your referral links.</p>
          </div>
          <button type="button" className="btn btn-secondary btn-sm">
            <Download size={15} /> Export CSV
          </button>
        </div>
      </motion.div>

      {/* ── Filters ── */}
      <motion.div variants={item} style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {['All', 'Confirmed', 'Pending', 'Cancelled'].map((f, i) => (
          <button
            key={f}
            type="button"
            className="btn btn-sm"
            style={{
              background: i === 0 ? 'var(--mint-light)' : 'transparent',
              color: i === 0 ? 'var(--green-cta-bg)' : 'var(--muted)',
              border: '1px solid ' + (i === 0 ? 'var(--green-cta)' : 'var(--line)'),
              borderRadius: 'var(--radius-pill)',
              fontWeight: 700,
            }}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* ── Booking list ── */}
      <motion.div variants={item} className="card card-flat" style={{ padding: 0, overflow: 'hidden' }}>
        {BOOKINGS.map((b, i) => (
          <div
            key={b.ref}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '20px 28px',
              borderBottom: i < BOOKINGS.length - 1 ? '1px solid var(--line)' : 'none',
              transition: 'background 0.15s',
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--mint)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <CalendarDays size={18} color="var(--green-cta)" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--muted)' }}>{b.ref}</span>
                <span className={`pill ${statusPill(b.status)}`} style={{ textTransform: 'capitalize' }}>{b.status}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, marginTop: 4 }}>{b.tour}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{b.date} · {b.guests} guests</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>{b.amount}</div>
              <div style={{ fontSize: 13, color: b.status === 'cancelled' ? 'var(--error)' : 'var(--green-cta)', fontWeight: 700, marginTop: 2 }}>
                {b.status === 'cancelled' ? 'Reversed' : `15% = ${b.commission}`}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div style={{ textAlign: 'center', marginTop: 24, color: 'var(--muted)', fontSize: 14 }}>
        Showing 6 of 52 bookings
      </div>
    </motion.div>
  )
}
