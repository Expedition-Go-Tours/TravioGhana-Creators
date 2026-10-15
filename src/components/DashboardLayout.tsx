import { useState, useEffect, useMemo, useRef } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
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
  Menu,
  X,
  BarChart3,
  BadgeCheck,
  Star,
  RotateCcw,
  CheckCheck,
} from 'lucide-react'
import { useStore } from '../store/store'
import { selectNotifications } from '../store/selectors'
import ConfirmDialog from './ui/ConfirmDialog'
import logoSrc from '../assets/TravioGhana_Logo.svg'

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
    items: [{ label: 'Settings', path: '/creator/profile', icon: Settings }],
  },
]

const IS_DEV = import.meta.env.DEV

export default function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { state, dispatch } = useStore()
  const notifSummary = useMemo(() => selectNotifications(state), [state])

  const [navOpen, setNavOpen] = useState(false)
  const [bellOpen, setBellOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [signOutOpen, setSignOutOpen] = useState(false)
  const [search, setSearch] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const bellRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Scroll to top + close mobile nav on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setNavOpen(false)
    setBellOpen(false)
    setMenuOpen(false)
  }, [location.pathname])

  // "/" focuses search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Close the notification / account popovers when the user clicks outside
  // them (or presses Escape), the way a menu is expected to behave. Clicks
  // inside a popover keep it open so its own actions still run; the toggle
  // buttons live inside their anchors, so their own click is "inside" too.
  useEffect(() => {
    if (!bellOpen && !menuOpen) return
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (bellOpen && !bellRef.current?.contains(target)) setBellOpen(false)
      if (menuOpen && !menuRef.current?.contains(target)) setMenuOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setBellOpen(false)
        setMenuOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [bellOpen, menuOpen])

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = search.trim()
    navigate(q ? `/creator/discover?q=${encodeURIComponent(q)}` : '/creator/discover')
  }

  const handleSignOut = () => {
    setSignOutOpen(false)
    dispatch({ type: 'demo/reset' })
    toast.success('Signed out — demo data reset')
    navigate('/creator')
  }

  return (
    <div className="shell">
      {/* ── Mobile backdrop ── */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            className="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setNavOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside className={`sidebar${navOpen ? ' sidebar--open' : ''}`}>
        <div className="sidebar-header">
          <button
            type="button"
            className="sidebar-close"
            aria-label="Close menu"
            onClick={() => setNavOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div
          className="sidebar-profile-card"
          onClick={() => navigate('/creator/profile')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/creator/profile')}
        >
          <div className="sidebar-profile-avatar">
            <img src={state.profile.avatar} alt={state.profile.displayName} className="sidebar-profile-img" />
            {state.profile.verified && (
              <div className="sidebar-profile-badge">
                <BadgeCheck size={12} />
              </div>
            )}
          </div>
          <div className="sidebar-profile-info">
            <div className="sidebar-profile-name">{state.profile.displayName}</div>
            <div className="sidebar-profile-role">
              <Star size={10} fill="var(--orange)" color="var(--orange)" />
              {state.profile.tier} Tier Creator
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
                  className={({ isActive }) => `sidebar-item${isActive ? ' sidebar-item--active' : ''}`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button type="button" className="sidebar-item sidebar-logout" onClick={() => setSignOutOpen(true)}>
            <LogOut size={20} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="main">
        <header className="topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="topbar-menu-btn"
              aria-label="Open menu"
              onClick={() => setNavOpen(true)}
            >
              <Menu size={20} />
            </button>
            <img src={logoSrc} alt="Travio Ghana" className="topbar-logo" />
          </div>

          <div className="topbar-right">
            <form className="topbar-search" onSubmit={submitSearch} role="search">
              <Search size={16} />
              <input
                ref={searchRef}
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tours…  ( / )"
                aria-label="Search tours"
              />
            </form>

            <span className="demo-badge" title="This prototype runs on local mock data">
              Demo data
            </span>

            <div className="topbar-popover-anchor" ref={bellRef}>
              <button
                type="button"
                className="topbar-icon-btn"
                aria-label={`Notifications${notifSummary.unread ? ` (${notifSummary.unread} unread)` : ''}`}
                onClick={() => { setBellOpen((v) => !v); setMenuOpen(false) }}
              >
                <Bell size={18} />
                {notifSummary.unread > 0 && <span className="topbar-bell-dot" />}
              </button>

              <AnimatePresence>
                {bellOpen && (
                  <motion.div
                    className="popover popover--notif"
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="popover-head">
                      <span>Notifications</span>
                      {notifSummary.unread > 0 && (
                        <button
                          type="button"
                          className="popover-action"
                          onClick={() => dispatch({ type: 'notifications/markAllRead' })}
                        >
                          <CheckCheck size={14} /> Mark all read
                        </button>
                      )}
                    </div>
                    <div className="popover-body">
                      {notifSummary.items.length === 0 && (
                        <div className="notif-empty">No notifications</div>
                      )}
                      {notifSummary.items.map((n) => (
                        <button
                          key={n.id}
                          type="button"
                          className={`notif-item${n.read ? '' : ' notif-item--unread'}`}
                          onClick={() => {
                            dispatch({ type: 'notifications/markRead', id: n.id })
                            setBellOpen(false)
                            if (n.link) navigate(n.link)
                          }}
                        >
                          <span className="notif-dot" />
                          <span className="notif-content">
                            <span className="notif-title">{n.title}</span>
                            <span className="notif-msg">{n.message}</span>
                            <span className="notif-time">{n.time}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="topbar-popover-anchor" ref={menuRef}>
              <button
                type="button"
                className="topbar-avatar"
                aria-label="Account menu"
                onClick={() => { setMenuOpen((v) => !v); setBellOpen(false) }}
              >
                <img src={state.profile.avatar} alt={state.profile.displayName} />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    className="popover popover--menu"
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="popover-user">
                      <img src={state.profile.avatar} alt="" />
                      <div>
                        <div className="popover-user-name">{state.profile.displayName}</div>
                        <div className="popover-user-mail">{state.profile.email}</div>
                      </div>
                    </div>
                    <button type="button" className="popover-row" onClick={() => { setMenuOpen(false); navigate('/creator/profile') }}>
                      <User size={16} /> Account settings
                    </button>
                    {IS_DEV && (
                      <button
                        type="button"
                        className="popover-row"
                        onClick={() => {
                          dispatch({ type: 'demo/reset' })
                          setMenuOpen(false)
                          toast.success('Demo data reset')
                        }}
                      >
                        <RotateCcw size={16} /> Reset demo data
                      </button>
                    )}
                    <div className="divider" style={{ margin: '4px 0' }} />
                    <button
                      type="button"
                      className="popover-row popover-row--danger"
                      onClick={() => { setMenuOpen(false); setSignOutOpen(true) }}
                    >
                      <LogOut size={16} /> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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

      <ConfirmDialog
        open={signOutOpen}
        onClose={() => setSignOutOpen(false)}
        title="Sign out of the demo?"
        message="This prototype has no backend, so signing out simply clears your local demo changes and returns everything to the sample data."
        confirmText="Sign out"
        onConfirm={handleSignOut}
      />
    </div>
  )
}
