const API_BASE_URL = 'http://localhost:5000/api'

export const generateCampaign = async (data) => {
  const res = await fetch(`${API_BASE_URL}/campaigns/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const getCampaigns = async () => {
  const res = await fetch(`${API_BASE_URL}/campaigns`)
  return res.json()
}

export const remixCampaign = async (id, promptVariation) => {
  const res = await fetch(`${API_BASE_URL}/campaigns/${id}/remix`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ promptVariation })
  })
  return res.json()
}
