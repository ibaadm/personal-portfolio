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

const links = [
  { label: 'Email', href: 'mailto:ibaad.muhammad01@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ibaad-muhammad' },
  { label: 'GitHub', href: 'https://github.com/ibaadm' },
]

export function Home() {
  return (
    <div className="flex justify-between gap-2 items-start w-full">
      <div className="max-w-xl">
        <br />
        <h1 className="text-accent">Hi there, I'm Ibaad Muhammad</h1>
        <br />
        <p className="text-text">
          I'm a first-year CS student at UCL, particularly interested in software engineering and AI.
        </p>
        <br />
        <br />
        <p className="text-text">
          I've built things across a few domains, from games and web apps to machine learning and embedded
          systems. I care about writing efficient and readable code, rather than just getting it to work.
          In my free time, I enjoy travelling, reading and training MMA. I'm currently working on an
          e-commerce web app. Feel free to reach out; links below!
        </p>
        <br />
        {links.map(({ label, href }) => (
          <div key={label}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline w-fit">
              {label}
            </a>
          </div>
        ))}
      </div>
      <pre className="text-accent" style={{ fontSize: 'inherit', lineHeight: '1.2', marginTop: '-1.2em', paddingRight: '5rem' }}>
        {asciiArt}
      </pre>
    </div>
  )
}
