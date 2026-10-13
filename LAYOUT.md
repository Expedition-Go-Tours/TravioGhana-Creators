# Travio Ghana Creator Dashboard — Layout Research & UX Specification

> Premium creator workspace design. Bridges the `/content-creators` marketing page's visual language with a functional dashboard that feels like a high-end creator platform (think Shopify Collabs meets Patreon Studio).

---

## 1. Design Philosophy

The dashboard must feel **premium, calm, and empowering** — not like a spreadsheet or an admin panel. Creators should open it and feel like they're running a business, not filling in forms.

**Three design pillars:**
1. **Clarity over density** — every screen answers one question at a glance
2. **Elevation over flatness** — cards float, hover states lift, sections breathe
3. **Progress over perfection** — the dashboard celebrates milestones and shows growth

---

## 2. Overall Layout Structure

### 2.1 Shell: Top Bar + Content Area

The dashboard reuses the existing `DashboardLayout` pattern (top bar, not sidebar) for consistency with the customer dashboard. But the creator dashboard gets its own visual treatment — deeper greens, larger typography, more generous spacing.

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]  Creator Studio                    [Search] [🔔] [Avatar]│  ← top bar (sticky)
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │                    CONTENT AREA                         │   │
│  │                                                         │   │
│  │   (routes render here with page-level transitions)      │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Top bar details:**
- Height: 80px desktop / 64px mobile
- Background: `#fff` with `border-bottom: 1px solid rgba(21,32,29,.08)`
- Left: Travio Ghana logo + "Creator Studio" badge (pill, `--eg-green` bg, white text)
- Center: navigation tabs (horizontal, scrollable on mobile)
- Right: search icon, notification bell (with badge), profile avatar (dropdown)
- Sticky with `backdrop-filter: blur(12px)` and `background: rgba(255,255,255,.85)` on scroll

### 2.2 Navigation Tabs

Horizontal tab bar below the top bar (or integrated into it). Uses the same pill-tab pattern as the existing dashboard.

```
  Overview │ Discover │ Links │ Bookings │ Earnings │ Payouts │ Profile
```

| Tab | Icon | Route | Description |
|---|---|---|---|
| Overview | `LayoutDashboard` | `/creator` | Home dashboard with key metrics |
| Discover | `Compass` | `/creator/discover` | Browse eligible tours |
| Links | `Link2` | `/creator/links` | Referral link manager |
| Bookings | `CalendarDays` | `/creator/bookings` | Attributed booking history |
| Earnings | `TrendingUp` | `/creator/earnings` | Commission ledger & statements |
| Payouts | `Wallet` | `/creator/payouts` | Payout history & requests |
| Profile | `User` | `/creator/profile` | Settings & account |

**Tab styling:**
- Active: `background: #e9f8ef`, `color: #075634`, bold
- Inactive: `color: #626c68`, hover `background: #f3f1eb`
- Transition: `0.2s ease`
- Mobile: horizontal scroll with `scroll-snap-type: x mandatory`

---

## 3. Page Layouts

### 3.1 Overview (Home)

The hero screen. Answers: "How am I doing?"

