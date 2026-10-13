import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Copy,
  QrCode,
  BarChart3,
  Ban,
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

function MiniSparkline({ data, color, width = 120, height = 36 }: {
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
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polyline points={`0,${height} ${points} ${width},${height}`} fill={`url(#spark-${color.replace('#', '')})`} stroke="none" />
      <polyline points={points} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LinkCard({ link, onCopy }: { link: typeof LINKS[0]; onCopy: (url: string) => void }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    onCopy(link.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -4 }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-2xl)',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s',
      }}
    >
      {/* Top strip with tour image */}
      <div style={{ position: 'relative', height: 120, overflow: 'hidden' }}>
        <img src={link.image} alt={link.tour} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,.6))' }} />
        <div style={{ position: 'absolute', bottom: 12, left: 16, right: 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.3)' }}>
              {link.tour}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <span style={{
                padding: '2px 8px',
                borderRadius: 'var(--r-pill)',
                background: link.campaignColor,
                color: '#fff',
                fontSize: 10,
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
              }}>
                {link.campaign}
              </span>
              {link.trending && (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  padding: '2px 8px',
                  borderRadius: 'var(--r-pill)',
                  background: 'rgba(225,110,63,.9)',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 800,
                }}>
                  <Flame size={10} /> Trending
                </span>
              )}
            </div>
          </div>
          <span className={`pill ${link.active ? 'pill-success' : 'pill-neutral'}`} style={{ background: link.active ? 'rgba(16,185,129,.9)' : 'rgba(255,255,255,.2)', color: '#fff' }}>
            {link.active ? 'Active' : 'Disabled'}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderBottom: '1px solid var(--border-soft)' }}>
        {[
          { icon: MousePointerClick, label: 'Clicks', value: link.clicks, color: 'var(--text-primary)' },
          { icon: CalendarDays, label: 'Bookings', value: link.bookings, color: 'var(--green)' },
          { icon: Wallet, label: 'Earned', value: link.earned, color: 'var(--green)' },
          { icon: TrendingUp, label: 'Conv.', value: `${link.conversion}%`, color: 'var(--text-primary)' },
        ].map((s) => (
          <div key={s.label} style={{ padding: '14px 16px', textAlign: 'center', borderRight: '1px solid var(--border-soft)' }}>
            <s.icon size={14} color="var(--text-tertiary)" style={{ margin: '0 auto 4px' }} />
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: s.color, letterSpacing: '-.02em' }}>
              {s.value}
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 2 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Sparkline + URL */}
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {link.url}
          </div>
          <div style={{ marginTop: 8 }}>
            <MiniSparkline data={link.sparkline} color={link.campaignColor} width={200} height={32} />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 6, padding: '12px 16px', borderTop: '1px solid var(--border-soft)', background: 'var(--bg-hover)' }}>
        <button
          type="button"
          onClick={handleCopy}
          className="btn btn-sm"
          style={{
            flex: 1,
            background: copied ? 'var(--green-bg)' : 'var(--green)',
            color: copied ? 'var(--green-dark)' : '#fff',
            transition: 'all 0.2s',
          }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span key="copied" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={14} /> Copied!
              </motion.span>
            ) : (
              <motion.span key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Copy size={14} /> Copy Link
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <button type="button" className="btn btn-ghost btn-sm" style={{ padding: '6px 10px' }} title="QR Code">
          <QrCode size={15} />
        </button>
        <button type="button" className="btn btn-ghost btn-sm" style={{ padding: '6px 10px' }} title="Share">
          <Share2 size={15} />
        </button>
        <button type="button" className="btn btn-ghost btn-sm" style={{ padding: '6px 10px' }} title="Analytics">
          <BarChart3 size={15} />
        </button>
        <button type="button" className="btn btn-ghost btn-sm" style={{ padding: '6px 10px', color: link.active ? 'var(--red)' : 'var(--green)' }} title={link.active ? 'Disable' : 'Enable'}>
          <Ban size={15} />
        </button>
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

      {/* ── Referral code hero banner ── */}
      <motion.div
        variants={item}
        style={{
          position: 'relative',
          borderRadius: 'var(--r-3xl)',
          overflow: 'hidden',
          marginBottom: 24,
          background: 'linear-gradient(135deg, #075634 0%, #087747 50%, #1b674c 100%)',
          padding: '36px 40px',
          color: '#fff',
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,.1)' }} />
        <div style={{ position: 'absolute', right: 60, bottom: -60, width: 160, height: 160, borderRadius: '50%', border: '1px solid rgba(255,255,255,.08)' }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Sparkles size={16} color="var(--lime)" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.12em', opacity: .7 }}>
                Your Referral Code
              </span>
            </div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 36, fontWeight: 800, letterSpacing: '.12em', lineHeight: 1 }}>
              TRV-AMA-8X4K
            </div>
            <div style={{ fontSize: 13, opacity: .7, marginTop: 10 }}>
              Share this code or any link below. Earn 15% on every confirmed booking.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={handleCopyCode}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 24px',
                borderRadius: 'var(--r-pill)',
                background: copiedCode ? 'rgba(216,246,118,.2)' : '#fff',
                color: copiedCode ? 'var(--lime)' : 'var(--ink, #15201d)',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {copiedCode ? <><CheckCircle2 size={16} /> Copied!</> : <><Copy size={16} /> Copy Code</>}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 24px',
                borderRadius: 'var(--r-pill)',
                background: 'rgba(255,255,255,.12)',
                color: '#fff',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 14,
                border: '1px solid rgba(255,255,255,.2)',
                cursor: 'pointer',
              }}
            >
              <QrCode size={16} /> QR Code
            </motion.button>
          </div>
        </div>

        {/* Mini stats strip */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 32, marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.12)' }}>
          {[
            { label: 'Total Clicks', value: '845', icon: MousePointerClick },
            { label: 'Bookings', value: '43', icon: CalendarDays },
            { label: 'Total Earned', value: 'GHS 5,870', icon: Wallet },
            { label: 'Avg Conv.', value: '5.1%', icon: TrendingUp },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,.12)', display: 'grid', placeItems: 'center' }}>
                <s.icon size={16} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18 }}>{s.value}</div>
                <div style={{ fontSize: 10, fontWeight: 700, opacity: .6, textTransform: 'uppercase', letterSpacing: '.08em' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Link cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
        {LINKS.map((link) => (
          <LinkCard key={link.id} link={link} onCopy={() => {}} />
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
