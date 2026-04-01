import { useCounter } from '../../hooks/useCounter'

export default function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const [count, ref] = useCounter(target)
  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}
