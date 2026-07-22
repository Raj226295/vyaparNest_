import { useEffect, useRef, useState } from 'react'
import PartnerLoginModal from './PartnerLoginModal.jsx'
import './PublicHomePage.css'

const primaryNavLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Categories', href: '#categories', hasChevron: true, isActive: true },
  { label: 'AI Assist', href: '#how-it-works' },
  { label: 'Dashboard', href: '#providers' },
]

const popularSearches = [
  'Website Designer',
  'GST Filing',
  'Logo Design',
  'Digital Marketing',
  'Photographer',
]

const categoryCards = [
  {
    title: 'Website Development',
    experts: '260+ Experts',
    image: '/category-icons/web.gif',
  },
  {
    title: 'Graphic & Logo Design',
    experts: '180+ Experts',
    image: '/category-icons/graphic-designer.gif',
  },
  {
    title: 'Digital Marketing',
    experts: '320+ Experts',
    image: '/category-icons/analytics.gif',
  },
  {
    title: 'GST & Tax Services',
    experts: '150+ Experts',
    image: '/category-icons/tax.gif',
  },
  {
    title: 'Home Cleaning Services',
    experts: '400+ Experts',
    image: '/category-icons/cleaning-service.gif',
  },
  {
    title: 'Education & Tutors',
    experts: '300+ Experts',
    image: '/category-icons/teacher.gif',
  },
  {
    title: 'Photography & Video',
    experts: '175+ Experts',
    image: '/category-icons/movie-camera.gif',
  },
  {
    title: 'Business Consulting',
    experts: '200+ Experts',
    image: '/category-icons/user.gif',
  },
  {
    title: 'App Development',
    experts: '210+ Experts',
    image: '/category-icons/applications.gif',
  },
  {
    title: 'Social Media Management',
    experts: '220+ Experts',
    image: '/category-icons/web-data.gif',
  },
  {
    title: 'Vector Illustration',
    experts: '145+ Experts',
    image: '/category-icons/vector.gif',
  },
  {
    title: 'Legal Services',
    experts: '130+ Experts',
    image: '/category-icons/contract.gif',
  },
  {
    title: 'Repair & Maintenance',
    experts: '280+ Experts',
    image: '/category-icons/service.gif',
  },
  {
    title: 'Logistics & Delivery',
    experts: '190+ Experts',
    image: '/category-icons/delivery-service.gif',
  },
  {
    title: 'Startup & Business Setup',
    experts: '160+ Experts',
    image: '/category-icons/mission.gif',
  },
]

const platformMetrics = [
  { value: '10,000+', label: 'Service Providers', icon: 'users' },
  { value: '50,000+', label: 'Requests Completed', icon: 'document' },
  { value: '4.8 / 5', label: 'Average Rating', icon: 'star' },
  { value: '25+', label: 'Cities Covered', icon: 'location' },
]

const workflowSteps = [
  {
    title: 'Search a Service',
    description: 'Find the service you need from our wide range.',
    image: '/workflow-icons/search.gif',
  },
  {
    title: 'Compare & Connect',
    description: 'Compare verified professionals, ratings, and reviews.',
    image: '/workflow-icons/comparision.gif',
  },
  {
    title: 'Send Your Request',
    description: 'Send your requirement to the right professionals.',
    image: '/workflow-icons/send.gif',
  },
  {
    title: 'Get the Work Done',
    description: 'Select the best professional and get it done.',
    image: '/workflow-icons/verified.gif',
  },
]

const featuredProviders = [
  {
    initials: 'PS',
    name: 'PixelCraft Studio',
    service: 'Website & Graphic Design',
    location: 'Purnia, Bihar',
    rating: '4.8',
    reviews: '120',
    years: '5 Years',
    projects: '220+ Projects',
    accent: 'linear-gradient(135deg, #111214 0%, #2f3238 100%)',
  },
  {
    initials: 'TI',
    name: 'TaxExpert India',
    service: 'GST & Tax Consultant',
    location: 'Purnia, Bihar',
    rating: '4.9',
    reviews: '85',
    years: '7 Years',
    projects: '200+ Projects',
    accent: 'linear-gradient(135deg, #0c0c0f 0%, #262934 100%)',
  },
  {
    initials: 'DG',
    name: 'DigitalGrow Agency',
    service: 'Digital Marketing',
    location: 'Purnia, Bihar',
    rating: '4.9',
    reviews: '95',
    years: '4 Years',
    projects: '150+ Projects',
    accent: 'linear-gradient(135deg, #3a1476 0%, #472f9c 100%)',
  },
  {
    initials: 'HE',
    name: 'HomeFix Experts',
    service: 'Home Services',
    location: 'Purnia, Bihar',
    rating: '4.8',
    reviews: '80',
    years: '6 Years',
    projects: '300+ Projects',
    accent: 'linear-gradient(135deg, #f6b613 0%, #f6ca42 100%)',
  },
]

