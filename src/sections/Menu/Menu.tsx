import { ChevronDown } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { Media } from '../../components/Media/Media'
import { menu, menuByCategory, type MenuCategory, type MenuItem } from '../../data/menu'
import { useLanguage } from '../../i18n/language'
import { gsap } from '../../lib/gsap'
import { prefersReducedMotion, revealLines, revealUp } from '../../lib/animations'
import './Menu.css'

function formatPrice(price: number) {
  return `$${price}`
}

export function Menu() {
  const rootRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<MenuItem>(menu[0])
  const [openCategory, setOpenCategory] = useState<MenuCategory | null>(null)
  const { language, localize, t } = useLanguage()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      revealLines('.menu__title', {
        scrollTrigger: { trigger: root, start: 'top 75%' },
      })
      revealUp('.menu__group, .menu__stage', {
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: 'top 68%' },
      })
    }, root)

    return () => ctx.revert()
  }, [language])

  return (
    <section className="menu" data-section="menu" id="menu" ref={rootRef}>
      <div className="menu__grid lh-container">
        <h2 className="menu__title" key={language}>
          {t.menu.title}
        </h2>

        <div className="menu__mobile">
          <div className="menu__preview">
            <Media
              key={active.name}
              src={active.imageSrc}
              alt={active.imageAlt ? localize(active.imageAlt) : undefined}
              aspect="1 / 1"
              tone="brown"
              objectPosition="center 58%"
            />
          </div>

          <div className="menu__accordions">
            {menuByCategory.map((group) => {
              const open = group.id === openCategory
              const panelId = `menu-panel-${group.id}`

              return (
                <div className={`menu__accordion${open ? ' is-open' : ''}`} key={group.id}>
                  <button
                    type="button"
                    className="menu__accordion-trigger"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenCategory((current) => (current === group.id ? null : group.id))
                    }
                  >
                    <span>{localize(group.label)}</span>
                    <ChevronDown size={18} strokeWidth={1.4} aria-hidden="true" />
                  </button>

                  <div
                    className="menu__panel"
                    id={panelId}
                    role="region"
                    inert={!open}
                    aria-hidden={!open}
                  >
                    <div className="menu__panel-inner">
                      <ul>
                        {group.items.map((item) => (
                          <li key={item.name}>
                            <button
                              type="button"
                              className={`menu__item${item.name === active.name ? ' is-active' : ''}`}
                              tabIndex={open ? 0 : -1}
                              onClick={() => setActive(item)}
                            >
                              <span>{item.name}</span>
                              <span>{formatPrice(item.price)}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="menu__lists">
          {menuByCategory.map((group) => (
            <section className="menu__group" key={group.id} aria-labelledby={`menu-${group.id}`}>
              <h3 id={`menu-${group.id}`}>{localize(group.label)}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item.name}>
                    <button
                      type="button"
                      className={item.name === active.name ? 'is-active' : ''}
                      onMouseEnter={() => setActive(item)}
                      onFocus={() => setActive(item)}
                    >
                      <span>{item.name}</span>
                      <span>{formatPrice(item.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="menu__stage">
          <Media
            key={active.name}
            src={active.imageSrc}
            alt={active.imageAlt ? localize(active.imageAlt) : undefined}
            aspect="4 / 5"
            tone="brown"
            objectPosition={active.objectPosition}
          />
          <p>
            {active.name}
            <span>{formatPrice(active.price)}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
