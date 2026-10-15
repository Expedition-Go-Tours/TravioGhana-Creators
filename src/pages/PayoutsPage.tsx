import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Wallet,
  Building2,
  Smartphone,
  ChevronRight,
  Download,
  Clock,
  CheckCircle2,
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
import { useStore } from '../store/store'
import { selectPayoutSummary, selectEarningsSummary, selectMonthlyEarned } from '../store/selectors'
import { ghs, formatDate } from '../lib/format'
import StatusBadge from '../components/ui/StatusBadge'
import type { StatusVariant } from '../components/ui/StatusBadge'

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
          {p.name}: <strong style={{ color: 'var(--text-primary)' }}>{ghs(p.value)}</strong>
        </div>
      ))}
    </div>
  )
}

export default function PayoutsPage() {
  const { state } = useStore()

  const summary = useMemo(() => selectPayoutSummary(state), [state])
  const earnings = useMemo(() => selectEarningsSummary(state), [state])

  const earningsData = useMemo(() => {
    const earned = selectMonthlyEarned(state)
    const paidByMonth: Record<string, number> = {}
    for (const p of state.payouts) {
      if (p.status !== 'completed') continue
      const key = p.date.slice(0, 7)
      paidByMonth[key] = (paidByMonth[key] || 0) + p.amount
    }
    return earned.map((m) => ({ month: m.label, earned: m.earned, paid: paidByMonth[m.key] ?? 0 }))
  }, [state])

  const history = useMemo(
    () => [...state.payouts].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [state.payouts]
  )

  const defaultMethod = useMemo(
    () => state.payoutMethods.find((m) => m.isDefault) ?? state.payoutMethods[0],
    [state.payoutMethods]
  )

  const balanceBreakdown = [
    { label: 'Available for payout', value: ghs(earnings.available), color: 'var(--green)', icon: CheckCircle2 },
    { label: 'Pending (in hold)', value: ghs(earnings.pending), color: 'var(--amber)', icon: Clock },
    { label: 'Processing', value: ghs(earnings.processing), color: 'var(--chart-3)', icon: AlertCircle },
    { label: 'Paid lifetime', value: ghs(earnings.paid), color: 'var(--text-primary)', icon: Wallet },
  ]

  const canRequest = earnings.available >= summary.minPayout

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* ── Header ── */}
      <motion.div variants={item} className="page-header">
        <div>
          <h1>Payouts</h1>
          <p>Manage your earnings and track withdrawals.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-secondary" data-wired="pending">
            <Download size={16} /> Statement
          </button>
          <button type="button" className="btn btn-primary btn-lg" data-wired="pending" disabled={!canRequest}>
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
              {ghs(earnings.available)}
            </div>
            <div style={{ fontSize: 13, opacity: .7, marginTop: 10 }}>
              Minimum payout: {ghs(summary.minPayout)} · Next scheduled: 1 Nov 2026
            </div>
          </div>
          <motion.button
            whileHover={{ scale: canRequest ? 1.03 : 1 }}
            whileTap={{ scale: canRequest ? 0.96 : 1 }}
            type="button"
            data-wired="pending"
            disabled={!canRequest}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '16px 32px',
              borderRadius: 'var(--r-pill)',
              background: canRequest ? '#fff' : 'rgba(255,255,255,.25)',
              color: canRequest ? '#15201d' : 'rgba(21,32,29,.7)',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 15,
              border: 'none',
              cursor: canRequest ? 'pointer' : 'not-allowed',
              boxShadow: canRequest ? '0 8px 24px rgba(0,0,0,.15)' : 'none',
            }}
          >
            Request Payout <ChevronRight size={18} />
          </motion.button>
        </div>

        {/* Balance breakdown strip */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 0, marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.12)', flexWrap: 'wrap' }}>
          {balanceBreakdown.map((b, i) => (
            <div key={b.label} style={{
              flex: '1 1 140px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 16px',
              borderRight: i < balanceBreakdown.length - 1 ? '1px solid rgba(255,255,255,.1)' : 'none',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 'var(--r-sm)', background: 'rgba(255,255,255,.12)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
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
        <motion.div variants={item} className="card card-flat">
          <div className="section-header">
            <div>
              <div className="section-title">Earnings vs Payouts</div>
              <div className="section-sub">Monthly comparison</div>
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--text-tertiary)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--chart-1)' }} /> Earned
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--chart-2)' }} /> Paid
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
                  <stop offset="0%" stopColor="#e16e3f" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#e16e3f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(21,32,29,.06)" />
              <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="earned" stroke="var(--chart-1)" strokeWidth={2} fill="url(#earnedG)" name="Earned" />
              <Area type="monotone" dataKey="paid" stroke="var(--chart-2)" strokeWidth={2} fill="url(#paidG)" name="Paid" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="card card-flat">
          <div className="section-header">
            <div>
              <div className="section-title">Payout Method</div>
              <div className="section-sub">Where your earnings go</div>
            </div>
            <button type="button" className="btn btn-ghost btn-sm" data-wired="pending">Change</button>
          </div>

          {defaultMethod && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0' }}>
              <div style={{ width: 56, height: 56, borderRadius: 'var(--r-lg)', background: 'var(--green-bg)', display: 'grid', placeItems: 'center' }}>
                {defaultMethod.type === 'mobile'
                  ? <Smartphone size={24} color="var(--green)" />
                  : <Building2 size={24} color="var(--green)" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>{defaultMethod.label}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{defaultMethod.details}</div>
              </div>
              <span className="pill pill-success">Verified ✓</span>
            </div>
          )}

          <div className="divider" />

          <div>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 14 }}>
              Payout Schedule
            </div>
            {[
              { label: 'Next payout date', value: '1 Nov 2026', icon: CalendarDays },
              { label: 'Minimum threshold', value: ghs(summary.minPayout), icon: Wallet },
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
      <motion.div variants={item} className="card card-flat" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="section-header" style={{ padding: '20px 24px 0' }}>
          <div>
            <div className="section-title">Payout History</div>
            <div className="section-sub">{history.length} withdrawal transactions</div>
          </div>
          <button type="button" className="btn btn-ghost btn-sm" data-wired="pending">
            <Download size={14} /> Export
          </button>
        </div>
        <div className="table-scroll" style={{ marginTop: 12 }}>
          <table className="table table-card">
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
              {history.map((p) => (
                <tr key={p.id}>
                  <td data-label="Transaction">
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)' }}>{p.ref}</div>
                  </td>
                  <td data-label="Date" style={{ whiteSpace: 'nowrap', fontSize: 13 }}>{formatDate(p.date)}</td>
                  <td data-label="Method" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{p.method}</td>
                  <td data-label="Status">
                    <StatusBadge status={p.status as StatusVariant} />
                    {p.reason && (
                      <div style={{ fontSize: 10, color: 'var(--red)', marginTop: 4, maxWidth: 260 }}>{p.reason}</div>
                    )}
                  </td>
                  <td data-label="Amount" style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, letterSpacing: '-.02em' }}>
                      {ghs(p.amount)}
                    </div>
                  </td>
                  <td data-label="">
                    {p.status === 'failed' && (
                      <button type="button" className="btn btn-ghost btn-sm" style={{ color: 'var(--green)' }} data-wired="pending">Retry</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
