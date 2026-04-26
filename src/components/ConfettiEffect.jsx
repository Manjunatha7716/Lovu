import { useEffect, useRef } from 'react'

const COLORS = ['#ff9eb5', '#ffd6e0', '#c9b1d9', '#ff6b6b', '#ffd93d', '#a8e6cf']

export default function ConfettiEffect() {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    for (let i = 0; i < 90; i++) {
      const el = document.createElement('div')
      el.className = 'confetti-piece'
      const size = Math.random() * 10 + 6
      el.style.cssText = `
        left: ${Math.random() * 100}vw;
        width: ${size}px;
        height: ${size}px;
        background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '3px'};
        animation-delay: ${Math.random() * 1.5}s;
        animation-duration: ${Math.random() * 2 + 2}s;
      `
      container.appendChild(el)
    }
    return () => { if (container) container.innerHTML = '' }
  }, [])

  return <div ref={ref} className="confetti-container" />
}
