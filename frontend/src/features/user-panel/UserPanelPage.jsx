import UserPanelLayout from './components/UserPanelLayout.jsx'
import './userPanel.css'

function UserPanelPage() {
  return (
    <section className="user-panel-page">
      <header className="user-panel-hero">
        <span className="user-panel-kicker">User panel workspace</span>
        <h1>User dashboard screens can live here</h1>
        <p>
          Keep account pages, orders, profile, settings, and customer workflows inside this
          feature folder so your panel design stays separate from the public website.
        </p>
      </header>

      <UserPanelLayout />
    </section>
  )
}

export default UserPanelPage
