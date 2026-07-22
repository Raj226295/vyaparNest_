import { useState } from 'react'
import AryassBrandMark from './AryassBrandMark.jsx'
import './PartnerLoginPage.css'

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

function PhoneIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.8 4.9h3.3l1.1 3.8-1.9 1.9a13.3 13.3 0 0 0 4.1 4.1l1.9-1.9 3.8 1.1v3.3a1.9 1.9 0 0 1-2.1 1.9A16.1 16.1 0 0 1 4.9 7a1.9 1.9 0 0 1 1.9-2.1Z" />
    </svg>
  )
}

function ShieldIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3.9 6.3 6.3v4.1c0 4.1 2.4 7.6 5.7 9 3.3-1.4 5.7-4.9 5.7-9V6.3L12 3.9Z" />
      <path d="m9.7 11.9 1.7 1.7 3.4-3.7" />
    </svg>
  )
}

function GridIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4.2" y="4.2" width="6.4" height="6.4" rx="1.4" />
      <rect x="13.4" y="4.2" width="6.4" height="6.4" rx="1.4" />
      <rect x="4.2" y="13.4" width="6.4" height="6.4" rx="1.4" />
      <rect x="13.4" y="13.4" width="6.4" height="6.4" rx="1.4" />
    </svg>
  )
}

function IndiaFlagIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 16" aria-hidden="true" className={className}>
      <rect width="24" height="16" rx="2" fill="#ffffff" />
      <rect width="24" height="5.34" rx="2" fill="#ff9933" />
      <rect y="10.66" width="24" height="5.34" rx="2" fill="#138808" />
      <circle cx="12" cy="8" r="2.15" fill="none" stroke="#1a3c8e" strokeWidth="0.9" />
      <circle cx="12" cy="8" r="0.55" fill="#1a3c8e" />
    </svg>
  )
}

function CaretIcon({ className = '' }) {
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
      <path d="m7 10 5 5 5-5" />
    </svg>
  )
}

function PartnerLoginModal({ isOpen, modalRef, onClose, onCreateAccount, showCreateAccount = true }) {
  const [countryCode, setCountryCode] = useState('+91')
  const [mobileNumber, setMobileNumber] = useState('')
  const isMobileValid = mobileNumber.length === 10
  const stats = [
    { value: '25+', label: 'Cities active' },
    { value: '4.9/5', label: 'Partner rating' },
    { value: '10K+', label: 'Verified leads' },
  ]
  const authBenefits = [
    'Receive OTP verification in seconds.',
    'Access your profile without remembering a password.',
    'Continue directly to enquiries and partner tools.',
  ]

  return (
    <div className={`aryass-auth-overlay${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
      <div className="aryass-auth-backdrop" onClick={onClose} aria-hidden="true"></div>

      <section
        ref={modalRef}
        className="aryass-auth-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="aryass-auth-title"
      >
        <button
          type="button"
          className="aryass-auth-close"
          onClick={onClose}
          aria-label="Close login dialog"
        >
          <CloseIcon className="aryass-auth-close-icon" />
        </button>

        <div className="aryass-auth-layout">
          <aside className="aryass-auth-showcase">
            <div className="aryass-auth-topbar">
              <span className="aryass-auth-top-tag">
                <GridIcon className="aryass-auth-top-tag-icon" />
                <span>Partner Access</span>
              </span>
            </div>

            <AryassBrandMark tone="light" tagline={null} />

            <div className="aryass-auth-showcase-copy">
              <h2>Login to manage your partner growth.</h2>
              <p>
                Access VyaparNest to respond to premium leads, manage visibility, and continue
                your verified business journey.
              </p>
            </div>

            <div className="aryass-auth-showcase-stats" aria-label="Marketplace highlights">
              {stats.map((stat) => (
                <article key={stat.label} className="aryass-auth-showcase-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>

            <ul className="aryass-auth-showcase-list">
              {authBenefits.map((benefit) => (
                <li key={benefit}>
                  <ShieldIcon className="aryass-auth-showcase-check" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="aryass-auth-support-card">
              <span className="aryass-auth-support-card-icon-shell" aria-hidden="true">
                <PhoneIcon className="aryass-auth-support-card-icon" />
              </span>
              <div>
                <strong>Your mobile number stays encrypted and secure.</strong>
                <p>Use OTP verification to continue safely without sharing your password.</p>
              </div>
            </div>
          </aside>

          <div className="aryass-auth-panel">
            <div className="aryass-auth-panel-copy">
              <span className="aryass-auth-panel-kicker">Mobile Login</span>
              <h2 id="aryass-auth-title">Login to VyaparNest</h2>
              <p>Enter your mobile number to receive an OTP and continue.</p>
            </div>

            <form className="aryass-auth-form" onSubmit={(event) => event.preventDefault()}>
              <label className="aryass-auth-field">
                <span>Mobile Number</span>

                <span className="aryass-auth-input-shell aryass-auth-phone-shell">
                  <PhoneIcon className="aryass-auth-input-icon" />

                  <span className="aryass-auth-phone-code">
                    <IndiaFlagIcon className="aryass-auth-phone-flag" />
                    <select
                      aria-label="Country code"
                      value={countryCode}
                      onChange={(event) => setCountryCode(event.target.value)}
                      className="aryass-auth-phone-code-select"
                    >
                      <option value="+91">+91</option>
                    </select>
                    <CaretIcon className="aryass-auth-phone-code-caret" />
                  </span>

                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(event) =>
                      setMobileNumber(event.target.value.replace(/\D/g, '').slice(0, 10))
                    }
                    placeholder="Enter your mobile number"
                    aria-label="Mobile number"
                  />
                </span>
              </label>

              <div className="aryass-auth-row">
                <label className="aryass-auth-checkbox">
                  <input type="checkbox" defaultChecked />
                  <span>Keep me signed in on this device</span>
                </label>

                <a className="aryass-auth-support-link" href="mailto:support@vyaparnest.com">
                  Need Help?
                </a>
              </div>

              <button type="submit" className="aryass-auth-submit" disabled={!isMobileValid}>
                <span>Send OTP</span>
                <ArrowRightIcon className="aryass-auth-submit-icon" />
              </button>
            </form>

            <div className="aryass-auth-footer">
              {showCreateAccount ? (
                <button type="button" className="aryass-auth-link-card" onClick={onCreateAccount}>
                  <span>Don&apos;t have an account?</span>
                  <strong>Become a Partner</strong>
                  <ArrowRightIcon className="aryass-auth-link-icon" />
                </button>
              ) : null}

              <a className="aryass-auth-link-card" href="mailto:support@vyaparnest.com">
                <span>Need help with onboarding?</span>
                <strong>Contact Support</strong>
                <ArrowRightIcon className="aryass-auth-link-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PartnerLoginModal
