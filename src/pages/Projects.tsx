type Project = {
  index: string
  name: string
  description: string
  stack: string
  links: { label: string; href: string }[]
}

const projects: Project[] = [
  {
    index: '01',
    name: 'Typocalypse',
    description: 'A 2D cross-platform multiplayer arcade game where you type to escape zombies',
    stack: 'Unity + C#',
    links: [
      { label: 'GitHub', href: 'https://github.com/ibaadm/Typocalypse' },
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
          <p className="text-accent">[{project.index}] {project.name}</p>
          <p className="text-text">{project.description}</p>
          <p className="text-text">{project.stack}</p>
          <div className="flex gap-4" style={{ marginTop: '0.3em' }}>
            {project.links.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline w-fit">
                {label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <br />
      <br />
    </div>
  )
}
