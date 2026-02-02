import { useState } from 'react'
import './PromptInput.css'

export default function PromptInput({ onGenerate, loading }) {
  const [prompt, setPrompt] = useState('')
  const [tone, setTone] = useState('Professional')
  const [logoUrl, setLogoUrl] = useState('')
  const [ctaText, setCtaText] = useState('Shop Now')

  const submit = (e) => {
    e.preventDefault()
    if (prompt.trim()) onGenerate(prompt, tone, logoUrl, ctaText)
  }

  const uploadLogo = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setLogoUrl(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <form className="prompt-input" onSubmit={submit}>
      <h2>Create Campaign</h2>

      <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe product..." required />

      <select value={tone} onChange={e=>setTone(e.target.value)}>
        <option>Professional</option>
        <option>Witty</option>
        <option>Urgent</option>
        <option>Inspirational</option>
      </select>

      <input type="file" accept="image/*" onChange={uploadLogo} />

      <input value={ctaText} onChange={e=>setCtaText(e.target.value)} placeholder="CTA text" />

      <button disabled={loading}>{loading ? 'Generating...' : 'Generate'}</button>
    </form>
  )
}