```
┌─────────────────────────────────────────────────────────────────┐
│  Good morning, Ama 👋                          [This month ▾]   │
│  Your creator programme is performing well.                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │  12,480  │ │   847    │ │   52     │ │  GHS 4.2k│          │
│  │  Clicks  │ │  Visitors│ │  Bookings│ │  Earned  │          │
│  │  ↑ 12%   │ │  ↑ 8%    │ │  ↑ 15%   │ │  ↑ 22%   │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                 │
│  ┌─────────────────────────────┐ ┌─────────────────────────┐   │
│  │  📈 Earnings Trend          │ │  🏆 Top Performing      │   │
│  │                             │ │                         │   │
│  │     ╱╲    ╱╲               │ │  1. Kakum Canopy Walk   │   │
│  │    ╱  ╲╱╲╱  ╲╱╲            │ │     312 clicks · 18 bk  │   │
│  │   ╱                          │ │  2. Mole Safari         │   │
│  │  ╱                           │ │     248 clicks · 12 bk  │   │
│  │ ────────────────────        │ │  3. Cape Coast Castles  │   │
│  │  Mon Tue Wed Thu Fri Sat    │ │     198 clicks · 9 bk   │   │
│  └─────────────────────────────┘ └─────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────┐ ┌─────────────────────────┐   │
│  │  💰 Recent Bookings         │ │  📊 Conversion Rate     │   │
│  │                             │ │                         │   │
│  │  ● Kakum Tour    GHS 450   │ │        ╭──────╮         │   │
│  │    2 hrs ago · Confirmed    │ │       │  6.2% │         │   │
│  │  ● Mole Safari   GHS 1,200 │ │       │  ↑1.1 │         │   │
│  │    5 hrs ago · Pending      │ │        ╰──────╯         │   │
│  │  ● Elmina Castle GHS 350   │ │   vs last month          │   │
│  │    1 day ago · Confirmed    │ │                         │   │
│  └─────────────────────────────┘ └─────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ⚡ Quick Actions                                        │   │
│  │  [Generate Link]  [Browse Tours]  [View Statements]      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Key metrics row:** 4 cards, equal width, `gap: 16px`
- Card: white bg, `border: 1px solid #dfe7e1`, `border-radius: 22px`, `padding: 28px`
- Big number: `Manrope 800`, `clamp(32px, 4vw, 42px)`, `letter-spacing: -0.04em`, `color: #087747`
- Label: `14px`, `#5e6b64`, `font-weight: 700`
- Delta: `12px` pill, `background: #e9f8ef`, `color: #075634` for positive, `#c75c3d` for negative
- Hover: `translateY(-4px)` + `box-shadow: 0 16px 40px rgba(20,35,30,.08)`

**Chart cards:** 2-column grid (`1.4fr 1fr`), min-height 320px
- Earnings trend: area chart with gradient fill (`--eg-green` → transparent)
- Top performing: ranked list with thumbnail, title, mini-stats

**Recent bookings:** list with status pills (Confirmed = green, Pending = amber, Cancelled = red)
- Row: thumbnail (40×40, radius 8px) + title + meta + amount
- Hover: `translateX(4px)`

**Conversion rate:** circular gauge or large stat with context
- Big number: `42px`, `--eg-green`
- Delta badge below

**Quick actions:** horizontal button row
- Primary: `background: #087747`, white text, `border-radius: 14px`
- Secondary: white bg, `border: 1px solid #cfdad2`

### 3.2 Discover Tours

Browse eligible tours to promote. Reuses the existing tour catalogue.

```
┌─────────────────────────────────────────────────────────────────┐
│  Discover Experiences                                          │
│  Browse eligible tours and generate your referral links.        │
├─────────────────────────────────────────────────────────────────┤
│  [🔍 Search tours...]           [Category ▾] [Region ▾] [Sort ▾]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │ [image]     │ │ [image]     │ │ [image]     │              │
│  │             │ │             │ │             │              │
│  │ Kakum       │ │ Mole        │ │ Cape Coast  │              │
│  │ Canopy Walk │ │ Safari      │ │ Castles     │              │
│  │             │ │             │ │             │              │
│  │ ★ 4.8 (42)  │ │ ★ 4.9 (38)  │ │ ★ 4.7 (56)  │              │
│  │ 15% comm.   │ │ 15% comm.   │ │ 15% comm.   │              │
│  │             │ │             │ │             │              │
│  │ [Get Link]  │ │ [Get Link]  │ │ [Get Link]  │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │ ...         │ │ ...         │ │ ...         │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
│                                                                 │
│  Showing 6 of 33 experiences                    [Load more →]  │
└─────────────────────────────────────────────────────────────────┘
```

