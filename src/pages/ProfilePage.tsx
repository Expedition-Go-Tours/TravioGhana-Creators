import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  CreditCard,
  Bell,
  Shield,
  Globe,
  Camera,
  Save,
  Plus,
  Trash2,
  Building2,
  Smartphone,
  Key,
  Eye,
  EyeOff,
  Download,
  Star,
  BadgeCheck,
  Instagram,
  Youtube,
} from 'lucide-react'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'payouts', label: 'Payout Methods', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'social', label: 'Social Accounts', icon: Globe },
]

const stagger = { show: { transition: { staggerChildren: 0.06 } } }
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.3, 0.8, 0.4, 1] as const } },
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      {children}
      {hint && <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{hint}</div>}
    </div>
  )
}

function Toggle({ label, description, defaultChecked }: { label: string; description: string; defaultChecked?: boolean }) {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '12px 0', borderBottom: '1px solid var(--border-soft)' }}>
      <input type="checkbox" defaultChecked={defaultChecked} style={{ width: 18, height: 18, accentColor: 'var(--green)', marginTop: 2, flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</div>
        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{description}</div>
      </div>
    </label>
  )
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* ── Header ── */}
      <motion.div variants={item} className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your profile, payout methods, notifications, and account security.</p>
        </div>
      </motion.div>

      {/* ── Profile hero card ── */}
      <motion.div variants={item} className="card" style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
        <div style={{ background: 'var(--grad-mint)', padding: '32px 36px', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
              alt="Ama Mensah"
              style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: 'var(--shadow-md)' }}
            />
            <button
              type="button"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'var(--green)',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                border: '2px solid #fff',
                cursor: 'pointer',
              }}
            >
              <Camera size={12} />
            </button>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, letterSpacing: '-.03em' }}>Ama Mensah</h2>
              <BadgeCheck size={20} color="var(--green)" />
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>@amamensah · amamensah.com</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <span className="pill" style={{ background: 'var(--sand)', color: '#7a5c1e' }}>
                <Star size={11} fill="currentColor" /> Gold Tier
              </span>
              <span className="pill pill-success">Active</span>
              <span className="pill pill-info">Verified</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button type="button" className="btn btn-primary">
              <Save size={16} /> Save Changes
            </button>
            <button type="button" className="btn btn-secondary">
              <Download size={16} /> Export Data
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Tab navigation ── */}
      <motion.div variants={item} style={{ display: 'flex', gap: 4, marginBottom: 24, overflowX: 'auto', paddingBottom: 2 }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 'var(--r-md)',
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 700,
              background: activeTab === tab.id ? 'var(--green)' : 'var(--bg-paper)',
              color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
              border: '1px solid ' + (activeTab === tab.id ? 'var(--green)' : 'var(--border)'),
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* ── Tab content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {/* ── Profile tab ── */}
          {activeTab === 'profile' && (
            <div className="grid-2-equal">
              <div className="card">
                <h3 className="section-title">Personal Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Field label="First name"><input className="input" defaultValue="Ama" /></Field>
                    <Field label="Last name"><input className="input" defaultValue="Mensah" /></Field>
                  </div>
                  <Field label="Display name" hint="Shown on your public profile and referral pages">
                    <input className="input" defaultValue="Ama Mensah" />
                  </Field>
                  <Field label="Email address"><input className="input" type="email" defaultValue="ama@example.com" /></Field>
                  <Field label="Phone number"><input className="input" type="tel" defaultValue="+233 24 123 4567" /></Field>
                  <Field label="Bio" hint="Tell brands and audiences about yourself">
                    <textarea className="input" rows={3} defaultValue="Travel content creator sharing authentic Ghana experiences with the world." />
                  </Field>
                  <Field label="Country of residence">
                    <select className="select" defaultValue="Ghana">
                      <option>Ghana</option>
                      <option>Nigeria</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                    </select>
                  </Field>
                </div>
              </div>

              <div>
                <div className="card" style={{ marginBottom: 16 }}>
                  <h3 className="section-title">Creator Profile</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                    <Field label="Website"><input className="input" defaultValue="amamensah.com" /></Field>
                    <Field label="Content niche">
                      <select className="select" defaultValue="Travel & Lifestyle">
                        <option>Travel & Lifestyle</option>
                        <option>Adventure</option>
                        <option>Food & Culture</option>
                        <option>Wildlife & Nature</option>
                      </select>
                    </Field>
                    <Field label="Audience size">
                      <select className="select" defaultValue="10K - 50K">
                        <option>Under 10K</option>
                        <option>10K - 50K</option>
                        <option>50K - 100K</option>
                        <option>100K+</option>
                      </select>
                    </Field>
                    <Field label="Preferred promotion channels">
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {['Instagram', 'TikTok', 'YouTube', 'Blog', 'Twitter'].map((ch) => (
                          <span key={ch} className="pill pill-success" style={{ cursor: 'pointer' }}>{ch} ✓</span>
                        ))}
                      </div>
                    </Field>
                  </div>
                </div>

                <div className="card">
                  <h3 className="section-title">Profile Preview</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16, padding: 16, background: 'var(--bg-hover)', borderRadius: 'var(--r-lg)' }}>
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                      alt=""
                      style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>Ama Mensah</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Travel content creator sharing authentic Ghana experiences.</div>
                      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                        <span className="pill pill-success" style={{ fontSize: 9 }}>Gold Tier</span>
                        <span className="pill pill-info" style={{ fontSize: 9 }}>Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Payout Methods tab ── */}
          {activeTab === 'payouts' && (
            <div className="grid-2-equal">
              <div>
                <div className="card" style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <h3 className="section-title" style={{ marginBottom: 0 }}>Payout Methods</h3>
                    <button type="button" className="btn btn-primary btn-sm">
                      <Plus size={14} /> Add Method
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* Bank account */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: 'var(--green-bg)', border: '2px solid var(--green)', borderRadius: 'var(--r-lg)' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fff', display: 'grid', placeItems: 'center' }}>
                        <Building2 size={20} color="var(--green)" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>Ecobank Ghana</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>****4523 · Checking</div>
                      </div>
                      <span className="pill pill-success">Default ✓</span>
                    </div>

                    {/* Mobile money */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--bg-hover)', display: 'grid', placeItems: 'center' }}>
                        <Smartphone size={20} color="var(--text-secondary)" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>MTN Mobile Money</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>****7890</div>
                      </div>
                      <button type="button" className="btn btn-ghost btn-sm">Set Default</button>
                      <button type="button" className="btn btn-ghost btn-sm" style={{ color: 'var(--red)' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="section-title">Payout Preferences</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
                    <Field label="Payout frequency">
                      <select className="select" defaultValue="Monthly">
                        <option>Weekly</option>
                        <option>Bi-weekly</option>
                        <option>Monthly</option>
                      </select>
                    </Field>
                    <Field label="Minimum payout threshold">
                      <input className="input" defaultValue="GHS 500" />
                    </Field>
                    <Field label="Payout currency">
                      <select className="select" defaultValue="GHS">
                        <option>GHS — Ghanaian Cedi</option>
                        <option>USD — US Dollar</option>
                        <option>GBP — British Pound</option>
                      </select>
                    </Field>
                  </div>
                </div>
              </div>

              <div>
                <div className="card">
                  <h3 className="section-title">Payout History</h3>
                  <div style={{ marginTop: 16 }}>
                    {[
                      { date: '01 Oct 2026', amount: 'GHS 2,400', status: 'completed' },
                      { date: '01 Sep 2026', amount: 'GHS 1,800', status: 'completed' },
                      { date: '01 Aug 2026', amount: 'GHS 2,100', status: 'failed' },
                    ].map((p, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 2 ? '1px solid var(--border-soft)' : 'none' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{p.amount}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{p.date}</div>
                        </div>
                        <span className={`pill pill-${p.status === 'completed' ? 'success' : 'error'}`}>
                          {p.status === 'completed' ? '✓ Completed' : '✗ Failed'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Notifications tab ── */}
          {activeTab === 'notifications' && (
            <div className="grid-2-equal">
              <div className="card">
                <h3 className="section-title">Email Notifications</h3>
                <div style={{ marginTop: 8 }}>
                  <Toggle label="Booking attributed" description="Get notified when a booking is attributed to your link" defaultChecked />
                  <Toggle label="Commission earned" description="Get notified when you earn commission" defaultChecked />
                  <Toggle label="Payout processed" description="Get notified when a payout is sent" defaultChecked />
                  <Toggle label="Weekly performance summary" description="Receive a weekly email with your performance stats" />
                  <Toggle label="New experiences available" description="Be the first to know about new tours you can promote" defaultChecked />
                  <Toggle label="Marketing tips" description="Occasional tips to grow your creator earnings" />
                </div>
              </div>

              <div>
                <div className="card" style={{ marginBottom: 16 }}>
                  <h3 className="section-title">Push Notifications</h3>
                  <div style={{ marginTop: 8 }}>
                    <Toggle label="Booking alerts" description="Real-time booking notifications" defaultChecked />
                    <Toggle label="Payout updates" description="Payout status changes" defaultChecked />
                    <Toggle label="Performance milestones" description="When you hit new milestones" defaultChecked />
                  </div>
                </div>

                <div className="card">
                  <h3 className="section-title">Notification Schedule</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
                    <Field label="Quiet hours">
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input className="input" type="time" defaultValue="22:00" />
                        <span style={{ alignSelf: 'center', color: 'var(--text-tertiary)' }}>to</span>
                        <input className="input" type="time" defaultValue="08:00" />
                      </div>
                    </Field>
                    <Field label="Timezone">
                      <select className="select" defaultValue="GMT">
                        <option>GMT — Accra</option>
                        <option>WAT — Lagos</option>
                        <option>GMT+1 — London</option>
                      </select>
                    </Field>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Security tab ── */}
          {activeTab === 'security' && (
            <div className="grid-2-equal">
              <div>
                <div className="card" style={{ marginBottom: 16 }}>
                  <h3 className="section-title">Change Password</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
                    <Field label="Current password">
                      <div style={{ position: 'relative' }}>
                        <input className="input" type={showPassword ? 'text' : 'password'} placeholder="Enter current password" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', cursor: 'pointer' }}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </Field>
                    <Field label="New password">
                      <input className="input" type="password" placeholder="Enter new password" />
                    </Field>
                    <Field label="Confirm new password">
                      <input className="input" type="password" placeholder="Confirm new password" />
                    </Field>
                    <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                      <Key size={16} /> Update Password
                    </button>
                  </div>
                </div>

                <div className="card">
                  <h3 className="section-title">Two-Factor Authentication</h3>
                  <div style={{ marginTop: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-soft)' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>Authenticator App</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Use an authenticator app for 2FA</div>
                      </div>
                      <button type="button" className="btn btn-primary btn-sm">Enable</button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>SMS Verification</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Receive codes via SMS</div>
                      </div>
                      <button type="button" className="btn btn-secondary btn-sm">Enable</button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="card" style={{ marginBottom: 16 }}>
                  <h3 className="section-title">Active Sessions</h3>
                  <div style={{ marginTop: 16 }}>
                    {[
                      { device: 'Chrome on macOS', location: 'Accra, Ghana', current: true, time: 'Now' },
                      { device: 'Safari on iPhone', location: 'Accra, Ghana', current: false, time: '2 hours ago' },
                    ].map((s, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 1 ? '1px solid var(--border-soft)' : 'none' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                            {s.device}
                            {s.current && <span className="pill pill-success" style={{ fontSize: 9 }}>Current</span>}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{s.location} · {s.time}</div>
                        </div>
                        {!s.current && (
                          <button type="button" className="btn btn-ghost btn-sm" style={{ color: 'var(--red)' }}>Revoke</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="section-title">Danger Zone</h3>
                  <div style={{ marginTop: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-soft)' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>Export Account Data</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Download all your data</div>
                      </div>
                      <button type="button" className="btn btn-secondary btn-sm">
                        <Download size={14} /> Export
                      </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--red)' }}>Delete Account</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Permanently delete your account and all data</div>
                      </div>
                      <button type="button" className="btn btn-danger btn-sm">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Social Accounts tab ── */}
          {activeTab === 'social' && (
            <div className="grid-2-equal">
              <div className="card">
                <h3 className="section-title">Connected Accounts</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
                  {[
                    { name: 'Instagram', handle: '@amamensah', icon: Instagram, connected: true, color: '#E1306C' },
                    { name: 'YouTube', handle: '/c/amamensah', icon: Youtube, connected: true, color: '#FF0000' },
                    { name: 'TikTok', handle: '@amamensah', icon: Smartphone, connected: true, color: '#000' },
                    { name: 'Twitter / X', handle: '@amamensah', icon: Globe, connected: false, color: '#1DA1F2' },
                  ].map((s) => (
                    <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, background: s.connected ? 'var(--bg-hover)' : 'var(--bg-surface)', border: '1px solid ' + (s.connected ? 'var(--border)' : 'var(--border)'), borderRadius: 'var(--r-lg)' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: s.color + '15', display: 'grid', placeItems: 'center' }}>
                        <s.icon size={18} color={s.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{s.handle}</div>
                      </div>
                      {s.connected ? (
                        <span className="pill pill-success">Connected ✓</span>
                      ) : (
                        <button type="button" className="btn btn-secondary btn-sm">Connect</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="card" style={{ marginBottom: 16 }}>
                  <h3 className="section-title">Content Preferences</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
                    <Field label="Primary content platform">
                      <select className="select" defaultValue="Instagram">
                        <option>Instagram</option>
                        <option>TikTok</option>
                        <option>YouTube</option>
                        <option>Blog / Website</option>
                      </select>
                    </Field>
                    <Field label="Content style">
                      <select className="select" defaultValue="Reels & Stories">
                        <option>Reels & Stories</option>
                        <option>Long-form Video</option>
                        <option>Photo Posts</option>
                        <option>Blog Articles</option>
                      </select>
                    </Field>
                    <Field label="Best posting times">
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input className="input" type="time" defaultValue="09:00" />
                        <input className="input" type="time" defaultValue="18:00" />
                      </div>
                    </Field>
                  </div>
                </div>

                <div className="card">
                  <h3 className="section-title">Creator Agreement</h3>
                  <div style={{ marginTop: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-soft)' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>Creator Terms v2.1</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Accepted on 15 Aug 2026</div>
                      </div>
                      <span className="pill pill-success">Accepted ✓</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>Privacy Notice</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Last updated 1 Aug 2026</div>
                      </div>
                      <button type="button" className="btn btn-ghost btn-sm">View</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
