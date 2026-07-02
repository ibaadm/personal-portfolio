import { useState, useCallback, useRef, type ReactElement } from 'react'
import type { Page } from './types'
import { NavBar } from './components/NavBar'
import { TerminalBar } from './components/TerminalBar'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { Contact } from './pages/Contact'
import { useTypingAnimation } from './hooks/useTypingAnimation'

const pages: Record<Page, ReactElement> = {
  home: <Home />,
  projects: <Projects />,
  contact: <Contact />,
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [visible, setVisible] = useState(true)
  const pendingPage = useRef<Page | null>(null)

  const { lines, isAnimating, runSequence } = useTypingAnimation({
    onClear: () => {
      setVisible(false)
      if (pendingPage.current) setCurrentPage(pendingPage.current)
    },
    onDone: () => setVisible(true),
  })

  const navigateTo = useCallback(
    (page: Page) => {
      if (isAnimating || page === currentPage) return
      pendingPage.current = page
      runSequence(['clear', `cd ~/${page}`])
    },
    [isAnimating, currentPage, runSequence],
  )

  return (
    <div className="flex flex-col h-full">
      <NavBar currentPage={currentPage} onNavigate={navigateTo} disabled={isAnimating} />
      <main className="flex-1 overflow-auto" style={{ visibility: visible ? 'visible' : 'hidden' }}>
        {pages[currentPage]}
      </main>
      <TerminalBar lines={lines} isAnimating={isAnimating} />
    </div>
  )
}

export default App
