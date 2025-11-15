
import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function SocialModerationPage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api.listSocial().then(setPosts).catch(console.error)
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="font-title text-2xl text-marine">Réseau social (modération)</h1>
      <div className="space-y-3">
        {posts.map((p, i) => (
          <div key={i} className="card text-sm">
            <div className="flex justify-between mb-1">
              <div className="font-semibold">
                {p['Nom']} {p['Prenom']}
              </div>
              <div className="text-xs text-marine/60">
                {p['Date_Post']} – {p['Type']}
              </div>
            </div>
            <div>{p['Contenu']}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
