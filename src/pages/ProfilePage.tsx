import { motion } from 'framer-motion'
import { User, Bell, Shield, Save } from 'lucide-react'

const stagger = { show: { transition: { staggerChildren: 0.06 } } }
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.3, 0.8, 0.4, 1] as const } },
}

export default function ProfilePage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={item} className="page-header">
        <h1>Profile & Settings</h1>
        <p>Manage your public profile, notifications, and account security.</p>
      </motion.div>

      {/* ── Profile header ── */}
      <motion.div variants={item} className="card card-flat" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--green-cta)', display: 'grid', placeItems: 'center', color: '#fff', fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800 }}>
          AM
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em' }}>Ama Mensah</div>
          <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>@amamensah · Creator since Aug 2026</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <span className="pill" style={{ background: 'var(--sand)', color: '#7a5c1e' }}>🏅 Gold Tier</span>
            <span className="pill pill-success">Active</span>
          </div>
        </div>
        <button type="button" className="btn btn-secondary">Edit Profile</button>
      </motion.div>

      <div className="grid-2-equal">
        {/* ── Public profile ── */}
        <motion.div variants={item} className="card card-flat">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <User size={20} color="var(--green-cta)" />
            <h2 className="section-title" style={{ marginBottom: 0 }}>Public Profile</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="field">
              <label className="field-label">Display name</label>
              <input type="text" defaultValue="Ama Mensah" />
            </div>
            <div className="field">
              <label className="field-label">Bio</label>
              <textarea rows={3} defaultValue="Travel content creator sharing authentic Ghana experiences." />
            </div>
            <div className="field">
              <label className="field-label">Instagram</label>
              <input type="text" defaultValue="@amamensah" />
            </div>
            <div className="field">
              <label className="field-label">YouTube</label>
              <input type="text" defaultValue="/c/amamensah" />
            </div>
            <div className="field">
              <label className="field-label">Website</label>
              <input type="url" defaultValue="amamensah.com" />
            </div>
            <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </motion.div>

        <div>
          {/* ── Notifications ── */}
          <motion.div variants={item} className="card card-flat" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Bell size={20} color="var(--green-cta)" />
              <h2 className="section-title" style={{ marginBottom: 0 }}>Notifications</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Email me when a booking is attributed', checked: true },
                { label: 'Email me when a payout is processed', checked: true },
                { label: 'Weekly performance summary', checked: false },
                { label: 'Notify me about new experiences', checked: true },
              ].map((n) => (
                <label key={n.label} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    defaultChecked={n.checked}
                    style={{ width: 18, height: 18, accentColor: 'var(--green-cta)' }}
                  />
                  <span style={{ fontSize: 14 }}>{n.label}</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* ── Security ── */}
          <motion.div variants={item} className="card card-flat">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Shield size={20} color="var(--green-cta)" />
              <h2 className="section-title" style={{ marginBottom: 0 }}>Account Security</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button type="button" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                Change password
              </button>
              <button type="button" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                Two-factor authentication
              </button>
              <button type="button" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                Active sessions
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
