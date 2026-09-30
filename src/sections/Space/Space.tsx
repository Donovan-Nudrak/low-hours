import { Fragment, useLayoutEffect, useRef } from 'react'
import { Media } from '../../components/Media/Media'
import { useLanguage } from '../../i18n/language'
import { gsap } from '../../lib/gsap'
import { prefersReducedMotion, revealLines, revealUp } from '../../lib/animations'
import './Space.css'

export function Space() {
  const rootRef = useRef<HTMLElement>(null)
  const { language, t } = useLanguage()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        revealLines('.space__title', {
          scrollTrigger: { trigger: root, start: 'top 72%' },
        })
        revealUp('.space__copy', {
          scrollTrigger: { trigger: root, start: 'top 64%' },
        })
      })

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.to('.space__layer--a', {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.35 },
        })
        gsap.to('.space__layer--b', {
          yPercent: 16,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.35 },
        })
        gsap.to('.space__layer--c', {
          yPercent: -13,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.35 },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [language])

  return (
    <section className="space" data-section="space" id="space" ref={rootRef}>
      <div className="space__grid lh-container">
        <div className="space__layer space__layer--a">
          <Media
            src="/space-window.webp"
            alt={t.space.window.alt}
            aspect="4 / 5"
            tone="brown"
            objectPosition="center right"
          />
        </div>
        <div className="space__layer space__layer--b">
          <Media
            src="/space-table.webp"
            alt={t.space.table.alt}
            aspect="1 / 1"
            tone="amber"
            objectPosition="center"
          />
        </div>
        <div className="space__copyblock">
          <h2 className="space__title" key={language}>
            {t.space.titleLines.map((line, index) => (
              <Fragment key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </Fragment>
            ))}
          </h2>
          <p className="space__copy">
            {t.space.copyLines.map((line, index) => (
              <Fragment key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </Fragment>
            ))}
          </p>
        </div>
        <div className="space__layer space__layer--c">
          <Media
            src="/space-lamp.webp"
            alt={t.space.lamp.alt}
            aspect="3 / 4"
            tone="burgundy"
            objectPosition="center left"
          />
        </div>
      </div>
    </section>
  )
}
