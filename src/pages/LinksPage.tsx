import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Copy,
  QrCode,
  BarChart3,
  Plus,
  Link2,
  CheckCircle2,
  Share2,
  TrendingUp,
  MousePointerClick,
  CalendarDays,
  Wallet,
  Flame,
  Sparkles,
} from 'lucide-react'
import { useStore } from '../store/store'
import { selectLinksSummary, selectTotalBookings } from '../store/selectors'
import { ghs, formatNumber } from '../lib/format'
import StatusBadge from '../components/ui/StatusBadge'
import TourImage from '../components/ui/TourImage'

const stagger = { show: { transition: { staggerChildren: 0.08 } } }
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.3, 0.8, 0.4, 1] as const } },
}

function MiniSparkline({ data, color, width = 120, height = 32 }: {
  data: number[]
  color: string
  width?: number
  height?: number
}) {
  if (!data.length) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * (height - 4) - 2
    return `${x},${y}`
  }).join(' ')
  const gid = `spark-${color.replace('#', '')}-${width}`
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polyline points={`0,${height} ${points} ${width},${height}`} fill={`url(#${gid})`} stroke="none" />
      <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface DerivedLink {
  id: string
  tour: string
  region: string
  image: string
  url: string
  clicks: number
  bookings: number
  earned: number
  commissionRate: number
  campaign: string
  campaignColor: string
  status: 'active' | 'disabled' | 'expired'
  trending: boolean
  sparkline: number[]
  conversion: number
}

