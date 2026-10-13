import { motion } from 'framer-motion'
import { Download, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const monthlyData = [
  { month: 'Jul', earned: 2800, payouts: 1600 },
  { month: 'Aug', earned: 3600, payouts: 2100 },
  { month: 'Sep', earned: 3100, payouts: 1800 },
  { month: 'Oct', earned: 4200, payouts: 2400 },
]

const breakdown = [
  { name: 'Your commission', value: 3780, color: '#087747' },
  { name: 'Platform fee', value: 2800, color: '#f59e0b' },
  { name: 'Refunds', value: 280, color: '#ef4444' },
  { name: 'Pending', value: 3200, color: '#3463e8' },
]

const SUMMARY = [
  { label: 'Total Earned', value: 'GHS 8,420', delta: '+22%', up: true, color: 'var(--green)' },
  { label: 'Pending (Hold)', value: 'GHS 3,200', delta: '+8%', up: true, color: 'var(--orange)' },
  { label: 'Available', value: 'GHS 4,100', delta: '+15%', up: true, color: 'var(--green)' },
  { label: 'Paid Lifetime', value: 'GHS 1,120', delta: '+5%', up: true, color: 'var(--text-primary)' },
]

const TRANSACTIONS = [
  { date: '12 Oct', type: 'accrual', ref: 'REF-0847', desc: 'Kakum Canopy Walkway', amount: 68 },
  { date: '11 Oct', type: 'accrual', ref: 'REF-0846', desc: 'Mole National Park', amount: 180 },
  { date: '10 Oct', type: 'payout', ref: 'TXN-0187', desc: 'Monthly payout', amount: -2400 },
  { date: '09 Oct', type: 'reversal', ref: 'REF-0844', desc: 'Boti Falls — cancelled', amount: -42 },
  { date: '08 Oct', type: 'accrual', ref: 'REF-0843', desc: 'Kumasi Heritage', amount: 53 },
  { date: '07 Oct', type: 'accrual', ref: 'REF-0842', desc: 'Nzulezo Village', amount: 108 },
  { date: '06 Oct', type: 'accrual', ref: 'REF-0841', desc: 'Cape Coast Castles', amount: 75 },
  { date: '05 Oct', type: 'payout', ref: 'TXN-0186', desc: 'Bonus payout', amount: 500 },
]

const stagger = { show: { transition: { staggerChildren: 0.08 } } }
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.3, 0.8, 0.4, 1] as const } },
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#fff', border: '1px solid var(--border)',
      borderRadius: 'var(--r-md)', padding: '10px 14px', boxShadow: 'var(--shadow-lg)',
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          {p.name}: <strong style={{ color: 'var(--text-primary)' }}>GHS {p.value}</strong>
        </div>
      ))}
    </div>
  )
}

export default function EarningsPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={item} className="page-header">
        <div>
          <h1>Earnings</h1>
          <p>Your commission ledger and financial activity.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select className="select" defaultValue="month">
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="quarter">This quarter</option>
          </select>
          <button type="button" className="btn btn-primary">
            <Download size={16} /> Download Statement
          </button>
        </div>
      </motion.div>

      {/* ── Summary cards ── */}
      <div className="stat-grid">
        {SUMMARY.map((s) => (
          <motion.div key={s.label} variants={item} className="card" style={{ padding: '22px 24px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-tertiary)', marginBottom: 10 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800, letterSpacing: '-.04em', color: s.color }}>
              {s.value}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8, fontSize: 12, fontWeight: 700, color: s.up ? 'var(--green)' : 'var(--red)' }}>
              {s.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {s.delta} vs last month
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Charts ── */}
      <div className="grid-2">
        <motion.div variants={item} className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Monthly Performance</div>
              <div className="section-sub">Earned vs Payouts</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyData} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(21,32,29,.06)" />
              <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="earned" name="Earned" fill="#087747" radius={[6, 6, 0, 0]} />
              <Bar dataKey="payouts" name="Payouts" fill="#3463e8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Commission Breakdown</div>
              <div className="section-sub">This month</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={breakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                  {breakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {breakdown.map((b) => (
                <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: b.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 12, color: 'var(--text-secondary)' }}>{b.name}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13 }}>GHS {b.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Ledger table ── */}
      <motion.div variants={item} className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="section-header" style={{ padding: '20px 24px 0' }}>
          <div>
            <div className="section-title">Transaction Ledger</div>
            <div className="section-sub">All financial activity</div>
          </div>
          <button type="button" className="btn btn-ghost btn-sm">
            <Download size={14} /> Export CSV
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>Reference</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map((t, i) => (
              <tr key={i}>
                <td style={{ color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{t.date}</td>
                <td>
                  <span className={`pill pill-${t.type === 'accrual' ? 'success' : t.type === 'payout' ? 'info' : 'error'}`}>
                    {t.type === 'accrual' ? 'Commission' : t.type === 'payout' ? 'Payout' : 'Reversal'}
                  </span>
                </td>
                <td style={{ fontWeight: 500 }}>{t.desc}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)' }}>{t.ref}</td>
                <td style={{
                  textAlign: 'right',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 14,
                  color: t.amount > 0 ? 'var(--green)' : 'var(--red)',
                }}>
                  {t.amount > 0 ? '+' : ''}GHS {Math.abs(t.amount).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  )
}