**Tour card design:**
- Image: `aspect-ratio: 4/3`, `border-radius: 22px 22px 0 0`, hover `scale(1.04)` (0.5s)
- Body: `padding: 20px 24px 24px`
- Title: `Manrope 700`, `21px`, `letter-spacing: -0.03em`
- Rating: gold star + count
- Commission badge: pill, `background: #e9f8ef`, `color: #075634`, `font-size: 12px`, bold
- CTA button: "Get Link" — `background: #087747`, white, `border-radius: 12px`, `padding: 12px 20px`
- Card hover: `translateY(-8px)` + shadow

**Filters bar:**
- Search input: `border-radius: 14px`, `border: 1px solid #dfe7e1`, `padding: 14px 18px`
- Dropdown pills: `border-radius: 999px`, `border: 1px solid #dfe7e1`
- Active filter: `background: #e9f8ef`, `border-color: #087747`

### 3.3 Referral Links

Manage and create tracking links.

```
┌─────────────────────────────────────────────────────────────────┐
│  Referral Links                                                │
│  Your personal booking links and their performance.             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Your referral code: TRV-AMA-8X4K    [Copy] [QR Code]   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [+ Generate New Link]                                         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Kakum Canopy Walkway                    [Active 🟢]    │   │
│  │  travioghana.com/tours/kakum?ref=TRV-AMA-8X4K          │   │
│  │                                                         │   │
│  │  📊 312 clicks · 18 bookings · GHS 2,340 earned         │   │
│  │  Campaign: "Summer Adventures"                          │   │
│  │                                                         │   │
│  │  [Copy] [QR] [Analytics] [Disable]                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Mole National Park Safari                [Active 🟢]   │   │
│  │  travioghana.com/tours/mole?ref=TRV-AMA-8X4K            │   │
│  │                                                         │   │
│  │  📊 248 clicks · 12 bookings · GHS 1,800 earned         │   │
│  │  Campaign: "Wild Ghana"                                 │   │
│  │                                                         │   │
│  │  [Copy] [QR] [Analytics] [Disable]                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Referral code banner:**
- Dark glass card: `background: rgba(5,45,29,.88)`, `backdrop-filter: blur(12px)`, `border-radius: 21px`
- Code in monospace, `font-size: 20px`, `letter-spacing: 0.08em`, white
- Copy button: white pill, `border-radius: 999px`
- QR button: opens modal with QR code

**Link card:**
- White bg, `border: 1px solid #dfe7e1`, `border-radius: 22px`, `padding: 24px`
- Status pill: Active = `#e9f8ef` bg + green dot; Disabled = `#f3f1eb` bg + grey dot
- URL: monospace, `13px`, `color: #5e6b64`, truncated with ellipsis
- Stats row: `font-size: 13px`, `color: #5e6b64`, with green highlights for earnings
- Action buttons: text buttons with icons, `border-radius: 8px`, hover `background: #f3f1eb`

**Generate link modal:**
- Overlay: `rgba(3,30,18,.5)` + `backdrop-filter: blur(4px)`
- Card: white, `border-radius: 24px`, `padding: 32px`, `max-width: 520px`
- Fields: Tour select (searchable dropdown), Campaign label (optional text input)
- Preview: shows the generated URL
- Actions: [Cancel] [Generate Link]

### 3.4 Bookings

Attributed booking history.

```
┌─────────────────────────────────────────────────────────────────┐
│  Bookings                                          [Export CSV] │
│  Bookings attributed to your referral links.                    │
├─────────────────────────────────────────────────────────────────┤
│  [All ▾] [Confirmed ▾] [Pending ▾] [Cancelled ▾]  [Date range] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  REF-2024-0847      Kakum Canopy Walkway    GHS 450     │   │
│  │  12 Oct 2026 · 2 guests          Confirmed · 15% = GHS 68│   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  REF-2024-0846      Mole National Park      GHS 1,200   │   │
│  │  11 Oct 2026 · 4 guests          Pending · 15% = GHS 180│   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  REF-2024-0845      Elmina Castle Tour      GHS 350     │   │
│  │  10 Oct 2026 · 2 guests          Confirmed · 15% = GHS 53│   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  REF-2024-0844      Boti Falls & Aburi      GHS 280     │   │
│  │  09 Oct 2026 · 3 guests          Cancelled · Reversed    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Showing 4 of 52 bookings                       [Load more →]  │
└─────────────────────────────────────────────────────────────────┘
```

