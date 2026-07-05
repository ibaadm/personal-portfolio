import { useState, useCallback, useRef, useEffect, type ReactElement } from 'react'
import type { Page } from './types'
import { NavBar } from './components/NavBar'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'

const pages: Record<Page, ReactElement> = {
  home: <Home />,
  projects: <Projects />,
}

const entryCommands: Record<Page, string> = {
  home: './home',
  projects: './projects',
}

type Phase = 'idle' | 'typing-clear' | 'typing-entry'

const CV_BLOCKS = 20

function makeScheduler(ref: React.MutableRefObject<ReturnType<typeof setTimeout>[]>) {
  return (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay)
    ref.current.push(id)
  }
}

function typeString(
  str: string,
  schedule: (fn: () => void, delay: number) => void,
  setter: (v: string) => void,
  t: number,
  charDelay = 40,
): number {
  for (let i = 0; i <= str.length; i++) {
    const partial = str.slice(0, i)
    schedule(() => setter(partial), t)
    t += charDelay
  }
  return t
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [entryLine, setEntryLine] = useState('')
  const [clearLine, setClearLine] = useState('')
  const [showContent, setShowContent] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [hasNavigated, setHasNavigated] = useState(false)
  const [outputLines, setOutputLines] = useState<string[]>([])
  const [cvActive, setCvActive] = useState(false)
  const [activeNavPage, setActiveNavPage] = useState<Page | null>(null)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timeoutsRef.current.forEach(clearTimeout), [])

  const navigateTo = useCallback(
    (page: Page) => {
      if (phase !== 'idle' || (hasNavigated && page === currentPage && showContent)) return
      setActiveNavPage(page)
      setCvActive(false)
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
      const schedule = makeScheduler(timeoutsRef)

      let t = 0

      setPhase('typing-clear')
      t = typeString('clear', schedule, setClearLine, t)
      t += 300
      schedule(() => {
        setShowContent(false)
        setOutputLines([])
        setClearLine('')
        setEntryLine('')
        setPhase('typing-entry')
      }, t)
      t += 100

      t = typeString(entryCommands[page], schedule, setEntryLine, t)
      t += 200
      schedule(() => {
        setCurrentPage(page)
        setShowContent(true)
        setPhase('idle')
        setHasNavigated(true)
        setCvActive(false)
      }, t)
    },
    [phase, currentPage, hasNavigated, showContent],
  )

  const downloadCV = useCallback(() => {
    if (phase !== 'idle') return
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    const schedule = makeScheduler(timeoutsRef)

    let t = 0

    setCvActive(true)
    setPhase('typing-clear')
    t = typeString('clear', schedule, setClearLine, t)
    t += 300
    schedule(() => {
      setShowContent(false)
      setOutputLines([])
      setClearLine('')
      setEntryLine('')
      setPhase('typing-entry')
    }, t)
    t += 100

    t = typeString('./cv', schedule, setEntryLine, t)
    t += 200

    schedule(() => setOutputLines(['Fetching CV_Ibaad_Muhammad.pdf...']), t)
    t += 300

    schedule(() => setOutputLines(prev => [...prev, '']), t)
    for (let i = 1; i <= CV_BLOCKS; i++) {
      const bar = `[${'█'.repeat(i)}${' '.repeat(CV_BLOCKS - i)}] ${Math.round((i / CV_BLOCKS) * 100)}%`
      schedule(() => setOutputLines(prev => [...prev.slice(0, -1), bar]), t)
      t += 25
    }
    t += 200

    schedule(() => {
      const link = document.createElement('a')
      link.href = '/CV_Ibaad_Muhammad.pdf'
      link.download = 'CV_Ibaad_Muhammad.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setOutputLines(prev => [...prev, 'Done. Check your downloads.'])
    }, t)
    t += 200

    schedule(() => {
      setPhase('idle')
      setHasNavigated(true)
    }, t)
  }, [phase])

  return (
    <div className="flex flex-col h-full">
      <NavBar activeNavPage={activeNavPage} onNavigate={navigateTo} onDownloadCV={downloadCV} disabled={phase !== 'idle'} cvActive={cvActive} />
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto" style={{ fontSize: '1.125rem', lineHeight: '1.2', paddingTop: '1.2em', paddingBottom: '1.2em' }}>
        {!hasNavigated && phase !== 'typing-entry' && (
          <div className="flex flex-col text-text">
            <span>ibaad-portfolio {__APP_VERSION__}</span>
            <span>Last login: {new Date().toDateString()}</span>
            <span>&nbsp;</span>
            <span>Select a page above to get started.</span>
          </div>
        )}
        {entryLine && (
          <div className="text-text">
            <span className="text-accent">ibaad@portfolio:~$ </span>
            {entryLine}
          </div>
        )}
        {showContent && (
          <div className="content-indent">
            {pages[currentPage]}
          </div>
        )}
        {outputLines.length > 0 && (
          <div>
            {outputLines.map((line, i) => (
              <div key={i} className="text-text">{line}</div>
            ))}
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
