import { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import CatPuzzle from './pages/CatPuzzle'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [stage, setStage] = useState('loading') // 'loading' | 'puzzle' | 'dashboard'

  useEffect(() => {
    if (stage !== 'loading') return
    const t = setTimeout(() => setStage('puzzle'), 2600)
    return () => clearTimeout(t)
  }, [stage])

  if (stage === 'loading')   return <LoadingScreen />
  if (stage === 'puzzle')    return <CatPuzzle onNext={() => setStage('dashboard')} />
  return <Dashboard />
}
