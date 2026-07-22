import { useEffect, useMemo, useRef, useState } from 'react'
import './HeroSection.css'

const trustAvatars = [
  { label: 'RS', gradient: 'linear-gradient(135deg, #ffdb9f 0%, #ffb96e 100%)' },
  { label: 'NV', gradient: 'linear-gradient(135deg, #f5f7ff 0%, #c3d2ff 100%)' },
  { label: 'AP', gradient: 'linear-gradient(135deg, #d7d6ff 0%, #9db2ff 100%)' },
  { label: 'TN', gradient: 'linear-gradient(135deg, #ffe7c2 0%, #f5c271 100%)' },
  { label: 'KA', gradient: 'linear-gradient(135deg, #efe6ff 0%, #bfa1ff 100%)' },
]

const heroFeatures = [
  {
    title: 'Verified Providers',
    detail: '100% Verified & Trusted',
    icon: 'shield',
  },
  {
    title: 'Secure Payments',
    detail: 'Safe & Encrypted',
    icon: 'lock',
  },
  {
    title: '24/7 Support',
    detail: 'Always Here to Help',
    icon: 'support',
  },
]

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches)

    syncPreference()
    mediaQuery.addEventListener('change', syncPreference)

    return () => mediaQuery.removeEventListener('change', syncPreference)
  }, [])

  return prefersReducedMotion
}

function formatAnimatedValue(value, decimals, suffix = '') {
  const formatter = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return `${formatter.format(value)}${suffix}`
}

function AnimatedValue({ value, decimals = 0, suffix = '', active, reducedMotion = false }) {
  const [displayValue, setDisplayValue] = useState(active ? value : 0)

  useEffect(() => {
    if (!active) {
      setDisplayValue(0)
      return undefined
    }

    if (reducedMotion) {
      setDisplayValue(value)
      return undefined
    }

    let animationFrameId = 0
    const duration = 1800
    const startTime = performance.now()

    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(value * easedProgress)

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(updateValue)
      }
    }

    animationFrameId = window.requestAnimationFrame(updateValue)

    return () => window.cancelAnimationFrame(animationFrameId)
  }, [active, reducedMotion, value])

  return formatAnimatedValue(displayValue, decimals, suffix)
}

function SearchIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.4 15.4 20 20" />
    </svg>
  )
}

function ShieldIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 2.5 4.5 5.8v5.1c0 5.1 3.1 9.8 7.5 11.6 4.4-1.8 7.5-6.5 7.5-11.6V5.8L12 2.5Z"
        fill="currentColor"
      />
      <path
        d="m9.2 12.4 1.8 1.8 3.8-4"
        fill="none"
        stroke="#081427"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function LockIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <rect x="5" y="10" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8.5 10V8.2a3.5 3.5 0 1 1 7 0V10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function SupportIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M6 13.5v1.8a2 2 0 0 0 2 2h1.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <path
        d="M18 13.5v1.8a2 2 0 0 1-2 2h-1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <path
        d="M7 13.5v-1.3a5 5 0 1 1 10 0v1.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <rect x="4.5" y="11.4" width="3.2" height="5.6" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <rect x="16.3" y="11.4" width="3.2" height="5.6" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10.3 19.2h3.4a1.2 1.2 0 0 1 0 2.4h-2.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function StarIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="m12 3.8 2.5 5.1 5.6.8-4.1 4 1 5.6-5-2.6-5 2.6 1-5.6-4.1-4 5.6-.8L12 3.8Z"
        fill="currentColor"
      />
    </svg>
  )
}

function BadgeIcon({ type }) {
  if (type === 'lock') {
    return <LockIcon className="hero-point-icon-svg" />
  }

  if (type === 'support') {
    return <SupportIcon className="hero-point-icon-svg" />
  }

  return <ShieldIcon className="hero-point-icon-svg" />
}

