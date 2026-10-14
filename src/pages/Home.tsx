import { useState, useEffect } from 'react'

const asciiArt = `
                         %@@@     @    @@:
               @@@      @=:-%@     %@@   @@
             +@=-=@     .*:::@@      @@-  @@
              %-::-@.    @=:::@@       @*  @@
               %-::-@#    @-:::@+       @-  @
                %-:::@@   =*:::-@       =@  .
       @+*@      @-:::@@   %=:::=@       @
      *#::-@@     %=:::#@   %-:::=@         .@*+=@
       *%=::=@:    %=:::+@  -*::::#@       %*-::.@
         @+::-#@    %=:::=@  *=:-:.@@     **::-::@
          ##=::-@@   @=:::-@  %---:.@@    %::--:#@
            @=:::=@   @=:::-@+ ----:.@@  =*:--:.@
    =@@@     %#-::-@@  %=--:-==-----:.*@-*=:--:=@
    %=.-=@#    @=:::=@# =----------::.-=+=::--.@*
     @+-.:=@@   %+-:::===---------::-#*::::---.@
      *%=:::=@@  :%=:------------::**-::------.@
   =    %#=:::-@@  =:------------:=*-:--------.@#
   :@     @*-:::====------------::#*::--------.@@
 @  @@      @=-:----------------::*-::--------.@@
 @#  @@      *%=::--------------::*::---------.@%
  @@  #@@      @#-:-------------::#+::-------:.@
   @@   *@@:    =@=::------------::#::-------:#@
     @@    :      %*-::-----------::@-------::@
       #@-         +%=::-----------:::----::=@#
                     %%=::--------------::-+@
                       %%=-:::-------:::-*@+
                         *@%==-::..:==*@@
                               .....               `

type Line =
  | { type: 'blank' }
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string }
  | { type: 'link'; label: string; href: string }

type Block = Exclude<Line, { type: 'text' }> | { type: 'paragraph'; text: string }

const LINE_WIDTH = 50

const content: Block[] = [
  { type: 'blank' },
  { type: 'blank' },
  { type: 'heading', text: "Hi there, I'm Ibaad Muhammad" },
  { type: 'blank' },
  { type: 'paragraph', text: "I'm a second-year Computer Science student at UCL, interested in software engineering and agentic systems. I'm currently a software engineer intern at Histolyte, and I'll be joining Amazon as an SDE intern in summer 2027." },
  { type: 'blank' },
  { type: 'paragraph', text: "I've built things across many domains, from games and web apps to machine learning and embedded systems, using Python, C#, Java, C/C++ and JavaScript/TypeScript. I like to make my code efficient and readable, rather than just functional." },
  { type: 'blank' },
  { type: 'paragraph', text: "Outside of my studies, I enjoy playing piano and training MMA. As a UCL Outreach Ambassador, I also work to inspire the next generation of computer scientists." },
  { type: 'blank' },
  { type: 'link', label: 'Email', href: 'mailto:ibaad.muhammad01@gmail.com' },
  { type: 'link', label: 'LinkedIn', href: 'https://linkedin.com/in/ibaad-muhammad' },
  { type: 'link', label: 'GitHub', href: 'https://github.com/ibaadm' },
]

function wrapText(text: string, width: number): string[] {
  const wrapped: string[] = []
  let current = ''
  for (const word of text.split(' ')) {
    if (current && current.length + 1 + word.length > width) {
      wrapped.push(current)
      current = word
    } else {
      current = current ? `${current} ${word}` : word
    }
  }
  if (current) wrapped.push(current)
  return wrapped
}

const lines: Line[] = content.flatMap((block): Line[] =>
  block.type === 'paragraph'
    ? wrapText(block.text, LINE_WIDTH).map(text => ({ type: 'text', text }))
    : [block]
)

function renderLines(revealed: Line[]) {
  const result: React.ReactNode[] = []
  let i = 0
  while (i < revealed.length) {
    const line = revealed[i]
    if (line.type === 'blank') {
      result.push(<br key={i} />)
      i++
    } else if (line.type === 'heading') {
      result.push(<h1 key={i} className="text-accent">{line.text}</h1>)
      i++
    } else if (line.type === 'link') {
      result.push(
        <div key={i}>
          <a href={line.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline w-fit">
            {line.label}
          </a>
        </div>
      )
      i++
    } else {
      const start = i
      const texts: string[] = []
      while (i < revealed.length && revealed[i].type === 'text') {
        texts.push((revealed[i] as Extract<Line, { type: 'text' }>).text)
        i++
      }
      result.push(<p key={start} className="text-text">{texts.join(' ')}</p>)
    }
  }
  return result
}

const asciiLines = asciiArt.split('\n')
const maxAsciiWidth = Math.max(...asciiLines.map(l => l.length))

export function Home() {
  const [revealedLines, setRevealedLines] = useState(0)
  const [revealedAscii, setRevealedAscii] = useState(0)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const asciiDelay = isMobile ? lines.length * 30 : 0

    const textIds = Array.from({ length: lines.length }, (_, i) =>
      setTimeout(() => setRevealedLines(i + 1), i * 30)
    )
    const asciiIds = Array.from({ length: asciiLines.length }, (_, i) =>
      setTimeout(() => setRevealedAscii(i + 1), asciiDelay + i * 30)
    )
    return () => [...textIds, ...asciiIds].forEach(clearTimeout)
  }, [])

  return (
    <div className="flex flex-col md:flex-row justify-between gap-2 items-start w-full">
      <div style={{ maxWidth: `${LINE_WIDTH}ch` }}>
        {renderLines(lines.slice(0, revealedLines))}
      </div>
      {revealedAscii >= 1 && (
        <>
          <pre
            className="text-accent ascii-art"
            style={{ '--ascii-max-width': maxAsciiWidth, width: `calc(${maxAsciiWidth}ch + 5rem)` } as React.CSSProperties}
          >
            {asciiLines.slice(0, revealedAscii).join('\n')}
          </pre>
          <div className="md:hidden"><br /><br /></div>
        </>
      )}
    </div>
  )
}
