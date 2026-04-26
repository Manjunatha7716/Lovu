import { useState } from 'react'
import ConfettiEffect from '../components/ConfettiEffect'

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
  "and turn ordinary time into my favorite day.",
  '',
  'If life is a road, I want your hand in mine,',
  'through every sunrise, every storm, every view.',
  'My sweetest plan is simple:',
  'more memories, more laughter, more forever with you.',
]

export default function Proposal() {
  const [answered, setAnswered] = useState(false)

  return (
    <div className="page proposal-page">
      {answered && <ConfettiEffect />}
      <div className="proposal-card">
        <h1 className="script-title">For My Lovu 💌</h1>

        <div className="letter-box">
          {LETTER.split('\n').map((line, i) => (
            <p key={i} className="letter-line">{line || '\u00A0'}</p>
          ))}
        </div>

        <div className="poem-box">
          {POEM.map((line, i) => (
            <p key={i} className="poem-line">{line || '\u00A0'}</p>
          ))}
        </div>

        <p className="proposal-question">Will you be mine, my Lovu? 💖🐱</p>

        {!answered ? (
          <div className="yes-buttons">
            <button className="btn-yes" onClick={() => setAnswered(true)}>
              YES 💖
            </button>
            <button className="btn-yes-alt" onClick={() => setAnswered(true)}>
              YES (obviously!) 🐱💗
            </button>
          </div>
        ) : (
          <div className="answer-box">
            <h2 className="script-title" style={{ fontSize: '2.8rem', color: '#ff6b6b' }}>
              I knew it 💖
            </h2>
            <p>You + Me = Forever 🌸</p>
            <p className="soft-text">Now and always, my eternal baby cat 🐱💖</p>
          </div>
        )}
      </div>
    </div>
  )
}
