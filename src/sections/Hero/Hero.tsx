import { ArrowRight } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { Media } from '../../components/Media/Media'
import { scrollToAnchor } from '../../hooks/useLenis'
import { useLanguage } from '../../i18n/language'
import { gsap } from '../../lib/gsap'
import { maskReveal, prefersReducedMotion, revealLines, revealUp } from '../../lib/animations'
import './Hero.css'

interface HeroProps {
  ready: boolean
}

export function Hero({ ready }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const hasEnteredRef = useRef(false)
  const { language, t } = useLanguage()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || !ready) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion() || hasEnteredRef.current) {
        gsap.set(
          ['.hero__title span', '.hero__slogan', '.hero__copy', '.hero__cta', '.hero__media'],
          { clearProps: 'all' },
        )
        hasEnteredRef.current = true
        return
      }

      hasEnteredRef.current = true
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        revealLines('.hero__title span')
        revealUp('.hero__slogan', { delay: 0.22 })
        revealUp('.hero__copy', { delay: 0.38 })
        revealUp('.hero__cta', { delay: 0.5 })
        maskReveal('.hero__media', { delay: 0.2 })
      })
    }, root)

    return () => ctx.revert()
  }, [language, ready])

  return (
    <section className="hero" data-section="hero" id="hero" ref={rootRef}>
      <div className="hero__grid lh-container">
        <div className="hero__heading" key={language}>
          <h1 className="hero__title">
            {t.hero.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="hero__slogan">{t.hero.slogan}</p>
        </div>

        <p className="hero__copy">{t.hero.status}</p>

        <a
          className="hero__cta"
          href="#night"
          onClick={(event) => {
            event.preventDefault()
            scrollToAnchor('night')
          }}
        >
          {t.hero.cta}
          <ArrowRight size={18} strokeWidth={1.5} />
        </a>

        <div className="hero__media">
          <Media
            src="/hero-night-window.webp"
            alt={t.hero.media.alt}
            aspect="4 / 5"
            tone="brown"
            objectPosition="center left"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  )
}
