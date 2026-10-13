# Travio Ghana — Creator Dashboard Design Specification

> Extracted from `https://www.travioghana.com/content-creators`
> Source files: `src/pages/ContentCreatorsPage.tsx`, `src/styles/ContentCreators.css`, `src/styles/partner-pages.css`

---

## 1. Design Tokens

### Colour palette

| Token | Value | Usage |
|---|---|---|
| `--eg-green` | `#1b674c` | Primary brand green — CTAs, emphasis, hero accent |
| `--eg-green-dark` | `#103e30` | Dark green — hover states, deep surfaces |
| `--eg-green-deep` | `#092b22` | Darkest green — gradient endpoints |
| `--eg-forest` | `#193f33` | Forest green — dark card backgrounds |
| `--eg-forest2` | `#102e26` | Deeper forest — overlays |
| `--eg-ink` | `#15201d` | Primary text (near-black) |
| `--eg-muted` | `#626c68` | Secondary/body text |
| `--eg-paper` | `#f3f1eb` | Warm paper background |
| `--eg-cream` | `#faf9f5` | Light cream surface |
| `--eg-mint` | `#edf4ef` | Subtle green tint background |
| `--eg-sand` | `#efe6d7` | Warm sand accent |
| `--eg-terracotta` | `#c75c3d` | Warm accent |
| `--eg-amber` | `#e4a74d` | Gold/amber accent |
| `--eg-orange` | `#e16e3f` | Accent dots, step numbers, small highlights |
| `--eg-accent` | `#d9ee87` | Lime accent |
| `--eg-accent2` | `#d8f676` | Bright lime — check circles |
| `--eg-acid` | `#d5e5a8` | Soft lime |
| `--eg-line` | `rgba(21,32,29,.14)` | Borders, dividers |

**Card surface colours (inline):**
- Standard card: `#fff` with `1px solid #dfe7e1`
- Featured card: `#087747` (solid green) with white text
- Section alternate: `#f8faf8` (very light green-grey)
- Benefits section bg: `#e9f8ef` (soft mint)

### Typography

| Role | Font | Weight | Size | Tracking | Line-height |
|---|---|---|---|---|---|
| Display headline | `Manrope` (`--font-display`) | 800 | `clamp(3rem, 6.4vw, 6.3rem)` | `-0.072em` | `0.94` |
| Section title | `Manrope` | 800 | `clamp(46px, 5.6vw, 78px)` | `-0.055em` | `0.94` |
| CTA headline | `Manrope` | 800 | `clamp(52px, 7vw, 96px)` | `-0.055em` | `0.94` |
| Card heading | `Manrope` | 700 | 21–26px | — | `1.08` |
| Kicker / badge | `Manrope` | 800 | `0.78rem` / `12px` | `0.15em` | `1` |
| Body | `DM Sans` (`--font-body`) | 400–500 | `1.1rem` / `16px` | — | `1.5–1.65` |
| Small / proof | `DM Sans` | 700 | `0.82rem` | — | — |
| Step number | `Manrope` | 800 | `13px` | — | — |
| Big stat | `Manrope` | 800 | `42px` | `-0.04em` | — |

Fonts are self-hosted: `manrope-variable-latin.woff2`, `dmsans-variable-latin.woff2`.

### Spacing & layout

| Property | Value |
|---|---|
| Container | `min(1200px, calc(100% - 40px))` centred |
| Section padding | `120px 0` (desktop), `80px 0` (mobile) |
| Hero top padding | `112px` (desktop), `88px` (mobile) |
| Card gap | `16px` (grids), `12px` (step stack), `18px` (marquee) |
| Border radius (cards) | `22px` (benefits), `18px` (steps), `27px` (marquee cards) |
| Border radius (buttons) | `14px` |
| Border radius (pills) | `999px` |
| Border radius (CTA banner) | `36px` |
| Border radius (glass overlay) | `21px` |

### Shadows

| Context | Value |
|---|---|
| Marquee card | `0 18px 45px rgba(5,52,31,.11)` |
| Glass overlay | `0 22px 55px rgba(4,35,22,.2)` |
| Benefit hover | `0 20px 45px rgba(20,35,30,.08)` |
| Primary button | `0 12px 32px rgba(8,119,71,.2)` |

