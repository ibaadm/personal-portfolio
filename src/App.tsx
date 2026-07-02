import { useState, useCallback, useRef, useEffect, type ReactElement } from 'react'
import type { Page } from './types'
import { NavBar } from './components/NavBar'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { Contact } from './pages/Contact'

const pages: Record<Page, ReactElement> = {
  home: <Home />,
  projects: <Projects />,
  contact: <Contact />,
}

const entryCommands: Record<Page, string> = {
  home: 'cd ~/home',
  projects: 'cd ~/projects',
  contact: 'cd ~/contact',
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [entryLine, setEntryLine] = useState(entryCommands.home)
  const [clearLine, setClearLine] = useState('')
  const [showContent, setShowContent] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timeoutsRef.current.forEach(clearTimeout), [])

  const navigateTo = useCallback(
    (page: Page) => {
      if (isAnimating || page === currentPage) return
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
      setIsAnimating(true)

      function schedule(fn: () => void, delay: number) {
        const id = setTimeout(fn, delay)
        timeoutsRef.current.push(id)
      }

      let t = 0
      const clearCmd = 'clear'

      for (let i = 0; i <= clearCmd.length; i++) {
        const partial = clearCmd.slice(0, i)
        schedule(() => setClearLine(partial), t)
        t += 40
      }

      t += 300
      schedule(() => {
        setShowContent(false)
        setClearLine('')
        setEntryLine('')
      }, t)

      const entryCmd = entryCommands[page]
      t += 100
      for (let i = 0; i <= entryCmd.length; i++) {
        const partial = entryCmd.slice(0, i)
        schedule(() => setEntryLine(partial), t)
        t += 40
      }

      t += 200
      schedule(() => {
        setCurrentPage(page)
        setShowContent(true)
        setIsAnimating(false)
      }, t)
    },
    [isAnimating, currentPage],
  )

  return (
    <div className="flex flex-col h-full">
      <NavBar currentPage={currentPage} onNavigate={navigateTo} disabled={isAnimating} />
      <div className="flex-1 flex flex-col px-8 py-6 min-h-0">
        <div className="text-text">
          <span className="text-accent">$ </span>
          {entryLine}
        </div>
        {showContent && (
          <div className="flex-1 min-h-0">
            {pages[currentPage]}
          </div>
        )}
        {(!isAnimating || clearLine) && (
          <div className="text-text">
            <span className="text-accent">$ </span>
            {isAnimating
              ? clearLine
              : <span className="cursor-blink text-accent">▋</span>
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default App
