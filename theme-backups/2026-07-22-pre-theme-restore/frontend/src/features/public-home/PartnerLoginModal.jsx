import { useState } from 'react'
import AryassBrandMark from './AryassBrandMark.jsx'
import './PartnerLoginPage.css'

const workspaceStats = [
  { value: '28K+', label: 'Active experts' },
  { value: '4.9★', label: 'Avg. rating' },
  { value: '24/7', label: 'Support' },
]

const workspaceHighlights = [
  'Verified professionals and business partners',
  'Secure payments and premium onboarding flows',
  'Fast support for clients, founders, and freelancers',
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
    case 'close':
      return (
        <svg {...sharedProps}>
          <path d="m6 6 12 12" />
          <path d="M18 6 6 18" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...sharedProps}>
          <rect x="3.8" y="6.4" width="16.4" height="11.2" rx="2.2" />
          <path d="m5.8 8.6 6.2 4.7 6.2-4.7" />
        </svg>
      )
    case 'lock':
      return (
        <svg {...sharedProps}>
          <rect x="5.1" y="10.1" width="13.8" height="9.2" rx="2.4" />
          <path d="M8.6 10.1V8.4A3.4 3.4 0 0 1 12 5a3.4 3.4 0 0 1 3.4 3.4v1.7" />
        </svg>
      )
    case 'eye':
      return (
        <svg {...sharedProps}>
          <path d="M2.7 12s3.3-5.3 9.3-5.3 9.3 5.3 9.3 5.3-3.3 5.3-9.3 5.3S2.7 12 2.7 12Z" />
          <circle cx="12" cy="12" r="2.4" />
        </svg>
      )
    case 'eye-off':
      return (
        <svg {...sharedProps}>
          <path d="m3.2 3.2 17.6 17.6" />
          <path d="M9.8 5.3A11.8 11.8 0 0 1 12 5c6 0 9.3 5.3 9.3 5.3a15 15 0 0 1-3.3 3.8" />
          <path d="M6.4 7.3A15.4 15.4 0 0 0 2.7 12s3.3 5.3 9.3 5.3c1 0 1.9-.1 2.7-.4" />
          <path d="M10.4 10.4A2.4 2.4 0 0 0 13.6 13.6" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...sharedProps}>
          <path d="M12 3.8 6.2 6.2v4.1c0 4.2 2.5 7.8 5.8 9.2 3.3-1.4 5.8-5 5.8-9.2V6.2L12 3.8Z" />
          <path d="m9.5 11.9 1.8 1.8 3.3-3.6" />
        </svg>
      )
    case 'spark':
      return (
        <svg {...sharedProps}>
          <path d="M12 3.8 13.4 8l4.2 1.4-4.2 1.4-1.4 4.2-1.4-4.2-4.2-1.4L10.6 8 12 3.8Z" />
          <path d="m18.8 13.8.6 1.7 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6.6-1.7Z" />
        </svg>
      )
    case 'check':
      return (
        <svg {...sharedProps}>
          <path d="m5 12.4 4.1 4.1L19 6.8" />
        </svg>
      )
    case 'headset':
      return (
        <svg {...sharedProps}>
          <path d="M5 13a7 7 0 0 1 14 0" />
          <rect x="4.3" y="12.4" width="3.4" height="5.6" rx="1.5" />
          <rect x="16.3" y="12.4" width="3.4" height="5.6" rx="1.5" />
          <path d="M16.3 18A2.1 2.1 0 0 1 14.2 20.1H12" />
        </svg>
      )
    case 'arrow-right':
      return (
        <svg {...sharedProps}>
          <path d="M5 12h14" />
          <path d="m13 7 5 5-5 5" />
        </svg>
      )
    default:
      return null
  }
}

function PartnerLoginModal({
  isOpen,
  modalRef = null,
  onClose,
  onCreateAccount,
  showCreateAccount = true,
}) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const isFormValid = identifier.trim().length > 2 && password.trim().length > 5

  return (
    <div className={`aryass-auth-overlay${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
      <div className="aryass-auth-backdrop" onClick={onClose} aria-hidden="true"></div>

      <section
        ref={modalRef}
        className="aryass-auth-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="partner-auth-title"
      >
        <button type="button" className="aryass-auth-close" onClick={onClose} aria-label="Close login page">
          <Icon type="close" className="aryass-auth-close-icon" />
        </button>

        <div className="aryass-auth-layout">
          <aside className="aryass-auth-showcase">
            <AryassBrandMark tone="light" tagline={null} />

            <div className="aryass-auth-topbar">
              <span className="aryass-auth-top-tag">
                <Icon type="spark" className="aryass-auth-top-tag-icon" />
                Premium Access
              </span>
            </div>

            <div className="aryass-auth-showcase-copy">
              <h2>Welcome back to VyaparNest</h2>
              <p>
                Manage enquiries, shortlist trusted professionals, and keep your business growth
                moving from one polished marketplace workspace.
              </p>
            </div>

            <div className="aryass-auth-showcase-stats">
              {workspaceStats.map((stat) => (
                <article key={stat.label} className="aryass-auth-showcase-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>

            <ul className="aryass-auth-showcase-list" aria-label="Workspace highlights">
              {workspaceHighlights.map((item) => (
                <li key={item}>
                  <Icon type="check" className="aryass-auth-showcase-check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="aryass-auth-support-card">
              <span className="aryass-auth-support-card-icon-shell" aria-hidden="true">
                <Icon type="headset" className="aryass-auth-support-card-icon" />
              </span>
              <div>
                <strong>Need a hand?</strong>
                <p>Reach our support team anytime at support@vyaparnest.in</p>
              </div>
            </div>
          </aside>

          <div className="aryass-auth-panel">
            <div className="aryass-auth-panel-copy">
              <span className="aryass-auth-panel-kicker">Partner Login</span>
              <h2 id="partner-auth-title">Login to your workspace</h2>
              <p>Use your email, mobile number, or partner ID to continue.</p>
            </div>

            <form className="aryass-auth-form" onSubmit={(event) => event.preventDefault()}>
              <label className="aryass-auth-field">
                <span>Email or Mobile</span>
                <span className="aryass-auth-input-shell">
                  <Icon type="mail" className="aryass-auth-input-icon" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="username"
                  />
                </span>
              </label>

              <label className="aryass-auth-field">
                <span>Password</span>
                <span className="aryass-auth-input-shell">
                  <Icon type="lock" className="aryass-auth-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="aryass-auth-password-toggle"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <Icon
                      type={showPassword ? 'eye-off' : 'eye'}
                      className="aryass-auth-password-toggle-icon"
                    />
                  </button>
                </span>
              </label>

              <div className="aryass-auth-row">
                <label className="aryass-auth-checkbox">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  <span>Remember me</span>
                </label>

                <a href="#top" onClick={(event) => event.preventDefault()}>
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="aryass-auth-submit" disabled={!isFormValid}>
                <span>Login</span>
                <Icon type="arrow-right" className="aryass-auth-submit-icon" />
              </button>
            </form>

            <div className="aryass-auth-footer">
              {showCreateAccount ? (
                <button type="button" className="aryass-auth-link-card" onClick={onCreateAccount}>
                  <span>New partner?</span>
                  <strong>Become a Partner</strong>
                  <Icon type="arrow-right" className="aryass-auth-link-icon" />
                </button>
              ) : null}

              <a className="aryass-auth-support-link" href="mailto:support@vyaparnest.in">
                Need help signing in? Contact support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PartnerLoginModal
