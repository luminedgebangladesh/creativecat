import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

export function useCounter(target, duration = 1800) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const started = useRef(false)

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true
      const steps = 60
      const stepDuration = duration / steps
      const increment = target / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, stepDuration)
      return () => clearInterval(timer)
    }
  }, [inView, target, duration])

  return [count, ref]
}
