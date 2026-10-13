import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout'
import OverviewPage from './pages/OverviewPage'
import DiscoverPage from './pages/DiscoverPage'
import LinksPage from './pages/LinksPage'
import BookingsPage from './pages/BookingsPage'
import EarningsPage from './pages/EarningsPage'
import ReportsPage from './pages/ReportsPage'
import PayoutsPage from './pages/PayoutsPage'
import ProfilePage from './pages/ProfilePage'

export default function App() {
  return (
    <Routes>
      <Route path="/creator" element={<DashboardLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="links" element={<LinksPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="earnings" element={<EarningsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="payouts" element={<PayoutsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/creator" replace />} />
      </Route>
    </Routes>
  )
}
