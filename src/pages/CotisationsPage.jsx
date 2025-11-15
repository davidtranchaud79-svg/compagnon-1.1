
import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

const emptyForm = {
  "n°mat": "",
  "n°fact": "",
  "nom": "",
  "prénom": "",
  "adresse": "",
  "code": "",
  "ville": "",
  "statut": "",
  "Tarif Appliqué": "",
  "JOURNAL": "",
  "MUTUALITÉ": "",
  "DG": "",
  "CAYENNE DE PARIS": "",
  "DEDUCTION D'IMPOT": "",
  "chiffre": "",
  "Ventilation": "",
  "mode de paiement": "",
  "Virement": "",
  "Chèque": "",
  "Especes": "",
  "carte": "",
  "Etablissement bancaire editeur du chèque": "",
  "Numéro de chèque": "",
  "Date de paiement": "",
  "Commentaire": "",
}

export default function CotisationsPage() {
  const [cotis, setCotis] = useState([])
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    api.listCotisations().then(setCotis).catch(console.error)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    await api.addCotisation(form)
    const updated = await api.listCotisations()
    setCotis(updated)
    setForm(emptyForm)
  }

  const handlePdf = async (c, type) => {
    let res
    if (type === 'facture') res = await api.generateInvoice(c)
    if (type === 'recu') res = await api.generateRecuFiscal(c)
    if (res?.url) window.open(res.url, '_blank')
  }

  return (
    <div className="space-y-4">
      <h1 className="font-title text-2xl text-marine">Cotisations</h1>

      <form
        onSubmit={handleAdd}
        className="card grid md:grid-cols-3 gap-3 text-sm"
      >
        {Object.keys(emptyForm).map((key) => (
          <label key={key} className="flex flex-col gap-1">
            <span className="text-[11px] text-marine/70">{key}</span>
            <input
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="border rounded-xl px-2 py-1 text-sm"
            />
          </label>
        ))}
        <div className="md:col-span-3">
          <button className="btn-primary" type="submit">
            Ajouter une cotisation
          </button>
        </div>
      </form>

      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-marine/70 border-b">
              <th>Matricule</th>
              <th>Nom</th>
              <th>Facture</th>
              <th>Montant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cotis.map((c, i) => {
              const total =
                Number(c['Tarif Appliqué'] || 0) +
                Number(c['JOURNAL'] || 0) +
                Number(c['MUTUALITÉ'] || 0) +
                Number(c['DG'] || 0) +
                Number(c['CAYENNE DE PARIS'] || 0)
              return (
                <tr key={i} className="border-b border-ivoire/60">
                  <td>{c['n°mat']}</td>
                  <td>
                    {c['nom']} {c['prénom']}
                  </td>
                  <td>{c['n°fact']}</td>
                  <td>{total.toFixed(2)} €</td>
                  <td className="space-x-2">
                    <button
                      type="button"
                      className="btn-primary px-2 py-1 text-xs"
                      onClick={() => handlePdf(c, 'facture')}
                    >
                      Facture
                    </button>
                    <button
                      type="button"
                      className="btn-primary px-2 py-1 text-xs bg-marine"
                      onClick={() => handlePdf(c, 'recu')}
                    >
                      Reçu fiscal
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
