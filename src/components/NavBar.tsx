import type { Page } from '../types'

interface NavBarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  disabled: boolean
  hasNavigated: boolean
}

const links: { label: string; page: Page }[] = [
  { label: '~/home', page: 'home' },
  { label: '~/projects', page: 'projects' },
  { label: '~/contact', page: 'contact' },
]

export function NavBar({ currentPage, onNavigate, disabled, hasNavigated }: NavBarProps) {
  return (
    <nav className="flex justify-center gap-10 px-8 py-12 bg-surface border-b border-border">
      {links.map(({ label, page }) => (
        <button
          key={page}
          onClick={() => !disabled && onNavigate(page)}
          disabled={disabled}
          style={{ fontSize: '1.25rem' }}
          className={`transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed ${
            hasNavigated && currentPage === page
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
