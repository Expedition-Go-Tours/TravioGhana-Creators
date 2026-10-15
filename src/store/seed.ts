import type {
  StoreState, Tour, ReferralLink, Booking, Transaction, Payout, Bonus,
  Notification, ActivityItem, PayoutMethod, NotificationPrefs, Profile,
  Session, SocialAccount, ReportData
} from './types'

// ---------------------------------------------------------------------------
// Tours
// ---------------------------------------------------------------------------

const tours: Tour[] = [
  { id: 't1', title: 'Kakum Canopy Walkway', region: 'Central', category: 'Nature', rating: 4.8, reviews: 312, price: 320, commissionRate: 15, popularity: 486, image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80', trending: true, addedAt: '2026-05-02' },
  { id: 't2', title: 'Mole National Park Safari', region: 'Savannah', category: 'Adventure', rating: 4.9, reviews: 268, price: 780, commissionRate: 15, popularity: 342, image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', trending: true, addedAt: '2026-05-08' },
  { id: 't3', title: 'Cape Coast & Elmina Castle Tour', region: 'Central', category: 'Culture', rating: 4.9, reviews: 421, price: 460, commissionRate: 15, popularity: 518, image: 'https://images.unsplash.com/photo-1580746738099-79f5e0e6c0e6?w=600&q=80', trending: false, addedAt: '2026-05-15' },
  { id: 't4', title: 'Wli Waterfalls & Togo Border', region: 'Volta', category: 'Nature', rating: 4.7, reviews: 156, price: 410, commissionRate: 15, popularity: 204, image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&q=80', trending: false, addedAt: '2026-06-01' },
  { id: 't5', title: 'Ada Woe Beach & Boat Cruise', region: 'Greater Accra', category: 'Beach', rating: 4.6, reviews: 189, price: 350, commissionRate: 15, popularity: 267, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', trending: true, addedAt: '2026-06-18' },
  { id: 't6', title: 'Kumasi Cultural Experience', region: 'Ashanti', category: 'Culture', rating: 4.8, reviews: 274, price: 540, commissionRate: 15, popularity: 398, image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=80', trending: false, addedAt: '2026-07-03' },
  { id: 't7', title: 'Nzulezo Stilt Village', region: 'Western', category: 'Culture', rating: 4.7, reviews: 132, price: 480, commissionRate: 15, popularity: 176, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80', trending: false, addedAt: '2026-07-21' },
  { id: 't8', title: 'Boti Falls Day Trip', region: 'Eastern', category: 'Nature', rating: 4.5, reviews: 198, price: 300, commissionRate: 15, popularity: 289, image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80', trending: false, addedAt: '2026-08-05' },
  { id: 't9', title: 'Mafi Slave Cemetery Walk', region: 'Volta', category: 'History', rating: 4.6, reviews: 97, price: 260, commissionRate: 15, popularity: 143, image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&q=80', trending: false, addedAt: '2026-09-01' },
  { id: 't10', title: 'Aburi Botanical Gardens', region: 'Eastern', category: 'Nature', rating: 4.4, reviews: 221, price: 240, commissionRate: 15, popularity: 312, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80', trending: true, addedAt: '2026-10-01' }
]

// ---------------------------------------------------------------------------
// Referral links — clicks total 909, monthlyClicks (May→Oct) column sums match
// the monthly click totals used across Reports/Overview (74/96/118/142/206/273)
// ---------------------------------------------------------------------------

const links: ReferralLink[] = [
  {
    id: 'l1', tourId: 't1', code: 'TRV-AMA-KAK7', url: 'https://travio.gh/t/kakum?ref=TRV-AMA-KAK7',
    campaign: 'Instagram Reels', campaignColor: '#087747', status: 'active', createdAt: '2026-05-01',
    sparkline: [30, 42, 55, 70, 60, 85, 92], clicks: 342, monthlyClicks: [30, 42, 55, 70, 60, 85]
  },
  {
    id: 'l2', tourId: 't2', code: 'TRV-AMA-MLE2', url: 'https://travio.gh/t/mole?ref=TRV-AMA-MLE2',
    campaign: 'YouTube Description', campaignColor: '#e16e3f', status: 'active', createdAt: '2026-05-04',
    sparkline: [24, 32, 40, 48, 50, 74, 81], clicks: 268, monthlyClicks: [24, 32, 40, 48, 50, 74]
  },
  {
    id: 'l3', tourId: 't3', code: 'TRV-AMA-CCE5', url: 'https://travio.gh/t/cape-coast?ref=TRV-AMA-CCE5',
    campaign: 'TikTok Series', campaignColor: '#b45309', status: 'active', createdAt: '2026-05-12',
    sparkline: [14, 16, 18, 20, 30, 76, 88], clicks: 174, monthlyClicks: [14, 16, 18, 20, 30, 76]
  },
  {
    id: 'l4', tourId: 't8', code: 'TRV-AMA-BOT4', url: 'https://travio.gh/t/boti?ref=TRV-AMA-BOT4',
    campaign: 'Stories', campaignColor: '#6b7280', status: 'disabled', createdAt: '2026-05-20',
    disabledAt: '2026-10-12', sparkline: [6, 6, 5, 4, 17, 38, 12], clicks: 76, monthlyClicks: [6, 6, 5, 4, 17, 38]
  },
  {
    id: 'l5', tourId: 't5', code: 'TRV-AMA-ADA9', url: 'https://travio.gh/t/ada-woe?ref=TRV-AMA-ADA9',
    campaign: 'Newsletter', campaignColor: '#6b7280', status: 'expired', createdAt: '2026-08-15',
    expiresAt: '2026-09-30', sparkline: [0, 0, 0, 18, 49, 0, 0], clicks: 49, monthlyClicks: [0, 0, 0, 0, 49, 0]
  }
]

// ---------------------------------------------------------------------------
// Bookings — 31 total (29 earning + 2 cancelled).
// commission = 15% of amount. Non-cancelled commission by status:
//   pending 360 (Oct) · approved 997 (Jul 346 + Sep 365 + Oct 286) · paid 1147
//   (May 403 + Jun 395 + Aug 349)
// Monthly earned (non-cancelled): May 403 · Jun 395 · Jul 346 · Aug 349 ·
//   Sep 365 · Oct 646  → 2504, + 250 bonus = 2754 total earned.
// ---------------------------------------------------------------------------

function mk(
  id: string, ref: string, tourId: string, linkId: string, date: string,
  commission: number, guests: number, status: Booking['status'],
  commissionStatus: Booking['commissionStatus'], source: string, rating: number
): Booking {
  return {
    id, ref, tourId, linkId, date, guests,
    amount: Math.round((commission / 0.15) * 100) / 100,
    commission, status, commissionStatus, rating, source
  }
}

const bookings: Booking[] = [
  // May — paid (403)
  mk('b1', 'REF-2026-0701', 't1', 'l1', '2026-05-04', 68, 2, 'confirmed', 'paid', 'Instagram', 5),
  mk('b2', 'REF-2026-0702', 't2', 'l2', '2026-05-11', 72, 3, 'confirmed', 'paid', 'YouTube', 5),
  mk('b3', 'REF-2026-0703', 't1', 'l1', '2026-05-16', 60, 2, 'confirmed', 'paid', 'Instagram', 4),
  mk('b4', 'REF-2026-0704', 't3', 'l3', '2026-05-21', 96, 4, 'confirmed', 'paid', 'TikTok', 5),
  mk('b5', 'REF-2026-0705', 't2', 'l2', '2026-05-28', 107, 4, 'confirmed', 'paid', 'YouTube', 5),
  // June — paid (395)
  mk('b6', 'REF-2026-0706', 't1', 'l1', '2026-06-03', 62, 2, 'confirmed', 'paid', 'Instagram', 4),
  mk('b7', 'REF-2026-0707', 't2', 'l2', '2026-06-09', 78, 3, 'confirmed', 'paid', 'YouTube', 5),
  mk('b8', 'REF-2026-0708', 't1', 'l1', '2026-06-15', 70, 2, 'confirmed', 'paid', 'Instagram', 5),
  mk('b9', 'REF-2026-0709', 't3', 'l3', '2026-06-22', 85, 4, 'confirmed', 'paid', 'TikTok', 4),
  mk('b10', 'REF-2026-0710', 't6', 'l3', '2026-06-27', 100, 4, 'confirmed', 'paid', 'TikTok', 5),
  // July — approved (346); payout attempt of 346 failed in August
  mk('b11', 'REF-2026-0711', 't1', 'l1', '2026-07-05', 76, 3, 'confirmed', 'approved', 'Instagram', 5),
  mk('b12', 'REF-2026-0712', 't8', 'l4', '2026-07-12', 84, 4, 'confirmed', 'approved', 'Stories', 4),
  mk('b13', 'REF-2026-0713', 't3', 'l3', '2026-07-19', 86, 4, 'confirmed', 'approved', 'TikTok', 5),
  mk('b14', 'REF-2026-0714', 't2', 'l2', '2026-07-26', 100, 4, 'confirmed', 'approved', 'YouTube', 5),
  // August — paid (349)
  mk('b15', 'REF-2026-0715', 't1', 'l1', '2026-08-02', 66, 2, 'confirmed', 'paid', 'Instagram', 5),
  mk('b16', 'REF-2026-0716', 't2', 'l2', '2026-08-08', 75, 3, 'confirmed', 'paid', 'YouTube', 4),
  mk('b17', 'REF-2026-0717', 't1', 'l1', '2026-08-14', 72, 3, 'confirmed', 'paid', 'Instagram', 5),
  mk('b18', 'REF-2026-0718', 't3', 'l3', '2026-08-20', 80, 4, 'confirmed', 'paid', 'TikTok', 5),
  mk('b19', 'REF-2026-0719', 't8', 'l4', '2026-08-26', 56, 2, 'confirmed', 'paid', 'Stories', 4),
  // September — approved (365) + 1 cancelled
  mk('b20', 'REF-2026-0720', 't1', 'l1', '2026-09-04', 75, 3, 'confirmed', 'approved', 'Instagram', 5),
  mk('b21', 'REF-2026-0721', 't2', 'l2', '2026-09-10', 85, 4, 'confirmed', 'approved', 'YouTube', 5),
  mk('b22', 'REF-2026-0722', 't4', 'l2', '2026-09-12', 88, 4, 'cancelled', 'paid', 'YouTube', 0),
  mk('b23', 'REF-2026-0723', 't3', 'l3', '2026-09-17', 95, 4, 'confirmed', 'approved', 'TikTok', 5),
  mk('b24', 'REF-2026-0724', 't6', 'l3', '2026-09-24', 110, 5, 'confirmed', 'approved', 'TikTok', 4),
  // October — approved (286) + pending (360) + 1 cancelled
  mk('b25', 'REF-2026-0725', 't1', 'l1', '2026-10-02', 86, 4, 'confirmed', 'approved', 'Instagram', 5),
  mk('b26', 'REF-2026-0726', 't2', 'l2', '2026-10-05', 95, 4, 'confirmed', 'approved', 'YouTube', 5),
  mk('b27', 'REF-2026-0727', 't3', 'l3', '2026-10-07', 105, 5, 'confirmed', 'approved', 'TikTok', 5),
  mk('b28', 'REF-2026-0728', 't5', 'l1', '2026-10-10', 104, 4, 'cancelled', 'paid', 'Instagram', 0),
  mk('b29', 'REF-2026-0731', 't1', 'l1', '2026-10-13', 68, 2, 'confirmed', 'pending', 'Instagram', 5),
  mk('b30', 'REF-2026-0729', 't6', 'l3', '2026-10-14', 122, 5, 'confirmed', 'pending', 'TikTok', 5),
  mk('b31', 'REF-2026-0730', 't2', 'l2', '2026-10-15', 170, 6, 'pending', 'pending', 'YouTube', 0)
]

// ---------------------------------------------------------------------------
// Payouts — completed 403 + 395 + 349 = 1147 = Σ paid commissions.
// Failed 346 (July cohort) · Processing 400 held from approved (997 − 400 = 597
// available). "Today" in this dataset is 2026-10-15.
// ---------------------------------------------------------------------------

const payouts: Payout[] = [
  { id: 'p1', ref: 'PO-8647', date: '2026-06-04', amount: 403, status: 'completed', method: 'Ecobank Ghana · ****4523' },
  { id: 'p2', ref: 'PO-8712', date: '2026-07-05', amount: 395, status: 'completed', method: 'Ecobank Ghana · ****4523' },
  { id: 'p3', ref: 'PO-8790', date: '2026-08-06', amount: 346, status: 'failed', method: 'Ecobank Ghana · ****4523', reason: 'Beneficiary account rejected by bank — update payout method and retry.' },
  { id: 'p4', ref: 'PO-8834', date: '2026-09-06', amount: 349, status: 'completed', method: 'MTN Mobile Money · ****7890' },
  { id: 'p5', ref: 'PO-8901', date: '2026-10-14', amount: 400, status: 'processing', method: 'Ecobank Ghana · ****4523' }
]

const bonuses: Bonus[] = [
  { id: 'bo1', date: '2026-09-18', amount: 250, desc: 'Gold Tier milestone bonus', status: 'paid' }
]

const tourName = (id: string): string => tours.find((t) => t.id === id)?.title ?? 'Tour'

// Ledger: accrual per booking (+ reversal for cancelled) + bonus + completed
// payouts as debits. Sorted date desc, newest first.
function buildTransactions(): Transaction[] {
  const tx: Transaction[] = []
  for (const b of bookings) {
    tx.push({
      id: `tx-acc-${b.id}`, date: b.date, type: 'accrual', ref: b.ref, bookingRef: b.ref,
      desc: `${tourName(b.tourId)} — commission (${b.guests} guest${b.guests > 1 ? 's' : ''})`,
      amount: b.commission, status: b.commissionStatus
    })
    if (b.status === 'cancelled') {
      tx.push({
        id: `tx-rev-${b.id}`, date: b.date, type: 'reversal', ref: b.ref, bookingRef: b.ref,
        desc: `${tourName(b.tourId)} — cancelled booking reversal`,
        amount: -b.commission, status: 'paid'
      })
    }
  }
  for (const bo of bonuses) {
    tx.push({ id: `tx-bonus-${bo.id}`, date: bo.date, type: 'bonus', ref: bo.id.toUpperCase(), desc: bo.desc, amount: bo.amount, status: 'paid' })
  }
  for (const p of payouts) {
    if (p.status !== 'completed') continue
    tx.push({ id: `tx-po-${p.id}`, date: p.date, type: 'payout', ref: p.ref, desc: `Payout to ${p.method}`, amount: -p.amount, status: 'paid' })
  }
  return tx.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.id < b.id ? -1 : 1))
}

const transactions: Transaction[] = buildTransactions()

// ---------------------------------------------------------------------------
// Profile, preferences, accounts
// ---------------------------------------------------------------------------

const payoutMethods: PayoutMethod[] = [
  { id: 'pm1', type: 'bank', label: 'Ecobank Ghana', details: 'Ecobank Ghana · ****4523', isDefault: true },
  { id: 'pm2', type: 'mobile', label: 'MTN Mobile Money', details: 'MTN Mobile Money · ****7890', isDefault: false }
]

const notificationPrefs: NotificationPrefs = {
  email: { bookingAttributed: true, commissionEarned: true, payoutProcessed: true, weeklySummary: true, newExperiences: true, marketingTips: false },
  push: { bookingAlerts: true, payoutUpdates: true, milestones: true },
  schedule: { quietHoursStart: '22:00', quietHoursEnd: '08:00', timezone: 'GMT' }
}

const profile: Profile = {
  firstName: 'Ama',
  lastName: 'Mensah',
  displayName: 'Ama Mensah',
  email: 'ama@example.com',
  phone: '+233 24 123 4567',
  bio: 'Travel content creator sharing authentic Ghana experiences with the world.',
  country: 'Ghana',
  website: 'amamensah.com',
  niche: 'Travel & Lifestyle',
  audienceSize: '10K - 50K',
  channels: ['Instagram', 'TikTok', 'YouTube'],
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  tier: 'Gold',
  verified: true,
  active: true,
  referralCode: 'TRV-AMA-8X4K',
  payoutPrefs: { frequency: 'Monthly', minPayout: 500, currency: 'GHS' },
  contentPrefs: { primaryPlatform: 'Instagram', style: 'Reels & Stories', bestTime1: '09:00', bestTime2: '18:00' },
  twoFA: { authenticatorEnabled: false, smsEnabled: false },
  agreementAccepted: true,
  agreementDate: '2026-08-15'
}

const sessions: Session[] = [
  { id: 's1', device: 'Chrome on macOS', location: 'Accra, Ghana', current: true, time: 'Now' },
  { id: 's2', device: 'Safari on iPhone', location: 'Accra, Ghana', current: false, time: '2 hours ago' }
]

const socialAccounts: SocialAccount[] = [
  { id: 'sc1', name: 'Instagram', handle: '@amamensah', platform: 'instagram', connected: true, color: '#E1306C' },
  { id: 'sc2', name: 'YouTube', handle: '/c/amamensah', platform: 'youtube', connected: true, color: '#FF0000' },
  { id: 'sc3', name: 'TikTok', handle: '@amamensah', platform: 'tiktok', connected: true, color: '#111111' },
  { id: 'sc4', name: 'Twitter / X', handle: '@amamensah', platform: 'twitter', connected: false, color: '#1DA1F2' }
]

const notifications: Notification[] = [
  { id: 'n1', title: 'Booking confirmed', message: 'REF-2026-0731 confirmed — +GHS 68 commission', time: '2 hrs ago', read: false, type: 'booking', link: '/creator/bookings' },
  { id: 'n2', title: 'Link clicked 300+', message: 'Kakum Canopy Walkway hit 300+ clicks', time: '5 hrs ago', read: false, type: 'system', link: '/creator/links' },
  { id: 'n3', title: 'Gold Tier', message: 'You reached Gold Tier creator status', time: '2 days ago', read: true, type: 'milestone' },
  { id: 'n4', title: 'Payout processed', message: 'PO-8647 completed (GHS 403)', time: '3 days ago', read: true, type: 'payout', link: '/creator/payouts' }
]

const activity: ActivityItem[] = [
  { id: 'a1', time: '2 hours ago', icon: 'calendar', text: 'Booking REF-2026-0731 confirmed — GHS 68 commission earned' },
  { id: 'a2', time: '5 hours ago', icon: 'trend', text: 'Link Kakum Canopy Walkway hit 300+ clicks' },
  { id: 'a3', time: '2 days ago', icon: 'star', text: 'You reached Gold Tier creator status!' },
  { id: 'a4', time: '3 days ago', icon: 'wallet', text: 'Payout of GHS 403 processed successfully' }
]

// ---------------------------------------------------------------------------
// Reports — clicks columns reconcile with links (Σ = 909), funnel ends at 31
// bookings → 3.4% conversion.
// ---------------------------------------------------------------------------

const reportData: ReportData = {
  reachData: [
    { month: 'May', reach: 12000, engagement: 840, clicks: 74 },
    { month: 'Jun', reach: 18000, engagement: 1260, clicks: 96 },
    { month: 'Jul', reach: 22000, engagement: 1540, clicks: 118 },
    { month: 'Aug', reach: 28000, engagement: 1960, clicks: 142 },
    { month: 'Sep', reach: 35000, engagement: 2450, clicks: 206 },
    { month: 'Oct', reach: 42000, engagement: 2940, clicks: 273 }
  ],
  audienceAge: [
    { range: '18-24', pct: 18 }, { range: '25-34', pct: 42 }, { range: '35-44', pct: 24 },
    { range: '45-54', pct: 10 }, { range: '55+', pct: 6 }
  ],
  audienceLocation: [
    { country: 'Ghana', pct: 34, flag: '🇬🇭' }, { country: 'United States', pct: 22, flag: '🇺🇸' },
    { country: 'United Kingdom', pct: 16, flag: '🇬🇧' }, { country: 'Nigeria', pct: 12, flag: '🇳🇬' },
    { country: 'Germany', pct: 8, flag: '🇩🇪' }, { country: 'Other', pct: 8, flag: '🌍' }
  ],
  deviceData: [
    { name: 'Mobile', value: 68, color: '#087747' },
    { name: 'Desktop', value: 24, color: '#e16e3f' },
    { name: 'Tablet', value: 8, color: '#b45309' }
  ],
  topContent: [
    { title: 'Kakum Canopy Walkway — Reel', platform: 'Instagram', reach: 24000, engagement: '8.2%', clicks: 342, bookings: 10 },
    { title: 'Mole Safari — Carousel', platform: 'Instagram', reach: 18000, engagement: '6.8%', clicks: 240, bookings: 8 },
    { title: 'Cape Coast Castles — Story', platform: 'TikTok', reach: 15000, engagement: '5.4%', clicks: 180, bookings: 6 },
    { title: 'Boti Falls — Reel', platform: 'Instagram', reach: 9000, engagement: '7.1%', clicks: 90, bookings: 2 }
  ],
  funnelData: [
    { stage: 'Impressions', value: 42000, pct: 100 },
    { stage: 'Reach', value: 28000, pct: 67 },
    { stage: 'Clicks', value: 909, pct: 22 },
    { stage: 'Bookings', value: 31, pct: 3.4 }
  ],
  conversionRate: 3.4
}

export const initialState: StoreState = {
  profile,
  tours,
  links,
  bookings,
  transactions,
  payouts,
  bonuses,
  notifications,
  activity,
  payoutMethods,
  notificationPrefs,
  sessions,
  socialAccounts,
  reportData
}
