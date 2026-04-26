import { useState, useEffect, useCallback } from 'react'
import ConfettiEffect from '../components/ConfettiEffect'

// 0=path, 1=wall, 2=start, 3=exit
const LEVELS = [
  {
    grid: [
      [1,1,1,1,1,1,1,1,1],
      [1,2,0,0,1,0,0,0,1],
      [1,1,1,0,1,0,1,0,1],
      [1,0,0,0,0,0,1,0,1],
      [1,0,1,1,1,0,1,0,1],
      [1,0,0,0,1,0,0,0,1],
      [1,1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,3,1],
      [1,1,1,1,1,1,1,1,1],
    ],
    title: 'Help the cat find the fish!',
    hint: 'Level 1 — use arrow keys or the pad below',
    bg: 'linear-gradient(155deg,#fff0f3,#ede0f7)',
  },
  {
    grid: [
      [1,1,1,1,1,1,1,1,1],
      [1,2,1,0,0,0,1,0,1],
      [1,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,0,0,1],
      [1,0,0,0,1,1,1,0,1],
      [1,1,1,0,0,0,1,0,1],
      [1,0,0,0,1,0,1,0,1],
      [1,0,1,1,1,0,0,3,1],
      [1,1,1,1,1,1,1,1,1],
    ],
    title: 'Trickier path… can you find it? 🤔',
    hint: 'Level 2 — the cat is counting on you!',
    bg: 'linear-gradient(155deg,#e8f4fd,#ede0f7)',
  },
  {
    grid: [
      [1,1,1,1,1,1,1,1,1],
      [1,2,0,0,0,1,0,0,1],
      [1,0,1,1,0,1,0,1,1],
      [1,0,1,0,0,0,0,0,1],
      [1,0,1,0,1,1,1,0,1],
      [1,0,0,0,1,0,0,0,1],
      [1,1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,3,1],
      [1,1,1,1,1,1,1,1,1],
    ],
    title: 'Final escape! Almost there 💪',
    hint: 'Level 3 — one last adventure~',
    bg: 'linear-gradient(155deg,#fff9e6,#fde0f7)',
  },
]

function findStart(grid) {
  for (let r = 0; r < grid.length; r++)
    for (let c = 0; c < grid[r].length; c++)
      if (grid[r][c] === 2) return { r, c }
  return { r: 1, c: 1 }
}

const CAT_DIRS = { up:'🐱', down:'🐱', left:'🐱', right:'🐱' }

