import { useState, useEffect, useRef } from 'react'

interface TypingAnimationOptions {
  onClear?: () => void
  onDone?: () => void
}

export function useTypingAnimation(options: TypingAnimationOptions = {}) {
  const [lines, setLines] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  function clearTimeouts() {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  function schedule(fn: () => void, delay: number) {
    const id = setTimeout(fn, delay)
    timeoutsRef.current.push(id)
  }

  function typeCommand(
    command: string,
    lineIndex: number,
    startDelay: number,
    charDelay = 40,
  ): number {
    schedule(() => {
      setLines(prev => {
        const next = [...prev]
        next[lineIndex] = ''
        return next
      })
    }, startDelay)

    for (let i = 1; i <= command.length; i++) {
      const partial = command.slice(0, i)
      schedule(() => {
        setLines(prev => {
          const next = [...prev]
          next[lineIndex] = partial
          return next
        })
      }, startDelay + i * charDelay)
    }

    return startDelay + command.length * charDelay
  }

  function runSequence(commands: string[]) {
    clearTimeouts()
    setLines([])
    setIsAnimating(true)

    let cursor = 200
    let lineIndex = 0

    commands.forEach(command => {
      const doneAt = typeCommand(command, lineIndex, cursor)

      if (command === 'clear') {
        schedule(() => {
          options.onClear?.()
          setLines([])
          lineIndex = 0
        }, doneAt + 300)
        cursor = doneAt + 300
        lineIndex = 0
      } else {
        cursor = doneAt + 400
        lineIndex++
      }
    })

    schedule(() => {
      setIsAnimating(false)
      options.onDone?.()
    }, cursor + 100)
  }

  useEffect(() => () => clearTimeouts(), [])

  return { lines, isAnimating, runSequence }
}
