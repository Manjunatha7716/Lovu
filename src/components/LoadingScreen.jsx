export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-hearts">
        <span>💗</span>
        <span>💖</span>
        <span>💗</span>
      </div>
      <p className="loading-text">Loading our memories...</p>
      <div className="loading-bar">
        <div className="loading-fill" />
      </div>
    </div>
  )
}
