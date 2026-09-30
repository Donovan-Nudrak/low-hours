import { useLayoutEffect, useRef } from 'react'
import { Media } from '../../components/Media/Media'
import { gallery } from '../../data/gallery'
import { useLanguage } from '../../i18n/language'
import { gsap } from '../../lib/gsap'
import { prefersReducedMotion, revealUp } from '../../lib/animations'
import './Gallery.css'

export function Gallery() {
  const rootRef = useRef<HTMLElement>(null)
  const { localize, t } = useLanguage()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        revealUp('.gallery__item', {
          stagger: 0.08,
          scrollTrigger: { trigger: root, start: 'top 75%' },
        })
      })

      mm.add('(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.gallery__track',
          { xPercent: 4 },
          {
            xPercent: -2,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="gallery" data-section="gallery" id="gallery" ref={rootRef}>
      <div className="gallery__intro lh-container">
        <p>07</p>
        <h2>{t.gallery.title}</h2>
      </div>
      <div className="gallery__track">
        {gallery.map((item) => (
          <div
            className={`gallery__item is-${item.span} is-${item.offset}`}
            key={item.src}
          >
            <Media
              src={item.src}
              alt={localize(item.alt)}
              aspect={item.aspect}
              tone={item.tone}
              objectPosition={item.objectPosition}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
