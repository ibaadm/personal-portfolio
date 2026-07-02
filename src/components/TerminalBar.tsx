interface TerminalBarProps {
  lines: string[]
  isAnimating: boolean
}

export function TerminalBar({ lines, isAnimating }: TerminalBarProps) {
  return (
    <div className="border-t border-border bg-surface px-6 py-3 text-sm min-h-[48px] flex flex-col justify-end">
      {lines.map((line, i) => (
        <div key={i} className="text-text">
          <span className="text-accent">$ </span>
          {line}
        </div>
      ))}
      {!isAnimating && (
        <div className="text-text">
          <span className="text-accent">$ </span>
          <span className="cursor-blink text-accent">▋</span>
        </div>
      )}
    </div>
  )
}