---

## 2. Page Structure & Section Anatomy

The `/content-creators` page is composed of seven sections. The creator dashboard should reuse this vocabulary.

### 2.1 Hero (centred)

```
┌─────────────────────────────────────────────────────┐
│  [●] Creator programme                    ← kicker  │
│                                                     │
│  Create content.                                    │
│  Earn on Ghana experiences.              ← display  │
│                                                     │
│  Join the Travio Ghana creator programme... ← body  │
│                                                     │
│  [Coming soon]  [Learn more]              ← CTAs    │
│                                                     │
│  ● Transparent commission  ● Curated...   ← proof   │
│                                                     │
│  ╔═══════════════════════════════════════╗           │
│  ║  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ║           │
│  ║  │  │ │  │ │  │ │  │ │  │ │  │ │  │ ║ ← marquee │
│  ║  └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ ║           │
│  ╚═══════════════════════════════════════╝           │
│  ┌─────────────────────────────────────────┐        │
│  │ Authentic travel content starts with... │        │
│  │ ✓ Curated experiences                  │        │
│  │ ✓ Earn commission                      │        │
│  │ ✓ Dedicated creator support            │        │
│  └─────────────────────────────────────────┘ ← glass│
└─────────────────────────────────────────────────────┘
```

**Key elements:**
- **Kicker badge**: inline-flex pill, `border: 1px solid #cae3d3`, `background: #e9f8ef`, `color: #075634`, 8px orange dot prefix
- **Display headline**: two-line, second line in `--eg-green` italic-emphasis
- **CTA buttons**: primary = solid `#087747` with white text + shadow; secondary = white with `#cfdad2` border
- **Proof points**: horizontal flex, 7px orange dots, `0.82rem` bold
- **Image marquee**: infinite horizontal scroll (34s linear), 290×410px cards, even cards offset `translateY(25px)`, hover pause, gradient fade edges (8vw)
- **Community overlay**: absolutely positioned dark glass card (`rgba(5,45,29,.88)`, `backdrop-filter: blur(12px)`), flex row with headline + checklist

### 2.2 Benefits

Three-column card grid (`repeat(3, 1fr)`, gap 16px). Each card:
- Min-height 330px, border `#dfe7e1`, radius 22px, padding 28px
- Icon (28px glyph) top, heading + body bottom (flex column, space-between)
- Hover: `translateY(-8px)` + shadow
- **First card is featured**: solid `#087747` background, white text, white body text at 70% opacity

Section header: flex row with display title left + body paragraph right (max-width 440px).

### 2.3 How It Works (sticky sidebar)

Two-column grid (`.85fr 1.15fr`, gap 80px):
- **Left (sticky)**: kicker badge + display title + body paragraph. `position: sticky; top: 30px`
- **Right**: vertical step stack (gap 12px). Each step card:
  - White bg, `#dfe7e1` border, radius 18px, padding 24px
  - Grid: `48px 1fr` — orange circle (48×48px, `--eg-orange` bg, white bold number) + heading + body
  - Hover: `translateX(8px)`

### 2.4 Earnings / Stats

