import { useEffect, useRef, useState } from 'react'
import * as fabric from 'fabric'
import './ImageEditor.css'

export default function ImageEditor({ campaign, onRemix, loading }) {
  const canvasRef = useRef(null)
  const fabricRef = useRef(null)
  const [prompt, setPrompt] = useState('')

  useEffect(() => {
    if (!campaign) return
    if (fabricRef.current) fabricRef.current.dispose()

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 500
    })

    fabricRef.current = canvas

    fabric.Image.fromURL(campaign.imageUrl || campaign.image, img => {
      img.scaleToWidth(500)
      canvas.add(img)
    })

    if (campaign.caption) {
      const caption = new fabric.Textbox(String(campaign.caption), {
        left: 20,
        top: 420,
        width: 460,
        fill: '#fff',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
        textAlign: 'center'
      })
      canvas.add(caption)
    }
  }, [campaign])

  return (
    <div className="image-editor">
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
