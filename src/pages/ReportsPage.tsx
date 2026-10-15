import { useMemo, useState } from 'react'
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
import { toast } from 'sonner'
import { useStore } from '../store/store'
import { downloadCsv, formatNumber } from '../lib/format'

type Range = 'week' | 'month' | 'quarter'
const RANGE_MONTHS: Record<Range, number> = { week: 2, month: 3, quarter: 6 }

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
          {p.name}: <strong style={{ color: 'var(--text-primary)' }}>{formatNumber(p.value)}</strong>
        </div>
      ))}
    </div>
  )
}

export default function ReportsPage() {
  const { state } = useStore()
  const [range, setRange] = useState<Range>('quarter')
  const r = state.reportData

  const reachData = useMemo(
    () => r.reachData.slice(Math.max(0, r.reachData.length - RANGE_MONTHS[range])),
    [r.reachData, range]
  )

  const conversion = r.funnelData.length
    ? Math.round((r.funnelData[r.funnelData.length - 1].value / r.funnelData[2].value) * 1000) / 10
    : r.conversionRate

  const rangeLabel: Record<Range, string> = { week: 'Last 2 months', month: 'Last 3 months', quarter: 'All 6 months' }

  const exportReport = () => {
    downloadCsv(
      `travio-report-${range}-${new Date().toISOString().slice(0, 10)}.csv`,
      r.reachData.map((d) => ({ Month: d.month, Reach: d.reach, Engagement: d.engagement, Clicks: d.clicks })),
      ['Month', 'Reach', 'Engagement', 'Clicks']
    )
    toast.success('Report exported')
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={item} className="page-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Audience insights, content performance, and conversion metrics.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <select className="select" value={range} onChange={(e) => setRange(e.target.value as Range)} aria-label="Report range">
            <option value="week">Last 2 months</option>
            <option value="month">Last 3 months</option>
            <option value="quarter">All 6 months</option>
          </select>
          <button type="button" className="btn btn-primary" onClick={exportReport}>
            <Download size={16} /> Export Report
          </button>
        </div>
      </motion.div>

      <motion.div variants={item} className="card card-flat" style={{ marginBottom: 24 }}>
        <div className="section-header">
          <div>
            <div className="section-title">Reach & Engagement</div>
            <div className="section-sub">{rangeLabel[range]} · across all channels</div>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--text-tertiary)', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--chart-1)' }} /> Reach
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--chart-2)' }} /> Engagement
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--chart-3)' }} /> Clicks
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
                <stop offset="0%" stopColor="#e16e3f" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#e16e3f" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(21,32,29,.06)" />
            <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="reach" stroke="var(--chart-1)" strokeWidth={2} fill="url(#reachGrad)" name="Reach" />
            <Area type="monotone" dataKey="engagement" stroke="var(--chart-2)" strokeWidth={2} fill="url(#engGrad)" name="Engagement" />
            <Area type="monotone" dataKey="clicks" stroke="var(--chart-3)" strokeWidth={2} fill="none" name="Clicks" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid-3" style={{ marginBottom: 24 }}>
        <motion.div variants={item} className="card card-flat">
          <div className="section-header">
            <div>
              <div className="section-title">Age Distribution</div>
              <div className="section-sub">Your audience by age</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {r.audienceAge.map((a) => (
              <div key={a.range}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{a.range}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{a.pct}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${a.pct}%`, background: 'var(--chart-1)' }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="card card-flat">
          <div className="section-header">
            <div>
              <div className="section-title">Top Locations</div>
              <div className="section-sub">Where your audience is</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {r.audienceLocation.map((l) => (
              <div key={l.country} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{l.flag}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{l.country}</div>
                  <div className="progress-bar" style={{ marginTop: 4, height: 4 }}>
                    <div className="progress-fill" style={{ width: `${l.pct}%`, background: 'var(--chart-1)' }} />
                  </div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', minWidth: 36, textAlign: 'right' }}>{l.pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="card card-flat">
          <div className="section-header">
            <div>
              <div className="section-title">Device Split</div>
              <div className="section-sub">How they browse</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '12px 0' }}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={r.deviceData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                  {r.deviceData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
              {r.deviceData.map((d) => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: d.color }} />
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{d.name} <strong style={{ color: 'var(--text-primary)' }}>{d.value}%</strong></span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid-2">
        <motion.div variants={item} className="card card-flat" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="section-header" style={{ padding: '20px 24px 0' }}>
            <div>
              <div className="section-title">Top Performing Content</div>
              <div className="section-sub">Your best converting posts</div>
            </div>
          </div>
          <div className="table-scroll" style={{ marginTop: 12 }}>
            <table className="table table-card">
              <thead>
                <tr>
                  <th>Content</th>
                  <th>Platform</th>
                  <th>Clicks</th>
                  <th>Eng.</th>
                  <th>Bookings</th>
                </tr>
              </thead>
              <tbody>
                {r.topContent.map((c) => (
                  <tr key={c.title}>
                    <td data-label="Content" style={{ fontWeight: 600, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</td>
                    <td data-label="Platform"><span className="pill pill-info">{c.platform}</span></td>
                    <td data-label="Clicks" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{formatNumber(c.clicks)}</td>
                    <td data-label="Engagement" style={{ color: 'var(--green)', fontWeight: 700 }}>{c.engagement}</td>
                    <td data-label="Bookings">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--green)' }}>{c.bookings}</span>
                        <span className="pill pill-success" style={{ fontSize: 9 }}>🔥</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div variants={item} className="card card-flat">
          <div className="section-header">
            <div>
              <div className="section-title">Conversion Funnel</div>
              <div className="section-sub">From impressions to bookings (last 30 days)</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '12px 0' }}>
            {r.funnelData.map((f, i) => (
              <div key={f.stage}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{f.stage}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14 }}>{formatNumber(f.value)}</span>
                </div>
                <div style={{ height: 32, background: 'var(--bg-paper)', borderRadius: 'var(--r-sm)', overflow: 'hidden', position: 'relative' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max((f.value / r.funnelData[0].value) * 100, 2)}%` }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: [0.3, 0.8, 0.4, 1] }}
                    style={{
                      height: '100%',
                      background: i === 3 ? 'var(--grad-green)' : i === 2 ? 'var(--chart-3)' : i === 1 ? 'var(--chart-2)' : 'var(--chart-1)',
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
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--green)', letterSpacing: '-.04em' }}>{conversion}%</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>Clicks → Bookings (industry avg: 2.1%)</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