const partnerBenefits = [
  {
    title: 'Reach New Customers',
    description: 'Connect with customers who are actively looking for services.',
    icon: 'users',
  },
  {
    title: 'Grow Your Business',
    description: 'Get more leads, projects, and build your brand online.',
    icon: 'briefcase',
  },
  {
    title: 'Trusted Platform',
    description: 'A secure and transparent platform you can rely on.',
    icon: 'shield',
  },
  {
    title: 'Dedicated Support',
    description: 'We are here to help you at every step of your journey.',
    icon: 'headset',
  },
]

const testimonials = [
  {
    quote:
      'I found a courier and IT service for my business within hours. Reliable and smooth experience!',
    name: 'Rahul Verma',
    role: 'Business Owner',
    stars: 5,
    avatar: '/testimonial-avatars/rahul-verma.svg',
  },
  {
    quote:
      'VyaparNest helped me connect with trusted GST consultants. The whole process was quick and easy.',
    name: 'Priya Singh',
    role: 'Entrepreneur',
    stars: 5,
    avatar: '/testimonial-avatars/priya-singh.svg',
  },
  {
    quote:
      'Got professional help and reliable service for my startup. Highly recommended!',
    name: 'Amit Verma',
    role: 'Shop Owner',
    stars: 5,
    avatar: '/testimonial-avatars/amit-verma.svg',
  },
]

const guides = [
  {
    image: '/market-sections/guide-website.png',
    hoverImage: '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_25_44 PM.png',
    category: 'Business Tips',
    title: 'How to Hire the Right Website Developer?',
    date: 'May 15, 2024',
    readTime: '5 min read',
  },
  {
    image: '/market-sections/guide-branding.png',
    hoverImage: '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_26_04 PM.png',
    category: 'Digital Marketing',
    title: 'Branding Strategies for GST Registration',
    date: 'May 12, 2024',
    readTime: '6 min read',
  },
  {
    image: '/market-sections/guide-marketing.png',
    hoverImage: '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_26_19 PM.png',
    category: 'Marketing',
    title: 'Best Digital Marketing Strategies for Small Business',
    date: 'May 8, 2024',
    readTime: '8 min read',
  },
  {
    image: '/market-sections/guide-growth.png',
    hoverImage: '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_26_31 PM.png',
    category: 'Business Growth',
    title: 'How to Grow Larger: Growth Tips & Best Ideas',
    date: 'May 5, 2024',
    readTime: '4 min read',
  },
]

const footerGroups = [
  {
    title: 'For Customers',
    links: ['Search Services', 'Post Requirement', 'My Requests', 'Help Center', 'How It Works'],
  },
  {
    title: 'For Professionals',
    links: ['List Your Business', 'Partner Registration', 'Partner Login', 'Pricing Plans', 'Resources'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Blog', 'Contact Us', 'Press & Media'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms & Conditions', 'Refund Policy', 'Community Guidelines'],
  },
]

