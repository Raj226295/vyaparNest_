import { useEffect, useState } from 'react'
import PublicHomePage from '../features/public-home/PublicHomePage.jsx'
import PartnerRegistrationPage from '../features/public-home/PartnerRegistrationPage.jsx'
import UserPanelPage from '../features/user-panel/UserPanelPage.jsx'
import ProviderDashboard from '../features/provider-panel/ProviderDashboard.jsx'

const partnerRegistrationHash = '#partner-register'
const partnerLoginHash = '#partner-login'
const categoriesHash = '#all-categories'
const aiAssistHash = '#ai-assist'
const userDashboardHash = '#user-dashboard'
const providerDashboardHash = '#provider-dashboard'
const serviceProvidersHashPrefix = '#service-providers/'

function getCurrentScreen() {
  if (typeof window === 'undefined') {
    return 'home'
  }

  if (window.location.hash === partnerRegistrationHash) {
    return 'partner-register'
  }

  if (window.location.hash === categoriesHash) {
    return 'categories'
  }

  if (window.location.hash.startsWith(serviceProvidersHashPrefix)) {
    return 'service-providers'
  }

  if (window.location.hash === aiAssistHash) {
    return 'ai-assist'
  }

  if (window.location.hash === userDashboardHash) {
    return 'user-dashboard'
  }

  if (window.location.hash === providerDashboardHash) {
    return 'provider-dashboard'
  }

  return 'home'
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
      {currentScreen === 'user-dashboard' ? (
        <UserPanelPage />
      ) : currentScreen === 'provider-dashboard' ? (
        <ProviderDashboard />
      ) : (
        <PublicHomePage
          onOpenPartnerRegistration={openPartnerRegistration}
          onOpenPartnerLogin={openPartnerLogin}
          partnerLoginRequestId={partnerLoginRequestId}
          currentScreen={currentScreen}
        />
      )}

      {currentScreen === 'partner-register' ? (
        <PartnerRegistrationPage onOpenPartnerLogin={openPartnerLogin} isOverlay />
      ) : null}
    </>
  )
}

export default App
