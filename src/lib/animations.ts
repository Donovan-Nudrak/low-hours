import { gsap, SplitText } from './gsap'

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function revealLines(targets: string, vars: Record<string, unknown> = {}) {
  const split = SplitText.create(targets, {
    type: 'lines',
    mask: 'lines',
    autoSplit: true,
  })

  gsap.set(split.lines, { yPercent: 110 })

  return gsap.to(split.lines, {
    yPercent: 0,
    duration: 1.1,
    stagger: 0.08,
    ease: 'power3.out',
    ...vars,
  })
}

export function revealUp(targets: string, vars: Record<string, unknown> = {}) {
  return gsap.from(targets, {
    y: 28,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out',
    ...vars,
  })
}

export function maskReveal(targets: string, vars: Record<string, unknown> = {}) {
  return gsap.fromTo(
    targets,
    { clipPath: 'inset(16% 12% 18% 14% round 42% 18% 32% 12%)', scale: 1.08 },
    {
      clipPath: 'inset(0% 0% 0% 0% round 0%)',
      scale: 1,
      duration: 1.35,
      ease: 'power2.out',
      ...vars,
    },
  )
}

export function parallax(
  trigger: Element,
  target: Element,
  amount = 48,
) {
  return gsap.fromTo(
    target,
    { y: -amount },
    {
      y: amount,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    },
  )
}
