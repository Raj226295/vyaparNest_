const partnerBenefits = [
  {
    title: 'Reach New Customers',
    description: 'Connect with customers actively looking for trusted services.',
    icon: 'users',
  },
  {
    title: 'Grow Your Business',
    description: 'Get more leads, projects, and brand visibility online.',
    icon: 'growth',
  },
  {
    title: 'Trusted Platform',
    description: 'A secure and transparent platform your business can rely on.',
    icon: 'shield',
  },
  {
    title: 'Dedicated Support',
    description: "We're here to help you at every step of your journey.",
    icon: 'support',
  },
]

const partnerRocketIcon = '/partner-rocket.gif'

function CloseIcon({ className = '' }) {
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
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  )
}

function ArrowRightIcon({ className = '' }) {
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
      <path d="M5 12h14" />
      <path d="m13 7 5 5-5 5" />
    </svg>
  )
}

function FeatureIcon({ type, className = '' }) {
  const sharedProps = {
    viewBox: '0 0 24 24',
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.9',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (type) {
    case 'users':
      return (
        <svg {...sharedProps}>
          <circle cx="8.2" cy="9.1" r="2.3" />
          <circle cx="15.7" cy="8.7" r="2.1" />
          <path d="M4.9 17v-1a3.3 3.3 0 0 1 3.3-3.3H9a3.3 3.3 0 0 1 3.3 3.3v1" />
          <path d="M13.4 16.8v-.8a2.8 2.8 0 0 1 2.8-2.8h.5a2.8 2.8 0 0 1 2.8 2.8v.8" />
        </svg>
      )
    case 'growth':
      return (
        <svg {...sharedProps}>
          <path d="M5.2 18.2h13.6" />
          <path d="M7.5 18.2v-4.8" />
          <path d="M12 18.2V9.8" />
          <path d="M16.5 18.2V6.8" />
          <path d="m7.5 11.8 3.6-3.6 2.5 2.5 4.5-4.5" />
          <path d="M15.4 6.2h3.6v3.6" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...sharedProps}>
          <path d="M12 3.9 6.3 6.3v4.1c0 4.1 2.4 7.6 5.7 9 3.3-1.4 5.7-4.9 5.7-9V6.3L12 3.9Z" />
          <path d="m9.6 11.9 1.8 1.8 3.2-3.5" />
        </svg>
      )
    case 'support':
      return (
        <svg {...sharedProps}>
          <path d="M5.2 12.8a6.8 6.8 0 0 1 13.6 0" />
          <rect x="4.3" y="12.2" width="3.1" height="5.4" rx="1.2" />
          <rect x="16.6" y="12.2" width="3.1" height="5.4" rx="1.2" />
          <path d="M16.6 17.3a2.4 2.4 0 0 1-2.4 2.4H12" />
        </svg>
      )
    case 'partner':
      return (
        <svg {...sharedProps}>
          <circle cx="8.4" cy="8.6" r="2.4" />
          <circle cx="15.5" cy="8.3" r="2.1" />
          <path d="M4.9 17.3v-.8a3.3 3.3 0 0 1 3.3-3.3H9a3.3 3.3 0 0 1 3.3 3.3v.8" />
          <path d="M14.2 16.8v-.7a2.8 2.8 0 0 1 2.8-2.8h.5a2.8 2.8 0 0 1 2.5 1.6" />
        </svg>
      )
    default:
      return null
  }
}

function PartnerNavPanel({
  isOpen,
  inline = false,
  panelRef,
  arrowLeft,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onClose,
  onSelect,
  onBecomePartner,
}) {
  const wrapperStyle =
    !inline && typeof arrowLeft === 'number'
      ? { '--partner-panel-arrow-left': `${arrowLeft}px` }
      : undefined

  return (
    <div
      ref={panelRef}
      id={inline ? 'partner-mobile-panel' : 'partner-desktop-panel'}
      className={`partner-nav-panel${isOpen ? ' is-open' : ''}${inline ? ' inline' : ''}`}
      role={inline ? 'region' : 'dialog'}
      aria-labelledby="partner-nav-trigger"
      aria-hidden={!isOpen}
      hidden={inline ? !isOpen : undefined}
      style={wrapperStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {!inline ? <span className="partner-nav-panel-arrow" aria-hidden="true"></span> : null}

      <div className="partner-nav-panel-shell">
        <div className="partner-nav-panel-head">
          <div className="partner-nav-panel-title-wrap">
            <span className="partner-nav-panel-title-icon-shell" aria-hidden="true">
              <FeatureIcon type="partner" className="partner-nav-panel-title-icon" />
            </span>
            <div className="partner-nav-panel-title-copy">
              <h3>
                Partner With <span>VyaparNest</span>
              </h3>
            </div>
          </div>

          <button
            type="button"
            className="partner-nav-panel-close"
            onClick={onClose}
            aria-label="Close partner panel"
          >
            <CloseIcon className="partner-nav-panel-close-icon" />
          </button>
        </div>

        <p className="partner-nav-panel-description">
          Grow your business, reach new customers, and discover better opportunities with VyaparNest.
        </p>

        <div className="partner-nav-panel-benefits">
          {partnerBenefits.map((benefit) => (
            <div key={benefit.title} className="partner-nav-benefit">
              <span className="partner-nav-benefit-icon-shell" aria-hidden="true">
                <FeatureIcon type={benefit.icon} className="partner-nav-benefit-icon" />
              </span>
              <div className="partner-nav-benefit-copy">
                <strong>{benefit.title}</strong>
                <p>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="partner-nav-panel-actions">
          <button
            type="button"
            className="partner-nav-primary-btn"
            onClick={onBecomePartner}
          >
            <span className="partner-nav-primary-btn-icon-shell" aria-hidden="true">
              <img
                src={partnerRocketIcon}
                alt=""
                aria-hidden="true"
                className="partner-nav-primary-btn-icon partner-nav-primary-btn-gif"
              />
            </span>
            <span>Become a Partner</span>
            <ArrowRightIcon className="partner-nav-primary-btn-arrow" />
          </button>
          <a className="partner-nav-secondary-btn" href="#for-business" onClick={onSelect}>
            Learn More
          </a>
        </div>
      </div>
    </div>
  )
}

export default PartnerNavPanel
