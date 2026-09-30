import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/animations'
import './Preloader.css'

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const onCompleteRef = useRef(onComplete)

  useLayoutEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    if (prefersReducedMotion()) {
      root.setAttribute('hidden', '')
      onCompleteRef.current()
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(root, {
            yPercent: -100,
            duration: 0.85,
            ease: 'power2.inOut',
            onComplete: () => {
              root.setAttribute('hidden', '')
              onCompleteRef.current()
            },
          })
        },
      })

      tl.from('.lh-preloader__word', {
        yPercent: 110,
        duration: 0.8,
        ease: 'power3.out',
      }).to({}, { duration: 0.28 })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div className="lh-preloader" ref={rootRef} aria-hidden="true">
      <p className="lh-preloader__mask">
        <span className="lh-preloader__word">LOW HOURS</span>
      </p>
    </div>
  )
}
