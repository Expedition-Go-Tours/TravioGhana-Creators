import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Download,
  CalendarDays,
  Users,
  Wallet,
  TrendingUp,
  ChevronDown,
  Clock,
  CheckCircle2,
  MapPin,
} from 'lucide-react'
import { useStore } from '../store/store'
import { selectOverviewKpis } from '../store/selectors'
import { ghs, formatNumber, formatDate, downloadCsv } from '../lib/format'
import StatusBadge from '../components/ui/StatusBadge'
import Kpi from '../components/ui/Kpi'
import TourImage from '../components/ui/TourImage'
import EmptyState from '../components/ui/EmptyState'
import type { Booking } from '../store/types'

const STATUS_FILTERS = ['All', 'Confirmed', 'Pending', 'Cancelled']

const stagger = { show: { transition: { staggerChildren: 0.06 } } }
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.3, 0.8, 0.4, 1] as const } },
}

interface Row {
  booking: Booking
  tour: string
  region: string
  image: string
  commissionRate: number
}

function BookingRow({ row, expanded, onToggle }: {
  row: Row
  expanded: boolean
  onToggle: () => void
}) {
  const { booking } = row
  const reversed = booking.status === 'cancelled'
  return (
    <motion.div
      variants={item}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-xl)',
        overflow: 'hidden',
      }}
    >
      <div
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
        style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', cursor: 'pointer', flexWrap: 'wrap' }}
      >
        <TourImage src={row.image} alt="" style={{ width: 56, height: 56, borderRadius: 'var(--r-md)', objectFit: 'cover', flexShrink: 0, border: '1px solid var(--border-soft)' }} />

        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {row.tour}
            </span>
            <StatusBadge status={booking.status} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4, fontSize: 11, color: 'var(--text-tertiary)', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace' }}>{booking.ref}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={10} /> {row.region}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Users size={10} /> {booking.guests} guests</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><CalendarDays size={10} /> {formatDate(booking.date)}</span>
          </div>
        </div>

        <div style={{ padding: '3px 10px', borderRadius: 'var(--r-pill)', background: 'var(--bg-paper)', fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>
          {booking.source}
        </div>

        <div style={{ textAlign: 'right', minWidth: 110 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, letterSpacing: '-.02em' }}>
            {ghs(booking.amount)}
          </div>
          <div style={{ fontSize: 11, color: reversed ? 'var(--text-tertiary)' : 'var(--green)', fontWeight: 700, marginTop: 2 }}>
            {reversed ? 'Reversed' : `+${ghs(booking.commission)} comm.`}
          </div>
        </div>

        <ChevronDown size={18} color="var(--text-tertiary)" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
      </div>

      {expanded && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ borderTop: '1px solid var(--border-soft)', background: 'var(--bg-hover)' }}>
          <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 12 }}>
                Booking Timeline
              </div>
              {[
                { label: 'Referral click', time: formatDate(booking.date), done: true },
                { label: 'Booking created', time: formatDate(booking.date), done: true },
                { label: 'Payment confirmed', time: booking.status === 'pending' || reversed ? '—' : formatDate(booking.date), done: booking.status !== 'pending' && !reversed },
                { label: 'Commission earned', time: reversed || booking.commissionStatus === 'pending' ? '—' : formatDate(booking.date), done: !reversed && booking.commissionStatus !== 'pending' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: step.done ? 'var(--green)' : 'var(--bg-paper)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    {step.done ? <CheckCircle2 size={12} color="#fff" /> : <Clock size={10} color="var(--text-tertiary)" />}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: step.done ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{step.label}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{step.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 12 }}>
                Commission Breakdown
              </div>
              {[
                { label: 'Booking value', value: ghs(booking.amount) },
                { label: 'Commission rate', value: `${row.commissionRate}%` },
                { label: 'Your commission', value: ghs(booking.commission) },
                {
                  label: 'Status',
                  value: reversed ? 'Reversed' : booking.commissionStatus.charAt(0).toUpperCase() + booking.commissionStatus.slice(1),
                },
              ].map((r) => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '6px 0', borderBottom: '1px solid var(--border-soft)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{r.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-display)' }}>{r.value}</span>
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 12 }}>
                Booking Details
              </div>
              {[
                { label: 'Guest count', value: `${booking.guests} guests` },
                { label: 'Tour rating', value: booking.rating > 0 ? `★ ${booking.rating}` : 'Not rated' },
                { label: 'Attribution source', value: booking.source },
                { label: 'Booking reference', value: booking.ref },
              ].map((r) => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '6px 0', borderBottom: '1px solid var(--border-soft)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{r.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-display)', textAlign: 'right' }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function BookingsPage() {
  const { state } = useStore()
  const [statusFilter, setStatusFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const kpis = useMemo(() => selectOverviewKpis(state), [state])

  const rows: Row[] = useMemo(
    () =>
      [...state.bookings]
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .map((b) => {
          const tour = state.tours.find((t) => t.id === b.tourId)
          return {
            booking: b,
            tour: tour?.title ?? 'Tour',
            region: tour?.region ?? '',
            image: tour?.image ?? '',
            commissionRate: tour?.commissionRate ?? 15,
          }
        }),
    [state]
  )

  const filtered = useMemo(() => {
    let result = rows
    if (statusFilter !== 'All') result = result.filter((r) => r.booking.status === statusFilter.toLowerCase())
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((r) => r.tour.toLowerCase().includes(q) || r.booking.ref.toLowerCase().includes(q))
    }
    return result
  }, [rows, statusFilter, search])

  // Stats respect the active filter (single source of truth = `filtered`)
  const stats = useMemo(() => {
    const valid = filtered.filter((r) => r.booking.status !== 'cancelled')
    const revenue = valid.reduce((s, r) => s + r.booking.amount, 0)
    const commission = valid.reduce((s, r) => s + r.booking.commission, 0)
    const guests = filtered.reduce((s, r) => s + r.booking.guests, 0)
    return {
      count: filtered.length,
      revenue,
      commission,
      avgGuests: filtered.length ? Math.round((guests / filtered.length) * 10) / 10 : 0,
    }
  }, [filtered])

  const filtersActive = statusFilter !== 'All' || search.trim() !== ''
  const period = filtersActive ? 'filtered selection' : kpis.periodLabel

  const exportCsv = () => {
    downloadCsv(
      `travio-bookings-${new Date().toISOString().slice(0, 10)}.csv`,
      filtered.map((r) => ({
        Reference: r.booking.ref,
        Date: r.booking.date,
        Tour: r.tour,
        Region: r.region,
        Guests: r.booking.guests,
        Amount: r.booking.amount,
        Commission: r.booking.commission,
        Status: r.booking.status,
        CommissionStatus: r.booking.commissionStatus,
        Source: r.booking.source,
      })),
      ['Reference', 'Date', 'Tour', 'Region', 'Guests', 'Amount', 'Commission', 'Status', 'CommissionStatus', 'Source']
    )
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={item} className="page-header">
        <div>
          <h1>Bookings</h1>
          <p>Track bookings attributed to your referral links.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={exportCsv} disabled={filtered.length === 0}>
          <Download size={16} /> Export CSV
        </button>
      </motion.div>

      <div className="stat-grid">
        <motion.div variants={item}>
          <Kpi icon={<CalendarDays size={18} />} label="Bookings shown" value={stats.count} delta={filtersActive ? null : kpis.bookings.delta} period={period} />
        </motion.div>
        <motion.div variants={item}>
          <Kpi icon={<Wallet size={18} />} label="Attributed revenue" value={ghs(stats.revenue)} delta={filtersActive ? null : kpis.earned.delta} period={period} />
        </motion.div>
        <motion.div variants={item}>
          <Kpi icon={<TrendingUp size={18} />} label="Commission earned" value={ghs(stats.commission)} period={period} tone="mint" />
        </motion.div>
        <motion.div variants={item}>
          <Kpi icon={<Users size={18} />} label="Avg guests / booking" value={stats.avgGuests} period={period} />
        </motion.div>
      </div>

      <motion.div variants={item} className="card card-flat" style={{ padding: '14px 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: 300 }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input
              type="search"
              className="input"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 36, height: 38, fontSize: 13 }}
              aria-label="Search bookings"
            />
          </div>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setStatusFilter(f)}
                style={{
                  padding: '6px 14px', borderRadius: 'var(--r-pill)', fontSize: 12, fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  background: statusFilter === f ? 'var(--green)' : 'var(--bg-paper)',
                  color: statusFilter === f ? '#fff' : 'var(--text-secondary)',
                  border: '1px solid ' + (statusFilter === f ? 'var(--green)' : 'var(--border)'),
                  cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>
            {formatNumber(filtered.length)} booking{filtered.length === 1 ? '' : 's'}
          </span>
        </div>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((row) => (
          <BookingRow
            key={row.booking.id}
            row={row}
            expanded={expandedId === row.booking.id}
            onToggle={() => setExpandedId(expandedId === row.booking.id ? null : row.booking.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <motion.div variants={item} className="card card-flat">
          <EmptyState
            icon={<CalendarDays size={40} color="var(--text-tertiary)" />}
            title="No bookings found"
            description="Try adjusting your filters or share more referral links."
            action={
              filtersActive ? (
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setStatusFilter('All'); setSearch('') }}>
                  Clear filters
                </button>
              ) : undefined
            }
          />
        </motion.div>
      )}
    </motion.div>
  )
}
