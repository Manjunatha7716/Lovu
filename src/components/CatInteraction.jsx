import { useState } from 'react'

const MESSAGES = [
  'You are my sunshine ☀️',
  'I love you more than K-pop! 🎵',
  'My favorite person ever 💖',
  'You make every day better 🌸',
  'My kuchi puchi! 💗',
  'Can I steal a bite? 😄',
  'You feel like home 🏠💕',
  'Eternally yours 🌙',
  'My baby cat 🐾💖',
  'Forever and always 🌸',
]

export default function CatInteraction() {
  const [msg, setMsg] = useState('')
  const [bounce, setBounce] = useState(false)

  const handleClick = () => {
    setMsg(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
    setBounce(true)
    setTimeout(() => setBounce(false), 500)
    setTimeout(() => setMsg(''), 2800)
  }

  return (
    <div className="cat-wrapper">
      <div className={`cat-emoji ${bounce ? 'cat-bounce' : ''}`} onClick={handleClick}>
        🐱
      </div>
      <p className="hint-text">Click me!</p>
      {msg && <div className="cat-bubble">{msg}</div>}
    </div>
  )
}
