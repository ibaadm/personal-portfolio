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
  { type: 'blank' },
  { type: 'blank' },
]

function renderLine(line: Line, index: number) {
  switch (line.type) {
    case 'blank': return <br key={index} />
    case 'heading': return <h1 key={index} className="text-accent">{line.text}</h1>
    case 'text': return <p key={index} className="text-text">{line.text}</p>
    case 'link': return (
      <div key={index}>
        <a key={index} href={line.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline w-fit">
          {line.label}
        </a>
      </div>
    )
  }
}

const asciiLines = asciiArt.split('\n')

export function Home() {
  const [revealedLines, setRevealedLines] = useState(0)

  useEffect(() => {
    const total = Math.max(lines.length, asciiLines.length)
    const ids = Array.from({ length: total }, (_, i) =>
      setTimeout(() => setRevealedLines(i + 1), i * 30)
    )
    return () => ids.forEach(clearTimeout)
  }, [])

  return (
    <div className="flex justify-between gap-2 items-start w-full">
      <div style={{ width: '50ch' }}>
        {lines.slice(0, revealedLines).map(renderLine)}
      </div>
      {revealedLines >= 1 && (
        <pre className="text-accent" style={{ fontSize: 'inherit', lineHeight: '1.2', marginTop: '-1.2em', paddingRight: '5rem' }}>
          {asciiLines.slice(0, revealedLines).join('\n')}
        </pre>
      )}
    </div>
  )
}
