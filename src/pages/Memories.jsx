const MEMORIES = [
  {
    file: 'WhatsApp Image 2026-04-26 at 12.27.12 AM.jpeg',
    caption: 'Our favourite sunset spot 🌅',
    sub: 'Live the moment, together',
    rot: -2,
  },
  {
    file: 'WhatsApp Image 2026-04-26 at 12.27.18 AM (1).jpeg',
    caption: 'The most beautiful thing I\'ve ever seen 🌸',
    sub: 'My golden girl',
    rot: 2,
  },
  {
    file: 'WhatsApp Image 2026-04-26 at 12.27.16 AM.jpeg',
    caption: 'That helmet looks better on you anyway 🏍️',
    sub: 'Candid & cute, always',
    rot: -1,
  },
  {
    file: 'WhatsApp Image 2026-04-26 at 12.27.17 AM.jpeg',
    caption: 'Every place is magic with you 🌿',
    sub: 'Just us, in our world',
    rot: 1,
  },
  {
    file: 'WhatsApp Image 2026-04-26 at 12.27.18 AM.jpeg',
    caption: 'Candid moments, best moments 🥰',
    sub: 'Mirror mirror on the wall…',
    rot: -2,
  },
  {
    file: 'WhatsApp Image 2026-04-26 at 12.27.19 AM.jpeg',
    caption: 'Our kind of vibe ✌️💙',
    sub: 'Lights, music, us',
    rot: 2,
  },
  {
    file: 'WhatsApp Image 2026-04-26 at 12.27.19 AM (2).jpeg',
    caption: 'No words needed 💋💖',
    sub: 'The best kind of selfie',
    rot: -1,
  },
  {
    file: 'WhatsApp Image 2026-04-26 at 12.27.20 AM.jpeg',
    caption: 'Pink skies, just like our story 🌇',
    sub: 'Back again, always',
    rot: 1,
  },
  {
    file: 'WhatsApp Image 2026-04-26 at 12.30.52 AM.jpeg',
    caption: 'You bloom like the flowers you hold 🌺',
    sub: 'Pure happiness right here',
    rot: -2,
  },
  {
    file: 'WhatsApp Image 2026-04-26 at 12.30.52 AM (2).jpeg',
    caption: 'You\'re literally my whole world 🌍',
    sub: 'Okay this one is too cute',
    rot: 2,
  },
  {
    file: 'WhatsApp Image 2026-04-26 at 12.30.52 AM (3).jpeg',
    caption: 'A small kiss, a big feeling 💗',
    sub: 'My favourite close-up',
    rot: -1,
  },
  {
    file: 'WhatsApp Image 2026-04-26 at 2.34.46 AM.jpeg',
    caption: 'Among all the flowers, you\'re the prettiest 🌸',
    sub: 'Lalbagh with my Lovu',
    rot: 1,
  },
]

export default function Memories({ onNext }) {
  return (
    <div className="page memories-page">
      <h1 className="script-title">Our Little World 💕</h1>
      <p className="subtitle">Every moment with you is a treasure I'll keep forever</p>

      <div className="polaroid-grid">
        {MEMORIES.map((m, i) => (
          <div
            key={i}
            className="polaroid"
            style={{ animationDelay: `${i * 0.1}s`, '--rot': m.rot }}
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

      <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={onNext}>
        Continue 💖
      </button>
    </div>
  )
}
