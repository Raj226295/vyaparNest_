function UserPanelLayout() {
  return (
    <div className="user-panel-layout">
      <aside className="user-panel-sidebar">
        <strong>My Account</strong>
        <span className="is-active">⌂ Discover</span>
        <span>▣ My Requests</span>
        <span>♡ Saved Services</span>
        <span>◎ Profile</span>
      </aside>

      <div className="user-panel-content">
        <div className="user-panel-card">
          <strong>Verified professionals</strong>
          <p>Browse active services managed by the VyaparNest admin team.</p>
        </div>

        <div className="user-panel-card">
          <strong>Simple, transparent booking</strong>
          <p>Compare pricing, delivery time and service highlights before sending a request.</p>
        </div>
      </div>
    </div>
  )
}

export default UserPanelLayout
