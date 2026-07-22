import { useEffect, useState } from 'react'
import PublicHomePage from '../features/public-home/PublicHomePage.jsx'
import PartnerRegistrationPage from '../features/public-home/PartnerRegistrationPage.jsx'

const partnerRegistrationHash = '#partner-register'
const partnerLoginHash = '#partner-login'

function getCurrentScreen() {
  if (typeof window === 'undefined') {
    return 'home'
  }

  return window.location.hash === partnerRegistrationHash ? 'partner-register' : 'home'
}

function App() {
  const [currentScreen, setCurrentScreen] = useState(getCurrentScreen)
  const [partnerLoginRequestId, setPartnerLoginRequestId] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const syncScreen = () => {
      if (window.location.hash === partnerLoginHash) {
        setPartnerLoginRequestId((requestId) => requestId + 1)
      }

      setCurrentScreen(getCurrentScreen())
    }

    syncScreen()
    window.addEventListener('hashchange', syncScreen)

    return () => window.removeEventListener('hashchange', syncScreen)
  }, [])

  useEffect(() => {
    const originalOverflow = document.body.style.overflow

    if (currentScreen === 'partner-register') {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [currentScreen])

  const openPartnerRegistration = () => {
    if (typeof window === 'undefined') {
      setCurrentScreen('partner-register')
      return
    }

    if (window.location.hash !== partnerRegistrationHash) {
      window.location.hash = partnerRegistrationHash
    } else {
      setCurrentScreen('partner-register')
    }
  }

  const openPartnerLogin = () => {
    if (typeof window === 'undefined') {
      setCurrentScreen('home')
      setPartnerLoginRequestId((requestId) => requestId + 1)
      return
    }

    if (window.location.hash !== partnerLoginHash) {
      window.location.hash = partnerLoginHash
    } else {
      setCurrentScreen('home')
      setPartnerLoginRequestId((requestId) => requestId + 1)
    }
  }

  return (
    <>
      <PublicHomePage
        onOpenPartnerRegistration={openPartnerRegistration}
        onOpenPartnerLogin={openPartnerLogin}
        partnerLoginRequestId={partnerLoginRequestId}
      />

      {currentScreen === 'partner-register' ? (
        <PartnerRegistrationPage onOpenPartnerLogin={openPartnerLogin} isOverlay />
      ) : null}
    </>
  )
}

export default App