export default function CatPuzzle({ onNext }) {
  const [level, setLevel] = useState(0)
  const [pos, setPos]     = useState(() => findStart(LEVELS[0].grid))
  const [trail, setTrail] = useState([])
  const [won, setWon]     = useState(false)
  const [allDone, setAllDone] = useState(false)
  const [facing, setFacing]   = useState('right')
  const [moves, setMoves] = useState(0)
  const [bump, setBump]   = useState(false)
  const [shake, setShake] = useState(false)

  const cur = LEVELS[level]

  const resetLevel = useCallback((lvl) => {
    const start = findStart(LEVELS[lvl].grid)
    setPos(start)
    setTrail([start])
    setWon(false)
    setMoves(0)
    setFacing('right')
  }, [])

  useEffect(() => { resetLevel(level) }, [level, resetLevel])

  const move = useCallback((dr, dc, newFacing) => {
    if (won) return
    setFacing(newFacing)
    setPos(prev => {
      const nr = prev.r + dr
      const nc = prev.c + dc
      const grid = cur.grid
      if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) return prev
      if (grid[nr][nc] === 1) {
        // hit wall — bump shake
        setBump(true); setTimeout(() => setBump(false), 280)
        setShake(true); setTimeout(() => setShake(false), 320)
        return prev
      }
      const next = { r: nr, c: nc }
      setMoves(m => m + 1)
      setTrail(t => [...t.slice(-40), next])
      if (grid[nr][nc] === 3) setTimeout(() => setWon(true), 200)
      return next
    })
  }, [won, cur])

  useEffect(() => {
    const onKey = (e) => {
      const map = {
        ArrowUp:'up', ArrowDown:'down', ArrowLeft:'left', ArrowRight:'right',
        w:'up', s:'down', a:'left', d:'right',
        W:'up', S:'down', A:'left', D:'right',
      }
      const dir = map[e.key]
      if (!dir) return
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault()
      const delta = { up:[-1,0], down:[1,0], left:[0,-1], right:[0,1] }[dir]
      move(delta[0], delta[1], dir)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [move])

  const nextLevel = () => {
    if (level + 1 < LEVELS.length) {
      setLevel(l => l + 1)
    } else {
      setAllDone(true)
    }
  }

  if (allDone) {
    return (
      <div className="page puzzle-page" style={{ background: cur.bg }}>
        <ConfettiEffect />
        <div className="puzzle-done-card">
          <div className="puzzle-done-anim">🐱💨🐟✨</div>
          <h1 className="script-title" style={{ color: '#d63384' }}>Freedom!! 🎉</h1>
          <p className="puzzle-done-msg">
            The cat escaped all 3 mazes…<br />
            just like how you escaped into my heart 💖
          </p>
          <button className="btn-primary" onClick={onNext}>Open My Heart 💌</button>
        </div>
      </div>
    )
  }

  const isTrail = (r, c) => trail.some(t => t.r === r && t.c === c) && !(pos.r === r && pos.c === c)
  const isCat   = (r, c) => pos.r === r && pos.c === c
  const catFlip = facing === 'left' ? { transform: 'scaleX(-1)' } : {}

  return (
    <div className="page puzzle-page" style={{ background: cur.bg }}>
      <div className="puzzle-header">
        <h1 className="script-title puzzle-title">
          {level === 0 ? '🐱' : level === 1 ? '🐾' : '🌟'} {cur.title}
        </h1>
        <p className="subtitle">{cur.hint}</p>
      </div>

      <div className="puzzle-card">
        {/* Level indicator */}
        <div className="level-indicators">
          {LEVELS.map((_, i) => (
            <div key={i} className={`level-pip ${i === level ? 'active' : i < level ? 'done' : ''}`}>
              {i < level ? '✓' : i === level ? `${i + 1}` : `${i + 1}`}
            </div>
          ))}
        </div>

        {/* Maze */}
        <div className={`maze-wrap ${shake ? 'maze-shake' : ''}`}>
          <div className="maze-grid" style={{ '--cols': cur.grid[0].length }}>
            {cur.grid.map((row, r) =>
              row.map((cell, c) => {
                const cat  = isCat(r, c)
                const paw  = isTrail(r, c)
                const exit = cell === 3
                const wall = cell === 1
                return (
                  <div
                    key={`${r}-${c}`}
                    className={[
                      'mcell',
                      wall  ? 'mc-wall'  : 'mc-path',
                      cat   ? 'mc-cat'   : '',
                      exit  ? 'mc-exit'  : '',
                      paw   ? 'mc-trail' : '',
                    ].join(' ')}
                  >
                    {cat  && <span className={`cat-sprite ${bump ? 'cat-bump' : ''}`} style={catFlip}>🐱</span>}
                    {exit && !cat && <span className="exit-sprite">🐟</span>}
                    {paw  && <span className="paw-sprite">🐾</span>}
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* D-pad + info */}
        <div className="puzzle-footer">
          <div className="dpad">
            <button className="dp-btn" onPointerDown={() => move(-1, 0, 'up')}  aria-label="up">↑</button>
            <div className="dp-row">
              <button className="dp-btn" onPointerDown={() => move(0, -1, 'left')}  aria-label="left">←</button>
              <span className="dp-center">🐱</span>
              <button className="dp-btn" onPointerDown={() => move(0,  1, 'right')} aria-label="right">→</button>
            </div>
            <button className="dp-btn" onPointerDown={() => move( 1, 0, 'down')} aria-label="down">↓</button>
          </div>

          <div className="puzzle-stats">
            <div className="stat-badge">👣 {moves} moves</div>
            <button className="btn-small" onClick={() => resetLevel(level)}>Reset 🔄</button>
            <p className="hint-text" style={{ marginTop: '0.3rem' }}>WASD or arrows work too!</p>
          </div>
        </div>

        {/* Win overlay */}
        {won && (
          <div className="won-overlay">
            <div className="won-inner">
              <div className="won-anim">🐱🐟</div>
              <h2 className="script-title" style={{ fontSize: '2rem', color: '#d63384' }}>
                Cat escaped! 🎉
              </h2>
              <p className="won-sub">Solved in <b>{moves}</b> moves!</p>
              <button className="btn-primary" onClick={nextLevel}>
                {level + 1 < LEVELS.length ? `Level ${level + 2} ➜` : 'All done! 💖'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
