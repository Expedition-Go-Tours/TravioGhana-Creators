import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const reachData = [
  { month: 'May', reach: 12000, engagement: 840, clicks: 620 },
  { month: 'Jun', reach: 18000, engagement: 1260, clicks: 980 },
  { month: 'Jul', reach: 22000, engagement: 1540, clicks: 1200 },
  { month: 'Aug', reach: 28000, engagement: 1960, clicks: 1540 },
  { month: 'Sep', reach: 35000, engagement: 2450, clicks: 1920 },
  { month: 'Oct', reach: 42000, engagement: 2940, clicks: 2340 },
]

const audienceAge = [
  { range: '18-24', pct: 18 },
  { range: '25-34', pct: 42 },
  { range: '35-44', pct: 24 },
  { range: '45-54', pct: 10 },
  { range: '55+', pct: 6 },
]

const audienceLocation = [
  { country: 'Ghana', pct: 34, flag: '🇬🇭' },
  { country: 'United States', pct: 22, flag: '🇺🇸' },
  { country: 'United Kingdom', pct: 16, flag: '🇬🇧' },
  { country: 'Nigeria', pct: 12, flag: '🇳🇬' },
  { country: 'Germany', pct: 8, flag: '🇩🇪' },
  { country: 'Other', pct: 8, flag: '🌍' },
]

const deviceData = [
  { name: 'Mobile', value: 68, color: '#087747' },
  { name: 'Desktop', value: 24, color: '#3463e8' },
  { name: 'Tablet', value: 8, color: '#e16e3f' },
]

const topContent = [
  { title: 'Kakum Canopy Walkway — Reel', platform: 'Instagram', reach: 24000, engagement: '8.2%', clicks: 1840, bookings: 18 },
  { title: 'Mole Safari — Carousel', platform: 'Instagram', reach: 18000, engagement: '6.8%', clicks: 1240, bookings: 12 },
  { title: 'Cape Coast Castles — Story', platform: 'TikTok', reach: 32000, engagement: '5.4%', clicks: 980, bookings: 9 },
  { title: 'Boti Falls — Reel', platform: 'Instagram', reach: 15000, engagement: '7.1%', clicks: 820, bookings: 6 },
]

const funnelData = [
  { stage: 'Impressions', value: 42000, pct: 100 },
  { stage: 'Reach', value: 28000, pct: 67 },
  { stage: 'Clicks', value: 8400, pct: 20 },
  { stage: 'Bookings', value: 52, pct: 0.12 },
]

const stagger = { show: { transition: { staggerChildren: 0.08 } } }
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.3, 0.8, 0.4, 1] as const } },
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: '10px 14px', boxShadow: 'var(--shadow-lg)' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          {p.name}: <strong style={{ color: 'var(--text-primary)' }}>{p.value.toLocaleString()}</strong>
        </div>
      ))}
    </div>
  )
}

export default function ReportsPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={item} className="page-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Audience insights, content performance, and conversion metrics.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select className="select" defaultValue="month">
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 90 days</option>
          </select>
          <button type="button" className="btn btn-primary">
            <Download size={16} /> Export Report
          </button>
        </div>
      </motion.div>

      {/* ── Reach & Engagement chart ── */}
      <motion.div variants={item} className="card" style={{ marginBottom: 24 }}>
        <div className="section-header">
          <div>
            <div className="section-title">Reach & Engagement</div>
            <div className="section-sub">Monthly performance across all channels</div>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--text-tertiary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#087747' }} /> Reach
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3463e8' }} /> Engagement
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#e16e3f' }} /> Clicks
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={reachData}>
            <defs>
              <linearGradient id="reachGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#087747" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#087747" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3463e8" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#3463e8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(21,32,29,.06)" />
            <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="reach" stroke="#087747" strokeWidth={2} fill="url(#reachGrad)" name="Reach" />
            <Area type="monotone" dataKey="engagement" stroke="#3463e8" strokeWidth={2} fill="url(#engGrad)" name="Engagement" />
            <Area type="monotone" dataKey="clicks" stroke="#e16e3f" strokeWidth={2} fill="none" name="Clicks" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ── Audience demographics ── */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        <motion.div variants={item} className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Age Distribution</div>
              <div className="section-sub">Your audience by age</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {audienceAge.map((a) => (
              <div key={a.range}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{a.range}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{a.pct}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${a.pct}%`, background: a.pct > 30 ? 'var(--green)' : 'var(--bg-paper)' }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Top Locations</div>
              <div className="section-sub">Where your audience is</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {audienceLocation.map((l) => (
              <div key={l.country} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{l.flag}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{l.country}</div>
                  <div className="progress-bar" style={{ marginTop: 4, height: 4 }}>
                    <div className="progress-fill" style={{ width: `${l.pct}%`, background: 'var(--green)' }} />
                  </div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', minWidth: 36, textAlign: 'right' }}>{l.pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Device Split</div>
              <div className="section-sub">How they browse</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '12px 0' }}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={deviceData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                  {deviceData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: 20 }}>
              {deviceData.map((d) => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: d.color }} />
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{d.name} <strong style={{ color: 'var(--text-primary)' }}>{d.value}%</strong></span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Top content + Conversion funnel ── */}
      <div className="grid-2">
        <motion.div variants={item} className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="section-header" style={{ padding: '20px 24px 0' }}>
            <div>
              <div className="section-title">Top Performing Content</div>
              <div className="section-sub">Your best converting posts</div>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Content</th>
                <th>Platform</th>
                <th>Reach</th>
                <th>Eng.</th>
                <th>Bookings</th>
              </tr>
            </thead>
            <tbody>
              {topContent.map((c) => (
                <tr key={c.title}>
                  <td style={{ fontWeight: 600, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</td>
                  <td><span className="pill pill-info">{c.platform}</span></td>
                  <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{(c.reach / 1000).toFixed(0)}K</td>
                  <td style={{ color: 'var(--green)', fontWeight: 700 }}>{c.engagement}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--green)' }}>{c.bookings}</span>
                      <span className="pill pill-success" style={{ fontSize: 9 }}>🔥</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div variants={item} className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Conversion Funnel</div>
              <div className="section-sub">From impressions to bookings</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '12px 0' }}>
            {funnelData.map((f, i) => (
              <div key={f.stage}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{f.stage}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14 }}>{f.value.toLocaleString()}</span>
                </div>
                <div style={{ height: 32, background: 'var(--bg-paper)', borderRadius: 'var(--r-sm)', overflow: 'hidden', position: 'relative' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(f.pct, 2)}%` }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: [0.3, 0.8, 0.4, 1] }}
                    style={{
                      height: '100%',
                      background: i === 3 ? 'var(--grad-green)' : i === 2 ? '#3463e8' : i === 1 ? '#e16e3f' : 'var(--bg-mint)',
                      borderRadius: 'var(--r-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 12,
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 700, color: i === 3 ? '#fff' : 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                      {f.pct}%
                    </span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: '14px 16px', background: 'var(--green-bg)', borderRadius: 'var(--r-md)', border: '1px solid #cae3d3' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-dark)', marginBottom: 4 }}>Conversion Rate</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--green)', letterSpacing: '-.04em' }}>6.2%</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>Clicks → Bookings (industry avg: 2.1%)</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
