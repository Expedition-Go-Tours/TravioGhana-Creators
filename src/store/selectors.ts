import type { StoreState, Booking } from './types'

// The demo dataset's "today" is 2026-10-15.
export const DATASET_TODAY = '2026-10-15'
const CURRENT_MONTH = DATASET_TODAY.slice(0, 7) // '2026-10'
const MONTH_KEYS = ['2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10']
const MONTH_LABELS: Record<string, string> = {
  '2026-05': 'May', '2026-06': 'Jun', '2026-07': 'Jul',
  '2026-08': 'Aug', '2026-09': 'Sep', '2026-10': 'Oct'
}

const earning = (b: Booking) => b.status !== 'cancelled'
const month = (date: string) => date.slice(0, 7)

export function selectTotalClicks(state: StoreState): number {
  return state.links.reduce((s, l) => s + l.clicks, 0)
}

export function selectTotalBookings(state: StoreState): number {
  return state.bookings.length
}

/** Earnings buckets: non-cancelled commission by status + bonus → paid. */
export function selectEarningsSummary(state: StoreState) {
  let pending = 0
  let approved = 0
  let paid = 0
  for (const b of state.bookings) {
    if (!earning(b)) continue
    if (b.commissionStatus === 'pending') pending += b.commission
    else if (b.commissionStatus === 'approved') approved += b.commission
    else paid += b.commission
  }
  for (const bo of state.bonuses) paid += bo.amount // bonuses are always paid
  const totalEarned = pending + approved + paid
  const processing = state.payouts
    .filter((p) => p.status === 'processing')
    .reduce((s, p) => s + p.amount, 0)
  const available = Math.max(0, approved - processing)
  return {
    pending: round(pending),
    approved: round(approved),
    paid: round(paid),
    processing: round(processing),
    available: round(available),
    totalEarned: round(totalEarned)
  }
}

export function selectPayoutSummary(state: StoreState) {
  const earnings = selectEarningsSummary(state)
  const completed = state.payouts.filter((p) => p.status === 'completed')
  const failed = state.payouts.filter((p) => p.status === 'failed')
  const processing = state.payouts.filter((p) => p.status === 'processing')
  return {
    available: earnings.available,
    pendingHold: earnings.pending,
    processing: round(processing.reduce((s, p) => s + p.amount, 0)),
    processingCount: processing.length,
    paidLifetime: round(completed.reduce((s, p) => s + p.amount, 0)),
    completedCount: completed.length,
    failedCount: failed.length,
    minPayout: 500
  }
}

export function selectLinksSummary(state: StoreState) {
  const totalClicks = selectTotalClicks(state)
  let linkCommission = 0
  let linkBookings = 0
  for (const b of state.bookings) {
    if (!earning(b)) continue
    linkCommission += b.commission
    linkBookings += 1
  }
  const active = state.links.filter((l) => l.status === 'active').length
  // Conversion uses ALL bookings (incl. cancelled) so it reconciles with the
  // Reports funnel (31 / 909 = 3.4%) — never show two different rates.
  const avgConv = totalClicks > 0 ? (state.bookings.length / totalClicks) * 100 : 0
  return {
    totalClicks,
    linkBookings,
    totalBookings: state.bookings.length,
    linkCommission: round(linkCommission),
    activeLinks: active,
    avgConv: Math.round(avgConv * 10) / 10
  }
}

export function selectBookingsStats(state: StoreState) {
  const valid = state.bookings.filter(earning)
  const revenue = valid.reduce((s, b) => s + b.amount, 0)
  const commission = valid.reduce((s, b) => s + b.commission, 0)
  const cancelled = state.bookings.filter((b) => b.status === 'cancelled').length
  const avgGuests = state.bookings.length
    ? state.bookings.reduce((s, b) => s + b.guests, 0) / state.bookings.length
    : 0
  const avgRating = valid.filter((b) => b.rating > 0).length
    ? valid.reduce((s, b) => s + b.rating, 0) / valid.filter((b) => b.rating > 0).length
    : 0
  return {
    totalBookings: state.bookings.length,
    confirmed: state.bookings.filter((b) => b.status === 'confirmed').length,
    pending: state.bookings.filter((b) => b.status === 'pending').length,
    cancelled,
    revenue: round(revenue),
    commission: round(commission),
    avgGuests: Math.round(avgGuests * 10) / 10,
    avgRating: Math.round(avgRating * 10) / 10
  }
}

