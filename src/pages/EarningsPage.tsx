import { motion } from 'framer-motion'
import { Download, TrendingUp } from 'lucide-react'

const SUMMARY = [
  { label: 'Total Earned', value: 'GHS 8,420', color: 'var(--green-cta)' },
  { label: 'Pending (Hold)', value: 'GHS 3,200', color: 'var(--warning)' },
  { label: 'Available', value: 'GHS 4,100', color: 'var(--green-cta)' },
  { label: 'Paid Lifetime', value: 'GHS 1,120', color: 'var(--ink)' },
]

const BREAKDOWN = [
  { label: 'Gross booking value', amount: 'GHS 28,000', negative: false },
  { label: 'Platform fee (10%)', amount: '- GHS 2,800', negative: true },
  { label: 'Eligible booking value', amount: 'GHS 25,200', negative: false },
  { label: 'Your commission (15%)', amount: 'GHS 3,780', negative: false },
  { label: 'Refunds & reversals', amount: '- GHS 280', negative: true },
]

const TRANSACTIONS = [
  { date: '12 Oct', type: 'accrual', ref: 'REF-0847', amount: '+ GHS 68' },
  { date: '11 Oct', type: 'accrual', ref: 'REF-0846', amount: '+ GHS 180' },
  { date: '10 Oct', type: 'payout', ref: 'Oct payout', amount: '- GHS 2,400' },
  { date: '09 Oct', type: 'reversal', ref: 'REF-0844', amount: '- GHS 42' },
  { date: '08 Oct', type: 'accrual', ref: 'REF-0843', amount: '+ GHS 53' },
  { date: '07 Oct', type: 'accrual', ref: 'REF-0842', amount: '+ GHS 108' },
]

const stagger = { show: { transition: { staggerChildren: 0.06 } } }
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.3, 0.8, 0.4, 1] as const } },
}

export default function EarningsPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={item} className="page-header">
        <div className="page-header-row">
          <div>
            <h1>Earnings</h1>
            <p>Your commission ledger and financial activity.</p>
          </div>
          <button type="button" className="btn btn-secondary btn-sm">
            <Download size={15} /> Statement
          </button>
        </div>
      </motion.div>

      {/* ── Summary cards ── */}
      <div className="metric-grid">
        {SUMMARY.map((s) => (
          <motion.div key={s.label} variants={item} className="metric-card">
            <div className="metric-value" style={{ color: s.color }}>{s.value}</div>
            <div className="metric-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ── Commission breakdown ── */}
      <motion.div variants={item} className="card card-flat" style={{ marginBottom: 32 }}>
        <h2 className="section-title">Commission Breakdown</h2>
        <div style={{ maxWidth: 560 }}>
          {BREAKDOWN.map((row, i) => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: i < BREAKDOWN.length - 1 ? '1px dotted var(--line)' : 'none',
              }}
            >
              <span style={{ fontSize: 14, color: row.negative ? 'var(--muted)' : 'var(--ink)', fontWeight: row.negative ? 400 : 500 }}>
                {row.label}
              </span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 14, fontWeight: 600, color: row.negative ? 'var(--error)' : 'var(--ink)' }}>
                {row.amount}
              </span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0 0', marginTop: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Net earned</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--green-cta)', letterSpacing: '-0.03em' }}>
              GHS 3,500
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Transaction history ── */}
      <motion.div variants={item} className="card card-flat" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '24px 28px 0' }}>
          <h2 className="section-title">Transaction History</h2>
        </div>
        {TRANSACTIONS.map((t, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '14px 28px',
              borderBottom: i < TRANSACTIONS.length - 1 ? '1px solid var(--line)' : 'none',
            }}
          >
            <div style={{ width: 40, flexShrink: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{t.date}</div>
            </div>
            <span className={`pill ${t.type === 'accrual' ? 'pill-success' : t.type === 'payout' ? 'pill-info' : 'pill-error'}`} style={{ textTransform: 'capitalize' }}>
              {t.type}
            </span>
            <div style={{ flex: 1, fontFamily: 'ui-monospace, monospace', fontSize: 13, color: 'var(--muted)' }}>
              {t.ref}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: t.amount.startsWith('+') ? 'var(--green-cta)' : 'var(--error)' }}>
              {t.amount}
            </div>
          </div>
        ))}
        <div style={{ padding: '16px 28px', textAlign: 'center' }}>
          <button type="button" className="btn btn-ghost btn-sm">
            <TrendingUp size={14} /> Load more transactions
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
