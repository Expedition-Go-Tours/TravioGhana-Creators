import { motion } from 'framer-motion'
import {
  Wallet,
  Building2,
  ChevronRight,
  Download,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  CalendarDays,
} from 'lucide-react'
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
  { month: 'May', earned: 2100, paid: 1200 },
  { month: 'Jun', earned: 3200, paid: 1800 },
  { month: 'Jul', earned: 2800, paid: 1600 },
  { month: 'Aug', earned: 3600, paid: 2100 },
  { month: 'Sep', earned: 3100, paid: 1800 },
  { month: 'Oct', earned: 4200, paid: 2400 },
]

const payouts = [
  { id: 'TXN-2024-0187', date: '01 Oct 2026', amount: 2400, status: 'completed', method: 'Bank ****4523', ref: 'PO-8847' },
  { id: 'TXN-2024-0186', date: '01 Sep 2026', amount: 1800, status: 'completed', method: 'Bank ****4523', ref: 'PO-8712' },
  { id: 'TXN-2024-0185', date: '01 Aug 2026', amount: 2100, status: 'failed', method: 'Bank ****4523', ref: 'PO-8598', reason: 'Account verification expired' },
  { id: 'TXN-2024-0184', date: '01 Jul 2026', amount: 1600, status: 'completed', method: 'Bank ****4523', ref: 'PO-8434' },
  { id: 'TXN-2024-0183', date: '01 Jun 2026', amount: 1200, status: 'processing', method: 'Bank ****4523', ref: 'PO-8291' },
]

const balanceBreakdown = [
  { label: 'Available for payout', value: 'GHS 4,100.00', color: 'var(--green)', icon: CheckCircle2 },
  { label: 'Pending (in hold)', value: 'GHS 3,200.00', color: 'var(--amber)', icon: Clock },
  { label: 'Processing', value: 'GHS 1,200.00', color: 'var(--blue)', icon: AlertCircle },
  { label: 'Paid lifetime', value: 'GHS 1,120.00', color: 'var(--text-primary)', icon: Wallet },
]

const stagger = { show: { transition: { staggerChildren: 0.08 } } }
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.3, 0.8, 0.4, 1] as const } },
}

function PayoutStatusChip({ status }: { status: string }) {
  const config: Record<string, { bg: string; color: string; icon: typeof CheckCircle2; label: string }> = {
    completed: { bg: 'var(--green-bg)', color: 'var(--green-dark)', icon: CheckCircle2, label: 'Completed' },
    processing: { bg: 'var(--blue-bg)', color: 'var(--blue)', icon: Clock, label: 'Processing' },
    failed: { bg: 'var(--red-bg)', color: 'var(--red)', icon: XCircle, label: 'Failed' },
  }
  const c = config[status] || config.processing
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: '10px 14px', boxShadow: 'var(--shadow-lg)' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          {p.name}: <strong style={{ color: 'var(--text-primary)' }}>GHS {p.value.toLocaleString()}</strong>
        </div>
      ))}
    </div>
  )
}

