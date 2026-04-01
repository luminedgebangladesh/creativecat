import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Calendar } from 'lucide-react'
import { posts } from '../../data/blog'

export default function Blog() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="blog" ref={ref} style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="section-tag">OUR BLOG</span>
          <h2 className="section-title">Latest Blog &amp; Articles</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Stay updated with the latest in the industry
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.07)',
                boxShadow: 'var(--shadow-card)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(255,105,0,0.12)' }}
            >
              {/* Cover image */}
              <div style={{ height: '200px', overflow: 'hidden', background: '#f5f7ff' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              <div style={{ padding: '24px' }}>
                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '12px' }}>
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', color: 'var(--accent)', textTransform: 'uppercase' }}>
                    {post.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: '700', lineHeight: '1.4', color: 'var(--text-primary)', marginBottom: '10px' }}>
                  {post.title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.7', marginBottom: '20px',
                  display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {post.excerpt}
                </p>

                <a
                  href={`https://creativecat.digital/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600', transition: 'gap 0.2s, color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.gap = '10px'; e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.gap = '6px'; e.currentTarget.style.color = 'var(--text-primary)' }}
                >
                  Read More <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
