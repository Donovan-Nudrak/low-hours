import type { ReactNode } from 'react'
import './SectionTitle.css'

interface SectionTitleProps {
  children: ReactNode
  eyebrow?: string
  number?: string
}

export function SectionTitle({ children, eyebrow, number }: SectionTitleProps) {
  return (
    <div className="lh-section-title">
      {(eyebrow || number) && (
        <p className="lh-section-title__meta">
          {number ? <span>{number}</span> : null}
          {eyebrow ? <span>{eyebrow}</span> : null}
        </p>
      )}
      <h2 className="lh-section-title__heading">{children}</h2>
    </div>
  )
}
