import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  MousePointerClick,
  CalendarDays,
  Wallet,
  TrendingUp,
  ArrowRight,
  Link2,
  Compass,
  FileText,
  Star,
  Flame,
  ArrowUp,
  Banknote,
  Award,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
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
import {
  selectOverviewKpis,
  selectMonthlyEarned,
  selectMonthlyClicks,
} from '../store/selectors'
import { ghs, formatNumber } from '../lib/format'
import Kpi from '../components/ui/Kpi'
import StatusBadge from '../components/ui/StatusBadge'
import TourImage from '../components/ui/TourImage'
import type { ActivityItem } from '../store/types'

const ACTIVITY_ICONS: Record<ActivityItem['icon'], typeof CalendarDays> = {
  calendar: CalendarDays,
  trend: TrendingUp,
  star: Star,
  wallet: Wallet,
  click: MousePointerClick,
  award: Award,
}

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
          {p.name}: <strong style={{ color: 'var(--text-primary)' }}>{p.dataKey === 'earned' ? ghs(p.value) : formatNumber(p.value)}</strong>
        </div>
      ))}
    </div>
  )
}

export default function OverviewPage() {
  const { state } = useStore()
  const navigate = useNavigate()

  const kpis = useMemo(() => selectOverviewKpis(state), [state])

  const monthly = useMemo(() => {
    const earned = selectMonthlyEarned(state)
    const clicks = selectMonthlyClicks(state)
    return earned.map((m, i) => ({ month: m.label, earned: m.earned, clicks: clicks[i]?.clicks ?? 0 }))
  }, [state])

  const topTours = useMemo(() => {
    const rows = state.tours
      .map((t) => {
        const tourBookings = state.bookings.filter((b) => b.tourId === t.id && b.status !== 'cancelled')
        const clicks = state.links.filter((l) => l.tourId === t.id).reduce((s, l) => s + l.clicks, 0)
        return {
          ...t,
          bookings: tourBookings.length,
          clicks,
          earned: tourBookings.reduce((s, b) => s + b.commission, 0),
          mostBooked: false,
        }
      })
      .sort((a, b) => b.bookings - a.bookings || b.clicks - a.clicks)
      .slice(0, 4)
    if (rows[0]) rows[0].mostBooked = true
    return rows
  }, [state])

  const recentBookings = useMemo(
    () =>
      [...state.bookings]
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, 4)
        .map((b) => ({
          booking: b,
          tour: state.tours.find((t) => t.id === b.tourId),
        })),
    [state]
  )

  const hero = topTours[0]

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* ── Hero banner with tour imagery ── */}
      <motion.div variants={item} className="hero-banner">
        <div className="hero-banner-bg" style={{ backgroundImage: `url(${hero?.image ?? ''})` }} />
        <div className="hero-banner-overlay" />
        <div className="hero-banner-content">
          <div>
            <h1>Good morning, {state.profile.firstName} 👋</h1>
            <p>Your content is driving real bookings. Here's what's happening across your referral links.</p>
          </div>
          {hero && (
            <div className="hero-banner-tour">
              <TourImage className="hero-banner-tour-img" src={hero.image} alt={hero.title} />
              <div className="hero-banner-tour-info">
                <div className="hero-banner-tour-label">🔥 Your top tour this month</div>
                <div className="hero-banner-tour-name">{hero.title}</div>
                <div className="hero-banner-tour-stat">
                  {formatNumber(hero.clicks)} clicks · {hero.bookings} bookings · {ghs(hero.earned)} earned
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── KPI cards ── */}
      <div className="stat-grid">
        <motion.div variants={item}>
          <Kpi
            icon={<MousePointerClick size={18} />}
            label="Total clicks"
            value={formatNumber(kpis.clicks.value)}
            delta={kpis.clicks.delta}
            period={kpis.periodLabel}
            tone="green"
          />
        </motion.div>
        <motion.div variants={item}>
          <Kpi
            icon={<CalendarDays size={18} />}
            label="Bookings"
            value={kpis.bookings.value}
            delta={kpis.bookings.delta}
            period={kpis.periodLabel}
            tone="mint"
          />
        </motion.div>
        <motion.div variants={item}>
          <Kpi
            icon={<Wallet size={18} />}
            label="Total earned"
            value={ghs(kpis.earned.value)}
            delta={kpis.earned.delta}
            period={kpis.periodLabel}
          />
        </motion.div>
        <motion.div variants={item}>
          <Kpi
            icon={<Banknote size={18} />}
            label="Available now"
            value={ghs(kpis.available.value)}
            period={`min withdrawal ${ghs(state.profile.payoutPrefs?.minPayout ?? 500)}`}
            tone="orange"
          />
        </motion.div>
      </div>

      {/* ── Top Tours Leaderboard ── */}
      <motion.div variants={item} style={{ marginBottom: 24 }}>
        <div className="section-header">
          <div>
            <div className="section-title">Top Performing Tours</div>
            <div className="section-sub">Ranked by bookings generated</div>
          </div>
          <Link to="/creator/discover" className="btn btn-ghost btn-sm">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="card card-flat" style={{ padding: 0, overflow: 'hidden' }}>
          {topTours.map((tour, i) => (
            <div
              key={tour.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 20px',
                borderBottom: i < topTours.length - 1 ? '1px solid var(--border-soft)' : 'none',
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: i === 0 ? 'var(--green)' : i === 1 ? 'var(--green-bg)' : 'var(--bg-paper)',
                color: i === 0 ? '#fff' : i === 1 ? 'var(--green)' : 'var(--text-tertiary)',
                display: 'grid', placeItems: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12,
              }}>
                {i + 1}
              </div>

              <TourImage
                src={tour.image}
                alt=""
                style={{ width: 44, height: 44, borderRadius: 'var(--r-sm)', objectFit: 'cover', flexShrink: 0, border: '1px solid var(--border-soft)' }}
              />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {tour.title}
                  </span>
                  {tour.mostBooked && (
                    <span className="pill pill-success" style={{ fontSize: 9, flexShrink: 0 }}>
                      <Flame size={9} /> Most Booked
                    </span>
                  )}
                  {tour.trending && !tour.mostBooked && (
                    <span className="pill pill-info" style={{ fontSize: 9, flexShrink: 0 }}>
                      <ArrowUp size={9} /> Trending
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3, fontSize: 11, color: 'var(--text-tertiary)', flexWrap: 'wrap' }}>
                  <span>{tour.region}</span>
                  <span>·</span>
                  <span>★ {tour.rating}</span>
                  <span>·</span>
                  <span>{formatNumber(tour.clicks)} clicks</span>
                  <span>·</span>
                  <span>{tour.bookings} bookings</span>
                </div>
                <div style={{ marginTop: 6, height: 4, background: 'var(--bg-paper)', borderRadius: 2, overflow: 'hidden', maxWidth: 280 }}>
                  <div style={{
                    height: '100%', borderRadius: 2,
                    background: i === 0 ? 'var(--green)' : 'var(--green-bg)',
                    width: `${(tour.bookings / (topTours[0]?.bookings || 1)) * 100}%`,
                    transition: 'width 0.6s var(--ease)',
                  }} />
                </div>
              </div>

              <div style={{ textAlign: 'right', minWidth: 80, flexShrink: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: 'var(--green)', letterSpacing: '-.02em' }}>
                  {ghs(tour.earned)}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 600 }}>
                  {tour.commissionRate}% comm.
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                style={{ flexShrink: 0, padding: '6px 12px' }}
                onClick={() => navigate(`/creator/links?tour=${tour.id}`)}
              >
                <Link2 size={13} /> Get Link
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Charts + Activity ── */}
      <div className="grid-2">
        <motion.div variants={item} className="card card-flat">
          <div className="section-header">
            <div>
              <div className="section-title">Earnings Trend</div>
              <div className="section-sub">Monthly commission earned</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthly}>
              <defs>
                <linearGradient id="earnedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#087747" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#087747" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(21,32,29,.06)" />
              <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="earned" stroke="var(--chart-1)" strokeWidth={2} fill="url(#earnedGrad)" name="Earned" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="card card-flat">
          <div className="section-header">
            <div>
              <div className="section-title">Recent Activity</div>
              <div className="section-sub">Latest events</div>
            </div>
          </div>
          <div>
            {state.activity.map((a) => {
              const Icon = ACTIVITY_ICONS[a.icon] ?? CalendarDays
              return (
                <div key={a.id} className="activity-item">
                  <Icon size={16} color="var(--green)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div className="activity-content">
                    <div className="activity-text">{a.text}</div>
                    <div className="activity-time">{a.time}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* ── Recent Bookings + Quick Actions ── */}
      <div className="grid-2-equal">
        <motion.div variants={item} className="card card-flat" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="section-header" style={{ padding: '20px 24px 0' }}>
            <div>
              <div className="section-title">Recent Bookings</div>
              <div className="section-sub">Latest attributed bookings</div>
            </div>
            <Link to="/creator/bookings" className="btn btn-ghost btn-sm">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ padding: '0 24px 16px' }}>
            {recentBookings.map(({ booking, tour }) => (
              <div key={booking.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--border-soft)' }}>
                <TourImage
                  src={tour?.image ?? ''}
                  alt=""
                  style={{ width: 48, height: 48, borderRadius: 'var(--r-sm)', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {tour?.title ?? 'Tour'}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
                    {booking.ref} · {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14 }}>{ghs(booking.amount)}</div>
                  <div style={{ marginTop: 4 }}>
                    <StatusBadge status={booking.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="card card-flat">
          <div className="section-header">
            <div>
              <div className="section-title">Quick Actions</div>
              <div className="section-sub">Jump to common tasks</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { icon: Link2, title: 'Generate Link', desc: 'Create a new referral link', to: '/creator/links', primary: true, color: 'var(--green)', bg: 'var(--green-bg)' },
              { icon: Compass, title: 'Browse Tours', desc: 'Find new experiences', to: '/creator/discover', primary: false, color: 'var(--green)', bg: 'var(--green-bg)' },
              { icon: FileText, title: 'View Reports', desc: 'Analytics & insights', to: '/creator/reports', primary: false, color: 'var(--orange)', bg: 'var(--orange-bg)' },
              { icon: Wallet, title: 'Request Payout', desc: 'Withdraw your earnings', to: '/creator/payouts', primary: false, color: 'var(--green)', bg: 'var(--green-bg)' },
            ].map((action) => (
              <motion.div
                key={action.title}
                whileHover={{ y: -2, boxShadow: 'var(--shadow-md)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={action.to}
                  style={{
                    display: 'flex', flexDirection: 'column', gap: 10, padding: '16px',
                    borderRadius: 'var(--r-lg)',
                    border: '1px solid ' + (action.primary ? 'var(--green)' : 'var(--border)'),
                    background: action.primary ? 'var(--green-bg)' : 'var(--bg-surface)',
                    height: '100%',
                  }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 'var(--r-sm)', background: action.bg, display: 'grid', placeItems: 'center' }}>
                    <action.icon size={18} color={action.color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>
                      {action.title}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
                      {action.desc}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
