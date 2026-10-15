import type { ReferralLink, Tour } from '../store/types'

// Kept inside the approved palette (green / terracotta / amber / neutral).
export const CAMPAIGN_COLORS = ['#087747', '#e16e3f', '#b45309', '#6b7280']
export const campaignColorAt = (i: number) => CAMPAIGN_COLORS[i % CAMPAIGN_COLORS.length]

// Excludes visually ambiguous characters (I, O, 0, 1).
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function randomCode(len = 4): string {
  let s = ''
  for (let i = 0; i < len; i++) s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  return s
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Generate a unique referral code, avoiding codes already in use. */
export function uniqueReferralCode(existing: string[], handle = 'AMA'): string {
  for (let i = 0; i < 100; i++) {
    const code = `TRV-${handle}-${randomCode()}`
    if (!existing.includes(code)) return code
  }
  return `TRV-${handle}-${Date.now().toString(36).toUpperCase().slice(-4)}`
}

export function buildLinkUrl(tour: Tour, code: string): string {
  return `https://travio.gh/t/${slugify(tour.title)}?ref=${code}`
}

/**
 * Build a brand-new (unused) referral link. A freshly created link has no
 * traffic yet, so its click series starts at zero.
 */
export function makeLink(tour: Tour, campaign: string, colorIndex: number, code: string, today: string): ReferralLink {
  const zeros = [0, 0, 0, 0, 0, 0]
  return {
    id: `l-${Date.now().toString(36)}`,
    tourId: tour.id,
    code,
    url: buildLinkUrl(tour, code),
    campaign: campaign.trim() || 'General',
    campaignColor: campaignColorAt(colorIndex),
    status: 'active',
    createdAt: today,
    sparkline: zeros,
    clicks: 0,
    monthlyClicks: zeros,
  }
}
