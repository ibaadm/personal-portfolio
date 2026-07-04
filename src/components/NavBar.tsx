import type { Page } from '../types'

interface NavBarProps {
  activeNavPage: Page | null
  onNavigate: (page: Page) => void
  onDownloadCV: () => void
  disabled: boolean
  cvActive: boolean
}

const links: { label: string; page: Page }[] = [
  { label: './home', page: 'home' },
  { label: './projects', page: 'projects' },
]

export function NavBar({ activeNavPage, onNavigate, onDownloadCV, disabled, cvActive }: NavBarProps) {
  return (
    <nav className="flex justify-center gap-10 px-8 py-12 bg-surface border-b border-border">
      {links.map(({ label, page }) => (
        <button
          key={page}
          onClick={() => !disabled && onNavigate(page)}
          disabled={disabled}
          style={{ fontSize: '1.25rem' }}
          className={`transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed ${
            activeNavPage === page && !cvActive
              ? 'text-accent'
              : 'text-muted hover:text-text'
          }`}
        >
          {label}
        </button>
      ))}
      <button
        onClick={onDownloadCV}
        disabled={disabled}
        style={{ fontSize: '1.25rem' }}
        className={`transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed ${
          cvActive ? 'text-accent' : 'text-muted hover:text-text'
        }`}
      >
        ./cv↓
      </button>
    </nav>
  )
}