**Booking row:**
- Grid: `auto 1fr auto` (ref number, details, amount)
- Ref number: `font-size: 12px`, `color: #626c68`, `font-family: monospace`
- Tour title: `Manrope 700`, `16px`
- Meta: `13px`, `#5e6b64`
- Status pill: Confirmed = `#e9f8ef` + `#075634`; Pending = `#fef3e2` + `#b45309`; Cancelled = `#fef2f2` + `#dc2626`
- Commission amount: `color: #087747`, bold, with "15% =" prefix
- Row hover: `background: #f8faf8`
- Divider: `1px solid #dfe7e1`

**Privacy note:** No customer names, emails, or payment details visible. Only booking reference, tour, date, guest count, status, and commission.

### 3.5 Earnings & Statements

Financial transparency screen.

```
┌─────────────────────────────────────────────────────────────────┐
│  Earnings                                          [Statement]  │
│  Your commission ledger and financial activity.                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │   │
│  │  │ GHS 8,420│ │ GHS 3,200│ │ GHS 4,100│ │ GHS 1,120│   │   │
│  │  │  Earned  │ │  Pending │ │ Available│ │   Paid   │   │   │
│  │  │  Total   │ │  (hold)  │ │ (payout) │ │  Lifetime│   │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Commission Breakdown                      [This month ▾]│   │
│  │                                                         │   │
│  │  ┌─ Gross booking value ──────────────── GHS 28,000 ─┐  │   │
│  │  ├─ Platform fee (10%) ───────────────── - GHS 2,800 ─┤  │   │
│  │  ├─ Eligible booking value ───────────── GHS 25,200 ──┤  │   │
│  │  ├─ Your commission (15%) ────────────── GHS 3,780 ──┤  │   │
│  │  ├─ Refunds & reversals ──────────────── - GHS 280 ──┤  │   │
│  │  └─ Net earned ───────────────────────── GHS 3,500 ──┘  │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Transaction History                                     │   │
│  │                                                         │   │
│  │  12 Oct  Commission accrual    REF-0847    + GHS 68     │   │
│  │  11 Oct  Commission accrual    REF-0846    + GHS 180    │   │
│  │  10 Oct  Payout processed     Oct payout   - GHS 2,400  │   │
│  │  09 Oct  Refund reversal      REF-0844    - GHS 42     │   │
│  │  08 Oct  Commission accrual    REF-0843    + GHS 53     │   │
│  │                                                         │   │
│  │  [Load more transactions →]                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Summary cards:** Same style as Overview metric cards but with currency formatting
- `font-family: Manrope`, `font-size: 32px`, `letter-spacing: -0.04em`
- Positive amounts: `color: #087747`
- Negative amounts: `color: #c75c3d`
- Labels: `13px`, `#5e6b64`, bold

**Commission breakdown:** A visual ledger
- Rows with dotted leaders (like a receipt)
- Amount right-aligned, monospace
- Negative values with minus prefix and red color
- Final "Net earned" row: bold, larger, green background strip

**Transaction history:** Table-like list
- Date: `13px`, `#626c68`
- Type: pill (Accrual = green, Payout = blue, Reversal = red)
- Reference: monospace, `12px`
- Amount: right-aligned, bold, color-coded
- Row hover: `background: #f8faf8`

### 3.6 Payouts

Payout management.

