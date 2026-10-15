export type LinkStatus = 'active' | 'disabled' | 'expired'
export type BookingStatus = 'confirmed' | 'pending' | 'cancelled'
export type CommissionStatus = 'pending' | 'approved' | 'paid'
export type PayoutStatus = 'requested' | 'processing' | 'completed' | 'failed'
export type TransactionType = 'accrual' | 'bonus' | 'reversal' | 'payout'

export interface Tour {
  id: string
  title: string
  region: string
  category: string
  rating: number
  reviews: number
  price: number
  commissionRate: number // percent
  popularity: number // platform-wide bookings
  image: string
  trending: boolean
  addedAt: string // ISO date for 'newest' sort
}

export interface ReferralLink {
  id: string
  tourId: string
  code: string        // unique ref code e.g. 'TRV-AMA-8X4K'
  url: string
  campaign: string
  campaignColor: string
  status: LinkStatus
  createdAt: string
  disabledAt?: string
  expiresAt?: string
  sparkline: number[]
  clicks: number
  monthlyClicks?: number[] // May→Oct, aligned with MONTH_KEYS in selectors
}

export interface Booking {
  id: string
  ref: string         // REF-2026-0701
  tourId: string
  linkId: string
  date: string        // '2026-05-04'
  guests: number
  amount: number
  commission: number  // gross accrual (positive even for cancelled)
  status: BookingStatus
  commissionStatus: CommissionStatus
  rating: number
  source: string
}

export interface Transaction {
  id: string
  date: string
  type: TransactionType
  ref: string
  desc: string
  amount: number
  status: 'pending' | 'approved' | 'paid'
  bookingRef?: string
}

export interface Payout {
  id: string
  ref: string         // PO-8647
  date: string
  amount: number
  status: PayoutStatus
  method: string
  reason?: string
}

export interface Bonus {
  id: string
  date: string
  amount: number
  desc: string
  status: 'paid'
}

export interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type?: 'booking' | 'payout' | 'system' | 'milestone'
  link?: string
}

export interface ActivityItem {
  id: string
  time: string
  icon: 'calendar' | 'trend' | 'star' | 'wallet' | 'click' | 'award'
  text: string
}

export interface PayoutMethod {
  id: string
  type: 'bank' | 'mobile'
  label: string
  details: string // e.g. 'Ecobank Ghana · ****4523'
  isDefault: boolean
}

export interface Session {
  id: string
  device: string
  location: string
  current: boolean
  time: string
}

export interface SocialAccount {
  id: string
  name: string
  handle: string
  platform: 'instagram' | 'youtube' | 'tiktok' | 'twitter'
  connected: boolean
  color: string
}

export interface ReportData {
  reachData: Array<{ month: string; reach: number; engagement: number; clicks: number }>
  audienceAge: Array<{ range: string; pct: number }>
  audienceLocation: Array<{ country: string; pct: number; flag: string }>
  deviceData: Array<{ name: string; value: number; color: string }>
  topContent: Array<{ title: string; platform: string; reach: number; engagement: string; clicks: number; bookings: number }>
  funnelData: Array<{ stage: string; value: number; pct: number }>
  conversionRate: number
}

export interface NotificationPrefs {
  email: {
    bookingAttributed: boolean
    commissionEarned: boolean
    payoutProcessed: boolean
    weeklySummary: boolean
    newExperiences: boolean
    marketingTips: boolean
  }
  push: {
    bookingAlerts: boolean
    payoutUpdates: boolean
    milestones: boolean
  }
  schedule: {
    quietHoursStart: string
    quietHoursEnd: string
    timezone: string
  }
}

export interface Profile {
  firstName: string
  lastName: string
  displayName: string
  email: string
  phone: string
  bio: string
  country: string
  website: string
  niche: string
  audienceSize: string
  channels: string[]
  avatar: string
  tier: 'Gold' | 'Silver' | 'Bronze'
  verified: boolean
  active: boolean
  referralCode: string
  contentPrefs: {
    primaryPlatform: string
    style: string
    bestTime1: string
    bestTime2: string
  }
  twoFA: {
    authenticatorEnabled: boolean
    smsEnabled: boolean
  }
  agreementAccepted: boolean
  agreementDate: string
}

export interface StoreState {
  profile: Profile
  tours: Tour[]
  links: ReferralLink[]
  bookings: Booking[]
  transactions: Transaction[]
  payouts: Payout[]
  bonuses: Bonus[]
  notifications: Notification[]
  activity: ActivityItem[]
  payoutMethods: PayoutMethod[]
  notificationPrefs: NotificationPrefs
  sessions: Session[]
  socialAccounts: SocialAccount[]
  reportData: ReportData
}

export type Action =
  | { type: 'profile/update'; patch: Partial<Profile> }
  | { type: 'prefs/notifications'; patch: Partial<NotificationPrefs> }
  | { type: 'notifications/markAllRead' }
  | { type: 'notifications/markRead'; id: string }
  | { type: 'demo/reset' }
  | { type: 'link/update'; id: string; patch: Partial<ReferralLink> }
  | { type: 'link/toggle'; id: string }
  | { type: 'link/add'; link: ReferralLink }
  | { type: 'payout/request'; payout: Payout }
  | { type: 'payout/setStatus'; id: string; status: PayoutStatus; reason?: string }
  | { type: 'sessions/revoke'; id: string }
  | { type: 'social/toggle'; id: string }
  | { type: 'payoutMethod/setDefault'; id: string }
  | { type: 'payoutMethod/remove'; id: string }
  | { type: 'payoutMethod/add'; method: PayoutMethod }