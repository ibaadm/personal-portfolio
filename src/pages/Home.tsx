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

const lines: Line[] = [
  { type: 'blank' },
  { type: 'blank' },
  { type: 'heading', text: "Hi there, I'm Ibaad Muhammad" },
  { type: 'blank' },
  { type: 'text', text: "I'm a first-year CS student at UCL, particularly" },
  { type: 'text', text: "interested in software engineering and AI." },
  { type: 'blank' },
  { type: 'blank' },
  { type: 'text', text: "I've built things across a few domains, from" },
  { type: 'text', text: "games and web apps to machine learning and" },
  { type: 'text', text: "embedded systems. I care about writing" },
  { type: 'text', text: "efficient and readable code, rather than" },
  { type: 'text', text: "just getting it to work. In my free time," },
  { type: 'text', text: "I enjoy travelling, reading and training" },
  { type: 'text', text: "MMA. I'm currently working on an e-commerce" },
  { type: 'text', text: "web app. Feel free to reach out; links below!" },
  { type: 'blank' },
  { type: 'link', label: 'Email', href: 'mailto:ibaad.muhammad01@gmail.com' },
  { type: 'link', label: 'LinkedIn', href: 'https://linkedin.com/in/ibaad-muhammad' },
  { type: 'link', label: 'GitHub', href: 'https://github.com/ibaadm' },
]

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
      <div style={{ maxWidth: '50ch' }}>
        {renderLines(lines.slice(0, revealedLines))}
      </div>
      {revealedAscii >= 1 && (
        <>
          <pre className="text-accent ascii-art" style={{ width: `calc(${maxAsciiWidth}ch + 5rem)` }}>
            {asciiLines.slice(0, revealedAscii).join('\n')}
          </pre>
          <div className="md:hidden"><br /><br /></div>
        </>
      )}
    </div>
  )
}
