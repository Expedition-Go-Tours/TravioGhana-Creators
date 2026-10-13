import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  MousePointerClick,
  Users,
  CalendarDays,
  Wallet,
  ArrowRight,
  Link2,
  Compass,
  FileText,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const METRICS = [
  { label: 'Total Clicks', value: '12,480', delta: '+12%', up: true, icon: MousePointerClick },
  { label: 'Visitors', value: '847', delta: '+8%', up: true, icon: Users },
  { label: 'Attributed Bookings', value: '52', delta: '+15%', up: true, icon: CalendarDays },
  { label: 'Total Earned', value: 'GHS 4,200', delta: '+22%', up: true, icon: Wallet },
]

const TOP_LINKS = [
  { name: 'Kakum Canopy Walkway', clicks: 312, bookings: 18, earned: 'GHS 2,340' },
  { name: 'Mole National Park Safari', clicks: 248, bookings: 12, earned: 'GHS 1,800' },
  { name: 'Cape Coast Castles', clicks: 198, bookings: 9, earned: 'GHS 1,170' },
]

const RECENT_BOOKINGS = [
  { tour: 'Kakum Canopy Walkway', ref: 'REF-0847', time: '2 hrs ago', amount: 'GHS 450', status: 'confirmed' },
  { tour: 'Mole National Park', ref: 'REF-0846', time: '5 hrs ago', amount: 'GHS 1,200', status: 'pending' },
  { tour: 'Elmina Castle Tour', ref: 'REF-0845', time: '1 day ago', amount: 'GHS 350', status: 'confirmed' },
  { tour: 'Boti Falls & Aburi', ref: 'REF-0844', time: '2 days ago', amount: 'GHS 280', status: 'confirmed' },
]

const stagger = {
  show: { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.3, 0.8, 0.4, 1] as const } },
}

export default function OverviewPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* ── Header ── */}
      <motion.div variants={item} className="page-header">
        <div className="page-header-row">
          <div>
            <h1>Good morning, Ama 👋</h1>
            <p>Your creator programme is performing well. Here's your snapshot.</p>
          </div>
          <button type="button" className="btn btn-secondary btn-sm">
            This month
          </button>
        </div>
      </motion.div>

      {/* ── Metric cards ── */}
      <div className="metric-grid">
        {METRICS.map((m) => (
          <motion.div key={m.label} variants={item} className="metric-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <m.icon size={20} color="var(--muted-light)" />
              <span className={`metric-delta ${m.up ? 'positive' : 'negative'}`}>
                {m.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {m.delta}
              </span>
            </div>
            <div className="metric-value">{m.value}</div>
            <div className="metric-label">{m.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ── Charts row ── */}
      <div className="grid-2">
        <motion.div variants={item} className="card card-flat">
          <h2 className="section-title">Earnings Trend</h2>
          <div style={{ height: 240, display: 'flex', alignItems: 'flex-end', gap: 8, padding: '0 4px' }}>
            {[35, 48, 42, 65, 58, 72, 68, 85, 78, 92, 88, 95].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.3, 0.8, 0.4, 1] }}
                style={{
                  flex: 1,
                  background: i === 11 ? 'var(--green-cta)' : 'var(--mint)',
                  borderRadius: '6px 6px 0 0',
                  minHeight: 8,
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12, color: 'var(--muted-light)' }}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="card card-flat">
          <h2 className="section-title">Top Performing Links</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {TOP_LINKS.map((link, i) => (
              <div
                key={link.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px 0',
                  borderBottom: i < TOP_LINKS.length - 1 ? '1px solid var(--line)' : 'none',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: i === 0 ? 'var(--green-cta)' : 'var(--mint)',
                    color: i === 0 ? '#fff' : 'var(--green-cta)',
                    display: 'grid',
                    placeItems: 'center',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 13,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {link.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                    {link.clicks} clicks · {link.bookings} bookings
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: 'var(--green-cta)', whiteSpace: 'nowrap' }}>
                  {link.earned}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Recent bookings + conversion ── */}
      <div className="grid-2">
        <motion.div variants={item} className="card card-flat">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Recent Bookings</h2>
            <Link to="/creator/bookings" className="btn btn-ghost btn-sm">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div>
            {RECENT_BOOKINGS.map((b, i) => (
              <div
                key={b.ref}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 0',
                  borderBottom: i < RECENT_BOOKINGS.length - 1 ? '1px solid var(--line)' : 'none',
                  transition: 'transform 0.2s',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: 'var(--mint)',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CalendarDays size={16} color="var(--green-cta)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{b.tour}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                    {b.ref} · {b.time}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14 }}>{b.amount}</div>
                  <span className={`pill pill-${b.status === 'confirmed' ? 'success' : 'warning'}`} style={{ marginTop: 4 }}>
                    {b.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="card card-flat" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 className="section-title" style={{ alignSelf: 'flex-start' }}>Conversion Rate</h2>
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: '50%',
              border: '12px solid var(--mint)',
              borderTopColor: 'var(--green-cta)',
              borderRightColor: 'var(--green-cta)',
              display: 'grid',
              placeItems: 'center',
              margin: '24px 0',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--green-cta)' }}>
                6.2%
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700 }}>vs last month</div>
            </div>
          </div>
          <div className="metric-delta positive" style={{ marginTop: 0 }}>
            <TrendingUp size={12} /> +1.1% from last month
          </div>
        </motion.div>
      </div>

      {/* ── Quick actions ── */}
      <motion.div variants={item} className="card card-flat" style={{ background: 'var(--mint-bg)' }}>
        <h2 className="section-title">Quick Actions</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/creator/links" className="btn btn-primary">
            <Link2 size={18} /> Generate Link
          </Link>
          <Link to="/creator/discover" className="btn btn-secondary">
            <Compass size={18} /> Browse Tours
          </Link>
          <Link to="/creator/earnings" className="btn btn-secondary">
            <FileText size={18} /> View Statements
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}
