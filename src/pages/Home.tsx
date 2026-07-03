const asciiArt = `
                                 =@.             @@%
                               #%==@@.     *@@+    @@#
                  *@@@@        @-:::-@        @@@   +@@
                 ##:..-@-      **::::*@         @@-   @%
                 *#::::=@%      @=:-:.@@         #@+  .@%
                  %*:::::@@      #-:-::@@         *@-  -@.
                   ##:::::@@     +*::-::@@         %@   @@
                    %*:::::@@     %=:--:.@@         @+
        -@*=@@       ##::-:.%@     %-:--:-@@        %#
        @=.::=@@      %*::-:.#@.   +*::-::-@              %@###@
         #+::::%@:     *#::-::-@:   %+:--::*@           %#=::::@
          %#-:::-@@     ##-:-::=@@   #-:--:.@@         %=:::-:.@
           *%=::::=@@    +%::-:::@@  =#::--:.@@       #+::--::*@
             %*:::::@@    ##-:--::@@  %+:---:.@@     +#::---::@@
              ##=::::=@@   +%-:--:.@@  #:----:.@@    %=:----:-@
       -:      :%+:::::@@-  *#-:--:.@@==:-----:.@@-  #::---:.@@
     #%=*@@      #%=:::.:@@   @-:--::::--------:.-@@+#::---:-@
     %=:::=@@      @+::-:.+@@ =:--------------:::=-==::----.@@
     :%+:::.-@@*    %#-:::::===:------------:::**+::::----:.@@
       *%=:::::%@@   =%=::-----------------::-**-::-------:.@@
         %#=:::::+@@   %*:----------------::-+*-::---------.@@
    @-     %*-:::::=@@  =:----------------::*+::-----------.@@
    +@      *%+::::::====:----------------:++=:-:----------.#@
 @   @%       #%=::--::------------------::*+-:------------.*@
 @#  :@@        %#-::--------------------::*+::------------.%@
 +@-   @@.       -%*-::------------------::+*::-----------:.@@
  %@#   @@@        #%=::------------------:-*-::----------:.@@
   +@@    @@@:       %#:::----------------::**::---------:.-@
     @@%     @@+      ##=::----------------::**::-------::.@@
       @@@:            .%*:::---------------::+---------:.@@
          @@             *@+:::--------------:::------:::@@
                           %%=:::-------------------:::=@@
                             %#=:::--------------::::=@@
                               #@*=::::::----:::.:=@@@
                                 .%@%*=-:::::-=%@@@.
                                        ....:.                   `

const links = [
  { label: 'Email', href: 'mailto:ibaad.muhammad01@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ibaad-muhammad' },
  { label: 'GitHub', href: 'https://github.com/ibaadm' },
]

export function Home() {
  return (
    <div className="flex gap-8 items-start">
      <div className="flex flex-col gap-6 max-w-3xl">
        <div className="flex flex-col gap-4">
          <h1 className="text-accent" style={{ fontSize: '2.75rem' }}>Hi there, I'm Ibaad Muhammad</h1>
          <p className="text-text" style={{ fontSize: '1.375rem' }}>
            I'm a first-year CS student at UCL, particularly interested in software engineering and AI.
          </p>
        </div>
        <p className="text-text" style={{ lineHeight: '1.75' }}>
          I've built things across a few domains, from games and web apps to machine learning and embedded
          systems. I care about writing efficient and readable code, rather than just getting it to work.
          In my free time, I enjoy travelling, reading and training MMA. I'm currently working on an
          e-commerce web app. Feel free to reach out; links below!
        </p>
        <div className="flex flex-col gap-1">
          {links.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline w-fit">
              {label}
            </a>
          ))}
        </div>
      </div>
      <pre className="text-accent" style={{ fontSize: 'inherit', lineHeight: '1.2', overflow: 'auto', paddingLeft: '11rem' }}>
        {asciiArt}
      </pre>
    </div>
  )
}
