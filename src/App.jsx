
import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import MembersPage from './pages/MembersPage'
import CotisationsPage from './pages/CotisationsPage'
import LogementsPage from './pages/LogementsPage'
import BanquetsPage from './pages/BanquetsPage'
import EventsPage from './pages/EventsPage'
import SocialModerationPage from './pages/SocialModerationPage'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/members', label: 'Membres' },
  { to: '/cotisations', label: 'Cotisations' },
  { to: '/logements', label: 'Logements' },
  { to: '/banquets', label: 'Banquets' },
  { to: '/events', label: 'Événements' },
  { to: '/social', label: 'Social' },
]

export default function App() {
  return (
    <div className="min-h-screen flex bg-ivoire">
      <aside className="w-60 bg-marine text-ivoire flex flex-col p-4">
        <div className="mb-6 font-title text-xl">
          UC Suite <span className="text-or">Admin</span>
        </div>
        <nav className="flex-1 space-y-1 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                'block px-3 py-2 rounded-xl hover:bg-ivoire/10 ' +
                (isActive ? 'bg-ivoire/10 font-semibold' : '')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8 space-y-4">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/cotisations" element={<CotisationsPage />} />
          <Route path="/logements" element={<LogementsPage />} />
          <Route path="/banquets" element={<BanquetsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/social" element={<SocialModerationPage />} />
        </Routes>
      </main>
    </div>
  )
}
