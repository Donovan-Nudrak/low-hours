import { useLayoutEffect } from 'react'
import { gsap } from '../lib/gsap'

const backgroundStops = [
  { progress: 0, color: '#432818' },
  { progress: 0.14, color: '#6f1d1b' },
  { progress: 0.28, color: '#99582a' },
  { progress: 0.42, color: '#6f1d1b' },
  { progress: 0.56, color: '#432818' },
  { progress: 0.7, color: '#6f1d1b' },
  { progress: 0.84, color: '#99582a' },
  { progress: 1, color: '#432818' },
] as const

export function useGlobalBackground() {
  useLayoutEffect(() => {
    const root = document.documentElement

    const ctx = gsap.context(() => {
      gsap.set(root, { backgroundColor: backgroundStops[0].color })

      const timeline = gsap.timeline({
        scrollTrigger: {
          start: 0,
          end: 'max',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      backgroundStops.slice(1).forEach((stop, index) => {
        const previousProgress = backgroundStops[index].progress

        timeline.to(root, {
          backgroundColor: stop.color,
          duration: stop.progress - previousProgress,
          ease: 'none',
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])
}
