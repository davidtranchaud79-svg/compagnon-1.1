
import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function LogementsPage() {
  const [logements, setLogements] = useState([])
  const [resa, setResa] = useState([])

  useEffect(() => {
    Promise.all([api.listLogements(), api.listReservations()])
      .then(([l, r]) => {
        setLogements(l)
        setResa(r)
      })
      .catch(console.error)
  }, [])

  const handlePdf = async (r, type) => {
    let res
    if (type === 'contrat') res = await api.generateContract(r)
    if (type === 'quittance') res = await api.generateQuittance(r)
    if (res?.url) window.open(res.url, '_blank')
  }

  return (
    <div className="space-y-4">
      <h1 className="font-title text-2xl text-marine">Logements & Réservations</h1>

      <div className="card">
        <h2 className="font-title text-lg mb-2">Logements</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-marine/70 border-b">
              <th>ID</th>
              <th>Nom</th>
              <th>Adresse</th>
              <th>Capacité</th>
            </tr>
          </thead>
          <tbody>
            {logements.map((l, i) => (
              <tr key={i} className="border-b border-ivoire/60">
                <td>{l['ID_Logement']}</td>
                <td>{l['Logement']}</td>
                <td>{l['Logement_Adresse']}</td>
                <td>{l['Capacite']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2 className="font-title text-lg mb-2">Réservations</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-marine/70 border-b">
              <th>ID</th>
              <th>Nom</th>
              <th>Dates</th>
              <th>Montant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resa.map((r, i) => (
              <tr key={i} className="border-b border-ivoire/60">
                <td>{r['ID_Reservation']}</td>
                <td>{r['Nom']}</td>
                <td>
                  {r['Date_Debut']} → {r['Date_Fin']}
                </td>
                <td>{r['Montant']} €</td>
                <td className="space-x-2">
                  <button
                    className="btn-primary px-2 py-1 text-xs"
                    type="button"
                    onClick={() => handlePdf(r, 'contrat')}
                  >
                    Contrat
                  </button>
                  <button
                    className="btn-primary px-2 py-1 text-xs bg-marine"
                    type="button"
                    onClick={() => handlePdf(r, 'quittance')}
                  >
                    Quittance
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
