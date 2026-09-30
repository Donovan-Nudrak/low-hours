import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/animations'
import './Cursor.css'

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const finePointer = window.matchMedia('(pointer: fine)').matches

    if (!cursor || !finePointer || prefersReducedMotion()) {
      return
    }

    document.documentElement.classList.add('lh-has-cursor')

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.32, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.32, ease: 'power3.out' })

    const onMove = (event: PointerEvent) => {
      xTo(event.clientX)
      yTo(event.clientY)
    }

    const onOver = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const hoverable = target.closest('a, button, [data-cursor]')
      document.documentElement.classList.toggle('lh-cursor-hover', Boolean(hoverable))
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)

    return () => {
      document.documentElement.classList.remove('lh-has-cursor', 'lh-cursor-hover')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [])

  return <div className="lh-cursor" ref={cursorRef} aria-hidden="true" />
}
