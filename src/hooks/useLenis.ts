import Lenis from 'lenis'
import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import 'lenis/dist/lenis.css'

let lenisInstance: Lenis | null = null

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollToAnchor(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: 0, duration: 1.15 })
    return
  }

  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
}

export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      return
    }

    const lenis = new Lenis()
    lenisInstance = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
