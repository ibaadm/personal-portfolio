type Project = {
  index: string
  name: string
  description: string
  stack: string
  github: string
  extraLinks?: { label: string; href: string }[]
}

const projects: Project[] = [
  {
    index: '1',
    name: 'Typocalypse',
    description: 'A 2D cross-platform multiplayer arcade game where you type to escape zombies',
    stack: 'Unity + C#',
    github: 'https://github.com/ibaadm/Typocalypse',
    extraLinks: [
      { label: 'Play', href: 'https://ibaadm.itch.io/typocalypse' },
    ],
  },
]

export function Projects() {
  return (
    <div>
      <br />
      <br />
      <h1 className="text-accent">Projects</h1>
      {projects.map((project) => (
        <div key={project.index} style={{ marginTop: '1.2em' }}>
          <p className="text-accent">
            [{project.index}]{' '}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:underline">{project.name}</a>
            {project.extraLinks && (
              <>
                <span className="text-muted"> - </span>
                {project.extraLinks.map(({ label, href }, i) => (
                  <span key={label}>
                    {i > 0 && '  '}
                    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">{label}</a>
                  </span>
                ))}
              </>
            )}
          </p>
          <p className="text-text" style={{ paddingLeft: '4ch' }}>{project.stack}</p>
          <p className="text-text" style={{ paddingLeft: '4ch' }}>{project.description}</p>
        </div>
      ))}
      <br />
      <br />
    </div>
  )
}
