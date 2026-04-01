import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isDesktop || reduceMotion) return

    document.documentElement.classList.add('custom-cursor-enabled')

    const dot = dotRef.current
    const ring = ringRef.current

    if (!dot || !ring) {
      document.documentElement.classList.remove('custom-cursor-enabled')
      return
    }

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let raf = 0
    let isHidden = false

    const isInteractive = (target) => {
      if (!(target instanceof Element)) return false
      return Boolean(
        target.closest('a, button, input, textarea, select, [role="button"], [data-cursor-link="true"]')
      )
    }

    const setHidden = (hidden) => {
      if (hidden === isHidden) return
      dot.classList.toggle('cc-hidden', hidden)
      ring.classList.toggle('cc-hidden', hidden)
      isHidden = hidden
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      raf = window.requestAnimationFrame(tick)
    }

    const onMove = (event) => {
      mouseX = event.clientX
      mouseY = event.clientY

      setHidden(false)
      ring.classList.toggle('cc-hover', isInteractive(event.target))
    }

    const onPointerDown = () => {
      ring.classList.add('cc-hover')
    }

    const onLeaveWindow = () => {
      setHidden(true)
      ring.classList.remove('cc-hover')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onPointerDown, { passive: true })
    document.addEventListener('mouseleave', onLeaveWindow, { passive: true })
    raf = window.requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('mouseleave', onLeaveWindow)
      window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="cc-wrap" aria-hidden="true">
      <div ref={dotRef} className="cc-dot" />
      <div ref={ringRef} className="cc-ring" />
    </div>
  )
}
