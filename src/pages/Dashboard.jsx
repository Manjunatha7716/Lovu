import { useState, useEffect, useRef, useCallback } from 'react'
import ConfettiEffect from '../components/ConfettiEffect'
import CatPuzzle from './CatPuzzle'
import FlowerAnimation from '../components/FlowerAnimation'
import CatInteraction from '../components/CatInteraction'

const MEMORIES = [
  { file: 'WhatsApp Image 2026-04-26 at 12.27.12 AM.jpeg',     caption: 'Our favourite sunset spot 🌅',                  sub: 'Live the moment, together',       rot: -2 },
  { file: 'WhatsApp Image 2026-04-26 at 12.27.18 AM (1).jpeg', caption: "The most beautiful thing I've ever seen 🌸",     sub: 'My golden girl',                  rot:  2 },
  { file: 'WhatsApp Image 2026-04-26 at 12.27.16 AM.jpeg',     caption: 'That helmet looks better on you anyway 🏍️',     sub: 'Candid & cute, always',           rot: -1 },
  { file: 'WhatsApp Image 2026-04-26 at 12.27.17 AM.jpeg',     caption: 'Every place is magic with you 🌿',               sub: 'Just us, in our world',           rot:  1 },
  { file: 'WhatsApp Image 2026-04-26 at 12.27.18 AM.jpeg',     caption: 'Candid moments, best moments 🥰',                sub: 'Mirror mirror on the wall…',      rot: -2 },
  { file: 'WhatsApp Image 2026-04-26 at 12.27.19 AM.jpeg',     caption: 'Our kind of vibe ✌️💙',                         sub: 'Lights, music, us',               rot:  2 },
  { file: 'WhatsApp Image 2026-04-26 at 12.27.19 AM (2).jpeg', caption: 'No words needed 💋💖',                          sub: 'The best kind of selfie',         rot: -1 },
  { file: 'WhatsApp Image 2026-04-26 at 12.27.20 AM.jpeg',     caption: 'Pink skies, just like our story 🌇',             sub: 'Back again, always',              rot:  1 },
  { file: 'WhatsApp Image 2026-04-26 at 12.30.52 AM.jpeg',     caption: 'You bloom like the flowers you hold 🌺',         sub: 'Pure happiness right here',       rot: -2 },
  { file: 'WhatsApp Image 2026-04-26 at 12.30.52 AM (2).jpeg', caption: "You're literally my whole world 🌍",             sub: 'Okay this one is too cute',       rot:  2 },
  { file: 'WhatsApp Image 2026-04-26 at 12.30.52 AM (3).jpeg', caption: 'A small kiss, a big feeling 💗',                 sub: 'My favourite close-up',           rot: -1 },
  { file: 'WhatsApp Image 2026-04-26 at 2.34.46 AM.jpeg',      caption: "Among all the flowers, you're the prettiest 🌸", sub: 'Lalbagh with my Lovu',           rot:  1 },
]

const LETTER = `Hey my Lovu… 💗🐱

My little kuchi puchi, my baby cat…

I've been thinking about how to say all this, and honestly, nothing ever feels enough when it comes to you. But still… I want to try, because you deserve to know how special you are to me.

You came into my life so gently, but somehow you changed everything. You made ordinary days feel soft and warm, like those cozy moments you never want to end. Just talking to you, hearing you, being around you… it makes my world feel lighter.

You have this beautiful, calming energy—like flowers blooming quietly 🌸
Soft, kind, full of life… just like you.

And the way you are… your full girl vibe, your love for little things, your smile, your sweetness—it's honestly the most adorable thing ever. Sometimes I just sit there and think… how can someone be this cute and this perfect at the same time?

My baby cat 🐾
You don't even realize how much you make me feel loved. It's not just in big things—but in the smallest moments. The way you talk, the way you care, the way you exist… it all just makes me feel like I matter.

And I don't say this lightly… but you feel like home to me.

I know we've had our constant fights, our ups and downs, moments where things felt messy or confusing… but even in all of that, one thing never changed for me—deep down, I always knew you're my girl.

And I'm really sorry…
for the times I caused you hassle,
for the times I didn't understand you the way I should have,
for the moments I made you cry.

You never deserved that.

And I promise you this—from here on, I'll do better. I'll understand you more, listen more, care for you the way you truly deserve. I never want to be the reason you're hurting again.

Because you mean too much to me.

I love you to the moon and back 🌙💖
And I'm so glad… truly so glad… that in the end, it's still you and me.

Maybe it's a little late, maybe things weren't always perfect… but I believe this—
we found our way back to each other for a reason.

And now, I don't want to lose that again.

I imagine us doing the simplest things—talking about random stuff, you enjoying your veg food while I sit there stealing bites 😄, listening to K-pop together, you showing me your favorite songs, us just laughing over nothing… and honestly, that already feels like a perfect life.

I don't need anything big or complicated.
If I have you, my Lovu, my kuchi puchi, my little baby cat… I have everything.

We'll be happy. Truly happy.
No matter what comes, we'll face it together.

Now and forever… for eternity 🌸
My eternal baby cat 🐱💖`

