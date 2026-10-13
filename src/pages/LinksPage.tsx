import { useState } from 'react'
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

const LINKS = [
  {
    id: '1',
    tour: 'Kakum Canopy Walkway',
    region: 'Central Region',
    image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=400&q=80',
    url: 'travioghana.com/tours/kakum?ref=TRV-AMA-8X4K',
    clicks: 312,
    bookings: 18,
    earned: 'GHS 2,340',
    commission: '15%',
    campaign: 'Summer Adventures',
    campaignColor: '#087747',
    active: true,
    trending: true,
    sparkline: [12, 18, 22, 28, 35, 42, 38, 45, 52, 48, 55, 62],
    conversion: 5.8,
  },
  {
    id: '2',
    tour: 'Mole National Park Safari',
    region: 'Savannah Region',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80',
    url: 'travioghana.com/tours/mole?ref=TRV-AMA-8X4K',
    clicks: 248,
    bookings: 12,
    earned: 'GHS 1,800',
    commission: '15%',
    campaign: 'Wild Ghana',
    campaignColor: '#e16e3f',
    active: true,
    trending: true,
    sparkline: [8, 12, 15, 22, 28, 25, 32, 38, 35, 42, 48, 52],
    conversion: 4.8,
  },
  {
    id: '3',
    tour: 'Cape Coast & Elmina Castles',
    region: 'Central Region',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400&q=80',
    url: 'travioghana.com/tours/cape-coast?ref=TRV-AMA-8X4K',
    clicks: 198,
    bookings: 9,
    earned: 'GHS 1,170',
    commission: '15%',
    campaign: 'Heritage Trail',
    campaignColor: '#3463e8',
    active: true,
    trending: false,
    sparkline: [15, 18, 14, 22, 19, 25, 22, 28, 24, 30, 28, 32],
    conversion: 4.5,
  },
  {
    id: '4',
    tour: 'Boti Falls & Aburi Gardens',
    region: 'Eastern Region',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
    url: 'travioghana.com/tours/boti?ref=TRV-AMA-8X4K',
    clicks: 87,
    bookings: 4,
    earned: 'GHS 560',
    commission: '15%',
    campaign: 'Nature Escape',
    campaignColor: '#c75c3d',
    active: false,
    trending: false,
    sparkline: [5, 8, 6, 10, 8, 12, 10, 8, 6, 4, 3, 2],
    conversion: 4.6,
  },
]

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
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * (height - 4) - 2
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polyline points={`0,${height} ${points} ${width},${height}`} fill={`url(#spark-${color.replace('#', '')})`} stroke="none" />
      <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LinkCard({ link }: { link: typeof LINKS[0] }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(link.url).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -2 }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-xl)',
        overflow: 'hidden',
        transition: 'box-shadow 0.25s var(--ease)',
      }}
    >
      {/* ── Main content: thumbnail left, info right ── */}
      <div style={{ display: 'flex', gap: 16, padding: '20px 20px 16px' }}>
        {/* Square tour thumbnail */}
        <div style={{
          width: 88,
          height: 88,
          borderRadius: 'var(--r-lg)',
          overflow: 'hidden',
          flexShrink: 0,
          border: '1px solid var(--border-soft)',
        }}>
          <img
            src={link.image}
            alt={link.tour}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '-.02em',
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {link.tour}
              </h3>
              {link.trending && (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 3,
                  padding: '2px 7px',
                  borderRadius: 'var(--r-pill)',
                  background: 'var(--orange-bg)',
                  color: 'var(--orange)',
                  fontSize: 9,
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  flexShrink: 0,
                }}>
                  <Flame size={9} /> HOT
                </span>
              )}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 8 }}>
              {link.region}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                padding: '2px 8px',
                borderRadius: 'var(--r-pill)',
                background: link.campaignColor + '18',
                color: link.campaignColor,
                fontSize: 10,
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
              }}>
                {link.campaign}
              </span>
              <span className={`pill ${link.active ? 'pill-success' : 'pill-neutral'}`} style={{ fontSize: 9 }}>
                {link.active ? 'Active' : 'Disabled'}
              </span>
            </div>
          </div>

          {/* Sparkline */}
          <div style={{ marginTop: 10 }}>
            <MiniSparkline data={link.sparkline} color={link.campaignColor} width={180} height={28} />
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        padding: '0 20px 16px',
      }}>
        {[
          { icon: MousePointerClick, label: 'Clicks', value: link.clicks.toLocaleString() },
          { icon: CalendarDays, label: 'Bookings', value: link.bookings.toString() },
          { icon: Wallet, label: 'Earned', value: link.earned },
          { icon: TrendingUp, label: 'Conv.', value: `${link.conversion}%` },
        ].map((s, i) => (
          <div key={s.label} style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            padding: '10px 0',
            borderRight: i < 3 ? '1px solid var(--border-soft)' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <s.icon size={12} color="var(--text-tertiary)" />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 14,
                color: s.label === 'Earned' ? 'var(--green)' : 'var(--text-primary)',
                letterSpacing: '-.02em',
              }}>
                {s.value}
              </span>
            </div>
            <span style={{
              fontSize: 9,
              fontWeight: 700,
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '.08em',
            }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── URL + Actions ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 20px',
        borderTop: '1px solid var(--border-soft)',
        background: 'var(--bg-hover)',
      }}>
        <Link2 size={13} color="var(--text-tertiary)" style={{ flexShrink: 0 }} />
        <div style={{
          flex: 1,
          fontFamily: 'ui-monospace, monospace',
          fontSize: 11,
          color: 'var(--text-tertiary)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {link.url}
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 12px',
            borderRadius: 'var(--r-sm)',
            fontSize: 11,
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            background: copied ? 'var(--green-bg)' : 'var(--green)',
            color: copied ? 'var(--green-dark)' : '#fff',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
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
            style={{
              width: 30,
              height: 30,
              borderRadius: 'var(--r-sm)',
              display: 'grid',
              placeItems: 'center',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              flexShrink: 0,
            }}
          >
            <a.icon size={13} />
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default function LinksPage() {
  const [copiedCode, setCopiedCode] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('TRV-AMA-8X4K').catch(() => {})
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* ── Header ── */}
      <motion.div variants={item} className="page-header">
        <div>
          <h1>Referral Links</h1>
          <p>Share your links, track performance, and earn on every booking.</p>
        </div>
        <button type="button" className="btn btn-primary btn-lg">
          <Plus size={18} /> Generate New Link
        </button>
      </motion.div>

      {/* ── Referral code hero ── */}
      <motion.div
        variants={item}
        style={{
          position: 'relative',
          borderRadius: 'var(--r-2xl)',
          overflow: 'hidden',
          marginBottom: 24,
          background: 'linear-gradient(135deg, #075634 0%, #087747 50%, #1b674c 100%)',
          padding: '32px 36px',
          color: '#fff',
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
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 32, fontWeight: 800, letterSpacing: '.12em', lineHeight: 1 }}>
              TRV-AMA-8X4K
            </div>
            <div style={{ fontSize: 13, opacity: .7, marginTop: 8 }}>
              Earn 15% commission on every confirmed booking through your links.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={handleCopyCode}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 22px',
                borderRadius: 'var(--r-pill)',
                background: copiedCode ? 'rgba(216,246,118,.2)' : '#fff',
                color: copiedCode ? 'var(--lime)' : '#15201d',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 13,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {copiedCode ? <><CheckCircle2 size={15} /> Copied!</> : <><Copy size={15} /> Copy Code</>}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 22px',
                borderRadius: 'var(--r-pill)',
                background: 'rgba(255,255,255,.12)',
                color: '#fff',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 13,
                border: '1px solid rgba(255,255,255,.2)',
                cursor: 'pointer',
              }}
            >
              <QrCode size={15} /> QR Code
            </motion.button>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 28, marginTop: 20, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,.12)' }}>
          {[
            { label: 'Total Clicks', value: '845', icon: MousePointerClick },
            { label: 'Bookings', value: '43', icon: CalendarDays },
            { label: 'Total Earned', value: 'GHS 5,870', icon: Wallet },
            { label: 'Avg Conv.', value: '5.1%', icon: TrendingUp },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,.12)', display: 'grid', placeItems: 'center' }}>
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

      {/* ── Link cards (horizontal layout) ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {LINKS.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>

      {/* ── Empty state ── */}
      {LINKS.length === 0 && (
        <motion.div variants={item} className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <Link2 size={48} color="var(--text-tertiary)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No links yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>Generate your first referral link to start earning.</p>
          <button type="button" className="btn btn-primary">
            <Plus size={18} /> Generate Your First Link
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