```
┌─────────────────────────────────────────────────────────────────┐
│  Payouts                                                       │
│  Manage your payout settings and track withdrawals.             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Available Balance                                       │   │
│  │                                                         │   │
│  │  GHS 4,100.00                           [Request Payout] │   │
│  │                                                         │   │
│  │  Minimum payout: GHS 500 · Next scheduled: 1 Nov 2026   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Payout Method                                           │   │
│  │                                                         │   │
│  │  🏦 Bank Account ending in ****4523     [Change]         │   │
│  │     Ecobank Ghana · Verified ✅                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Payout History                                          │   │
│  │                                                         │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │ 01 Oct 2026   GHS 2,400   Completed ✅   Ref: TXN...│   │
│  │  │ 01 Sep 2026   GHS 1,800   Completed ✅   Ref: TXN...│   │
│  │  │ 01 Aug 2026   GHS 2,100   Failed ❌      Retry →   │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Balance card:** Dark green glass treatment
- `background: linear-gradient(135deg, #075634, #087747)`, `border-radius: 24px`, `padding: 32px`
- Balance: `font-size: 48px`, `Manrope 800`, white, `letter-spacing: -0.04em`
- CTA: white pill button, `border-radius: 999px`, `font-weight: 700`
- Meta line: `rgba(255,255,255,.7)`, `13px`

**Payout method card:** White bg with icon + details + "Change" link
- Bank icon in green circle
- Account number masked (****4523)
- Verified badge: green checkmark pill

**Payout history:** Table rows with status pills
- Completed: green check
- Failed: red X + "Retry" link
- Processing: amber spinner

### 3.7 Profile & Settings

Account management.

```
┌─────────────────────────────────────────────────────────────────┐
│  Profile & Settings                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  [Avatar]  Ama Mensah                    [Edit Profile]  │   │
│  │            @amamensah · Creator since Aug 2026           │   │
│  │            🏅 Gold Tier Creator                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Public Profile                                          │   │
│  │  Display name:    [Ama Mensah          ]                │   │
│  │  Bio:             [Travel content creator...    ]        │   │
│  │  Instagram:       [@amamensah           ]                │   │
│  │  YouTube:         [/c/amamensah         ]                │   │
│  │  TikTok:          [@amamensah           ]                │   │
│  │  Website:         [amamensah.com        ]                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Notifications                                           │   │
│  │  ☑ Email me when a booking is attributed                 │   │
│  │  ☑ Email me when a payout is processed                   │   │
│  │  ☐ Weekly performance summary                            │   │
│  │  ☑ Notify me about new experiences                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Account Security                                        │   │
│  │  Change password · Two-factor auth · Active sessions     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Profile header:** Avatar (80px, radius 50%) + name + handle + tier badge
- Tier badge: gold pill with star icon
- "Edit Profile" button: outline style

**Settings sections:** White cards with `border-radius: 22px`, `padding: 28px`
- Form fields: `border-radius: 12px`, `border: 1px solid #dfe7e1`, `padding: 12px 16px`
- Labels: `13px`, `font-weight: 700`, `color: #15201d`
- Inputs: `font-size: 15px`, focus `border-color: #087747`, `box-shadow: 0 0 0 3px rgba(8,119,71,.1)`
- Toggle switches: custom styled, green when active
- Save button: `background: #087747`, white, `border-radius: 14px`, `padding: 14px 28px`

---

## 4. Premium UI Patterns

### 4.1 Glass Morphism

Used sparingly for floating elements (balance cards, overlays, sticky headers).

```css
.glass {
  background: rgba(5, 45, 29, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 21px;
  box-shadow: 0 22px 55px rgba(4, 35, 22, 0.2);
}
```

### 4.2 Micro-interactions

| Interaction | Trigger | Animation |
|---|---|---|
| Card lift | Hover | `translateY(-4px to -8px)`, `box-shadow` increase, `0.25-0.3s ease` |
| Button press | Active | `scale(0.97)`, `0.1s` |
| Number count-up | Page load | Animated counter (0 → target over 1.2s) |
| Progress bar | Data change | Width transition `0.8s cubic-bezier(0.3, 0.8, 0.4, 1)` |
| Status pill appear | Mount | `opacity: 0 → 1`, `translateY(4px → 0)`, `0.2s` |
| Toast notification | Action complete | Slide in from top-right, `0.3s spring` |
| Skeleton loading | Data fetch | Shimmer gradient animation |
| Tab switch | Navigation | `opacity: 0 → 1`, `translateY(6px → 0)`, `0.24s` |
| Copy confirmation | Button click | Icon morphs to checkmark, `0.2s`, reverts after 2s |
| Chart draw | Data load | SVG path `stroke-dashoffset` animation, `1.2s` |

### 4.3 Elevation System

| Level | Usage | Shadow |
|---|---|---|
| 0 | Flat surfaces | `none` |
| 1 | Default cards | `0 1px 3px rgba(0,0,0,.04)` |
| 2 | Hovered cards | `0 16px 40px rgba(20,35,30,.08)` |
| 3 | Modals, dropdowns | `0 22px 55px rgba(4,35,22,.2)` |
| 4 | Sticky overlays | `0 28px 70px rgba(4,35,22,.25)` |

### 4.4 Colour Usage Rules

| Context | Colour | Hex |
|---|---|---|
| Primary CTA | Green | `#087747` |
| Success / confirmed | Green | `#075634` |
| Pending / warning | Amber | `#b45309` |
| Error / failed | Red | `#dc2626` |
| Info / links | Blue | `#3463e8` |
| Text primary | Ink | `#15201d` |
| Text secondary | Muted | `#626c68` |
| Text tertiary | Light | `#8a9490` |
| Borders | Line | `#dfe7e1` |
| Surface subtle | Mint | `#f8faf8` |
| Surface alt | Paper | `#f3f1eb` |
| Accent spark | Orange | `#e16e3f` |
| Accent lime | Lime | `#d8f676` |

### 4.5 Typography Scale (Dashboard Context)

| Element | Font | Size | Weight | Tracking | Colour |
|---|---|---|---|---|---|
| Page title | Manrope | `clamp(28px, 3.5vw, 36px)` | 800 | `-0.055em` | `#15201d` |
| Section title | Manrope | `21px` | 700 | `-0.03em` | `#15201d` |
| Card heading | Manrope | `17px` | 700 | `-0.02em` | `#15201d` |
| Metric number | Manrope | `clamp(32px, 4vw, 42px)` | 800 | `-0.04em` | `#087747` |
| Metric label | DM Sans | `13px` | 700 | `0` | `#5e6b64` |
| Body text | DM Sans | `15px` | 400 | `0` | `#5e6b64` |
| Small text | DM Sans | `13px` | 400 | `0` | `#626c68` |
| Micro label | Manrope | `11px` | 800 | `0.12em` | `#8a9490` |
| Button text | Manrope | `15px` | 800 | `0` | varies |
| Table cell | DM Sans | `14px` | 400 | `0` | `#15201d` |
| Monospace / code | `ui-monospace` | `13px` | 500 | `0.02em` | `#5e6b64` |

---

## 5. Responsive Behaviour

| Breakpoint | Layout changes |
|---|---|
| `≥ 1200px` | Full 1200px container, 4-column metric grid, 2-column chart grid |
| `1024–1199px` | Container `calc(100% - 48px)`, 4-column metrics, 2-column charts |
| `768–1023px` | 2-column metric grid, single-column charts, top bar compresses |
| `< 768px` | Single-column everything, horizontal scroll tabs, bottom sheet filters, stacked cards |
| `< 480px` | Compact metrics (2×2 grid), reduced padding (16px), full-width buttons |

**Mobile-specific patterns:**
- Metric cards: 2×2 grid instead of 4-across
- Charts: full-width, shorter height (240px)
- Tables: convert to card lists
- Filters: bottom sheet overlay
- Navigation: horizontal scroll tabs with snap
- FAB (Floating Action Button) for "Generate Link" on Links page

---

## 6. Loading & Empty States

### Loading (Skeleton)

```
┌─────────────────────────────────────────────┐
│  ████████████  ████████████████████████████  │
│  ████████      ████████████████████████████  │
│                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │ ████████ │ │ ████████ │ │ ████████ │    │
│  │ ██████   │ │ ██████   │ │ ██████   │    │
│  │ ████     │ │ ████     │ │ ████     │    │
│  └──────────┘ └──────────┘ └──────────┘    │
└─────────────────────────────────────────────┘
```

- Shimmer: `linear-gradient(90deg, #e8e8e8 25%, #f0f0f0 50%, #e8e8e8 75%)`, `background-size: 200% 100%`, `1.2s infinite`
- Card skeletons match real card dimensions to prevent layout shift

### Empty States

```
┌─────────────────────────────────────────────┐
│                                             │
│              [Illustration]                 │
│                                             │
│        No bookings yet                      │
│        Share your first referral link       │
│        to start earning.                    │
│                                             │
│        [Generate Your First Link]           │
│                                             │
└─────────────────────────────────────────────┘
```

- Centred layout with illustration/icon
- Clear headline + helpful description
- Single primary CTA
- `padding: 80px 24px`, `text-align: center`

### Error States

```
┌─────────────────────────────────────────────┐
│                                             │
│              ⚠️                             │
│                                             │
│        Something went wrong                 │
│        We couldn't load your earnings.      │
│        Please try again.                    │
│                                             │
│        [Retry]                              │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 7. Accessibility Requirements

| Requirement | Implementation |
|---|---|
| Keyboard navigation | All interactive elements focusable, visible focus ring (`box-shadow: 0 0 0 3px rgba(8,119,71,.2)`) |
| Screen reader labels | `aria-label` on icon buttons, `aria-expanded` on accordions, `aria-live` on dynamic content |
| Colour contrast | All text meets WCAG AA (4.5:1 for body, 3:1 for large text) |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables all animations |
| Focus management | Modal traps focus, route changes move focus to heading |
| Form validation | Inline error messages with `aria-describedby`, `aria-invalid` |
| Table semantics | `<table>`, `<th scope="col">`, `<caption>` for data tables |
| Status announcements | `role="status"` for toast notifications, `role="alert"` for errors |

---

## 8. Icon System

Using `lucide-react` (already in the codebase):

| Context | Icon | Size |
|---|---|---|
| Navigation: Overview | `LayoutDashboard` | 20px |
| Navigation: Discover | `Compass` | 20px |
| Navigation: Links | `Link2` | 20px |
| Navigation: Bookings | `CalendarDays` | 20px |
| Navigation: Earnings | `TrendingUp` | 20px |
| Navigation: Payouts | `Wallet` | 20px |
| Navigation: Profile | `User` | 20px |
| Actions: Copy | `Copy` | 16px |
| Actions: QR Code | `QrCode` | 16px |
| Actions: Download | `Download` | 16px |
| Actions: External link | `ExternalLink` | 16px |
| Status: Confirmed | `CheckCircle2` | 16px |
| Status: Pending | `Clock` | 16px |
| Status: Failed | `XCircle` | 16px |
| Status: Active | `Circle` (filled) | 10px |

---

## 9. Animation Library

Using `framer-motion` (already in the codebase):

```tsx
// Page transitions
<motion.div
  initial={{ opacity: 0, y: 6 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.24, ease: [0.3, 0.8, 0.4, 1] }}
>

// Stagger children
<motion.div variants={{ show: { transition: { staggerChildren: 0.06 } } }}>
  <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} />

// Number counter
<AnimatedNumber value={4280} duration={1.2} prefix="GHS " />
```

---

## 10. Implementation Priority

Build in this order for maximum design coherence:

1. **Shell** — top bar, navigation, page transitions, responsive layout
2. **Overview** — metric cards, chart placeholders, quick actions
3. **Discover** — tour cards, filters, "Get Link" flow
4. **Links** — referral code banner, link cards, generate modal
5. **Bookings** — booking list, status pills, filters
6. **Earnings** — summary cards, breakdown ledger, transaction history
7. **Payouts** — balance card, payout method, history
8. **Profile** — settings forms, notification toggles
9. **Polish** — animations, empty states, loading skeletons, micro-interactions
