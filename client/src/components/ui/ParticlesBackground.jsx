import { useEffect, useRef } from 'react'

const COUNT      = 18     // fewer, cleaner
const LINK_DIST  = 140
const MOUSE_DIST = 265
const MAX_SPEED  = 0.28

// Deep brand orange for mouse lines
const MOUSE_COLOR = '220,65,0'
// Particle colours: 60% deep orange, 40% purple
const COLORS = ['220,90,0', '220,90,0', '220,90,0', '91,78,158', '91,78,158']

export default function ParticlesBackground() {
  const canvasRef = useRef(null)
  const mouse     = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let rafId
    let w = 0, h = 0
    let particles = []

    function resize() {
      w = canvas.width  = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    function spawn() {
      particles = Array.from({ length: COUNT }, () => {
        const ang = Math.random() * Math.PI * 2
        const spd = 0.18 + Math.random() * MAX_SPEED
        return {
          x:   Math.random() * w,
          y:   Math.random() * h,
          vx:  Math.cos(ang) * spd,
          vy:  Math.sin(ang) * spd,
          r:   2.2 + Math.random() * 2.0,   // bigger dots
          hue: COLORS[Math.floor(Math.random() * COLORS.length)],
        }
      })
    }

    resize(); spawn()

    const onResize = () => { resize(); spawn() }
    const onMove   = e  => { mouse.current = { x: e.clientX, y: e.clientY } }
    const onLeave  = () => { mouse.current = { x: -9999, y: -9999 } }

    window.addEventListener('resize',     onResize)
    window.addEventListener('mousemove',  onMove)
    document.addEventListener('mouseleave', onLeave)

    function tick() {
      ctx.clearRect(0, 0, w, h)

      // ── Move & wrap ──────────────────────────────────────────
      for (const p of particles) {
        p.x += p.vx;  p.y += p.vy
        if (p.x < -10)    p.x = w + 10
        else if (p.x > w + 10) p.x = -10
        if (p.y < -10)    p.y = h + 10
        else if (p.y > h + 10) p.y = -10
      }

      // ── Particle → Particle lines ────────────────────────────
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b  = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < LINK_DIST) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(91,78,158,${(1 - d / LINK_DIST) * 0.28})`
            ctx.lineWidth   = 0.8
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // ── Mouse → Particle lines — deep orange ─────────────────
      const { x: mx, y: my } = mouse.current
      for (const p of particles) {
        const dx = p.x - mx, dy = p.y - my
        const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < MOUSE_DIST) {
          const alpha = Math.pow(1 - d / MOUSE_DIST, 1.2) * 0.96
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${MOUSE_COLOR},${alpha})`
          ctx.lineWidth   = 2.2
          ctx.moveTo(p.x, p.y); ctx.lineTo(mx, my)
          ctx.stroke()
        }
      }

      // ── Dots ─────────────────────────────────────────────────
      for (const p of particles) {
        // glow halo
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.8)
        grd.addColorStop(0,   `rgba(${p.hue},0.55)`)
        grd.addColorStop(1,   `rgba(${p.hue},0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 2.8, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
        // solid core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.hue},0.75)`
        ctx.fill()
      }

      rafId = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize',     onResize)
      window.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        zIndex:        1,          // behind content, above ambient gradients
        pointerEvents: 'none',
      }}
    />
  )
}