function Icon({ type, className = '' }) {
  const sharedProps = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.9',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (type) {
    case 'menu':
      return (
        <svg {...sharedProps}>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      )
    case 'close':
      return (
        <svg {...sharedProps}>
          <path d="m6 6 12 12" />
          <path d="M18 6 6 18" />
        </svg>
      )
    case 'search':
      return (
        <svg {...sharedProps}>
          <circle cx="11" cy="11" r="6" />
          <path d="m20 20-4.2-4.2" />
        </svg>
      )
    case 'location':
      return (
        <svg {...sharedProps}>
          <path d="M12 20s6-5 6-10a6 6 0 1 0-12 0c0 5 6 10 6 10Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      )
    case 'arrow-right':
      return (
        <svg {...sharedProps}>
          <path d="M5 12h14" />
          <path d="m13 7 5 5-5 5" />
        </svg>
      )
    case 'chevron-down':
      return (
        <svg {...sharedProps}>
          <path d="m6.5 9.5 5.5 5 5.5-5" />
        </svg>
      )
    case 'users':
      return (
        <svg {...sharedProps}>
          <circle cx="9" cy="9" r="2.6" />
          <circle cx="16.6" cy="10.4" r="2.1" />
          <path d="M4.8 18.2a4.8 4.8 0 0 1 8.4-2.8" />
          <path d="M14.3 18.2a4.1 4.1 0 0 1 5-3.6" />
        </svg>
      )
    case 'laptop':
      return (
        <svg {...sharedProps}>
          <rect x="4" y="5" width="16" height="10.5" rx="2.3" />
          <path d="M2.8 18.3h18.4" />
        </svg>
      )
    case 'palette':
      return (
        <svg {...sharedProps}>
          <path d="M12 4.5c-4.8 0-8.5 3.1-8.5 7.1 0 2.6 1.9 4.4 4.5 4.4h1.2c.9 0 1.5.5 1.5 1.4 0 1.2 1 2 2.2 2 4.5 0 8.1-3.4 8.1-7.7 0-4-3.8-7.2-9-7.2Z" />
          <circle cx="8.1" cy="11.1" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="11.8" cy="8.4" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="15.4" cy="9.2" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'spark':
      return (
        <svg {...sharedProps}>
          <path d="M12 3.8 13.4 8l4.2 1.4-4.2 1.4-1.4 4.2-1.4-4.2-4.2-1.4L10.6 8 12 3.8Z" />
          <path d="m18.8 13.8.6 1.7 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6.6-1.7Z" />
        </svg>
      )
    case 'document':
      return (
        <svg {...sharedProps}>
          <path d="M8 4.8h6.1L18 8.7V19a2 2 0 0 1-2 2H8A2 2 0 0 1 6 19V6.8a2 2 0 0 1 2-2Z" />
          <path d="M14.1 4.8v3.9H18" />
          <path d="M9.2 11h5.8" />
          <path d="M9.2 14.4h5.8" />
        </svg>
      )
    case 'home':
      return (
        <svg {...sharedProps}>
          <path d="M4.8 18.5 12 6l7.2 12.5" />
          <path d="M8.2 18.5v-5.2h7.6v5.2" />
        </svg>
      )
    case 'graduation':
      return (
        <svg {...sharedProps}>
          <path d="m3.8 9.8 8.2-4.3 8.2 4.3-8.2 4.3-8.2-4.3Z" />
          <path d="M7 12.4V16c0 1.8 2.2 3.2 5 3.2s5-1.4 5-3.2v-3.6" />
          <path d="M20.2 10.8v4.7" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...sharedProps}>
          <rect x="4" y="5.8" width="16" height="14.2" rx="2.4" />
          <path d="M4 10.2h16" />
          <path d="M8 4v3.2" />
          <path d="M16 4v3.2" />
        </svg>
      )
    case 'briefcase':
      return (
        <svg {...sharedProps}>
          <rect x="4" y="7.2" width="16" height="11" rx="2.4" />
          <path d="M9 7.2V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8v1.4" />
          <path d="M4 12h16" />
        </svg>
      )
    case 'compare':
      return (
        <svg {...sharedProps}>
          <path d="M7 18V8" />
          <path d="M12 18V4" />
          <path d="M17 18v-6" />
        </svg>
      )
    case 'send':
      return (
        <svg {...sharedProps}>
          <path d="m4.5 11.6 14.8-6.2-3.4 13.2-4.1-4.1-4.7-2.9Z" />
          <path d="m11.8 14.5 2.2-2.2" />
        </svg>
      )
    case 'check-circle':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8.4" />
          <path d="m8.5 12.2 2.2 2.3 4.8-5" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...sharedProps}>
          <path d="M12 3.8 6.2 6.2v4.1c0 4.2 2.5 7.8 5.8 9.2 3.3-1.4 5.8-5 5.8-9.2V6.2L12 3.8Z" />
          <path d="m9.5 11.9 1.8 1.8 3.3-3.6" />
        </svg>
      )
    case 'headset':
      return (
        <svg {...sharedProps}>
          <path d="M5 13a7 7 0 0 1 14 0" />
          <rect x="4.3" y="12.4" width="3.4" height="5.6" rx="1.5" />
          <rect x="16.3" y="12.4" width="3.4" height="5.6" rx="1.5" />
          <path d="M16.3 18a2.1 2.1 0 0 1-2.1 2.1H12" />
        </svg>
      )
    case 'star':
      return (
        <svg {...sharedProps}>
          <path d="m12 4.6 2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 4.6Z" />
        </svg>
      )
    case 'play':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m10 8.8 5 3.2-5 3.2Z" fill="currentColor" stroke="none" />
        </svg>
      )
    default:
      return null
  }
}