Three-column centred stat cards (max-width 900px, `repeat(3, 1fr)`):
- White bg, `#dfe7e1` border, radius 22px, padding 28px
- Big stat number: `42px`, `--eg-green` (#087747), `--font-display`, `-0.04em` tracking
- Label below: `14px`, `#5e6b64`, bold

Current values: `15%` (commission), `30 days` (cookie window), `Monthly` (payout cycle).

### 2.5 FAQ

Uses `FAQAccordion` component (`eg-faq` / `eg-faq-item` / `eg-faq-btn` / `eg-faq-a`):
- First item open by default
- Button row: question text + `+` icon (rotates to `×` when open)
- Answer panel: height animated via `ResizeObserver`, max-height 200px cap
- Accessible: `aria-expanded`, keyboard toggle

### 2.6 CTA Banner

Full-width rounded card (radius 36px, padding 80px):
- Dark green background (`#075634` or `--eg-green`)
- Eyebrow text (uppercase, `0.15em` tracking, 50% white)
- Display headline (two-line)
- Body paragraph (75% white, max-width 520px)
- White pill button (radius 999px, bold)
- Decorative circle: `right: -100px; top: -100px; width: 460px` (same as `eg-cta:after`)

### 2.7 Footer

Standard site footer (shared `Footer` component).

---

## 3. Interaction Patterns

| Pattern | Implementation |
|---|---|
| Scroll reveal | `RevealOnScroll` wrapper — IntersectionObserver adds `.visible` class |
| Marquee | CSS `@keyframes cc-marquee` — `translateX(calc(-50% - 9px))`, 34s linear infinite, pause on hover |
| Card hover | `transform: translateY(-8px)` or `translateX(8px)` + `box-shadow` transition (0.25–0.3s) |
| Button hover | `transform: translateY(-2px)` + shadow (0.2s) |
| Image hover | `transform: scale(1.05)` (0.6s) |
| FAQ toggle | State-driven open/close, ResizeObserver height animation |
| Coming soon | `useComingSoon()` hook — `aria-disabled="true"`, `title` tooltip, `is-coming-soon` class (not `disabled` so tooltip works) |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` — disables marquee, card transitions, button transitions |

---

## 4. Content Structure (for dashboard mapping)

The page's content sections map to dashboard modules as follows:

| Page section | Dashboard equivalent |
|---|---|
| Hero + marquee | Dashboard overview header with key metrics |
| Community overlay | Quick-win summary card (earnings snapshot) |
| Benefits (3 cards) | Key metric cards (clicks, bookings, earnings) |
| How it works (steps) | Step-by-step guide or onboarding checklist |
| Earnings stats | Financial summary row (commission rate, cookie window, payout cycle) |
| FAQ | Help / FAQ section |
| CTA banner | Promotional banner or upgrade prompt |

---

## 5. Component Reuse Checklist

Components available in the existing codebase that should be reused:

| Component | Path | Purpose |
|---|---|---|
| `RevealOnScroll` | `src/components/shared/RevealOnScroll` | Scroll-triggered reveal animations |
| `FAQAccordion` | `src/components/shared/FAQAccordion` | Accessible FAQ with smooth height |
| `BundledImage` | `src/components/shared/BundledImage` | Optimised responsive images |
| `Footer` | `src/components/Footer` | Site-wide footer |
| `SEO` | `src/components/SEO` | Meta tags + JSON-LD |
| `useComingSoon` | `src/hooks/useComingSoon` | Disabled/coming-soon button pattern |
| `useAuthUser` | `src/hooks/useAuthUser` | Current user state |
| `setAuthReturnTo` | `src/lib/auth` | Post-login redirect |
| `OptimizedImage` | `src/components/shared/OptimizedImage` | Cloudinary-aware responsive images |

---

## 6. Responsive Breakpoints

| Breakpoint | Layout changes |
|---|---|
| `≤ 900px` | Benefits grid → 2 columns; how-it-works grid → 1 column (sticky becomes static); benefit head stacks vertically |
| `≤ 600px` | Hero padding → 88px; headline → 46px; body → 16px; section padding → 80px; benefits grid → 1 column; benefit min-height → 260px; community overlay → column layout, padding 20px |
| `prefers-reduced-motion` | Marquee disabled; all transitions disabled |

---

## 7. Design Principles

1. **Green-forward palette** — deep greens (`#087747`, `#075634`) for CTAs and emphasis, soft mints (`#e9f8ef`, `#f8faf8`) for section backgrounds
2. **Orange as spark** — `--eg-orange` (#e16e3f) used sparingly for dots, step numbers, small accents
3. **Display typography** — Manrope 800 with heavy negative tracking for headlines; DM Sans for body
4. **Generous whitespace** — 120px section padding, 22–27px card radii
5. **Hover lift** — cards lift on hover (`translateY(-8px)` or `translateX(8px)`)
6. **Glass overlays** — dark translucent cards with `backdrop-filter: blur()` for floating content
7. **Numbered steps** — orange circles with white numbers for sequential flows
8. **Featured first card** — first card in a grid gets solid green treatment
9. **Smooth reveals** — all sections fade in on scroll via IntersectionObserver
10. **Accessible by default** — keyboard-navigable FAQ, `aria-disabled` (not `disabled`) for coming-soon, `prefers-reduced-motion` support
