import { useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function AccordionItem({ question, answer, isOpen, onToggle }) {
  const contentRef = useRef(null)
  const [contentHeight, setContentHeight] = useState(0)

  useLayoutEffect(() => {
    if (!contentRef.current) return

    const element = contentRef.current
    const updateHeight = () => setContentHeight(element.scrollHeight)

    updateHeight()

    if (typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver(updateHeight)
    observer.observe(element)

    return () => observer.disconnect()
  }, [answer, isOpen])

  return (
    <div
      style={{
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          background: 'transparent',
          border: 'none',
          color: isOpen ? 'var(--accent)' : 'var(--text-primary)',
          fontSize: '16px',
          fontWeight: '600',
          textAlign: 'left',
          cursor: 'pointer',
          gap: '16px',
          transition: 'color 0.2s',
        }}
      >
        <span>{question}</span>
        <ChevronDown
          size={20}
          style={{
            flexShrink: 0,
            transition: 'transform 0.3s',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'var(--accent)',
          }}
        />
      </button>

      <div
        ref={contentRef}
        aria-hidden={!isOpen}
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '15px',
            lineHeight: '1.75',
            paddingBottom: '20px',
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  )
}