function PublicHomePage({ onOpenPartnerRegistration, onOpenPartnerLogin, partnerLoginRequestId }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [partnerMenuOpen, setPartnerMenuOpen] = useState(false)
  const [partnerLoginOpen, setPartnerLoginOpen] = useState(false)
  const partnerMenuRef = useRef(null)

  useEffect(() => {
    if (partnerLoginRequestId > 0) {
      setPartnerLoginOpen(true)
      setMobileNavOpen(false)
      setPartnerMenuOpen(false)
    }
  }, [partnerLoginRequestId])

  useEffect(() => {
    if (!partnerLoginOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setPartnerLoginOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [partnerLoginOpen])

  useEffect(() => {
    if (!partnerMenuOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (partnerMenuRef.current && !partnerMenuRef.current.contains(event.target)) {
        setPartnerMenuOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setPartnerMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [partnerMenuOpen])

  const closePartnerLogin = () => {
    setPartnerLoginOpen(false)

    if (typeof window !== 'undefined' && window.location.hash === '#partner-login') {
      const nextUrl = `${window.location.pathname}${window.location.search}#top`
      window.history.replaceState(null, '', nextUrl)
    }
  }

  const handleOpenPartnerRegistration = () => {
    setMobileNavOpen(false)
    setPartnerMenuOpen(false)
    onOpenPartnerRegistration()
  }

  const handleOpenPartnerLogin = () => {
    setMobileNavOpen(false)
    setPartnerMenuOpen(false)
    onOpenPartnerLogin()
  }

  const openPartnerMenu = () => {
    setPartnerMenuOpen(true)
  }

  const closePartnerMenu = () => {
    setPartnerMenuOpen(false)
  }

  return (
    <div className="vn-home-shell" id="top">
      <div className="vn-home-glow vn-home-glow-left" aria-hidden="true"></div>
      <div className="vn-home-glow vn-home-glow-right" aria-hidden="true"></div>

      <header className="vn-home-header">
        <div className="vn-home-shell-inner is-fluid">
          <div className="vn-home-header-bar">
            <a className="vn-home-brand" href="#top" onClick={() => setMobileNavOpen(false)}>
              <img src="/vyaparnest-home-logo-reference.jpeg" alt="VyaparNest" />
            </a>

            <button
              type="button"
              className="vn-home-menu-toggle"
              aria-expanded={mobileNavOpen}
              aria-controls="vn-home-nav-panel"
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              <span>{mobileNavOpen ? 'Close' : 'Menu'}</span>
              <Icon type={mobileNavOpen ? 'close' : 'menu'} className="vn-home-menu-toggle-icon" />
            </button>

            <div id="vn-home-nav-panel" className={`vn-home-nav-area${mobileNavOpen ? ' is-open' : ''}`}>
              <div className="vn-home-nav-primary">
                <nav className="vn-home-nav-links" aria-label="Primary">
                  {primaryNavLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className={link.isActive ? 'is-active' : ''}
                      onClick={() => setMobileNavOpen(false)}
                    >
                      {link.label}
                      {link.hasChevron ? (
                        <Icon type="chevron-down" className="vn-home-nav-link-chevron" />
                      ) : null}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="vn-home-nav-secondary">
                <button type="button" className="vn-home-location-pill">
                  <Icon type="location" className="vn-home-location-pill-icon" />
                  <span>Purnia, Bihar</span>
                  <Icon type="chevron-down" className="vn-home-location-pill-chevron" />
                </button>

                <form className="vn-home-nav-search" onSubmit={(event) => event.preventDefault()}>
                  <Icon type="search" className="vn-home-nav-search-icon" />
                  <input type="search" placeholder="Search services..." aria-label="Search services" />
                  <button type="submit" aria-label="Search services">
                    <Icon type="search" className="vn-home-nav-search-submit-icon" />
                  </button>
                </form>

                <div className="vn-home-nav-buttons">
                  <div
                    className="vn-home-partner-wrap"
                    ref={partnerMenuRef}
                    onMouseEnter={openPartnerMenu}
                    onMouseLeave={closePartnerMenu}
                  >
                    <button
                      type="button"
                      className="vn-home-partner-button"
                      aria-expanded={partnerMenuOpen}
                      onFocus={openPartnerMenu}
                      onClick={() => setPartnerMenuOpen((open) => !open)}
                    >
                      <Icon type="users" className="vn-home-partner-button-icon" />
                      <span>Partner with us</span>
                    </button>

                    <aside className={`vn-home-partner-menu${partnerMenuOpen ? ' is-open' : ''}`}>
                      <button
                        type="button"
                        className="vn-home-partner-close"
                        aria-label="Close partner panel"
                        onClick={() => setPartnerMenuOpen(false)}
                      >
                        <Icon type="close" className="vn-home-partner-close-icon" />
                      </button>

                      <div className="vn-home-partner-menu-head">
                        <span className="vn-home-partner-menu-icon">
                          <Icon type="users" className="vn-home-partner-menu-icon-svg" />
                        </span>
                        <div>
                          <h3>
                            Partner With <span>VyaparNest</span>
                          </h3>
                          <p>
                            Grow your business, reach new customers, and discover better opportunities
                            with VyaparNest.
                          </p>
                        </div>
                      </div>

                      <div className="vn-home-partner-menu-list">
                        {partnerBenefits.map((benefit) => (
                          <article key={benefit.title} className="vn-home-partner-benefit">
                            <span className="vn-home-partner-benefit-icon">
                              <Icon type={benefit.icon} className="vn-home-partner-benefit-icon-svg" />
                            </span>
                            <div>
                              <strong>{benefit.title}</strong>
                              <p>{benefit.description}</p>
                            </div>
                          </article>
                        ))}
                      </div>

                      <div className="vn-home-partner-menu-actions">
                        <button
                          type="button"
                          className="vn-home-partner-menu-primary"
                          onClick={handleOpenPartnerRegistration}
                        >
                          Become a Partner
                          <Icon type="arrow-right" className="vn-home-partner-menu-primary-icon" />
                        </button>
                        <a
                          className="vn-home-partner-menu-secondary"
                          href="#for-business"
                          onClick={() => {
                            setMobileNavOpen(false)
                            setPartnerMenuOpen(false)
                          }}
                        >
                          Learn More
                        </a>
                      </div>
                    </aside>
                  </div>

                  <button type="button" className="vn-home-login-button" onClick={handleOpenPartnerLogin}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="vn-home-hero">
          <div className="vn-home-shell-inner is-fluid">
            <div className="vn-home-hero-banner">
              <video
                className="vn-home-hero-video"
                src="/vyaparnest-homepage-banner-reference.mp4"
                poster="/vyaparnest-home-banner.jpg"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="vn-home-hero-video-overlay"></div>
            </div>
          </div>
        </section>

        <div className="vn-home-content">
          <section className="vn-home-section vn-home-categories-section" id="categories">
            <div className="vn-home-shell-inner">
              <div className="vn-home-section-head">
                <div>
                  <h2>Explore Popular Categories</h2>
                </div>
                <a href="#providers" className="vn-home-section-link">
                  View All Categories
                  <Icon type="arrow-right" className="vn-home-section-link-icon" />
                </a>
              </div>

              <div className="vn-home-category-grid">
                {categoryCards.map((category) => (
                  <article key={category.title} className="vn-home-category-card">
                    <span className="vn-home-category-icon">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt=""
                          className="vn-home-category-icon-image"
                          loading="lazy"
                        />
                      ) : (
                        <Icon type={category.icon} className="vn-home-category-icon-svg" />
                      )}
                    </span>
                    <h3>{category.title}</h3>
                    <p>{category.experts}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="vn-home-section">
            <div className="vn-home-shell-inner">
              <div className="vn-home-metrics-strip">
                {platformMetrics.map((metric) => (
                  <article key={metric.label} className="vn-home-metric-card">
                    <span className="vn-home-metric-icon">
                      <Icon type={metric.icon} className="vn-home-metric-icon-svg" />
                    </span>
                    <div>
                      <strong>{metric.value}</strong>
                      <p>{metric.label}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="vn-home-section vn-home-workflow-section" id="how-it-works">
            <div className="vn-home-shell-inner">
              <div className="vn-home-section-head is-centered vn-home-workflow-head">
                <div>
                  <h2>
                    How <span>VyaparNest</span> Works?
                  </h2>
                </div>
              </div>

              <div className="vn-home-workflow-grid">
                {workflowSteps.map((step, index) => (
                  <div key={step.title} className="vn-home-workflow-step">
                    <article className="vn-home-workflow-card">
                      <span className="vn-home-workflow-icon">
                        {step.image ? (
                          <img
                            src={step.image}
                            alt=""
                            className="vn-home-workflow-icon-image"
                            loading="lazy"
                          />
                        ) : (
                          <Icon type={step.icon} className="vn-home-workflow-icon-svg" />
                        )}
                      </span>
                      <div className="vn-home-workflow-copy">
                        <span className="vn-home-workflow-index">{String(index + 1).padStart(2, '0')}</span>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </article>
                    {index < workflowSteps.length - 1 ? (
                      <span className="vn-home-workflow-arrow" aria-hidden="true">
                        <span className="vn-home-workflow-arrow-line"></span>
                        <Icon type="arrow-right" className="vn-home-workflow-arrow-icon" />
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="vn-home-section" id="providers">
            <div className="vn-home-shell-inner">
              <div className="vn-home-section-head">
                <div>
                  <h2>Recommended Professionals</h2>
                </div>
                <a href="#top" className="vn-home-section-link">
                  View All
                  <Icon type="arrow-right" className="vn-home-section-link-icon" />
                </a>
              </div>

              <div className="vn-home-provider-grid">
                {featuredProviders.map((provider) => (
                  <article
                    key={provider.name}
                    className="vn-home-provider-card"
                    style={{ '--provider-accent': provider.accent }}
                  >
                    <div className="vn-home-provider-head">
                      <span className="vn-home-provider-avatar">{provider.initials}</span>
                      <div>
                        <h3>{provider.name}</h3>
                        <p>{provider.service}</p>
                      </div>
                    </div>

                    <div className="vn-home-provider-location">
                      <Icon type="location" className="vn-home-provider-location-icon" />
                      <span>{provider.location}</span>
                    </div>

                    <div className="vn-home-provider-badges">
                      <span className="vn-home-provider-verified">
                        <Icon type="shield" className="vn-home-provider-verified-icon" />
                        Verified
                      </span>
                      <span className="vn-home-provider-rating">
                        <Icon type="star" className="vn-home-provider-meta-icon" />
                        {provider.rating} ({provider.reviews})
                      </span>
                    </div>

                    <div className="vn-home-provider-stats">
                      <span>
                        <Icon type="calendar" className="vn-home-provider-meta-icon" />
                        {provider.years}
                      </span>
                      <span>
                        <Icon type="briefcase" className="vn-home-provider-meta-icon" />
                        {provider.projects}
                      </span>
                    </div>

                    <div className="vn-home-provider-actions">
                      <a href="#top" className="vn-home-provider-link">
                        View Profile
                      </a>
                      <button type="button" className="vn-home-provider-button" onClick={handleOpenPartnerLogin}>
                        Send Request
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="vn-home-section" id="for-business">
            <div className="vn-home-shell-inner">
              <div className="vn-home-promo-grid">
                <article className="vn-home-promo-card is-dark">
                  <div className="vn-home-promo-icon">
                    <img
                      src="/promo-icons/file.gif"
                      alt=""
                      className="vn-home-promo-icon-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="vn-home-promo-copy">
                    <h3>Can&apos;t Find the Right Professional?</h3>
                    <p>
                      Post your requirement and get responses from suitable verified professionals.
                    </p>
                  </div>
                  <a className="vn-home-promo-button" href="#providers">
                    Post Your Requirement
                  </a>
                </article>

                <article className="vn-home-promo-card is-gold">
                  <div className="vn-home-promo-icon">
                    <img
                      src="/promo-icons/briefcase.gif"
                      alt=""
                      className="vn-home-promo-icon-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="vn-home-promo-copy">
                    <h3>Are You a Service Provider?</h3>
                    <p>List your business on VyaparNest and grow your business online.</p>
                  </div>
                  <button type="button" className="vn-home-promo-button is-dark" onClick={handleOpenPartnerRegistration}>
                    List Your Business
                  </button>
                </article>
              </div>
            </div>
          </section>

          <section className="vn-home-section vn-home-testimonials-section" id="testimonials">
            <div className="vn-home-shell-inner">
              <div className="vn-home-section-head is-centered">
                <div>
                  <h2>What Our Customers Say</h2>
                </div>
              </div>

              <div className="vn-home-testimonial-grid">
                {testimonials.map((testimonial) => (
                  <article key={testimonial.name} className="vn-home-testimonial-card">
                    <span className="vn-home-testimonial-quote-mark" aria-hidden="true">
                      &ldquo;
                    </span>
                    <p className="vn-home-testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div className="vn-home-testimonial-foot">
                      <div className="vn-home-testimonial-person">
                        <div className="vn-home-testimonial-avatar">
                          {testimonial.avatar ? (
                            <img src={testimonial.avatar} alt={testimonial.name} loading="lazy" />
                          ) : (
                            testimonial.name
                              .split(' ')
                              .map((part) => part[0])
                              .join('')
                              .slice(0, 2)
                          )}
                        </div>
                        <div>
                          <strong>{testimonial.name}</strong>
                          <span>{testimonial.role}</span>
                        </div>
                      </div>
                      <div className="vn-home-testimonial-stars" aria-label={`${testimonial.stars} star rating`}>
                        {Array.from({ length: testimonial.stars }).map((_, starIndex) => (
                          <span key={`${testimonial.name}-star-${starIndex}`}>★</span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="vn-home-testimonial-dots" aria-hidden="true">
                <span className="is-active"></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </section>

          <section className="vn-home-section vn-home-guides-section" id="articles">
            <div className="vn-home-shell-inner">
              <div className="vn-home-section-head">
                <div>
                  <h2>Latest Business Guides</h2>
                </div>
                <a href="#top" className="vn-home-section-link">
                  View all Articles
                  <Icon type="arrow-right" className="vn-home-section-link-icon" />
                </a>
              </div>

              <div className="vn-home-guide-grid">
                {guides.map((guide) => (
                  <article key={guide.title} className="vn-home-guide-card">
                    <div className="vn-home-guide-media">
                      <img src={guide.image} alt={guide.title} className="vn-home-guide-media-image is-default" />
                      {guide.hoverImage ? (
                        <img
                          src={guide.hoverImage}
                          alt=""
                          aria-hidden="true"
                          className="vn-home-guide-media-image is-hover"
                          loading="lazy"
                        />
                      ) : null}
                    </div>
                    <div className="vn-home-guide-copy">
                      <span>{guide.category}</span>
                      <h3>{guide.title}</h3>
                      <p>
                        <span>{guide.date}</span>
                        <strong>•</strong>
                        <span>{guide.readTime}</span>
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="vn-home-footer">
        <div className="vn-home-shell-inner vn-home-footer-grid">
          <div className="vn-home-footer-brand">
            <img src="/vyaparnest-footer-logo-user.png" alt="VyaparNest" />
            <p>Your business. Our platform. Grow together.</p>
            <div className="vn-home-footer-socials">
              <a href="#top">Facebook</a>
              <a href="#top">Instagram</a>
              <a href="#top">LinkedIn</a>
              <a href="#top">YouTube</a>
            </div>
          </div>

          <div className="vn-home-footer-links">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                {group.links.map((link) => (
                  <a key={link} href="#top">
                    {link}
                  </a>
                ))}
              </div>
            ))}

            <div className="vn-home-footer-newsletter">
              <h3>Newsletter</h3>
              <p>Subscribe to get updates and offers in your inbox.</p>
              <form onSubmit={(event) => event.preventDefault()}>
                <input type="email" placeholder="Enter your email" aria-label="Enter your email" />
                <button type="submit" aria-label="Subscribe">
                  <Icon type="arrow-right" className="vn-home-footer-newsletter-icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>

      <PartnerLoginModal
        isOpen={partnerLoginOpen}
        modalRef={null}
        onClose={closePartnerLogin}
        onCreateAccount={handleOpenPartnerRegistration}
      />
    </div>
  )
}

export default PublicHomePage

