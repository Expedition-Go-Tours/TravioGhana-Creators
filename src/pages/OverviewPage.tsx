import { motion } from 'framer-motion'
import {
  MousePointerClick,
  CalendarDays,
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Link2,
  Compass,
  FileText,
  Star,
  Flame,
  ArrowUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const earningsData = [
  { month: 'May', earned: 2100, clicks: 1250 },
  { month: 'Jun', earned: 3200, clicks: 1800 },
  { month: 'Jul', earned: 2800, clicks: 1600 },
  { month: 'Aug', earned: 3600, clicks: 2100 },
  { month: 'Sep', earned: 3100, clicks: 1900 },
  { month: 'Oct', earned: 4200, clicks: 2400 },
]

const topTours = [
  {
    id: 'kakum',
    title: 'Kakum Canopy Walkway',
    region: 'Central Region',
    image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=600&q=80',
    clicks: 312,
    bookings: 18,
    earned: 'GHS 2,340',
    commission: '15%',
    rating: 4.8,
    trending: true,
    mostBooked: true,
  },
  {
    id: 'mole',
    title: 'Mole National Park Safari',
    region: 'Savannah Region',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80',
    clicks: 248,
    bookings: 12,
    earned: 'GHS 1,800',
    commission: '15%',
    rating: 4.9,
    trending: true,
    mostBooked: false,
  },
  {
    id: 'cape-coast',
    title: 'Cape Coast & Elmina Castles',
    region: 'Central Region',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&q=80',
    clicks: 198,
    bookings: 9,
    earned: 'GHS 1,170',
    commission: '15%',
    rating: 4.7,
    trending: false,
    mostBooked: false,
  },
  {
    id: 'boti',
    title: 'Boti Falls & Aburi Gardens',
    region: 'Eastern Region',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    clicks: 142,
    bookings: 6,
    earned: 'GHS 840',
    commission: '15%',
    rating: 4.6,
    trending: false,
    mostBooked: false,
  },
]

const recentBookings = [
  { tour: 'Kakum Canopy Walkway', ref: 'REF-0847', time: '2 hrs ago', amount: 'GHS 450', status: 'confirmed', image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=100&q=80' },
  { tour: 'Mole National Park', ref: 'REF-0846', time: '5 hrs ago', amount: 'GHS 1,200', status: 'pending', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=100&q=80' },
  { tour: 'Elmina Castle Tour', ref: 'REF-0845', time: '1 day ago', amount: 'GHS 350', status: 'confirmed', image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=100&q=80' },
  { tour: 'Boti Falls & Aburi', ref: 'REF-0844', time: '2 days ago', amount: 'GHS 280', status: 'cancelled', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&q=80' },
]

const activity = [
  { icon: CalendarDays, color: 'var(--green)', text: 'Booking <strong>REF-0847</strong> confirmed — <strong>GHS 68</strong> commission earned', time: '2 hours ago' },
  { icon: TrendingUp, color: 'var(--blue)', text: 'Link <strong>Kakum Canopy Walkway</strong> hit <strong>300+ clicks</strong>', time: '5 hours ago' },
  { icon: Star, color: 'var(--orange)', text: 'You reached <strong>Gold Tier</strong> creator status!', time: '2 days ago' },
  { icon: Wallet, color: 'var(--green)', text: 'Payout of <strong>GHS 2,400</strong> processed successfully', time: '3 days ago' },
]

const stagger = { show: { transition: { staggerChildren: 0.08 } } }
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.3, 0.8, 0.4, 1] as const } },
}

function StatCard({ icon: Icon, value, label, delta, up, variant }: {
  icon: typeof MousePointerClick
  value: string
  label: string
  delta: string
  up: boolean
  variant: 'green' | 'dark' | 'mint' | 'orange'
}) {
  return (
    <motion.div variants={item} className={`stat-card stat-card--${variant}`}>
      <div className="stat-card-icon">
        <Icon size={18} />
      </div>
      <div>
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label">{label}</div>
      </div>
      <div className="stat-card-delta">
        {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
        {delta}
      </div>
    </motion.div>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: '10px 14px', boxShadow: 'var(--shadow-lg)' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          {p.name}: <strong style={{ color: 'var(--text-primary)' }}>{p.dataKey === 'earned' ? `GHS ${p.value}` : p.value.toLocaleString()}</strong>
        </div>
      ))}
    </div>
  )
}

