import { useEffect, useRef } from 'react'

const EMOJIS = ['💗', '💖', '💕', '💓', '🩷']

export default function HeartAnimation() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const create = () => {
      const el = document.createElement('div')
      el.className = 'floating-heart'
      el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
      el.style.left = Math.random() * 100 + 'vw'
      el.style.fontSize = Math.random() * 18 + 10 + 'px'
      el.style.animationDuration = Math.random() * 3 + 4 + 's'
      el.style.opacity = (Math.random() * 0.5 + 0.3).toString()
      container.appendChild(el)
      setTimeout(() => el.remove(), 7000)
    }
    const interval = setInterval(create, 450)
    return () => clearInterval(interval)
  }, [])

  return <div ref={containerRef} className="heart-container" />
}
