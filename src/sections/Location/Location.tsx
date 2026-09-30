import { ArrowRight } from 'lucide-react'
import { Fragment, useLayoutEffect, useRef } from 'react'
import { useLanguage } from '../../i18n/language'
import { gsap } from '../../lib/gsap'
import { prefersReducedMotion, revealUp } from '../../lib/animations'
import './Location.css'

export function Location() {
  const rootRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      revealUp('.location__title, .location__copy', {
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: 'top 75%' },
      })
      revealUp('.location__meta, .location__cta', {
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: 'top 68%' },
      })

      gsap.to(root, {
        opacity: 0.72,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'center center',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="location" data-section="location" id="location" ref={rootRef}>
      <div className="location__grid lh-container">
        <p className="location__mark">LOW HOURS</p>
        <h2 className="location__title">
          {t.location.titleLines.map((line, index) => (
            <Fragment key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </Fragment>
          ))}
        </h2>
        <div className="location__meta">
          <p>
            {t.location.open}
            <span>18:00 — 04:00</span>
          </p>
          <p>
            {t.location.city}
            <span>Roma Norte</span>
          </p>
        </div>
        <a
          className="location__cta"
          href="https://www.google.com/maps/search/?api=1&query=Roma+Norte%2C+Mexico+City"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.location.directions}
          <ArrowRight size={18} strokeWidth={1.5} />
        </a>
        <p className="location__copy">{t.location.copy}</p>
      </div>
    </section>
  )
}
