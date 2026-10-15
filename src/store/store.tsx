import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react'
import type { StoreState, Action } from './types'
import { initialState } from './seed'

const STORAGE_KEY = 'travio-creator-demo:v1'

function loadState(): StoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as StoreState
      // Minimal shape guard: if the schema drifts, fall back to seed data.
      if (parsed && parsed.profile && Array.isArray(parsed.bookings) && Array.isArray(parsed.links)) {
        return parsed
      }
    }
  } catch {
    // corrupted storage → fall through to seed
  }
  return initialState
}

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case 'profile/update':
      return { ...state, profile: { ...state.profile, ...action.patch } }

    case 'prefs/notifications':
      return { ...state, notificationPrefs: { ...state.notificationPrefs, ...action.patch } }

    case 'notifications/markAllRead':
      return { ...state, notifications: state.notifications.map((n) => ({ ...n, read: true })) }

    case 'notifications/markRead':
      return {
        ...state,
        notifications: state.notifications.map((n) => (n.id === action.id ? { ...n, read: true } : n))
      }

    case 'link/add':
      return { ...state, links: [action.link, ...state.links] }

    case 'link/update':
      return {
        ...state,
        links: state.links.map((l) => (l.id === action.id ? { ...l, ...action.patch } : l))
      }

    case 'link/toggle':
      return {
        ...state,
        links: state.links.map((l) => {
          if (l.id !== action.id) return l
          if (l.status === 'active') return { ...l, status: 'disabled', disabledAt: new Date().toISOString().slice(0, 10) }
          // disabled/expired links reactivate without an expiry
          return { ...l, status: 'active', disabledAt: undefined, expiresAt: undefined }
        })
      }

    case 'payout/request':
      return { ...state, payouts: [action.payout, ...state.payouts] }

    case 'payout/setStatus':
      return {
        ...state,
        payouts: state.payouts.map((p) =>
          p.id === action.id ? { ...p, status: action.status, reason: action.reason ?? p.reason } : p
        )
      }

    case 'sessions/revoke':
      return { ...state, sessions: state.sessions.filter((s) => s.id !== action.id) }

    case 'social/toggle':
      return {
        ...state,
        socialAccounts: state.socialAccounts.map((s) =>
          s.id === action.id ? { ...s, connected: !s.connected } : s
        )
      }

    case 'payoutMethod/setDefault':
      return {
        ...state,
        payoutMethods: state.payoutMethods.map((m) => ({ ...m, isDefault: m.id === action.id }))
      }

    case 'payoutMethod/remove': {
      const remaining = state.payoutMethods.filter((m) => m.id !== action.id)
      if (remaining.length && !remaining.some((m) => m.isDefault)) {
        remaining[0] = { ...remaining[0], isDefault: true }
      }
      return { ...state, payoutMethods: remaining }
    }

    case 'payoutMethod/add':
      return { ...state, payoutMethods: [...state.payoutMethods, action.method] }

    case 'demo/reset':
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        // storage unavailable
      }
      return initialState

    default:
      return state
  }
}

interface StoreValue {
  state: StoreState
  dispatch: (a: Action) => void
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // quota / private mode — demo just won't persist
    }
  }, [state])

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}