/** Earned commission per month (reversals net out; bonus lands in its month). */
export function selectMonthlyEarned(state: StoreState) {
  const byMonth: Record<string, number> = {}
  for (const m of MONTH_KEYS) byMonth[m] = 0
  for (const b of state.bookings) {
    if (!earning(b)) continue
    byMonth[month(b.date)] = (byMonth[month(b.date)] || 0) + b.commission
  }
  for (const bo of state.bonuses) byMonth[month(bo.date)] = (byMonth[month(bo.date)] || 0) + bo.amount
  return MONTH_KEYS.map((m) => ({ key: m, label: MONTH_LABELS[m] ?? m, earned: round(byMonth[m]) }))
}

/** Link clicks per month across all links (Σ = total clicks). */
export function selectMonthlyClicks(state: StoreState) {
  const totals = MONTH_KEYS.map(() => 0)
  for (const l of state.links) {
    l.monthlyClicks?.forEach((c, i) => { if (totals[i] !== undefined) totals[i] += c })
  }
  return MONTH_KEYS.map((m, i) => ({ key: m, label: MONTH_LABELS[m] ?? m, clicks: totals[i] }))
}

export function selectMonthlyBookings(state: StoreState) {
  const byMonth: Record<string, number> = {}
  for (const m of MONTH_KEYS) byMonth[m] = 0
  for (const b of state.bookings) byMonth[month(b.date)] = (byMonth[month(b.date)] || 0) + 1
  return MONTH_KEYS.map((m) => ({ key: m, label: MONTH_LABELS[m] ?? m, bookings: byMonth[m] }))
}

/** KPI row for Overview with explicit comparison period (vs previous month). */
export function selectOverviewKpis(state: StoreState) {
  const clicks = selectMonthlyClicks(state)
  const earned = selectMonthlyEarned(state)
  const bkts = selectMonthlyBookings(state)
  const earnings = selectEarningsSummary(state)

  const cur = MONTH_KEYS.indexOf(CURRENT_MONTH)
  const prevIdx = cur >= 0 ? cur - 1 : MONTH_KEYS.length - 2

  const clicksNow = clicks[cur]?.clicks ?? 0
  const clicksPrev = clicks[prevIdx]?.clicks ?? 0
  const earnedNow = earned[cur]?.earned ?? 0
  const earnedPrev = earned[prevIdx]?.earned ?? 0
  const bktsNow = bkts[cur]?.bookings ?? 0
  const bktsPrev = bkts[prevIdx]?.bookings ?? 0

  return {
    clicks: { value: selectTotalClicks(state), delta: pctChange(clicksNow, clicksPrev) },
    bookings: { value: state.bookings.length, delta: pctChange(bktsNow, bktsPrev) },
    earned: { value: earnings.totalEarned, delta: pctChange(earnedNow, earnedPrev) },
    available: { value: earnings.available, delta: null as number | null },
    periodLabel: `vs ${MONTH_LABELS[MONTH_KEYS[prevIdx]] ?? 'prev month'}`
  }
}

export function selectNotifications(state: StoreState) {
  const unread = state.notifications.filter((n) => !n.read).length
  return { items: state.notifications, unread }
}

function pctChange(now: number, prev: number): number | null {
  if (!prev) return null
  return Math.round(((now - prev) / prev) * 1000) / 10
}

function round(n: number): number {
  return Math.round(n * 100) / 100
}
