import { motion } from 'framer-motion'
import { Copy, QrCode, BarChart3, Ban, Plus, Link2, CheckCircle2 } from 'lucide-react'

const LINKS = [
  { id: '1', tour: 'Kakum Canopy Walkway', url: 'travioghana.com/tours/kakum?ref=TRV-AMA-8X4K', clicks: 312, bookings: 18, earned: 'GHS 2,340', campaign: 'Summer Adventures', active: true },
  { id: '2', tour: 'Mole National Park Safari', url: 'travioghana.com/tours/mole?ref=TRV-AMA-8X4K', clicks: 248, bookings: 12, earned: 'GHS 1,800', campaign: 'Wild Ghana', active: true },
  { id: '3', tour: 'Cape Coast Castles', url: 'travioghana.com/tours/cape-coast?ref=TRV-AMA-8X4K', clicks: 198, bookings: 9, earned: 'GHS 1,170', campaign: 'Heritage Trail', active: true },
  { id: '4', tour: 'Boti Falls & Aburi', url: 'travioghana.com/tours/boti?ref=TRV-AMA-8X4K', clicks: 87, bookings: 4, earned: 'GHS 560', campaign: 'Nature Escape', active: false },
]

const stagger = { show: { transition: { staggerChildren: 0.06 } } }
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.3, 0.8, 0.4, 1] as const } },
}

export default function LinksPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={item} className="page-header">
        <div className="page-header-row">
          <div>
            <h1>Referral Links</h1>
            <p>Your personal booking links and their performance.</p>
          </div>
          <button type="button" className="btn btn-primary">
            <Plus size={18} /> Generate New Link
          </button>
        </div>
      </motion.div>

      {/* ── Referral code banner ── */}
      <motion.div variants={item} className="glass" style={{ padding: '24px 32px', marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontSize: 13, opacity: 0.7, fontWeight: 700, marginBottom: 6 }}>Your referral code</div>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
            TRV-AMA-8X4K
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="btn btn-sm" style={{ background: '#fff', color: 'var(--ink)' }}>
            <Copy size={15} /> Copy
          </button>
          <button type="button" className="btn btn-sm" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1px solid rgba(255,255,255,.2)' }}>
            <QrCode size={15} /> QR Code
          </button>
        </div>
      </motion.div>

      {/* ── Link cards ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {LINKS.map((link) => (
          <motion.div key={link.id} variants={item} className="card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700 }}>{link.tour}</h3>
                  <span className={`pill ${link.active ? 'pill-success' : 'pill-neutral'}`}>
                    {link.active ? (
                      <><CheckCircle2 size={12} /> Active</>
                    ) : (
                      <><Ban size={12} /> Disabled</>
                    )}
                  </span>
                </div>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13, color: 'var(--muted)', marginBottom: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {link.url}
                </div>
                <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'var(--muted)', flexWrap: 'wrap' }}>
                  <span><strong style={{ color: 'var(--ink)' }}>{link.clicks}</strong> clicks</span>
                  <span><strong style={{ color: 'var(--ink)' }}>{link.bookings}</strong> bookings</span>
                  <span><strong style={{ color: 'var(--green-cta)' }}>{link.earned}</strong> earned</span>
                  <span>Campaign: <strong style={{ color: 'var(--ink)' }}>{link.campaign}</strong></span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button type="button" className="btn btn-ghost btn-sm"><Copy size={15} /> Copy</button>
                <button type="button" className="btn btn-ghost btn-sm"><QrCode size={15} /></button>
                <button type="button" className="btn btn-ghost btn-sm"><BarChart3 size={15} /></button>
                <button type="button" className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }}><Ban size={15} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Empty state (hidden when links exist) ── */}
      {LINKS.length === 0 && (
        <div className="empty-state">
          <Link2 size={48} color="var(--muted-light)" />
          <h3>No links yet</h3>
          <p>Generate your first referral link to start earning commissions.</p>
          <button type="button" className="btn btn-primary">
            <Plus size={18} /> Generate Your First Link
          </button>
        </div>
      )}
    </motion.div>
  )
}
