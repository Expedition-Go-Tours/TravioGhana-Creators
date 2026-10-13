import { motion } from 'framer-motion'
import {
  MousePointerClick,
  Users,
  CalendarDays,
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowRight,
  Link2,
  Compass,
  FileText,
  Star,
  CheckCircle2,
  AlertCircle,
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
  { month: 'Jan', earned: 1200, clicks: 820 },
  { month: 'Feb', earned: 1800, clicks: 1100 },
  { month: 'Mar', earned: 1500, clicks: 950 },
  { month: 'Apr', earned: 2400, clicks: 1400 },
  { month: 'May', earned: 2100, clicks: 1250 },
  { month: 'Jun', earned: 3200, clicks: 1800 },
  { month: 'Jul', earned: 2800, clicks: 1600 },
  { month: 'Aug', earned: 3600, clicks: 2100 },
  { month: 'Sep', earned: 3100, clicks: 1900 },
  { month: 'Oct', earned: 4200, clicks: 2400 },
  { month: 'Nov', earned: 3800, clicks: 2200 },
  { month: 'Dec', earned: 4500, clicks: 2600 },
]

const topLinks = [
  { name: 'Kakum Canopy Walkway', clicks: 312, bookings: 18, earned: 'GHS 2,340', pct: 92 },
  { name: 'Mole National Park Safari', clicks: 248, bookings: 12, earned: 'GHS 1,800', pct: 74 },
  { name: 'Cape Coast & Elmina', clicks: 198, bookings: 9, earned: 'GHS 1,170', pct: 58 },
  { name: 'Boti Falls & Aburi', clicks: 142, bookings: 6, earned: 'GHS 840', pct: 42 },
]

const recentBookings = [
  { tour: 'Kakum Canopy Walkway', ref: 'REF-0847', time: '2 hrs ago', amount: 'GHS 450', status: 'confirmed' },
  { tour: 'Mole National Park', ref: 'REF-0846', time: '5 hrs ago', amount: 'GHS 1,200', status: 'pending' },
  { tour: 'Elmina Castle Tour', ref: 'REF-0845', time: '1 day ago', amount: 'GHS 350', status: 'confirmed' },
  { tour: 'Boti Falls & Aburi', ref: 'REF-0844', time: '2 days ago', amount: 'GHS 280', status: 'cancelled' },
]

const activity = [
  { icon: CheckCircle2, color: 'var(--green)', text: 'Booking <strong>REF-0847</strong> confirmed — <strong>GHS 68</strong> commission earned', time: '2 hours ago' },
  { icon: TrendingUp, color: 'var(--blue)', text: 'Link <strong>Kakum Canopy Walkway</strong> hit <strong>300+ clicks</strong>', time: '5 hours ago' },
  { icon: AlertCircle, color: 'var(--orange)', text: 'Booking <strong>REF-0846</strong> awaiting payment confirmation', time: '8 hours ago' },
  { icon: Wallet, color: 'var(--green)', text: 'Payout of <strong>GHS 2,400</strong> processed successfully', time: '1 day ago' },
  { icon: Star, color: 'var(--orange)', text: 'You reached <strong>Gold Tier</strong> creator status!', time: '2 days ago' },
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
  variant: 'green' | 'dark' | 'orange' | 'blue' | 'purple'
}) {
  return (
    <motion.div variants={item} className={`stat-card stat-card--${variant}`}>
      <div className="stat-card-icon">
        <Icon size={20} />
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
      <div className="stat-card-delta">
        {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {delta}
      </div>
    </motion.div>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-md)',
      padding: '10px 14px',
      boxShadow: 'var(--shadow-lg)',
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          {p.name}: <strong style={{ color: 'var(--text-primary)' }}>{p.dataKey === 'earned' ? `GHS ${p.value}` : p.value}</strong>
        </div>
      ))}
    </div>
  )
}