function LinkCard({ link }: { link: DerivedLink }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const handleCopy = () => {
    navigator.clipboard?.writeText(link.url).then(
      () => {
        setCopied(true)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setCopied(false), 2000)
      },
      () => {}
    )
  }

  const isActive = link.status === 'active'

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -2 }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-xl)',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', gap: 16, padding: '20px 20px 16px' }}>
        <TourImage
          src={link.image}
          alt={link.tour}
          style={{ width: 88, height: 88, borderRadius: 'var(--r-lg)', objectFit: 'cover', flexShrink: 0, border: '1px solid var(--border-soft)' }}
        />

        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, letterSpacing: '-.02em',
                color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {link.tour}
              </h3>
              {link.trending && (
                <span className="pill pill-info" style={{ fontSize: 9, flexShrink: 0 }}>
                  <Flame size={9} /> HOT
                </span>
              )}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 8 }}>{link.region}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{
                padding: '2px 8px', borderRadius: 'var(--r-pill)',
                background: link.campaignColor + '18', color: link.campaignColor,
                fontSize: 10, fontWeight: 800, fontFamily: 'var(--font-display)',
              }}>
                {link.campaign}
              </span>
              <StatusBadge status={link.status} />
            </div>
          </div>

          <div style={{ marginTop: 10 }}>
            <MiniSparkline data={link.sparkline} color={link.campaignColor} width={180} height={28} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px 16px', overflowX: 'auto' }}>
        {[
          { icon: MousePointerClick, label: 'Clicks', value: formatNumber(link.clicks), green: false },
          { icon: CalendarDays, label: 'Bookings', value: String(link.bookings), green: false },
          { icon: Wallet, label: 'Earned', value: ghs(link.earned), green: true },
          { icon: TrendingUp, label: 'Conv.', value: `${link.conversion}%`, green: false },
        ].map((s, i) => (
          <div key={s.label} style={{
            flex: 1, minWidth: 72, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '10px 0', borderRight: i < 3 ? '1px solid var(--border-soft)' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <s.icon size={12} color="var(--text-tertiary)" />
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14,
                color: s.green ? 'var(--green)' : 'var(--text-primary)', letterSpacing: '-.02em',
              }}>
                {s.value}
              </span>
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px',
        borderTop: '1px solid var(--border-soft)', background: 'var(--bg-hover)', flexWrap: 'wrap',
      }}>
        <Link2 size={13} color="var(--text-tertiary)" style={{ flexShrink: 0 }} />
        <div style={{
          flex: 1, minWidth: 120, fontFamily: 'ui-monospace, monospace', fontSize: 11,
          color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {link.url}
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={handleCopy}
          style={{
            display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 'var(--r-sm)',
            fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-display)',
            background: copied ? 'var(--green-bg)' : 'var(--green)', color: copied ? 'var(--green-dark)' : '#fff',
            border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
          }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span key="c" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <CheckCircle2 size={12} /> Copied
              </motion.span>
            ) : (
              <motion.span key="d" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Copy size={12} /> Copy
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {[
          { icon: QrCode, label: 'QR' },
          { icon: Share2, label: 'Share' },
          { icon: BarChart3, label: 'Stats' },
        ].map((a) => (
          <motion.button
            whileTap={{ scale: 0.92 }}
            key={a.label}
            type="button"
            title={a.label}
            data-wired="pending"
            disabled={!isActive && a.label === 'QR'}
            style={{
              width: 30, height: 30, borderRadius: 'var(--r-sm)', display: 'grid', placeItems: 'center',
              background: 'var(--bg-surface)', border: '1px solid var(--border)', cursor: 'pointer',
              color: 'var(--text-secondary)', flexShrink: 0,
            }}
          >
            <a.icon size={13} />
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

// Campaign colours stay inside the approved palette (green / terracotta / amber / neutral).
const CAMPAIGN_COLORS = ['#087747', '#e16e3f', '#b45309', '#6b7280']
const campaignColor = (i: number) => CAMPAIGN_COLORS[i % CAMPAIGN_COLORS.length]

export default function LinksPage() {
  const { state } = useStore()
  const summary = useMemo(() => selectLinksSummary(state), [state])
  const totalBookings = useMemo(() => selectTotalBookings(state), [state])

  const derived: DerivedLink[] = useMemo(
    () =>
      state.links.map((l, i) => {
        const tour = state.tours.find((t) => t.id === l.tourId)
        const linkBookings = state.bookings.filter((b) => b.linkId === l.id && b.status !== 'cancelled')
        const bookings = linkBookings.length
        const earned = linkBookings.reduce((s, b) => s + b.commission, 0)
        return {
          id: l.id,
          tour: tour?.title ?? 'Tour',
          region: tour?.region ?? '',
          image: tour?.image ?? '',
          url: l.url.replace(/^https?:\/\//, ''),
          clicks: l.clicks,
          bookings,
          earned,
          commissionRate: tour?.commissionRate ?? 15,
          campaign: l.campaign,
          campaignColor: campaignColor(i),
          status: l.status,
          trending: tour?.trending ?? false,
          sparkline: l.sparkline,
          conversion: l.clicks ? Math.round((bookings / l.clicks) * 1000) / 10 : 0,
        }
      }),
    [state]
  )

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={item} className="page-header">
        <div>
          <h1>Referral Links</h1>
          <p>Share your links, track performance, and earn on every booking.</p>
        </div>
        <button type="button" className="btn btn-primary btn-lg" data-wired="pending">
          <Plus size={18} /> Generate New Link
        </button>
      </motion.div>

      {/* ── Referral code hero ── */}
      <motion.div
        variants={item}
        style={{
          position: 'relative', borderRadius: 'var(--r-2xl)', overflow: 'hidden', marginBottom: 24,
          background: 'linear-gradient(135deg, #075634 0%, #087747 50%, #1b674c 100%)',
          padding: '32px 36px', color: '#fff',
        }}
      >
        <div style={{ position: 'absolute', right: -30, top: -30, width: 160, height: 160, borderRadius: '50%', border: '1px solid rgba(255,255,255,.1)' }} />
        <div style={{ position: 'absolute', right: 50, bottom: -50, width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(255,255,255,.08)' }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Sparkles size={14} color="var(--lime)" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.12em', opacity: .7 }}>
                Your Referral Code
              </span>
            </div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 32, fontWeight: 800, letterSpacing: '.12em', lineHeight: 1, wordBreak: 'break-all' }}>
              {state.profile.referralCode}
            </div>
            <div style={{ fontSize: 13, opacity: .7, marginTop: 8 }}>
              Earn 15% commission on every confirmed booking through your links.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              data-wired="pending"
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 'var(--r-pill)',
                background: '#fff', color: '#15201d', fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 13, border: 'none', cursor: 'pointer',
              }}
            >
              <Copy size={15} /> Copy Code
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              data-wired="pending"
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 'var(--r-pill)',
                background: 'rgba(255,255,255,.12)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 13, border: '1px solid rgba(255,255,255,.2)', cursor: 'pointer',
              }}
            >
              <QrCode size={15} /> QR Code
            </motion.button>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 28, marginTop: 20, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,.12)', flexWrap: 'wrap' }}>
          {[
            { label: 'Total clicks', value: formatNumber(summary.totalClicks), icon: MousePointerClick },
            { label: 'Bookings', value: String(totalBookings), icon: CalendarDays },
            { label: 'Commission via links', value: ghs(summary.linkCommission), icon: Wallet },
            { label: 'Avg conv.', value: `${summary.avgConv}%`, icon: TrendingUp },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 'var(--r-sm)', background: 'rgba(255,255,255,.12)', display: 'grid', placeItems: 'center' }}>
                <s.icon size={14} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>{s.value}</div>
                <div style={{ fontSize: 9, fontWeight: 700, opacity: .6, textTransform: 'uppercase', letterSpacing: '.08em' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {derived.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>

      {derived.length === 0 && (
        <motion.div variants={item} className="card card-flat" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <Link2 size={48} color="var(--text-tertiary)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No links yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>Generate your first referral link to start earning.</p>
          <button type="button" className="btn btn-primary" data-wired="pending">
            <Plus size={18} /> Generate Your First Link
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