const POEM = [
  'In every photo, I find a little home,',
  'in every smile, a place I want to stay.',
  'You make the loud world gentle,',
  'and turn ordinary time into my favorite day.',
  '',
  'If life is a road, I want your hand in mine,',
  'through every sunrise, every storm, every view.',
  'My sweetest plan is simple:',
  'more memories, more laughter, more forever with you.',
]

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  emoji: ['🌸', '🌺', '💮', '🪷'][i % 4],
  left: `${6 + i * 6.5}%`,
  delay: `${i * 0.9}s`,
  duration: `${7 + (i % 5)}s`,
  size: `${0.9 + (i % 3) * 0.3}rem`,
}))

function HeartsGame() {
  const [hearts, setHearts]     = useState([])
  const [caught, setCaught]     = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const countRef = useRef(0)

  useEffect(() => {
    if (unlocked) return
    const interval = setInterval(() => {
      const id = Date.now() + Math.random()
      setHearts(h => [...h, { id, x: Math.random() * 76 + 5, y: Math.random() * 62 + 8 }])
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
    <div className="hearts-modal-wrap">
      <h2 className="script-title" style={{ fontSize: '1.9rem', textAlign: 'center' }}>Catch the Hearts! ❤️</h2>
      <p className="subtitle" style={{ fontSize: '.88rem' }}>({caught}/5) — tap the hearts before they disappear!</p>
      {!unlocked ? (
        <div className="game-area hearts-game-area">
          {hearts.map(h => (
            <button
              key={h.id}
              className="game-heart"
              style={{ left: h.x + '%', top: h.y + '%' }}
              onClick={() => catchHeart(h.id)}
            >❤️</button>
          ))}
        </div>
      ) : (
        <div className="unlocked-msg" style={{ padding: '1rem 0 .5rem' }}>
          <div style={{ fontSize: '3rem' }}>🎉</div>
          <p>You caught all the hearts!<br />Just like you caught mine… 💖</p>
        </div>
      )}
    </div>
  )
}

// Scroll reveal hook
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function Dashboard() {
  const [modal,    setModal]    = useState(null)
  const [answered, setAnswered] = useState(false)
  const [confetti, setConfetti] = useState(false)

  useReveal()

  const closeModal = useCallback(() => {
    setModal(null)
    document.body.style.overflow = ''
  }, [])

  const openModal = useCallback((name) => {
    setModal(name)
    document.body.style.overflow = 'hidden'
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeModal])

  useEffect(() => () => { document.body.style.overflow = '' }, [])

  const handleYes = () => {
    setAnswered(true)
    setConfetti(true)
    setTimeout(() => setConfetti(false), 6500)
  }

  return (
    <div className="dashboard">
      {confetti && <ConfettiEffect />}

      {/* ─── Sticky Header ─── */}
      <header className="dash-header">
        <a href="#hero" className="dash-brand">🏠 Home</a>
        <nav className="dash-nav">
          <a href="#memories">📸<span className="nav-label"> Memories</span></a>
          <a href="#games">🎮<span className="nav-label"> Play</span></a>
          <a href="#letter">💌<span className="nav-label"> Letter</span></a>
          <a href="#proposal">💖<span className="nav-label"> For You</span></a>
        </nav>
      </header>

      {/* ─── Hero ─── */}
      <section id="hero" className="dash-hero">
        {/* Floating petals */}
        <div className="hero-petals">
          {PETALS.map(p => (
            <span
              key={p.id}
              className="hero-petal"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                fontSize: p.size,
              }}
            >{p.emoji}</span>
          ))}
        </div>

        <div className="dash-hero-content">
          <p className="hero-eyebrow">✨ A little something just for you ✨</p>
          <h1 className="script-title hero-title">For My Lovu 💖</h1>
          <div className="hero-divider" />
          <p className="hero-sub">
            Photos, games, a love letter, and all of my heart —<br />all right here, just for you 🐱
          </p>
          <a href="#memories" className="btn-primary hero-cta">Explore ↓</a>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── Memories ─── */}
      <section id="memories" className="dash-section">
        <div className="section-header reveal">
          <span className="section-tag">Our Story</span>
          <h2 className="script-title section-title">Our Little World 💕</h2>
          <p className="subtitle">Every moment with you is a treasure I'll keep forever</p>
        </div>
        <div className="polaroid-grid dash-polaroid-grid reveal">
          {MEMORIES.map((m, i) => (
            <div
              key={i}
              className="polaroid"
              style={{ animationDelay: `${i * 0.08}s`, '--rot': m.rot }}
            >
              <div className="polaroid-img">
                <img
                  src={`/images/${encodeURIComponent(m.file)}`}
                  alt={m.caption}
                  loading="lazy"
                />
              </div>
              <p className="polaroid-caption">{m.caption}</p>
              <p className="polaroid-sub">{m.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── Games ─── */}
      <section id="games" className="dash-section">
        <div className="section-header reveal">
          <span className="section-tag">Just for Fun</span>
          <h2 className="script-title section-title">Play With Love 🎮</h2>
          <p className="subtitle">Three little adventures waiting for you</p>
        </div>
        <div className="games-grid reveal">
          <button className="game-card" onClick={() => openModal('cat')}>
            <span className="game-card-icon">🐱</span>
            <h3>Cat Escape</h3>
            <p>Help the cat find the fish through 3 mazes!</p>
            <span className="game-card-play">Play →</span>
          </button>
          <button className="game-card" onClick={() => openModal('hearts')}>
            <span className="game-card-icon">❤️</span>
            <h3>Catch Hearts</h3>
            <p>Catch 5 hearts to unlock a secret message!</p>
            <span className="game-card-play">Play →</span>
          </button>
          <button className="game-card" onClick={() => openModal('flower')}>
            <span className="game-card-icon">🌸</span>
            <h3>Grow Our Flower</h3>
            <p>Water the flower and say hi to our cat!</p>
            <span className="game-card-play">Play →</span>
          </button>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── Letter ─── */}
      <section id="letter" className="dash-section">
        <div className="section-header reveal">
          <span className="section-tag">From My Heart</span>
          <h2 className="script-title section-title">My Letter to You 💌</h2>
          <p className="subtitle">From my heart to yours, with all of me</p>
        </div>
        <div className="proposal-card dash-letter-card reveal">
          <div className="letter-box">
            {LETTER.split('\n').map((line, i) => (
              <p key={i} className="letter-line">{line || '\u00A0'}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Poem ─── */}
      <section className="dash-section dash-poem-section">
        <div className="proposal-card reveal" style={{ maxWidth: 560 }}>
          <div className="poem-box" style={{ width: '100%' }}>
            {POEM.map((line, i) => (
              <p key={i} className="poem-line">{line || '\u00A0'}</p>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── Proposal ─── */}
      <section id="proposal" className="dash-section dash-proposal-section">
        <div className="proposal-card reveal">
          <h2
            className="script-title"
            style={{ color: '#d63384', fontSize: 'clamp(1.8rem,5vw,2.8rem)', textAlign: 'center' }}
          >
            Will you be mine, my Lovu? 💖🐱
          </h2>
          {!answered ? (
            <div className="yes-buttons">
              <button className="btn-yes"     onClick={handleYes}>YES 💖</button>
              <button className="btn-yes-alt" onClick={handleYes}>YES (obviously!) 🐱💗</button>
            </div>
          ) : (
            <div className="answer-box">
              <h2 className="script-title" style={{ fontSize: '2.8rem', color: '#ff6b6b' }}>I knew it 💖</h2>
              <p>You + Me = Forever 🌸</p>
              <p className="soft-text">Now and always, my eternal baby cat 🐱💖</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="dash-footer">
        <p>Made with 💖 for my Lovu 🐱</p>
        <p className="soft-text">Now and forever… for eternity 🌸</p>
        <span className="footer-hearts">💗 💖 💗</span>
      </footer>

      {/* ─── Game Modals ─── */}
      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-inner" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close">✕</button>

            {modal === 'cat' && <CatPuzzle onNext={closeModal} />}

            {modal === 'hearts' && <HeartsGame />}

            {modal === 'flower' && (
              <div className="modal-content-pad">
                <h2 className="script-title" style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
                  Our Little Garden 🌸
                </h2>
                <div className="modal-interact-grid">
                  <div className="card"><h3>My little cat 🐱</h3><CatInteraction /></div>
                  <div className="card"><h3>Grow our flower 🌸</h3><FlowerAnimation /></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
