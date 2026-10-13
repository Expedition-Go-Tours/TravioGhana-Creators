import { useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Compass,
  Link2,
  CalendarDays,
  TrendingUp,
  Wallet,
  User,
  Bell,
  Search,
  ChevronDown,
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Overview', path: '/creator', icon: LayoutDashboard },
  { label: 'Discover', path: '/creator/discover', icon: Compass },
  { label: 'Links', path: '/creator/links', icon: Link2 },
  { label: 'Bookings', path: '/creator/bookings', icon: CalendarDays },
  { label: 'Earnings', path: '/creator/earnings', icon: TrendingUp },
  { label: 'Payouts', path: '/creator/payouts', icon: Wallet },
  { label: 'Profile', path: '/creator/profile', icon: User },
]

export default function DashboardLayout() {
  const location = useLocation()
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <div className="dash-shell">
      {/* ── Top bar ── */}
      <header className="dash-topbar">
        <div className="dash-topbar-inner">
          <div className="dash-brand">
            <div className="dash-brand-logo">
              <div className="dash-brand-dot" />
              <span className="dash-brand-name">Travio Ghana</span>
            </div>
            <span className="dash-brand-badge">Creator Studio</span>
          </div>

          <div className="dash-topbar-actions">
            <button type="button" className="dash-icon-btn" aria-label="Search">
              <Search size={20} />
            </button>
            <button type="button" className="dash-icon-btn dash-bell" aria-label="Notifications">
              <Bell size={20} />
              <span className="dash-bell-badge" />
            </button>
            <button
              type="button"
              className="dash-avatar-btn"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-expanded={profileOpen}
            >
              <div className="dash-avatar">AM</div>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* ── Navigation tabs ── */}
        <nav className="dash-nav" aria-label="Creator navigation">
          <div className="dash-nav-inner">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/creator'}
                className={({ isActive }) =>
                  `dash-nav-tab${isActive ? ' dash-nav-tab--active' : ''}`
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      {/* ── Content ── */}
      <main className="dash-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: [0.3, 0.8, 0.4, 1] }}
            className="dash-content"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Profile dropdown ── */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            className="dash-profile-dropdown"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
          >
            <div className="dash-profile-header">
              <div className="dash-avatar dash-avatar--lg">AM</div>
              <div>
                <div className="dash-profile-name">Ama Mensah</div>
                <div className="dash-profile-email">ama@example.com</div>
              </div>
            </div>
            <div className="dash-profile-divider" />
            <NavLink to="/creator/profile" className="dash-profile-item" onClick={() => setProfileOpen(false)}>
              <User size={16} /> Profile Settings
            </NavLink>
            <button type="button" className="dash-profile-item dash-profile-logout">
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