export default function OverviewPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* ── Header ── */}
      <motion.div variants={item} className="page-header">
        <div>
          <h1>Good morning, Ama 👋</h1>
          <p>Your creator programme is performing well. Here's what's happening.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select className="select" defaultValue="month">
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="quarter">This quarter</option>
            <option value="year">This year</option>
          </select>
          <button type="button" className="btn btn-primary">
            <ArrowUpRight size={16} /> Export Report
          </button>
        </div>
      </motion.div>

      {/* ── Hero stat cards ── */}
      <div className="stat-grid">
        <StatCard icon={MousePointerClick} value="12,480" label="Total Clicks" delta="+12%" up variant="green" />
        <StatCard icon={Users} value="847" label="Unique Visitors" delta="+8%" up variant="dark" />
        <StatCard icon={CalendarDays} value="52" label="Attributed Bookings" delta="+15%" up variant="blue" />
        <StatCard icon={Wallet} value="GHS 4,200" label="Total Earned" delta="+22%" up variant="purple" />
      </div>

      {/* ── Charts row ── */}
      <div className="grid-2">
        <motion.div variants={item} className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Earnings Trend</div>
              <div className="section-sub">Monthly commission earned</div>
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--text-tertiary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                Earned
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', display: 'inline-block' }} />
                Clicks
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="earnedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.04)" />
              <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="earned" stroke="#10b981" strokeWidth={2} fill="url(#earnedGrad)" name="Earned" />
              <Area type="monotone" dataKey="clicks" stroke="#22d3ee" strokeWidth={2} fill="url(#clicksGrad)" name="Clicks" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Top Performing Links</div>
              <div className="section-sub">Ranked by earnings</div>
            </div>
            <Link to="/creator/links" className="btn btn-ghost btn-sm">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div>
            {topLinks.map((link, i) => (
              <div key={link.name} style={{ padding: '12px 0', borderBottom: i < topLinks.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: i === 0 ? 'var(--grad-green)' : 'rgba(255,255,255,.06)',
                      display: 'grid', placeItems: 'center',
                      fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11,
                      color: i === 0 ? 'var(--text-inverse)' : 'var(--text-secondary)',
                    }}>{i + 1}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{link.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{link.clicks} clicks · {link.bookings} bookings</div>
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: 'var(--green)' }}>
                    {link.earned}
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${link.pct}%`, background: 'var(--grad-green)' }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Bookings + Activity ── */}
      <div className="grid-2">
        <motion.div variants={item} className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="section-header" style={{ padding: '20px 24px 0' }}>
            <div>
              <div className="section-title">Recent Bookings</div>
              <div className="section-sub">Latest attributed bookings</div>
            </div>
            <Link to="/creator/bookings" className="btn btn-ghost btn-sm">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Tour</th>
                <th>Ref</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.ref}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{b.tour}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{b.time}</div>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)' }}>{b.ref}</td>
                  <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{b.amount}</td>
                  <td>
                    <span className={`pill pill-${b.status === 'confirmed' ? 'success' : b.status === 'pending' ? 'warning' : 'error'}`}>
                      {b.status === 'confirmed' ? 'Confirmed' : b.status === 'pending' ? 'Pending' : 'Cancelled'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div variants={item} className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Activity Feed</div>
              <div className="section-sub">Recent events</div>
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

      {/* ── Conversion + Quick actions ── */}
      <div className="grid-2-equal">
        <motion.div variants={item} className="card" style={{ background: 'var(--grad-card)', borderColor: 'rgba(16,185,129,.15)' }}>
          <div className="section-header">
            <div className="section-title">Conversion Rate</div>
            <span className="pill pill-success"><TrendingUp size={12} /> +1.1%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, padding: '20px 0' }}>
            <div style={{
              width: 120, height: 120, borderRadius: '50%',
              border: '10px solid rgba(16,185,129,.15)',
              borderTopColor: 'var(--green)',
              borderRightColor: 'var(--green)',
              display: 'grid', placeItems: 'center',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, letterSpacing: '-.04em', color: 'var(--green)' }}>6.2%</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <div>Clicks → Bookings: <strong style={{ color: 'var(--text-primary)' }}>6.2%</strong></div>
                <div>Avg. booking value: <strong style={{ color: 'var(--text-primary)' }}>GHS 480</strong></div>
                <div>Commission per booking: <strong style={{ color: 'var(--green)' }}>GHS 72</strong></div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="card">
          <div className="section-header">
            <div className="section-title">Quick Actions</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/creator/links" className="btn btn-primary" style={{ justifyContent: 'flex-start' }}>
              <Link2 size={18} /> Generate Referral Link
            </Link>
            <Link to="/creator/discover" className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>
              <Compass size={18} /> Browse Experiences
            </Link>
            <Link to="/creator/earnings" className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>
              <FileText size={18} /> View Earnings Statement
            </Link>
            <Link to="/creator/payouts" className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>
              <Wallet size={18} /> Request Payout
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
