type Project = {
  index: string
  name: string
  description: string
  stack: string
  github?: string
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
  {
    index: '2',
    name: 'Rolls-Royce Novel Fission & CO₂ Reduction',
    description: 'Simulation models for High Temperature Gas Reactor thermodynamics and power cycle analysis',
    stack: 'Python (pandas, NumPy, SciPy, Matplotlib, iapws)',
    github: 'https://github.com/ibaadm/HTGR-Simulator',
  },
  {
    index: '3',
    name: 'Habitly',
    description: 'Full-stack habit recommendation web app aiming to defeat decision fatigue',
    stack: 'Flask + React + SQLite',
    github: 'https://github.com/jeony18/Scenario-2-Habits-Web-App',
  },
  {
    index: '4',
    name: 'Bioreactor IoT Control System',
    description: 'ESP32 firmware and Node-RED dashboard for closed-loop bioreactor control via MQTT',
    stack: 'C++ + JavaScript + Node-RED + MQTT',
    extraLinks: [
      { label: 'Dashboard', href: 'https://github.com/ibaadm/Bioreator-Dashboard' },
      { label: 'Firmware', href: 'https://github.com/ibaadm/Bioreactor-Firmware' },
    ],
  },
  {
    index: '5',
    name: 'Real-Time Sign Language Detector',
    description: 'TensorFlow Object Detection model classifying real-time sign gestures via webcam, trained on a custom labelled dataset',
    stack: 'Python + TensorFlow + OpenCV',
  },
  {
    index: '6',
    name: 'This Portfolio',
    description: 'The terminal portfolio you\'re currently using to read this',
    stack: 'Vite + React + TypeScript',
    github: 'https://github.com/ibaadm/personal-portfolio',
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
            {project.github
              ? <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:underline">{project.name}</a>
              : project.name
            }
            {project.extraLinks && (
              <>
                <span className="text-muted"> - </span>
                {project.extraLinks.map(({ label, href }, i) => (
                  <span key={label}>
                    {i > 0 && <span className="text-muted"> | </span>}
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