export default function OverviewPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* ── Hero banner with tour imagery ── */}
      <motion.div variants={item} className="hero-banner">
        <div className="hero-banner-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=1400&q=80)' }} />
        <div className="hero-banner-overlay" />
        <div className="hero-banner-content">
          <div>
            <h1>Good morning, Ama 👋</h1>
            <p>Your content is driving real bookings. Here's what's happening across your referral links.</p>
          </div>
          <div className="hero-banner-tour">
            <img className="hero-banner-tour-img" src="https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=200&q=80" alt="Kakum Canopy Walkway" />
            <div className="hero-banner-tour-info">
              <div className="hero-banner-tour-label">🔥 Your top tour this month</div>
              <div className="hero-banner-tour-name">Kakum Canopy Walkway</div>
              <div className="hero-banner-tour-stat">312 clicks · 18 bookings · GHS 2,340 earned</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Stat cards ── */}
      <div className="stat-grid">
        <StatCard icon={MousePointerClick} value="12,480" label="Total Clicks" delta="+12%" up variant="green" />
        <StatCard icon={CalendarDays} value="52" label="Bookings" delta="+15%" up variant="dark" />
        <StatCard icon={Wallet} value="GHS 4,200" label="Earned" delta="+22%" up variant="mint" />
        <StatCard icon={Star} value="4.8" label="Avg Rating" delta="+0.2" up variant="orange" />
      </div>

      {/* ── Top Tours Leaderboard ── */}
      <motion.div variants={item} style={{ marginBottom: 24 }}>
        <div className="section-header">
          <div>
            <div className="section-title">Top Performing Tours</div>
            <div className="section-sub">Ranked by bookings generated</div>
          </div>
          <Link to="/creator/discover" className="btn btn-ghost btn-sm">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {topTours.map((tour, i) => (
            <div
              key={tour.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 20px',
                borderBottom: i < topTours.length - 1 ? '1px solid var(--border-soft)' : 'none',
                transition: 'background 0.15s',
              }}
            >
              {/* Rank */}
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: i === 0 ? 'var(--green)' : i === 1 ? 'var(--green-bg)' : 'var(--bg-paper)',
                color: i === 0 ? '#fff' : i === 1 ? 'var(--green)' : 'var(--text-tertiary)',
                display: 'grid',
                placeItems: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 12,
                flexShrink: 0,
              }}>
                {i + 1}
              </div>

              {/* Thumbnail */}
              <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-soft)' }}>
                <img src={tour.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>

              {/* Tour info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {tour.title}
                  </span>
                  {tour.mostBooked && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '1px 7px', borderRadius: 'var(--r-pill)', background: 'var(--green-bg)', color: 'var(--green-dark)', fontSize: 9, fontWeight: 800, fontFamily: 'var(--font-display)', flexShrink: 0 }}>
                      <Flame size={9} /> Most Booked
                    </span>
                  )}
                  {tour.trending && !tour.mostBooked && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '1px 7px', borderRadius: 'var(--r-pill)', background: 'var(--orange-bg)', color: 'var(--orange)', fontSize: 9, fontWeight: 800, fontFamily: 'var(--font-display)', flexShrink: 0 }}>
                      <ArrowUp size={9} /> Trending
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 3, fontSize: 11, color: 'var(--text-tertiary)' }}>
                  <span>{tour.region}</span>
                  <span>·</span>
                  <span>★ {tour.rating}</span>
                  <span>·</span>
                  <span>{tour.clicks} clicks</span>
                  <span>·</span>
                  <span>{tour.bookings} bookings</span>
                </div>
                {/* Performance bar */}
                <div style={{ marginTop: 6, height: 4, background: 'var(--bg-paper)', borderRadius: 2, overflow: 'hidden', maxWidth: 280 }}>
                  <div style={{
                    height: '100%',
                    borderRadius: 2,
                    background: i === 0 ? 'var(--green)' : 'var(--green-bg)',
                    width: `${(tour.bookings / topTours[0].bookings) * 100}%`,
                    transition: 'width 0.6s var(--ease)',
                  }} />
                </div>
              </div>

              {/* Earned */}
              <div style={{ textAlign: 'right', minWidth: 80, flexShrink: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: 'var(--green)', letterSpacing: '-.02em' }}>
                  {tour.earned}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 600 }}>
                  {tour.commission} comm.
                </div>
              </div>

              {/* Action */}
              <button type="button" className="btn btn-primary btn-sm" style={{ flexShrink: 0, padding: '6px 12px' }}>
                <Link2 size={13} /> Get Link
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Charts + Activity ── */}
      <div className="grid-2">
        <motion.div variants={item} className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Earnings Trend</div>
              <div className="section-sub">Monthly commission earned</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="earnedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#087747" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#087747" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(21,32,29,.06)" />
              <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="earned" stroke="#087747" strokeWidth={2} fill="url(#earnedGrad)" name="Earned" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Recent Activity</div>
              <div className="section-sub">Latest events</div>
            </div>
          </div>
          <div>
            {activity.map((a, i) => (
              <div key={i} className="activity-item">
                <a.icon size={16} color={a.color} style={{ marginTop: 2, flexShrink: 0 }} />
                <div className="activity-content">
                  <div className="activity-text" dangerouslySetInnerHTML={{ __html: a.text }} />
                  <div className="activity-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Recent Bookings + Quick Actions ── */}
      <div className="grid-2-equal">
        <motion.div variants={item} className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="section-header" style={{ padding: '20px 24px 0' }}>
            <div>
              <div className="section-title">Recent Bookings</div>
              <div className="section-sub">Latest attributed bookings</div>
            </div>
            <Link to="/creator/bookings" className="btn btn-ghost btn-sm">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ padding: '0 24px 16px' }}>
            {recentBookings.map((b) => (
              <div key={b.ref} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--border-soft)' }}>
                <img src={b.image} alt="" style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.tour}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{b.ref} · {b.time}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14 }}>{b.amount}</div>
                  <span className={`pill pill-${b.status === 'confirmed' ? 'success' : b.status === 'pending' ? 'warning' : 'error'}`} style={{ marginTop: 4 }}>
                    {b.status === 'confirmed' ? 'Confirmed' : b.status === 'pending' ? 'Pending' : 'Cancelled'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Quick Actions</div>
              <div className="section-sub">Jump to common tasks</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { icon: Link2, title: 'Generate Link', desc: 'Create a new referral link', to: '/creator/links', primary: true, color: 'var(--green)', bg: 'var(--green-bg)' },
              { icon: Compass, title: 'Browse Tours', desc: 'Find new experiences', to: '/creator/discover', primary: false, color: 'var(--blue)', bg: 'var(--blue-bg)' },
              { icon: FileText, title: 'View Reports', desc: 'Analytics & insights', to: '/creator/reports', primary: false, color: 'var(--orange)', bg: 'var(--orange-bg)' },
              { icon: Wallet, title: 'Request Payout', desc: 'Withdraw your earnings', to: '/creator/payouts', primary: false, color: 'var(--green)', bg: 'var(--green-bg)' },
            ].map((action) => (
              <motion.div
                key={action.title}
                whileHover={{ y: -2, boxShadow: 'var(--shadow-md)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={action.to}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    padding: '16px',
                    borderRadius: 'var(--r-lg)',
                    border: '1px solid ' + (action.primary ? 'var(--green)' : 'var(--border)'),
                    background: action.primary ? 'var(--green-bg)' : 'var(--bg-surface)',
                    height: '100%',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: action.bg,
                    display: 'grid',
                    placeItems: 'center',
                  }}>
                    <action.icon size={18} color={action.color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>
                      {action.title}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
                      {action.desc}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
