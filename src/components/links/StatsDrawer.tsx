import { useMemo } from 'react'
import { MousePointerClick, CalendarDays, TrendingUp, Wallet, Ban, PlayCircle } from 'lucide-react'
import { toast } from 'sonner'
import Drawer from '../ui/Drawer'
import StatusBadge from '../ui/StatusBadge'
import EmptyState from '../ui/EmptyState'
import { useStore } from '../../store/store'
import { ghs, formatNumber, formatDate } from '../../lib/format'

interface Props {
  open: boolean
  onClose: () => void
  linkId: string | null
}

const MONTHS = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']

export default function StatsDrawer({ open, onClose, linkId }: Props) {
  const { state, dispatch } = useStore()

  const link = useMemo(() => state.links.find((l) => l.id === linkId) ?? null, [state.links, linkId])
  const tour = useMemo(() => state.tours.find((t) => t.id === link?.tourId) ?? null, [state.tours, link])

  const bookings = useMemo(
    () => state.bookings.filter((b) => b.linkId === linkId).sort((a, b) => (a.date < b.date ? 1 : -1)),
    [state.bookings, linkId]
  )
  const valid = bookings.filter((b) => b.status !== 'cancelled')
  const earned = valid.reduce((s, b) => s + b.commission, 0)
  const conversion = link && link.clicks ? Math.round((valid.length / link.clicks) * 1000) / 10 : 0

  // Only show the months the link was actually live (createdAt month onward).
  const monthly = useMemo(() => {
    if (!link) return []
    const data = link.monthlyClicks ?? new Array(6).fill(0)
    const createdMonth = link.createdAt.slice(0, 7)
    return data.map((v, i) => ({ label: MONTHS[i], value: v, key: `2026-${String(5 + i).padStart(2, '0')}`, live: createdMonth <= `2026-${String(5 + i).padStart(2, '0')}` }))
  }, [link])

  if (!link || !tour) {
    return (
      <Drawer open={open} onClose={onClose} title="Link Stats">
        <EmptyState title="No link selected" description="Pick a link to see its performance." />
      </Drawer>
    )
  }

  const maxMonthly = Math.max(1, ...monthly.map((m) => m.value))
  const isExpired = link.status === 'expired'

  const kpis = [
    { label: 'Clicks', value: formatNumber(link.clicks), icon: MousePointerClick },
    { label: 'Bookings', value: String(valid.length), icon: CalendarDays },
    { label: 'Earned', value: ghs(earned), icon: Wallet },
    { label: 'Conv.', value: `${conversion}%`, icon: TrendingUp },
  ]

  return (
    <Drawer open={open} onClose={onClose} title="Link Stats" width={420}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>{tour.title}</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{link.code}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              <StatusBadge status={link.status} />
              <span style={{ padding: '2px 8px', borderRadius: 'var(--r-pill)', background: link.campaignColor + '18', color: link.campaignColor, fontSize: 10, fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                {link.campaign}
              </span>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {kpis.map((k) => (
            <div key={k.label} style={{ padding: 14, background: 'var(--bg-paper)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-soft)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-tertiary)' }}>
                <k.icon size={12} /> {k.label}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, marginTop: 6, letterSpacing: '-.02em' }}>{k.value}</div>
            </div>
          ))}
        </div>

        {/* Monthly clicks bar chart */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 10 }}>
            Clicks by month
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 96 }}>
            {monthly.map((m) => (
              <div key={m.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: m.live ? 'var(--text-secondary)' : 'var(--text-tertiary)' }}>{m.live ? m.value : '—'}</div>
                <div
                  title={`${m.label}: ${m.value} clicks`}
                  style={{
                    width: '100%', height: m.live ? Math.max(3, (m.value / maxMonthly) * 64) : 3,
                    background: m.live ? 'var(--chart-1)' : 'var(--bg-hover)',
                    borderRadius: 'var(--r-sm)', transition: 'height .3s var(--ease)',
                  }}
                />
                <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-tertiary)' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent bookings */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 10 }}>
            Bookings ({bookings.length})
          </div>
          {bookings.length === 0 && (
            <div style={{ fontSize: 13, color: 'var(--text-tertiary)', padding: '12px 0' }}>No bookings yet. Share this link to get started.</div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {bookings.slice(0, 8).map((b, i) => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '10px 0', borderBottom: i < Math.min(bookings.length, 8) - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{b.ref}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{formatDate(b.date)} · {b.guests} guest{b.guests > 1 ? 's' : ''}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: b.status === 'cancelled' ? 'var(--text-tertiary)' : 'var(--green)', textDecoration: b.status === 'cancelled' ? 'line-through' : 'none' }}>
                    {ghs(b.commission)}
                  </div>
                  <StatusBadge status={b.status as 'confirmed' | 'pending' | 'cancelled'} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Toggle */}
        {!isExpired && (
          <button
            type="button"
            className={`btn ${link.status === 'active' ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => {
              dispatch({ type: 'link/toggle', id: link.id })
              toast.success(link.status === 'active' ? 'Link paused' : 'Link reactivated')
            }}
          >
            {link.status === 'active' ? <Ban size={15} /> : <PlayCircle size={15} />}
            {link.status === 'active' ? 'Pause this link' : 'Reactivate link'}
          </button>
        )}
        {isExpired && (
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', textAlign: 'center' }}>
            This link expired on {link.expiresAt ? formatDate(link.expiresAt) : 'an earlier date'}.
          </div>
        )}
      </div>
    </Drawer>
  )
}
