import { useState } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
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
  Settings,
  LogOut,
  BarChart3,
  BadgeCheck,
  Star,
} from 'lucide-react'

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', path: '/creator', icon: LayoutDashboard, end: true },
      { label: 'Discover', path: '/creator/discover', icon: Compass },
    ],
  },
  {
    label: 'Performance',
    items: [
      { label: 'Links', path: '/creator/links', icon: Link2 },
      { label: 'Bookings', path: '/creator/bookings', icon: CalendarDays },
    ],
  },
  {
    label: 'Finance',
    items: [
      { label: 'Earnings', path: '/creator/earnings', icon: TrendingUp },
      { label: 'Reports', path: '/creator/reports', icon: BarChart3 },
      { label: 'Payouts', path: '/creator/payouts', icon: Wallet },
    ],
  },
  {
    label: 'Account',
    items: [
      { label: 'Settings', path: '/creator/profile', icon: Settings },
    ],
  },
]

const BREADCRUMB_MAP: Record<string, string> = {
  '/creator': 'Dashboard',
  '/creator/discover': 'Discover',
  '/creator/links': 'Links',
  '/creator/bookings': 'Bookings',
  '/creator/earnings': 'Earnings',
  '/creator/reports': 'Reports',
  '/creator/payouts': 'Payouts',
  '/creator/profile': 'Settings',
}

export default function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <div className="shell">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">TG</div>
          <div className="sidebar-brand">
            <span className="sidebar-brand-name">Travio Ghana</span>
            <span className="sidebar-brand-badge">Creator Studio</span>
          </div>
        </div>

        {/* ── Profile card at top (like supplier dashboard) ── */}
        <div
          className="sidebar-profile-card"
          onClick={() => navigate('/creator/profile')}
          role="button"
          tabIndex={0}
        >
          <div className="sidebar-profile-avatar">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
              alt="Ama Mensah"
              className="sidebar-profile-img"
            />
            <div className="sidebar-profile-badge">
              <BadgeCheck size={12} />
            </div>
          </div>
          <div className="sidebar-profile-info">
            <div className="sidebar-profile-name">Ama Mensah</div>
            <div className="sidebar-profile-role">
              <Star size={10} fill="var(--orange)" color="var(--orange)" />
              Gold Tier Creator
            </div>
            <div className="sidebar-profile-since">Member since 2026</div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Creator navigation">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <div className="sidebar-section">{section.label}</div>
              {section.items.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `sidebar-item${isActive ? ' sidebar-item--active' : ''}`
                  }
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            type="button"
            className="sidebar-item sidebar-logout"
            onClick={() => {}}
          >
            <LogOut size={20} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="main">
        <header className="topbar">
          <div className="topbar-left">
            <div className="topbar-breadcrumb">
              <span style={{ color: 'var(--text-tertiary)' }}>Creator Studio</span>
              <span style={{ color: 'var(--text-tertiary)' }}>/</span>
              <span>{BREADCRUMB_MAP[location.pathname] || 'Dashboard'}</span>
            </div>
          </div>

          <div className="topbar-right">
            <div className="topbar-search">
              <Search size={16} />
              <input type="search" placeholder="Search..." />
            </div>
            <button type="button" className="topbar-icon-btn" aria-label="Notifications">
              <Bell size={18} />
              <span className="topbar-bell-dot" />
            </button>
            <button type="button" className="topbar-icon-btn" aria-label="Settings" onClick={() => navigate('/creator/profile')}>
              <Settings size={18} />
            </button>
          </div>
        </header>

        <main className="content">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.3, 0.8, 0.4, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ── Profile dropdown ── */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              bottom: 80,
              left: 16,
              width: 240,
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              boxShadow: 'var(--shadow-lg)',
              padding: 6,
              zIndex: 100,
            }}
          >
            <NavLink to="/creator/profile" className="sidebar-item" onClick={() => setProfileOpen(false)}>
              <User size={16} /> Settings
            </NavLink>
            <div className="divider" style={{ margin: '4px 0' }} />
            <button type="button" className="sidebar-item" style={{ width: '100%', color: 'var(--red)' }}>
              <LogOut size={16} /> Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
