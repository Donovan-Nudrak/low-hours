import { Menu, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useState } from 'react'
import { navLinks } from '../../data/nav'
import { scrollToAnchor } from '../../hooks/useLenis'
import { useLanguage } from '../../i18n/language'
import type { Language } from '../../i18n/translations'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import './Header.css'

interface HeaderProps {
  ready: boolean
}

function goTo(id: string) {
  scrollToAnchor(id)
}

function LanguageSelector({ className = '' }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage()

  const options: { value: Language; label: string; ariaLabel: string }[] = [
    { value: 'en', label: 'EN', ariaLabel: t.language.english },
    { value: 'es', label: 'ES', ariaLabel: t.language.spanish },
  ]

  return (
    <div
      className={`lh-header__language ${className}`.trim()}
      role="group"
      aria-label={t.language.selector}
    >
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          className={language === option.value ? 'is-active' : ''}
          aria-label={option.ariaLabel}
          aria-pressed={language === option.value}
          lang={option.value}
          onClick={() => setLanguage(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export function Header({ ready }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { localize, t } = useLanguage()

  useLayoutEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const trigger = gsap.context(() => {
      ScrollTrigger.create({
        trigger: hero,
        start: 'bottom top+=72',
        onEnter: () => setScrolled(true),
        onLeaveBack: () => setScrolled(false),
      })
    })

    return () => trigger.revert()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const onNavClick = (id: string) => {
    setOpen(false)
    goTo(id)
  }

  return (
    <header
      className={`lh-header${scrolled ? ' is-scrolled' : ''}${ready ? ' is-ready' : ''}`}
    >
      <a
        className="lh-header__mark"
        href="#hero"
        onClick={(event) => {
          event.preventDefault()
          onNavClick('hero')
        }}
      >
        LOW HOURS
      </a>

      <div className="lh-header__desktop">
        <nav className="lh-header__nav" aria-label={t.header.primaryNavigation}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(event) => {
                event.preventDefault()
                onNavClick(link.id)
              }}
            >
              {localize(link.label)}
            </a>
          ))}
        </nav>
        <LanguageSelector className="lh-header__language--desktop" />
      </div>

      <button
        className="lh-header__toggle"
        type="button"
        aria-expanded={open}
        aria-controls="lh-mobile-nav"
        aria-label={open ? t.header.closeMenu : t.header.openMenu}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
      </button>

      <div
        className={`lh-header__panel${open ? ' is-open' : ''}`}
        id="lh-mobile-nav"
        hidden={!open}
      >
        <nav aria-label={t.header.mobileNavigation}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(event) => {
                event.preventDefault()
                onNavClick(link.id)
              }}
            >
              {localize(link.label)}
            </a>
          ))}
        </nav>
        <LanguageSelector className="lh-header__language--mobile" />
      </div>
    </header>
  )
}
