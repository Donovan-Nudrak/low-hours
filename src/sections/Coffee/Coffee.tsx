import { Fragment, useLayoutEffect, useRef } from 'react'
import { Media } from '../../components/Media/Media'
import { featuredDrinks } from '../../data/menu'
import { useLanguage } from '../../i18n/language'
import { gsap } from '../../lib/gsap'
import { prefersReducedMotion, revealLines, revealUp } from '../../lib/animations'
import './Coffee.css'

function formatPrice(price: number) {
  return `$${price}`
}

export function Coffee() {
  const rootRef = useRef<HTMLElement>(null)
  const { language, localize, t } = useLanguage()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      const mm = gsap.matchMedia()
      const items = gsap.utils.toArray<HTMLElement>('.coffee__item')

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        revealLines('.coffee__title', {
          scrollTrigger: { trigger: root, start: 'top 75%' },
        })
        revealUp('.coffee__item', {
          stagger: 0.12,
          scrollTrigger: { trigger: root, start: 'top 62%' },
        })
      })

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        items.forEach((item, index) => {
          gsap.fromTo(
            item.querySelector('.coffee__media'),
            { y: index % 2 === 0 ? -12 : 12 },
            {
              y: index % 2 === 0 ? 12 : -12,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          )
        })
      })
    }, root)

    return () => ctx.revert()
  }, [language])

  return (
    <section className="coffee" data-section="coffee" id="coffee" ref={rootRef}>
      <div className="lh-container">
        <h2 className="coffee__title" key={language}>
          {t.coffee.titleLines.map((line, index) => (
            <Fragment key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </Fragment>
          ))}
        </h2>

        <ul className="coffee__list">
          {featuredDrinks.map((drink, index) => (
            <li className="coffee__item" key={drink.name}>
              <p className="coffee__index">{String(index + 1).padStart(2, '0')}</p>
              <div className="coffee__copy">
                <h3>
                  {drink.name}
                  <span className="coffee__price">{formatPrice(drink.price)}</span>
                </h3>
              </div>
              <div className="coffee__media">
                <Media
                  src={drink.imageSrc}
                  alt={drink.imageAlt ? localize(drink.imageAlt) : undefined}
                  aspect={index === 1 ? '1 / 1' : '4 / 5'}
                  tone={index === 0 ? 'amber' : index === 1 ? 'burgundy' : 'brown'}
                  objectPosition={drink.objectPosition}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
