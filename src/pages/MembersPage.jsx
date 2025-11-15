
import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function MembersPage() {
  const [members, setMembers] = useState([])

  useEffect(() => {
    api.listMembers().then(setMembers).catch(console.error)
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="font-title text-2xl text-marine">Membres</h1>
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-marine/70 border-b">
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Ville</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={i} className="border-b border-ivoire/60">
                <td>{m['Matricule']}</td>
                <td>{m['nom']}</td>
                <td>{m['prénom']}</td>
                <td>{m['ville']}</td>
                <td>{m['Statut']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
