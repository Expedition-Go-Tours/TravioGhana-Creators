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
import { toast } from 'sonner'
import { useStore } from '../store/store'
import { ghs, formatDate } from '../lib/format'
import { Field } from '../components/ui/Field'
import StatusBadge from '../components/ui/StatusBadge'
import type { StatusVariant } from '../components/ui/StatusBadge'

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

function Toggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '12px 0', borderBottom: '1px solid var(--border-soft)' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ width: 18, height: 18, accentColor: 'var(--green)', marginTop: 2, flexShrink: 0 }}
      />
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</div>
        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{description}</div>
      </div>
    </label>
  )
}

export default function ProfilePage() {
  const { state, dispatch } = useStore()
  const { profile, notificationPrefs: prefs } = state
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    displayName: profile.displayName,
    email: profile.email,
    phone: profile.phone,
    bio: profile.bio,
    country: profile.country,
    website: profile.website,
    niche: profile.niche,
    audienceSize: profile.audienceSize,
    primaryPlatform: profile.contentPrefs.primaryPlatform,
    style: profile.contentPrefs.style,
    bestTime1: profile.contentPrefs.bestTime1,
    bestTime2: profile.contentPrefs.bestTime2,
    channels: profile.channels,
  })

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const toggleChannel = (ch: string) =>
    setForm((f) => ({ ...f, channels: f.channels.includes(ch) ? f.channels.filter((c) => c !== ch) : [...f.channels, ch] }))

  const saveProfile = () => {
    dispatch({
      type: 'profile/update',
      patch: {
        firstName: form.firstName,
        lastName: form.lastName,
        displayName: form.displayName,
        email: form.email,
        phone: form.phone,
        bio: form.bio,
        country: form.country,
        website: form.website,
        niche: form.niche,
        audienceSize: form.audienceSize,
        channels: form.channels,
        contentPrefs: {
          primaryPlatform: form.primaryPlatform,
          style: form.style,
          bestTime1: form.bestTime1,
          bestTime2: form.bestTime2,
        },
      },
    })
    toast.success('Profile updated')
  }

  const emailPrefs = prefs.email
  const pushPrefs = prefs.push
  const setEmailPref = (key: keyof typeof emailPrefs, value: boolean) =>
    dispatch({ type: 'prefs/notifications', patch: { email: { ...emailPrefs, [key]: value } } })
  const setPushPref = (key: keyof typeof pushPrefs, value: boolean) =>
    dispatch({ type: 'prefs/notifications', patch: { push: { ...pushPrefs, [key]: value } } })

  const recentPayouts = [...state.payouts].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3)

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
      <motion.div variants={item} className="card card-flat" style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
        <div style={{ background: 'var(--grad-mint)', padding: '32px 36px', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={profile.avatar}
              alt={form.displayName}
              style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: 'var(--shadow-md)' }}
            />
            <button
              type="button"
              data-wired="pending"
              title="Change photo (prototype: fixed demo avatar)"
              style={{
                position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%',
                background: 'var(--green)', color: '#fff', display: 'grid', placeItems: 'center',
                border: '2px solid #fff', cursor: 'pointer',
              }}
            >
              <Camera size={12} />
            </button>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, letterSpacing: '-.03em' }}>{form.displayName}</h2>
              {profile.verified && <BadgeCheck size={20} color="var(--green)" />}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>{form.website} · {form.country}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              <span className="pill pill-warning">
                <Star size={11} fill="currentColor" /> {profile.tier} Tier
              </span>
              {profile.active && <span className="pill pill-success">Active</span>}
              {profile.verified && <span className="pill pill-info">Verified</span>}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button type="button" className="btn btn-primary" onClick={saveProfile}>
              <Save size={16} /> Save Changes
            </button>
            <button type="button" className="btn btn-secondary" data-wired="pending">
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
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
              borderRadius: 'var(--r-md)', fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700,
              background: activeTab === tab.id ? 'var(--green)' : 'var(--bg-paper)',
              color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
              border: '1px solid ' + (activeTab === tab.id ? 'var(--green)' : 'var(--border)'),
              cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
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
              <div className="card card-flat">
                <h3 className="section-title">Personal Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Field label="First name"><input className="input" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} /></Field>
                    <Field label="Last name"><input className="input" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} /></Field>
                  </div>
                  <Field label="Display name" hint="Shown on your public profile and referral pages">
                    <input className="input" value={form.displayName} onChange={(e) => set('displayName', e.target.value)} />
                  </Field>
                  <Field label="Email address"><input className="input" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} /></Field>
                  <Field label="Phone number"><input className="input" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} /></Field>
                  <Field label="Bio" hint="Tell brands and audiences about yourself">
                    <textarea className="input" rows={3} value={form.bio} onChange={(e) => set('bio', e.target.value)} />
                  </Field>
                  <Field label="Country of residence">
                    <select className="select" value={form.country} onChange={(e) => set('country', e.target.value)}>
                      <option>Ghana</option>
                      <option>Nigeria</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                    </select>
                  </Field>
                </div>
              </div>

              <div>
                <div className="card card-flat" style={{ marginBottom: 16 }}>
                  <h3 className="section-title">Creator Profile</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                    <Field label="Website"><input className="input" value={form.website} onChange={(e) => set('website', e.target.value)} /></Field>
                    <Field label="Content niche">
                      <select className="select" value={form.niche} onChange={(e) => set('niche', e.target.value)}>
                        <option>Travel & Lifestyle</option>
                        <option>Adventure</option>
                        <option>Food & Culture</option>
                        <option>Wildlife & Nature</option>
                      </select>
                    </Field>
                    <Field label="Audience size">
                      <select className="select" value={form.audienceSize} onChange={(e) => set('audienceSize', e.target.value)}>
                        <option>Under 10K</option>
                        <option>10K - 50K</option>
                        <option>50K - 100K</option>
                        <option>100K+</option>
                      </select>
                    </Field>
                    <Field label="Preferred promotion channels" hint="Click to include or remove a channel">
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {['Instagram', 'TikTok', 'YouTube', 'Blog', 'Twitter'].map((ch) => {
                          const on = form.channels.includes(ch)
                          return (
                            <button
                              key={ch}
                              type="button"
                              onClick={() => toggleChannel(ch)}
                              className={`pill ${on ? 'pill-success' : 'pill-neutral'}`}
                              style={{ cursor: 'pointer', border: 'none' }}
                            >
                              {ch} {on ? '✓' : '+'}
                            </button>
                          )
                        })}
                      </div>
                    </Field>
                  </div>
                </div>

                <div className="card card-flat">
                  <h3 className="section-title">Profile Preview</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16, padding: 16, background: 'var(--bg-hover)', borderRadius: 'var(--r-lg)' }}>
                    <img src={profile.avatar} alt="" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>{form.displayName}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{form.bio}</div>
                      <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                        <span className="pill pill-warning" style={{ fontSize: 9 }}>{profile.tier} Tier</span>
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
                <div className="card card-flat" style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <h3 className="section-title" style={{ marginBottom: 0 }}>Payout Methods</h3>
                    <button type="button" className="btn btn-primary btn-sm" data-wired="pending">
                      <Plus size={14} /> Add Method
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {state.payoutMethods.map((m) => (
                      <div
                        key={m.id}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 14, padding: 16,
                          background: m.isDefault ? 'var(--green-bg)' : 'var(--bg-surface)',
                          border: `${m.isDefault ? 2 : 1}px solid ${m.isDefault ? 'var(--green)' : 'var(--border)'}`,
                          borderRadius: 'var(--r-lg)',
                        }}
                      >
                        <div style={{ width: 44, height: 44, borderRadius: 'var(--r-sm)', background: m.isDefault ? '#fff' : 'var(--bg-hover)', display: 'grid', placeItems: 'center' }}>
                          {m.type === 'mobile'
                            ? <Smartphone size={20} color={m.isDefault ? 'var(--green)' : 'var(--text-secondary)'} />
                            : <Building2 size={20} color={m.isDefault ? 'var(--green)' : 'var(--text-secondary)'} />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{m.label}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{m.details}</div>
                        </div>
                        {m.isDefault ? (
                          <span className="pill pill-success">Default ✓</span>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn btn-ghost btn-sm"
                              onClick={() => { dispatch({ type: 'payoutMethod/setDefault', id: m.id }); toast.success(`${m.label} set as default`) }}
                            >
                              Set Default
                            </button>
                            <button
                              type="button"
                              className="btn btn-ghost btn-sm"
                              style={{ color: 'var(--red)' }}
                              aria-label={`Remove ${m.label}`}
                              onClick={() => { dispatch({ type: 'payoutMethod/remove', id: m.id }); toast.success('Payout method removed') }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                    {state.payoutMethods.length === 0 && (
                      <div style={{ padding: 16, fontSize: 13, color: 'var(--text-tertiary)' }}>No payout methods yet.</div>
                    )}
                  </div>
                </div>

                <div className="card card-flat">
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
                <div className="card card-flat">
                  <h3 className="section-title">Payout History</h3>
                  <div style={{ marginTop: 16 }}>
                    {recentPayouts.map((p) => (
                      <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-soft)' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{ghs(p.amount)}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{formatDate(p.date)}</div>
                        </div>
                        <StatusBadge status={p.status as StatusVariant} />
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
              <div className="card card-flat">
                <h3 className="section-title">Email Notifications</h3>
                <div style={{ marginTop: 8 }}>
                  <Toggle label="Booking attributed" description="Get notified when a booking is attributed to your link" checked={emailPrefs.bookingAttributed} onChange={(v) => setEmailPref('bookingAttributed', v)} />
                  <Toggle label="Commission earned" description="Get notified when you earn commission" checked={emailPrefs.commissionEarned} onChange={(v) => setEmailPref('commissionEarned', v)} />
                  <Toggle label="Payout processed" description="Get notified when a payout is sent" checked={emailPrefs.payoutProcessed} onChange={(v) => setEmailPref('payoutProcessed', v)} />
                  <Toggle label="Weekly performance summary" description="Receive a weekly email with your performance stats" checked={emailPrefs.weeklySummary} onChange={(v) => setEmailPref('weeklySummary', v)} />
                  <Toggle label="New experiences available" description="Be the first to know about new tours you can promote" checked={emailPrefs.newExperiences} onChange={(v) => setEmailPref('newExperiences', v)} />
                  <Toggle label="Marketing tips" description="Occasional tips to grow your creator earnings" checked={emailPrefs.marketingTips} onChange={(v) => setEmailPref('marketingTips', v)} />
                </div>
              </div>

              <div>
                <div className="card card-flat" style={{ marginBottom: 16 }}>
                  <h3 className="section-title">Push Notifications</h3>
                  <div style={{ marginTop: 8 }}>
                    <Toggle label="Booking alerts" description="Real-time booking notifications" checked={pushPrefs.bookingAlerts} onChange={(v) => setPushPref('bookingAlerts', v)} />
                    <Toggle label="Payout updates" description="Payout status changes" checked={pushPrefs.payoutUpdates} onChange={(v) => setPushPref('payoutUpdates', v)} />
                    <Toggle label="Performance milestones" description="When you hit new milestones" checked={pushPrefs.milestones} onChange={(v) => setPushPref('milestones', v)} />
                  </div>
                </div>

                <div className="card card-flat">
                  <h3 className="section-title">Notification Schedule</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
                    <Field label="Quiet hours">
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input className="input" type="time" value={prefs.schedule.quietHoursStart} onChange={(e) => dispatch({ type: 'prefs/notifications', patch: { schedule: { ...prefs.schedule, quietHoursStart: e.target.value } } })} />
                        <span style={{ alignSelf: 'center', color: 'var(--text-tertiary)' }}>to</span>
                        <input className="input" type="time" value={prefs.schedule.quietHoursEnd} onChange={(e) => dispatch({ type: 'prefs/notifications', patch: { schedule: { ...prefs.schedule, quietHoursEnd: e.target.value } } })} />
                      </div>
                    </Field>
                    <Field label="Timezone">
                      <select className="select" value={prefs.schedule.timezone} onChange={(e) => dispatch({ type: 'prefs/notifications', patch: { schedule: { ...prefs.schedule, timezone: e.target.value } } })}>
                        <option value="GMT">GMT — Accra</option>
                        <option value="WAT">WAT — Lagos</option>
                        <option value="GMT+1">GMT+1 — London</option>
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
                <div className="card card-flat" style={{ marginBottom: 16 }}>
                  <h3 className="section-title">Change Password</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
                    <Field label="Current password">
                      <div style={{ position: 'relative' }}>
                        <input className="input" type={showPassword ? 'text' : 'password'} placeholder="Enter current password" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
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
                    <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-start' }} data-wired="pending">
                      <Key size={16} /> Update Password
                    </button>
                  </div>
                </div>

                <div className="card card-flat">
                  <h3 className="section-title">Two-Factor Authentication</h3>
                  <div style={{ marginTop: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-soft)' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>Authenticator App</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Use an authenticator app for 2FA</div>
                      </div>
                      <button type="button" className="btn btn-primary btn-sm" data-wired="pending" disabled={profile.twoFA.authenticatorEnabled}>
                        {profile.twoFA.authenticatorEnabled ? 'Enabled' : 'Enable'}
                      </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>SMS Verification</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Receive codes via SMS</div>
                      </div>
                      <button type="button" className="btn btn-secondary btn-sm" data-wired="pending" disabled={profile.twoFA.smsEnabled}>
                        {profile.twoFA.smsEnabled ? 'Enabled' : 'Enable'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="card card-flat" style={{ marginBottom: 16 }}>
                  <h3 className="section-title">Active Sessions</h3>
                  <div style={{ marginTop: 16 }}>
                    {state.sessions.map((s, i) => (
                      <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < state.sessions.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                            {s.device}
                            {s.current && <span className="pill pill-success" style={{ fontSize: 9 }}>Current</span>}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{s.location} · {s.time}</div>
                        </div>
                        {!s.current && (
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            style={{ color: 'var(--red)' }}
                            onClick={() => { dispatch({ type: 'sessions/revoke', id: s.id }); toast.success('Session revoked') }}
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                    {state.sessions.length === 0 && (
                      <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>No active sessions.</div>
                    )}
                  </div>
                </div>

                <div className="card card-flat">
                  <h3 className="section-title">Danger Zone</h3>
                  <div style={{ marginTop: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-soft)' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>Export Account Data</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Download all your data</div>
                      </div>
                      <button type="button" className="btn btn-secondary btn-sm" data-wired="pending">
                        <Download size={14} /> Export
                      </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--red)' }}>Delete Account</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Permanently delete your account and all data</div>
                      </div>
                      <button type="button" className="btn btn-danger btn-sm" data-wired="pending">
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
              <div className="card card-flat">
                <h3 className="section-title">Connected Accounts</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
                  {state.socialAccounts.map((s) => {
                    const Icon = s.platform === 'instagram' ? Instagram : s.platform === 'youtube' ? Youtube : s.platform === 'tiktok' ? Smartphone : Globe
                    return (
                      <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, background: s.connected ? 'var(--bg-hover)' : 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 'var(--r-sm)', background: s.color + '15', display: 'grid', placeItems: 'center' }}>
                          <Icon size={18} color={s.color} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 13 }}>{s.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{s.handle}</div>
                        </div>
                        {s.connected ? (
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => { dispatch({ type: 'social/toggle', id: s.id }); toast.success(`${s.name} disconnected`) }}
                          >
                            Disconnect
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => { dispatch({ type: 'social/toggle', id: s.id }); toast.success(`${s.name} connected`) }}
                          >
                            Connect
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <div className="card card-flat" style={{ marginBottom: 16 }}>
                  <h3 className="section-title">Content Preferences</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
                    <Field label="Primary content platform">
                      <select className="select" value={form.primaryPlatform} onChange={(e) => set('primaryPlatform', e.target.value)}>
                        <option>Instagram</option>
                        <option>TikTok</option>
                        <option>YouTube</option>
                        <option>Blog / Website</option>
                      </select>
                    </Field>
                    <Field label="Content style">
                      <select className="select" value={form.style} onChange={(e) => set('style', e.target.value)}>
                        <option>Reels & Stories</option>
                        <option>Long-form Video</option>
                        <option>Photo Posts</option>
                        <option>Blog Articles</option>
                      </select>
                    </Field>
                    <Field label="Best posting times">
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input className="input" type="time" value={form.bestTime1} onChange={(e) => set('bestTime1', e.target.value)} />
                        <input className="input" type="time" value={form.bestTime2} onChange={(e) => set('bestTime2', e.target.value)} />
                      </div>
                    </Field>
                  </div>
                </div>

                <div className="card card-flat">
                  <h3 className="section-title">Creator Agreement</h3>
                  <div style={{ marginTop: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-soft)' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>Creator Terms v2.1</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Accepted on {formatDate(profile.agreementDate)}</div>
                      </div>
                      <span className="pill pill-success">Accepted ✓</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>Privacy Notice</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Last updated 1 Aug 2026</div>
                      </div>
                      <button type="button" className="btn btn-ghost btn-sm" data-wired="pending">View</button>
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
