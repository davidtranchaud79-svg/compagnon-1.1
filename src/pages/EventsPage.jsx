
import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function EventsPage() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    api.listEvents().then(setEvents).catch(console.error)
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="font-title text-2xl text-marine">Événements</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {events.map((ev, i) => (
          <div key={i} className="card space-y-1 text-sm">
            <div className="font-title text-base">{ev['Nom']}</div>
            <div className="text-marine/70 text-xs">
              {ev['Date']} – {ev['Heure']} – {ev['Lieu']}
            </div>
            <div>{ev['Description']}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