export default function PayoutsPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* ── Header ── */}
      <motion.div variants={item} className="page-header">
        <div>
          <h1>Payouts</h1>
          <p>Manage your earnings and track withdrawals.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="btn btn-secondary">
            <Download size={16} /> Statement
          </button>
          <button type="button" className="btn btn-primary btn-lg">
            <Plus size={18} /> Request Payout
          </button>
        </div>
      </motion.div>

      {/* ── Balance hero card ── */}
      <motion.div
        variants={item}
        style={{
          position: 'relative',
          borderRadius: 'var(--r-2xl)',
          overflow: 'hidden',
          marginBottom: 24,
          background: 'linear-gradient(135deg, #075634 0%, #087747 50%, #1b674c 100%)',
          padding: '36px 40px',
          color: '#fff',
        }}
      >
        <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,.1)' }} />
        <div style={{ position: 'absolute', right: 60, bottom: -60, width: 160, height: 160, borderRadius: '50%', border: '1px solid rgba(255,255,255,.08)' }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Wallet size={16} color="var(--lime)" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.12em', opacity: .7 }}>
                Available Balance
              </span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1 }}>
              GHS 4,100.00
            </div>
            <div style={{ fontSize: 13, opacity: .7, marginTop: 10 }}>
              Minimum payout: GHS 500 · Next scheduled: 1 Nov 2026
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '16px 32px',
              borderRadius: 'var(--r-pill)',
              background: '#fff',
              color: '#15201d',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 15,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0,0,0,.15)',
            }}
          >
            Request Payout <ChevronRight size={18} />
          </motion.button>
        </div>

        {/* Balance breakdown strip */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 0, marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.12)' }}>
          {balanceBreakdown.map((b, i) => (
            <div key={b.label} style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '0 16px',
              borderRight: i < balanceBreakdown.length - 1 ? '1px solid rgba(255,255,255,.1)' : 'none',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,.12)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <b.icon size={14} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>{b.value}</div>
                <div style={{ fontSize: 9, fontWeight: 700, opacity: .6, textTransform: 'uppercase', letterSpacing: '.08em' }}>{b.label}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Charts + Payout method ── */}
      <div className="grid-2">
        <motion.div variants={item} className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Earnings vs Payouts</div>
              <div className="section-sub">Monthly comparison</div>
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--text-tertiary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#087747' }} /> Earned
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3463e8' }} /> Paid
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="earnedG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#087747" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#087747" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="paidG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3463e8" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#3463e8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(21,32,29,.06)" />
              <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="earned" stroke="#087747" strokeWidth={2} fill="url(#earnedG)" name="Earned" />
              <Area type="monotone" dataKey="paid" stroke="#3463e8" strokeWidth={2} fill="url(#paidG)" name="Paid" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Payout Method</div>
              <div className="section-sub">Where your earnings go</div>
            </div>
            <button type="button" className="btn btn-ghost btn-sm">Change</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0' }}>
            <div style={{ width: 56, height: 56, borderRadius: 'var(--r-lg)', background: 'var(--green-bg)', display: 'grid', placeItems: 'center' }}>
              <Building2 size={24} color="var(--green)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>Bank Account</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>Ecobank Ghana · ****4523</div>
            </div>
            <span className="pill pill-success">Verified ✓</span>
          </div>

          <div className="divider" />

          <div>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 14 }}>
              Payout Schedule
            </div>
            {[
              { label: 'Next payout date', value: '1 Nov 2026', icon: CalendarDays },
              { label: 'Minimum threshold', value: 'GHS 500', icon: Wallet },
              { label: 'Payout frequency', value: 'Monthly', icon: Clock },
            ].map((row) => (
              <div key={row.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-soft)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <row.icon size={14} color="var(--text-tertiary)" />
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{row.label}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13 }}>{row.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Payout history table ── */}
      <motion.div variants={item} className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="section-header" style={{ padding: '20px 24px 0' }}>
          <div>
            <div className="section-title">Payout History</div>
            <div className="section-sub">All withdrawal transactions</div>
          </div>
          <button type="button" className="btn btn-ghost btn-sm">
            <Download size={14} /> Export
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Date</th>
              <th>Method</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              <th style={{ width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--text-tertiary)' }}>{p.id}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{p.ref}</div>
                </td>
                <td style={{ whiteSpace: 'nowrap', fontSize: 13 }}>{p.date}</td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{p.method}</td>
                <td>
                  <PayoutStatusChip status={p.status} />
                  {p.reason && (
                    <div style={{ fontSize: 10, color: 'var(--red)', marginTop: 4 }}>{p.reason}</div>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, letterSpacing: '-.02em' }}>
                    GHS {p.amount.toLocaleString()}
                  </div>
                </td>
                <td>
                  {p.status === 'failed' && (
                    <button type="button" className="btn btn-ghost btn-sm" style={{ color: 'var(--green)' }}>Retry</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  )
}
