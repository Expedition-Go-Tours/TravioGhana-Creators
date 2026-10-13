import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Clock, Building2, ChevronRight } from 'lucide-react'

const PAYOUTS = [
  { date: '01 Oct 2026', amount: 'GHS 2,400', status: 'completed', ref: 'TXN-2024-0187' },
  { date: '01 Sep 2026', amount: 'GHS 1,800', status: 'completed', ref: 'TXN-2024-0156' },
  { date: '01 Aug 2026', amount: 'GHS 2,100', status: 'failed', ref: 'TXN-2024-0134' },
  { date: '01 Jul 2026', amount: 'GHS 1,600', status: 'completed', ref: 'TXN-2024-0112' },
]

const stagger = { show: { transition: { staggerChildren: 0.06 } } }
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.3, 0.8, 0.4, 1] as const } },
}

export default function PayoutsPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={item} className="page-header">
        <h1>Payouts</h1>
        <p>Manage your payout settings and track withdrawals.</p>
      </motion.div>

      {/* ── Balance card ── */}
      <motion.div
        variants={item}
        style={{
          background: 'linear-gradient(135deg, #075634, #087747)',
          borderRadius: 'var(--radius-3xl)',
          padding: '36px 40px',
          color: '#fff',
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', right: -60, top: -60, width: 240, height: 240, borderRadius: '50%', border: '1px solid rgba(255,255,255,.1)' }} />
        <div style={{ fontSize: 14, opacity: 0.7, fontWeight: 700, marginBottom: 8 }}>Available Balance</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 16 }}>
          GHS 4,100.00
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-sm" style={{ background: '#fff', color: 'var(--ink)', fontWeight: 800, borderRadius: 'var(--radius-pill)', padding: '12px 28px', minHeight: 44 }}>
            Request Payout <ChevronRight size={16} />
          </button>
          <span style={{ fontSize: 13, opacity: 0.7 }}>
            Minimum payout: GHS 500 · Next scheduled: 1 Nov 2026
          </span>
        </div>
      </motion.div>

      {/* ── Payout method ── */}
      <motion.div variants={item} className="card card-flat" style={{ marginBottom: 24 }}>
        <h2 className="section-title">Payout Method</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--mint)', display: 'grid', placeItems: 'center' }}>
            <Building2 size={22} color="var(--green-cta)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Bank Account ending in ****4523</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>Ecobank Ghana · <span style={{ color: 'var(--success)' }}>Verified ✓</span></div>
          </div>
          <button type="button" className="btn btn-secondary btn-sm">Change</button>
        </div>
      </motion.div>

      {/* ── Payout history ── */}
      <motion.div variants={item} className="card card-flat" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '24px 28px 0' }}>
          <h2 className="section-title">Payout History</h2>
        </div>
        {PAYOUTS.map((p, i) => (
          <div
            key={p.ref}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '16px 28px',
              borderBottom: i < PAYOUTS.length - 1 ? '1px solid var(--line)' : 'none',
            }}
          >
            <div style={{ width: 20, flexShrink: 0 }}>
              {p.status === 'completed' ? (
                <CheckCircle2 size={18} color="var(--success)" />
              ) : p.status === 'failed' ? (
                <XCircle size={18} color="var(--error)" />
              ) : (
                <Clock size={18} color="var(--warning)" />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{p.amount}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'ui-monospace, monospace' }}>{p.ref}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>{p.date}</div>
            {p.status === 'failed' && (
              <button type="button" className="btn btn-ghost btn-sm" style={{ color: 'var(--green-cta)' }}>Retry</button>
            )}
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
