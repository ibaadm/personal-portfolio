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
  home: './home',
  projects: './projects',
  contact: './contact',
}

type Phase = 'idle' | 'typing-clear' | 'typing-entry'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [entryLine, setEntryLine] = useState('')
  const [clearLine, setClearLine] = useState('')
  const [showContent, setShowContent] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [hasNavigated, setHasNavigated] = useState(false)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timeoutsRef.current.forEach(clearTimeout), [])

  const navigateTo = useCallback(
    (page: Page) => {
      if (phase !== 'idle' || (hasNavigated && page === currentPage)) return
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []

      function schedule(fn: () => void, delay: number) {
        const id = setTimeout(fn, delay)
        timeoutsRef.current.push(id)
      }

      let t = 0

      setPhase('typing-clear')
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
        setPhase('typing-entry')
      }, t)
      t += 100

      const entryCmd = entryCommands[page]
      for (let i = 0; i <= entryCmd.length; i++) {
        const partial = entryCmd.slice(0, i)
        schedule(() => setEntryLine(partial), t)
        t += 40
      }

      t += 200
      schedule(() => {
        setCurrentPage(page)
        setShowContent(true)
        setPhase('idle')
        setHasNavigated(true)
      }, t)
    },
    [phase, currentPage, hasNavigated],
  )

  return (
    <div className="flex flex-col h-full">
      <NavBar currentPage={currentPage} onNavigate={navigateTo} disabled={phase !== 'idle'} hasNavigated={hasNavigated} />
      <div className="flex-1 flex flex-col min-h-0" style={{ fontSize: '1.125rem', lineHeight: '1.2', paddingTop: '1.2em', paddingBottom: '1.2em' }}>
        {!hasNavigated && phase !== 'typing-entry' && (
          <div className="flex flex-col text-text">
            <span>ibaad-portfolio v1.0.0</span>
            <span>Last login: {new Date().toDateString()}</span>
            <span>&nbsp;</span>
            <span className="text-muted">Select a page above to get started.</span>
          </div>
        )}
        {entryLine && (
          <div className="text-text">
            <span className="text-accent">ibaad@portfolio:~$ </span>
            {entryLine}
          </div>
        )}
        {showContent && (
          <div style={{ paddingLeft: '5rem', marginTop: '1.5em' }}>
            {pages[currentPage]}
          </div>
        )}
        {(phase !== 'typing-entry' || !entryLine) && (
          <div className="text-text">
            <span className="text-accent">ibaad@portfolio:~$ </span>
            {phase === 'typing-clear'
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
