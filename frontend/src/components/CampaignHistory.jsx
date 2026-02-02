import { useEffect, useState } from 'react'
import { getCampaigns } from '../services/api'
import './CampaignHistory.css'

export default function CampaignHistory({ onSelectCampaign }) {
  const [list, setList] = useState([])

  useEffect(() => {
    getCampaigns().then(d => setList(d.campaigns || []))
  }, [])

  return (
    <div className="history">
      {list.map(c => (
        <div key={c._id} className="card" onClick={()=>onSelectCampaign(c)}>
          <img src={c.imageUrl} />
          <p>{c.prompt}</p>
        </div>
      ))}
    </div>
  )
}
