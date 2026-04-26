import { useState, useEffect, useRef } from 'react'
import CatInteraction from '../components/CatInteraction'
import FlowerAnimation from '../components/FlowerAnimation'

export default function Interactive({ onNext }) {
  const [hearts, setHearts] = useState([])
  const [caught, setCaught] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const countRef = useRef(0)

  useEffect(() => {
    if (unlocked) return
    const interval = setInterval(() => {
      const id = Date.now() + Math.random()
      setHearts(h => [...h, { id, x: Math.random() * 78 + 5, y: Math.random() * 65 + 5 }])
      setTimeout(() => setHearts(h => h.filter(hh => hh.id !== id)), 2200)
    }, 900)
    return () => clearInterval(interval)
  }, [unlocked])

  const catchHeart = (id) => {
    setHearts(h => h.filter(hh => hh.id !== id))
    countRef.current += 1
    setCaught(countRef.current)
    if (countRef.current >= 5) setUnlocked(true)
  }

  return (
    <div className="page interactive-page">
      <h1 className="script-title">Play With Love 🎮</h1>

      <div className="interact-grid">
        <div className="card">
          <h3>My little cat 🐱</h3>
          <CatInteraction />
        </div>
        <div className="card">
          <h3>Grow our flower 🌸</h3>
          <FlowerAnimation />
        </div>
      </div>

      <div className="card" style={{ width: '100%', maxWidth: 560 }}>
        <h3>Catch the hearts! ❤️ ({caught}/5)</h3>
        {!unlocked ? (
          <div className="game-area">
            {hearts.map(h => (
              <button
                key={h.id}
                className="game-heart"
                style={{ left: h.x + '%', top: h.y + '%' }}
                onClick={() => catchHeart(h.id)}
              >
                ❤️
              </button>
            ))}
            <p className="game-hint">Catch 5 hearts to unlock what&#39;s next…</p>
          </div>
        ) : (
          <div className="unlocked-msg">
            <p>You caught all the hearts! 💖<br />Just like you caught mine…</p>
            <button className="btn-primary" onClick={onNext}>
              Keep Going 🐱 →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
