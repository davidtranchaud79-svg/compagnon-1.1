
import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function BanquetsPage() {
  const [juin, setJuin] = useState([])
  const [nov, setNov] = useState([])

  useEffect(() => {
    Promise.all([api.listBanquetJuin(), api.listBanquetNovembre()])
      .then(([j, n]) => {
        setJuin(j)
        setNov(n)
      })
      .catch(console.error)
  }, [])

  const renderTable = (data, title) => (
    <div className="card">
      <h2 className="font-title text-lg mb-2">{title}</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-marine/70 border-b">
            <th>Nom</th>
            <th>Prénom</th>
            <th>Statut</th>
            <th>Total</th>
            <th>Mode</th>
          </tr>
        </thead>
        <tbody>
          {data.map((b, i) => (
            <tr key={i} className="border-b border-ivoire/60">
              <td>{b['Nom']}</td>
              <td>{b['Prénom'] || b['Prenom']}</td>
              <td>{b['Statut']}</td>
              <td>{b['Total']} €</td>
              <td>{b['Mode']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="space-y-4">
      <h1 className="font-title text-2xl text-marine">Banquets</h1>
      {renderTable(juin, 'Banquet de Juin')}
      {renderTable(nov, 'Banquet de Novembre')}
    </div>
  )
}
