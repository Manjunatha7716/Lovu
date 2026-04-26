import HeartAnimation from '../components/HeartAnimation'

export default function Home({ onNext }) {
  return (
    <div className="page home-page">
      <HeartAnimation />
      <div className="home-content">
        <h1 className="script-title">Hey my Lovu 💗🐱</h1>
        <p className="subtitle">Something special is waiting for you…</p>
        <button className="btn-primary home-btn" onClick={onNext}>
          Start Our Story ❤️
        </button>
      </div>
    </div>
  )
}
