import { Fragment, useLayoutEffect, useRef } from 'react'
import { Media } from '../../components/Media/Media'
import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { useLanguage } from '../../i18n/language'
import { gsap } from '../../lib/gsap'
import { parallax, prefersReducedMotion, revealLines, revealUp } from '../../lib/animations'
import './Night.css'

export function Night() {
  const rootRef = useRef<HTMLElement>(null)
  const { language, t } = useLanguage()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        revealLines('.night__title', {
          scrollTrigger: { trigger: root, start: 'top 72%' },
        })
        revealUp('.night__copy, .night__note', {
          stagger: 0.12,
          scrollTrigger: { trigger: root, start: 'top 68%' },
        })
      })

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const media = root.querySelector('.night__media')
        if (media) parallax(root, media, 56)
      })
    }, root)

    return () => ctx.revert()
  }, [language])

  return (
    <section className="night" data-section="night" id="night" ref={rootRef}>
      <div className="night__grid lh-container">
        <SectionTitle number="02" eyebrow={t.night.eyebrow}>
          <span className="night__title" key={language}>
            {t.night.titleLines.map((line, index) => (
              <Fragment key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </Fragment>
            ))}
          </span>
        </SectionTitle>

        <div className="night__media">
          <Media
            src="/nigth-empty-street.webp"
            alt={t.night.media.alt}
            aspect="4 / 5"
            tone="burgundy"
            objectPosition="center"
          />
        </div>

        <div className="night__text">
          <p className="night__copy">{t.night.primaryCopy}</p>
          <p className="night__copy">{t.night.secondaryCopy}</p>
          <p className="night__note">{t.night.note}</p>
        </div>
      </div>
    </section>
  )
}
