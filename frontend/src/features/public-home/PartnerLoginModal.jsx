import { useState } from 'react'
import './PartnerLoginPage.css'

function AuthIcon({ type, className = '' }) {
  const props = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.9',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const paths = {
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></>,
    eyeOff: <><path d="m3 3 18 18" /><path d="M10.6 6.2A9.7 9.7 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-2.1 2.8" /><path d="M6.2 6.2C3.8 8 2.5 12 2.5 12s3.5 6 9.5 6c1.1 0 2.1-.2 3-.5" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 7 5 5-5 5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  }

  return <svg {...props}>{paths[type]}</svg>
}

function GoogleIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285f4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.4Z" />
      <path fill="#34a853" d="M12 22c2.7 0 4.97-.9 6.62-2.37l-3.24-2.54c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z" />
      <path fill="#fbbc05" d="M6.39 13.92A6 6 0 0 1 6.07 12c0-.67.11-1.32.32-1.92V7.46H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.54l3.35-2.62Z" />
      <path fill="#ea4335" d="M12 5.95c1.47 0 2.79.51 3.83 1.5l2.87-2.88A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.96 5.46l3.35 2.62C7.18 7.71 9.39 5.95 12 5.95Z" />
    </svg>
  )
}

function PartnerLoginModal({ isOpen, modalRef, onClose, onCreateAccount, showCreateAccount = true }) {
  const [role, setRole] = useState('user')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const isProvider = role === 'provider'

  return (
    <div className={`aryass-auth-overlay${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
      <div className="aryass-auth-backdrop" onClick={onClose} aria-hidden="true" />

      <section ref={modalRef} className="aryass-auth-dialog" role="dialog" aria-modal="true" aria-labelledby="aryass-auth-title">
        <button type="button" className="aryass-auth-close" onClick={onClose} aria-label="Close login dialog">
          <AuthIcon type="close" className="aryass-auth-close-icon" />
        </button>

        <div className="aryass-auth-layout">
          <div className="aryass-auth-panel">
            <div className="aryass-auth-panel-copy">
              <h2 id="aryass-auth-title">Login</h2>
              <span className="aryass-auth-title-mark" aria-hidden="true" />
              <p>Access your account and continue your journey with VyaparNest.</p>
            </div>

            <div className="aryass-auth-role-tabs" role="tablist" aria-label="Account type">
              <button type="button" role="tab" aria-selected={!isProvider} className={!isProvider ? 'is-active' : ''} onClick={() => setRole('user')}>
                <AuthIcon type="user" /> User
              </button>
              <button type="button" role="tab" aria-selected={isProvider} className={isProvider ? 'is-active' : ''} onClick={() => setRole('provider')}>
                <AuthIcon type="briefcase" /> Service Provider
              </button>
            </div>

            <form className="aryass-auth-form" onSubmit={(event) => event.preventDefault()}>
              <label className="aryass-auth-field">
                <span>Email or Phone Number</span>
                <span className="aryass-auth-input-shell">
                  <AuthIcon type="mail" className="aryass-auth-input-icon" />
                  <input type="text" autoComplete="username" value={identifier} onChange={(event) => setIdentifier(event.target.value)} placeholder="Enter email or phone number" />
                </span>
              </label>

              <label className="aryass-auth-field">
                <span>Password</span>
                <span className="aryass-auth-input-shell">
                  <AuthIcon type="lock" className="aryass-auth-input-icon" />
                  <input type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />
                  <button type="button" className="aryass-auth-password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    <AuthIcon type={showPassword ? 'eyeOff' : 'eye'} className="aryass-auth-password-toggle-icon" />
                  </button>
                </span>
              </label>

              <div className="aryass-auth-row">
                <label className="aryass-auth-checkbox"><input type="checkbox" /><span>Remember me</span></label>
                <button type="button" className="aryass-auth-forgot">Forgot Password?</button>
              </div>

              <button type="submit" className="aryass-auth-submit" disabled={!identifier.trim() || !password}>
                Login
                <AuthIcon type="arrow" className="aryass-auth-submit-icon" />
              </button>
            </form>

            <div className="aryass-auth-divider"><span>or continue with</span></div>
            <button type="button" className="aryass-auth-google"><GoogleIcon className="aryass-auth-google-icon" />Continue with Google</button>

            {showCreateAccount ? (
              <p className="aryass-auth-create">New to VyaparNest? <button type="button" onClick={onCreateAccount}>Create Account</button></p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}

export default PartnerLoginModal
