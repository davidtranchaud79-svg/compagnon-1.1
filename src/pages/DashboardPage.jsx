
import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function DashboardPage() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    async function load() {
      const [members, cotis, resa, events] = await Promise.all([
        api.listMembers(),
        api.listCotisations(),
        api.listReservations(),
        api.listEvents(),
      ])
      setStats({
        members: members.length,
        cotis: cotis.length,
        resa: resa.length,
        events: events.length,
      })
    }
    load().catch(console.error)
  }, [])

  if (!stats) return <div>Chargement...</div>

  return (
    <div className="space-y-4">
      <h1 className="font-title text-2xl text-marine">Tableau de bord</h1>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-xs text-marine/70">Membres</div>
          <div className="text-xl font-bold">{stats.members}</div>
        </div>
        <div className="card text-center">
          <div className="text-xs text-marine/70">Cotisations</div>
          <div className="text-xl font-bold">{stats.cotis}</div>
        </div>
        <div className="card text-center">
          <div className="text-xs text-marine/70">Réservations</div>
          <div className="text-xl font-bold">{stats.resa}</div>
        </div>
        <div className="card text-center">
          <div className="text-xs text-marine/70">Événements</div>
          <div className="text-xl font-bold">{stats.events}</div>
        </div>
      </div>
    </div>
  )
}
