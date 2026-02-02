import { useEffect, useState } from 'react'
import './App.css'
import PromptInput from './components/PromptInput'
import ImageEditor from './components/ImageEditor'
import CampaignHistory from './components/CampaignHistory'
import { generateCampaign, getCampaigns, remixCampaign } from './services/api'

export default function App() {
  const [currentCampaign, setCurrentCampaign] = useState(null)
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('create')

  const loadCampaigns = async () => {
    const data = await getCampaigns()
    setCampaigns(data.campaigns || [])
  }

  useEffect(() => {
    loadCampaigns()
  }, [])

  const handleGenerate = async (prompt, tone, logoUrl, ctaText) => {
    setLoading(true)
    const res = await generateCampaign({ prompt, tone, logoUrl, ctaText })
    setCurrentCampaign(res)
    await loadCampaigns()
    setLoading(false)
  }

  const handleRemix = async (id, variation) => {
    setLoading(true)
    const res = await remixCampaign(id, variation)
    setCurrentCampaign(res)
    await loadCampaigns()
    setLoading(false)
  }

  return (
    <div className="App">
      <header className="header">
        <h1>🎨 AdVantage Gen</h1>
        <p>AI Powered Ad Creative Generator</p>
      </header>

      <nav className="nav">
        <button onClick={() => setTab('create')} className={tab==='create'?'active':''}>Create</button>
        <button onClick={() => setTab('history')} className={tab==='history'?'active':''}>History</button>
      </nav>

      {tab === 'create' && (
        <>
          <PromptInput onGenerate={handleGenerate} loading={loading} />
          {currentCampaign && (
            <ImageEditor
              campaign={currentCampaign}
              onRemix={handleRemix}
              loading={loading}
            />
          )}
        </>
      )}

      {tab === 'history' && (
        <CampaignHistory onSelectCampaign={setCurrentCampaign} />
      )}
    </div>
  )
}
