import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Download,
  CalendarDays,
  Users,
  Wallet,
  TrendingUp,
  ChevronDown,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
} from 'lucide-react'

const BOOKINGS = [
  { ref: 'REF-2024-0847', tour: 'Kakum Canopy Walkway', region: 'Central Region', image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=200&q=80', date: '12 Oct 2026', guests: 2, amount: 450, commission: 68, status: 'confirmed', paid: true, rating: 4.8, source: 'Instagram Reel' },
  { ref: 'REF-2024-0846', tour: 'Mole National Park Safari', region: 'Savannah Region', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=200&q=80', date: '11 Oct 2026', guests: 4, amount: 1200, commission: 180, status: 'pending', paid: false, rating: 4.9, source: 'Instagram Story' },
  { ref: 'REF-2024-0845', tour: 'Elmina Castle Tour', region: 'Central Region', image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=200&q=80', date: '10 Oct 2026', guests: 2, amount: 350, commission: 53, status: 'confirmed', paid: true, rating: 4.7, source: 'TikTok' },
  { ref: 'REF-2024-0844', tour: 'Boti Falls & Aburi', region: 'Eastern Region', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80', date: '09 Oct 2026', guests: 3, amount: 280, commission: 0, status: 'cancelled', paid: false, rating: 4.6, source: 'Instagram Reel' },
  { ref: 'REF-2024-0843', tour: 'Kumasi Cultural Heritage', region: 'Ashanti Region', image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=200&q=80', date: '08 Oct 2026', guests: 2, amount: 400, commission: 60, status: 'confirmed', paid: true, rating: 4.8, source: 'Blog Post' },
  { ref: 'REF-2024-0842', tour: 'Nzulezo Stilt Village', region: 'Western Region', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80', date: '07 Oct 2026', guests: 6, amount: 720, commission: 108, status: 'confirmed', paid: true, rating: 4.5, source: 'Instagram Reel' },
  { ref: 'REF-2024-0841', tour: 'Cape Coast & Elmina Castles', region: 'Central Region', image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=200&q=80', date: '06 Oct 2026', guests: 2, amount: 500, commission: 75, status: 'confirmed', paid: true, rating: 4.7, source: 'Instagram Story' },
  { ref: 'REF-2024-0840', tour: 'Lake Bosomtwe Adventure', region: 'Ashanti Region', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=200&q=80', date: '05 Oct 2026', guests: 4, amount: 680, commission: 102, status: 'pending', paid: false, rating: 4.6, source: 'TikTok' },
]

const STATUS_FILTERS = ['All', 'Confirmed', 'Pending', 'Cancelled']

const stagger = { show: { transition: { staggerChildren: 0.06 } } }
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.3, 0.8, 0.4, 1] as const } },
}

function StatusChip({ status }: { status: string }) {
  const config: Record<string, { bg: string; color: string; icon: typeof CheckCircle2; label: string }> = {
    confirmed: { bg: 'var(--green-bg)', color: 'var(--green-dark)', icon: CheckCircle2, label: 'Confirmed' },
    pending: { bg: 'var(--amber-bg)', color: 'var(--amber)', icon: Clock, label: 'Pending' },
    cancelled: { bg: 'var(--red-bg)', color: 'var(--red)', icon: XCircle, label: 'Cancelled' },
  }
  const c = config[status] || config.pending
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 10px',
      borderRadius: 'var(--r-pill)',
      background: c.bg,
      color: c.color,
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      fontWeight: 800,
    }}>
      <c.icon size={12} /> {c.label}
    </span>
  )
}

function BookingRow({ booking, expanded, onToggle }: {
  booking: typeof BOOKINGS[0]
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      variants={item}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-xl)',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s',
      }}
    >
      {/* Main row */}
      <div
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '16px 20px',
          cursor: 'pointer',
        }}
      >
        {/* Tour thumbnail */}
        <div style={{ width: 56, height: 56, borderRadius: 'var(--r-md)', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-soft)' }}>
          <img src={booking.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        </div>

        {/* Tour info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {booking.tour}
            </span>
            <StatusChip status={booking.status} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4, fontSize: 11, color: 'var(--text-tertiary)' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace' }}>{booking.ref}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={10} /> {booking.region}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Users size={10} /> {booking.guests} guests</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><CalendarDays size={10} /> {booking.date}</span>
          </div>
        </div>

        {/* Source badge */}
        <div style={{
          padding: '3px 10px',
          borderRadius: 'var(--r-pill)',
          background: 'var(--bg-paper)',
          fontSize: 10,
          fontWeight: 700,
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-display)',
          whiteSpace: 'nowrap',
        }}>
          {booking.source}
        </div>

        {/* Amount + Commission */}
        <div style={{ textAlign: 'right', minWidth: 100 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, letterSpacing: '-.02em' }}>
            GHS {booking.amount.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: booking.commission > 0 ? 'var(--green)' : 'var(--text-tertiary)', fontWeight: 700, marginTop: 2 }}>
            {booking.commission > 0 ? `+GHS ${booking.commission} comm.` : 'Reversed'}
          </div>
        </div>

        {/* Expand icon */}
        <ChevronDown
          size={18}
          color="var(--text-tertiary)"
          style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
        />
      </div>

      {/* Expanded detail */}
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          style={{ borderTop: '1px solid var(--border-soft)', background: 'var(--bg-hover)' }}
        >
          <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
            {/* Booking timeline */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 12 }}>
                Booking Timeline
              </div>
              {[
                { label: 'Referral click', time: booking.date, done: true },
                { label: 'Booking created', time: booking.date, done: true },
                { label: 'Payment confirmed', time: booking.status !== 'pending' ? booking.date : '—', done: booking.status !== 'pending' },
                { label: 'Commission earned', time: booking.commission > 0 ? booking.date : '—', done: booking.commission > 0 },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: step.done ? 'var(--green)' : 'var(--bg-paper)',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}>
                    {step.done ? <CheckCircle2 size={12} color="#fff" /> : <Clock size={10} color="var(--text-tertiary)" />}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: step.done ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{step.label}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{step.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Commission breakdown */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 12 }}>
                Commission Breakdown
              </div>
              {[
                { label: 'Booking value', value: `GHS ${booking.amount.toLocaleString()}` },
                { label: 'Commission rate', value: '15%' },
                { label: 'Your commission', value: `GHS ${booking.commission}` },
                { label: 'Status', value: booking.paid ? 'Paid' : booking.status === 'cancelled' ? 'Reversed' : 'Pending' },
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-soft)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{row.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-display)' }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Guest info (anonymized) */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 12 }}>
                Booking Details
              </div>
              {[
                { label: 'Guest count', value: `${booking.guests} guests` },
                { label: 'Tour rating', value: `★ ${booking.rating}` },
                { label: 'Attribution source', value: booking.source },
                { label: 'Booking reference', value: booking.ref },
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-soft)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{row.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-display)' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function BookingsPage() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [expandedRef, setExpandedRef] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let result = [...BOOKINGS]
    if (statusFilter !== 'All') result = result.filter((b) => b.status === statusFilter.toLowerCase())
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((b) => b.tour.toLowerCase().includes(q) || b.ref.toLowerCase().includes(q))
    }
    return result
  }, [statusFilter, search])

  const totalRevenue = BOOKINGS.filter((b) => b.status !== 'cancelled').reduce((s, b) => s + b.amount, 0)
  const totalCommission = BOOKINGS.reduce((s, b) => s + b.commission, 0)

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* ── Header ── */}
      <motion.div variants={item} className="page-header">
        <div>
          <h1>Bookings</h1>
          <p>Track bookings attributed to your referral links.</p>
        </div>
        <button type="button" className="btn btn-primary">
          <Download size={16} /> Export CSV
        </button>
      </motion.div>

      {/* ── Stat cards ── */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { icon: CalendarDays, value: '52', label: 'Total Bookings', delta: '+15%', up: true },
          { icon: Wallet, value: `GHS ${totalRevenue.toLocaleString()}`, label: 'Attributed Revenue', delta: '+22%', up: true },
          { icon: TrendingUp, value: `GHS ${totalCommission.toLocaleString()}`, label: 'Commission Earned', delta: '+18%', up: true },
          { icon: Users, value: '2.8', label: 'Avg Guests / Booking', delta: '+0.3', up: true },
        ].map((s) => (
          <motion.div key={s.label} variants={item} className="stat-card stat-card--dark">
            <div className="stat-card-icon"><s.icon size={18} /></div>
            <div>
              <div className="stat-card-value">{s.value}</div>
              <div className="stat-card-label">{s.label}</div>
            </div>
            <div className="stat-card-delta">
              <TrendingUp size={11} /> {s.delta}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Filters ── */}
      <motion.div variants={item} className="card" style={{ padding: '14px 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: 300 }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input
              type="search"
              className="input"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 36, height: 38, fontSize: 13 }}
            />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setStatusFilter(f)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--r-pill)',
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  background: statusFilter === f ? 'var(--green)' : 'var(--bg-paper)',
                  color: statusFilter === f ? '#fff' : 'var(--text-secondary)',
                  border: '1px solid ' + (statusFilter === f ? 'var(--green)' : 'var(--border)'),
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>
            {filtered.length} bookings
          </span>
        </div>
      </motion.div>

      {/* ── Booking rows ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((booking) => (
          <BookingRow
            key={booking.ref}
            booking={booking}
            expanded={expandedRef === booking.ref}
            onToggle={() => setExpandedRef(expandedRef === booking.ref ? null : booking.ref)}
          />
        ))}
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <motion.div variants={item} className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <CalendarDays size={40} color="var(--text-tertiary)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No bookings found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your filters or share more referral links.</p>
        </motion.div>
      )}
    </motion.div>
  )
}
