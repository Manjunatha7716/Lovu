import { useState } from 'react'

const STAGES = ['🌱', '🌿', '🌸', '🌺', '💐']
const LABELS = [
  'Plant a seed of love…',
  'Growing slowly, just like us 🌿',
  'Blooming beautifully 🌸',
  'Almost there… 🌺',
  'In full bloom, just like you 💐',
]

export default function FlowerAnimation() {
  const [stage, setStage] = useState(0)
  const [anim, setAnim] = useState(false)

  const water = () => {
    if (anim || stage === STAGES.length - 1) return
    setAnim(true)
    setTimeout(() => {
      setStage(s => s + 1)
      setAnim(false)
    }, 400)
  }

  return (
    <div className="flower-wrapper">
      <div className={`flower-emoji ${anim ? 'flower-grow' : ''}`}>{STAGES[stage]}</div>
      <div className="flower-btns">
        <button className="btn-small" onClick={water} disabled={stage === STAGES.length - 1}>
          Water 💧
        </button>
        {stage === STAGES.length - 1 && (
          <button className="btn-small" onClick={() => setStage(0)}>
            Replant 🌱
          </button>
        )}
      </div>
      <p className="hint-text">{LABELS[stage]}</p>
    </div>
  )
}