function HeroSection({ heroImage }) {
  const heroRef = useRef(null)
  const slowLayerRef = useRef(null)
  const personMotionRef = useRef(null)
  const topCardParallaxRef = useRef(null)
  const leftCardParallaxRef = useRef(null)
  const rightCardParallaxRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isReady, setIsReady] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [rippleId, setRippleId] = useState(0)

  const particles = useMemo(() => {
    return Array.from({ length: 18 }, (_, index) => ({
      id: `particle-${index}`,
      left: `${6 + ((index * 11) % 88)}%`,
      top: `${8 + ((index * 13) % 74)}%`,
      size: `${4 + (index % 4) * 2}px`,
      duration: `${12 + (index % 5) * 3}s`,
      delay: `${(index % 6) * -1.4}s`,
    }))
  }, [])

  useEffect(() => {
    const mountId = window.requestAnimationFrame(() => setIsReady(true))
    return () => window.cancelAnimationFrame(mountId)
  }, [])

  useEffect(() => {
    const observedHero = heroRef.current

    if (!observedHero) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(observedHero)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || !heroRef.current || !isInView) {
      return undefined
    }

    const heroElement = heroRef.current
    const targets = [
      { ref: slowLayerRef, multiplier: 0.34 },
      { ref: personMotionRef, multiplier: 0.9 },
      { ref: topCardParallaxRef, multiplier: 0.78 },
      { ref: leftCardParallaxRef, multiplier: 0.62 },
      { ref: rightCardParallaxRef, multiplier: 0.7 },
    ]

    let animationFrameId = 0
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }

    const animate = () => {
      current.x += (target.x - current.x) * 0.085
      current.y += (target.y - current.y) * 0.085

      targets.forEach(({ ref, multiplier }) => {
        const element = ref.current

        if (!element) {
          return
        }

        element.style.transform = `translate3d(${(current.x * 20 * multiplier).toFixed(2)}px, ${(current.y * 20 * multiplier).toFixed(2)}px, 0)`
      })

      animationFrameId = window.requestAnimationFrame(animate)
    }

    const updateTarget = (event) => {
      const bounds = heroElement.getBoundingClientRect()
      const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5
      const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5

      target.x = Math.max(-1, Math.min(1, relativeX * 2))
      target.y = Math.max(-1, Math.min(1, relativeY * 2))
    }

    const resetTarget = () => {
      target.x = 0
      target.y = 0
    }

    animationFrameId = window.requestAnimationFrame(animate)
    heroElement.addEventListener('pointermove', updateTarget)
    heroElement.addEventListener('pointerleave', resetTarget)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      heroElement.removeEventListener('pointermove', updateTarget)
      heroElement.removeEventListener('pointerleave', resetTarget)
    }
  }, [isInView, prefersReducedMotion])

  const handleButtonPointerMove = (event) => {
    if (prefersReducedMotion) {
      return
    }

    const buttonElement = event.currentTarget
    const bounds = buttonElement.getBoundingClientRect()
    const offsetX = event.clientX - bounds.left - bounds.width / 2
    const offsetY = event.clientY - bounds.top - bounds.height / 2

    buttonElement.style.setProperty('--hero-btn-x', `${(offsetX / bounds.width) * 12}px`)
    buttonElement.style.setProperty('--hero-btn-y', `${(offsetY / bounds.height) * 12}px`)
  }

  const resetButtonMagnet = (event) => {
    event.currentTarget.style.setProperty('--hero-btn-x', '0px')
    event.currentTarget.style.setProperty('--hero-btn-y', '0px')
  }

  const revealClassName = isReady && isInView ? 'is-visible' : ''
  const shouldShowNumbers = isInView || prefersReducedMotion

  return (
    <section
      ref={heroRef}
      className={`hero-section interactive-hero ${revealClassName}${prefersReducedMotion ? ' reduced-motion' : ''}`}
      id="top"
    >
      <div className="hero-ambient-scene" aria-hidden="true">
        <div ref={slowLayerRef} className="hero-depth-plane hero-depth-plane-slow">
          <span className="hero-orb hero-orb-blue"></span>
          <span className="hero-orb hero-orb-purple"></span>
          <span className="hero-orb hero-orb-gold"></span>
          <span className="hero-ring hero-ring-one"></span>
          <span className="hero-ring hero-ring-two"></span>
          <span className="hero-ring hero-ring-three"></span>
        </div>

        <div className="hero-particle-field">
          {particles.map((particle) => (
            <span
              key={particle.id}
              className="hero-particle-dot"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                animationDuration: particle.duration,
                animationDelay: particle.delay,
              }}
            ></span>
          ))}
        </div>

        <svg
          className="hero-connection-lines"
          viewBox="0 0 900 620"
          preserveAspectRatio="none"
        >
          <path d="M514 86C680 78 772 154 846 292" />
          <path d="M496 170C628 218 730 318 770 486" />
          <path d="M430 272C542 324 612 402 646 548" />
          <circle cx="846" cy="292" r="6" />
          <circle cx="770" cy="486" r="4.5" />
          <circle cx="646" cy="548" r="4.5" />
        </svg>
      </div>

      <div className="container container-wide hero-grid">
        <div className="hero-copy hero-copy-entrance">
          <div className="hero-stagger-item hero-trust-badge-row">
            <div className="hero-avatar-stack">
              {trustAvatars.map((avatar) => (
                <span
                  key={avatar.label}
                  className="hero-avatar-chip"
                  style={{ background: avatar.gradient }}
                >
                  {avatar.label}
                </span>
              ))}
            </div>

            <div className="hero-trust-pill">
              <span className="hero-trust-icon">
                <ShieldIcon className="hero-trust-shield-svg" />
              </span>
              <span className="hero-trust-text">
                Trusted by <AnimatedValue value={10000} suffix="+" active={shouldShowNumbers} reducedMotion={prefersReducedMotion} /> Businesses
                Worldwide
              </span>
            </div>
          </div>

          <h1 className="hero-heading">
            <span className="hero-stagger-item">Find Trusted Professionals.</span>
            <span className="hero-stagger-item hero-gradient-text">Grow Your Business.</span>
          </h1>

          <p className="hero-text hero-stagger-item">
            Apna Biz connects you with verified service providers for every business need
            {' '}
            - fast, reliable & affordable.
          </p>

          <form
            id="ai-assist"
            className="search-bar hero-search-bar hero-stagger-item"
            onSubmit={(event) => event.preventDefault()}
            role="search"
            aria-label="Search services"
          >
            <label className="hero-search-field">
              <SearchIcon className="hero-search-icon" />
              <input
                type="search"
                aria-label="Search services"
                placeholder="Search services like GST, Logo, Website..."
              />
            </label>

            <div className="hero-select-wrap">
              <select aria-label="Choose category" defaultValue="All Categories">
                <option>All Categories</option>
                <option>Accounting & GST</option>
                <option>App Development</option>
                <option>Web Development</option>
                <option>Logo & Branding</option>
              </select>
              <span className="hero-select-caret"></span>
            </div>

            <button
              type="submit"
              className="hero-search-button"
              onPointerMove={handleButtonPointerMove}
              onPointerLeave={resetButtonMagnet}
              onClick={() => setRippleId((currentValue) => currentValue + 1)}
            >
              <span className="hero-search-button-label">Search</span>
              <span key={rippleId} className="hero-search-ripple" aria-hidden="true"></span>
            </button>
          </form>

          <div className="hero-points hero-stagger-item">
            {heroFeatures.map((feature) => (
              <article key={feature.title} className="hero-point-card">
                <span className={`hero-point-icon hero-point-icon-${feature.icon}`}>
                  <BadgeIcon type={feature.icon} />
                </span>
                <div>
                  <strong>{feature.title}</strong>
                  <small>{feature.detail}</small>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-visual hero-visual-entrance" aria-hidden="true">
          <div className="hero-person-motion" ref={personMotionRef}>
            <div className="hero-person-shell">
              <div className="hero-person-shadow"></div>
              <div className="hero-person-halo"></div>
              <img
                src={heroImage}
                alt=""
                loading="eager"
                decoding="async"
                className="hero-person-image"
              />
            </div>
          </div>

          <div className="hero-card-motion hero-card-motion-top">
            <div className="hero-card-parallax" ref={topCardParallaxRef}>
              <article className="hero-glass-card hero-stat-card hero-stat-card-top">
                <span className="card-label">Projects Completed</span>
                <strong>
                  <AnimatedValue value={12500} suffix="+" active={shouldShowNumbers} reducedMotion={prefersReducedMotion} />
                </strong>
                <small>18.2% this month</small>
                <svg className="hero-chart-wave" viewBox="0 0 80 40">
                  <path d="M4 28 18 18l12 7 18-16 16 13 12-12" />
                </svg>
              </article>
            </div>
          </div>

          <div className="hero-card-motion hero-card-motion-left">
            <div className="hero-card-parallax" ref={leftCardParallaxRef}>
              <article className="hero-glass-card hero-stat-card hero-stat-card-left">
                <span className="card-label">Top Rated Providers</span>
                <div className="hero-mini-avatar-row">
                  {trustAvatars.slice(0, 4).map((avatar) => (
                    <span
                      key={avatar.label}
                      className="hero-mini-avatar"
                      style={{ background: avatar.gradient }}
                    >
                      {avatar.label}
                    </span>
                  ))}
                  <span className="hero-mini-avatar hero-mini-avatar-more">+</span>
                </div>

                <div className="hero-rating-row">
                  <StarIcon className="hero-rating-star" />
                  <strong>
                    <AnimatedValue value={4.8} decimals={1} active={shouldShowNumbers} reducedMotion={prefersReducedMotion} />
                  </strong>
                  <small>(2,345 reviews)</small>
                </div>
              </article>
            </div>
          </div>

          <div className="hero-card-motion hero-card-motion-right">
            <div className="hero-card-parallax" ref={rightCardParallaxRef}>
              <article className="hero-glass-card hero-stat-card hero-stat-card-right">
                <span className="card-label">Payments Secured</span>
                <div className="hero-payment-row">
                  <span className="hero-payment-icon">
                    <ShieldIcon className="hero-payment-shield" />
                  </span>
                  <strong>
                    <AnimatedValue value={100} suffix="%" active={shouldShowNumbers} reducedMotion={prefersReducedMotion} />
                  </strong>
                </div>
                <small>Safe & Secure</small>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
