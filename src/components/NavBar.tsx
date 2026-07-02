import type { Page } from '../types'

interface NavBarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  disabled: boolean
}

const links: { label: string; page: Page }[] = [
  { label: '~/home', page: 'home' },
  { label: '~/projects', page: 'projects' },
  { label: '~/contact', page: 'contact' },
]

export function NavBar({ currentPage, onNavigate, disabled }: NavBarProps) {
  return (
    <nav className="flex justify-center gap-10 px-6 py-5 border-b border-border">
      {links.map(({ label, page }) => (
        <button
          key={page}
          onClick={() => !disabled && onNavigate(page)}
          disabled={disabled}
          className={`text-base transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed ${
            currentPage === page
              ? 'text-accent'
              : 'text-muted hover:text-text'
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
