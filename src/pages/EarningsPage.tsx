import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Wallet, Clock, Banknote, CheckCircle2 } from 'lucide-react'
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
import { toast } from 'sonner'
import { useStore } from '../store/store'
import {
  selectEarningsSummary,
  selectMonthlyEarned,
  selectOverviewKpis,
  DATASET_TODAY,
} from '../store/selectors'
import { ghs, formatDate, downloadCsv } from '../lib/format'
import Kpi from '../components/ui/Kpi'

type Range = 'week' | 'month' | 'quarter' | 'all'

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

export default function EarningsPage() {
  const { state } = useStore()
  const [range, setRange] = useState<Range>('all')

  const earnings = useMemo(() => selectEarningsSummary(state), [state])
  const kpis = useMemo(() => selectOverviewKpis(state), [state])

  const monthlyData = useMemo(() => {
    const earned = selectMonthlyEarned(state)
    const payoutsByMonth: Record<string, number> = {}
    for (const p of state.payouts) {
      if (p.status !== 'completed') continue
      const key = p.date.slice(0, 7)
      payoutsByMonth[key] = (payoutsByMonth[key] || 0) + p.amount
    }
    return earned.map((m) => ({ month: m.label, earned: m.earned, payouts: payoutsByMonth[m.key] ?? 0 }))
  }, [state])

  const reversals = useMemo(
    () => Math.abs(state.transactions.filter((t) => t.type === 'reversal').reduce((s, t) => s + t.amount, 0)),
    [state]
  )

  const breakdown = useMemo(
    () => [
      { name: 'Paid out', value: earnings.paid, color: 'var(--chart-1)' },
      { name: 'Available', value: earnings.available, color: 'var(--chart-2)' },
      { name: 'Processing', value: earnings.processing, color: 'var(--chart-3)' },
      { name: 'Pending', value: earnings.pending, color: '#6b7280' },
      { name: 'Reversals', value: reversals, color: 'var(--red)' },
    ].filter((b) => b.value > 0),
    [earnings, reversals]
  )

  const rangeLabel: Record<Range, string> = {
    week: 'This week',
    month: 'This month',
    quarter: 'This quarter',
    all: 'All time',
  }

  const filteredTx = useMemo(() => {
    if (range === 'all') return state.transactions
    const today = new Date(`${DATASET_TODAY}T00:00:00`)
    let from = new Date(today)
    if (range === 'week') from.setDate(today.getDate() - 7)
    if (range === 'month') from = new Date(today.getFullYear(), today.getMonth(), 1)
    if (range === 'quarter') from = new Date(today.getFullYear(), today.getMonth() - 2, 1)
    const fromStr = from.toISOString().slice(0, 10)
    return state.transactions.filter((t) => t.date >= fromStr)
  }, [state.transactions, range])

  const exportStatement = () => {
    downloadCsv(
      `travio-earnings-${range}-${new Date().toISOString().slice(0, 10)}.csv`,
      filteredTx.map((t) => ({
        Date: t.date,
        Type: t.type,
        Reference: t.ref,
        Description: t.desc,
        Amount: t.amount,
        Status: t.status,
      })),
      ['Date', 'Type', 'Reference', 'Description', 'Amount', 'Status']
    )
    toast.success(`Statement exported (${rangeLabel[range]})`)
  }

  const typePill = (t: (typeof state.transactions)[number]) => {
    if (t.type === 'accrual') return { cls: 'pill-success', label: 'Commission' }
    if (t.type === 'bonus') return { cls: 'pill-info', label: 'Bonus' }
    if (t.type === 'payout') return { cls: 'pill-neutral', label: 'Payout' }
    return { cls: 'pill-error', label: 'Reversal' }
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={item} className="page-header">
        <div>
          <h1>Earnings</h1>
          <p>Your commission ledger and financial activity.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <select className="select" value={range} onChange={(e) => setRange(e.target.value as Range)} aria-label="Statement range">
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="quarter">This quarter</option>
            <option value="all">All time</option>
          </select>
          <button type="button" className="btn btn-primary" onClick={exportStatement}>
            <Download size={16} /> Download Statement
          </button>
        </div>
      </motion.div>

      <div className="stat-grid">
        <motion.div variants={item}>
          <Kpi
            icon={<Wallet size={18} />}
            label="Total earned"
            value={ghs(earnings.totalEarned)}
            delta={kpis.earned.delta}
            period={kpis.periodLabel}
            tone="green"
          />
        </motion.div>
        <motion.div variants={item}>
          <Kpi
            icon={<Clock size={18} />}
            label="Pending (hold)"
            value={ghs(earnings.pending)}
            period="awaiting approval"
          />
        </motion.div>
        <motion.div variants={item}>
          <Kpi
            icon={<Banknote size={18} />}
            label="Available"
            value={ghs(earnings.available)}
            period="after processing hold"
            tone="mint"
          />
        </motion.div>
        <motion.div variants={item}>
          <Kpi
            icon={<CheckCircle2 size={18} />}
            label="Paid lifetime"
            value={ghs(earnings.paid)}
            period="incl. GHS 250 bonus"
          />
        </motion.div>
      </div>

      <div className="grid-2">
        <motion.div variants={item} className="card card-flat">
          <div className="section-header">
            <div>
              <div className="section-title">Monthly Performance</div>
              <div className="section-sub">Commission earned vs completed payouts</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyData} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(21,32,29,.06)" />
              <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="earned" name="Earned" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="payouts" name="Payouts" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="card card-flat">
          <div className="section-header">
            <div>
              <div className="section-title">Earnings Breakdown</div>
              <div className="section-sub">Lifetime — how every cedi is classified</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={breakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                  {breakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, minWidth: 180 }}>
              {breakdown.map((b) => (
                <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: b.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 12, color: 'var(--text-secondary)' }}>{b.name}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13 }}>{ghs(b.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={item} className="card card-flat" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="section-header" style={{ padding: '20px 24px 0' }}>
          <div>
            <div className="section-title">Transaction Ledger</div>
            <div className="section-sub">{rangeLabel[range]} · {filteredTx.length} entries</div>
          </div>
          <button type="button" className="btn btn-ghost btn-sm" onClick={exportStatement}>
            <Download size={14} /> Export CSV
          </button>
        </div>
        <div className="table-scroll" style={{ marginTop: 12 }}>
          <table className="table table-card">
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
              {filteredTx.map((t) => {
                const pill = typePill(t)
                return (
                  <tr key={t.id}>
                    <td data-label="Date" style={{ color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{formatDate(t.date)}</td>
                    <td data-label="Type"><span className={`pill ${pill.cls}`}>{pill.label}</span></td>
                    <td data-label="Description" style={{ fontWeight: 500 }}>{t.desc}</td>
                    <td data-label="Reference" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)' }}>{t.ref}</td>
                    <td data-label="Amount" style={{ textAlign: 'right', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: t.amount > 0 ? 'var(--green)' : 'var(--red)' }}>
                      {t.amount > 0 ? '+' : '−'}{ghs(Math.abs(t.amount))}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
