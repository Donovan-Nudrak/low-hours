import { navLinks } from '../../data/nav'
import { scrollToAnchor } from '../../hooks/useLenis'
import { useLanguage } from '../../i18n/language'
import './Footer.css'

const developerLinks = [
  {
    href: 'https://www.linkedin.com/in/donovan-a-83b7ba3a2',
    labelKey: 'linkedin',
  },
  {
    href: 'https://github.com/Donovan-Nudrak/',
    labelKey: 'github',
  },
  {
    href: 'https://nudrak.dev',
    labelKey: 'portfolio',
  },
] as const

export function Footer() {
  const { localize, t } = useLanguage()

  return (
    <footer className="lh-footer">
      <div className="lh-footer__main">
        <div className="lh-footer__brand">
          <p className="lh-footer__mark">LOW HOURS</p>
          <p className="lh-footer__tag">{t.footer.tagline}</p>
        </div>

        <nav className="lh-footer__nav" aria-label={t.footer.navigation}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(event) => {
                event.preventDefault()
                scrollToAnchor(link.id)
              }}
            >
              {localize(link.label)}
            </a>
          ))}
        </nav>
      </div>

      <div className="lh-footer__credit">
        <p className="lh-footer__credit-copy">{t.footer.credit}</p>
        <p className="lh-footer__credit-links">
          {developerLinks.map((link, index) => (
            <span key={link.href}>
              {index > 0 ? <span aria-hidden="true"> · </span> : null}
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {t.footer[link.labelKey]}
              </a>
            </span>
          ))}
        </p>
      </div>
    </footer>
  )
}
